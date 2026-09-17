import Link from 'next/link';
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/SeoJsonLd';
import { pageMetadata } from '@/lib/seo';

const path='/psicologo-adolescenti-catania';
const description='Psicoterapia per adolescenti a Catania: ansia, regolazione emotiva, relazioni, scuola, autonomia e difficoltà familiari.';

export const metadata=pageMetadata({title:'Psicologo adolescenti a Catania',description,path});

export default function Page(){return <>
<BreadcrumbJsonLd items={[{name:'Home',path:'/'},{name:'Aree di intervento',path:'/aree-di-intervento'},{name:'Adolescenza',path}]} />
<ServiceJsonLd name="Psicoterapia per adolescenti" description={description} path={path} audience="Adolescenti e famiglie" />
<section className="page-hero"><div className="container narrow"><span className="eyebrow">Psicologo adolescenti a Catania</span><h1>Adolescenti: uno spazio per capire ciò che sta cambiando.</h1><p className="lead">Mi occupo di adolescenti che vivono difficoltà emotive, scolastiche o relazionali. Accolgo anche le richieste dei genitori che cercano di capire come accompagnare un figlio in un momento difficile.</p></div></section><section className="section"><div className="container prose">
        <h2>Quando chiedere un confronto?</h2><ul><li>La scuola, il giudizio degli altri o le relazioni diventano una fonte ricorrente di disagio.</li><li>È difficile parlare di ciò che si prova e i confronti in famiglia finiscono spesso in un conflitto.</li><li>Chiusura, irritabilità o disorganizzazione iniziano a pesare sulle giornate.</li></ul>
        <h2>Lo spazio dell’adolescente</h2><p>Il lavoro parte dal suo punto di vista: cosa lo preoccupa, cosa desidera cambiare e cosa sente difficile da raccontare. Cerchiamo insieme parole e obiettivi che riconosca come propri, tenendo conto della scuola, delle relazioni e del bisogno di autonomia.</p>
        <h2>Il confronto con i genitori</h2><p>Il ruolo dei genitori viene chiarito fin dall’inizio, in base all’età e alla situazione. Concordiamo le modalità di confronto e spieghiamo come tutelare lo spazio personale dell’adolescente. Anche un genitore incerto su come proporre un incontro può partire da una richiesta di informazioni.</p>
        <div className="note"><strong>Prima di iniziare</strong><p>Nel primo contatto chiariremo come organizzare il colloquio e chi coinvolgere, senza dare per scontato che tutti debbano partecipare allo stesso incontro.</p></div>
        <p><Link className="text-link" href="/parent-training-catania">Un percorso rivolto ai genitori</Link></p>
        <p>Ricevo a Catania. Per organizzare il primo incontro puoi scrivermi dal modulo o su WhatsApp.</p>
        <Link className="btn" href="/contatti">Parliamone in un primo colloquio</Link>
        <p><Link className="text-link" href="/faq">Domande pratiche sul percorso</Link></p>
</div></section></>}
