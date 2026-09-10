import { MetadataRoute } from 'next';
import { isPublicSite, site } from '@/lib/site';

export default function robots():MetadataRoute.Robots {
  if (!isPublicSite) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${site.url}/sitemap.xml`
  };
}
