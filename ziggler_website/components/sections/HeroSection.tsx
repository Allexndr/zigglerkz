'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const heroSlides = [
  {
    id: 1,
    title: 'Идеальный костюм для вашего стиля',
    subtitle: 'Премиум качество. Доступные цены. Быстрая доставка',
    image: '/hero-1.jpg',
    cta: 'Смотреть каталог',
    ctaLink: '/catalog',
  },
  {
    id: 2,
    title: 'Эксклюзивная коллекция 2025',
    subtitle: 'Итальянские ткани. Корейское производство. Казахстанское качество',
    image: '/hero-2.jpg',
    cta: 'Узнать больше',
    ctaLink: '/collections/exclusive-2025',
  },
  {
    id: 3,
    title: 'Персональный подбор стиля',
    subtitle: 'Ответьте на 5 вопросов и получите рекомендации от нашего стилиста',
    image: '/hero-3.jpg',
    cta: 'Подобрать костюм',
    ctaLink: '#personalization',
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
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
              filter: 'brightness(0.4)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
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
      <div className="relative z-10 container-padding">
        <div className="max-w-2xl">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {heroSlides[currentSlide].subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={heroSlides[currentSlide].ctaLink}>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary px-8 py-4 text-lg">
                  {heroSlides[currentSlide].cta}
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => setIsVideoPlaying(true)}
                className="px-8 py-4 text-lg"
              >
                <Play size={20} className="mr-2" />
                Смотреть видео
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8 text-white/80">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent">500+</div>
              <div className="text-sm md:text-base">Довольных клиентов</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent">50+</div>
              <div className="text-sm md:text-base">Моделей костюмов</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent">24/7</div>
              <div className="text-sm md:text-base">Поддержка</div>
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
