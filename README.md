# Francesco Corsaro — sito professionale

Sito Next.js/React per Francesco Corsaro, Psicologo e Psicoterapeuta a Catania.

## Avvio locale

```bash
npm install
cp .env.example .env.local
npm run dev
```

Aprire `http://localhost:3000`.

## Dati professionali attuali

- Nome: Francesco Corsaro
- Professione: Psicologo e Psicoterapeuta
- Ordine degli Psicologi della Regione Siciliana: n. 10083-A
- Studio: Via Passo Gravina 137, 95125 Catania
- Telefono / WhatsApp: +39 348 568 6702
- Email: corsaro.francesco.psi@gmail.com
- Seduta: 50 minuti
- Terapia online: disponibile
- Partita IVA: da inserire prima della pubblicazione definitiva

## Variabili ambiente

Configurare in locale tramite `.env.local` oppure su Vercel tramite **Project → Settings → Environment Variables**.

- `NEXT_PUBLIC_SITE_URL`: dominio definitivo. Finché non viene impostato un dominio pubblico diverso da `vercel.app`, il sito resta `noindex` e `robots.txt` blocca i crawler.
- `NEXT_PUBLIC_CONTACT_EMAIL`: opzionale; il codice contiene già l'email professionale come fallback.
- `NEXT_PUBLIC_PHONE`: opzionale; il codice contiene già il telefono come fallback.
- `NEXT_PUBLIC_WHATSAPP`: opzionale; il codice contiene già il numero WhatsApp come fallback.
- `NEXT_PUBLIC_STUDIO_ADDRESS`: opzionale; il codice contiene già l'indirizzo dello studio come fallback.
- `NEXT_PUBLIC_ORDER_NUMBER`: opzionale; fallback `10083-A`.
- `NEXT_PUBLIC_VAT_NUMBER`: Partita IVA da configurare appena disponibile.
- `NEXT_PUBLIC_ONLINE_THERAPY`: `true`.
- `RESEND_API_KEY`: segreto Resend. Non deve mai avere prefisso `NEXT_PUBLIC_` e non deve essere salvato nel repository.
- `CONTACT_EMAIL_TO`: `corsaro.francesco.psi@gmail.com`.
- `CONTACT_EMAIL_FROM`: durante i test può usare `Sito Francesco Corsaro <onboarding@resend.dev>`; dopo la verifica del dominio su Resend va sostituito con un mittente del dominio professionale.

## Foto e identità visiva

Foto professionale:

`public/a0045d7b-d706-4c43-9065-156ba743ea10.jpg`

Logo:

`public/logo-francesco-corsaro.png`

La fotografia viene caricata con `next/image` nella homepage e nella pagina `Chi sono`. Il logo viene usato nell'header e nel footer. La favicon mantiene il monogramma `FC`, più leggibile a dimensioni molto piccole. È presente anche un'immagine OpenGraph dinamica per la condivisione social.

## Form contatti

Il form invia i dati a `/api/contact` e inoltra il messaggio tramite Resend senza utilizzare un database proprio del sito.

Sono presenti:

- validazione lato client e server;
- honeypot antispam;
- controllo del tempo minimo/massimo di compilazione;
- limiti di lunghezza dei campi;
- messaggi di errore e conferma accessibili;
- avviso esplicito di non inserire referti, diagnosi o dettagli clinici non necessari nel primo contatto.

Il form è stato testato su Vercel e l'invio a `corsaro.francesco.psi@gmail.com` risulta funzionante.

## Privacy e cookie

Il sito non utilizza Google Analytics, Meta Pixel o altri tracker pubblicitari. Non è quindi attivo un banner per consensi opzionali; la Cookie Policy spiega la configurazione corrente.

La Privacy Policy descrive Vercel, Resend, il form e il link WhatsApp. Resend può conservare log API e dati necessari all'invio negli Stati Uniti; prima del lancio definitivo va mantenuta coerenza tra l'informativa e la configurazione effettiva dei fornitori.

Per un sito professionale occorre verificare anche che il piano di hosting scelto sia idoneo all'uso commerciale e agli accordi sul trattamento dei dati applicabili. Vercel indica il piano Hobby per uso personale/non commerciale e il proprio DPA per i piani Pro ed Enterprise; verificare quindi il piano prima di utilizzare il sito come presenza professionale pubblica.

## SEO

Sono predisposti:

- metadata e OpenGraph;
- canonical URL;
- sitemap e robots dinamici;
- JSON-LD `Person` + `ProfessionalService` con indirizzo, telefono, email, foto e logo;
- pagine SEO locali:
  - `/psicologo-ansia-catania`
  - `/psicologo-adhd-catania`
  - `/psicologo-autismo-catania`
  - `/psicologo-adolescenti-catania`
  - `/psicoterapia-giovani-adulti-catania`
  - `/parent-training-catania`
- struttura `/articoli` pronta ma impostata `noindex` finché non saranno pubblicati contenuti reali.

Dopo l'acquisto del dominio:

1. collegare il dominio a Vercel o all'hosting scelto;
2. impostare `NEXT_PUBLIC_SITE_URL=https://dominio.it` e fare redeploy;
3. verificare il dominio su Resend e configurare `CONTACT_EMAIL_FROM` con un mittente professionale;
4. testare nuovamente form, canonical, sitemap, robots e immagine OpenGraph;
5. configurare Google Search Console;
6. mantenere coerenti nome, indirizzo e telefono con il Google Business Profile.

## Accessibilità, performance e sicurezza

- HTML semantico e skip link;
- focus visibile e navigazione da tastiera;
- visualizzazione dei nodi accessibile con pulsanti, focus e `aria-pressed`;
- rispetto di `prefers-reduced-motion`;
- responsive mobile-first;
- `next/image` e formati AVIF/WebP;
- nessuna libreria pesante per animazioni;
- nessun analytics attivo;
- header di sicurezza essenziali (`nosniff`, referrer policy, frame policy e permissions policy);
- artefatti TypeScript esclusi dal repository.

## Da confermare prima del lancio

- Partita IVA.
- Dominio definitivo.
- Piano/hosting definitivo e relativi accordi privacy.
- Mittente email del dominio verificato su Resend.
- Modalità concreta con cui Francesco desidera descrivere il coinvolgimento dei genitori nella terapia degli adolescenti, se si vuole rendere la FAQ più specifica.
- Ampiezza esatta della fascia adulta seguita per ADHD, se si vuole posizionare il sito anche oltre i giovani adulti.
- Revisione finale visuale e Lighthouse sulla URL definitiva.

## Note etiche

Il copy evita promesse terapeutiche, false testimonianze, percentuali di efficacia, claim assoluti e strumenti costruiti per favorire l'autodiagnosi. Prima della pubblicazione definitiva va comunque verificato che dati amministrativi, modalità professionali dichiarate e informative corrispondano esattamente alla pratica reale e ai servizi effettivamente utilizzati.
