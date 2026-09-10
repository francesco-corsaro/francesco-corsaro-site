export const site = {
  name: 'Francesco Corsaro',
  role: 'Psicologo | Psicoterapeuta',
  city: 'Catania',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'corsaro.francesco.psi@gmail.com',
  phone: process.env.NEXT_PUBLIC_PHONE || '+39 348 568 6702',
  phoneHref: 'tel:+393485686702',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '+39 348 568 6702',
  whatsappHref: 'https://wa.me/393485686702',
  address: process.env.NEXT_PUBLIC_STUDIO_ADDRESS || 'Via Passo Gravina 137, 95125 Catania',
  streetAddress: 'Via Passo Gravina 137',
  postalCode: '95125',
  orderNumber: process.env.NEXT_PUBLIC_ORDER_NUMBER || '10083-A',
  orderRegion: 'Sicilia',
  vat: process.env.NEXT_PUBLIC_VAT_NUMBER || '[DA INSERIRE]',
  onlineTherapy: process.env.NEXT_PUBLIC_ONLINE_THERAPY
    ? process.env.NEXT_PUBLIC_ONLINE_THERAPY === 'true'
    : true,
  sessionDuration: 50,
  photo: '/a0045d7b-d706-4c43-9065-156ba743ea10.jpg',
  logo: '/logo-francesco-corsaro.png',
};

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
    text: 'Comprendere come pensieri, corpo, evitamento e strategie di regolazione mantengono l’ansia nel tempo.'
  },
  {
    href: '/psicologo-adhd-catania',
    title: 'ADHD',
    text: 'Attenzione, funzioni esecutive, procrastinazione, impulsività e regolazione emotiva nella vita quotidiana.'
  },
  {
    href: '/psicologo-autismo-catania',
    title: 'Autismo e neurodivergenze',
    text: 'Un lavoro rispettoso della neurodiversità, orientato alla comprensione del funzionamento e dei contesti di vita.'
  },
  {
    href: '/psicologo-adolescenti-catania',
    title: 'Adolescenza',
    text: 'Difficoltà emotive, relazionali e scolastiche in una fase in cui identità, autonomia e appartenenza cambiano rapidamente.'
  },
  {
    href: '/psicoterapia-giovani-adulti-catania',
    title: 'Giovani adulti',
    text: 'Ansia, blocchi, relazioni, cambiamenti e costruzione dell’identità nei passaggi della vita adulta.'
  },
  {
    href: '/parent-training-catania',
    title: 'Supporto ai genitori e parent training',
    text: 'Comprendere le dinamiche familiari e costruire strategie educative più coerenti, sostenibili ed efficaci.'
  }
];
