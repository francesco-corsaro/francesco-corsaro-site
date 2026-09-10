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
    <p>Recapiti: telefono <a href={site.phoneHref}>{site.phone}</a>; email <a href={`mailto:${site.email}`}>{site.email}</a>; studio {site.address}. La Partita IVA sarà indicata prima della pubblicazione definitiva del sito.</p>

    <h2>Dati trattati attraverso il modulo di contatto</h2>
    <p>Se utilizzi il modulo di contatto vengono trattati il nome, il recapito che scegli di indicare e il contenuto del messaggio. Questi dati sono utilizzati esclusivamente per leggere la richiesta, ricontattarti e valutare l’eventuale avvio di un colloquio o di un rapporto professionale.</p>
    <p>Per i dati comuni, la base giuridica è l’esecuzione di misure precontrattuali adottate su richiesta dell’interessato. Il modulo è pensato per un primo contatto organizzativo: ti chiediamo quindi di non inviare referti, diagnosi o informazioni sanitarie dettagliate. Se vengono comunque inseriti spontaneamente dati relativi alla salute, il loro trattamento viene limitato a quanto necessario per gestire la richiesta nel contesto dell’attività sanitaria e nel rispetto del segreto professionale e delle condizioni previste dalla normativa applicabile.</p>

    <h2>Invio e conservazione dei messaggi</h2>
    <p>Il sito non utilizza un database proprio per archiviare i messaggi del modulo. La richiesta viene inoltrata alla casella email professionale mediante un servizio tecnico di recapito email configurato lato server.</p>
    <p>I messaggi vengono conservati nella casella professionale per il tempo necessario a gestire il contatto e, se il contatto dà luogo a un rapporto professionale, secondo i tempi di conservazione applicabili alla documentazione collegata all’attività professionale. Le richieste che non danno luogo a un rapporto professionale vengono eliminate quando non sono più necessarie rispetto alla finalità per cui sono state ricevute.</p>

    <h2>Fornitori tecnici e trasferimenti</h2>
    <p>Per l’infrastruttura del sito viene utilizzato <strong>Vercel</strong>. Per l’inoltro tecnico del modulo viene utilizzato <strong>Resend</strong>. Tali fornitori trattano dati personali e dati tecnici necessari a erogare i rispettivi servizi secondo i propri accordi sul trattamento dei dati e le proprie misure di sicurezza.</p>
    <p>Resend documenta che i log delle richieste API possono contenere il corpo della richiesta utilizzata per l’invio dell’email e che i dati dell’account, inclusi metadati email, log e record API, sono conservati negli Stati Uniti indipendentemente dalla regione scelta per l’invio. Per i trasferimenti di dati soggetti al GDPR, il Data Processing Addendum di Resend incorpora le Clausole Contrattuali Standard approvate dalla Commissione europea e prevede anche il ricorso al Data Privacy Framework quando applicabile.</p>
    <p>Vercel può effettuare trattamenti e trasferimenti internazionali connessi all’erogazione dell’infrastruttura. Le condizioni e le garanzie applicabili dipendono dal piano e dagli accordi attivi con il fornitore e devono essere mantenute coerenti con la configurazione effettivamente utilizzata al momento della pubblicazione.</p>

    <h2>Dati tecnici di navigazione</h2>
    <p>I sistemi informatici e i servizi di hosting possono trattare dati tecnici necessari al funzionamento e alla sicurezza del sito, come indirizzo IP, data e ora della richiesta, tipo di browser e informazioni diagnostiche. Il sito non utilizza, allo stato attuale, Google Analytics, Meta Pixel o altri strumenti di profilazione pubblicitaria.</p>

    <h2>WhatsApp e servizi esterni</h2>
    <p>Se scegli di contattare il professionista tramite WhatsApp, il trattamento dei dati avviene anche attraverso il servizio fornito da WhatsApp/Meta secondo le relative condizioni e informative. Il semplice caricamento delle pagine di questo sito non incorpora widget social né trasmette dati a WhatsApp: il collegamento si attiva soltanto quando decidi di aprirlo.</p>

    <h2>Comunicazione dei dati</h2>
    <p>I dati possono essere trattati dai fornitori tecnici strettamente necessari al funzionamento del sito, dell’hosting e dell’invio email. Non vengono venduti né utilizzati per pubblicità comportamentale. Potranno essere comunicati ad altri soggetti soltanto quando necessario per obblighi di legge o sulla base di un altro presupposto giuridico valido.</p>

    <h2>Diritti dell’interessato</h2>
    <p>Nei casi previsti dal Regolamento (UE) 2016/679 puoi chiedere accesso, rettifica, cancellazione, limitazione del trattamento, portabilità dei dati o opporti al trattamento. Puoi inoltre proporre reclamo al Garante per la protezione dei dati personali.</p>
    <p>Per esercitare i diritti puoi scrivere a <a href={`mailto:${site.email}`}>{site.email}</a> o utilizzare gli altri recapiti indicati in questa pagina.</p>

    <h2>Minori</h2>
    <p>Il modulo di contatto non è progettato per raccogliere informazioni cliniche dettagliate su minori. Quando la richiesta riguarda un adolescente o un minore, il primo contatto serve esclusivamente a organizzare un confronto e a chiarire successivamente modalità, responsabilità e consensi necessari.</p>

    <h2>Aggiornamenti</h2>
    <p>Questa informativa potrà essere aggiornata se cambieranno i servizi utilizzati dal sito, le modalità di contatto o gli obblighi normativi. La data dell’ultimo aggiornamento sarà sempre indicata in alto.</p>
  </div></section></>;
}
