"use client";

import { Turnstile } from '@/components/Turnstile';
import Link from 'next/link';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { contactType } from '@/lib/contact-validation';
import { site } from '@/lib/site';

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const feedback = useRef<HTMLDivElement>(null);
  const nameField = useRef<HTMLInputElement>(null);
  const submitting = useRef(false);
  const requestId = useRef('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [startedAt, setStartedAt] = useState(() => Date.now());

  useEffect(() => {
    if (!sent && !status) return;
    feedback.current?.focus({ preventScroll: true });
    feedback.current?.scrollIntoView({ block: 'center', behavior: 'instant' });
  }, [sent, status]);

  function writeAnother() {
    requestId.current = '';
    setSent(false);
    setStatus('');
    setStartedAt(Date.now());
    requestAnimationFrame(() => nameField.current?.focus());
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting.current) return;
    if (!turnstileToken) { setStatus('Completa la verifica di sicurezza prima di inviare.'); return; }
    const formElement = e.currentTarget;
    const form = new FormData(formElement);
    const contactInput = formElement.elements.namedItem('contact') as HTMLInputElement;
    if (!contactType(contactInput.value.trim())) {
      contactInput.setCustomValidity('Inserisci un’email valida oppure un numero di telefono completo.');
      contactInput.reportValidity();
      return;
    }
    submitting.current = true;
    requestId.current ||= crypto.randomUUID();
    setSending(true);
    setStatus('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(22_000),
        body: JSON.stringify({
          name: String(form.get('name') || ''),
          contact: String(form.get('contact') || ''),
          message: String(form.get('message') || ''),
          website: String(form.get('website') || ''),
          privacy: form.get('privacy') === 'on',
          startedAt,
          turnstileToken,
          requestId: requestId.current,
        }),
      });
      const data = await response.json();
      if (!response.ok || data?.ok !== true) throw new Error(data?.message || 'Invio non riuscito.');
      setSent(true);
      formElement.reset();
      setStartedAt(Date.now());
    } catch (error) {
      setStatus(error instanceof Error && error.name !== 'TimeoutError' && error.name !== 'TypeError' ? error.message : 'Non è stato possibile confermare l’invio. Il messaggio rimane nel modulo. Puoi contattarmi ai recapiti qui sotto.');
    } finally {
      submitting.current = false;
      setSending(false);
      setTurnstileToken('');
      setAttempt(value => value + 1);
    }
  }

  return (
    <div id="modulo-contatto">
    {sent ? <div className="contact-success" ref={feedback} tabIndex={-1} role="status" aria-labelledby="contact-success-title">
      <span className="contact-success-icon" aria-hidden="true">✓</span>
      <h3 id="contact-success-title">Messaggio inviato</h3>
      <p>Grazie per avermi scritto. La tua richiesta è stata inviata correttamente.</p>
      <p>Ti ricontatterò al recapito che hai indicato. <strong>Non è necessario inviare nuovamente il messaggio.</strong></p>
      <div className="actions"><Link className="btn" href="/">Torna alla home</Link><button className="btn btn-ghost" type="button" onClick={writeAnother}>Scrivi un altro messaggio</button></div>
    </div> : <form className="contact-form" onSubmit={submit} aria-busy={sending}>
      {status && <div className="contact-error" ref={feedback} tabIndex={-1} role="alert"><h3>Invio non confermato</h3><p>{status}</p><p>Il testo è rimasto nel modulo.</p></div>}
      <fieldset className="contact-fields" disabled={sending}>
      <legend className="sr-only">La tua richiesta di contatto</legend>
      <label>Nome<input ref={nameField} name="name" autoComplete="name" maxLength={100} required /></label>
      <label>Email o telefono<input name="contact" autoComplete="email" onInput={(event) => event.currentTarget.setCustomValidity('')} aria-describedby="contact-help" maxLength={160} required /></label>
      <p id="contact-help" className="form-help">Indica il recapito al quale desideri essere ricontattato.</p>
      <label>Messaggio<textarea name="message" rows={6} minLength={3} maxLength={2000} required aria-describedby="message-help" /></label>
      <p id="message-help" className="form-help">Per tutelare la tua privacy, nel primo messaggio evita di inserire diagnosi, referti o dettagli clinici non necessari. È sufficiente indicare brevemente il motivo del contatto.</p>
      <label className="hp-field" aria-hidden="true">Sito web<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="check"><input type="checkbox" name="privacy" required /> <span>Ho letto l’<Link href="/privacy">informativa privacy</Link> e chiedo di essere ricontattato/a in merito alla mia richiesta.</span></label>
      <Turnstile onToken={setTurnstileToken} attempt={attempt} />
      <p className="form-help">In alternativa: <a href={site.phoneHref}>Chiama</a> · <a href={`mailto:${site.email}`}>Email</a> · <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
      <button className="btn" type="submit" disabled={sending || !turnstileToken}>{sending ? <><span className="send-spinner" aria-hidden="true" /> Invio in corso…</> : 'Invia il messaggio'}</button>
      </fieldset>
      <p className="send-progress" role="status" aria-live="polite">{sending ? 'Sto inviando il messaggio. Attendi la conferma prima di chiudere questa pagina.' : ''}</p>
    </form>}
    </div>
  );
}
