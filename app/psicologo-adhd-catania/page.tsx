import Link from 'next/link';
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/SeoJsonLd';
import { pageMetadata } from '@/lib/seo';

const path='/psicologo-adhd-catania';
const description='Supporto psicologico per ADHD a Catania: attenzione, funzioni esecutive, procrastinazione, gestione del tempo e regolazione emotiva.';

export const metadata=pageMetadata({title:'Psicologo ADHD a Catania',description,path});

export default function Page(){return <>
<BreadcrumbJsonLd items={[{name:'Home',path:'/'},{name:'Aree di intervento',path:'/aree-di-intervento'},{name:'ADHD',path}]} />
<ServiceJsonLd name="Supporto psicologico per ADHD" description={description} path={path} audience="Adolescenti e giovani adulti" />
<section className="page-hero"><div className="container narrow"><span className="eyebrow">Psicologo ADHD a Catania</span><h1>ADHD: trovare strategie adatte alla tua quotidianità.</h1><p className="lead">Mi rivolgo ad adolescenti e giovani adulti con ADHD che incontrano difficoltà nell’organizzazione, nella gestione del tempo o delle emozioni. Puoi contattarmi anche per chiarire una difficoltà che non sai ancora come inquadrare.</p></div></section><section className="section"><div className="container prose">
        <h2>Quali difficoltà possiamo affrontare?</h2><ul><li>Rimandi l’inizio di un’attività importante e ti ritrovi a fare tutto all’ultimo momento.</li><li>Fai fatica a stabilire priorità, rispettare scadenze o portare a termine ciò che inizi.</li><li>Frustrazione e autocritica rendono ancora più faticoso ripartire dopo un imprevisto.</li></ul>
        <h2>Partire da un problema concreto</h2><p>Possiamo scegliere una situazione ricorrente, come preparare un esame o organizzare la giornata. Osserviamo le richieste, gli ostacoli e le risorse già presenti, per capire quali cambiamenti siano sostenibili per te.</p>
        <h2>Il lavoro insieme</h2><p>Il percorso può riguardare strategie di organizzazione, adattamenti dell’ambiente e regolazione emotiva. Valutiamo cosa funziona nella tua esperienza e cosa va modificato, tenendo conto anche delle relazioni e delle aspettative che hai su di te.</p>
        <div className="note"><strong>Prima di iniziare</strong><p>Supporto psicologico e valutazione diagnostica sono percorsi distinti. Difficoltà attentive o procrastinazione, da sole, non permettono di riconoscere l’ADHD; se occorre un approfondimento specifico, ne chiariremo il percorso.</p></div>
        <p><Link className="text-link" href="/parent-training-catania">Se cerchi un supporto come genitore</Link></p>
        <p>Ricevo a Catania. Per organizzare il primo incontro puoi scrivermi dal modulo o su WhatsApp.</p>
        <Link className="btn" href="/contatti">Parliamone in un primo colloquio</Link>
        <p><Link className="text-link" href="/faq">Domande pratiche sul percorso</Link></p>
</div></section></>}
