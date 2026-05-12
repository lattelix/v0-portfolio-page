import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { ThemeProvider } from '@/components/theme-provider'
import { SiteHeader } from '@/components/site/site-header'
import { StructuredData } from '@/components/site/structured-data'
import { site } from '@/content/site'
import './globals.css'

export const metadata: Metadata = {
  applicationName: site.name,
  authors: [{ name: site.name, url: `https://${site.domain}` }],
  category: 'technology',
  creator: site.name,
  keywords: [
    'Lattelix',
    'frontend engineer',
    'full-stack engineer',
    'Next.js',
    'React',
    'data interfaces',
    'personal infrastructure',
  ],
  metadataBase: new URL('https://lattelix.ru'),
  referrer: 'origin-when-cross-origin',
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    images: [
      {
        alt: site.title,
        height: 630,
        url: '/opengraph-image',
        width: 1200,
      },
    ],
    siteName: site.name,
    url: 'https://lattelix.ru',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    description: site.description,
    images: ['/opengraph-image'],
    title: site.title,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f7ed' },
    { media: '(prefers-color-scheme: dark)', color: '#070b0c' },
  ],
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <StructuredData />
          <SiteHeader />
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
