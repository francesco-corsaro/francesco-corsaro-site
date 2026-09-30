import { test } from 'node:test';
import assert from 'node:assert/strict';
import { verifyTurnstile } from '../lib/turnstile';

test('requires server verification, exact hostname and action; fails closed on outages', async () => {
  const fetchBefore = globalThis.fetch;
  const envBefore = { secret: process.env.TURNSTILE_SECRET_KEY, hosts: process.env.TURNSTILE_ALLOWED_HOSTNAMES };
  process.env.TURNSTILE_SECRET_KEY = 'test-only';
  process.env.TURNSTILE_ALLOWED_HOSTNAMES = 'francescocorsaro.it';
  try {
    let calls = 0;
    globalThis.fetch = async () => { calls++; return Response.json({success:true,action:'contact',hostname:'francescocorsaro.it'}); };
    for (const token of [undefined, null, '', 123, 'x'.repeat(2049)]) assert.equal(await verifyTurnstile(token), 'invalid');
    assert.equal(calls, 0);
    assert.equal(await verifyTurnstile('valid-token'), 'valid');
    for (const result of [
      {success:false,'error-codes':['timeout-or-duplicate']},
      {success:true,action:'login',hostname:'francescocorsaro.it'},
      {success:true,action:'contact',hostname:'attacker.example'},
      {success:true,action:'contact',hostname:'francescocorsaro.it.attacker.example'},
      {success:true},
    ]) {
      globalThis.fetch = async () => Response.json(result);
      assert.equal(await verifyTurnstile('token'), 'invalid');
    }
    globalThis.fetch = async () => { throw new Error('timeout'); };
    assert.equal(await verifyTurnstile('token'), 'unavailable');
    globalThis.fetch = async () => new Response('unavailable', {status:503});
    assert.equal(await verifyTurnstile('token'), 'unavailable');
    delete process.env.TURNSTILE_SECRET_KEY;
    assert.equal(await verifyTurnstile('token'), 'unavailable');
  } finally {
    globalThis.fetch = fetchBefore;
    if (envBefore.secret === undefined) delete process.env.TURNSTILE_SECRET_KEY; else process.env.TURNSTILE_SECRET_KEY = envBefore.secret;
    if (envBefore.hosts === undefined) delete process.env.TURNSTILE_ALLOWED_HOSTNAMES; else process.env.TURNSTILE_ALLOWED_HOSTNAMES = envBefore.hosts;
  }
});
