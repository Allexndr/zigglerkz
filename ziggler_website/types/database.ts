import { ObjectId } from 'mongodb'

// Base types
export interface BaseDocument {
  _id?: ObjectId
  createdAt: Date
  updatedAt: Date
}

// User types
export interface User extends BaseDocument {
  telegramId?: number
  email?: string
  fullName?: string
  phone?: string
  language: 'ru' | 'en' | 'kz'
  notificationsEnabled: boolean
  avatar?: string
  addresses?: Address[]
  preferences?: UserPreferences
}

export interface Address {
  id: string
  type: 'home' | 'work' | 'other'
  name: string
  street: string
  city: string
  postalCode: string
  country: string
  isDefault: boolean
}

export interface UserPreferences {
  sizes: string[]
  colors: string[]
  priceRange: {
    min: number
    max: number
  }
  categories: string[]
}

// Product types
export interface Product extends BaseDocument {
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  category: string
  subcategory?: string
  brand: string
  images: ProductImage[]
  sizes: ProductSize[]
  colors: ProductColor[]
  materials: string[]
  careInstructions: string[]
  features: string[]
  inStock: boolean
  stockQuantity: number
  rating: number
  reviewCount: number
  tags: string[]
  isActive: boolean
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
  sortOrder: number
}

export interface ProductSize {
  id: string
  name: string
  value: string
  inStock: boolean
  stockQuantity: number
}

export interface ProductColor {
  id: string
  name: string
  hexCode: string
  inStock: boolean
  images: string[]
}

// Cart types
export interface Cart extends BaseDocument {
  userId?: ObjectId
  sessionId?: string
  items: CartItem[]
  totalPrice: number
  totalItems: number
  expiresAt: Date
}

export interface CartItem {
  productId: ObjectId
  product: Product // Embedded for performance
  size: string
  color: string
  quantity: number
  price: number
  totalPrice: number
  addedAt: Date
}

// Order types
export interface Order extends BaseDocument {
  orderNumber: string
  userId?: ObjectId
  customerInfo: CustomerInfo
  items: OrderItem[]
  shippingAddress: Address
  billingAddress?: Address
  paymentMethod: PaymentMethod
  paymentStatus: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned'
  subtotal: number
  shippingCost: number
  tax: number
  discount: number
  total: number
  notes?: string
  trackingNumber?: string
  estimatedDelivery?: Date
  deliveredAt?: Date
}

export interface CustomerInfo {
  fullName: string
  email: string
  phone: string
}

export interface OrderItem {
  productId: ObjectId
  product: Product // Embedded for historical data
  size: string
  color: string
  quantity: number
  price: number
  totalPrice: number
}

export interface PaymentMethod {
  type: 'card' | 'cash' | 'bank_transfer'
  provider?: string
  last4?: string
  expiryMonth?: number
  expiryYear?: number
}

// Review types
export interface Review extends BaseDocument {
  productId: ObjectId
  userId: ObjectId
  userName: string
  userAvatar?: string
  rating: number
  title: string
  comment: string
  images?: string[]
  isVerified: boolean
  helpful: number
  notHelpful: number
  isApproved: boolean
}

// Category types
export interface Category extends BaseDocument {
  name: string
  slug: string
  description: string
  image: string
  parentId?: ObjectId
  children: ObjectId[]
  sortOrder: number
  isActive: boolean
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

// Wishlist types
export interface Wishlist extends BaseDocument {
  userId: ObjectId
  name: string
  items: WishlistItem[]
  isPublic: boolean
  shareToken?: string
}

export interface WishlistItem {
  productId: ObjectId
  product: Product // Embedded
  addedAt: Date
}

// Notification types
export interface Notification extends BaseDocument {
  userId: ObjectId
  type: 'order' | 'promotion' | 'review' | 'system'
  title: string
  message: string
  isRead: boolean
  readAt?: Date
  actionUrl?: string
  expiresAt?: Date
}

// Analytics types
export interface ProductView extends BaseDocument {
  productId: ObjectId
  userId?: ObjectId
  sessionId: string
  viewedAt: Date
  source: 'website' | 'telegram_bot' | 'search' | 'recommendation'
  referrer?: string
}

export interface SearchQuery extends BaseDocument {
  query: string
  userId?: ObjectId
  sessionId: string
  resultsCount: number
  clickedProductId?: ObjectId
  searchedAt: Date
  filters?: {
    category?: string
    priceRange?: { min: number; max: number }
    sizes?: string[]
    colors?: string[]
  }
}
