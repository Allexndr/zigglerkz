'use client'

import { Truck, MapPin, Clock, CreditCard, Shield, Phone } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const deliveryOptions = [
  {
    name: 'Стандартная доставка',
    description: 'Доставка по Алматы и пригородам',
    time: '1-2 рабочих дня',
    cost: 'Бесплатно от 100,000 ₸',
    icon: Truck,
    features: ['Отслеживание посылки', 'Уведомления SMS', 'Контакт с курьером']
  },
  {
    name: 'Экспресс доставка',
    description: 'Срочная доставка в день заказа',
    time: '3-6 часов',
    cost: '5,000 ₸',
    icon: Clock,
    features: ['Приоритетная обработка', 'Персональный курьер', 'Гарантированное время']
  },
  {
    name: 'Региональная доставка',
    description: 'Доставка в регионы Казахстана',
    time: '3-7 рабочих дней',
    cost: 'От 3,000 ₸',
    icon: MapPin,
    features: ['Через Казпочту', 'Отслеживание', 'Страховка груза']
  }
]

const paymentMethods = [
  {
    name: 'Банковской картой',
    description: 'Visa, Mastercard, American Express',
    icon: CreditCard,
    available: true
  },
  {
    name: 'Наличными при получении',
    description: 'Оплата курьеру или в пункте выдачи',
    icon: Truck,
    available: true
  },
  {
    name: 'Банковский перевод',
    description: 'Для оптовых заказов',
    icon: Shield,
    available: true
  }
]

const deliverySteps = [
  {
    step: 1,
    title: 'Оформление заказа',
    description: 'Выбираете товары, указываете адрес доставки и способ оплаты',
    time: '5 минут'
  },
  {
    step: 2,
    title: 'Подтверждение',
    description: 'Мы проверяем наличие товаров и подтверждаем заказ',
    time: '30 минут'
  },
  {
    step: 3,
    title: 'Подготовка',
    description: 'Упаковываем заказ и готовим документы',
    time: '2-4 часа'
  },
  {
    step: 4,
    title: 'Доставка',
    description: 'Курьер доставляет заказ по указанному адресу',
    time: 'По графику'
  },
  {
    step: 5,
    title: 'Получение',
    description: 'Проверяете товар и подписываете документы',
    time: '5 минут'
  }
]

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="section-padding bg-gradient-warm">
        <div className="container-padding text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Доставка и оплата
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Мы стремимся сделать процесс покупки максимально удобным и безопасным.
            Выберите удобный способ доставки и оплаты.
          </p>
        </div>
      </div>

      {/* Delivery Options */}
      <div className="section-padding">
        <div className="container-padding">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 text-center">
            Способы доставки
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {deliveryOptions.map((option, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4">
                    <option.icon size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{option.name}</h3>
                    <p className="text-sm text-text-secondary">{option.description}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">Время:</span>
                    <span className="font-medium">{option.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">Стоимость:</span>
                    <span className="font-medium text-accent">{option.cost}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-text-primary mb-2">Особенности:</h4>
                  <ul className="space-y-1">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-text-secondary flex items-center">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>

          <div className="bg-surface dark:bg-dark-surface rounded-lg p-6">
            <h3 className="font-semibold text-text-primary mb-4">Важная информация</h3>
            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-medium text-text-primary mb-2">Условия бесплатной доставки</h4>
                <ul className="space-y-1 text-text-secondary">
                  <li>• Заказы от 100,000 ₸ - бесплатно по Алматы</li>
                  <li>• Заказы от 200,000 ₸ - бесплатно по Казахстану</li>
                  <li>• Для регионов - стоимость рассчитывается индивидуально</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-text-primary mb-2">Дополнительные услуги</h4>
                <ul className="space-y-1 text-text-secondary">
                  <li>• Подарочная упаковка - 5,000 ₸</li>
                  <li>• Примерка перед покупкой - бесплатно</li>
                  <li>• Срочная доставка - от 5,000 ₸</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="section-padding bg-surface dark:bg-dark-surface">
        <div className="container-padding">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 text-center">
            Способы оплаты
          </h2>

          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {paymentMethods.map((method, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  method.available ? 'bg-accent' : 'bg-surface'
                }`}>
                  <method.icon size={32} className={method.available ? 'text-primary' : 'text-text-secondary'} />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">{method.name}</h3>
                <p className="text-sm text-text-secondary">{method.description}</p>
                {method.available && (
                  <Badge className="mt-2 bg-green-500">Доступно</Badge>
                )}
              </div>
            ))}
          </div>

          <Card className="p-6">
            <h3 className="font-semibold text-text-primary mb-4">Безопасность платежей</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-text-primary mb-2">Защита данных</h4>
                <p className="text-sm text-text-secondary">
                  Все платежи обрабатываются через защищенные каналы с использованием
                  SSL-шифрования. Ваши данные в безопасности.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-text-primary mb-2">Политика возврата</h4>
                <p className="text-sm text-text-secondary">
                  В случае проблем с заказом мы гарантируем возврат средств
                  в течение 24 часов после обращения.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Delivery Process */}
      <div className="section-padding">
        <div className="container-padding">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 text-center">
            Как происходит доставка
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              {deliverySteps.map((step, index) => (
                <div key={step.step} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-semibold text-text-primary">{step.title}</h3>
                      <Badge variant="outline">{step.time}</Badge>
                    </div>
                    <p className="text-text-secondary">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="section-padding bg-gradient-subtle">
        <div className="container-padding text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
            Остались вопросы?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Наша служба поддержки поможет вам с выбором способа доставки и оплаты,
            ответит на все вопросы о заказе.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center justify-center gap-3 p-4 bg-surface rounded-lg">
              <Phone size={24} className="text-accent" />
              <div className="text-left">
                <div className="font-semibold text-text-primary">+7 (727) 123-45-67</div>
                <div className="text-sm text-text-secondary">Ежедневно 9:00 - 21:00</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-surface rounded-lg">
              <div className="text-center">
                <div className="font-semibold text-text-primary">info@ziggler.kz</div>
                <div className="text-sm text-text-secondary">Ответ в течение часа</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
