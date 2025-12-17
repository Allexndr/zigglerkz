'use client'

import { Shirt, Droplets, Wind, Shield, AlertTriangle, CheckCircle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const careTips = [
  {
    category: 'Шерстяные костюмы',
    icon: Shirt,
    tips: [
      'Чистите только у профессионалов',
      'Не стирайте в машине',
      'Храните на вешалке',
      'Используйте средства от моли',
      'Избегайте прямых солнечных лучей'
    ],
    frequency: '1-2 раза в сезон',
    cost: '3,000 - 8,000 ₸'
  },
  {
    category: 'Хлопковые костюмы',
    icon: Droplets,
    tips: [
      'Можно стирать при 30°C',
      'Используйте деликатный режим',
      'Гладьте с изнанки',
      'Сушите в тени',
      'Не используйте отбеливатель'
    ],
    frequency: 'После 5-10 носок',
    cost: '1,500 - 3,000 ₸'
  },
  {
    category: 'Льняные костюмы',
    icon: Wind,
    tips: [
      'Стирать в прохладной воде',
      'Не отжимать в машине',
      'Гладить влажными',
      'Хранить в сухом месте',
      'Избегать резких перепадов температуры'
    ],
    frequency: 'После каждой носки',
    cost: '2,000 - 4,000 ₸'
  }
]

const maintenanceSchedule = [
  {
    frequency: 'Ежедневно',
    tasks: [
      'Повесьте на вешалку после носки',
      'Проверьте на пятна',
      'Удалите пыль щеткой',
      'Проверьте пуговицы и швы'
    ],
    icon: CheckCircle
  },
  {
    frequency: 'Еженедельно',
    tasks: [
      'Почистите щеткой',
      'Проверьте на катышки',
      'Освежите паром',
      'Проверьте карманы'
    ],
    icon: Shield
  },
  {
    frequency: 'Ежемесячно',
    tasks: [
      'Профессиональная чистка',
      'Проверка подкладки',
      'Ремонт мелких дефектов',
      'Обновление подметок'
    ],
    icon: AlertTriangle
  }
]

const emergencyCare = [
  {
    problem: 'Пятно от вина или кофе',
    solution: 'Немедленно промокните салфеткой, не трите. Отнесите в химчистку.',
    urgency: 'Срочно'
  },
  {
    problem: 'Пятно от масла или жира',
    solution: 'Посыпьте тальком или крахмалом, оставьте на час, затем почистите.',
    urgency: 'В течение дня'
  },
  {
    problem: 'Пятно от травы или крови',
    solution: 'Замочите в холодной воде, затем в химчистку.',
    urgency: 'В течение 24 часов'
  },
  {
    problem: 'Разорванный шов',
    solution: 'Не носите костюм, отнесите к портному для ремонта.',
    urgency: 'Немедленно'
  },
  {
    problem: 'Потерянная пуговица',
    solution: 'Замените на аналогичную в ателье.',
    urgency: 'В ближайшее время'
  }
]

const storageTips = [
  'Храните в темном, сухом месте',
  'Используйте широкие вешалки',
  'Не храните в полиэтиленовых пакетах',
  'Регулярно проветривайте шкаф',
  'Используйте средства от моли',
  'Храните брюки сложенными',
  'Не вешайте тяжелые костюмы близко друг к другу'
]

export default function CarePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="section-padding bg-gradient-warm">
        <div className="container-padding text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Уход за костюмами
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Правильный уход за костюмом гарантирует его долголетие и сохранение презентабельного вида.
            Следуйте нашим рекомендациям для поддержания качества изделий.
          </p>
        </div>
      </div>

      {/* Care by Material */}
      <div className="section-padding">
        <div className="container-padding">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 text-center">
            Уход по типу ткани
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {careTips.map((material, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4">
                    <material.icon size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{material.category}</h3>
                    <p className="text-sm text-text-secondary">Частота: {material.frequency}</p>
                  </div>
                </div>

                <ul className="space-y-2 mb-4">
                  {material.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-text-secondary">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-border">
                  <div className="text-sm text-text-secondary">
                    Стоимость чистки: <span className="font-medium text-accent">{material.cost}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Maintenance Schedule */}
      <div className="section-padding bg-surface dark:bg-dark-surface">
        <div className="container-padding">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 text-center">
            График ухода
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {maintenanceSchedule.map((schedule, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <schedule.icon size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold text-text-primary mb-4">{schedule.frequency}</h3>

                <ul className="space-y-3 text-left">
                  {schedule.tasks.map((task, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-text-secondary">
                      <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Care */}
      <div className="section-padding">
        <div className="container-padding">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 text-center">
            Экстренная помощь
          </h2>

          <div className="grid gap-4 max-w-4xl mx-auto">
            {emergencyCare.map((emergency, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-3 h-3 rounded-full mt-2 ${
                    emergency.urgency === 'Срочно' ? 'bg-red-500' :
                    emergency.urgency === 'Немедленно' ? 'bg-red-600' : 'bg-yellow-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-text-primary">{emergency.problem}</h3>
                      <Badge variant={
                        emergency.urgency === 'Срочно' ? 'destructive' :
                        emergency.urgency === 'Немедленно' ? 'destructive' : 'secondary'
                      }>
                        {emergency.urgency}
                      </Badge>
                    </div>
                    <p className="text-text-secondary">{emergency.solution}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Storage Tips */}
      <div className="section-padding bg-surface dark:bg-dark-surface">
        <div className="container-padding">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                Хранение костюмов
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {storageTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-background rounded-lg">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-text-secondary">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                Профессиональный уход
              </h2>

              <Card className="p-6">
                <h3 className="font-semibold text-text-primary mb-4">
                  Рекомендуемые услуги
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-text-secondary">Химчистка шерстяного костюма</span>
                    <span className="font-medium text-accent">5,000 ₸</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-text-secondary">Паровая обработка</span>
                    <span className="font-medium text-accent">2,500 ₸</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-text-secondary">Ремонт мелких дефектов</span>
                    <span className="font-medium text-accent">1,500 ₸</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-text-secondary">Полный комплекс ухода</span>
                    <span className="font-medium text-accent">12,000 ₸</span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-text-secondary mb-4">
                    Все работы выполняются квалифицированными специалистами
                    с использованием профессионального оборудования.
                  </p>
                  <Button className="w-full mobile-button">
                    Записаться на прием
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Care Warranty */}
      <div className="section-padding">
        <div className="container-padding">
          <Card className="p-8 text-center">
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield size={40} className="text-primary" />
            </div>

            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Гарантия качества Ziggler
            </h2>

            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Мы гарантируем качество наших изделий и предоставляем полный комплекс услуг
              по уходу и обслуживанию костюмов. При соблюдении рекомендаций по уходу
              ваш костюм прослужит вам долгие годы.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div>
                <div className="text-2xl font-bold text-accent mb-2">5 лет</div>
                <div className="text-sm text-text-secondary">Гарантия на швы и фурнитуру</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-2">Бесплатно</div>
                <div className="text-sm text-text-secondary">Консультации по уходу</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-2">24/7</div>
                <div className="text-sm text-text-secondary">Поддержка клиентов</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* CTA */}
      <div className="section-padding bg-gradient-subtle">
        <div className="container-padding text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
            Нужен профессиональный уход?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Доверьте уход за своим костюмом профессионалам. Мы вернем вашему костюму
            первозданный вид и обеспечим долголетие.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="mobile-button sm:px-8 sm:py-4 sm:text-lg">
              Записаться в ателье
            </Button>
            <Button variant="outline" size="lg" className="mobile-button sm:px-8 sm:py-4 sm:text-lg">
              Получить консультацию
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
