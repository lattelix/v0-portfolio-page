import { site } from '@/content/site'

type GitHubUser = {
  followers: number
  public_repos: number
}

type GitHubRepo = {
  archived: boolean
  description: string | null
  fork: boolean
  html_url: string
  language: string | null
  name: string
  pushed_at: string | null
  stargazers_count: number
}

export type GitHubRepoSignal = {
  description: string
  language: string
  name: string
  pushedAt: string
  stars: number
  url: string
}

export type GitHubSignal = {
  activeRepos: number
  followers: number
  latestRepo: GitHubRepoSignal | null
  latestPush: string
  publicRepos: number
  stars: number
  topRepo: GitHubRepoSignal | null
}

const githubHeaders = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'lattelix.ru',
}

function formatDate(value: string | null) {
  if (!value) {
    return 'recently'
  }

  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
  }).format(new Date(value))
}

function toRepoSignal(repo: GitHubRepo | undefined): GitHubRepoSignal | null {
  if (!repo) {
    return null
  }

  return {
    description: repo.description ?? 'Public repository',
    language: repo.language ?? 'Code',
    name: repo.name,
    pushedAt: formatDate(repo.pushed_at),
    stars: repo.stargazers_count,
    url: repo.html_url,
  }
}

export async function getGitHubSignal(): Promise<GitHubSignal | null> {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${site.githubUsername}`, {
        headers: githubHeaders,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${site.githubUsername}/repos?per_page=100&sort=pushed`, {
        headers: githubHeaders,
        next: { revalidate: 3600 },
      }),
    ])

    if (!userResponse.ok || !reposResponse.ok) {
      return null
    }

    const user = (await userResponse.json()) as GitHubUser
    const repos = (await reposResponse.json()) as GitHubRepo[]
    const ownRepos = repos.filter((repo) => !repo.fork && !repo.archived)
    const latestRepo = ownRepos.find((repo) => repo.pushed_at)
    const topRepo = [...ownRepos].sort((a, b) => b.stargazers_count - a.stargazers_count)[0]

    return {
      activeRepos: ownRepos.length,
      followers: user.followers,
      latestRepo: toRepoSignal(latestRepo),
      latestPush: formatDate(latestRepo?.pushed_at ?? null),
      publicRepos: user.public_repos,
      stars: ownRepos.reduce((total, repo) => total + repo.stargazers_count, 0),
      topRepo: toRepoSignal(topRepo),
    }
  } catch {
    return null
  }
}
