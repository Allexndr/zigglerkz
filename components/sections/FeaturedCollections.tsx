'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const collections = [
  {
    id: 1,
    title: 'Классические костюмы',
    description: 'Вневременная элегантность для деловых встреч и торжественных мероприятий',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop',
    itemCount: 25,
    priceRange: '75,000 - 150,000 ₸',
    features: ['Шерсть 100%', 'Итальянские ткани', 'Ручная работа'],
    link: '/catalog?category=classic',
  },
  {
    id: 2,
    title: 'Slim Fit коллекция',
    description: 'Современный крой для уверенных мужчин с активным образом жизни',
    image: 'https://images.unsplash.com/photo-1506629905607-9b9f09b09124?w=600&h=800&fit=crop',
    itemCount: 18,
    priceRange: '65,000 - 120,000 ₸',
    features: ['Облегающий крой', 'Эластичные ткани', 'Легкий вес'],
    link: '/catalog?category=slim',
  },
  {
    id: 3,
    title: 'Праздничные костюмы',
    description: 'Роскошные модели для особых случаев и семейных торжеств',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop',
    itemCount: 12,
    priceRange: '95,000 - 200,000 ₸',
    features: ['Премиум ткани', 'Эксклюзивный дизайн', 'Индивидуальный пошив'],
    link: '/catalog?category=festive',
  },
  {
    id: 4,
    title: 'Casual линейка',
    description: 'Стильные повседневные костюмы для комфортной носки',
    image: 'https://images.unsplash.com/photo-1506629905607-997823df6e2e?w=600&h=800&fit=crop',
    itemCount: 20,
    priceRange: '55,000 - 95,000 ₸',
    features: ['Легкие ткани', 'Удобный крой', 'Повседневный стиль'],
    link: '/catalog?category=casual',
  },
]

export function FeaturedCollections() {
  return (
    <section className="section-padding bg-gradient-warm dark:bg-dark-background">
      <div className="container-padding">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="mobile-heading sm:text-3xl md:text-4xl font-bold text-text-primary dark:text-dark-text-primary mb-3 sm:mb-4">
            Премиум коллекции
          </h2>
          <p className="mobile-text sm:text-base md:text-lg text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto px-4 sm:px-0">
            Откройте для себя тщательно подобранные коллекции костюмов,
            созданные с учетом последних тенденций моды и требований комфорта
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {collections.map((collection) => (
            <Link key={collection.id} href={collection.link}>
              <Card className="card-hover group cursor-pointer overflow-hidden mobile-card sm:p-6">
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg">{collection.title}</h3>
                        <p className="text-xs sm:text-sm opacity-90">{collection.itemCount} моделей</p>
                      </div>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <p className="text-text-secondary dark:text-dark-text-secondary mb-3 sm:mb-4 line-clamp-2 text-sm sm:text-base">
                    {collection.description}
                  </p>

                  <div className="space-y-2 mb-3 sm:mb-4">
                    <div className="text-xs sm:text-sm text-text-secondary dark:text-dark-text-secondary">
                      Цена: <span className="font-medium text-accent">{collection.priceRange}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {collection.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 sm:py-1 bg-accent/10 text-accent text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/collections">
            <Button size="lg" className="mobile-button sm:px-8 sm:py-4 sm:text-lg">
              Смотреть все коллекции
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
