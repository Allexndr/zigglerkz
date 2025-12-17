import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '../styles/globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { QueryProvider } from '@/components/providers/QueryProvider'
import { Toaster } from '@/components/ui/Toaster'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Ziggler.kz - Премиум костюмы для мужчин',
  description: 'Эксклюзивная коллекция мужских костюмов. Качество, стиль и комфорт в каждой детали.',
  keywords: 'костюмы, мужская одежда, премиум, Алматы, Казахстан',
  authors: [{ name: 'Ziggler.kz' }],
  creator: 'Ziggler.kz',
  publisher: 'Ziggler.kz',
  robots: 'index, follow',
  openGraph: {
    title: 'Ziggler.kz - Премиум костюмы для мужчин',
    description: 'Эксклюзивная коллекция мужских костюмов. Качество, стиль и комфорт.',
    url: 'https://ziggler.kz',
    siteName: 'Ziggler.kz',
    locale: 'ru_KZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ziggler.kz - Премиум костюмы для мужчин',
    description: 'Эксклюзивная коллекция мужских костюмов. Качество, стиль и комфорт.',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#D4AF37',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background text-text-primary dark:bg-dark-background dark:text-dark-text-primary">
        <QueryProvider>
          <ThemeProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
