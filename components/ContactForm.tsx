"use client";

import Link from 'next/link';
import { FormEvent, useRef, useState } from 'react';
import { contactType } from '@/lib/contact-validation';
import { site } from '@/lib/site';

export function ContactForm() {
  const attempt = useRef<{ signature: string; id: string; createdAt: number } | null>(null);
  const busy = useRef(false);
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [startedAt, setStartedAt] = useState(() => Date.now());

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy.current) return;
    const formElement = e.currentTarget;
    const form = new FormData(formElement);
    const contactInput = formElement.elements.namedItem('contact') as HTMLInputElement;
    if (!contactType(contactInput.value.trim())) {
      contactInput.setCustomValidity('Inserisci un’email valida oppure un numero di telefono completo.');
      contactInput.reportValidity();
      return;
    }
    const payload = {
      name: String(form.get('name') || '').trim(),
      contact: String(form.get('contact') || '').trim(),
      message: String(form.get('message') || '').trim(),
      website: String(form.get('website') || ''),
      privacy: form.get('privacy') === 'on',
      startedAt,
    };
    const signature = JSON.stringify(payload);
    if (attempt.current && Date.now() - attempt.current.createdAt >= 23 * 60 * 60 * 1000) {
      setStatus('Il tentativo precedente risale a oltre 23 ore fa. Per verificare l’invio prima di riprovare, contattami via telefono o WhatsApp.');
      return;
    }
    if (!attempt.current || attempt.current.signature !== signature) {
      attempt.current = { signature, id: crypto.randomUUID(), createdAt: Date.now() };
    }
    busy.current = true;
    setSending(true);
    setStatus('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(18_000),
        body: JSON.stringify({ ...payload, submissionId: attempt.current.id }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || 'Invio non riuscito.');
      setStatus('Messaggio inviato. Ti ricontatterò utilizzando il recapito indicato.');
      formElement.reset();
      attempt.current = null;
      setStartedAt(Date.now());
    } catch (error) {
      setStatus(error instanceof Error && error.name !== 'TimeoutError' && error.name !== 'TypeError' ? error.message : 'Non è stato possibile confermare l’invio. Il messaggio rimane nel modulo. Puoi contattarmi ai recapiti qui sotto.');
    } finally {
      busy.current = false;
      setSending(false);
    }
  }

  return (
    <form id="modulo-contatto" className="contact-form" onSubmit={submit}>
      <label>Nome<input name="name" autoComplete="name" maxLength={100} readOnly={sending} required /></label>
      <label>Email o telefono<input name="contact" autoComplete="email" onInput={(event) => event.currentTarget.setCustomValidity('')} aria-describedby="contact-help" maxLength={160} readOnly={sending} required /></label>
      <p id="contact-help" className="form-help">Indica il recapito al quale desideri essere ricontattato.</p>
      <label>Messaggio<textarea name="message" rows={6} minLength={3} maxLength={2000} readOnly={sending} required aria-describedby="message-help" /></label>
      <p id="message-help" className="form-help">Per tutelare la tua privacy, nel primo messaggio evita di inserire diagnosi, referti o dettagli clinici non necessari. È sufficiente indicare brevemente il motivo del contatto.</p>
      <label className="hp-field" aria-hidden="true">Sito web<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="check"><input type="checkbox" name="privacy" required /> <span>Ho letto l’<Link href="/privacy">informativa privacy</Link> e chiedo di essere ricontattato/a in merito alla mia richiesta.</span></label>
      <button className="btn" type="submit" disabled={sending}>{sending ? 'Invio in corso…' : 'Richiedi un primo colloquio'}</button>
      {status && <div className="form-status" role="status" aria-live="polite"><p>{status}</p><a href={site.phoneHref}>Chiama</a> · <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a></div>}
    </form>
  );
}
