"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const cookieName = 'fc_cookie_notice';
const cookieVersion = 'v1';

export function CookieSettingsButton() {
  return <button type="button" className="cookie-settings" onClick={() => window.dispatchEvent(new Event('fc:cookie-settings'))}>Gestisci cookie</button>;
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setOpen(!document.cookie.split('; ').includes(`${cookieName}=${cookieVersion}`));
    const show = () => {
      returnFocus.current = document.activeElement as HTMLElement;
      setDetails(true);
      setOpen(true);
      requestAnimationFrame(() => heading.current?.focus());
    };
    window.addEventListener('fc:cookie-settings', show);
    return () => window.removeEventListener('fc:cookie-settings', show);
  }, []);

  function dismiss() {
    const expires = new Date();
    expires.setMonth(expires.getMonth() + 6);
    document.cookie = `${cookieName}=${cookieVersion}; Path=/; Expires=${expires.toUTCString()}; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
    setOpen(false);
    returnFocus.current?.focus();
  }

  if (!open) return null;
  return <section className="cookie cookie-notice" aria-labelledby="cookie-title" onKeyDown={event => { if (event.key === 'Escape') dismiss(); }}>
    <div>
      <h2 id="cookie-title" ref={heading} tabIndex={-1}>Cookie e privacy</h2>
      <p>Questo sito utilizza solo strumenti tecnici necessari. Non utilizza cookie pubblicitari, Google Analytics o Meta Pixel. Non è richiesto il consenso per i cookie tecnici.</p>
      <p>La chiusura del pannello mantiene solo gli strumenti necessari. <Link href="/cookie-policy">Leggi la Cookie Policy</Link>.</p>
      <button className="cookie-settings" type="button" aria-expanded={details} aria-controls="cookie-details" onClick={() => setDetails(!details)}>Dettagli sui cookie</button>
      {details && <div id="cookie-details"><p><strong>Necessari:</strong> funzionamento e sicurezza; un cookie ricorda per sei mesi la chiusura di questo avviso.</p><p><strong>Statistiche e pubblicità:</strong> non presenti. Nessun consenso a futuri strumenti viene raccolto.</p></div>}
    </div>
    <div className="cookie-actions">
      <button className="btn btn-ghost" type="button" onClick={dismiss}>Chiudi</button>
      <button className="btn" type="button" onClick={dismiss}>Accetta solo necessari</button>
    </div>
  </section>;
}
