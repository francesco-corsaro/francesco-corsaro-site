import { MetadataRoute } from 'next';
import { isPublicSite, site } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  if (!isPublicSite) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/'
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url
  };
}
