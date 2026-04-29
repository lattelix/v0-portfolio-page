import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

type RoutePageProps = {
  eyebrow: string
  title: string
  description: string
  children: React.ReactNode
}

export function RoutePage({ eyebrow, title, description, children }: RoutePageProps) {
  return (
    <main className="route-page">
      <section className="route-hero">
        <Link className="back-link" href="/">
          <ArrowUpRight aria-hidden="true" size={18} />
          Home
        </Link>
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        <span>{description}</span>
      </section>
      {children}
    </main>
  )
}
