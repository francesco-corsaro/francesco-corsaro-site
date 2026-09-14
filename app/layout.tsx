import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/SeoJsonLd';
import { isPublicSite, site } from '@/lib/site';
import './globals.css';
import './identity.css';

const defaultTitle = 'Psicologo e Psicoterapeuta a Catania | Francesco Corsaro';
const defaultDescription = 'Psicoterapia a Catania per adolescenti, giovani adulti e genitori. Ansia, ADHD, autismo e neurodivergenze, regolazione emotiva e parent training.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: 'Francesco Corsaro · Psicologo Psicoterapeuta',
  title: { default: defaultTitle, template: '%s | Francesco Corsaro' },
  description: defaultDescription,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: 'Psicologia e psicoterapia',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: site.url,
    siteName: 'Francesco Corsaro · Psicologo Psicoterapeuta',
    title: defaultTitle,
    description: defaultDescription,
    images: [{
      url: '/opengraph-image',
      width: 1200,
      height: 630,
      alt: 'Francesco Corsaro, psicologo e psicoterapeuta a Catania'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: ['/opengraph-image']
  },
  robots: {
    index: isPublicSite,
    follow: true,
    googleBot: {
      index: isPublicSite,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: 'Francesco Corsaro · Psicologo Psicoterapeuta',
        description: defaultDescription,
        inLanguage: 'it-IT',
        publisher: { '@id': `${site.url}/#practice` }
      },
      {
        '@type': 'Person',
        '@id': `${site.url}/#person`,
        name: site.name,
        url: `${site.url}/chi-sono`,
        jobTitle: 'Psicologo e Psicoterapeuta',
        telephone: site.phone,
        email: site.email,
        image: `${site.url}${site.photo}`,
        address: structuredAddress,
        identifier: {
          '@type': 'PropertyValue',
          propertyID: 'Ordine degli Psicologi della Regione Siciliana',
          value: site.orderNumber
        },
        memberOf: {
          '@type': 'Organization',
          name: 'Ordine degli Psicologi della Regione Siciliana'
        },
        knowsAbout: ['Psicoterapia Cognitiva Complessa', 'Ansia', 'ADHD', 'Autismo', 'Adolescenza', 'Parent training']
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${site.url}/#practice`,
        name: `${site.name} - Psicologo e Psicoterapeuta`,
        description: defaultDescription,
        url: site.url,
        logo: `${site.url}${site.logo}`,
        image: `${site.url}${site.photo}`,
        telephone: site.phone,
        email: site.email,
        areaServed: { '@type': 'City', name: 'Catania' },
        founder: { '@id': `${site.url}/#person` },
        address: structuredAddress,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: site.phone,
          email: site.email,
          contactType: 'appuntamenti',
          availableLanguage: 'Italian'
        }
      }
    ]
  };

  return (
    <html lang="it">
      <body>
        <a className="skip" href="#contenuto">Vai al contenuto</a>
        <Header />
        <main id="contenuto">{children}</main>
        <Footer />
        <a className="mobile-cta" href="/contatti">Richiedi un colloquio</a>
        <JsonLd data={jsonLd} />
      </body>
    </html>
  );
}
