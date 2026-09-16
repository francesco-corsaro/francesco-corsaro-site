"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { nav, site } from '@/lib/site';

export function Header() {
  const pathname = usePathname();
  const header = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open]);
  return (
    <header ref={header} className="site-header" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }} onKeyDown={(event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    }}>
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Francesco Corsaro, homepage">
          <span className="brand-logo" aria-hidden="true">
            <Image src={site.logo} alt="" width={52} height={52} priority />
          </span>
          <span><strong>Francesco Corsaro</strong><small>Psicologo · Psicoterapeuta</small></span>
        </Link>
        <button ref={menuButton} type="button" className="menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
          <span className="sr-only">{open ? 'Chiudi menu' : 'Apri menu'}</span>
          <span aria-hidden="true">{open ? 'Chiudi' : 'Menu'}</span>
        </button>
        <nav id="main-nav" className={open ? 'nav open' : 'nav'} aria-label="Navigazione principale">
          {nav.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined} onClick={() => setOpen(false)}>{item.label}</Link>)}
          <Link className="btn btn-small" href="/contatti" onClick={() => setOpen(false)}>Richiedi un colloquio</Link>
        </nav>
      </div>
    </header>
  );
}
