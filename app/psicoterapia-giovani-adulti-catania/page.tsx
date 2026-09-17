import Link from 'next/link';
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/SeoJsonLd';
import { pageMetadata } from '@/lib/seo';

const path='/psicoterapia-giovani-adulti-catania';
const description='Psicoterapia per giovani adulti a Catania: ansia, blocchi, relazioni, procrastinazione, scelte e costruzione dell’identità.';

export const metadata=pageMetadata({title:'Psicoterapia giovani adulti a Catania',description,path});

export default function Page(){return <>
<BreadcrumbJsonLd items={[{name:'Home',path:'/'},{name:'Aree di intervento',path:'/aree-di-intervento'},{name:'Giovani adulti',path}]} />
<ServiceJsonLd name="Psicoterapia per giovani adulti" description={description} path={path} audience="Giovani adulti" />
<section className="page-hero"><div className="container narrow"><span className="eyebrow">Psicoterapia giovani adulti a Catania</span><h1>Giovani adulti: affrontare scelte, relazioni e momenti di blocco.</h1><p className="lead">Studio, lavoro, autonomia e relazioni possono aprire possibilità e, allo stesso tempo, creare incertezza. Lavoro con giovani adulti che desiderano capire un disagio o una difficoltà ricorrente e trovare una direzione più vicina ai propri bisogni.</p></div></section><section className="section"><div className="container prose">
        <h2>Da cosa possiamo partire?</h2><ul><li>Una scelta di studio o lavoro resta sospesa e ogni possibilità sembra sbagliata.</li><li>Nelle relazioni ritornano conflitti, timori o modalità che vorresti comprendere meglio.</li><li>Ti confronti continuamente con gli altri e senti una distanza tra ciò che fai e ciò che desideri.</li></ul>
        <h2>Dare un senso al blocco</h2><p>Nel colloquio ricostruiamo cosa sta accadendo e quale significato ha per te. Consideriamo aspettative, emozioni, storia personale e condizioni concrete, per distinguere le diverse parti della difficoltà.</p>
        <h2>Costruire una direzione</h2><p>Possiamo lavorare sul riconoscimento dei bisogni, sui modi di affrontare l’incertezza e sulle dinamiche relazionali. Gli obiettivi si definiscono insieme e vengono rivisti nel percorso: anche una richiesta inizialmente poco chiara può essere un punto di partenza.</p>
        <div className="note"><strong>Prima di iniziare</strong><p>Non occorre arrivare con una diagnosi o con una spiegazione già pronta. Puoi partire da ciò che, oggi, senti più difficile.</p></div>
        <p><Link className="text-link" href="/psicologo-ansia-catania">Quando la difficoltà principale è l’ansia</Link></p>
        <p>Ricevo a Catania. Per organizzare il primo incontro puoi scrivermi dal modulo o su WhatsApp.</p>
        <Link className="btn" href="/contatti">Parliamone in un primo colloquio</Link>
        <p><Link className="text-link" href="/faq">Domande pratiche sul percorso</Link></p>
</div></section></>}
