'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Filter, SlidersHorizontal, Grid3X3, List, Heart, ShoppingCart, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

// Mock data for products
const products = [
  {
    id: 1,
    name: 'Классический костюм Ermenegildo Zegna',
    price: 185000,
    originalPrice: 220000,
    discount: 16,
    rating: 4.8,
    reviewCount: 24,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop',
    category: 'classic',
    material: 'Шерсть 100%',
    color: 'Темно-синий',
    size: '48R',
    inStock: true,
    isNew: true,
    brand: 'Ermenegildo Zegna'
  },
  {
    id: 2,
    name: 'Slim Fit костюм Hugo Boss',
    price: 125000,
    rating: 4.6,
    reviewCount: 18,
    image: 'https://images.unsplash.com/photo-1555069519-127aadedf1f3?w=600&h=800&fit=crop',
    category: 'slim',
    material: 'Шерсть + эластан',
    color: 'Черный',
    size: '46S',
    inStock: true,
    brand: 'Hugo Boss'
  },
  {
    id: 3,
    name: 'Повседневный костюм Canali',
    price: 95000,
    rating: 4.4,
    reviewCount: 12,
    image: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?w=600&h=800&fit=crop',
    category: 'casual',
    material: 'Хлопок + шерсть',
    color: 'Серый',
    size: '50R',
    inStock: true,
    brand: 'Canali'
  },
  {
    id: 4,
    name: 'Свадебный костюм Brioni',
    price: 280000,
    rating: 4.9,
    reviewCount: 8,
    image: 'https://images.unsplash.com/photo-1506629905607-997823df6e2e?w=600&h=800&fit=crop',
    category: 'festive',
    material: 'Шерсть Super 150s',
    color: 'Черный',
    size: '48L',
    inStock: true,
    isNew: true,
    brand: 'Brioni'
  },
  {
    id: 5,
    name: 'Бизнес костюм Kiton',
    price: 195000,
    originalPrice: 230000,
    discount: 15,
    rating: 4.7,
    reviewCount: 15,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=800&fit=crop',
    category: 'classic',
    material: 'Шерсть Super 120s',
    color: 'Синий',
    size: '50R',
    inStock: true,
    brand: 'Kiton'
  },
  {
    id: 6,
    name: 'Легкий костюм Loro Piana',
    price: 165000,
    rating: 4.5,
    reviewCount: 9,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop',
    category: 'casual',
    material: 'Кашемир + шерсть',
    color: 'Бежевый',
    size: '46R',
    inStock: true,
    brand: 'Loro Piana'
  }
]

const categories = [
  { id: 'all', name: 'Все', count: products.length },
  { id: 'classic', name: 'Классические', count: products.filter(p => p.category === 'classic').length },
  { id: 'slim', name: 'Slim Fit', count: products.filter(p => p.category === 'slim').length },
  { id: 'casual', name: 'Casual', count: products.filter(p => p.category === 'casual').length },
  { id: 'festive', name: 'Праздничные', count: products.filter(p => p.category === 'festive').length },
]

const sizes = ['44R', '46R', '48R', '50R', '52R', '44S', '46S', '48S', '50S', '52S']
const colors = ['Черный', 'Темно-синий', 'Серый', 'Бежевый', 'Синий', 'Коричневый']
const priceRanges = [
  { label: 'До 50,000 ₸', min: 0, max: 50000 },
  { label: '50,000 - 100,000 ₸', min: 50000, max: 100000 },
  { label: '100,000 - 150,000 ₸', min: 100000, max: 150000 },
  { label: '150,000 - 200,000 ₸', min: 150000, max: 200000 },
  { label: 'Более 200,000 ₸', min: 200000, max: 999999 },
]

