import type { MetadataRoute } from 'next'

import { site } from '@/content/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: '#f4f7ed',
    categories: ['portfolio', 'productivity', 'technology'],
    description: site.description,
    display: 'standalone',
    icons: [
      {
        purpose: 'any',
        sizes: 'any',
        src: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    id: '/',
    lang: 'en',
    name: site.title,
    short_name: site.name,
    start_url: '/',
    theme_color: '#071113',
  }
}
