import type { Metadata } from 'next'
import Link from 'next/link'

import { RoutePage } from '@/components/site/route-page'
import { projects, site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Works',
  description: `Selected work and engineering projects by ${site.name}.`,
}

export default function WorksPage() {
  return (
    <RoutePage
      description="Case-study ready project surfaces. Real details can be expanded here as the portfolio matures."
      eyebrow="Portfolio"
      title="Works"
    >
      <section className="route-section route-grid">
        {projects.map((project) => (
          <Link className="work-card route-card" href={project.href} key={project.slug}>
            <span>{project.status}</span>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <div>
              {project.stack.map((item) => (
                <small key={item}>{item}</small>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </RoutePage>
  )
}
