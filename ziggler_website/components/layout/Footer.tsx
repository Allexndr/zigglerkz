import Link from 'next/link'
import { Instagram, Facebook, MessageCircle, MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border dark:bg-dark-surface dark:border-dark-border">
      <div className="container-padding section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-accent">Ziggler</h3>
            <p className="text-text-secondary dark:text-dark-text-secondary">
              Премиум костюмы для уверенных мужчин. Качество, стиль и комфорт в каждой детали.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/ziggler_kz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com/ziggler_kz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://t.me/ziggler_kz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent transition-colors"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-text-primary dark:text-dark-text-primary">Каталог</h4>
            <div className="space-y-2">
              <Link href="/catalog?category=classic" className="block text-text-secondary hover:text-accent transition-colors">
                Классические костюмы
              </Link>
              <Link href="/catalog?category=slim" className="block text-text-secondary hover:text-accent transition-colors">
                Slim Fit
              </Link>
              <Link href="/catalog?category=casual" className="block text-text-secondary hover:text-accent transition-colors">
                Casual
              </Link>
              <Link href="/catalog?category=festive" className="block text-text-secondary hover:text-accent transition-colors">
                Праздничные
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold text-text-primary dark:text-dark-text-primary">Поддержка</h4>
            <div className="space-y-2">
              <Link href="/help/delivery" className="block text-text-secondary hover:text-accent transition-colors">
                Доставка и оплата
              </Link>
              <Link href="/help/returns" className="block text-text-secondary hover:text-accent transition-colors">
                Возврат и обмен
              </Link>
              <Link href="/help/sizing" className="block text-text-secondary hover:text-accent transition-colors">
                Таблица размеров
              </Link>
              <Link href="/help/care" className="block text-text-secondary hover:text-accent transition-colors">
                Уход за костюмами
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-text-primary dark:text-dark-text-primary">Контакты</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-text-secondary mt-0.5" />
                <div>
                  <p className="text-text-secondary dark:text-dark-text-secondary">
                    г. Алматы, ул. Центральная, 123
                  </p>
                  <p className="text-text-secondary dark:text-dark-text-secondary">
                    БЦ "Premium Plaza", 5 этаж
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-text-secondary" />
                <a
                  href="tel:+77271234567"
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  +7 (727) 123-45-67
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-text-secondary" />
                <a
                  href="mailto:info@ziggler.kz"
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  info@ziggler.kz
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border dark:border-dark-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-text-secondary dark:text-dark-text-secondary text-sm">
              © 2025 Ziggler.kz. Все права защищены.
            </div>

            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-text-secondary hover:text-accent transition-colors">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="text-text-secondary hover:text-accent transition-colors">
                Условия использования
              </Link>
              <Link href="/cookies" className="text-text-secondary hover:text-accent transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
