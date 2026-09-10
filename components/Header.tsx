"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { nav, site } from '@/lib/site';

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Francesco Corsaro, homepage">
          <span className="brand-logo" aria-hidden="true">
            <Image src={site.logo} alt="" width={52} height={52} priority />
          </span>
          <span><strong>Francesco Corsaro</strong><small>Psicologo · Psicoterapeuta</small></span>
        </Link>
        <button className="menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
          <span className="sr-only">Apri menu</span>
          <span aria-hidden="true">{open ? 'Chiudi' : 'Menu'}</span>
        </button>
        <nav id="main-nav" className={open ? 'nav open' : 'nav'} aria-label="Navigazione principale">
          {nav.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
          <Link className="btn btn-small" href="/contatti" onClick={() => setOpen(false)}>Richiedi un colloquio</Link>
        </nav>
      </div>
    </header>
  );
}
