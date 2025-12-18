'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart, Trash2, Grid3X3, List } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

// Mock favorites data - in real app this would come from API/context
const mockFavorites = [
  {
    id: 1,
    name: 'Классический костюм Ermenegildo Zegna',
    price: 185000,
    originalPrice: 220000,
    discount: 16,
    rating: 4.8,
    reviewCount: 24,
    image: 'https://images.unsplash.com/photo-1596702830007-710127761797?w=300&h=400&fit=crop',
    brand: 'Ermenegildo Zegna',
    category: 'classic',
    inStock: true,
    addedDate: '2025-01-15'
  },
  {
    id: 2,
    name: 'Slim Fit костюм Hugo Boss',
    price: 125000,
    rating: 4.6,
    reviewCount: 18,
    image: 'https://images.unsplash.com/photo-1555069519-127aadedf1f3?w=300&h=400&fit=crop',
    brand: 'Hugo Boss',
    category: 'slim',
    inStock: true,
    addedDate: '2025-01-10'
  },
  {
    id: 3,
    name: 'Праздничный костюм Brioni',
    price: 250000,
    rating: 4.9,
    reviewCount: 30,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=400&fit=crop',
    brand: 'Brioni',
    category: 'festive',
    inStock: false,
    addedDate: '2025-01-08'
  }
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(mockFavorites)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const removeFromFavorites = (id: number) => {
    setFavorites(items => items.filter(item => item.id !== id))
  }

  const clearAllFavorites = () => {
    setFavorites([])
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-background dark:bg-dark-background">
        <div className="container-padding py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-surface dark:bg-dark-surface rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-text-secondary dark:text-dark-text-secondary" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
              Список избранного пуст
            </h1>
            <p className="text-text-secondary dark:text-dark-text-secondary mb-8">
              Добавляйте товары в избранное, чтобы быстро найти их позже
            </p>
            <Link href="/catalog">
              <Button size="lg">
                Посмотреть каталог
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      <div className="container-padding py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
              Избранные товары
            </h1>
            <p className="text-text-secondary dark:text-dark-text-secondary">
              {favorites.length} {favorites.length === 1 ? 'товар' : favorites.length < 5 ? 'товара' : 'товаров'}
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            {/* View Mode Toggle */}
            <div className="flex rounded-md border border-border dark:border-dark-border overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-none"
              >
                <Grid3X3 size={18} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-none"
              >
                <List size={18} />
              </Button>
            </div>

            <Button onClick={clearAllFavorites} variant="outline" className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
              <Trash2 className="w-4 h-4 mr-2" />
              Очистить все
            </Button>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className={`grid gap-6 ${
          viewMode === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1'
        }`}>
          {favorites.map(product => (
            <Card key={product.id} className={`card-hover group overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}>
              <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-[3/4]'}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.discount && (
                  <Badge className="absolute top-3 left-3 bg-red-500">
                    -{product.discount}%
                  </Badge>
                )}
                {!product.inStock && (
                  <Badge className="absolute top-3 right-3 bg-gray-500">
                    Нет в наличии
                  </Badge>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                {/* Favorite Button */}
                <button
                  onClick={() => removeFromFavorites(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>

                {/* Action Buttons */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-2">
                    <Link href={`/product/${product.id}`} className="flex-1">
                      <Button size="sm" className="w-full">
                        Посмотреть
                      </Button>
                    </Link>
                    <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="text-xs text-text-secondary dark:text-dark-text-secondary mb-1">
                  {product.brand}
                </div>
                <h3 className="font-medium text-text-primary dark:text-dark-text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-accent">
                    {product.price.toLocaleString()} ₸
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-text-secondary dark:text-dark-text-secondary line-through">
                      {product.originalPrice.toLocaleString()} ₸
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating)
                            ? 'bg-yellow-400'
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>

                <div className="text-xs text-text-secondary dark:text-dark-text-secondary">
                  Добавлено: {new Date(product.addedDate).toLocaleDateString('ru-RU')}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="mt-12 text-center">
          <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
            Хотите добавить еще товаров в избранное?
          </p>
          <Link href="/catalog">
            <Button size="lg">
              Посмотреть каталог
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
