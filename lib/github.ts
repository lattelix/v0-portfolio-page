import { site } from '@/content/site'

type GitHubUser = {
  followers: number
  public_repos: number
}

type GitHubRepo = {
  archived: boolean
  fork: boolean
  pushed_at: string | null
  stargazers_count: number
}

export type GitHubSignal = {
  latestPush: string
  publicRepos: number
  stars: number
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
    const latestPush = ownRepos.find((repo) => repo.pushed_at)?.pushed_at ?? null

    return {
      latestPush: formatDate(latestPush),
      publicRepos: user.public_repos,
      stars: ownRepos.reduce((total, repo) => total + repo.stargazers_count, 0),
    }
  } catch {
    return null
  }
}
