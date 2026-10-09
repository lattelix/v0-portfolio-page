'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

/**
 * Show this notice only when a visitor follows a redirect from lattelix.ru.
 * It remains hidden for direct .com traffic and can be dismissed.
 */
export function LegacyDomainNotice() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    if (query.get('from') === 'ru') {
      setVisible(true)
    }
  }, [])

  if (!visible) return null

  return (
    <aside className="legacy-domain-notice" role="status" aria-label="Domain migration notice">
      <div className="legacy-domain-notice-content">
        <span aria-hidden="true" className="legacy-domain-notice-pulse" />
        <p>
          <strong>We have moved to lattelix.com.</strong>{' '}
          You arrived from lattelix.ru, which will eventually expire. Please update your bookmarks.
        </p>
      </div>
      <button
        aria-label="Dismiss domain notice"
        className="legacy-domain-notice-close"
        onClick={() => setVisible(false)}
        type="button"
      >
        <X size={18} aria-hidden="true" />
      </button>
    </aside>
  )
}
