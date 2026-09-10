import Link from 'next/link';
import { AreaCard } from '@/components/AreaCard';
import { ComplexMind } from '@/components/ComplexMind';
import { areas } from '@/lib/site';
import type { Metadata } from 'next';

export const metadata: Metadata = { alternates:{canonical:'/'}, openGraph:{title:'Psicologo e Psicoterapeuta a Catania | Francesco Corsaro',description:'Comprendere il proprio funzionamento per costruire nuove possibilità di cambiamento.'} };

export default function Home() {
  return <>
    <section className="hero section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Francesco Corsaro · Psicologo e Psicoterapeuta · Catania</span>
          <h1>Capire come funzioniamo per poter cambiare.</h1>
          <p className="lead">Psicoterapia per adolescenti, giovani adulti e genitori a Catania. Un percorso per comprendere emozioni, pensieri, comportamenti e relazioni senza ridurre la persona a un sintomo o a una diagnosi.</p>
          <div className="actions"><Link className="btn" href="/contatti">Richiedi un primo colloquio</Link><Link className="btn btn-ghost" href="/come-lavoro">Scopri il mio approccio</Link></div>
          <p className="microcopy">Capire cosa mantiene una difficoltà è spesso il primo passo per poter intervenire su di essa.</p>
        </div>
        <div className="portrait-placeholder" role="img" aria-label="Spazio per una fotografia professionale di Francesco Corsaro">
          <div className="portrait-art" aria-hidden="true"><span></span><span></span><span></span></div>
          <div><strong>Fotografia professionale</strong><p>[DA INSERIRE: ritratto autentico di Francesco]</p></div>
        </div>
      </div>
    </section>

    <section className="section alt" id="posso-aiutarti">
      <div className="container narrow"><span className="eyebrow">Posso aiutarti se…</span><h2>Riconoscere ciò che sta succedendo senza trasformarlo subito in un’etichetta.</h2></div>
      <div className="container situations">
        {[
          'L’ansia occupa troppo spazio nelle tue giornate.',
          'Ti capita di capire razionalmente cosa dovresti fare ma di non riuscire comunque a farlo.',
          'Con l’ADHD organizzazione, procrastinazione o regolazione emotiva stanno diventando difficili da gestire.',
          'Sei un genitore e alcuni comportamenti di tuo figlio stanno diventando difficili da comprendere.',
          'Stai attraversando un periodo nel quale non riesci più a riconoscere chiaramente ciò che provi o ciò di cui hai bisogno.'
        ].map((s,i)=><article className="situation" key={s}><span>0{i+1}</span><p>{s}</p></article>)}
      </div>
    </section>

    <section className="section">
      <div className="container section-head"><div><span className="eyebrow">Aree di intervento</span><h2>Problemi diversi richiedono domande diverse.</h2></div><p>Due persone possono provare la stessa ansia per motivi molto diversi. Per questo il lavoro terapeutico parte dalla comprensione del funzionamento della singola persona.</p></div>
      <div className="container card-grid">{areas.map(a=><AreaCard key={a.href} {...a}/>)}</div>
    </section>

    <section className="section dark">
      <div className="container intro-light"><span className="eyebrow">Il mio approccio</span><h2>Una persona è più complessa del sintomo che porta in terapia.</h2><p>La difficoltà psicologica emerge spesso dall’interazione tra più processi. Per comprenderla è utile osservare non solo cosa pensiamo, ma anche cosa prova il corpo, quali emozioni si attivano, come ci comportiamo, quali relazioni viviamo e quali esperienze hanno contribuito a costruire il nostro modo di stare nel mondo.</p></div>
      <div className="container"><ComplexMind/></div>
      <div className="container centered"><Link className="btn btn-light" href="/come-lavoro">Approfondisci la Psicoterapia Cognitiva Complessa</Link></div>
    </section>

    <section className="section">
      <div className="container about-grid"><div className="abstract-panel" aria-hidden="true"><div className="orbit o1"></div><div className="orbit o2"></div><div className="dot d1"></div><div className="dot d2"></div><div className="dot d3"></div></div><div>
        <span className="eyebrow">Chi sono</span><h2>Lavoro cercando di capire prima di spiegare.</h2>
        <p>Nel mio modo di lavorare, la diagnosi può essere utile per orientarsi, ma non esaurisce la comprensione della persona. Cerco di ricostruire insieme al paziente come una difficoltà si inserisce nella sua storia, nelle relazioni, nelle abitudini quotidiane e nei meccanismi con cui prova a regolare emozioni e stress.</p>
        <p>Sono laureato in Psicologia Clinica, psicologo e psicoterapeuta. Ho completato una formazione quadriennale in Psicoterapia Cognitiva Complessa presso ALETEIA e ho maturato esperienza con adolescenti, ADHD, disturbi del neurosviluppo, persone autistiche e famiglie. Mantengo un interesse specifico per neuroscienze, psicofisiologia e processi di autoregolazione.</p>
        <Link className="text-link" href="/chi-sono">Conosci meglio il mio percorso <span aria-hidden="true">→</span></Link>
      </div></div>
    </section>

    <section className="section alt">
      <div className="container narrow centered"><span className="eyebrow">Come funziona</span><h2>Un percorso costruito insieme, non un protocollo identico per tutti.</h2></div>
      <div className="container steps">
        <article><span>01</span><h3>Primo colloquio</h3><p>Comprendere il motivo della richiesta e cosa sta accadendo in questo momento della vita.</p></article>
        <article><span>02</span><h3>Comprendere il funzionamento</h3><p>Ricostruire insieme processi emotivi, cognitivi, comportamentali, relazionali e contestuali coinvolti nella difficoltà.</p></article>
        <article><span>03</span><h3>Costruire il cambiamento</h3><p>Definire obiettivi e strategie terapeutiche personalizzate e verificarne progressivamente l’efficacia.</p></article>
      </div>
      <div className="container narrow centered"><p className="muted">Tempi e modalità del percorso dipendono dalla persona, dalla richiesta e dal problema presentato.</p></div>
    </section>

    <section className="section cta-section"><div className="container cta-box"><span className="eyebrow">Primo passo</span><h2>Possiamo partire da ciò che sta succedendo adesso.</h2><p>Il primo colloquio serve a comprendere la situazione, chiarire la richiesta e valutare insieme come procedere.</p><Link className="btn" href="/contatti">Contattami</Link></div></section>
  </>;
}
