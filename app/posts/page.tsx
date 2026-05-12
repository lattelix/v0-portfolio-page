import Link from 'next/link'

import { RoutePage } from '@/components/site/route-page'
import { posts, site } from '@/content/site'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  description: `Engineering notes, publications and thinking from ${site.name}.`,
  path: '/posts',
  title: 'Posts',
})

export default function PostsPage() {
  return (
    <RoutePage
      description="A future archive for engineering notes, publication links, product thoughts and build logs."
      eyebrow="Writing"
      title="Posts"
    >
      <section className="route-section stacked-list">
        {posts.map((post) => (
          <Link className="list-link" href={`/posts/${post.slug}`} key={post.slug}>
            <span>{post.date} / {post.readTime}</span>
            <strong>{post.title}</strong>
            <p>{post.description}</p>
          </Link>
        ))}
      </section>
    </RoutePage>
  )
}
