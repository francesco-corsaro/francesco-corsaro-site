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
