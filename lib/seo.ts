import type { Metadata } from 'next';
import { isPublicSite, site } from '@/lib/site';

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

const siteName = 'Francesco Corsaro · Psicologo Psicoterapeuta';
const socialImage = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Francesco Corsaro, psicologo e psicoterapeuta a Catania'
};

export function pageMetadata({ title, description, path, noIndex = false }: PageMetadataOptions): Metadata {
  const url = new URL(path, `${site.url}/`).toString();
  const socialTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const indexable = isPublicSite && !noIndex;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'it_IT',
      siteName,
      url,
      title: socialTitle,
      description,
      images: [socialImage]
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: ['/opengraph-image']
    },
    robots: {
      index: indexable,
      follow: true,
      googleBot: {
        index: indexable,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1
      }
    }
  };
}
