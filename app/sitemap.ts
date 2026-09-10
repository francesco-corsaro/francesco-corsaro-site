import { MetadataRoute } from 'next';
import { site, areas } from '@/lib/site';

export default function sitemap():MetadataRoute.Sitemap {
  const base=['','/chi-sono','/come-lavoro','/aree-di-intervento','/faq','/contatti'];
  return [
    ...base.map(url=>({url:`${site.url}${url}`,changeFrequency:'monthly' as const,priority:url===''?1:0.7})),
    ...areas.map(a=>({url:`${site.url}${a.href}`,changeFrequency:'monthly' as const,priority:0.8}))
  ];
}
