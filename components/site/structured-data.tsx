import { focusAreas, site, socials, stackGroups } from '@/content/site'

function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function StructuredData() {
  const sameAs = socials
    .map((social) => social.href)
    .filter((href) => href.startsWith('https://') && href !== 'https://linkedin.com')
  const knowsAbout = [
    ...focusAreas,
    ...stackGroups.flatMap((group) => group.items),
  ]

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@id': `https://${site.domain}/#person`,
        '@type': 'Person',
        description: site.summary,
        email: `mailto:${site.email}`,
        jobTitle: site.role,
        knowsAbout,
        name: site.name,
        sameAs,
        url: `https://${site.domain}`,
      },
      {
        '@id': `https://${site.domain}/#website`,
        '@type': 'WebSite',
        description: site.description,
        inLanguage: 'en',
        name: site.name,
        publisher: {
          '@id': `https://${site.domain}/#person`,
        },
        url: `https://${site.domain}`,
      },
    ],
  }

  return (
    <script
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }}
      type="application/ld+json"
    />
  )
}
