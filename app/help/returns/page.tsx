'use client'

import { RefreshCw, Shield, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const returnReasons = [
  {
    title: 'Не подошел размер',
    description: 'Костюм оказался мал или велик',
    accepted: true,
    conditions: 'Не носился, этикетки на месте'
  },
  {
    title: 'Не подошел цвет',
    description: 'Цвет отличается от ожидаемого',
    accepted: true,
    conditions: 'Не носился, в оригинальной упаковке'
  },
  {
    title: 'Не подошел фасон',
    description: 'Стиль или крой не соответствует ожиданиям',
    accepted: true,
    conditions: 'Не носился, все аксессуары прилагаются'
  },
  {
    title: 'Найден дешевле',
    description: 'Нашли аналогичный товар по более низкой цене',
    accepted: true,
    conditions: 'В течение 7 дней, предоставить доказательства'
  },
  {
    title: 'Брак или дефект',
    description: 'Обнаружен производственный брак',
    accepted: true,
    conditions: 'В любое время, предоставить фото дефекта'
  },
  {
    title: 'Не подошел по здоровью',
    description: 'Медицинские противопоказания к ношению',
    accepted: true,
    conditions: 'Предоставить медицинскую справку'
  }
]

const returnProcess = [
  {
    step: 1,
    title: 'Свяжитесь с нами',
    description: 'Позвоните или напишите нам о желании вернуть товар',
    time: 'В любое время',
    icon: CheckCircle
  },
  {
    step: 2,
    title: 'Получите подтверждение',
    description: 'Мы проверим условия возврата и подтвердим возможность',
    time: 'В течение 1 часа',
    icon: CheckCircle
  },
  {
    step: 3,
    title: 'Подготовьте товар',
    description: 'Упакуйте костюм в оригинальную упаковку с документами',
    time: 'В течение 3 дней',
    icon: RefreshCw
  },
  {
    step: 4,
    title: 'Курьер заберет товар',
    description: 'Мы организуем бесплатный забор товара',
    time: 'В удобное время',
    icon: RefreshCw
  },
  {
    step: 5,
    title: 'Возврат средств',
    description: 'Деньги вернутся на карту в течение 3-5 рабочих дней',
    time: '3-5 дней',
    icon: CheckCircle
  }
]

const faq = [
  {
    question: 'Какой срок для возврата товара?',
    answer: 'У вас есть 30 дней с момента получения товара для возврата. Для товаров со скидкой - 14 дней.'
  },
  {
    question: 'Нужно ли платить за возврат?',
    answer: 'Нет, возврат товара бесплатный. Мы организуем забор товара курьером и все расходы берем на себя.'
  },
  {
    question: 'В каком состоянии должен быть товар?',
    answer: 'Товар должен быть в новом состоянии, не носился, с этикетками и в оригинальной упаковке.'
  },
  {
    question: 'Можно ли обменять товар на другой?',
    answer: 'Да, вы можете обменять товар на другой размер, цвет или модель в течение 30 дней.'
  },
  {
    question: 'Как быстро вернутся деньги?',
    answer: 'При возврате на карту - 3-5 рабочих дней. При наличными при получении - моментально.'
  }
]

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="section-padding bg-gradient-warm">
        <div className="container-padding text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Возврат и обмен
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Мы гарантируем ваше полное удовлетворение от покупки.
            Правила возврата разработаны для вашего удобства.
          </p>
        </div>
      </div>

      {/* Return Conditions */}
      <div className="section-padding">
        <div className="container-padding">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
              Условия возврата
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Вы можете вернуть товар в течение 30 дней без объяснения причин.
              Мы стремимся сделать процесс максимально простым и удобным.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-white" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">30 дней на возврат</h3>
              <p className="text-sm text-text-secondary">Полный возврат средств без объяснения причин</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw size={32} className="text-primary" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Бесплатный возврат</h3>
              <p className="text-sm text-text-secondary">Мы забираем товар и все расходы на себя</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-white" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Гарантия качества</h3>
              <p className="text-sm text-text-secondary">Возврат при обнаружении брака в любое время</p>
            </Card>
          </div>

          <Card className="p-8">
            <h3 className="text-xl font-semibold text-text-primary mb-6 text-center">
              Причины для возврата
            </h3>
            <div className="grid gap-4">
              {returnReasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-surface rounded-lg">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    reason.accepted ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {reason.accepted ? (
                      <CheckCircle size={16} className="text-white" />
                    ) : (
                      <XCircle size={16} className="text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary mb-1">{reason.title}</h4>
                    <p className="text-sm text-text-secondary mb-2">{reason.description}</p>
                    <p className="text-xs text-accent">{reason.conditions}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Return Process */}
      <div className="section-padding bg-surface dark:bg-dark-surface">
        <div className="container-padding">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 text-center">
            Как оформить возврат
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              {returnProcess.map((step, index) => (
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
                  <div className="flex-shrink-0">
                    <step.icon size={24} className="text-accent" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="section-padding">
        <div className="container-padding">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 text-center">
            Часто задаваемые вопросы
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {faq.map((item, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold text-text-primary mb-3 flex items-start gap-3">
                  <AlertTriangle size={20} className="text-accent mt-0.5 flex-shrink-0" />
                  {item.question}
                </h3>
                <p className="text-text-secondary leading-relaxed">{item.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="section-padding bg-gradient-subtle">
        <div className="container-padding text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
            Нужна помощь с возвратом?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Наши специалисты помогут вам оформить возврат товара и ответят на все вопросы.
            Мы стремимся сделать процесс максимально удобным для вас.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center justify-center gap-3 p-4 bg-surface rounded-lg">
              <div className="text-center">
                <div className="font-semibold text-text-primary">+7 (727) 123-45-67</div>
                <div className="text-sm text-text-secondary">Поддержка возвратов</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-surface rounded-lg">
              <div className="text-center">
                <div className="font-semibold text-text-primary">returns@ziggler.kz</div>
                <div className="text-sm text-text-secondary">Онлайн заявка</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
