import { test } from 'node:test';
import assert from 'node:assert/strict';
import { POST } from '../app/api/contact/route';

const payload = {name:'Visitatore',contact:'test@example.com',message:'Vorrei informazioni',privacy:true,startedAt:Date.now()-5000};
const request = (body: unknown, ip: string, origin = 'https://example.com') => new Request('https://example.com/api/contact', {method:'POST',headers:{origin,'content-type':'application/json','x-vercel-forwarded-for':ip},body:JSON.stringify(body)});

test('contact endpoint validates input, sets reply-to and reports provider failure without sending mail', async () => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.RESEND_API_KEY;
  const originalDestination = process.env.CONTACT_EMAIL_TO;
  let calls = 0;
  const idempotencyKeys: string[] = [];
  const events: string[] = [];
  const originalInfo = console.info;
  console.info = value => events.push(String(value));
  let providerOk = true;
  globalThis.fetch = async (_url, init) => {
    calls++;
    idempotencyKeys.push(new Headers(init?.headers).get('Idempotency-Key') || '');
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
    assert.ok(idempotencyKeys[0].startsWith('contact/'));
    assert.equal(idempotencyKeys[0], idempotencyKeys[1]);
    const withId = { ...payload, submissionId: '61319c98-a9aa-41f5-a5dc-5e88b1246457' };
    providerOk = true;
    assert.equal((await POST(request(withId, 'retry-1'))).status, 200);
    assert.equal((await POST(request(withId, 'retry-2'))).status, 200);
    assert.equal(idempotencyKeys[2], idempotencyKeys[3]);
    assert.equal((await POST(request({...payload, submissionId: 'invalid'}, 'invalid-id'))).status,400);
    const logs = events.join(' ');
    for (const secret of [payload.name, payload.contact, payload.message, 'test-only', 'recipient@example.com']) assert.ok(!logs.includes(secret));
    assert.ok(events.some(row => JSON.parse(row).event === 'sent'));
    assert.ok(events.some(row => JSON.parse(row).event === 'provider_rejected'));
  } finally {
    globalThis.fetch = originalFetch;
    console.info = originalInfo;
    if (originalKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = originalKey;
    if (originalDestination === undefined) delete process.env.CONTACT_EMAIL_TO; else process.env.CONTACT_EMAIL_TO = originalDestination;
  }
});
