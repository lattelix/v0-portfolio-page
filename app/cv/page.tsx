import type { Metadata } from 'next'

import { RoutePage } from '@/components/site/route-page'
import { experience, focusAreas, site } from '@/content/site'

export const metadata: Metadata = {
  title: 'CV',
  description: `CV and engineering profile for ${site.name}.`,
}

export default function CvPage() {
  return (
    <RoutePage
      description="A compact professional profile for frontend, full-stack, data interfaces and product engineering."
      eyebrow="Resume"
      title="CV"
    >
      <section className="route-section cv-layout">
        <article>
          <h2>Profile</h2>
          <p>{site.summary}</p>
        </article>

        <article>
          <h2>Core focus</h2>
          <div className="skill-list">
            {focusAreas.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>
        </article>

        <article className="wide-article">
          <h2>Experience</h2>
          <div className="timeline">
            {experience.map((item) => (
              <div className="timeline-item" key={item.company}>
                <span>{item.period}</span>
                <h3>{item.company}</h3>
                <strong>{item.role}</strong>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </RoutePage>
  )
}
