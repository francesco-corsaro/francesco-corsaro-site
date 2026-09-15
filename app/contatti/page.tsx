import { ContactForm } from '@/components/ContactForm';
import { BreadcrumbJsonLd } from '@/components/SeoJsonLd';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Contatti e primo colloquio',
  description: 'Contatta Francesco Corsaro, psicologo e psicoterapeuta a Catania, per richiedere un primo colloquio in studio o online.',
  path: '/contatti'
});

export default function Page(){return <>
<BreadcrumbJsonLd items={[{name:'Home',path:'/'},{name:'Contatti',path:'/contatti'}]} />
<section className="page-hero"><div className="container narrow"><span className="eyebrow">Contatti</span><h1>Possiamo partire da ciò che sta succedendo adesso.</h1><p className="lead">Il primo colloquio serve a comprendere la situazione, chiarire la richiesta e valutare insieme come procedere.</p></div></section><section className="section"><div className="container contact-grid"><div><h2>Recapiti</h2><div className="contact-data"><p><span>Nome</span><strong>{site.name}</strong></p><p><span>Indirizzo</span><strong>{site.streetAddress}</strong></p><p><span>Città</span><strong>{site.addressLocality}</strong></p><p><span>Provincia</span><strong>{site.addressRegion}</strong></p><p><span>CAP</span><strong>{site.postalCode}</strong></p><p><span>Telefono</span><strong><a href={site.phoneHref}>{site.phone}</a></strong></p><p><span>Sito</span><strong><a href={site.publicUrl}>{site.publicUrl}</a></strong></p><p><span>Email</span><strong><a href={`mailto:${site.email}`}>{site.email}</a></strong></p><p><span>WhatsApp</span><strong><a href={site.whatsappHref} target="_blank" rel="noreferrer">{site.whatsapp}</a></strong></p><p><span>Terapia online</span><strong>{site.onlineTherapy ? 'Disponibile' : 'Non disponibile'}</strong></p><p><span>Durata seduta</span><strong>{site.sessionDuration} minuti</strong></p></div><div className="note"><strong>Nota per situazioni urgenti</strong><p>Questo modulo non è un servizio di emergenza. In una situazione di pericolo immediato è necessario rivolgersi ai servizi di emergenza territoriali.</p></div></div><div><h2>Richiedi un primo colloquio</h2><ContactForm/></div></div></section></>}
