'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, ShoppingCart, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const collections = [
  {
    id: 'classic',
    name: 'Классические костюмы',
    description: 'Вневременная элегантность для деловых встреч и торжественных мероприятий',
    heroImage: 'https://i.imgur.com/vK8NzWp.jpg',
    itemCount: 25,
    featuredProducts: [
      {
        id: 1,
        name: 'Костюм Ermenegildo Zegna',
        price: 185000,
        image: 'https://i.imgur.com/wV8NzXp.jpg',
        rating: 4.8
      },
      {
        id: 5,
        name: 'Костюм Kiton',
        price: 195000,
        image: 'https://i.imgur.com/9nP4QxR.jpg',
        rating: 4.7
      }
    ],
    features: ['Шерсть 100%', 'Итальянские ткани', 'Ручная работа'],
    priceRange: '75,000 - 200,000 ₸',
    link: '/catalog?category=classic'
  },
  {
    id: 'slim',
    name: 'Slim Fit коллекция',
    description: 'Современный крой для уверенных мужчин с активным образом жизни',
    heroImage: 'https://i.imgur.com/9nP4QxR.jpg',
    itemCount: 18,
    featuredProducts: [
      {
        id: 2,
        name: 'Slim Fit Hugo Boss',
        price: 125000,
        image: 'https://i.imgur.com/R8Q7NxZ.jpg',
        rating: 4.6
      }
    ],
    features: ['Облегающий крой', 'Эластичные ткани', 'Легкий вес'],
    priceRange: '65,000 - 130,000 ₸',
    link: '/catalog?category=slim'
  },
  {
    id: 'casual',
    name: 'Casual линейка',
    description: 'Стильные повседневные костюмы для комфортной носки',
    heroImage: 'https://i.imgur.com/4wXp8Kz.jpg',
    itemCount: 20,
    featuredProducts: [
      {
        id: 3,
        name: 'Casual Canali',
        price: 95000,
        image: 'https://i.imgur.com/T6P8NxW.jpg',
        rating: 4.4
      },
      {
        id: 6,
        name: 'Легкий Loro Piana',
        price: 165000,
        image: 'https://i.imgur.com/4wXp8Kz.jpg',
        rating: 4.5
      }
    ],
    features: ['Легкие ткани', 'Удобный крой', 'Повседневный стиль'],
    priceRange: '55,000 - 170,000 ₸',
    link: '/catalog?category=casual'
  },
  {
    id: 'festive',
    name: 'Праздничные костюмы',
    description: 'Роскошные модели для особых случаев и семейных торжеств',
    heroImage: 'https://i.imgur.com/L8M7xVz.jpg',
    itemCount: 12,
    featuredProducts: [
      {
        id: 4,
        name: 'Свадебный Brioni',
        price: 280000,
        image: 'https://i.imgur.com/Y3Q9NxV.jpg',
        rating: 4.9
      }
    ],
    features: ['Премиум ткани', 'Эксклюзивный дизайн', 'Индивидуальный пошив'],
    priceRange: '95,000 - 300,000 ₸',
    link: '/catalog?category=festive'
  }
]

const seasonalCollections = [
  {
    id: 'spring-2025',
    name: 'Весна 2025',
    description: 'Легкие ткани и свежие цвета для теплого сезона',
    image: 'https://i.imgur.com/4wXp8Kz.jpg',
    isNew: true,
    link: '/collections/spring-2025'
  },
  {
    id: 'summer-2025',
    name: 'Лето 2025',
    description: 'Льняные и хлопковые костюмы для жарких дней',
    image: 'https://i.imgur.com/9nP4QxR.jpg',
    isNew: false,
    link: '/collections/summer-2025'
  },
  {
    id: 'autumn-2025',
    name: 'Осень 2025',
    description: 'Теплые ткани и классические цвета осени',
    image: 'https://i.imgur.com/vK8NzWp.jpg',
    isNew: false,
    link: '/collections/autumn-2025'
  }
]

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="section-padding bg-gradient-warm">
        <div className="container-padding text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Премиум коллекции Ziggler
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Откройте для себя тщательно подобранные коллекции костюмов, созданные с учетом
            последних тенденций моды и требований комфорта. Каждая коллекция - это сочетание
            итальянского мастерства и современного дизайна.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/catalog">
              <Button size="lg" className="mobile-button sm:px-8 sm:py-4 sm:text-lg">
                Смотреть весь каталог
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="mobile-button sm:px-8 sm:py-4 sm:text-lg">
              Персональный подбор
            </Button>
          </div>
        </div>
      </div>

      {/* Main Collections */}
      <div className="section-padding">
        <div className="container-padding">
          <div className="space-y-16">
            {collections.map((collection, index) => (
              <div key={collection.id} className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                    <Image
                      src={collection.heroImage}
                      alt={collection.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex flex-wrap gap-2">
                        {collection.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-white/90 text-black">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Featured Products Preview */}
                  <div className="absolute -bottom-6 -right-6 flex gap-3">
                    {collection.featuredProducts.slice(0, 2).map((product, idx) => (
                      <div key={product.id} className="w-20 h-20 sm:w-24 sm:h-24 bg-surface rounded-lg p-2 shadow-lg">
                        <div className="relative w-full h-full rounded-md overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                      {collection.name}
                    </h2>
                    <p className="text-lg text-text-secondary leading-relaxed">
                      {collection.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-6 border-y border-border">
                    <div>
                      <div className="text-2xl font-bold text-accent">{collection.itemCount}</div>
                      <div className="text-sm text-text-secondary">моделей</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">Цена</div>
                      <div className="text-sm text-text-secondary">{collection.priceRange}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-text-primary">Особенности коллекции:</h3>
                    <ul className="space-y-2">
                      {collection.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-text-secondary">
                          <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={collection.link}>
                    <Button className="mobile-button sm:px-6 sm:py-3">
                      Смотреть коллекцию
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Seasonal Collections */}
      <div className="section-padding bg-surface dark:bg-dark-surface">
        <div className="container-padding">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
              Сезонные коллекции
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Следите за нашими сезонными коллекциями, созданными с учетом последних тенденций
              и особенностей каждого времени года.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {seasonalCollections.map(collection => (
              <Link key={collection.id} href={collection.link}>
                <Card className="card-hover group overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {collection.isNew && (
                      <Badge className="absolute top-3 left-3 bg-accent text-primary">
                        Новинка
                      </Badge>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-text-secondary text-sm mb-4">
                      {collection.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-accent font-medium">Посмотреть</span>
                      <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="section-padding bg-gradient-subtle">
        <div className="container-padding text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
            Не нашли подходящую коллекцию?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Наши стилисты помогут подобрать идеальный костюм под ваш вкус и особенности фигуры.
            Запишитесь на персональную консультацию.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="mobile-button sm:px-8 sm:py-4 sm:text-lg">
              Записаться на примерку
            </Button>
            <Link href="/catalog">
              <Button variant="outline" size="lg" className="mobile-button sm:px-8 sm:py-4 sm:text-lg">
                Смотреть весь каталог
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
