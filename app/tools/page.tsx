import type { Metadata } from 'next'
import Link from 'next/link'
import { QrCode } from 'lucide-react'

import { RoutePage } from '@/components/site/route-page'
import { site } from '@/content/site'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  description: `Small, free browser tools by ${site.name}.`,
  path: '/tools',
  title: 'Tools',
})

const tools = [
  {
    title: 'QR Studio',
    status: 'Ready',
    description:
      'Create clean or highly styled QR codes locally in the browser. No account, no API limits and no tracking.',
    href: '/tools/qr-code',
    stack: ['PNG / SVG', 'Custom styles', 'Logo', 'Client-side'],
  },
]

export default function ToolsPage() {
  return (
    <RoutePage
      description="Small utilities built to be fast, private and useful without signups or paywalls."
      eyebrow="Utility shelf"
      title="Tools"
    >
      <section className="route-section route-grid">
        {tools.map((tool) => (
          <Link className="route-card" href={tool.href} key={tool.href}>
            <span>{tool.status}</span>
            <QrCode aria-hidden="true" className="tool-card-icon" size={30} strokeWidth={1.55} />
            <h2>{tool.title}</h2>
            <p>{tool.description}</p>
            <div>
              {tool.stack.map((item) => (
                <small key={item}>{item}</small>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </RoutePage>
  )
}
