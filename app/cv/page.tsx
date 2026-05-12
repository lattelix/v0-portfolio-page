import { RoutePage } from '@/components/site/route-page'
import { availability, contactLinks, experience, focusAreas, proofPoints, site, stackGroups } from '@/content/site'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  description: `CV and engineering profile for ${site.name}.`,
  path: '/cv',
  title: 'CV',
})

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

        <article>
          <h2>Contact</h2>
          <div className="contact-list">
            {contactLinks.map((contact) => (
              <a href={contact.href} key={contact.label}>
                <span>{contact.label}</span>
                <strong>{contact.value}</strong>
              </a>
            ))}
          </div>
        </article>

        <article>
          <h2>Availability</h2>
          <div className="stack-groups">
            <div>
              <strong>{availability.status}</strong>
              <p>{availability.detail}</p>
            </div>
          </div>
        </article>

        <article>
          <h2>Stack</h2>
          <div className="stack-groups">
            {stackGroups.map((group) => (
              <div key={group.title}>
                <strong>{group.title}</strong>
                <p>{group.items.join(' / ')}</p>
              </div>
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

        <article className="wide-article">
          <h2>Proof points</h2>
          <div className="proof-grid compact-proof-grid">
            {proofPoints.map((point) => (
              <div key={point.title}>
                <span>{point.signal}</span>
                <h3>{point.title}</h3>
                <p>{point.detail}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </RoutePage>
  )
}
