import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { BreadcrumbJsonLd } from '@/components/SeoJsonLd';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata({ title: 'Contatti e primo colloquio', description: 'Contatta Francesco Corsaro, psicologo e psicoterapeuta a Catania, per richiedere un primo colloquio in studio o online.', path: '/contatti' });

export default function Page() {
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.address)}`;
  return <>
    <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Contatti', path: '/contatti' }]} />
    <section className="page-hero contact-hero">
      <div className="container narrow">
        <span className="eyebrow">Contatti</span>
        <h1>Richiedi un primo colloquio</h1>
        <p className="lead">Scegli come contattarmi: possiamo partire da una breve richiesta e concordare insieme un primo incontro.</p>
        <div className="actions"><a className="btn" href="#modulo-contatto">Scrivi dal modulo</a><a className="btn btn-ghost" href={site.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a><a className="btn btn-ghost" href={site.phoneHref}>Chiama</a></div>
      </div>
    </section>
    <section className="section">
      <div className="container contact-grid">
        <div>
          <h2>Scrivimi</h2>
          <p>Ti ricontatterò al recapito indicato per chiarire la richiesta e concordare le modalità del primo colloquio.</p>
          <ContactForm />
          <div className="note"><strong>Prima di fissare il colloquio</strong><p>Puoi chiedermi informazioni su costo, disponibilità e modalità degli incontri. Per iniziare bastano una breve descrizione della richiesta e un recapito.</p><Link className="text-link" href="/faq">Leggi le risposte alle domande frequenti</Link></div>
        </div>
        <aside aria-label="Studio e recapiti">
          <h2>Lo studio</h2>
          <address className="studio-address"><strong>{site.name}</strong><br />{site.streetAddress}<br />{site.postalCode} {site.addressLocality} ({site.addressRegion})</address>
          <a className="text-link" href={directions} target="_blank" rel="noopener noreferrer">Indicazioni stradali <span className="sr-only">(apre Google Maps)</span></a>
          <div className="contact-data">
            <p><span>Telefono</span><strong><a href={site.phoneHref}>{site.phone}</a></strong></p>
            <p><span>Email</span><strong><a href={`mailto:${site.email}`}>{site.email}</a></strong></p>
            <p><span>WhatsApp</span><strong><a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">{site.whatsapp}</a></strong></p>
            <p><span>Durata seduta</span><strong>{site.sessionDuration} minuti</strong></p>
            <p><span>Incontri online</span><strong>{site.onlineTherapy ? 'Disponibili, da concordare insieme' : 'Non disponibili'}</strong></p>
            <p><span>Sito</span><strong><a href={site.publicUrl}>{site.publicUrl}</a></strong></p>
          </div>
          <div className="note"><strong>Per le urgenze</strong><p>Il modulo non è un servizio di emergenza. In una situazione di pericolo immediato rivolgiti ai servizi di emergenza territoriali.</p></div>
        </aside>
      </div>
    </section>
  </>;
}
