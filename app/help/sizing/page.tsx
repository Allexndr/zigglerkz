'use client'

import { useState } from 'react'
import { Ruler, Camera, MessageCircle, Download } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

const sizeGuide = {
  measurements: [
    { name: 'Обхват груди', key: 'chest', description: 'Измерьте вокруг самой широкой части груди' },
    { name: 'Обхват талии', key: 'waist', description: 'Измерьте вокруг самой узкой части талии' },
    { name: 'Обхват бедер', key: 'hips', description: 'Измерьте вокруг самой широкой части бедер' },
    { name: 'Длина рукава', key: 'sleeve', description: 'От плечевого шва до запястья' },
    { name: 'Длина брюк', key: 'inseam', description: 'От паха до низа брюк по внутренней стороне' },
    { name: 'Обхват шеи', key: 'neck', description: 'Измерьте вокруг основания шеи' },
    { name: 'Длина пиджака', key: 'jacket_length', description: 'От плечевого шва до низа пиджака' }
  ],
  sizes: [
    {
      size: '44R',
      chest: '88-92',
      waist: '74-78',
      hips: '90-94',
      sleeve: '61-62',
      inseam: '76-78',
      neck: '37-38',
      jacket_length: '71-73'
    },
    {
      size: '46R',
      chest: '92-96',
      waist: '78-82',
      hips: '94-98',
      sleeve: '62-63',
      inseam: '78-80',
      neck: '38-39',
      jacket_length: '72-74'
    },
    {
      size: '48R',
      chest: '96-100',
      waist: '82-86',
      hips: '98-102',
      sleeve: '63-64',
      inseam: '80-82',
      neck: '39-40',
      jacket_length: '73-75'
    },
    {
      size: '50R',
      chest: '100-104',
      waist: '86-90',
      hips: '102-106',
      sleeve: '64-65',
      inseam: '82-84',
      neck: '40-41',
      jacket_length: '74-76'
    },
    {
      size: '52R',
      chest: '104-108',
      waist: '90-94',
      hips: '106-110',
      sleeve: '65-66',
      inseam: '84-86',
      neck: '41-42',
      jacket_length: '75-77'
    },
    {
      size: '54R',
      chest: '108-112',
      waist: '94-98',
      hips: '110-114',
      sleeve: '66-67',
      inseam: '86-88',
      neck: '42-43',
      jacket_length: '76-78'
    }
  ]
}

const measuringTips = [
  {
    title: 'Подготовка к измерениям',
    tips: [
      'Измерения лучше проводить утром',
      'Наденьте облегающую одежду или измеряйте без одежды',
      'Встаньте прямо, расслабьте плечи',
      'Используйте гибкую сантиметровую ленту',
      'Не затягивайте ленту слишком туго'
    ],
    icon: Ruler
  },
  {
    title: 'Точность измерений',
    tips: [
      'Измеряйте 2-3 раза и возьмите среднее значение',
      'Попросите помощи у другого человека',
      'Измеряйте обе стороны тела для точности',
      'Учитывайте осанку и тип фигуры',
      'Если между размерами - выбирайте больший'
    ],
    icon: Camera
  }
]

