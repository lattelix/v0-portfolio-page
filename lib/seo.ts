import type { Metadata } from 'next'

import { site } from '@/content/site'

type PageMetadataInput = {
  description: string
  noIndex?: boolean
  path: `/${string}`
  title: string
}

const ogImage = {
  alt: site.title,
  height: 630,
  url: '/opengraph-image',
  width: 1200,
}

export function createPageMetadata({
  description,
  noIndex = false,
  path,
  title,
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} — ${site.name}`

  return {
    alternates: {
      canonical: path,
    },
    description,
    openGraph: {
      description,
      images: [ogImage],
      siteName: site.name,
      title: fullTitle,
      type: 'website',
      url: path,
    },
    robots: noIndex
      ? {
          follow: false,
          index: false,
        }
      : undefined,
    title,
    twitter: {
      card: 'summary_large_image',
      description,
      images: ['/opengraph-image'],
      title: fullTitle,
    },
  }
}
