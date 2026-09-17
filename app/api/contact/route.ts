import { createHmac, randomUUID } from 'node:crypto';
import { logContactEvent } from '@/lib/contact-telemetry';
import { NextResponse } from 'next/server';
import { contactType, validateContact } from '@/lib/contact-validation';
import { checkContactRateLimit } from '@/lib/contact-rate-limit';

export async function POST(request: Request) {
  const requestId = randomUUID();
  const began = Date.now();
  const reply = (message: string, status: number) => {
    logContactEvent('rejected', requestId, status, Date.now() - began);
    return NextResponse.json({ message, requestId }, { status, headers: { 'Cache-Control': 'no-store' } });
  };
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return reply('Richiesta non consentita.', 403);
  const ip = request.headers.get('x-vercel-forwarded-for') || request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  let limit;
  try {
    limit = await checkContactRateLimit(ip);
  } catch {
    logContactEvent('limiter_unavailable', requestId, 503, Date.now() - began);
    return reply('Invio temporaneamente non disponibile. Riprova tra poco oppure usa telefono o WhatsApp.', 503);
  }
  if (!limit.allowed) {
    logContactEvent('rate_limited', requestId, 429, Date.now() - began, limit.mode);
    return NextResponse.json({ message: 'Hai effettuato diversi tentativi. Attendi dieci minuti oppure usa telefono o WhatsApp.', requestId }, { status: 429, headers: { 'Retry-After': String(limit.retryAfter), 'Cache-Control': 'no-store' } });
  }
  try {
    if (Number(request.headers.get('content-length')) > 16_384) return reply('Messaggio troppo lungo.', 413);
    const text = await request.text();
    if (new TextEncoder().encode(text).length > 16_384) return reply('Messaggio troppo lungo.', 413);
    const body = JSON.parse(text);
    if (!body || typeof body !== 'object' || Array.isArray(body)) return reply('Richiesta non valida.', 400);
    if (body.website) return NextResponse.json({ ok: true });
    const result = validateContact(body);
    if (!result.values) return reply(result.error, 400);
    const elapsed = Date.now() - Number(body.startedAt);
    if (!Number.isFinite(elapsed) || elapsed < 1200) return reply('Attendi qualche secondo prima di inviare il messaggio.', 400);
    const { name, contact, message } = result.values;
    const apiKey = process.env.RESEND_API_KEY;
    const destination = process.env.CONTACT_EMAIL_TO || process.env.NEXT_PUBLIC_CONTACT_EMAIL;
    if (!apiKey || !destination) {
      logContactEvent('configuration_missing', requestId, 503, Date.now() - began);
      return reply('Invio momentaneamente non disponibile. Usa uno dei recapiti qui sotto.', 503);
    }
    if (body.submissionId !== undefined && (typeof body.submissionId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.submissionId))) {
      return reply('Ricarica la pagina e riprova.', 400);
    }
    // Legacy tabs get a stable keyed digest; retries with the same payload reuse it.
    const legacyKey = createHmac('sha256', apiKey).update(JSON.stringify([name, contact, message, body.startedAt])).digest('hex');
    const idempotencyKey = `contact/${body.submissionId || legacyKey}`;
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
      body: JSON.stringify({
        from: process.env.CONTACT_EMAIL_FROM || 'Sito Francesco Corsaro <onboarding@resend.dev>',
        to: [destination],
        ...(contactType(contact) === 'email' ? { reply_to: contact } : {}),
        subject: `Richiesta dal sito - ${name.replace(/[\r\n]/g, ' ')}`,
        text: `Nome: ${name}\nRecapito: ${contact}\n\nMessaggio:\n${message}\n\nOrigine: modulo contatti del sito di Francesco Corsaro`,
      }),
      signal: AbortSignal.timeout(12_000),
      cache: 'no-store',
    });
    if (!response.ok) {
      logContactEvent('provider_rejected', requestId, response.status, Date.now() - began, limit.mode);
      return reply('Invio non riuscito. Il testo rimane nel modulo; puoi riprovare o usare un altro recapito.', 502);
    }
    logContactEvent('sent', requestId, 200, Date.now() - began, limit.mode);
    return NextResponse.json({ ok: true, requestId }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof SyntaxError) {
      logContactEvent('invalid_json', requestId, 400, Date.now() - began);
      return reply('Richiesta non valida.', 400);
    }
    logContactEvent('delivery_unconfirmed', requestId, 504, Date.now() - began);
    return reply('Non è stato possibile confermare l’invio. Il testo rimane nel modulo; prima di riprovare puoi contattarmi via telefono o WhatsApp.', 504);
  }
}
