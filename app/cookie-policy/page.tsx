import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Informazioni su cookie e strumenti di tracciamento utilizzati dal sito di Francesco Corsaro.',
  alternates: { canonical: '/cookie-policy' }
};

export default function Page(){
  return <><section className="page-hero"><div className="container narrow"><span className="eyebrow">Cookie</span><h1>Cookie Policy</h1><p className="lead">Il sito è configurato per limitare al minimo il tracciamento.</p></div></section><section className="section"><div className="container prose legal-copy">
    <p><strong>Ultimo aggiornamento:</strong> 30 settembre 2026.</p>
    <h2>Quali cookie utilizza questo sito</h2>
    <p>Al momento il sito non utilizza cookie di profilazione, pixel pubblicitari o strumenti di analytics di terze parti come Google Analytics o Meta Pixel.</p>
    <p>Possono essere presenti esclusivamente tecnologie tecniche strettamente necessarie al funzionamento, alla sicurezza, all’erogazione delle pagine o alla gestione dell’infrastruttura. Il pannello informativo consente di confermare l’uso dei soli strumenti necessari o di chiudere l’avviso: entrambe le azioni mantengono la medesima configurazione, senza tracciamento opzionale. Il consenso non è richiesto per i cookie tecnici.</p>

    <h2>Memoria della scelta</h2>
    <p>Il cookie tecnico di prima parte <code>fc_cookie_notice</code> memorizza esclusivamente la versione dell’avviso chiuso (v1), per sei mesi, con percorso / e attributo SameSite=Lax; su HTTPS usa anche Secure. Non contiene nome, recapito, messaggi o identificatori pubblicitari. Puoi riaprire il pannello dal comando “Gestisci cookie” nel footer. Puoi cancellare il cookie dalle impostazioni del browser; l’avviso verrà mostrato nuovamente.</p>

    <h2>Hosting e dati tecnici</h2>
    <p>Il sito è ospitato su infrastruttura Vercel. Come avviene normalmente per i servizi web, il fornitore può trattare dati tecnici indispensabili per consegnare le pagine, prevenire abusi e mantenere la sicurezza del servizio.</p>

    <h2>Modulo di contatto</h2>
    <p>Il modulo di contatto non installa cookie di profilazione. La protezione antispam utilizza Cloudflare Turnstile nella pagina Contatti, insieme a un campo nascosto e a controlli lato server. Il browser contatta Cloudflare per generare un token di verifica, che il server convalida prima di inoltrare il messaggio tramite Resend. Turnstile tratta segnali tecnici del browser e della connessione per contrastare gli abusi; il codice del sito non invia a Cloudflare nome, recapito o messaggio. Il widget è configurato senza pre-clearance e non richiede un cookie di profilazione. Se la verifica non è disponibile, puoi usare i recapiti alternativi.</p>

    <h2>WhatsApp</h2>
    <p>Il sito contiene un semplice collegamento a WhatsApp. Nessun contenuto di WhatsApp viene caricato automaticamente nella pagina: il servizio viene aperto soltanto quando l’utente sceglie di cliccare il collegamento.</p>

    <h2>Se in futuro verranno aggiunti analytics o altri strumenti</h2>
    <p>Eventuali strumenti non strettamente necessari saranno attivati solo dopo una nuova valutazione privacy e, quando richiesto, soltanto dopo aver raccolto una scelta valida dell’utente. In quel caso questa Cookie Policy e l’interfaccia di gestione delle preferenze verranno aggiornate.</p>

    <h2>Come ottenere maggiori informazioni</h2>
    <p>Per informazioni sul trattamento dei dati personali puoi consultare la <a href="/privacy">Privacy Policy</a>.</p>
  </div></section></>;
}
