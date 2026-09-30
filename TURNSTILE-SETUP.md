# Attivazione della verifica antispam

Questa modifica richiede due chiavi Cloudflare. Non unire il ramo in produzione prima della configurazione: il modulo rifiuta l’invio senza verifica, mentre telefono, email e WhatsApp restano disponibili. Nessun CAPTCHA può garantire l’assenza assoluta di bot.

1. In Cloudflare, aprire **Turnstile → Add widget**, scegliere modalità **Managed** e autorizzare `francescocorsaro.it` e `www.francescocorsaro.it`. Lasciare disattivata **pre-clearance**: non è necessario spostare DNS o hosting.
2. Copiare la **Site key** e la **Secret key**. Non inserire la Secret key in GitHub, messaggi, variabili NEXT_PUBLIC o codice client.
3. In Vercel, nel progetto del sito, aggiungere:

| Variabile | Valore | Ambiente |
| --- | --- | --- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Site key del widget | Production e Preview |
| `TURNSTILE_SECRET_KEY` | Secret key, segreta | Production e Preview |
| `TURNSTILE_ALLOWED_HOSTNAMES` | `francescocorsaro.it,www.francescocorsaro.it` | Production |

Per Preview usare il dominio esatto di una preview autorizzata anche nel widget Cloudflare e nella variabile server. Non usare wildcard su `vercel.app`. In alternativa usare un widget separato per le preview. Le chiavi di test Cloudflare sono ammesse solo in ambiente di test, mai in produzione.

4. Creare un nuovo deployment della preview: la variabile NEXT_PUBLIC viene incorporata durante la build.
5. Verificare che il widget compaia solo nella pagina Contatti. Verificare completamento, scadenza, errore e nuovo tentativo; il testo deve rimanere nel modulo in caso di errore. Con widget bloccato o chiavi mancanti non devono partire email. Usare un destinatario di test per collaudare l’invio completo.
6. Verificare contratti/informative del nuovo fornitore Cloudflare e l’impostazione senza pre-clearance descritta nelle policy del sito.
7. Unire la PR e verificare il deployment Production sul dominio reale. Non considerare la sola build o i test con mock una prova della configurazione reale.

## Controlli implementati

Token obbligatorio, lunghezza massima 2048 caratteri, Siteverify lato server, verifica `success`, `hostname` esatto e `action=contact`, timeout 5 secondi e rifiuto dell’invio quando il servizio non è disponibile. La scadenza e il riutilizzo dei token sono verificati da Cloudflare (durata di cinque minuti e singolo utilizzo). Un nuovo widget viene creato dopo ogni tentativo, incluso un errore email, per evitare il riuso del token consumato.

Il codice invia a Siteverify solo secret e token; il widget vede comunque IP e segnali tecnici della connessione. Non vengono trasmessi nome, recapito e messaggio a Cloudflare dal codice applicativo. Non sono stati aggiunti analytics o pixel.

Il rate limit applicativo rimane per istanza. Per una quota globale configurare separatamente Vercel Firewall sul metodo POST e sul percorso `/api/contact`, o uno store condiviso. Turnstile non sostituisce questo limite.
