import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { designVariants, focusAreas, projects, site } from '@/content/site'

type DesignPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return designVariants.map((variant) => ({ slug: variant.slug }))
}

export async function generateMetadata({ params }: DesignPageProps): Promise<Metadata> {
  const { slug } = await params
  const variant = designVariants.find((item) => item.slug === slug)

  if (!variant) {
    return {}
  }

  return {
    robots: {
      follow: false,
      index: false,
    },
    title: variant.title,
    description: variant.description,
  }
}

export default async function DesignVariantPage({ params }: DesignPageProps) {
  const { slug } = await params
  const variant = designVariants.find((item) => item.slug === slug)

  if (!variant) {
    notFound()
  }

  return (
    <main className={`design-preview design-preview--${variant.slug}`}>
      <section className="design-preview__hero">
        <span>{variant.tone}</span>
        <h1>{site.name}</h1>
        <p>{variant.description}</p>
      </section>

      <section className="design-preview__grid">
        {focusAreas.slice(0, 4).map((area) => (
          <article key={area}>
            <span>Focus</span>
            <h2>{area}</h2>
          </article>
        ))}
      </section>

      <section className="design-preview__work">
        {projects.slice(0, 2).map((project) => (
          <article key={project.slug}>
            <span>{project.type}</span>
            <h2>{project.name}</h2>
            <p>{project.result}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
