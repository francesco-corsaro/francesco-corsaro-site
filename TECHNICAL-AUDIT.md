# Analisi tecnica — 30 settembre 2026

## Interventi applicati

- Corrette le cinque iniziali minuscole nella sezione «Posso aiutarti se…» della homepage. Verificati testi delle altre pagine e componenti; non trasformate indiscriminatamente parole, indirizzi o termini interni alle frasi.
- Pannello cookie disponibile in tutto il sito, chiusura persistente per sei mesi e riapertura dal footer. Solo cookie tecnico `fc_cookie_notice=v1`, SameSite=Lax, Secure su HTTPS, percorso `/`. Nessun identificativo individuale né dati del modulo nel cookie. Chiusura e «Accetta solo necessari» hanno il medesimo effetto. Nessun consenso preventivo a tracker futuri.
- Origin obbligatorio e coerente, rifiuto di richieste cross-site e contenuti non JSON. Limite di 16 KiB applicato durante la lettura del corpo, anche senza Content-Length. Rifiuto dei caratteri di controllo in nome e recapito.
- Conservati honeypot, verifica campi sul server, timeout verso Resend e limite locale degli invii. Campi del form a 16 px per ridurre lo zoom automatico su iPhone.

## Raccolta dati consigliata e implementata

| Dato/strumento | Scopo | Stato |
| --- | --- | --- |
| Nome, email **oppure** telefono, breve messaggio | Rispondere a una richiesta | Già presente; evitare diagnosi/referti |
| Presa visione privacy | Rendere esplicita la richiesta di ricontatto | Separata dal pannello cookie |
| Cookie tecnico dell’avviso | Ricordare la chiusura per sei mesi | Implementato |
| IP e metadati tecnici | Erogazione e prevenzione abusi | Hosting; contatori locali con hash e finestra di dieci minuti |
| Google Analytics, Meta Pixel, remarketing | Statistiche o pubblicità | Non installati; non necessari al primo contatto |

Il sito non archivia i messaggi in un database proprio: li inoltra tramite Resend alla casella configurata. Questo non elimina la conservazione presso i fornitori e nella casella email. Non sono stati inventati tempi di cancellazione né modificati i contratti dei fornitori.

## Rischi e attività ancora aperte

1. **Antibot**: honeypot e tempo di compilazione sono aggirabili. Integrare Turnstile con validazione server, hostname e action, prima dell’invio email. Sono necessarie chiavi reali Cloudflare e configurazione Vercel; non dichiarare la protezione attiva finché non è collaudata sul dominio.
2. **Rate limit distribuito**: il limite attuale di cinque tentativi in dieci minuti è per processo, non globale. Su Vercel configurare una regola Firewall per POST `/api/contact`, oppure uno store condiviso. Il numero di tentativi non è una garanzia tra istanze o riavvii.
3. **Dipendenze**: `npm audit --omit=dev` segnala due pacchetti (PostCSS alto, Next.js moderato per dipendenza transitiva). Next.js installato: 15.5.25. La correzione automatica proposta è un salto di major: richiede una migrazione separata e test di compatibilità. Non eseguito `npm audit fix --force`. L’impatto dipende dall’elaborazione di CSS/source map non attendibili; il modulo non accetta CSS o file.
4. **Privacy operativa**: verificare P.IVA, tempi concreti di cancellazione delle richieste senza seguito, accordi Vercel/Resend e casella destinataria. Il testo attuale contiene ancora un riferimento alla P.IVA da completare; non è stato inventato il dato.
5. **Header**: HTTPS/HSTS, nosniff, SAMEORIGIN, Referrer-Policy e Permissions-Policy presenti nella risposta pubblica. CSP completa non presente; richiede collaudo con script Next.js e widget di sicurezza.

## Verifiche

Lint, TypeScript, sei test automatici e build di produzione completati. Test invio con Resend simulato: nessun messaggio reale inviato. Esaminate le intestazioni pubbliche HTTPS e il codice delle pagine. Nessuna dichiarazione di collaudo su dispositivi iOS/Android reali.

## Fonti

- https://www.garanteprivacy.it/faq/cookie
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/
- Report npm audit eseguito sulla versione installata il 30 settembre 2026.

## Integrazione Turnstile preparata nel ramo dedicato

Codice client/server e policy aggiornati; guida in `TURNSTILE-SETUP.md`. La protezione richiede configurazione prima del merge. Test automatici con API simulate coprono token mancante/non valido, replay/scadenza segnalati da Cloudflare, hostname o action errati, timeout, indisponibilità e chiave mancante. Nessuna email parte in caso di verifica rifiutata. Il collaudo di widget reale e invio sul dominio resta da eseguire con chiavi vere.

Il controllo visivo locale non è stato completato: agent-browser non avvia il daemon e il download del browser Playwright non produce un archivio valido nell’ambiente. La build e i test automatici non sostituiscono tale verifica.
