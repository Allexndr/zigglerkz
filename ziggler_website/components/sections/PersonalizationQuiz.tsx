'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const questions = [
  {
    id: 1,
    question: 'Для какого случая вам нужен костюм?',
    options: [
      { value: 'business', label: 'Деловые встречи', emoji: '💼' },
      { value: 'wedding', label: 'Свадьба', emoji: '💒' },
      { value: 'graduation', label: 'Выпускной', emoji: '🎓' },
      { value: 'party', label: 'Праздник', emoji: '🎉' },
      { value: 'everyday', label: 'Повседневное использование', emoji: '👔' },
    ],
  },
  {
    id: 2,
    question: 'Какой у вас бюджет?',
    options: [
      { value: 'budget', label: 'До 50,000 ₸', emoji: '💰' },
      { value: 'medium', label: '50,000 - 100,000 ₸', emoji: '💵' },
      { value: 'premium', label: '100,000 - 200,000 ₸', emoji: '💎' },
      { value: 'luxury', label: 'Более 200,000 ₸', emoji: '🏆' },
    ],
  },
  {
    id: 3,
    question: 'Какой стиль посадки вы предпочитаете?',
    options: [
      { value: 'slim', label: 'Облегающий (Slim Fit)', emoji: '👖' },
      { value: 'regular', label: 'Классический (Regular)', emoji: '👔' },
      { value: 'loose', label: 'Свободный (Loose)', emoji: '👕' },
    ],
  },
  {
    id: 4,
    question: 'Какой цвет костюма вам нравится?',
    options: [
      { value: 'black', label: 'Чёрный', emoji: '⬛' },
      { value: 'navy', label: 'Тёмно-синий', emoji: '🔵' },
      { value: 'gray', label: 'Серый', emoji: '🔘' },
      { value: 'other', label: 'Другой цвет', emoji: '🌈' },
    ],
  },
  {
    id: 5,
    question: 'Какой у вас размер одежды?',
    options: [
      { value: 'xs', label: 'XS (42-44)', emoji: '📏' },
      { value: 's', label: 'S (44-46)', emoji: '📏' },
      { value: 'm', label: 'M (46-48)', emoji: '📏' },
      { value: 'l', label: 'L (48-50)', emoji: '📏' },
      { value: 'xl', label: 'XL (50-52)', emoji: '📏' },
      { value: 'xxl', label: 'XXL (52+)', emoji: '📏' },
    ],
  },
]

export function PersonalizationQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const router = useRouter()

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setIsCompleted(false)
  }

  const handleViewResults = () => {
    // Create query string from answers
    const queryParams = new URLSearchParams()
    Object.entries(answers).forEach(([key, value]) => {
      queryParams.append(`q${key}`, value)
    })

    router.push(`/catalog?personalized=true&${queryParams.toString()}`)
  }

  if (isCompleted) {
    return (
      <section id="personalization" className="mobile-padding sm:section-padding bg-surface dark:bg-dark-surface">
        <div className="container-padding">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl">🎯</span>
              </div>
              <h2 className="mobile-heading sm:text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-3 sm:mb-4">
                Персональные рекомендации готовы!
              </h2>
              <p className="mobile-text sm:text-base text-text-secondary dark:text-dark-text-secondary">
                На основе ваших ответов мы подобрали идеальные костюмы для вас
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-sm sm:max-w-none mx-auto">
              <div className="text-center p-3 sm:p-4 bg-background dark:bg-dark-background rounded-lg">
                <div className="text-xl sm:text-2xl mb-2">{answers[1] === 'business' ? '💼' : answers[1] === 'wedding' ? '💒' : '🎉'}</div>
                <div className="mobile-text sm:text-sm text-text-secondary dark:text-dark-text-secondary">Случай</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-background dark:bg-dark-background rounded-lg">
                <div className="text-xl sm:text-2xl mb-2">{answers[2] === 'luxury' ? '🏆' : answers[2] === 'premium' ? '💎' : '💰'}</div>
                <div className="mobile-text sm:text-sm text-text-secondary dark:text-dark-text-secondary">Бюджет</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-background dark:bg-dark-background rounded-lg">
                <div className="text-xl sm:text-2xl mb-2">{answers[5] === 'xs' ? '📏' : '👔'}</div>
                <div className="mobile-text sm:text-sm text-text-secondary dark:text-dark-text-secondary">Размер</div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Button onClick={handleViewResults} size="lg" className="mobile-button sm:px-8 sm:py-4 sm:text-lg w-full">
                Посмотреть рекомендации
              </Button>
              <Button onClick={handleRestart} variant="ghost" className="mobile-button w-full">
                Пройти заново
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const question = questions[currentQuestion]

  return (
    <section id="personalization" className="mobile-padding sm:section-padding bg-gradient-subtle dark:bg-dark-background">
      <div className="container-padding">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="mobile-heading sm:text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-3 sm:mb-4">
              Подберём идеальный костюм для вас
            </h2>
            <p className="mobile-text sm:text-base text-text-secondary dark:text-dark-text-secondary">
              Ответьте на 5 вопросов и получите персональные рекомендации
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-text-secondary dark:text-dark-text-secondary mb-2">
              <span>Вопрос {currentQuestion + 1} из {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-surface dark:bg-dark-surface rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <Card className="mobile-card sm:p-8">
            <h3 className="mobile-heading sm:text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-4 sm:mb-6 text-center">
              {question.question}
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-4 sm:mb-6">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(question.id, option.value)}
                  className="mobile-button sm:p-4 border border-border dark:border-dark-border rounded-lg hover:border-accent hover:bg-accent/5 dark:hover:bg-accent/5 transition-all duration-200 text-left touch-target"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl sm:text-2xl">{option.emoji}</span>
                    <span className="mobile-text sm:text-base text-text-primary dark:text-dark-text-primary">
                      {option.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {currentQuestion > 0 && (
              <Button onClick={handleBack} variant="ghost" className="mobile-button sm:w-auto">
                ← Назад
              </Button>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
