import type { MetadataRoute } from 'next'

import { games, posts, projects, site } from '@/content/site'

const staticRoutes = ['', '/cv', '/works', '/posts', '/tools', '/tools/images', '/tools/files', '/tools/qr-code', '/games', '/music']
const dynamicRoutes = [
  ...projects.map((project) => `/works/${project.slug}`),
  ...posts.map((post) => `/posts/${post.slug}`),
  ...games.map((game) => `/games/${game.slug}`),
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    lastModified: new Date(),
    priority: route === '' ? 1 : 0.7,
    url: `https://${site.domain}${route}`,
  }))
}
