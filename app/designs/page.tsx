import type { Metadata } from 'next'
import Link from 'next/link'

import { RoutePage } from '@/components/site/route-page'
import { designVariants } from '@/content/site'

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: 'Design Lab',
  description: 'Alternative design directions for Lattelix.',
}

export default function DesignsPage() {
  return (
    <RoutePage
      description="A noindex lab for testing visual systems without replacing the live identity too early."
      eyebrow="Design lab"
      title="Alternative designs"
    >
      <section className="route-section route-grid">
        {designVariants.map((variant) => (
          <Link className="route-card" href={variant.href} key={variant.slug}>
            <span>{variant.tone}</span>
            <h2>{variant.title}</h2>
            <p>{variant.description}</p>
          </Link>
        ))}
      </section>
    </RoutePage>
  )
}
