import Link from 'next/link';
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/SeoJsonLd';
import { pageMetadata } from '@/lib/seo';

const path='/psicologo-ansia-catania';
const description='Psicoterapia per ansia a Catania con Francesco Corsaro. Comprendere preoccupazione, evitamento, attivazione corporea e strategie che mantengono il disagio.';

export const metadata=pageMetadata({title:'Psicologo per ansia a Catania',description,path});

export default function Page(){return <>
<BreadcrumbJsonLd items={[{name:'Home',path:'/'},{name:'Aree di intervento',path:'/aree-di-intervento'},{name:'Ansia',path}]} />
<ServiceJsonLd name="Psicoterapia per ansia" description={description} path={path} audience="Adolescenti e giovani adulti" />
<section className="page-hero"><div className="container narrow"><span className="eyebrow">Psicologo per ansia a Catania</span><h1>Ansia: quando preoccupazioni e tensione limitano le tue giornate.</h1><p className="lead">Lavoro con adolescenti e giovani adulti che sentono l’ansia occupare troppo spazio nello studio, nelle relazioni o nelle scelte quotidiane. Partiamo dalle situazioni in cui accade e da ciò che provi a fare per affrontarla.</p></div></section><section className="section"><div className="container prose">
        <h2>Ti riconosci in queste situazioni?</h2><ul><li>Ripensi a lungo a ciò che potrebbe andare male, anche dopo aver cercato rassicurazioni.</li><li>Eviti incontri, esami o decisioni perché temi di non riuscire a gestirli.</li><li>Ti senti spesso in tensione e fai fatica a prendere distanza dalle preoccupazioni.</li></ul>
        <h2>Da dove partiamo</h2><p>Nel primo colloquio possiamo ricostruire un episodio recente: cosa stava succedendo, quali pensieri e sensazioni hai notato e come hai reagito. Ci interessa capire quanto questa difficoltà incide sulla tua vita e quali tentativi hai già fatto.</p>
        <h2>Su cosa possiamo lavorare</h2><p>Esploriamo il legame tra preoccupazioni, sensazioni corporee e strategie come evitare o controllare. Concordiamo obiettivi legati alla tua quotidianità e cerchiamo risposte più flessibili, verificando insieme ciò che risulta utile.</p>
        <div className="note"><strong>Prima di iniziare</strong><p>Riconoscersi in questi esempi non equivale a una diagnosi. Il colloquio serve a comprendere la tua situazione.</p></div>
        <p><Link className="text-link" href="/psicoterapia-giovani-adulti-catania">Scelte, relazioni e passaggi della vita adulta</Link></p>
        <p>Ricevo a Catania. Per organizzare il primo incontro puoi scrivermi dal modulo o su WhatsApp.</p>
        <Link className="btn" href="/contatti">Parliamone in un primo colloquio</Link>
        <p><Link className="text-link" href="/faq">Domande pratiche sul percorso</Link></p>
</div></section></>}
