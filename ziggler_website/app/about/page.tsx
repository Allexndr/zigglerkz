'use client'

import Image from 'next/image'
import { Award, Users, Clock, MapPin, Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const stats = [
  { icon: Users, value: '500+', label: 'Довольных клиентов' },
  { icon: Award, value: '5 лет', label: 'На рынке' },
  { icon: Clock, value: '24/7', label: 'Поддержка' },
  { icon: MapPin, value: '47', label: 'Городов доставки' }
]

const values = [
  {
    icon: Heart,
    title: 'Страсть к качеству',
    description: 'Мы тщательно отбираем каждую ткань и фурнитуру, чтобы обеспечить максимальное качество и комфорт.'
  },
  {
    icon: Users,
    title: 'Персональный подход',
    description: 'Каждый клиент уникален. Мы предлагаем индивидуальные решения и персональные консультации.'
  },
  {
    icon: Star,
    title: 'Итальянское мастерство',
    description: 'Сотрудничаем только с проверенными итальянскими фабриками с многолетним опытом производства.'
  },
  {
    icon: Award,
    title: 'Гарантия качества',
    description: 'Предоставляем полную гарантию на все изделия и предлагаем бесплатное обслуживание.'
  }
]

const team = [
  {
    name: 'Александр Иванов',
    position: 'Основатель и CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    description: 'Более 15 лет в fashion-индустрии. Эксперт по мужской моде и стилю.'
  },
  {
    name: 'Мария Смирнова',
    position: 'Главный стилист',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    description: 'Сертифицированный стилист с опытом работы в ведущих fashion домах Европы.'
  },
  {
    name: 'Дмитрий Петров',
    position: 'Директор по качеству',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    description: 'Отвечает за контроль качества продукции и сотрудничество с поставщиками.'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://i.imgur.com/XyGdK8m.jpg"
            alt="Ziggler бутик"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 container-padding text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              О бутике Ziggler
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 leading-relaxed">
              Мы создаем идеальные костюмы для уверенных мужчин, сочетая итальянское мастерство
              с современным дизайном и непревзойденным комфортом.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary px-8 py-4">
                Наша история
              </Button>
              <Button variant="secondary" size="lg" className="px-8 py-4">
                Команда
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="section-padding bg-gradient-warm">
        <div className="container-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={32} className="text-primary" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-text-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="section-padding">
        <div className="container-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-6">
                Наша история
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Ziggler был основан в 2019 году группой энтузиастов мужской моды,
                  которые хотели изменить представление о костюмах в Казахстане.
                  Мы увидели, что рынок предлагал либо дорогие импортные изделия,
                  либо низкокачественные локальные аналоги.
                </p>
                <p>
                  Так появилась идея создать бутик, который бы предлагал действительно
                  качественные костюмы по разумным ценам. Мы начали с тщательного
                  изучения итальянских фабрик и установления партнерских отношений
                  с ведущими производителями.
                </p>
                <p>
                  Сегодня Ziggler - это не просто магазин костюмов. Это место,
                  где каждый мужчина может найти свой идеальный стиль, получить
                  профессиональную консультацию и быть уверенным в качестве покупки.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] relative overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop"
                  alt="История Ziggler"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="section-padding bg-surface dark:bg-dark-surface">
        <div className="container-padding">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Наши ценности
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Эти принципы лежат в основе всей нашей работы и определяют наше отношение к клиентам и продуктам.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-text-primary mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="section-padding">
        <div className="container-padding">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Наша команда
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Профессионалы с многолетним опытом в fashion-индустрии, готовые помочь
              вам найти идеальный костюм.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-text-primary mb-1">
                    {member.name}
                  </h3>
                  <p className="text-accent font-medium text-sm mb-3">
                    {member.position}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="section-padding bg-gradient-subtle">
        <div className="container-padding text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
            Готовы найти свой идеальный костюм?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Посетите наш бутик или закажите персональную консультацию.
            Мы поможем вам выглядеть уверенно и стильно.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="mobile-button sm:px-8 sm:py-4 sm:text-lg">
              Записаться на примерку
            </Button>
            <Button variant="outline" size="lg" className="mobile-button sm:px-8 sm:py-4 sm:text-lg">
              Посмотреть каталог
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
