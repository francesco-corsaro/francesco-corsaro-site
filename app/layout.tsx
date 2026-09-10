import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { isPublicSite, site } from '@/lib/site';
import './globals.css';
import './identity.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Psicologo e Psicoterapeuta a Catania | Francesco Corsaro', template: '%s | Francesco Corsaro' },
  description: 'Psicoterapia a Catania per adolescenti, giovani adulti e genitori. Ansia, ADHD, autismo e neurodivergenze, regolazione emotiva e parent training.',
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'Francesco Corsaro · Psicologo Psicoterapeuta',
    title: 'Psicologo e Psicoterapeuta a Catania | Francesco Corsaro',
    description: 'Comprendere il proprio funzionamento per costruire nuove possibilità di cambiamento.'
  },
  robots: { index: isPublicSite, follow: isPublicSite }
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  const structuredAddress = {
    '@type': 'PostalAddress',
    streetAddress: site.streetAddress,
    postalCode: site.postalCode,
    addressLocality: 'Catania',
    addressRegion: 'Sicilia',
    addressCountry: 'IT'
  };
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person', '@id': `${site.url}/#person`, name: site.name,
        jobTitle: 'Psicologo e Psicoterapeuta',
        telephone: site.phone,
        email: site.email,
        image: `${site.url}${site.photo}`,
        address: structuredAddress,
        knowsAbout: ['Psicoterapia cognitiva complessa','Ansia','ADHD','Autismo','Adolescenza','Parent training']
      },
      {
        '@type': 'ProfessionalService', '@id': `${site.url}/#practice`, name: `${site.name} - Psicologo e Psicoterapeuta`,
        url: site.url,
        logo: `${site.url}${site.logo}`,
        image: `${site.url}${site.photo}`,
        telephone: site.phone,
        email: site.email,
        areaServed: { '@type':'City', name:'Catania' },
        founder: { '@id': `${site.url}/#person` },
        address: structuredAddress
      }
    ]
  };
  return (
    <html lang="it"><body><a className="skip" href="#contenuto">Vai al contenuto</a><Header/><main id="contenuto">{children}</main><Footer/><CookieConsent/><a className="mobile-cta" href="/contatti">Richiedi un colloquio</a><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} /></body></html>
  );
}
