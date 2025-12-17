'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const reviews = [
  {
    id: 1,
    name: 'Алексей Иванов',
    position: 'Руководитель компании',
    rating: 5,
    text: 'Заказал классический костюм для деловых встреч. Качество потрясающее! Ткань премиум класса, посадка идеальная. Доставили точно в срок. Очень доволен покупкой!',
    image: '/review-1.jpg',
    suitImage: '/suit-review-1.jpg',
    date: '2025-01-15',
  },
  {
    id: 2,
    name: 'Мария Смирнова',
    position: 'Стилист',
    rating: 5,
    text: 'Работаю стилистом и знаю толк в костюмах. Ziggler предлагает действительно качественные изделия по адекватным ценам. Клиентам рекомендую!',
    image: '/review-2.jpg',
    suitImage: '/suit-review-2.jpg',
    date: '2025-01-10',
  },
  {
    id: 3,
    name: 'Дмитрий Петров',
    position: 'Бизнесмен',
    rating: 5,
    text: 'Купил костюм для свадьбы брата. Выглядит потрясающе! Персональный подход, качественный пошив, отличный сервис. Буду заказывать еще.',
    image: '/review-3.jpg',
    suitImage: '/suit-review-3.jpg',
    date: '2025-01-08',
  },
  {
    id: 4,
    name: 'Анна Козлова',
    position: 'Журналист',
    rating: 5,
    text: 'Заказывала костюм для фотосессии. Результат превзошел ожидания! Детали проработаны идеально. Спасибо за профессионализм.',
    image: '/review-4.jpg',
    suitImage: '/suit-review-4.jpg',
    date: '2025-01-05',
  },
]

export function CustomerReviews() {
  const [currentReview, setCurrentReview] = useState(0)

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const goToReview = (index: number) => {
    setCurrentReview(index)
  }

  const review = reviews[currentReview]

  return (
    <section className="section-padding bg-background dark:bg-dark-background">
      <div className="container-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
            Отзывы наших клиентов
          </h2>
          <p className="text-lg text-text-secondary dark:text-dark-text-secondary">
            Узнайте, что говорят о нас люди, которые уже выбрали Ziggler
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Review Content */}
            <div className="card p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-text-primary dark:text-dark-text-primary">
                      {review.name}
                    </h3>
                    <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                      • {review.position}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-text-secondary dark:text-dark-text-secondary ml-2">
                      {review.rating}.0
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    {new Date(review.date).toLocaleDateString('ru-RU')}
                  </p>
                </div>
              </div>

              <div className="relative mb-6">
                <Quote className="absolute top-0 left-0 w-8 h-8 text-accent/20" />
                <blockquote className="text-lg text-text-primary dark:text-dark-text-primary pl-10">
                  "{review.text}"
                </blockquote>
              </div>

              {/* Suit Image */}
              <div className="relative h-32 rounded-lg overflow-hidden">
                <Image
                  src={review.suitImage}
                  alt="Фото костюма"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Review Stats */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">4.9/5</div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-text-secondary dark:text-dark-text-secondary">
                  Средний рейтинг из 150+ отзывов
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-surface dark:bg-dark-surface rounded-lg">
                  <div className="text-2xl font-bold text-accent mb-1">98%</div>
                  <div className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    Довольных клиентов
                  </div>
                </div>
                <div className="text-center p-4 bg-surface dark:bg-dark-surface rounded-lg">
                  <div className="text-2xl font-bold text-accent mb-1">24ч</div>
                  <div className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    Среднее время ответа
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button variant="outline" className="w-full">
                  Читать все отзывы
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevReview}
              className="p-2"
            >
              <ChevronLeft size={20} />
            </Button>

            <div className="flex space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToReview(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentReview ? 'bg-accent' : 'bg-text-secondary dark:bg-dark-text-secondary'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={nextReview}
              className="p-2"
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
