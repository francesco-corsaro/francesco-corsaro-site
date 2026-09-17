# Francesco Corsaro — sito professionale

Next.js 15, React 19 e TypeScript. Produzione: https://francescocorsaro.it/.

## Sviluppo e verifica

Usare Node.js 22, `npm ci`, poi `npm run dev`.

- `npm run lint`: ESLint non interattivo.
- `npm test`: validazione dei recapiti, consenso, limiti e antispam.
- `npm run build`: build di produzione e verifica dei tipi.
- `npm run typecheck`: controllo TypeScript (dopo la generazione dei tipi Next).

Il lockfile è versionato. GitHub Actions esegue i controlli su push e pull request.

## Configurazione

Identità e recapiti canonici: `lib/site.ts`. Il dominio non viene letto da una variabile ambiente; le preview Vercel sono noindex.

Variabili utilizzate:
- `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_ORDER_NUMBER`, `NEXT_PUBLIC_VAT_NUMBER`, `NEXT_PUBLIC_ONLINE_THERAPY`.
- `RESEND_API_KEY`: segreto solo lato server.
- `CONTACT_EMAIL_TO`: destinazione del modulo, in alternativa `NEXT_PUBLIC_CONTACT_EMAIL`.
- `CONTACT_EMAIL_FROM`: mittente verificato in Resend. Il fallback di test è onboarding@resend.dev.

Non salvare segreti nel repository. Verificare la consegna effettiva tramite un invio autorizzato dopo cambi di mittente o credenziali.

## Modulo contatti

Validazione condivisa client/server; honeypot; limiti di lunghezza; controllo temporale minimo; timeout del provider; Reply-To per email valide. Il testo non viene cancellato in caso di errore. Nessuna scadenza massima di compilazione. Nessun database di messaggi o salvataggio in localStorage.

Il limite di 5 tentativi in 10 minuti è best-effort, in memoria e per istanza. Memorizza solo una chiave hash temporanea dell'indirizzo di rete, senza messaggi. Non sostituisce un limite distribuito: per resistere a invii distribuiti configurare Vercel Firewall o un rate limiter con archivio condiviso. Riavvii e nuove istanze azzerano i contatori. La mappa dei contatori ha un limite di dimensione.

## Navigazione e grafica

Header sticky senza overflow globale; pagina corrente nel menu; breadcrumb visibili e JSON-LD; contatti con modulo in primo piano; pulsante laterale nascosto mentre il modulo è visibile. I dati di studio restano coerenti con `lib/site.ts`.

## SEO e privacy

Canonical, sitemap, robots e JSON-LD WebSite, Person, MedicalBusiness, Service, BreadcrumbList e FAQPage. Articoli vuoti e informative noindex. Logo SVG e favicon SVG. Nessun tracker pubblicitario o analytics incorporato.

Prezzi, orari, accessibilità dello studio e tempi di risposta richiedono conferma del professionista. Le informative e i dati amministrativi vanno mantenuti coerenti con l'attività e i fornitori effettivi.


## Verifiche di sicurezza e mobile (17 settembre 2026)

Next.js resta sulla linea 15.5.25. Un override mirato porta la sua dipendenza PostCSS a 8.5.28, compatibile con la stessa major, per chiudere le segnalazioni dell’audit. Rivalutare l’override a ogni aggiornamento Next. `npm run audit:security` controlla le dipendenze di produzione; GitHub Actions lo esegue su push, PR e ogni settimana. Dependabot propone aggiornamenti, senza merge automatici.

`npm run test:mobile` usa Playwright dopo `npm run build`, con Chromium/Pixel, WebKit/iPhone, schermo stretto 320px e orientamento orizzontale. Include testo al 200%, menu e focus, diagramma, contatti e retry. Le chiamate del modulo sono simulate: nessuna email reale viene inviata dai test. I report con screenshot sono negli artifact della workflow Site checks. Questa è emulazione dei motori e dei viewport: non certifica tastiera virtuale, VoiceOver o Safari su iPhone fisico.

### Protezione dai duplicati e diagnostica

Ogni invio dal modulo ha un UUID conservato in memoria per i retry a parità di contenuto. Il server lo passa a Resend tramite `Idempotency-Key`: il provider deduplica per 24 ore anche fra istanze diverse. Dopo 23 ore il client invita a verificare il recapito, per evitare un retry fuori dalla finestra. Modificare il contenuto genera una nuova richiesta; ricaricare la pagina non conserva il tentativo. Le schede con il vecchio client ricevono una chiave HMAC stabile lato server. Nessun messaggio viene salvato nel browser.

I log applicativi `scope=contact` contengono solo evento, UUID tecnico, status, durata e modalità del limiter. Non includono IP, nome, recapito, testo del messaggio, credenziali o corpo delle risposte Resend. `sent` significa accettato dal provider, non prova di consegna in inbox. I log del provider e dell’hosting seguono le rispettive configurazioni.

### Attivazione del limite condiviso — necessaria configurazione esterna

Il codice supporta Redis REST (Upstash) con un contatore atomico e TTL di 600 secondi, massimo 5 tentativi per chiave. Nel servizio Redis arrivano solo chiave HMAC e contatore, mai IP in chiaro o contenuto del modulo. Usare un database dedicato e il suo endpoint primario.

Configurare in Vercel, solo lato server e nello stesso ambiente:
- `UPSTASH_REDIS_REST_URL`: endpoint HTTPS del database.
- `UPSTASH_REDIS_REST_TOKEN`: token di scrittura.
- `CONTACT_RATE_LIMIT_SECRET`: segreto casuale stabile, almeno 32 byte, uguale fra tutte le istanze.

Se tutte le variabili mancano resta il limiter locale precedente, indicato nei log come `limiter=local`. Non descrivere il limite condiviso come attivo finché i log non mostrano `limiter=shared`. Se la configurazione è parziale o il servizio condiviso non risponde, il modulo restituisce 503 con recapiti alternativi, senza inviare email. Le preview hanno un prefisso separato dalla produzione.

L’attivazione richiede accesso al team Vercel del sito e al database. Verificare in preview che il sesto tentativo sia limitato, che il contatore scada e che un errore del database non provochi invii. I test automatici verificano il contratto HTTP con risposte simulate, non sostituiscono questo controllo dell’infrastruttura.

### Dati professionali

L’informativa mostra `NEXT_PUBLIC_VAT_NUMBER` soltanto se configurato. Il testo provvisorio è stato rimosso; il numero effettivo deve essere fornito dal titolare, non dedotto o inventato.
