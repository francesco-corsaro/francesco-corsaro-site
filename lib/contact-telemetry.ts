type ContactEvent = 'rejected' | 'rate_limited' | 'limiter_unavailable' | 'configuration_missing' | 'provider_rejected' | 'sent' | 'invalid_json' | 'delivery_unconfirmed';

// Deliberately closed fields: never log request bodies, contact details, IPs,
// provider response bodies, exception messages or authorization headers.
export function logContactEvent(event: ContactEvent, requestId: string, status: number, durationMs: number, mode?: 'local' | 'shared') {
  console.info(JSON.stringify({ scope: 'contact', event, requestId, status, durationMs, ...(mode ? { limiter: mode } : {}) }));
}
