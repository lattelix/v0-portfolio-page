'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

import { navItems, site } from '@/content/site'
import { ThemeToggle } from '@/components/site/theme-toggle'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <Link aria-label="Lattelix home" className="brand-lockup" href="/">
        <span className="brand-mark">LX</span>
        <span>{site.domain}</span>
      </Link>

      <nav aria-label="Primary navigation" className="desktop-nav">
        {navItems.map((item) => {
          const active = pathname === item.href

          return (
            <Link aria-current={active ? 'page' : undefined} href={item.href} key={item.href}>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="header-actions">
        <ThemeToggle />
        <button
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="mobile-menu-button"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {open ? (
        <nav aria-label="Mobile navigation" className="mobile-nav">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>
                <Icon aria-hidden="true" size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      ) : null}
    </header>
  )
}
