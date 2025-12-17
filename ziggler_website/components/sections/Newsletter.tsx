'use client'

import { useState } from 'react'
import { Mail, CheckCircle, Gift, TrendingUp, Users, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { toast } from '@/components/ui/Toaster'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      toast.error('Ошибка', 'Пожалуйста, введите корректный email')
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSubscribed(true)
    setIsLoading(false)
    toast.success('Успешно!', 'Вы подписались на рассылку новостей')

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false)
      setEmail('')
    }, 3000)
  }

  const benefits = [
    {
      icon: Gift,
      title: 'Эксклюзивные скидки',
      description: 'Первыми узнавайте о распродажах и специальных предложениях',
    },
    {
      icon: TrendingUp,
      title: 'Новые коллекции',
      description: 'Будьте в курсе выхода новых моделей и коллекций',
    },
    {
      icon: Users,
      title: 'Стильные советы',
      description: 'Получайте рекомендации по сочетанию костюмов и аксессуаров',
    },
    {
      icon: Sparkles,
      title: 'Персональные предложения',
      description: 'Специальные предложения на основе ваших предпочтений',
    },
  ]

  return (
    <section className="section-padding bg-accent text-primary">
      <div className="container-padding">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Будьте в курсе новинок
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Подпишитесь на нашу рассылку и получайте эксклюзивные предложения,
              информацию о новых коллекциях и стильные советы
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Subscription Form */}
            <div className="card bg-background text-text-primary p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Подписка на новости</h3>
              </div>

              {isSubscribed ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-2">Спасибо за подписку!</h4>
                  <p className="text-text-secondary dark:text-dark-text-secondary">
                    Теперь вы будете первыми узнавать о наших новинках и акциях.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Ваш email адрес"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent text-primary hover:bg-accent/90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Подписка...' : 'Подписаться на новости'}
                  </Button>

                  <p className="text-xs text-text-secondary dark:text-dark-text-secondary text-center">
                    Нажимая "Подписаться", вы соглашаетесь с{' '}
                    <a href="/privacy" className="underline hover:text-accent">
                      политикой конфиденциальности
                    </a>
                  </p>
                </form>
              )}
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
                    <div className="text-2xl font-bold mb-1">5000+</div>
                    <div className="text-sm opacity-80">Подписчиков</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-1">95%</div>
                    <div className="text-sm opacity-80">Открываемость</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-1">2x</div>
                    <div className="text-sm opacity-80">Конверсия</div>
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
