'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, Heart, ShoppingCart, User, Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border dark:bg-dark-background/90 dark:border-dark-border">
      <div className="container-padding">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="text-xl sm:text-2xl font-bold text-accent hover:text-accent/80 transition-colors">
            Ziggler
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/catalog" className="text-text-primary dark:text-dark-text-primary hover:text-accent transition-colors">
              Каталог
            </Link>
            <Link href="/collections" className="text-text-primary dark:text-dark-text-primary hover:text-accent transition-colors">
              Коллекции
            </Link>
            <Link href="/about" className="text-text-primary dark:text-dark-text-primary hover:text-accent transition-colors">
              О нас
            </Link>
            <Link href="/blog" className="text-text-primary dark:text-dark-text-primary hover:text-accent transition-colors">
              Блог
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Поиск костюмов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-accent transition-colors"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </Button>

            {/* Favorites */}
            <Link href="/favorites" className="relative p-2 hover:bg-surface dark:hover:bg-dark-surface rounded-md transition-colors">
              <Heart size={20} className="text-text-secondary dark:text-dark-text-secondary hover:text-accent" />
              <Badge variant="accent" className="absolute -top-1 -right-1 text-xs">
                0
              </Badge>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 hover:bg-surface dark:hover:bg-dark-surface rounded-md transition-colors">
              <ShoppingCart size={20} className="text-text-secondary dark:text-dark-text-secondary hover:text-accent" />
              <Badge variant="accent" className="absolute -top-1 -right-1 text-xs">
                0
              </Badge>
            </Link>

            {/* User Account */}
            <Link href="/account" className="p-2 hover:bg-surface dark:hover:bg-dark-surface rounded-md transition-colors">
              <User size={20} className="text-text-secondary dark:text-dark-text-secondary hover:text-accent" />
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border dark:border-dark-border mt-4 pt-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/catalog"
                className="text-text-primary dark:text-dark-text-primary hover:text-accent transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Каталог
              </Link>
              <Link
                href="/collections"
                className="text-text-primary dark:text-dark-text-primary hover:text-accent transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Коллекции
              </Link>
              <Link
                href="/about"
                className="text-text-primary dark:text-dark-text-primary hover:text-accent transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                О нас
              </Link>
              <Link
                href="/blog"
                className="text-text-primary dark:text-dark-text-primary hover:text-accent transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Блог
              </Link>

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="py-2">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Поиск костюмов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-accent transition-colors"
                  >
                    <Search size={20} />
                  </button>
                </div>
              </form>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
