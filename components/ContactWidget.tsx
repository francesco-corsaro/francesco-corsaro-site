'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { site } from '@/lib/site';

export function ContactWidget() {
  const pathname = usePathname();
  const [formVisible, setFormVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  useEffect(() => {
    const form = document.getElementById('modulo-contatto');
    if (!form) return;
    const observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { rootMargin: '-90px 0px 0px 0px' });
    observer.observe(form);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div hidden={pathname === '/contatti' && formVisible && !open} className="contact-widget" ref={root} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <button className="contact-trigger" ref={trigger} type="button"
        aria-expanded={open} aria-controls="contact-options" onClick={() => setOpen(!open)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6 4V6a2 2 0 0 1 2-2Z" />
          <path d="M7 9h10M7 13h7" />
        </svg>
        {open ? 'Chiudi' : 'Scrivimi'}
      </button>
      <div className="contact-options" id="contact-options" hidden={!open}>
        <p>Come preferisci contattarmi?</p>
        <Link href="/contatti#modulo-contatto" onClick={() => setOpen(false)}>Scrivi dal modulo <span aria-hidden="true">→</span></Link>
        <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>WhatsApp <span aria-hidden="true">↗</span><span className="sr-only"> (si apre in una nuova scheda)</span></a>
      </div>
    </div>
  );
}
