'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const heroSlides = [
  {
    id: 1,
    title: 'Элегантный бутик мужской одежды',
    subtitle: 'Премиум костюмы ручной работы в классическом стиле',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&h=800&fit=crop',
    cta: 'Смотреть коллекцию',
    ctaLink: '/catalog',
  },
  {
    id: 2,
    title: 'Современный showroom костюмов',
    subtitle: 'Эксклюзивные модели от ведущих итальянских дизайнеров',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=800&fit=crop',
    cta: 'Посмотреть бутик',
    ctaLink: '/about',
  },
  {
    id: 3,
    title: 'Премиум примерочная с персональным стилистом',
    subtitle: 'Индивидуальный подбор костюма под вашу фигуру и стиль',
    image: 'https://images.unsplash.com/photo-1506629905607-9b9f09b09124?w=1200&h=800&fit=crop',
    cta: 'Записаться на примерку',
    ctaLink: '#personalization',
  },
  {
    id: 4,
    title: 'Коллекция эксклюзивных аксессуаров',
    subtitle: 'Галстуки, запонки и ремни от мировых брендов',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=1200&h=800&fit=crop',
    cta: 'Посмотреть аксессуары',
    ctaLink: '/accessories',
  },
  {
    id: 5,
    title: 'Свадебные костюмы на заказ',
    subtitle: 'Идеальный образ для вашего особого дня',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop',
    cta: 'Создать образ',
    ctaLink: '/wedding-collection',
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000) // Увеличено до 6 секунд для лучшего просмотра бутиков

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative min-h-[85vh] sm:h-screen flex items-center overflow-hidden">
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
              filter: 'brightness(0.5) contrast(0.9)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
        </div>
      ))}

      {/* Video Overlay */}
      {isVideoPlaying && (
        <div className="absolute inset-0 z-20 bg-black/80 flex items-center justify-center">
          <div className="w-full max-w-4xl aspect-video bg-black rounded-lg">
            {/* Video player would go here */}
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <Play size={48} className="mx-auto mb-4" />
                <p>Видео презентация коллекции</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsVideoPlaying(false)}
            className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container-padding py-8 sm:py-12">
        <div className="max-w-2xl mx-auto sm:mx-0">
          <div className="animate-fade-in">
            <h1 className="mobile-heading sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight text-center sm:text-left">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="mobile-text sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed text-center sm:text-left max-w-lg mx-auto sm:mx-0">
              {heroSlides[currentSlide].subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start">
              <Link href={heroSlides[currentSlide].ctaLink}>
                <Button size="lg" className="mobile-button sm:px-8 sm:py-4 sm:text-lg bg-accent hover:bg-accent/90 text-primary w-full sm:w-auto justify-center">
                  {heroSlides[currentSlide].cta}
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => setIsVideoPlaying(true)}
                className="mobile-button sm:px-8 sm:py-4 sm:text-lg w-full sm:w-auto justify-center"
              >
                <Play size={18} className="mr-2" />
                Смотреть видео
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-8 text-white/80 max-w-md mx-auto sm:mx-0 sm:max-w-none">
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-accent">500+</div>
              <div className="mobile-text sm:text-sm md:text-base">Довольных клиентов</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-accent">50+</div>
              <div className="mobile-text sm:text-sm md:text-base">Моделей костюмов</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-accent">24/7</div>
              <div className="mobile-text sm:text-sm md:text-base">Поддержка</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-accent' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <div className="animate-bounce-subtle">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200"
      >
        →
      </button>
    </section>
  )
}
