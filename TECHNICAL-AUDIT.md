# Audit tecnico — 30 settembre 2026, aggiornamento dopo attivazione Turnstile

## Esito e modifiche

| Area | Riscontro | Intervento / stato |
| --- | --- | --- |
| Conferma invio | Avviso poco evidente in fondo al form, con CAPTCHA che ripartiva | Il form viene sostituito da un riquadro «Messaggio inviato», con icona, spiegazione del ricontatto e indicazione di non reinviare. Focus e scorrimento automatici. Nuovo messaggio solo su scelta esplicita. |
| Attesa ed errori | Stato ambiguo e rischio di ripetere il click | Pulsante «Invia il messaggio», indicatore di attesa, campi bloccati durante invio e blocco sincrono dei doppi submit. Errore evidente con focus e testo conservato. Successo solo con HTTP positivo e `ok: true`. |
| Retry email | Dopo un timeout non è certo se il provider abbia già accettato l’email | Idempotency-Key Resend derivata da ID casuale della richiesta e contenuto normalizzato; stesso tentativo invariato non produce email duplicate nella finestra del provider (24 ore). Modifiche ai contenuti o un nuovo messaggio producono chiavi diverse. Nessun dato personale in chiaro nella chiave. |
| Antibot | Turnstile attivato; l’utente conferma la ricezione email | Restano token obbligatorio, Siteverify server, hostname esatto, action contact, gestione scadenza e rifiuto in caso di errore. Nessuna chiave segreta nel repository. |
| Dipendenze | Prima: PostCSS alto e Next.js moderato tramite dipendenza transitiva | Override PostCSS 8.5.28, stessa major, lockfile aggiornato e build compatibile con Next.js 15.5.25. Dopo: npm audit completo restituisce zero vulnerabilità note. |
| Controlli CI | Nessun blocco per nuove vulnerabilità di produzione | Aggiunto npm audit --omit=dev --audit-level=high nel workflow GitHub. |
| Header HTTP | Header principali presenti, nessuna CSP | CSP di base: object-src none, base-uri self, frame-ancestors self, form-action self. No-store sulle API. Non è una CSP completa per script/style. |
| SEO tecnico | 14 pagine HTML pubbliche controllate | Tutte HTTP 200, un H1 e canonical presente. Robots e sitemap HTTP 200. Articoli vuoti e policy mantengono noindex; sitemap limitata alle pagine pertinenti. |
| Accessibilità | Menu e diagramma già navigabili con tastiera | Nuovi stati form con status/alert e focus; animazione disattivata con prefers-reduced-motion; checkbox nativa e campi 16px conservati. |
| Cookie | Nessun analytics/pixel | Avviso tecnico con cookie di versione, sei mesi, SameSite=Lax e Secure su HTTPS. Riapertura dal footer. Nessun consenso raccolto per tracker inesistenti. |

## Verifiche svolte

- Lint, TypeScript e build di produzione.
- Nove test automatici: validazione, origine e formato, corpo sovradimensionato, rate limit locale, Turnstile e blocco email, idempotenza, componente React del modulo.
- Il test del componente usa un DOM simulato e API esterne simulate: controlla doppio submit, attesa, errore con conservazione del messaggio, successo con sostituzione del form e focus, riapertura di un form vuoto.
- npm audit completo: 0 vulnerabilità note; npm ls conferma PostCSS 8.5.28 effettivamente usato da Next.js.
- Richieste HTTP alle 14 pagine principali, robots.txt e sitemap.xml.
- Il proprietario ha confermato la consegna delle email con Turnstile prima di questo aggiornamento. Nessuna email reale inviata dai test automatici.

## Interventi ancora aperti

| Priorità | Attività | Dipendenza |
| --- | --- | --- |
| P1 | Quota globale per POST /api/contact tramite Vercel Firewall o store condiviso | Accesso al progetto Vercel. Il connettore restituisce 403; non è stata configurata una regola. Il limite applicativo resta cinque tentativi in dieci minuti per istanza, non globale. |
| P1 | Completare Partita IVA e definire tempi concreti di eliminazione richieste senza seguito; verificare accordi dei fornitori | Dati e scelte del titolare. Nessun dato inventato. |
| P2 | CSP completa con controllo degli script | Progettare nonce/hash compatibili con pagine statiche Next.js e Cloudflare; collaudo in report-only prima del blocco. La CSP di base non elimina da sola il rischio XSS. |
| P2 | Collaudo su Safari/iPhone e Chrome/Android reali, zoom e lettore schermo | I test DOM non sostituiscono prove su dispositivi reali. |
| P2 | Misurazione Core Web Vitals sul traffico reale | Search Console/CrUX; nessun punteggio Lighthouse inventato. Le pagine restano prerenderizzate; Contatti circa 111 kB di First Load JS secondo build. |
| P3 | Piano per rimuovere l’override PostCSS quando Next.js include una versione corretta | Verificare la dipendenza dopo un futuro aggiornamento del framework; non rimuovere l’override alla cieca. |

## Dati raccolti

Nome, un recapito (email oppure telefono) e breve messaggio per il ricontatto. Non richiedere diagnosi, referti o dettagli clinici. Il sito inoltra tramite Resend senza database proprio; casella email e fornitori conservano comunque dati secondo configurazione e accordi. Turnstile elabora segnali tecnici; il codice applicativo non invia il contenuto del messaggio a Cloudflare. ID del tentativo mantenuto solo in memoria durante la compilazione, senza localStorage.

## Fonti tecniche

- https://github.com/postcss/postcss/releases
- https://resend.com/docs/dashboard/emails/idempotency-keys
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- https://www.garanteprivacy.it/faq/cookie
