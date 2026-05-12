import { RoutePage } from '@/components/site/route-page'
import { musicPlan, site } from '@/content/site'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  description: `${site.name} music room, listening notes and Navidrome architecture plan.`,
  path: '/music',
  title: 'Music',
})

export default function MusicPage() {
  return (
    <RoutePage description={musicPlan.description} eyebrow="Music" title={musicPlan.title}>
      <section className="route-section music-layout">
        <article className="detail-lead">
          <span>Public page</span>
          <h2>Listening context without exposing the private library.</h2>
          <p>
            This page is the public surface. Navidrome stays private later, while curated playlists,
            notes and now-playing signals can become part of the site identity.
          </p>
        </article>

        <article>
          <h2>Features to build</h2>
          <div className="skill-list">
            {musicPlan.publicFeatures.map((feature) => (
              <span key={feature}>{feature}</span>
            ))}
          </div>
        </article>

        <article>
          <h2>Navidrome architecture</h2>
          <div className="stack-groups">
            {musicPlan.privateArchitecture.map((item) => (
              <div key={item}>
                <strong>Plan</strong>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </article>

        <article>
          <h2>First public modules</h2>
          <div className="music-modules">
            <div>
              <span>Now playing</span>
              <strong>Waiting for signal</strong>
            </div>
            <div>
              <span>Mood</span>
              <strong>Focus / night / build</strong>
            </div>
            <div>
              <span>Private room</span>
              <strong>music.lattelix.ru later</strong>
            </div>
          </div>
        </article>

        <article>
          <h2>Release plan</h2>
          <div className="music-modules">
            {musicPlan.releasePlan.map((phase) => (
              <div key={phase.title}>
                <span>{phase.status}</span>
                <strong>{phase.title}</strong>
                <p>{phase.description}</p>
              </div>
            ))}
          </div>
        </article>

        <article>
          <h2>Automation ideas</h2>
          <div className="skill-list">
            {musicPlan.automationIdeas.map((idea) => (
              <span key={idea}>{idea}</span>
            ))}
          </div>
        </article>
      </section>
    </RoutePage>
  )
}
