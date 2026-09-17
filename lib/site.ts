export const site = {
  name: 'Dott. Francesco Corsaro',
  role: 'Psicologo | Psicoterapeuta',
  city: 'Catania',
  // The public identity always uses the definitive domain, including preview metadata.
  url: 'https://francescocorsaro.it',
  publicUrl: 'https://francescocorsaro.it/',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'corsaro.francesco.psi@gmail.com',
  phone: '+393485686702',
  phoneHref: 'tel:+393485686702',
  whatsapp: '+393485686702',
  whatsappHref: 'https://wa.me/393485686702',
  address: 'Via Passo Gravina, 137, 95125 Catania (CT)',
  streetAddress: 'Via Passo Gravina, 137',
  addressLocality: 'Catania',
  addressRegion: 'CT',
  postalCode: '95125',
  orderNumber: process.env.NEXT_PUBLIC_ORDER_NUMBER || '10083-A',
  orderRegion: 'Sicilia',
  vat: process.env.NEXT_PUBLIC_VAT_NUMBER || '[DA INSERIRE]',
  onlineTherapy: process.env.NEXT_PUBLIC_ONLINE_THERAPY
    ? process.env.NEXT_PUBLIC_ONLINE_THERAPY === 'true'
    : true,
  sessionDuration: 50,
  photo: '/a0045d7b-d706-4c43-9065-156ba743ea10.jpg',
  logo: '/logo-francesco-corsaro.svg',
};

const isProductionDeployment = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production';
export const isPublicSite =
  isProductionDeployment &&
  site.url.startsWith('https://') &&
  !site.url.includes('localhost') &&
  !site.url.includes('vercel.app');

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/chi-sono', label: 'Chi sono' },
  { href: '/come-lavoro', label: 'Come lavoro' },
  { href: '/aree-di-intervento', label: 'Aree di intervento' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contatti', label: 'Contatti' },
];

export const areas = [
  {
    href: '/psicologo-ansia-catania',
    title: 'Ansia e regolazione emotiva',
    text: 'Quando preoccupazioni, tensione o paura del giudizio limitano studio, relazioni e scelte.'
  },
  {
    href: '/psicologo-adhd-catania',
    title: 'ADHD',
    text: 'Un lavoro su organizzazione, gestione del tempo ed emozioni, per adolescenti e giovani adulti.'
  },
  {
    href: '/psicologo-autismo-catania',
    title: 'Autismo e neurodivergenze',
    text: 'Supporto a persone autistiche e famiglie, a partire da comunicazione, bisogni e contesti di vita.'
  },
  {
    href: '/psicologo-adolescenti-catania',
    title: 'Adolescenza',
    text: 'Uno spazio per difficoltà emotive, scuola, relazioni e autonomia, con un ruolo dei genitori da chiarire insieme.'
  },
  {
    href: '/psicoterapia-giovani-adulti-catania',
    title: 'Giovani adulti',
    text: 'Affrontare scelte di studio e lavoro, relazioni e momenti in cui ci si sente fermi.'
  },
  {
    href: '/parent-training-catania',
    title: 'Supporto ai genitori e parent training',
    text: 'Partire dagli episodi quotidiani per costruire strategie educative e comunicative sostenibili in famiglia.'
  }
];
