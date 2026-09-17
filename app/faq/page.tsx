import Link from 'next/link';
import { BreadcrumbJsonLd, JsonLd } from '@/components/SeoJsonLd';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'FAQ e informazioni pratiche',
  description: 'Dove ricevo a Catania, come contattarmi, durata delle sedute e primo incontro. Risposte su adolescenti, ADHD, parent training e psicoterapia online.',
  path: '/faq'
});

const groups = [
  { title: 'Prima di contattarmi', items: [
    ['Come posso richiedere un primo colloquio?', 'Puoi usare il modulo nella pagina Contatti, scrivermi su WhatsApp o telefonarmi. Indica brevemente il motivo della richiesta e un recapito: nel primo messaggio non occorre raccontare dettagli clinici o inviare referti.'],
    ['Dove si trova lo studio?', `Ricevo in ${site.address}. Nella pagina Contatti trovi anche il collegamento alle indicazioni stradali.`],
    ['Quanto costa e quali appuntamenti sono disponibili?', 'Per conoscere il costo del colloquio e le disponibilità attuali, puoi chiedermi queste informazioni al primo contatto, prima di fissare l’appuntamento.'],
    ['È necessario avere già una diagnosi?', 'No. Puoi partire da una difficoltà concreta o da un disagio che non sai ancora spiegare. Il primo colloquio serve anche a chiarire la richiesta e valutare quale percorso sia appropriato.']
  ] },
  { title: 'Il colloquio e il percorso', items: [
    ['Come funziona il primo colloquio?', 'Parliamo di cosa ti ha portato a chiedere aiuto, di come la difficoltà incide sulle tue giornate e di cosa vorresti cambiare. È uno spazio anche per fare domande sul mio modo di lavorare. Il primo incontro non comporta automaticamente l’avvio di una psicoterapia.'],
    ['Quanto dura una seduta?', `Una seduta dura ${site.sessionDuration} minuti.`],
    ['Con quale frequenza ci si incontra e quanto dura il percorso?', 'Frequenza e durata si definiscono in base alla richiesta e agli obiettivi. Non c’è un numero di incontri uguale per tutti: ne parliamo insieme e rivalutiamo il percorso nel tempo.'],
    ['È possibile svolgere gli incontri online?', site.onlineTherapy ? 'Sì, quando appropriato alla situazione e concordato insieme. Nel primo contatto possiamo valutare questa possibilità e chiarire le modalità degli incontri.' : 'Per conoscere le modalità degli incontri attualmente disponibili, contattami prima di fissare il colloquio.'],
    ['Qual è il tuo orientamento?', 'La Psicoterapia Cognitiva Complessa. Nel lavoro concreto significa osservare insieme pensieri, emozioni, corpo, comportamenti e relazioni, per comprendere la difficoltà e concordare obiettivi e strategie adatti alla persona.']
  ] },
  { title: 'Adolescenti, neurodivergenze e genitori', items: [
    ['Come vengono coinvolti i genitori di un adolescente?', 'Le modalità si chiariscono all’inizio, in base all’età, alla richiesta e alla situazione. Il lavoro tiene conto sia dello spazio personale dell’adolescente sia del confronto con la famiglia quando utile. Al primo contatto possiamo chiarire chi coinvolgere nell’incontro.'],
    ['Lavori con giovani adulti con ADHD?', 'Sì. Il lavoro può riguardare organizzazione, gestione del tempo, procrastinazione e regolazione emotiva. Se la richiesta riguarda una valutazione diagnostica specifica, ne chiariremo il percorso: il supporto psicologico non coincide automaticamente con una diagnosi.'],
    ['Che tipo di supporto proponi per l’autismo?', 'Il lavoro parte dai bisogni, dalla comunicazione e dai contesti di vita della persona. Modalità e obiettivi vengono valutati insieme, anche con la famiglia quando appropriato. Nel primo colloquio chiariamo se il supporto proposto risponde alla richiesta.'],
    ['Il parent training è una terapia per mio figlio?', 'È un percorso rivolto ai genitori, centrato sulla comprensione delle situazioni quotidiane e sulla costruzione di strategie educative e comunicative. Non coincide automaticamente con una terapia individuale per il figlio; la richiesta viene valutata nel primo colloquio.']
  ] }
];

export default function Page() {
  const faqJsonLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: groups.flatMap(group => group.items).map(([q, a]) => ({
      '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a }
    }))
  };
  return <>
    <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }]} />
    <JsonLd data={faqJsonLd} />
    <section className="page-hero"><div className="container narrow"><span className="eyebrow">FAQ</span><h1>Le informazioni utili prima di iniziare.</h1><p className="lead">Dal primo contatto alle modalità degli incontri: qui trovi le risposte alle domande più frequenti.</p></div></section>
    <section className="section"><div className="container faq-list">
      {groups.map((group, index) => <section key={group.title} aria-labelledby={`faq-group-${index}`}>
        <h2 id={`faq-group-${index}`}>{group.title}</h2>
        {group.items.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
      </section>)}
      <div className="note"><strong>Hai una domanda sulla tua situazione?</strong><p>Puoi scrivermi per chiarire la richiesta o le modalità del primo incontro.</p><Link className="btn" href="/contatti">Vai ai contatti</Link></div>
    </div></section>
  </>;
}
