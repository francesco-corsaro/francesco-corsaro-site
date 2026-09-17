import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkContactRateLimit } from '../lib/contact-rate-limit';

test('shared limiter uses one atomic expiring counter, hides IP and fails closed on service errors', async () => {
  const keys = ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN', 'CONTACT_RATE_LIMIT_SECRET'] as const;
  const previous = keys.map(key => process.env[key]);
  const originalFetch = globalThis.fetch;
  process.env.UPSTASH_REDIS_REST_URL = 'https://redis.example.com';
  process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token';
  process.env.CONTACT_RATE_LIMIT_SECRET = 'test-secret';
  let count = 0;
  let unavailable = false;
  globalThis.fetch = async (_url, init) => {
    assert.ok(init?.signal);
    const command = JSON.parse(String(init?.body));
    assert.equal(command[0], 'EVAL');
    assert.match(command[1], /INCR/);
    assert.match(command[1], /EXPIRE/);
    assert.equal(command[2], '1');
    assert.equal(command[4], '600');
    assert.ok(!String(init?.body).includes('198.51.100.23'));
    return new Response(JSON.stringify(unavailable ? { error: 'unavailable' } : { result: [++count, 599] }), { status: unavailable ? 503 : 200 });
  };
  try {
    for (let i = 0; i < 5; i++) assert.deepEqual(await checkContactRateLimit('198.51.100.23'), { allowed: true, retryAfter: 599, mode: 'shared' });
    assert.equal((await checkContactRateLimit('198.51.100.23')).allowed, false);
    unavailable = true;
    await assert.rejects(checkContactRateLimit('198.51.100.23'));
    delete process.env.CONTACT_RATE_LIMIT_SECRET;
    await assert.rejects(checkContactRateLimit('198.51.100.23'));
  } finally {
    globalThis.fetch = originalFetch;
    keys.forEach((key, i) => { if (previous[i] === undefined) delete process.env[key]; else process.env[key] = previous[i]; });
  }
});
