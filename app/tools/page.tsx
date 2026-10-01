import type { Metadata } from 'next'
import Link from 'next/link'
import { FileStack, Images, QrCode } from 'lucide-react'
import { RoutePage } from '@/components/site/route-page'
import { site } from '@/content/site'
import { createPageMetadata } from '@/lib/seo'
export const metadata: Metadata=createPageMetadata({description:`Small, free browser tools by ${site.name}.`,path:'/tools',title:'Tools'})
const groups=[
 {title:'Image Studio',status:'Ready',description:'One workspace for resize, crop, upscale, compression and format conversion. Upload once and move between operations.',href:'/tools/images',stack:['Resize','Crop','Upscale','Compress','Convert'],icon:Images},
 {title:'File Studio',status:'Ready',description:'Merge PDFs, extract selected pages, or turn a set of images into a PDF without uploading files.',href:'/tools/files',stack:['Merge PDF','Extract pages','Images → PDF'],icon:FileStack},
 {title:'QR Studio',status:'Ready',description:'Create clean or styled QR codes with custom geometry, colors, logos and PNG/SVG export.',href:'/tools/qr-code',stack:['PNG / SVG','Custom styles','Logo'],icon:QrCode},
]
export default function ToolsPage(){return <RoutePage description="Small utilities grouped into useful workspaces — fewer pages, fewer uploads, less friction." eyebrow="Utility shelf" title="Tools"><section className="route-section route-grid">{groups.map(tool=>{const Icon=tool.icon;return <Link className="route-card" href={tool.href} key={tool.href}><span>{tool.status}</span><Icon aria-hidden="true" className="tool-card-icon" size={30} strokeWidth={1.55}/><h2>{tool.title}</h2><p>{tool.description}</p><div>{tool.stack.map(item=><small key={item}>{item}</small>)}</div></Link>})}</section></RoutePage>}
