import { createHash } from 'node:crypto';
// Best-effort per-process protection. A distributed limit also requires a shared
// store or a Vercel Firewall rule; do not describe this as a global quota.
const buckets = new Map<string, { count: number; until: number }>();
export function allowContact(ip: string, now = Date.now()) {
  for (const [key, bucket] of buckets) if (bucket.until <= now) buckets.delete(key);
  const key = createHash('sha256').update(ip).digest('hex');
  const previous = buckets.get(key);
  if (previous && previous.count >= 5) return false;
  if (!previous && buckets.size >= 5000) return false;
  buckets.set(key, { count: (previous?.count ?? 0) + 1, until: previous?.until ?? now + 600_000 });
  return true;
}

// INCR and first-use expiry run atomically in the shared Redis instance.
const incrementWindow = `local n = redis.call('INCR', KEYS[1])
if n == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end
return {n, redis.call('TTL', KEYS[1])}`;

export async function checkContactRateLimit(ip: string) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const secret = process.env.CONTACT_RATE_LIMIT_SECRET;
  if (!url && !token && !secret) {
    return { allowed: allowContact(ip), retryAfter: 600, mode: 'local' as const };
  }
  if (!url || !token || !secret || !url.startsWith('https://')) throw new Error('rate_limit_configuration');
  const { createHmac } = await import('node:crypto');
  const key = `contact:${process.env.VERCEL_ENV || 'local'}:${createHmac('sha256', secret).update(ip).digest('hex')}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(['EVAL', incrementWindow, '1', key, '600']),
    signal: AbortSignal.timeout(3000),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('rate_limit_unavailable');
  const { result, error } = await response.json();
  if (error || !Array.isArray(result) || result.length !== 2 || !Number.isInteger(result[0]) || result[0] < 1 || !Number.isInteger(result[1]) || result[1] < 0) {
    throw new Error('rate_limit_response');
  }
  return { allowed: result[0] <= 5, retryAfter: Math.max(1, result[1]), mode: 'shared' as const };
}
