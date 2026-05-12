import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RoutePage } from '@/components/site/route-page'
import { posts } from '@/content/site'
import { createPageMetadata } from '@/lib/seo'

type PostPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((item) => item.slug === slug)

  if (!post) {
    return {}
  }

  return createPageMetadata({
    description: post.description,
    path: `/posts/${post.slug}`,
    title: post.title,
  })
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = posts.find((item) => item.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <RoutePage description={post.description} eyebrow={`${post.date} / ${post.readTime}`} title={post.title}>
      <article className="route-section prose-panel">
        {post.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>
    </RoutePage>
  )
}
