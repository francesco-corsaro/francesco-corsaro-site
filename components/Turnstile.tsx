"use client";

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

type TurnstileApi = {
  render: (element: HTMLElement, options: {
    sitekey: string; action: string; language: string; size: string;
    callback: (token: string) => void;
    'expired-callback': () => void;
    'error-callback': () => void;
    'timeout-callback': () => void;
  }) => string;
  remove: (id: string) => void;
};
declare global { interface Window { turnstile?: TurnstileApi } }

export function Turnstile({ onToken, attempt }: { onToken: (token: string) => void; attempt: number }) {
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [retry, setRetry] = useState(0);
  const [status, setStatus] = useState('Caricamento della verifica di sicurezza…');

  useEffect(() => {
    if (!sitekey || !ready || !container.current || !window.turnstile) return;
    const api = window.turnstile;
    let active = true;
    onToken('');
    setStatus('Completa la verifica di sicurezza.');
    const failed = () => {
      if (!active) return;
      onToken('');
      setStatus('Verifica non riuscita. Riprova oppure usa telefono, email o WhatsApp.');
    };
    let id: string | undefined;
    try {
      id = api.render(container.current, {
        sitekey, action: 'contact', language: 'it', size: 'flexible',
        callback: token => { if (active) { onToken(token); setStatus('Verifica completata. Puoi inviare il messaggio.'); } },
        'expired-callback': () => { if (active) { onToken(''); setStatus('Verifica scaduta. Completa nuovamente il controllo.'); } },
        'error-callback': failed,
        'timeout-callback': failed,
      });
    } catch { failed(); }
    return () => { active = false; if (id !== undefined) api.remove(id); };
  }, [ready, retry, attempt, onToken, sitekey]);

  if (!sitekey) return <p role="status">Il modulo è temporaneamente non disponibile. Puoi contattarmi via telefono, email o WhatsApp qui sotto.</p>;
  return <div className="security-check">
    <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={() => setReady(true)} onError={() => { onToken(''); setStatus('Impossibile caricare la verifica. Usa uno dei recapiti qui sotto.'); }} />
    <div ref={container} />
    <p className="form-help" role="status" aria-live="polite">{status}</p>
    {ready && <button type="button" className="cookie-settings" onClick={() => { onToken(''); setRetry(value => value + 1); }}>Ripeti verifica</button>}
    <p className="form-help">Protezione antispam Cloudflare Turnstile. <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Privacy Cloudflare</a>.</p>
  </div>;
}
