'use client'

import { useState } from 'react'
import { User, Settings, Heart, ShoppingBag, MapPin, CreditCard, Bell, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { useTheme } from '@/components/providers/ThemeProvider'

const tabs = [
  { id: 'profile', label: 'Профиль', icon: User },
  { id: 'orders', label: 'Заказы', icon: ShoppingBag },
  { id: 'favorites', label: 'Избранное', icon: Heart },
  { id: 'addresses', label: 'Адреса', icon: MapPin },
  { id: 'payment', label: 'Оплата', icon: CreditCard },
  { id: 'notifications', label: 'Уведомления', icon: Bell },
  { id: 'security', label: 'Безопасность', icon: Shield },
]

export default function AccountPage() {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState('profile')
  const [profileData, setProfileData] = useState({
    firstName: 'Алексей',
    lastName: 'Иванов',
    email: 'alexey.ivanov@example.com',
    phone: '+7 (777) 123-45-67',
    birthDate: '1990-05-15'
  })

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <Card className="p-6">
            <h2 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-6">
              Личные данные
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                  Имя
                </label>
                <Input
                  value={profileData.firstName}
                  onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                  Фамилия
                </label>
                <Input
                  value={profileData.lastName}
                  onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleProfileUpdate('email', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                  Телефон
                </label>
                <Input
                  value={profileData.phone}
                  onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                  Дата рождения
                </label>
                <Input
                  type="date"
                  value={profileData.birthDate}
                  onChange={(e) => handleProfileUpdate('birthDate', e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Button>Сохранить изменения</Button>
              <Button variant="outline">Отмена</Button>
            </div>
          </Card>
        )

      case 'orders':
        return (
          <div className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-6">
                Мои заказы
              </h2>
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-text-secondary dark:text-dark-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary mb-2">
                  У вас пока нет заказов
                </h3>
                <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
                  Ваши будущие заказы будут отображаться здесь
                </p>
                <Button>Перейти в каталог</Button>
              </div>
            </Card>
          </div>
        )

      case 'favorites':
        return (
          <div className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-6">
                Избранные товары
              </h2>
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-text-secondary dark:text-dark-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary mb-2">
                  Список избранного пуст
                </h3>
                <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
                  Добавляйте товары в избранное, чтобы быстро найти их позже
                </p>
                <Button>Посмотреть каталог</Button>
              </div>
            </Card>
          </div>
        )

      case 'addresses':
        return (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">
                Адреса доставки
              </h2>
              <Button>Добавить адрес</Button>
            </div>
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-text-secondary dark:text-dark-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary mb-2">
                Нет сохраненных адресов
              </h3>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                Добавьте адреса для быстрого оформления заказов
              </p>
            </div>
          </Card>
        )

      case 'payment':
        return (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">
                Способы оплаты
              </h2>
              <Button>Добавить карту</Button>
            </div>
            <div className="text-center py-12">
              <CreditCard className="w-16 h-16 text-text-secondary dark:text-dark-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary mb-2">
                Нет сохраненных карт
              </h3>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                Сохраните данные карты для быстрой оплаты
              </p>
            </div>
          </Card>
        )

      case 'notifications':
        return (
          <Card className="p-6">
            <h2 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-6">
              Настройки уведомлений
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-text-primary dark:text-dark-text-primary">
                    Email уведомления
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    Получать уведомления о заказах и акциях
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/25 dark:peer-focus:ring-accent/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-accent"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-text-primary dark:text-dark-text-primary">
                    SMS уведомления
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    Получать SMS о статусе заказа
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/25 dark:peer-focus:ring-accent/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-accent"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-text-primary dark:text-dark-text-primary">
                    Push уведомления
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    Получать push уведомления в браузере
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/25 dark:peer-focus:ring-accent/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-accent"></div>
                </label>
              </div>
            </div>
          </Card>
        )

      case 'security':
        return (
          <Card className="p-6">
            <h2 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-6">
              Безопасность аккаунта
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-text-primary dark:text-dark-text-primary mb-2">
                  Изменить пароль
                </h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                      Текущий пароль
                    </label>
                    <Input type="password" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                      Новый пароль
                    </label>
                    <Input type="password" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-2">
                      Подтвердите новый пароль
                    </label>
                    <Input type="password" />
                  </div>
                  <Button>Изменить пароль</Button>
                </div>
              </div>

              <hr className="border-border dark:border-dark-border" />

              <div>
                <h3 className="font-medium text-text-primary dark:text-dark-text-primary mb-2">
                  Двухфакторная аутентификация
                </h3>
                <p className="text-text-secondary dark:text-dark-text-secondary mb-4">
                  Добавьте дополнительный уровень защиты для вашего аккаунта
                </p>
                <Button variant="outline">Включить 2FA</Button>
              </div>
            </div>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      <div className="container-padding py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-8">
            Личный кабинет
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-4">
                <nav className="space-y-2">
                  {tabs.map(tab => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                          activeTab === tab.id
                            ? 'bg-accent text-primary'
                            : 'text-text-primary dark:text-dark-text-primary hover:bg-surface dark:hover:bg-dark-surface'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
