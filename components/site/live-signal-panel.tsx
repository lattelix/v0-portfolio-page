import Link from 'next/link'
import { Activity, Code2, Github, Mail, Palette, Radio, Sparkles, Star, Users } from 'lucide-react'

import { availability, currentFocus, site, systemLinks } from '@/content/site'
import type { GitHubSignal } from '@/lib/github'

type LiveSignalPanelProps = {
  githubSignal: GitHubSignal | null
}

export function LiveSignalPanel({ githubSignal }: LiveSignalPanelProps) {
  const latestRepo = githubSignal?.latestRepo
  const topRepo = githubSignal?.topRepo

  return (
    <aside className="signal-panel" aria-label="Live public signal">
      <div className="signal-panel__header">
        <Radio aria-hidden="true" size={28} />
        <p>Live signal</p>
        <h2>Useful public state instead of decorative badges.</h2>
      </div>

      <div className="signal-metrics">
        <a href={`https://github.com/${site.githubUsername}`} rel="noreferrer" target="_blank">
          <Github aria-hidden="true" size={18} />
          <span>Public repos</span>
          <strong>{githubSignal?.publicRepos ?? 'GitHub'}</strong>
        </a>
        <a href={`https://github.com/${site.githubUsername}`} rel="noreferrer" target="_blank">
          <Activity aria-hidden="true" size={18} />
          <span>Active own repos</span>
          <strong>{githubSignal?.activeRepos ?? 'Live'}</strong>
        </a>
        <a href={`https://github.com/${site.githubUsername}`} rel="noreferrer" target="_blank">
          <Star aria-hidden="true" size={18} />
          <span>Repo stars</span>
          <strong>{githubSignal?.stars ?? 'Signal'}</strong>
        </a>
        <a href={`https://github.com/${site.githubUsername}`} rel="noreferrer" target="_blank">
          <Users aria-hidden="true" size={18} />
          <span>Followers</span>
          <strong>{githubSignal?.followers ?? 'Profile'}</strong>
        </a>
      </div>

      <a
        className="featured-repo"
        href={latestRepo?.url ?? `https://github.com/${site.githubUsername}`}
        rel="noreferrer"
        target="_blank"
      >
        <span>{latestRepo ? `Latest push / ${latestRepo.pushedAt}` : 'Latest push'}</span>
        <strong>{latestRepo?.name ?? 'GitHub profile'}</strong>
        <p>{latestRepo?.description ?? 'Live GitHub data will appear here when the API responds.'}</p>
      </a>

      <div className="focus-list">
        <div>
          <span>{availability.label}</span>
          <strong>{availability.status}</strong>
          <p>{availability.detail}</p>
        </div>
        {currentFocus.slice(0, 3).map((item) => (
          <div key={item}>
            <span>Focus</span>
            <p>{item}</p>
          </div>
        ))}
      </div>

      <div className="system-list compact-system-list">
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
        <Link href="/music">
          <Sparkles aria-hidden="true" size={17} />
          <span>Music</span>
          <strong>Public room</strong>
        </Link>
        <Link href="/designs">
          <Palette aria-hidden="true" size={17} />
          <span>Design lab</span>
          <strong>Noindex</strong>
        </Link>
        <a href={`mailto:${site.email}`}>
          <Mail aria-hidden="true" size={17} />
          <span>Email</span>
          <strong>{site.email}</strong>
        </a>
      </div>

      {topRepo ? (
        <a className="top-repo-link" href={topRepo.url} rel="noreferrer" target="_blank">
          <Code2 aria-hidden="true" size={17} />
          <span>Top public repo</span>
          <strong>{topRepo.name}</strong>
        </a>
      ) : null}
    </aside>
  )
}
