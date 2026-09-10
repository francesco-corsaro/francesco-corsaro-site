"use client";

import Link from 'next/link';
import { FormEvent, useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [startedAt, setStartedAt] = useState(() => Date.now());

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.currentTarget;
    const form = new FormData(formElement);
    setSending(true);
    setStatus('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(form.get('name') || ''),
          contact: String(form.get('contact') || ''),
          message: String(form.get('message') || ''),
          website: String(form.get('website') || ''),
          privacy: form.get('privacy') === 'on',
          startedAt,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || 'Invio non riuscito.');
      setStatus('Messaggio inviato. Ti ricontatterò utilizzando il recapito indicato.');
      formElement.reset();
      setStartedAt(Date.now());
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Non è stato possibile inviare il messaggio. Puoi contattarmi telefonicamente o via WhatsApp.');
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <label>Nome<input name="name" autoComplete="name" maxLength={100} required /></label>
      <label>Email o telefono<input name="contact" autoComplete="email" maxLength={160} required /></label>
      <label>Messaggio<textarea name="message" rows={6} maxLength={2000} required aria-describedby="message-help" /></label>
      <p id="message-help" className="form-help">Per tutelare la tua privacy, nel primo messaggio evita di inserire diagnosi, referti o dettagli clinici non necessari. È sufficiente indicare brevemente il motivo del contatto.</p>
      <label className="hp-field" aria-hidden="true">Sito web<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="check"><input type="checkbox" name="privacy" required /> <span>Ho letto l’<Link href="/privacy">informativa privacy</Link> e chiedo di essere ricontattato/a in merito alla mia richiesta.</span></label>
      <button className="btn" type="submit" disabled={sending}>{sending ? 'Invio in corso…' : 'Richiedi un primo colloquio'}</button>
      {status && <p className="form-status" role="status" aria-live="polite">{status}</p>}
    </form>
  );
}
