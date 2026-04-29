import type { MetadataRoute } from 'next'

import { site } from '@/content/site'

const routes = ['', '/cv', '/works', '/posts', '/games']

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    lastModified: new Date(),
    priority: route === '' ? 1 : 0.7,
    url: `https://${site.domain}${route}`,
  }))
}
