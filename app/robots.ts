import type { MetadataRoute } from 'next'

import { site } from '@/content/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: '/',
      disallow: ['/designs', '/designs/'],
      userAgent: '*',
    },
    sitemap: `https://${site.domain}/sitemap.xml`,
  }
}
