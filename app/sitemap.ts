import { MetadataRoute } from 'next';
import { areas, isPublicSite, site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isPublicSite) return [];

  const base=['','/chi-sono','/come-lavoro','/aree-di-intervento','/faq','/contatti'];
  return [
    ...base.map(path=>({url:new URL(path || '/', `${site.url}/`).toString()})),
    ...areas.map(area=>({url:new URL(area.href, `${site.url}/`).toString()}))
  ];
}
