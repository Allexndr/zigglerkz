'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

// Mock cart data - in real app this would come from API/context
const mockCartItems = [
  {
    id: 1,
    productId: 1,
    name: 'Классический костюм Ermenegildo Zegna',
    price: 185000,
    image: 'https://images.unsplash.com/photo-1596702830007-710127761797?w=200&h=250&fit=crop',
    size: '48R',
    color: 'Темно-синий',
    quantity: 1,
    maxQuantity: 5
  },
  {
    id: 2,
    productId: 3,
    name: 'Повседневный костюм Canali',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1596702830007-710127761797?w=200&h=250&fit=crop',
    size: '50L',
    color: 'Серый',
    quantity: 2,
    maxQuantity: 3
  }
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.min(newQuantity, item.maxQuantity) }
          : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryCost = subtotal >= 100000 ? 0 : 5000
  const total = subtotal + deliveryCost

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background dark:bg-dark-background">
        <div className="container-padding py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-surface dark:bg-dark-surface rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-text-secondary dark:text-dark-text-secondary" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
              Ваша корзина пуста
            </h1>
            <p className="text-text-secondary dark:text-dark-text-secondary mb-8">
              Добавьте товары из нашего каталога, чтобы оформить заказ
            </p>
            <Link href="/catalog">
              <Button size="lg">
                Перейти в каталог
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      <div className="container-padding py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
            Корзина
          </h1>
          <p className="text-text-secondary dark:text-dark-text-secondary">
            {cartItems.length} {cartItems.length === 1 ? 'товар' : cartItems.length < 5 ? 'товара' : 'товаров'} в корзине
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <Card key={item.id} className="p-6">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-32 relative rounded-md overflow-hidden bg-surface dark:bg-dark-surface flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-1 line-clamp-2">
                      {item.name}
                    </h3>
                    <div className="text-sm text-text-secondary dark:text-dark-text-secondary space-y-1 mb-3">
                      <div>Размер: {item.size}</div>
                      <div>Цвет: {item.color}</div>
                      <div>Цена: {item.price.toLocaleString()} ₸</div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-border dark:border-dark-border rounded-md hover:border-accent transition-colors flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-border dark:border-dark-border rounded-md hover:border-accent transition-colors flex items-center justify-center"
                          disabled={item.quantity >= item.maxQuantity}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-accent">
                          {(item.price * item.quantity).toLocaleString()} ₸
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-8 h-8 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-end">
              <Button onClick={clearCart} variant="outline" className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                <Trash2 className="w-4 h-4 mr-2" />
                Очистить корзину
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
                Итого
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-text-secondary dark:text-dark-text-secondary">
                  <span>Подытог:</span>
                  <span>{subtotal.toLocaleString()} ₸</span>
                </div>

                <div className="flex justify-between text-text-secondary dark:text-dark-text-secondary">
                  <span>Доставка:</span>
                  <span className={deliveryCost === 0 ? 'text-green-600' : ''}>
                    {deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost.toLocaleString()} ₸`}
                  </span>
                </div>

                {deliveryCost > 0 && (
                  <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                    Бесплатная доставка при заказе от 100 000 ₸
                  </p>
                )}

                <hr className="border-border dark:border-dark-border" />

                <div className="flex justify-between text-xl font-bold text-text-primary dark:text-dark-text-primary">
                  <span>Итого:</span>
                  <span>{total.toLocaleString()} ₸</span>
                </div>
              </div>

              <Link href="/checkout" className="w-full">
                <Button className="w-full" size="lg">
                  Оформить заказ
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </Card>

            {/* Continue Shopping */}
            <Link href="/catalog">
              <Button variant="outline" className="w-full">
                Продолжить покупки
              </Button>
            </Link>

            {/* Delivery Info */}
            <Card className="p-6">
              <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-3">
                Информация о доставке
              </h3>
              <div className="space-y-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                <div>🚚 Доставка по Алматы: 1-2 дня</div>
                <div>📦 По Казахстану: 3-7 дней</div>
                <div>💳 Оплата при получении или онлайн</div>
                <div>🔄 Возврат в течение 14 дней</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
