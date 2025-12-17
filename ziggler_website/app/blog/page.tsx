'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const blogPosts = [
  {
    id: 1,
    title: 'Как выбрать идеальный костюм для деловой встречи',
    excerpt: 'Полное руководство по выбору костюма для важных деловых встреч. Узнайте о правилах этикета, цветовых сочетаниях и качестве материалов.',
    image: 'https://i.imgur.com/vK8NzWp.jpg',
    author: 'Мария Смирнова',
    date: '2025-01-15',
    readTime: 8,
    category: 'Стиль',
    tags: ['деловой стиль', 'этикет', 'выбор костюма'],
    featured: true
  },
  {
    id: 2,
    title: 'Тенденции мужской моды весна-лето 2025',
    excerpt: 'Обзор главных тенденций сезона. От пастельных тонов до смелых узоров - узнайте, что будет в моде этой весной.',
    image: 'https://i.imgur.com/9nP4QxR.jpg',
    author: 'Александр Иванов',
    date: '2025-01-10',
    readTime: 6,
    category: 'Тренды',
    tags: ['тенденции', 'весна 2025', 'мужская мода'],
    featured: false
  },
  {
    id: 3,
    title: 'Уход за шерстяными костюмами: полное руководство',
    excerpt: 'Как правильно ухаживать за шерстяными костюмами, чтобы они служили вам долгие годы. Советы по чистке, хранению и профилактике.',
    image: 'https://i.imgur.com/4wXp8Kz.jpg',
    author: 'Дмитрий Петров',
    date: '2025-01-08',
    readTime: 10,
    category: 'Уход',
    tags: ['уход за одеждой', 'шерсть', 'чистка'],
    featured: false
  },
  {
    id: 4,
    title: 'Как подобрать размер костюма: таблица размеров',
    excerpt: 'Подробная таблица размеров костюмов с инструкциями по снятию мерок. Узнайте, как правильно определить свой размер.',
    image: 'https://i.imgur.com/L8M7xVz.jpg',
    author: 'Анна Козлова',
    date: '2025-01-05',
    readTime: 5,
    category: 'Размеры',
    tags: ['размеры', 'подгонка', 'измерения'],
    featured: false
  },
  {
    id: 5,
    title: 'Итальянские ткани: почему они лучшие?',
    excerpt: 'Рассказываем о преимуществах итальянских тканей и почему ведущие fashion дома мира выбирают именно их.',
    image: 'https://i.imgur.com/wV8NzXp.jpg',
    author: 'Александр Иванов',
    date: '2025-01-03',
    readTime: 7,
    category: 'Материалы',
    tags: ['итальянские ткани', 'качество', 'производство'],
    featured: false
  },
  {
    id: 6,
    title: 'Цветовые сочетания в мужском гардеробе',
    excerpt: 'Как правильно сочетать цвета в костюме, рубашке и аксессуарах. Практические советы от профессионального стилиста.',
    image: 'https://i.imgur.com/R8Q7NxZ.jpg',
    author: 'Мария Смирнова',
    date: '2025-01-01',
    readTime: 9,
    category: 'Цвета',
    tags: ['цвета', 'сочетания', 'стиль'],
    featured: false
  }
]

const categories = [
  { name: 'Все', count: blogPosts.length, active: true },
  { name: 'Стиль', count: blogPosts.filter(p => p.category === 'Стиль').length, active: false },
  { name: 'Тренды', count: blogPosts.filter(p => p.category === 'Тренды').length, active: false },
  { name: 'Уход', count: blogPosts.filter(p => p.category === 'Уход').length, active: false },
  { name: 'Размеры', count: blogPosts.filter(p => p.category === 'Размеры').length, active: false },
  { name: 'Материалы', count: blogPosts.filter(p => p.category === 'Материалы').length, active: false },
  { name: 'Цвета', count: blogPosts.filter(p => p.category === 'Цвета').length, active: false }
]

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="section-padding bg-gradient-warm">
        <div className="container-padding text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Блог Ziggler
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Полезные статьи о мужской моде, уходе за одеждой и тенденциях стиля.
            Советы от профессиональных стилистов и экспертов fashion-индустрии.
          </p>
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="section-padding">
          <div className="container-padding">
            <div className="mb-8">
              <Badge className="mb-4">Рекомендуем прочитать</Badge>
              <h2 className="text-2xl font-bold text-text-primary mb-2">Избранная статья</h2>
            </div>

            <Link href={`/blog/${featuredPost.id}`}>
              <Card className="card-hover overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative aspect-[4/3] lg:aspect-[4/5]">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 lg:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
                      <div className="flex items-center gap-1">
                        <User size={16} />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        {new Date(featuredPost.date).toLocaleDateString('ru-RU')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        {featuredPost.readTime} мин
                      </div>
                    </div>

                    <h3 className="text-xl lg:text-2xl font-bold text-text-primary mb-4 leading-tight">
                      {featuredPost.title}
                    </h3>

                    <p className="text-text-secondary mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredPost.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center text-accent font-medium">
                      Читать далее
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      )}

      {/* Categories Filter */}
      <div className="border-b border-border bg-surface/50">
        <div className="container-padding">
          <div className="py-6">
            <div className="flex flex-wrap gap-3">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category.active
                      ? 'bg-accent text-primary'
                      : 'bg-background text-text-primary hover:bg-surface'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-xs opacity-70">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="section-padding">
        <div className="container-padding">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="card-hover overflow-hidden h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-accent/90 text-primary text-xs">
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-text-secondary mb-3">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime} мин
                      </div>
                    </div>

                    <h3 className="font-semibold text-text-primary mb-3 line-clamp-2 leading-tight hover:text-accent transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-sm text-text-secondary mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 2).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary">
                        {new Date(post.date).toLocaleDateString('ru-RU')}
                      </span>
                      <div className="flex items-center text-accent font-medium text-sm">
                        Читать
                        <ArrowRight className="ml-1 w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="section-padding bg-gradient-subtle">
        <div className="container-padding text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
            Подпишитесь на обновления
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Получайте свежие статьи о моде, советы по стилю и информацию о новых коллекциях
            прямо на вашу почту.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button className="mobile-button sm:px-6 sm:py-3">
              Подписаться
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