export default function SizingPage() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="section-padding bg-gradient-warm">
        <div className="container-padding text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Таблица размеров
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Правильно подобранный размер - залог комфорта и уверенности.
            Следуйте нашим рекомендациям по снятию мерок.
          </p>
        </div>
      </div>

      {/* Measuring Guide */}
      <div className="section-padding">
        <div className="container-padding">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 text-center">
            Как снять мерки
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {measuringTips.map((section, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4">
                    <section.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary">{section.title}</h3>
                </div>

                <ul className="space-y-3">
                  {section.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-text-secondary">{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {/* Measurement Points */}
          <Card className="p-8">
            <h3 className="text-xl font-semibold text-text-primary mb-6 text-center">
              Точки измерения
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sizeGuide.measurements.map((measurement, index) => (
                <div key={index} className="p-4 bg-surface rounded-lg">
                  <h4 className="font-medium text-text-primary mb-2">{measurement.name}</h4>
                  <p className="text-sm text-text-secondary">{measurement.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Size Chart */}
      <div className="section-padding bg-surface dark:bg-dark-surface">
        <div className="container-padding">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 text-center">
            Таблица размеров костюмов
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-background rounded-lg overflow-hidden">
              <thead className="bg-accent text-primary">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Размер</th>
                  <th className="px-4 py-3 text-left font-semibold">Грудь</th>
                  <th className="px-4 py-3 text-left font-semibold">Талия</th>
                  <th className="px-4 py-3 text-left font-semibold">Бедра</th>
                  <th className="px-4 py-3 text-left font-semibold">Рукав</th>
                  <th className="px-4 py-3 text-left font-semibold">Длина брюк</th>
                  <th className="px-4 py-3 text-left font-semibold">Шея</th>
                  <th className="px-4 py-3 text-left font-semibold">Длина пиджака</th>
                </tr>
              </thead>
              <tbody>
                {sizeGuide.sizes.map((size, index) => (
                  <tr
                    key={size.size}
                    className={`cursor-pointer transition-colors ${
                      selectedSize === size.size
                        ? 'bg-accent/10'
                        : index % 2 === 0 ? 'bg-surface' : 'bg-background'
                    } hover:bg-accent/5`}
                    onClick={() => setSelectedSize(selectedSize === size.size ? null : size.size)}
                  >
                    <td className="px-4 py-3 font-medium text-text-primary">
                      {size.size}
                      {selectedSize === size.size && (
                        <Badge className="ml-2 bg-accent text-primary">Выбран</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{size.chest} см</td>
                    <td className="px-4 py-3 text-text-secondary">{size.waist} см</td>
                    <td className="px-4 py-3 text-text-secondary">{size.hips} см</td>
                    <td className="px-4 py-3 text-text-secondary">{size.sleeve} см</td>
                    <td className="px-4 py-3 text-text-secondary">{size.inseam} см</td>
                    <td className="px-4 py-3 text-text-secondary">{size.neck} см</td>
                    <td className="px-4 py-3 text-text-secondary">{size.jacket_length} см</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary mb-4">
              Все размеры указаны в сантиметрах. Если ваши измерения находятся между размерами,
              рекомендуется выбрать больший размер.
            </p>
            <Button variant="outline" className="inline-flex items-center gap-2">
              <Download size={16} />
              Скачать таблицу PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Size Selection Help */}
      <div className="section-padding">
        <div className="container-padding">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                Как выбрать размер
              </h2>

              <div className="space-y-6">
                <div className="p-6 bg-surface rounded-lg">
                  <h3 className="font-semibold text-text-primary mb-3">Если вы покупаете впервые</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>• Снимите точные мерки по инструкции выше</li>
                    <li>• Сравните с таблицей размеров</li>
                    <li>• При сомнениях выбирайте больший размер</li>
                    <li>• Учитывайте, что костюм должен сидеть свободно</li>
                  </ul>
                </div>

                <div className="p-6 bg-surface rounded-lg">
                  <h3 className="font-semibold text-text-primary mb-3">Если у вас уже есть костюм</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>• Измерьте ваш любимый костюм</li>
                    <li>• Сравните с нашей таблицей</li>
                    <li>• Учитывайте тип ткани и посадку</li>
                    <li>• Шерстяные костюмы более эластичные</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                Персональная консультация
              </h2>

              <Card className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle size={32} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">
                    Нужна помощь с выбором размера?
                  </h3>
                  <p className="text-text-secondary text-sm">
                    Наши стилисты помогут подобрать идеальный размер
                    и ответят на все вопросы.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-primary text-sm font-semibold">1</span>
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">Бесплатная консультация</div>
                      <div className="text-sm text-text-secondary">Онлайн или по телефону</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-primary text-sm font-semibold">2</span>
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">Персональные рекомендации</div>
                      <div className="text-sm text-text-secondary">Учет типа фигуры и предпочтений</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-primary text-sm font-semibold">3</span>
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">Примерка в бутике</div>
                      <div className="text-sm text-text-secondary">Бесплатно с персональным стилистом</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Button className="w-full mobile-button">
                    Записаться на консультацию
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="section-padding bg-gradient-subtle">
        <div className="container-padding text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
            Не уверены в размере?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Посетите наш бутик для бесплатной примерки. Наши стилисты помогут
            подобрать идеальный размер и фасон костюма.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="mobile-button sm:px-8 sm:py-4 sm:text-lg">
              Записаться на примерку
            </Button>
            <Button variant="outline" size="lg" className="mobile-button sm:px-8 sm:py-4 sm:text-lg">
              Задать вопрос
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
