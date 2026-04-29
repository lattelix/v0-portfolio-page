import type { Metadata } from 'next'

import { RoutePage } from '@/components/site/route-page'
import { games, site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Games',
  description: `Game prototypes and playable experiments by ${site.name}.`,
}

export default function GamesPage() {
  return (
    <RoutePage
      description="A launchpad for playable experiments, tiny game prototypes and interaction studies."
      eyebrow="Playground"
      title="Games"
    >
      <section className="route-section route-grid">
        {games.map((game) => (
          <article className="route-card" key={game.slug}>
            <span>{game.status}</span>
            <h2>{game.title}</h2>
            <p>{game.description}</p>
            <div>
              {game.stack.map((item) => (
                <small key={item}>{item}</small>
              ))}
            </div>
          </article>
        ))}
      </section>
    </RoutePage>
  )
}
