import type { Metadata } from 'next'
import { RoutePage } from '@/components/site/route-page'
import { FileStudio } from '@/components/tools/file-studio'
import { createPageMetadata } from '@/lib/seo'
export const metadata: Metadata=createPageMetadata({title:'File Studio',description:'Merge, split and build PDFs in one local browser workspace.',path:'/tools/files'})
export default function Page(){return <RoutePage eyebrow="Tools / Files" title="File Studio" description="A single workspace for the annoying little PDF jobs: merge files, extract pages and turn images into a PDF."><section className="route-section tool-route-section"><FileStudio/></section></RoutePage>}
