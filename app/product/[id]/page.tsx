'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Heart, Share2, ShoppingCart, Star, Truck, Shield, RotateCcw, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { useTheme } from '@/components/providers/ThemeProvider'

// Mock product data - in real app this would come from API
const getProductById = (id: string) => {
  const products = [
    {
      id: 1,
      name: 'Классический костюм Ermenegildo Zegna',
      price: 185000,
      originalPrice: 220000,
      discount: 16,
      rating: 4.8,
      reviewCount: 24,
      images: [
        'https://images.unsplash.com/photo-1596702830007-710127761797?w=800&h=1000&fit=crop',
        'https://images.unsplash.com/photo-1555069519-127aadedf1f3?w=800&h=1000&fit=crop',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop',
      ],
      category: 'classic',
      brand: 'Ermenegildo Zegna',
      material: 'Шерсть 100%',
      color: 'Темно-синий',
      size: '48R',
      description: 'Роскошный классический костюм от итальянского бренда Ermenegildo Zegna. Выполнен из высококачественной шерсти премиум класса. Идеально подходит для деловых встреч и торжественных мероприятий.',
      features: [
        'Шерсть 100% Super 150',
        'Итальянская ткань',
        'Ручная работа',
        'Полная подкладка',
        'Двойные швы',
        'Регулируемые манжеты'
      ],
      sizes: ['46S', '48R', '50L', '52XL'],
      colors: [
        { name: 'Темно-синий', hex: '#1e3a8a', emoji: '🔵' },
        { name: 'Серый', hex: '#6b7280', emoji: '⚪' },
        { name: 'Черный', hex: '#000000', emoji: '⚫' }
      ],
      inStock: true,
      care: 'Сухая чистка. Не стирать. Не отбеливать.',
      origin: 'Италия'
    },
    {
      id: 2,
      name: 'Slim Fit костюм Hugo Boss',
      price: 125000,
      rating: 4.6,
      reviewCount: 18,
      images: [
        'https://images.unsplash.com/photo-1555069519-127aadedf1f3?w=800&h=1000&fit=crop',
        'https://images.unsplash.com/photo-1596702830007-710127761797?w=800&h=1000&fit=crop',
      ],
      category: 'slim',
      brand: 'Hugo Boss',
      material: 'Шерсть + эластан',
      color: 'Черный',
      size: '46S',
      description: 'Современный Slim Fit костюм от Hugo Boss с добавлением эластана для комфортной носки.',
      features: [
        'Шерсть 95% + Эластан 5%',
        'Slim Fit крой',
        'Эластичная ткань',
        'Легкий вес',
        'Современный дизайн'
      ],
      sizes: ['44S', '46S', '48R', '50L'],
      colors: [
        { name: 'Черный', hex: '#000000', emoji: '⚫' },
        { name: 'Темно-синий', hex: '#1e3a8a', emoji: '🔵' }
      ],
      inStock: true,
      care: 'Сухая чистка. Не стирать.',
      origin: 'Германия'
    },
    {
      id: 3,
      name: 'Повседневный костюм Canali',
      price: 95000,
      rating: 4.4,
      reviewCount: 12,
      images: [
        'https://images.unsplash.com/photo-1596702830007-710127761797?w=800&h=1000&fit=crop',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop',
      ],
      category: 'casual',
      brand: 'Canali',
      material: 'Хлопок',
      color: 'Серый',
      size: '50L',
      description: 'Стильный повседневный костюм от итальянского бренда Canali.',
      features: [
        'Хлопок 100%',
        'Свободный крой',
        'Повседневный стиль',
        'Легкая ткань',
        'Удобная посадка'
      ],
      sizes: ['48R', '50L', '52XL'],
      colors: [
        { name: 'Серый', hex: '#6b7280', emoji: '⚪' },
        { name: 'Бежевый', hex: '#d4a574', emoji: '🟤' }
      ],
      inStock: true,
      care: 'Стирка при 30°C. Не отбеливать.',
      origin: 'Италия'
    },
    {
      id: 4,
      name: 'Праздничный костюм Brioni',
      price: 250000,
      rating: 4.9,
      reviewCount: 30,
      images: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop',
        'https://images.unsplash.com/photo-1596702830007-710127761797?w=800&h=1000&fit=crop',
      ],
      category: 'festive',
      brand: 'Brioni',
      material: 'Шелк + шерсть',
      color: 'Бордовый',
      size: '52R',
      description: 'Роскошный праздничный костюм от легендарного итальянского бренда Brioni.',
      features: [
        'Шелк 30% + Шерсть 70%',
        'Премиум качество',
        'Эксклюзивный дизайн',
        'Ручная работа',
        'Индивидуальный пошив'
      ],
      sizes: ['50L', '52R', '54XXL'],
      colors: [
        { name: 'Бордовый', hex: '#7f1d1d', emoji: '🟥' },
        { name: 'Темно-синий', hex: '#1e3a8a', emoji: '🔵' }
      ],
      inStock: true,
      care: 'Сухая чистка. Не стирать.',
      origin: 'Италия'
    },
    {
      id: 5,
      name: 'Casual костюм Canali',
      price: 65000,
      rating: 4.2,
      reviewCount: 10,
      images: [
        'https://images.unsplash.com/photo-1506629905607-997823df6e2e?w=800&h=1000&fit=crop',
        'https://images.unsplash.com/photo-1596702830007-710127761797?w=800&h=1000&fit=crop',
      ],
      category: 'casual',
      brand: 'Canali',
      material: 'Лен',
      color: 'Бежевый',
      size: '48S',
      description: 'Легкий и комфортный casual костюм из натурального льна.',
      features: [
        'Лен 100%',
        'Натуральная ткань',
        'Легкий вес',
        'Дышащий материал',
        'Летний вариант'
      ],
      sizes: ['46S', '48R', '50L'],
      colors: [
        { name: 'Бежевый', hex: '#d4a574', emoji: '🟤' },
        { name: 'Белый', hex: '#ffffff', emoji: '⚪' }
      ],
      inStock: true,
      care: 'Стирка при 30°C. Не отбеливать.',
      origin: 'Италия'
    },
    {
      id: 6,
      name: 'Деловой костюм Ermenegildo Zegna',
      price: 190000,
      originalPrice: 230000,
      discount: 17,
      rating: 4.7,
      reviewCount: 20,
      images: [
        'https://images.unsplash.com/photo-1596702830007-710127761797?w=800&h=1000&fit=crop',
        'https://images.unsplash.com/photo-1555069519-127aadedf1f3?w=800&h=1000&fit=crop',
      ],
      category: 'classic',
      brand: 'Ermenegildo Zegna',
      material: 'Шерсть 100%',
      color: 'Серый',
      size: '50R',
      description: 'Классический деловой костюм от премиум бренда Zegna.',
      features: [
        'Шерсть Super 140',
        'Итальянское качество',
        'Классический крой',
        'Полная подкладка',
        'Двойные швы'
      ],
      sizes: ['48R', '50L', '52R'],
      colors: [
        { name: 'Серый', hex: '#6b7280', emoji: '⚪' },
        { name: 'Темно-синий', hex: '#1e3a8a', emoji: '🔵' }
      ],
      inStock: true,
      care: 'Сухая чистка. Не стирать.',
      origin: 'Италия'
    },
  ]

  return products.find(p => p.id === parseInt(id))
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { theme } = useTheme()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const product = getProductById(params.id as string)

  if (!product) {
    return (
      <div className="min-h-screen bg-background dark:bg-dark-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
            Товар не найден
          </h1>
          <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
            Извините, запрашиваемый товар не существует.
          </p>
          <Link href="/catalog">
            <Button>Вернуться в каталог</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Пожалуйста, выберите размер и цвет')
      return
    }

    // In a real app, this would add to cart
    alert(`Товар "${product.name}" (${selectedSize}, ${selectedColor}) добавлен в корзину!`)
  }

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite)
    alert(isFavorite ? 'Удалено из избранного' : 'Добавлено в избранное')
  }

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      {/* Header */}
      <div className="border-b border-border dark:border-dark-border bg-surface/50 backdrop-blur-sm">
        <div className="container-padding">
          <div className="py-4">
            <button
              onClick={() => router.back()}
              className="flex items-center text-text-secondary hover:text-accent transition-colors mb-4"
            >
              <ArrowLeft size={20} className="mr-2" />
              Назад
            </button>

            <nav className="text-sm text-text-secondary dark:text-dark-text-secondary">
              <Link href="/" className="hover:text-accent">Главная</Link>
              <span className="mx-2">/</span>
              <Link href="/catalog" className="hover:text-accent">Каталог</Link>
              <span className="mx-2">/</span>
              <span className="text-text-primary dark:text-dark-text-primary">{product.name}</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container-padding py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] relative overflow-hidden rounded-lg bg-surface dark:bg-dark-surface">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 relative rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? 'border-accent'
                      : 'border-border dark:border-dark-border hover:border-accent/50'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-text-secondary dark:text-dark-text-secondary">
                    ({product.reviewCount} отзывов)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-accent">
                {product.price.toLocaleString()} ₸
              </span>
              {product.originalPrice && (
                <span className="text-xl text-text-secondary dark:text-dark-text-secondary line-through">
                  {product.originalPrice.toLocaleString()} ₸
                </span>
              )}
              {product.discount && (
                <Badge variant="destructive" className="bg-red-500">
                  -{product.discount}%
                </Badge>
              )}
            </div>

            {/* Brand and Basic Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-text-secondary dark:text-dark-text-secondary">Бренд:</span>
                <span className="ml-2 text-text-primary dark:text-dark-text-primary">{product.brand}</span>
              </div>
              <div>
                <span className="font-medium text-text-secondary dark:text-dark-text-secondary">Материал:</span>
                <span className="ml-2 text-text-primary dark:text-dark-text-primary">{product.material}</span>
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-3">Размер</h3>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md transition-colors ${
                      selectedSize === size
                        ? 'border-accent bg-accent text-primary'
                        : 'border-border dark:border-dark-border text-text-primary dark:text-dark-text-primary hover:border-accent'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-3">Цвет</h3>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-md transition-colors ${
                      selectedColor === color.name
                        ? 'border-accent bg-accent text-primary'
                        : 'border-border dark:border-dark-border text-text-primary dark:text-dark-text-primary hover:border-accent'
                    }`}
                  >
                    <span>{color.emoji}</span>
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-3">Количество</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-border dark:border-dark-border rounded-md hover:border-accent transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-border dark:border-dark-border rounded-md hover:border-accent transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button onClick={handleAddToCart} className="flex-1" size="lg">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Добавить в корзину
              </Button>
              <Button
                onClick={handleAddToFavorites}
                variant="outline"
                size="lg"
                className={isFavorite ? 'text-red-500 border-red-500' : ''}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Stock Status */}
            <div className={`p-4 rounded-lg ${
              product.inStock
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  product.inStock ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span className={`font-medium ${
                  product.inStock
                    ? 'text-green-700 dark:text-green-400'
                    : 'text-red-700 dark:text-red-400'
                }`}>
                  {product.inStock ? 'В наличии' : 'Нет в наличии'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
                Описание
              </h2>
              <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
                {product.description}
              </p>

              <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-3">
                Характеристики
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-text-secondary dark:text-dark-text-secondary">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="space-y-6">
            {/* Care Instructions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-3">
                Уход за изделием
              </h3>
              <p className="text-text-secondary dark:text-dark-text-secondary text-sm">
                {product.care}
              </p>
            </Card>

            {/* Origin */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-3">
                Производство
              </h3>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                Страна: {product.origin}
              </p>
            </Card>

            {/* Services */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-3">
                Наши услуги
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-accent" />
                  <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    Бесплатная доставка от 100,000 ₸
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-accent" />
                  <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    Гарантия качества
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-accent" />
                  <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    Возврат в течение 14 дней
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-accent" />
                  <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    Консультация стилиста
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
