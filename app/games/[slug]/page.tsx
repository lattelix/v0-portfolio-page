import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RoutePage } from '@/components/site/route-page'
import { games } from '@/content/site'
import { ForestSignalGame } from '@/components/games/forest-signal/forest-signal-game'

type GamePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }))
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { slug } = await params
  const game = games.find((item) => item.slug === slug)

  if (!game) {
    return {}
  }

  return {
    title: game.title,
    description: game.description,
  }
}

export default async function GameDetailPage({ params }: GamePageProps) {
  const { slug } = await params
  const game = games.find((item) => item.slug === slug)

  if (!game) {
    notFound()
  }

  return (
    <RoutePage description={game.description} eyebrow={game.status} title={game.title}>
      <section className="route-section detail-layout">
        <article className="detail-lead">
          <span>Objective</span>
          <h2>{game.objective}</h2>
          <div className="skill-list">
            {game.controls.map((control) => (
              <span key={control}>{control}</span>
            ))}
          </div>
        </article>

        {game.slug === 'forest-signal' ? (
          <ForestSignalGame />
        ) : (
          <article>
            <h2>Prototype status</h2>
            <p>This concept is staged for a later playable build.</p>
          </article>
        )}
      </section>
    </RoutePage>
  )
}
