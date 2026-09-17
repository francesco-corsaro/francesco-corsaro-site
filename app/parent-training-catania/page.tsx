import Link from 'next/link';
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/SeoJsonLd';
import { pageMetadata } from '@/lib/seo';

const path='/parent-training-catania';
const description='Parent training a Catania per ADHD, autismo, oppositività e difficoltà comportamentali: strategie educative e relazionali personalizzate.';

export const metadata=pageMetadata({title:'Parent training a Catania',description,path});

export default function Page(){return <>
<BreadcrumbJsonLd items={[{name:'Home',path:'/'},{name:'Aree di intervento',path:'/aree-di-intervento'},{name:'Parent training',path}]} />
<ServiceJsonLd name="Parent training e supporto ai genitori" description={description} path={path} audience="Genitori e famiglie" />
<section className="page-hero"><div className="container narrow"><span className="eyebrow">Parent training a Catania</span><h1>Genitori: comprendere le difficoltà e costruire strategie insieme.</h1><p className="lead">Il parent training è un percorso rivolto ai genitori. Partiamo dalle situazioni che si ripetono in famiglia per individuare modalità educative e comunicative adatte al bambino o all’adolescente e sostenibili per chi se ne prende cura.</p></div></section><section className="section"><div className="container prose">
        <h2>Quali situazioni possiamo affrontare?</h2><ul><li>Routine, compiti o passaggi da un’attività all’altra diventano spesso occasioni di conflitto.</li><li>Fai fatica a capire cosa precede un comportamento e come rispondere in modo coerente.</li><li>In presenza di ADHD o autismo, cerchi strategie più adatte ai bisogni di tuo figlio.</li></ul>
        <h2>Un lavoro su episodi concreti</h2><p>Possiamo ricostruire insieme una situazione recente: cosa è successo prima, come hanno reagito le persone coinvolte e cosa è accaduto dopo. Questo aiuta a formulare ipotesi e scegliere su quale aspetto intervenire.</p>
        <h2>Dalla comprensione alla pratica</h2><p>Lavoriamo sulla chiarezza delle richieste, sulla prevedibilità delle routine e sulla comunicazione. Le strategie vengono adattate alla famiglia e riviste sulla base di ciò che succede nella quotidianità, tenendo conto anche della fatica dei genitori.</p>
        <div className="note"><strong>Prima di iniziare</strong><p>Il parent training coinvolge i genitori e non coincide automaticamente con una terapia individuale per il figlio. Nel primo colloquio definiamo insieme la richiesta e le modalità più appropriate.</p></div>
        <p><Link className="text-link" href="/psicologo-adolescenti-catania">Approfondisci il lavoro con gli adolescenti</Link></p>
        <p>Ricevo a Catania. Per organizzare il primo incontro puoi scrivermi dal modulo o su WhatsApp.</p>
        <Link className="btn" href="/contatti">Parliamone in un primo colloquio</Link>
        <p><Link className="text-link" href="/faq">Domande pratiche sul percorso</Link></p>
</div></section></>}
