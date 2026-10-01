import type { Metadata } from 'next'

import { RoutePage } from '@/components/site/route-page'
import { QrGenerator } from '@/components/tools/qr-generator'
import { site } from '@/content/site'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  description: `Free, private QR code generator by ${site.name} with styling, logos and PNG/SVG export.`,
  path: '/tools/qr-code',
  title: 'QR Studio',
})

export default function QrCodeToolPage() {
  return (
    <RoutePage
      description="Generate polished QR codes locally in your browser, customize the geometry and export production-ready PNG or SVG."
      eyebrow="Tools / QR"
      title="QR Studio"
    >
      <section className="route-section tool-route-section">
        <QrGenerator />
      </section>
    </RoutePage>
  )
}
