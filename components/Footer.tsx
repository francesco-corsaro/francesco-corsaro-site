import Image from 'next/image';
import Link from 'next/link';
import { areas, nav, site } from '@/lib/site';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="footer-logo" aria-hidden="true"><Image src={site.logo} alt="" width={74} height={74} /></span>
            <span><strong>{site.name}</strong><small>Psicologo · Psicoterapeuta · Catania</small></span>
          </div>
          <p className="muted">Comprendere il proprio funzionamento per costruire nuove possibilità di cambiamento.</p>
        </div>
        <div><h2 className="footer-heading">Navigazione</h2>{nav.map(n => <Link key={n.href} href={n.href}>{n.label}</Link>)}</div>
        <div><h2 className="footer-heading">Aree</h2>{areas.slice(0,4).map(a => <Link key={a.href} href={a.href}>{a.title}</Link>)}</div>
        <div>
          <h2 className="footer-heading">Dati professionali</h2>
          <p>Ordine degli Psicologi della Regione Siciliana: n. {site.orderNumber}</p>
          <p>Partita IVA: {site.vat}</p>
          <p>Studio: {site.address}</p>
          <p>Telefono: <a href={site.phoneHref}>{site.phone}</a></p>
          <p>Email: <a href={`mailto:${site.email}`}>{site.email}</a></p>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/cookie-policy">Cookie Policy</Link>
        </div>
      </div>
      <div className="container footer-bottom"><p>© {new Date().getFullYear()} Francesco Corsaro. Informazioni a carattere divulgativo: il sito non sostituisce una valutazione clinica individuale.</p></div>
    </footer>
  );
}
