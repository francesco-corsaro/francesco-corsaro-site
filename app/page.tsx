import Image from 'next/image';
import Link from 'next/link';
import { AreaCard } from '@/components/AreaCard';
import { areas, site } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Psicologo e Psicoterapeuta a Catania',
  description: 'Psicoterapia a Catania per adolescenti, giovani adulti e genitori. Ansia, ADHD, autismo, regolazione emotiva e parent training.',
  path: '/'
});

export default function Home() {
  return <>
    <section className="hero section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Francesco Corsaro · Psicologo e Psicoterapeuta · Catania</span>
          <h1>Capire come funzioniamo per poter cambiare.</h1>
          <p className="lead">Aiuto adolescenti, giovani adulti e genitori ad affrontare ansia, difficoltà emotive e relazionali, ADHD e autismo. Ricevo a Catania e, quando appropriato, online.</p>
          <div className="actions"><Link className="btn" href="/contatti">Richiedi un primo colloquio</Link><Link className="btn btn-ghost" href="/come-lavoro">Scopri il mio approccio</Link></div>
          <p className="microcopy">Puoi chiedere un primo colloquio anche senza una diagnosi.</p>
        </div>
        <figure className="portrait-card">
          <Image src={site.photo} alt="Francesco Corsaro, psicologo e psicoterapeuta a Catania" fill priority sizes="(max-width: 960px) 100vw, 38vw" className="portrait-image" />
        </figure>
      </div>
    </section>

    <section className="section alt" id="posso-aiutarti">
      <div className="container"><span className="eyebrow">Da dove partire</span><h2 id="situations-title">Posso aiutarti se…</h2></div>
      <ul className="container situations" aria-labelledby="situations-title" role="list">
        {[
          'l’ansia occupa troppo spazio nelle tue giornate.',
          'ti capita di capire razionalmente cosa dovresti fare ma di non riuscire comunque a farlo.',
          'con l’ADHD organizzazione, procrastinazione o regolazione emotiva stanno diventando difficili da gestire.',
          'sei un genitore e alcuni comportamenti di tuo figlio stanno diventando difficili da comprendere.',
          'stai attraversando un periodo nel quale non riesci più a riconoscere chiaramente ciò che provi o ciò di cui hai bisogno.'
        ].map(s => <li className="situation" key={s}><p>{s}</p></li>)}
      </ul>
      <div className="container situations-note"><p>Possiamo partire da ciò che stai vivendo, per comprenderlo insieme e individuare come affrontarlo.</p></div>
    </section>

    <section className="section">
      <div className="container section-head"><div><span className="eyebrow">Aree di intervento</span><h2>Da ciò che vivi al percorso più adatto.</h2></div><p>Esplora le situazioni di cui mi occupo. Se ti riconosci in più di un’area, possiamo chiarire insieme da dove partire.</p></div>
      <div className="container card-grid">{areas.map(a=><AreaCard key={a.href} {...a}/>)}</div>
    </section>

    <section className="section dark">
      <div className="container intro-light"><span className="eyebrow">Il mio approccio</span><h2>Come lavoriamo insieme.</h2><p>Partiamo da situazioni concrete e osserviamo come si collegano pensieri, emozioni, corpo e relazioni. Il mio orientamento è la Psicoterapia Cognitiva Complessa: questa lettura guida la scelta degli obiettivi e delle strategie da costruire insieme.</p></div>
      <div className="container centered"><Link className="btn btn-light" href="/come-lavoro">Scopri come lavoro</Link></div>
    </section>

    <section className="section">
      <div className="container about-grid"><figure className="about-photo"><Image src={site.photo} alt="Francesco Corsaro" fill sizes="(max-width: 960px) 100vw, 42vw" className="portrait-image" /></figure><div>
        <span className="eyebrow">Chi sono</span><h2>Lavoro cercando di capire prima di spiegare.</h2>
        <p>Sono Francesco Corsaro, psicologo e psicoterapeuta formato presso la Scuola ALETEIA. Ho maturato esperienza con adolescenti, persone con disturbi del neurosviluppo e famiglie, anche in contesti educativi.</p>
        <Link className="text-link" href="/chi-sono">Conosci meglio il mio percorso <span aria-hidden="true">→</span></Link>
      </div></div>
    </section>

    <section className="section alt">
      <div className="container narrow centered"><span className="eyebrow">Come funziona</span><h2>Dal primo incontro al lavoro insieme.</h2></div>
      <div className="container steps">
        <article><span className="step-label">Incontrarci</span><h3>Primo colloquio</h3><p>Comprendere il motivo della richiesta e cosa sta accadendo in questo momento della vita.</p></article>
        <article><span className="step-label">Comprendere</span><h3>Comprendere il funzionamento</h3><p>Collegare ciò che senti, pensi e fai alle situazioni in cui la difficoltà si presenta.</p></article>
        <article><span className="step-label">Lavorare insieme</span><h3>Costruire il cambiamento</h3><p>Concordare obiettivi, sperimentare strategie e fare il punto su ciò che cambia.</p></article>
      </div>
      <div className="container narrow centered steps-note"><p className="muted">Tempi e modalità del percorso dipendono dalla persona, dalla richiesta e dal problema presentato.</p></div>
    </section>

    <section className="section cta-section"><div className="container cta-box"><span className="eyebrow">Primo passo</span><h2>Possiamo partire da ciò che sta succedendo adesso.</h2><p>Il primo colloquio serve a comprendere la situazione, chiarire la richiesta e valutare insieme come procedere.</p><Link className="btn" href="/contatti">Contattami</Link></div></section>
  </>;
}
