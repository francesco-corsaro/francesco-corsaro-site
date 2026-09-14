import { site } from '@/lib/site';

type JsonLdValue = Record<string, unknown>;

export function JsonLd({ data }: { data: JsonLdValue }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; path: string }> }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: new URL(item.path, `${site.url}/`).toString()
        }))
      }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  path,
  audience
}: {
  name: string;
  description: string;
  path: string;
  audience?: string;
}) {
  const url = new URL(path, `${site.url}/`).toString();

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${url}#service`,
        name,
        description,
        url,
        serviceType: name,
        provider: { '@id': `${site.url}/#practice` },
        areaServed: { '@type': 'City', name: 'Catania' },
        ...(audience ? { audience: { '@type': 'Audience', audienceType: audience } } : {}),
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: `${site.url}/contatti`,
          serviceLocation: { '@id': `${site.url}/#practice` }
        }
      }}
    />
  );
}
