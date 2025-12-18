'use client'

import { Instagram, Heart, Users, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Newsletter() {
  const benefits = [
    {
      icon: Heart,
      title: 'Эксклюзивный контент',
      description: 'Фотографии с показов, backstage и стильные образы',
    },
    {
      icon: Users,
      title: 'Сообщество стиля',
      description: 'Присоединяйтесь к сообществу ценителей классического стиля',
    },
    {
      icon: Sparkles,
      title: 'Стильные советы',
      description: 'Ежедневные советы по стилю и моде',
    },
    {
      icon: Instagram,
      title: 'Анонсы акций',
      description: 'Первыми узнавайте о новых коллекциях и скидках',
    },
  ]

  return (
    <section className="section-padding bg-accent text-primary">
      <div className="container-padding">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Следите за нами в Instagram
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Присоединяйтесь к нашему сообществу и будьте в курсе последних новинок,
              эксклюзивного контента и стильных образов
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Instagram Subscription */}
            <div className="card bg-gradient-to-br from-yellow-400/20 via-amber-500/20 to-orange-500/20 dark:from-yellow-400/30 dark:via-amber-500/30 dark:to-orange-500/30 backdrop-blur-sm border-yellow-400/50 dark:border-yellow-400/70 p-8 text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 drop-shadow-sm">@ziggler_kz</h3>
              </div>

              <p className="text-yellow-700 dark:text-yellow-200 mb-6 font-medium">
                Более 10,000 подписчиков уже следят за нашими обновлениями
              </p>

              <a
                href="https://instagram.com/ziggler_kz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-semibold rounded-lg transition-all duration-300 border-0 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Instagram className="w-5 h-5" />
                <span>Подписаться в Instagram</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-6">Что вы получите:</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{benefit.title}</h4>
                        <p className="text-sm opacity-90">{benefit.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Stats */}
              <div className="bg-primary/10 rounded-lg p-6 mt-8">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold mb-1">10k+</div>
                    <div className="text-sm opacity-80">Подписчиков</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-1">85%</div>
                    <div className="text-sm opacity-80">Вовлеченность</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-1">50+</div>
                    <div className="text-sm opacity-80">Постов в месяц</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
