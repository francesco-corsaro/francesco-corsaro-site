"use client";

import { useEffect, useState } from 'react';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const enabled = process.env.NEXT_PUBLIC_ENABLE_COOKIE_BANNER === 'true';
  useEffect(() => { if (enabled) setVisible(localStorage.getItem('fc-cookie-choice') === null); }, [enabled]);
  if (!enabled || !visible) return null;
  const choose = (value:string) => { localStorage.setItem('fc-cookie-choice', value); setVisible(false); };
  return (
    <aside className="cookie" aria-label="Preferenze cookie">
      <div><strong>Privacy e cookie</strong><p>Il sito usa solo cookie tecnici finché non vengono configurati e accettati eventuali strumenti di analytics o marketing.</p></div>
      <div className="cookie-actions"><button className="btn btn-ghost" onClick={() => choose('necessary')}>Solo necessari</button><button className="btn" onClick={() => choose('accepted')}>Accetta opzionali</button></div>
    </aside>
  );
}
