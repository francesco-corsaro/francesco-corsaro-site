import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Informativa sul trattamento dei dati personali del sito professionale di Francesco Corsaro, psicologo e psicoterapeuta a Catania.',
  alternates: { canonical: '/privacy' }
};

export default function Page(){
  return <><section className="page-hero"><div className="container narrow"><span className="eyebrow">Privacy</span><h1>Privacy Policy</h1><p className="lead">Informazioni sul trattamento dei dati personali effettuato attraverso questo sito.</p></div></section><section className="section"><div className="container prose legal-copy">
    <p><strong>Ultimo aggiornamento:</strong> 11 settembre 2026.</p>
    <h2>Titolare del trattamento</h2>
    <p>Il titolare del trattamento è <strong>Francesco Corsaro</strong>, Psicologo e Psicoterapeuta, iscritto all’Ordine degli Psicologi della Regione Siciliana n. {site.orderNumber}.</p>
    <p>Recapiti: telefono <a href={site.phoneHref}>{site.phone}</a>; email {site.email}; studio {site.address}. La Partita IVA verrà indicata appena disponibile.</p>

    <h2>Dati trattati attraverso il modulo di contatto</h2>
    <p>Se utilizzi il modulo di contatto vengono trattati il nome, il recapito che scegli di indicare e il contenuto del messaggio. Questi dati sono utilizzati esclusivamente per leggere la richiesta, ricontattarti e valutare l’eventuale avvio di un colloquio o di un rapporto professionale.</p>
    <p>La base giuridica è l’esecuzione di misure precontrattuali adottate su richiesta dell’interessato. Ti chiediamo di non inviare attraverso il modulo referti, diagnosi o informazioni sanitarie non necessarie al primo contatto. Se nel messaggio vengono comunque inserite informazioni particolari, saranno trattate nel rispetto degli obblighi di riservatezza connessi alla professione sanitaria e soltanto nella misura necessaria a gestire la richiesta.</p>

    <h2>Invio e conservazione dei messaggi</h2>
    <p>Il sito non utilizza un database per archiviare i messaggi del modulo. La richiesta viene inoltrata alla casella email professionale mediante un servizio tecnico di recapito email configurato lato server. I messaggi vengono conservati nella casella professionale soltanto per il tempo necessario a gestire il contatto e gli eventuali successivi adempimenti professionali o di legge.</p>
    <p>Per l’infrastruttura del sito viene utilizzato <strong>Vercel</strong>. Per l’inoltro tecnico del modulo è predisposto <strong>Resend</strong>. Questi fornitori possono trattare dati tecnici necessari all’erogazione dei rispettivi servizi secondo i propri accordi e misure di protezione dei dati.</p>

    <h2>Dati tecnici di navigazione</h2>
    <p>I sistemi informatici e i servizi di hosting possono trattare dati tecnici necessari al funzionamento e alla sicurezza del sito, come indirizzo IP, data e ora della richiesta, tipo di browser e informazioni diagnostiche. Il sito non utilizza, allo stato attuale, Google Analytics, Meta Pixel o altri strumenti di profilazione pubblicitaria.</p>

    <h2>WhatsApp e servizi esterni</h2>
    <p>Se scegli di contattare il professionista tramite WhatsApp, il trattamento dei dati avviene anche attraverso il servizio fornito da WhatsApp/Meta secondo le relative condizioni e informative. Il semplice caricamento delle pagine di questo sito non incorpora widget social né trasmette dati a WhatsApp: il collegamento si attiva soltanto quando decidi di aprirlo.</p>

    <h2>Comunicazione dei dati</h2>
    <p>I dati possono essere trattati dai fornitori tecnici strettamente necessari al funzionamento del sito, dell’hosting e dell’invio email. Non vengono venduti né utilizzati per pubblicità comportamentale. Potranno essere comunicati ad altri soggetti soltanto quando necessario per obblighi di legge o con una base giuridica adeguata.</p>

    <h2>Diritti dell’interessato</h2>
    <p>Nei casi previsti dal Regolamento (UE) 2016/679 puoi chiedere accesso, rettifica, cancellazione, limitazione del trattamento, portabilità dei dati o opporti al trattamento. Puoi inoltre proporre reclamo al Garante per la protezione dei dati personali.</p>
    <p>Per esercitare i diritti puoi utilizzare i recapiti indicati in questa pagina. L’indirizzo email professionale definitivo verrà pubblicato prima della messa online del dominio definitivo.</p>

    <h2>Minori</h2>
    <p>Il modulo di contatto non è progettato per raccogliere informazioni cliniche dettagliate su minori. Quando la richiesta riguarda un adolescente o un minore, il primo contatto serve esclusivamente a organizzare un confronto e a chiarire successivamente modalità, responsabilità e consensi necessari.</p>

    <h2>Aggiornamenti</h2>
    <p>Questa informativa potrà essere aggiornata se cambieranno i servizi utilizzati dal sito, le modalità di contatto o gli obblighi normativi. La data dell’ultimo aggiornamento sarà sempre indicata in alto.</p>
  </div></section></>;
}
