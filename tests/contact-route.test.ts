import { test } from 'node:test';
import assert from 'node:assert/strict';
import { POST } from '../app/api/contact/route';

const payload = {name:'Visitatore',contact:'test@example.com',message:'Vorrei informazioni',privacy:true,turnstileToken:'test-token',startedAt:Date.now()-5000};
const request = (body: unknown, ip: string, origin = 'https://example.com') => new Request('https://example.com/api/contact', {method:'POST',headers:{origin,'content-type':'application/json','x-vercel-forwarded-for':ip},body:JSON.stringify(body)});

test('contact endpoint validates input, sets reply-to and reports provider failure without sending mail', async () => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.RESEND_API_KEY;
  const originalDestination = process.env.CONTACT_EMAIL_TO;
  const originalSecret = process.env.TURNSTILE_SECRET_KEY;
  process.env.TURNSTILE_SECRET_KEY = 'test-only';
  let tokenOk = true;
  let calls = 0;
  let providerOk = true;
  globalThis.fetch = async (_url, init) => {
    if (String(_url).includes('siteverify')) return Response.json({success:tokenOk,hostname:'francescocorsaro.it',action:'contact'});
    calls++;
    const body = JSON.parse(String(init?.body));
    assert.equal(body.reply_to, payload.contact);
    assert.ok(init?.signal);
    return new Response('{}', {status:providerOk ? 200 : 500});
  };
  process.env.RESEND_API_KEY = 'test-only';
  process.env.CONTACT_EMAIL_TO = 'recipient@example.com';
  try {
    assert.equal((await POST(request({...payload,privacy:false},'consent'))).status,400);
    assert.equal((await POST(request(payload,'origin','https://other.example'))).status,403);
    assert.equal(calls,0);
    assert.equal((await POST(request(payload,'valid'))).status,200);
    providerOk = false;
    assert.equal((await POST(request(payload,'failure'))).status,502);
    assert.equal(calls,2);
    tokenOk = false;
    assert.equal((await POST(request(payload,'invalid-token'))).status,400);
    assert.equal((await POST(request({...payload,turnstileToken:''},'missing-token'))).status,400);
    delete process.env.TURNSTILE_SECRET_KEY;
    assert.equal((await POST(request(payload,'missing-secret'))).status,503);
    assert.equal(calls,2); // Rejected verification never reaches Resend.
  } finally {
    globalThis.fetch = originalFetch;
    if (originalSecret === undefined) delete process.env.TURNSTILE_SECRET_KEY; else process.env.TURNSTILE_SECRET_KEY = originalSecret;
    if (originalKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = originalKey;
    if (originalDestination === undefined) delete process.env.CONTACT_EMAIL_TO; else process.env.CONTACT_EMAIL_TO = originalDestination;
  }
});
