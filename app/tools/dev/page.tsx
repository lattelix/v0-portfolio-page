import type { Metadata } from 'next'
import { RoutePage } from '@/components/site/route-page'
import { DevStudio } from '@/components/tools/dev-studio'
import { createPageMetadata } from '@/lib/seo'
export const metadata: Metadata=createPageMetadata({title:'Dev Studio',description:'Format JSON, encode Base64, inspect URLs, generate UUIDs and convert timestamps locally.',path:'/tools/dev'})
export default function Page(){return <RoutePage eyebrow="Tools / Dev" title="Dev Studio" description="The tiny developer utilities you always end up searching for, collected in one fast local workspace."><section className="route-section tool-route-section"><DevStudio/></section></RoutePage>}
