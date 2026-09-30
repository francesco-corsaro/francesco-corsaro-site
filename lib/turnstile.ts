/** Tokens are verified by Cloudflare before any email can be sent. Never log them. */
export async function verifyTurnstile(token: unknown): Promise<'valid' | 'invalid' | 'unavailable'> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return 'unavailable';
  if (typeof token !== 'string' || !token.trim() || token.length > 2048) return 'invalid';
  const allowedHosts = (process.env.TURNSTILE_ALLOWED_HOSTNAMES || 'francescocorsaro.it,www.francescocorsaro.it')
    .split(',').map(host => host.trim()).filter(Boolean);
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token }),
      signal: AbortSignal.timeout(5000),
      cache: 'no-store',
    });
    if (!response.ok) return 'unavailable';
    const result = await response.json();
    if (!result || typeof result !== 'object') return 'unavailable';
    return result.success === true && result.action === 'contact' &&
      typeof result.hostname === 'string' && allowedHosts.includes(result.hostname) ? 'valid' : 'invalid';
  } catch {
    return 'unavailable';
  }
}
