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
