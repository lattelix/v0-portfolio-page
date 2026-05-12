import Link from 'next/link'

import { RoutePage } from '@/components/site/route-page'
import { games, site } from '@/content/site'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  description: `Game prototypes and playable experiments by ${site.name}.`,
  path: '/games',
  title: 'Games',
})

export default function GamesPage() {
  return (
    <RoutePage
      description="A launchpad for playable experiments, tiny game prototypes and interaction studies."
      eyebrow="Playground"
      title="Games"
    >
      <section className="route-section route-grid">
        {games.map((game) => (
          <Link className="route-card" href={game.href} key={game.slug}>
            <span>{game.status}</span>
            <h2>{game.title}</h2>
            <p>{game.description}</p>
            <div>
              {game.stack.map((item) => (
                <small key={item}>{item}</small>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </RoutePage>
  )
}
