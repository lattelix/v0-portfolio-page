import type { Metadata, Viewport } from 'next'

import { ThemeProvider } from '@/components/theme-provider'
import { SiteHeader } from '@/components/site/site-header'
import { site } from '@/content/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://lattelix.ru'),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: site.title,
    description: site.description,
    siteName: site.name,
    url: 'https://lattelix.ru',
    type: 'website',
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
          <SiteHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
