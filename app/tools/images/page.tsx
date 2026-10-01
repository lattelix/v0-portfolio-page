import type { Metadata } from 'next'
import { RoutePage } from '@/components/site/route-page'
import { ImageStudio } from '@/components/tools/image-studio'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Image Studio',
  description: 'Resize, crop, upscale, compress and convert images in one private browser workspace.',
  path: '/tools/images',
})

export default function ImageToolsPage() {
  return (
    <RoutePage eyebrow="Tools / Images" title="Image Studio" description="One image in, every common operation in one place. Resize, crop, upscale, compress and convert without re-uploading.">
      <section className="route-section tool-route-section"><ImageStudio /></section>
    </RoutePage>
  )
}
