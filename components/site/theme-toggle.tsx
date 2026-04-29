'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

const modes = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
]

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  )

  if (!mounted) {
    return <div className="theme-toggle" aria-hidden="true" />
  }

  return (
    <div className="theme-toggle" role="group" aria-label="Theme">
      {modes.map((mode) => {
        const Icon = mode.icon
        const active = theme === mode.value

        return (
          <button
            aria-label={`${mode.label} theme`}
            className="theme-toggle__button"
            data-active={active}
            key={mode.value}
            onClick={() => setTheme(mode.value)}
            type="button"
          >
            <Icon aria-hidden="true" size={16} strokeWidth={1.8} />
          </button>
        )
      })}
    </div>
  )
}
