import { NextResponse } from 'next/server';

const MAX_NAME = 100;
const MAX_CONTACT = 160;
const MAX_MESSAGE = 2000;

function clean(value: unknown, max: number) {
  return String(value ?? '').trim().slice(0, max);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = clean(body.name, MAX_NAME);
    const contact = clean(body.contact, MAX_CONTACT);
    const message = clean(body.message, MAX_MESSAGE);
    const website = clean(body.website, 200);
    const privacy = body.privacy === true;

    if (website) return NextResponse.json({ ok: true });
    if (!name || !contact || !message || !privacy) {
      return NextResponse.json({ message: 'Compila tutti i campi richiesti e conferma di aver letto l’informativa privacy.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const destination = process.env.CONTACT_EMAIL_TO || process.env.NEXT_PUBLIC_CONTACT_EMAIL;
    const from = process.env.CONTACT_EMAIL_FROM || 'Sito Francesco Corsaro <onboarding@resend.dev>';

    if (!apiKey || !destination) {
      return NextResponse.json({ message: 'Il modulo non è ancora configurato per l’invio. Puoi contattarmi telefonicamente o via WhatsApp.' }, { status: 503 });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [destination],
        subject: `Richiesta dal sito - ${name}`,
        text: `Nome: ${name}\nRecapito: ${contact}\n\nMessaggio:\n${message}\n\nOrigine: modulo contatti francescocorsaro.it`,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ message: 'Non è stato possibile inviare il messaggio. Puoi contattarmi telefonicamente o via WhatsApp.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: 'Richiesta non valida. Riprova oppure usa telefono o WhatsApp.' }, { status: 400 });
  }
}
