'use client'

import { useState } from 'react'
import { Shield, Truck, Award, Headphones, Star, Clock } from 'lucide-react'

const advantages = [
  {
    icon: Shield,
    title: 'Гарантия качества',
    description: '100% оригинальные материалы и фурнитура. Сертификаты качества на все изделия.',
    details: 'Каждый костюм проходит многоступенчатый контроль качества. Мы гарантируем соответствие заявленным характеристикам.',
    stats: '98% положительных отзывов',
  },
  {
    icon: Truck,
    title: 'Быстрая доставка',
    description: 'Доставка по Казахстану за 24-48 часов. Бесплатно от 100,000 ₸.',
    details: 'Собственная служба доставки обеспечивает своевременную доставку в любую точку Казахстана.',
    stats: '47 городов покрытия',
  },
  {
    icon: Award,
    title: 'Премиум материалы',
    description: 'Итальянские и турецкие ткани. Корейское производство. Европейские стандарты.',
    details: 'Сотрудничаем только с проверенными фабриками с многолетним опытом производства премиум одежды.',
    stats: '5+ лет опыта партнеров',
  },
  {
    icon: Headphones,
    title: 'Персональная поддержка',
    description: 'Индивидуальный подход к каждому клиенту. Консультации стилиста бесплатно.',
    details: 'Наша команда стилистов поможет подобрать идеальный костюм под ваш образ жизни и предпочтения.',
    stats: '24/7 поддержка',
  },
  {
    icon: Star,
    title: 'Лояльность клиентов',
    description: 'Программа привилегий для постоянных клиентов. Скидки и бонусы.',
    details: 'Накопительная система баллов, персональные скидки, ранний доступ к новым коллекциям.',
    stats: '15% средняя скидка',
  },
  {
    icon: Clock,
    title: '30 дней на возврат',
    description: 'Полный возврат средств или обмен в течение 30 дней без объяснения причин.',
    details: 'Мы уверены в качестве нашей продукции и предоставляем максимальные гарантии комфорта покупок.',
    stats: '99% удовлетворенность',
  },
]

export function WhyChooseUs() {
  const [activeAdvantage, setActiveAdvantage] = useState<number | null>(null)

  return (
    <section className="section-padding bg-surface dark:bg-dark-surface">
      <div className="container-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
            Почему выбирают Ziggler
          </h2>
          <p className="text-lg text-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto">
            Мы создаем не просто костюмы, мы создаем уверенность в вашем образе.
            Каждый клиент для нас — это партнер в создании идеального стиля.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon
            const isActive = activeAdvantage === index

            return (
              <div
                key={index}
                className={`card card-hover cursor-pointer transition-all duration-300 ${
                  isActive ? 'ring-2 ring-accent shadow-large' : ''
                }`}
                onClick={() => setActiveAdvantage(isActive ? null : index)}
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary dark:text-dark-text-primary">
                        {advantage.title}
                      </h3>
                      <p className="text-sm font-medium text-accent">
                        {advantage.stats}
                      </p>
                    </div>
                  </div>

                  <p className="text-text-secondary dark:text-dark-text-secondary mb-4">
                    {advantage.description}
                  </p>

                  {isActive && (
                    <div className="border-t border-border dark:border-dark-border pt-4 animate-slide-up">
                      <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                        {advantage.details}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
                      {isActive ? 'Нажмите, чтобы скрыть' : 'Нажмите для деталей'}
                    </span>
                    <div className={`w-2 h-2 rounded-full transition-colors ${
                      isActive ? 'bg-accent' : 'bg-text-secondary dark:bg-dark-text-secondary'
                    }`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-accent mb-2">500+</div>
            <div className="text-text-secondary dark:text-dark-text-secondary">Довольных клиентов</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent mb-2">2 года</div>
            <div className="text-text-secondary dark:text-dark-text-secondary">Гарантии на костюмы</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent mb-2">24/7</div>
            <div className="text-text-secondary dark:text-dark-text-secondary">Поддержка клиентов</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent mb-2">30 дней</div>
            <div className="text-text-secondary dark:text-dark-text-secondary">На возврат</div>
          </div>
        </div>
      </div>
    </section>
  )
}
