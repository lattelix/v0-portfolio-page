import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RoutePage } from '@/components/site/route-page'
import { projects, site } from '@/content/site'
import { createPageMetadata } from '@/lib/seo'

type WorkPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return {}
  }

  return createPageMetadata({
    description: project.description,
    path: `/works/${project.slug}`,
    title: project.name,
  })
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <RoutePage
      description={`${project.role} / ${project.year} / ${site.name}`}
      eyebrow={project.type}
      title={project.name}
    >
      <section className="route-section detail-layout">
        <article className="detail-lead">
          <span>Result</span>
          <h2>{project.result}</h2>
          <p>{project.description}</p>
        </article>

        <article>
          <h2>Challenge</h2>
          <p>{project.challenge}</p>
        </article>

        <article>
          <h2>Solution</h2>
          <p>{project.solution}</p>
        </article>

        <article>
          <h2>Stack</h2>
          <div className="skill-list">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>

        <article>
          <h2>Highlights</h2>
          <div className="skill-list">
            {project.highlights.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>
      </section>
    </RoutePage>
  )
}
