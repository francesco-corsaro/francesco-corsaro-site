import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Informazioni su cookie e strumenti di tracciamento utilizzati dal sito di Francesco Corsaro.',
  alternates: { canonical: '/cookie-policy' }
};

export default function Page(){
  return <><section className="page-hero"><div className="container narrow"><span className="eyebrow">Cookie</span><h1>Cookie Policy</h1><p className="lead">Il sito è configurato per limitare al minimo il tracciamento.</p></div></section><section className="section"><div className="container prose legal-copy">
    <p><strong>Ultimo aggiornamento:</strong> 11 settembre 2026.</p>
    <h2>Quali cookie utilizza questo sito</h2>
    <p>Al momento il sito non utilizza cookie di profilazione, pixel pubblicitari o strumenti di analytics di terze parti come Google Analytics o Meta Pixel.</p>
    <p>Possono essere presenti esclusivamente tecnologie tecniche strettamente necessarie al funzionamento, alla sicurezza, all’erogazione delle pagine o alla gestione dell’infrastruttura. Per questo motivo, nella configurazione attuale, non viene mostrato un banner di consenso per finalità opzionali.</p>

    <h2>Hosting e dati tecnici</h2>
    <p>Il sito è ospitato su infrastruttura Vercel. Come avviene normalmente per i servizi web, il fornitore può trattare dati tecnici indispensabili per consegnare le pagine, prevenire abusi e mantenere la sicurezza del servizio.</p>

    <h2>Modulo di contatto</h2>
    <p>Il modulo di contatto non installa cookie di profilazione. È presente una protezione antispam non invasiva basata su un campo nascosto e su controlli lato server. L’inoltro del messaggio è predisposto mediante Resend e non richiede il caricamento di widget esterni nel browser.</p>

    <h2>WhatsApp</h2>
    <p>Il sito contiene un semplice collegamento a WhatsApp. Nessun contenuto di WhatsApp viene caricato automaticamente nella pagina: il servizio viene aperto soltanto quando l’utente sceglie di cliccare il collegamento.</p>

    <h2>Se in futuro verranno aggiunti analytics o altri strumenti</h2>
    <p>Eventuali strumenti non strettamente necessari saranno attivati solo dopo una nuova valutazione privacy e, quando richiesto, soltanto dopo aver raccolto una scelta valida dell’utente. In quel caso questa Cookie Policy e l’interfaccia di gestione delle preferenze verranno aggiornate.</p>

    <h2>Come ottenere maggiori informazioni</h2>
    <p>Per informazioni sul trattamento dei dati personali puoi consultare la <a href="/privacy">Privacy Policy</a>.</p>
  </div></section></>;
}
