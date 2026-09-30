import { createHash, randomUUID } from 'node:crypto';

// A retry of the same form keeps its ID. Changed content gets a different key.
// Legacy clients without an ID remain supported. No personal data in the key.
export function contactIdempotencyKey(requestId: unknown, email: object) {
  const id = typeof requestId === 'string' && /^[a-f0-9-]{36}$/i.test(requestId) ? requestId : randomUUID();
  return `contact/${createHash('sha256').update(JSON.stringify([id, email])).digest('hex')}`;
}