export default function CatalogPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'
  const initialSearch = searchParams.get('search') || ''

  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [sortBy, setSortBy] = useState('popular')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(null)

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(product.size)
    const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color)
    const matchesPrice = !selectedPriceRange ||
      (product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max)

    return matchesCategory && matchesSearch && matchesSize && matchesColor && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return b.isNew ? 1 : -1
      default:
        return b.rating - a.rating
    }
  })

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    )
  }

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    )
  }

  const clearFilters = () => {
    setSelectedSizes([])
    setSelectedColors([])
    setSelectedPriceRange(null)
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      {/* Header */}
      <div className="border-b border-border bg-surface/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container-padding">
          <div className="py-4">
            {/* Breadcrumb */}
            <nav className="text-sm text-text-secondary mb-4">
              <Link href="/" className="hover:text-accent">Главная</Link>
              <span className="mx-2">/</span>
              <span className="text-text-primary">Каталог</span>
              {selectedCategory !== 'all' && (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-text-primary">
                    {categories.find(c => c.id === selectedCategory)?.name}
                  </span>
                </>
              )}
            </nav>

            {/* Title and Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
                  {selectedCategory === 'all' ? 'Каталог костюмов' :
                   categories.find(c => c.id === selectedCategory)?.name}
                </h1>
                <p className="text-text-secondary mt-1">
                  {sortedProducts.length} {sortedProducts.length === 1 ? 'товар' :
                    sortedProducts.length < 5 ? 'товара' : 'товаров'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* View Mode */}
                <div className="flex border border-border rounded-md">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-accent text-primary' : 'text-text-secondary hover:text-text-primary'}`}
                  >
                    <Grid3X3 size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-accent text-primary' : 'text-text-secondary hover:text-text-primary'}`}
                  >
                    <List size={18} />
                  </button>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-text-primary"
                >
                  <option value="popular">По популярности</option>
                  <option value="price-low">Сначала дешевые</option>
                  <option value="price-high">Сначала дорогие</option>
                  <option value="rating">По рейтингу</option>
                  <option value="newest">Сначала новые</option>
                </select>

                {/* Filter Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal size={18} className="mr-2" />
                  Фильтры
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-padding py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className={`w-full lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {/* Categories */}
            <div className="bg-surface/95 dark:bg-dark-surface/90 backdrop-blur-sm p-6 rounded-lg border border-border/50 dark:border-dark-border/30">
              <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-4">Категории</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-accent text-primary'
                        : 'hover:bg-surface/50 dark:hover:bg-dark-surface/50 text-text-primary dark:text-dark-text-primary'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span>{category.name}</span>
                      <span className="text-text-secondary dark:text-dark-text-secondary">({category.count})</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-surface/95 dark:bg-dark-surface/90 backdrop-blur-sm p-6 rounded-lg border border-border/50 dark:border-dark-border/30">
              <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-4">Цена</h3>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <button
                    key={range.label}
                    onClick={() => setSelectedPriceRange(
                      selectedPriceRange?.min === range.min ? null : range
                    )}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedPriceRange?.min === range.min
                        ? 'bg-accent text-primary'
                        : 'hover:bg-surface/50 dark:hover:bg-dark-surface/50 text-text-primary dark:text-dark-text-primary'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="bg-surface/95 dark:bg-dark-surface/90 backdrop-blur-sm p-6 rounded-lg border border-border/50 dark:border-dark-border/30">
              <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-4">Размер</h3>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => handleSizeToggle(size)}
                    className={`px-3 py-2 text-sm rounded-md transition-colors ${
                      selectedSizes.includes(size)
                        ? 'bg-accent text-primary'
                        : 'bg-background dark:bg-dark-background text-text-primary dark:text-dark-text-primary hover:bg-surface/50 dark:hover:bg-dark-surface/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="bg-surface/95 dark:bg-dark-surface/90 backdrop-blur-sm p-6 rounded-lg border border-border/50 dark:border-dark-border/30">
              <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-4">Цвет</h3>
              <div className="grid grid-cols-2 gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => handleColorToggle(color)}
                    className={`px-3 py-2 text-sm rounded-md transition-colors ${
                      selectedColors.includes(color)
                        ? 'bg-accent text-primary'
                        : 'bg-background dark:bg-dark-background text-text-primary dark:text-dark-text-primary hover:bg-surface/50 dark:hover:bg-dark-surface/50'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedSizes.length > 0 || selectedColors.length > 0 || selectedPriceRange) && (
              <div className="bg-surface/95 dark:bg-dark-surface/90 backdrop-blur-sm p-6 rounded-lg border border-border/50 dark:border-dark-border/30">
                <Button onClick={clearFilters} variant="ghost" className="w-full text-text-primary dark:text-dark-text-primary">
                  Очистить фильтры
                </Button>
              </div>
            )}
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Товары не найдены
                </h3>
                <p className="text-text-secondary mb-6">
                  Попробуйте изменить параметры поиска или фильтры
                </p>
                <Button onClick={clearFilters}>Показать все товары</Button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              }`}>
                {sortedProducts.map(product => (
                  <Link key={product.id} href={`/product/${product.id}`}>
                    <Card className="card-hover group overflow-hidden bg-surface/95 dark:bg-dark-surface/90 backdrop-blur-sm border-border dark:border-dark-border/50">
                      <div className="relative aspect-[3/4] overflow-hidden">
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
                        {product.isNew && (
                          <Badge className="absolute top-3 right-3 bg-green-500">
                            Новинка
                          </Badge>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                          <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-1">
                              <Star size={14} className="fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{product.rating}</span>
                              <span className="text-xs text-white/70">({product.reviewCount})</span>
                            </div>
                            <div className="flex gap-2">
                              <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                                <Heart size={16} />
                              </button>
                              <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                                <ShoppingCart size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-surface dark:bg-dark-surface">
                        <div className="text-xs text-text-secondary dark:text-dark-text-secondary mb-1">{product.brand}</div>
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
                        <div className="text-xs text-text-secondary dark:text-dark-text-secondary space-y-1">
                          <div>Размер: {product.size}</div>
                          <div>Цвет: {product.color}</div>
                          <div>Материал: {product.material}</div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
