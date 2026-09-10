# Francesco Corsaro — sito professionale

Sito Next.js/React realizzato per Francesco Corsaro, Psicologo e Psicoterapeuta a Catania.

## Avvio locale

```bash
npm install
cp .env.example .env.local
npm run dev
```

Aprire `http://localhost:3000`.

## Dati da configurare

Compilare `.env.local` in locale oppure le Environment Variables del progetto su Vercel:

- `NEXT_PUBLIC_SITE_URL`: dominio definitivo.
- `NEXT_PUBLIC_CONTACT_EMAIL`: email professionale pubblicata nel sito.
- `NEXT_PUBLIC_PHONE`: telefono professionale. Valore attuale: `+39 348 568 6702`.
- `NEXT_PUBLIC_WHATSAPP`: numero WhatsApp. Valore attuale: `+39 348 568 6702`.
- `NEXT_PUBLIC_STUDIO_ADDRESS`: indirizzo completo dello studio.
- `NEXT_PUBLIC_ORDER_NUMBER`: `10083-A`.
- `NEXT_PUBLIC_VAT_NUMBER`: Partita IVA, da inserire appena disponibile.
- `NEXT_PUBLIC_ONLINE_THERAPY`: `true`.

## Foto professionale

La foto attualmente utilizzata è:

`public/a0045d7b-d706-4c43-9065-156ba743ea10.jpg`

Viene caricata tramite `next/image` nella homepage e nella pagina `Chi sono`.

## Form contatti

Il form invia i dati a `/api/contact` e non usa più `mailto:`. L'endpoint server-side inoltra il messaggio tramite Resend senza salvarlo in un database del sito.

Per attivare l'invio su Vercel aggiungere queste variabili in **Project → Settings → Environment Variables**:

- `RESEND_API_KEY`: chiave API Resend.
- `CONTACT_EMAIL_TO`: indirizzo email professionale che deve ricevere i messaggi.
- `CONTACT_EMAIL_FROM`: mittente verificato su Resend. Durante i test può essere lasciato il valore di esempio previsto dal progetto; prima del lancio è preferibile verificare il proprio dominio e usare un mittente del dominio professionale.

Il form include:

- validazione dei campi;
- honeypot antispam;
- limiti di lunghezza lato client e lato server;
- nessun database;
- messaggi di errore e conferma accessibili;
- avviso all'utente di non inserire referti, diagnosi o informazioni cliniche non necessarie nel primo contatto.

## Privacy e cookie

Il sito è configurato senza Google Analytics, Meta Pixel o altri tracker pubblicitari. Per questo motivo non viene mostrato un banner di consenso per finalità opzionali.

Sono presenti:

- Privacy Policy coerente con Vercel, form server-side, Resend e link WhatsApp;
- Cookie Policy che dichiara l'assenza attuale di strumenti di profilazione/analytics;
- componente cookie lasciato neutro e non attivo finché non vengono aggiunti strumenti opzionali.

Se in futuro verranno aggiunti analytics o altri tracker non tecnici, bisognerà aggiornare informativa, Cookie Policy e gestione del consenso prima di attivarli.

## SEO già predisposta

- Metadata per homepage e pagine principali.
- Pagine locali dedicate:
  - `/psicologo-ansia-catania`
  - `/psicologo-adhd-catania`
  - `/psicologo-autismo-catania`
  - `/psicologo-adolescenti-catania`
  - `/psicoterapia-giovani-adulti-catania`
  - `/parent-training-catania`
- `sitemap.xml` e `robots.txt` dinamici.
- JSON-LD `Person` + `ProfessionalService`.
- Struttura `/articoli` pronta per contenuti divulgativi.
- favicon `FC` tramite `app/icon.svg`.
- immagine OpenGraph dinamica tramite `app/opengraph-image.tsx`.

Prima della pubblicazione definitiva vanno ancora inseriti dominio, email, indirizzo studio e Partita IVA. Dopo il dominio è consigliato configurare Google Search Console e mantenere coerenti nome, indirizzo e telefono con il Google Business Profile.

## Accessibilità e performance

- HTML semantico e skip link.
- Focus visibile e navigazione da tastiera.
- Visualizzazione interattiva dei nodi accessibile con `button`, focus e `aria-pressed`.
- Rispetto di `prefers-reduced-motion`.
- Responsive mobile-first.
- Nessuna libreria pesante per le animazioni.
- `next/image` per la fotografia professionale.
- Nessun analytics attivo di default.

## Note etiche

Il copy evita promesse terapeutiche, false testimonianze, percentuali di efficacia, claim assoluti e strumenti costruiti per favorire l'autodiagnosi. Prima della pubblicazione definitiva resta comunque opportuno verificare che i dati amministrativi e le informative corrispondano esattamente ai servizi realmente utilizzati.
