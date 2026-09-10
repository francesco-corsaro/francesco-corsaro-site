"use client";

import { FormEvent, useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState('');
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
    if (!email) {
      setStatus('Il modulo è pronto, ma l’indirizzo di destinazione deve ancora essere configurato. Puoi usare i recapiti indicati nella pagina non appena saranno inseriti.');
      return;
    }
    const name = String(form.get('name') || '');
    const contact = String(form.get('contact') || '');
    const message = String(form.get('message') || '');
    const subject = encodeURIComponent(`Richiesta primo colloquio - ${name}`);
    const body = encodeURIComponent(`Nome: ${name}\nRecapito: ${contact}\n\nMessaggio:\n${message}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <label>Nome<input name="name" autoComplete="name" required /></label>
      <label>Email o telefono<input name="contact" autoComplete="email" required /></label>
      <label>Messaggio<textarea name="message" rows={6} required /></label>
      <label className="check"><input type="checkbox" required /> <span>Ho letto l’informativa privacy e acconsento al trattamento dei dati per essere ricontattato/a.</span></label>
      <button className="btn" type="submit">Richiedi un primo colloquio</button>
      {status && <p className="form-status" role="status">{status}</p>}
    </form>
  );
}
