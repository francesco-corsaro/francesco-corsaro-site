import Link from 'next/link';
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/SeoJsonLd';
import { pageMetadata } from '@/lib/seo';

const path='/psicologo-autismo-catania';
const description='Supporto psicologico per autismo e neurodivergenze a Catania, centrato su bisogni, punti di forza, regolazione, contesto e qualità di vita.';

export const metadata=pageMetadata({title:'Psicologo autismo a Catania',description,path});

export default function Page(){return <>
<BreadcrumbJsonLd items={[{name:'Home',path:'/'},{name:'Aree di intervento',path:'/aree-di-intervento'},{name:'Autismo e neurodivergenze',path}]} />
<ServiceJsonLd name="Supporto psicologico per autismo e neurodivergenze" description={description} path={path} audience="Persone autistiche e famiglie" />
<section className="page-hero"><div className="container narrow"><span className="eyebrow">Psicologo autismo a Catania</span><h1>Autismo: un supporto costruito sui bisogni della persona.</h1><p className="lead">Lavoro con persone autistiche e famiglie, con attenzione alla comunicazione, alla regolazione e ai contesti di vita. Il punto di partenza sono i bisogni e le risorse della persona, per concordare obiettivi che abbiano significato nella sua quotidianità.</p></div></section><section className="section"><div className="container prose">
        <h2>Da quali situazioni possiamo partire?</h2><ul><li>Cambiamenti o richieste poco chiare rendono faticosa la giornata.</li><li>È difficile comunicare bisogni, disagio o la necessità di una pausa.</li><li>La famiglia cerca modi più comprensibili e sostenibili per organizzare routine e interazioni.</li></ul>
        <h2>Comprendere il contesto</h2><p>Nel primo confronto raccogliamo la richiesta e ricostruiamo le situazioni in cui emergono le difficoltà. Consideriamo comunicazione, stimoli, prevedibilità e sostegni già presenti, insieme ai punti di forza e alle preferenze della persona.</p>
        <h2>Obiettivi e modalità di lavoro</h2><p>La mia esperienza clinica ed educativa orienta un lavoro che può integrare supporti strutturati e strategie comportamentali, quando utili alla situazione. Concordiamo obiettivi legati alla comunicazione dei bisogni, alla partecipazione e alla qualità di vita, nel rispetto della neurodiversità.</p>
        <div className="note"><strong>Prima di iniziare</strong><p>Le modalità di supporto e il coinvolgimento della famiglia vengono valutati in base all’età, alla comunicazione e alla richiesta. Il primo colloquio serve anche a chiarire se il lavoro proposto è adatto.</p></div>
        <p><Link className="text-link" href="/parent-training-catania">Approfondisci il lavoro con i genitori</Link></p>
        <p>Ricevo a Catania. Per organizzare il primo incontro puoi scrivermi dal modulo o su WhatsApp.</p>
        <Link className="btn" href="/contatti">Parliamone in un primo colloquio</Link>
        <p><Link className="text-link" href="/faq">Domande pratiche sul percorso</Link></p>
</div></section></>}
