import { test } from 'node:test';
import assert from 'node:assert/strict';
import { POST } from '../app/api/contact/route';
import { ContactBodyTooLarge, readContactBody } from '../lib/contact-request';

test('rejects oversized chunked bodies without trusting Content-Length', async () => {
  const request = new Request('https://example.com/api/contact', { method:'POST', body:'x'.repeat(16_385) });
  await assert.rejects(() => readContactBody(request), ContactBodyTooLarge);
});

test('rejects absent origin, cross-site metadata and non-JSON before delivery', async () => {
  for (const [headers, status] of [
    [{ 'content-type':'application/json' }, 403],
    [{ origin:'https://example.com', 'content-type':'text/plain' }, 415],
    [{ origin:'https://example.com', 'content-type':'application/json', 'sec-fetch-site':'cross-site' }, 403],
  ] as const) {
    const response = await POST(new Request('https://example.com/api/contact', {method:'POST', headers, body:'{}'}));
    assert.equal(response.status, status);
  }
});
