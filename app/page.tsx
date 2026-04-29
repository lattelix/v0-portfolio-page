import Link from 'next/link'
import { ArrowUpRight, Cpu, ExternalLink, Github, Globe2, Mail } from 'lucide-react'

import { LivingScene } from '@/components/site/living-scene'
import {
  experience,
  focusAreas,
  games,
  navItems,
  posts,
  projects,
  site,
  socials,
  systemLinks,
} from '@/content/site'
import { getGitHubSignal } from '@/lib/github'

export default async function Page() {
  const githubSignal = await getGitHubSignal()

  return (
    <main>
      <section className="home-hero">
        <LivingScene />

        <div className="hero-content">
          <div className="hero-copy">
            <h1>{site.name}</h1>
            <p>{site.summary}</p>
            <div className="hero-actions" aria-label="Primary actions">
              <Link className="primary-action" href="/works">
                Explore work
                <ArrowUpRight aria-hidden="true" size={18} />
              </Link>
              <Link className="secondary-action" href="/cv">
                Open CV
                <ExternalLink aria-hidden="true" size={17} />
              </Link>
            </div>
          </div>

          <div className="hero-map" aria-label="Site sections">
            {navItems.map((item, index) => {
              const Icon = item.icon

              return (
                <Link className="hero-map__item" href={item.href} key={item.href}>
                  <span>0{index + 1}</span>
                  <Icon aria-hidden="true" size={22} strokeWidth={1.6} />
                  <strong>{item.label}</strong>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="hero-dock" aria-label="Live signals">
          <div>
            <Github aria-hidden="true" size={18} />
            <span>
              <strong>{githubSignal?.publicRepos ?? 'GitHub'}</strong>{' '}
              {githubSignal ? 'public repos' : 'profile'}
            </span>
          </div>
          <div>
            <Mail aria-hidden="true" size={18} />
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div>
            <Globe2 aria-hidden="true" size={18} />
            <span>
              <strong>{githubSignal ? githubSignal.latestPush : site.domain}</strong>{' '}
              {githubSignal ? 'latest GitHub push' : 'production domain'}
            </span>
          </div>
        </div>
      </section>

      <section className="content-band intro-band">
        <div className="section-heading">
          <p>Personal operating surface</p>
          <h2>A public field for work, writing, tools and playable experiments.</h2>
        </div>
        <div className="focus-cloud">
          {focusAreas.map((area) => (
            <span key={area}>{area}</span>
          ))}
        </div>
      </section>

      <section className="content-band work-band">
        <div className="section-heading">
          <p>Selected work</p>
          <h2>Projects with interface depth, practical architecture and a bias for polish.</h2>
        </div>
        <div className="work-grid">
          {projects.map((project) => (
            <Link className="work-card" href={project.href} key={project.slug}>
              <span>{project.type}</span>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div>
                {project.stack.slice(0, 4).map((item) => (
                  <small key={item}>{item}</small>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="content-band split-band">
        <div>
          <div className="section-heading">
            <p>Experience</p>
            <h2>Production habits from product, data and systems work.</h2>
          </div>
          <div className="timeline">
            {experience.map((item) => (
              <article className="timeline-item" key={item.company}>
                <span>{item.period}</span>
                <h3>{item.company}</h3>
                <strong>{item.role}</strong>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="system-panel" aria-label="Infrastructure plan">
          <Cpu aria-hidden="true" size={28} />
          <h2>GitHub to Vercel. DNS on Cloudflare. Private tools later.</h2>
          <div className="system-list">
            {systemLinks.map((item) => {
              const Icon = item.icon

              return (
                <div key={item.label}>
                  <Icon aria-hidden="true" size={17} />
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              )
            })}
          </div>
        </aside>
      </section>

      <section className="content-band media-band">
        <div className="section-heading">
          <p>Writing and games</p>
          <h2>The site stays alive through notes, prototypes and experiments.</h2>
        </div>
        <div className="media-columns">
          <div>
            {posts.map((post) => (
              <Link className="list-link" href="/posts" key={post.slug}>
                <span>{post.readTime}</span>
                <strong>{post.title}</strong>
                <p>{post.description}</p>
              </Link>
            ))}
          </div>
          <div>
            {games.map((game) => (
              <Link className="list-link" href="/games" key={game.slug}>
                <span>{game.status}</span>
                <strong>{game.title}</strong>
                <p>{game.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <h2>Build the next surface.</h2>
          <p>Open for product interfaces, frontend systems, data-heavy tools and experimental web work.</p>
        </div>
        <div className="footer-links">
          <a href={`mailto:${site.email}`}>
            <Mail aria-hidden="true" size={18} />
            Email
          </a>
          {socials.map((social) => {
            const Icon = social.icon

            return (
              <a href={social.href} key={social.label} rel="noreferrer" target="_blank">
                <Icon aria-hidden="true" size={18} />
                {social.label}
              </a>
            )
          })}
        </div>
      </footer>
    </main>
  );
}
