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

Compilare `.env.local`:

- `NEXT_PUBLIC_SITE_URL`: dominio definitivo.
- `NEXT_PUBLIC_CONTACT_EMAIL`: email professionale.
- `NEXT_PUBLIC_PHONE`: telefono professionale.
- `NEXT_PUBLIC_WHATSAPP`: numero WhatsApp solo se si desidera pubblicarlo.
- `NEXT_PUBLIC_STUDIO_ADDRESS`: indirizzo completo dello studio.
- `NEXT_PUBLIC_ORDER_NUMBER`: numero/iscrizione Ordine Psicologi.
- `NEXT_PUBLIC_VAT_NUMBER`: Partita IVA.
- `NEXT_PUBLIC_ONLINE_THERAPY`: `true` o `false` dopo conferma.
- `NEXT_PUBLIC_ENABLE_COOKIE_BANNER`: lasciare `false` finché non si introducono cookie non tecnici; impostare `true` solo dopo aver integrato una CMP/gestione consenso adeguata ai servizi effettivamente usati.

## Foto professionale

La homepage contiene deliberatamente un placeholder. Quando è disponibile una foto autentica:

1. salvarla in `public/francesco-corsaro.webp` (preferibilmente WebP/AVIF, ben compressa);
2. sostituire il blocco `.portrait-placeholder` in `app/page.tsx` con `next/image`;
3. usare un `alt` descrittivo ma non keyword-stuffed.

## Form contatti

Il form è operativo come interfaccia e validazione. Quando `NEXT_PUBLIC_CONTACT_EMAIL` è configurato, prepara un'email nel client di posta dell'utente tramite `mailto:`. Se si desidera invio diretto dal sito, collegare un endpoint server-side/provid­er transazionale dopo aver definito privacy, conservazione dati e misure di sicurezza.

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

Prima della pubblicazione conviene aggiungere: dominio definitivo, NAP completo e coerente, immagine OpenGraph reale, favicon, Google Business Profile coerente con i dati pubblicati e Search Console.

## Accessibilità e performance

- HTML semantico e skip link.
- Focus visibile e navigazione tastiera.
- Visualizzazione interattiva dei nodi accessibile con `button`, focus e `aria-pressed`.
- Rispetto di `prefers-reduced-motion`.
- Responsive mobile-first.
- Nessuna libreria di animazione.
- Nessun analytics attivo di default.

## Note etiche

Il copy evita promesse terapeutiche, testimonianze inventate, percentuali di efficacia e autodiagnosi. Privacy e Cookie Policy sono placeholder perché devono riflettere i trattamenti e i servizi realmente configurati prima della messa online.
