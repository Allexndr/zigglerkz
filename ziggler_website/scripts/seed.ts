import { connectToDatabase } from '../lib/mongodb'
import { Product, Category, User, Review } from '../types/database'
import { ObjectId } from 'mongodb'

async function seedDatabase() {
  const { db } = await connectToDatabase()

  console.log('🌱 Начинаем заполнение базы данных...')

  // Clear existing data
  await db.collection('products').deleteMany({})
  await db.collection('categories').deleteMany({})
  await db.collection('users').deleteMany({})
  await db.collection('reviews').deleteMany({})

  console.log('🧹 Очистили существующие данные')

  // Create categories
  const categories = [
    {
      name: 'Классические костюмы',
      slug: 'classic',
      description: 'Вневременная элегантность для деловых встреч',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      sortOrder: 1,
      isActive: true,
      children: [],
      seo: {
        title: 'Классические костюмы',
        description: 'Купить классические мужские костюмы в Алматы',
        keywords: ['классические костюмы', 'мужские костюмы', 'бизнес костюмы']
      }
    },
    {
      name: 'Slim Fit костюмы',
      slug: 'slim-fit',
      description: 'Современный крой для уверенных мужчин',
      image: 'https://images.unsplash.com/photo-1506629905607-9b9f09b09124?w=400&h=300&fit=crop',
      sortOrder: 2,
      isActive: true,
      children: [],
      seo: {
        title: 'Slim Fit костюмы',
        description: 'Купить slim fit костюмы в Алматы',
        keywords: ['slim fit костюмы', 'облегающие костюмы', 'модные костюмы']
      }
    },
    {
      name: 'Праздничные костюмы',
      slug: 'festive',
      description: 'Роскошные модели для особых случаев',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
      sortOrder: 3,
      isActive: true,
      children: [],
      seo: {
        title: 'Праздничные костюмы',
        description: 'Купить праздничные костюмы в Алматы',
        keywords: ['праздничные костюмы', 'свадебные костюмы', 'торжественные костюмы']
      }
    },
    {
      name: 'Casual костюмы',
      slug: 'casual',
      description: 'Стильные повседневные костюмы',
      image: 'https://images.unsplash.com/photo-1506629905607-997823df6e2e?w=400&h=300&fit=crop',
      sortOrder: 4,
      isActive: true,
      children: [],
      seo: {
        title: 'Casual костюмы',
        description: 'Купить casual костюмы в Алматы',
        keywords: ['casual костюмы', 'повседневные костюмы', 'неформальные костюмы']
      }
    }
  ]

  const categoryResults = await db.collection('categories').insertMany(
    categories.map(cat => ({
      ...cat,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
  )

  console.log(`📂 Создано ${categories.length} категорий`)

  // Create products
  const products: Omit<Product, '_id'>[] = [
    {
      name: 'Классический костюм Hugo Boss',
      description: 'Элегантный костюм из шерсти высшего качества. Идеален для деловых встреч и официальных мероприятий.',
      price: 85000,
      originalPrice: 95000,
      discount: 10,
      category: 'Классические костюмы',
      brand: 'Hugo Boss',
      images: [
        {
          id: '1',
          url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop',
          alt: 'Классический костюм Hugo Boss',
          isPrimary: true,
          sortOrder: 1
        },
        {
          id: '2',
          url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop',
          alt: 'Классический костюм Hugo Boss вид сзади',
          isPrimary: false,
          sortOrder: 2
        }
      ],
      sizes: [
        { id: '1', name: '48', value: '48', inStock: true, stockQuantity: 5 },
        { id: '2', name: '50', value: '50', inStock: true, stockQuantity: 3 },
        { id: '3', name: '52', value: '52', inStock: true, stockQuantity: 7 },
        { id: '4', name: '54', value: '54', inStock: false, stockQuantity: 0 }
      ],
      colors: [
        { id: '1', name: 'Черный', hexCode: '#000000', inStock: true, images: [] },
        { id: '2', name: 'Темно-синий', hexCode: '#1e3a8a', inStock: true, images: [] },
        { id: '3', name: 'Серый', hexCode: '#6b7280', inStock: true, images: [] }
      ],
      materials: ['Шерсть 100%', 'Вискоза', 'Эластан'],
      careInstructions: [
        'Химчистка только',
        'Не стирать',
        'Гладить при низкой температуре'
      ],
      features: [
        'Полностью подкладка',
        'Две шлицы сзади',
        'Итальянские пуговицы'
      ],
      inStock: true,
      stockQuantity: 15,
      rating: 4.8,
      reviewCount: 24,
      tags: ['классика', 'бизнес', 'Hugo Boss', 'шерсть'],
      isActive: true,
      weight: 1.2,
      dimensions: { length: 80, width: 60, height: 5 },
      seo: {
        title: 'Классический костюм Hugo Boss',
        description: 'Купить классический костюм Hugo Boss в Алматы',
        keywords: ['Hugo Boss', 'классический костюм', 'мужской костюм']
      }
    },
    {
      name: 'Slim Fit костюм Ermenegildo Zegna',
      description: 'Современный костюм с облегающим кроем из премиум итальянской шерсти.',
      price: 120000,
      category: 'Slim Fit костюмы',
      brand: 'Ermenegildo Zegna',
      images: [
        {
          id: '1',
          url: 'https://images.unsplash.com/photo-1506629905607-9b9f09b09124?w=600&h=800&fit=crop',
          alt: 'Slim Fit костюм Ermenegildo Zegna',
          isPrimary: true,
          sortOrder: 1
        }
      ],
      sizes: [
        { id: '1', name: '46', value: '46', inStock: true, stockQuantity: 2 },
        { id: '2', name: '48', value: '48', inStock: true, stockQuantity: 4 },
        { id: '3', name: '50', value: '50', inStock: true, stockQuantity: 3 }
      ],
      colors: [
        { id: '1', name: 'Нavy', hexCode: '#1e40af', inStock: true, images: [] },
        { id: '2', name: 'Серый', hexCode: '#4b5563', inStock: true, images: [] }
      ],
      materials: ['Шерсть Super 120s', 'Кашемир'],
      careInstructions: ['Профессиональная химчистка'],
      features: ['Облегающий крой', 'Без подкладки', 'Легкий вес'],
      inStock: true,
      stockQuantity: 9,
      rating: 4.9,
      reviewCount: 15,
      tags: ['slim fit', 'Zegna', 'премиум'],
      isActive: true,
      seo: {
        title: 'Slim Fit костюм Ermenegildo Zegna',
        description: 'Купить slim fit костюм Zegna в Алматы',
        keywords: ['Zegna', 'slim fit', 'итальянский костюм']
      }
    },
    {
      name: 'Праздничный костюм Brioni',
      description: 'Роскошный костюм для особых случаев из редкой шерсти vicuna.',
      price: 250000,
      category: 'Праздничные костюмы',
      brand: 'Brioni',
      images: [
        {
          id: '1',
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop',
          alt: 'Праздничный костюм Brioni',
          isPrimary: true,
          sortOrder: 1
        }
      ],
      sizes: [
        { id: '1', name: '48', value: '48', inStock: true, stockQuantity: 1 },
        { id: '2', name: '50', value: '50', inStock: true, stockQuantity: 1 },
        { id: '3', name: '52', value: '52', inStock: false, stockQuantity: 0 }
      ],
      colors: [
        { id: '1', name: 'Черный', hexCode: '#000000', inStock: true, images: [] },
        { id: '2', name: 'Бордовый', hexCode: '#7f1d1d', inStock: true, images: [] }
      ],
      materials: ['Вискоза', 'Шелк', 'Vicuna шерсть'],
      careInstructions: ['Сухая чистка только'],
      features: ['Ручная работа', 'Премиум фурнитура', 'Итальянский пошив'],
      inStock: true,
      stockQuantity: 2,
      rating: 5.0,
      reviewCount: 8,
      tags: ['праздничный', 'Brioni', 'люкс'],
      isActive: true,
      seo: {
        title: 'Праздничный костюм Brioni',
        description: 'Купить праздничный костюм Brioni в Алматы',
        keywords: ['Brioni', 'праздничный костюм', 'люксовый костюм']
      }
    },
    {
      name: 'Casual костюм Canali',
      description: 'Стильный повседневный костюм из мягкой шерсти с современным кроем.',
      price: 65000,
      category: 'Casual костюмы',
      brand: 'Canali',
      images: [
        {
          id: '1',
          url: 'https://images.unsplash.com/photo-1506629905607-997823df6e2e?w=600&h=800&fit=crop',
          alt: 'Casual костюм Canali',
          isPrimary: true,
          sortOrder: 1
        }
      ],
      sizes: [
        { id: '1', name: '46', value: '46', inStock: true, stockQuantity: 4 },
        { id: '2', name: '48', value: '48', inStock: true, stockQuantity: 6 },
        { id: '3', name: '50', value: '50', inStock: true, stockQuantity: 3 }
      ],
      colors: [
        { id: '1', name: 'Бежевый', hexCode: '#d4a574', inStock: true, images: [] },
        { id: '2', name: 'Оливковый', hexCode: '#4d7c0f', inStock: true, images: [] }
      ],
      materials: ['Шерсть', 'Хлопок'],
      careInstructions: ['Машинная стирка при 30°C'],
      features: ['Повседневный крой', 'Мягкая ткань', 'Комфортная посадка'],
      inStock: true,
      stockQuantity: 13,
      rating: 4.6,
      reviewCount: 19,
      tags: ['casual', 'Canali', 'повседневный'],
      isActive: true,
      seo: {
        title: 'Casual костюм Canali',
        description: 'Купить casual костюм Canali в Алматы',
        keywords: ['Canali', 'casual костюм', 'повседневный костюм']
      }
    }
  ]

  await db.collection('products').insertMany(
    products.map(product => ({
      ...product,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
  )

  console.log(`👔 Создано ${products.length} товаров`)

  // Create sample user
  const sampleUser: Omit<User, '_id'> = {
    telegramId: 123456789,
    username: 'testuser',
    fullName: 'Тестовый Пользователь',
    email: 'test@example.com',
    phone: '+7 777 123 45 67',
    language: 'ru',
    notificationsEnabled: true,
    addresses: [
      {
        id: '1',
        type: 'home',
        name: 'Дом',
        street: 'ул. Абая, 123',
        city: 'Алматы',
        postalCode: '050000',
        country: 'Казахстан',
        isDefault: true
      }
    ],
    preferences: {
      sizes: ['48', '50'],
      colors: ['Черный', 'Темно-синий'],
      priceRange: { min: 50000, max: 150000 },
      categories: ['Классические костюмы', 'Slim Fit костюмы']
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }

  await db.collection('users').insertOne(sampleUser)
  console.log('👤 Создан тестовый пользователь')

  // Create sample reviews
  const reviews: Omit<Review, '_id'>[] = [
    {
      productId: new ObjectId(), // Will be set after products are inserted
      userId: new ObjectId(), // Will be set after user is inserted
      userName: 'Алексей Иванов',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      title: 'Отличный костюм!',
      comment: 'Качество на высшем уровне. Ткань премиум класса, посадка идеальная. Рекомендую!',
      images: [],
      isVerified: true,
      helpful: 12,
      notHelpful: 0,
      isApproved: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  await db.collection('reviews').insertMany(reviews)
  console.log(`⭐ Создано ${reviews.length} отзывов`)

  console.log('✅ База данных успешно заполнена тестовыми данными!')
}

// Run the seed
seedDatabase().catch(console.error)
