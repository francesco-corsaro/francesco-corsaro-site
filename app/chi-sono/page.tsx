import Image from 'next/image';
import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/SeoJsonLd';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Chi sono',
  description: 'Conosci Francesco Corsaro, psicologo e psicoterapeuta a Catania: formazione ALETEIA, esperienza con adolescenti, neurodivergenze e famiglie.',
  path: '/chi-sono'
});

export default function Page() {
  const hasVat = !site.vat.startsWith('[');
  return <>
    <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Chi sono', path: '/chi-sono' }]} />
    <section className="page-hero"><div className="container narrow">
      <span className="eyebrow">Chi sono</span>
      <h1>Sono Francesco Corsaro, psicologo e psicoterapeuta.</h1>
      <p className="lead">A Catania accompagno adolescenti, giovani adulti e genitori che affrontano ansia, difficoltà emotive e relazionali, ADHD e autismo. Il mio lavoro parte dall’ascolto della persona e dalle situazioni concrete della sua vita.</p>
    </div></section>
    <section className="section"><div className="container about-grid">
      <figure className="about-photo"><Image src={site.photo} alt="Francesco Corsaro, psicologo e psicoterapeuta" fill sizes="(max-width: 960px) 100vw, 42vw" className="portrait-image" /></figure>
      <div className="prose">
        <h2>La mia formazione</h2>
        <p>Sono laureato in Psicologia Clinica e ho completato la formazione quadriennale in Psicoterapia Cognitiva Complessa presso la Scuola ALETEIA.</p>
        <p>Questo orientamento guida il mio modo di collegare ciò che una persona pensa, sente e fa alla sua storia e alle relazioni. Mi interessa comprendere come una difficoltà si mantiene e quali possibilità di cambiamento possiamo costruire insieme.</p>
        <h2>L’esperienza che porto nel lavoro clinico</h2>
        <p>Ho maturato esperienza con adolescenti, persone con ADHD, persone autistiche e famiglie, sia in ambito clinico sia in contesti educativi. Il confronto con la vita quotidiana orienta la mia attenzione verso scuola, autonomia, comunicazione e relazioni familiari.</p>
        <p>Integro strategie strutturate e comportamentali quando sono utili agli obiettivi concordati, adattandole alle caratteristiche della persona e del suo ambiente.</p>
        <h2>Cosa puoi aspettarti da un incontro con me</h2>
        <p>Partiamo dal motivo che ti ha portato a chiedere aiuto. Ti propongo domande per ricostruire cosa accade, come lo vivi e cosa hai già tentato. Non serve arrivare con una spiegazione completa: possiamo darle forma insieme.</p>
        <p>Definiamo obiettivi comprensibili e facciamo il punto sull’andamento del percorso. La diagnosi, quando presente, è un riferimento da integrare con la tua esperienza, i tuoi bisogni e le tue risorse.</p>
        <p><Link className="text-link" href="/come-lavoro">Il mio approccio, spiegato attraverso esempi</Link></p>
        <h2>I miei interessi clinici</h2>
        <p>Approfondisco i rapporti tra psicoterapia, neuroscienze, psicofisiologia, attaccamento e autoregolazione. Questi interessi sostengono il lavoro di comprensione, che in seduta manteniamo legato a ciò che conta per te.</p>
        <div className="note"><strong>Informazioni professionali</strong><p>Iscritto all’Ordine degli Psicologi della Regione Siciliana, n. {site.orderNumber}.</p>{hasVat && <p>Partita IVA: {site.vat}.</p>}</div>
        <Link className="btn" href="/contatti">Conosciamoci in un primo colloquio</Link>
      </div>
    </div></section>
  </>;
}
