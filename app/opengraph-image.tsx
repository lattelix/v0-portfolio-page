import { ImageResponse } from 'next/og'

import { site } from '@/content/site'

export const alt = site.title
export const contentType = 'image/png'
export const runtime = 'edge'
export const size = {
  height: 630,
  width: 1200,
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            'radial-gradient(circle at 78% 18%, rgba(255, 184, 107, 0.36), transparent 30%), linear-gradient(135deg, #f6ffe9 0%, #badfc2 42%, #071113 100%)',
          color: '#f9ffef',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          padding: 64,
          width: '100%',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            fontSize: 30,
            gap: 18,
          }}
        >
          <div
            style={{
              alignItems: 'center',
              background: '#071113',
              borderRadius: 16,
              color: '#f9ffef',
              display: 'flex',
              fontSize: 34,
              fontWeight: 800,
              height: 72,
              justifyContent: 'center',
              width: 72,
            }}
          >
            LX
          </div>
          <span>{site.domain}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 820 }}>
          <div style={{ color: '#071113', fontSize: 92, fontWeight: 900, lineHeight: 0.92 }}>
            {site.name}
          </div>
          <div style={{ color: '#102a26', fontSize: 34, lineHeight: 1.24 }}>{site.description}</div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(249, 255, 239, 0.5)',
            color: '#f9ffef',
            display: 'flex',
            fontSize: 26,
            justifyContent: 'space-between',
            paddingTop: 24,
          }}
        >
          <span>CV / Works / Posts / Games</span>
          <span>{site.email}</span>
        </div>
      </div>
    ),
    size,
  )
}
