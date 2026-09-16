import { NextResponse } from 'next/server';
import { contactType, validateContact } from '@/lib/contact-validation';
import { allowContact } from '@/lib/contact-rate-limit';

export async function POST(request: Request) {
  const reply = (message: string, status: number) => NextResponse.json({ message }, { status });
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return reply('Richiesta non consentita.', 403);
  const ip = request.headers.get('x-vercel-forwarded-for') || request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  if (!allowContact(ip)) return NextResponse.json({ message: 'Hai effettuato diversi tentativi. Attendi dieci minuti oppure usa telefono o WhatsApp.' }, { status: 429, headers: { 'Retry-After': '600' } });
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
    if (!apiKey || !destination) return reply('Invio momentaneamente non disponibile. Usa uno dei recapiti qui sotto.', 503);
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
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
    if (!response.ok) return reply('Invio non riuscito. Il testo rimane nel modulo; puoi riprovare o usare un altro recapito.', 502);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof SyntaxError) return reply('Richiesta non valida.', 400);
    return reply('Non è stato possibile confermare l’invio. Il testo rimane nel modulo; prima di riprovare puoi contattarmi via telefono o WhatsApp.', 504);
  }
}
