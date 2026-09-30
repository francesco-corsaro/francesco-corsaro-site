import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contactIdempotencyKey } from '../lib/contact-idempotency';

test('retry deduplicates identical emails; edits and new requests remain distinct', () => {
  const id = '7b4c6b3b-6918-4ad2-a48a-03e89bd21f15';
  const email = {to:['test@example.com'],text:'Richiesta'};
  const key = contactIdempotencyKey(id, email);
  assert.equal(contactIdempotencyKey(id, email), key);
  assert.notEqual(contactIdempotencyKey(id, {...email,text:'Richiesta modificata'}), key);
  assert.notEqual(contactIdempotencyKey('8b4c6b3b-6918-4ad2-a48a-03e89bd21f15', email), key);
  assert.match(key, /^contact\/[a-f0-9]{64}$/);
  assert.notEqual(contactIdempotencyKey(undefined, email), contactIdempotencyKey(undefined, email));
});
