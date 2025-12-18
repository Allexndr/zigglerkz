// Сервисы для работы с ботом в Next.js API routes

export interface Product {
  _id: string
  name: string
  price: number
  images: string[]
  sizes?: string[]
  colors?: Array<{name: string, hex: string}>
  category: string
  description?: string
}

export interface CartItem {
  productId: string
  product: Product
  size: string
  color: string
  quantity: number
  price: number
  totalPrice: number
}

// Имитация работы с MongoDB для демонстрации
// В реальном приложении здесь будут реальные запросы к БД
export class BotDatabaseService {
  static async getProducts(category?: string, limit: number = 5, skip: number = 0) {
    // Имитация данных - в реальности здесь будет запрос к MongoDB
    const mockProducts: Product[] = [
      {
        _id: "1",
        name: "Классический костюм Ermenegildo Zegna",
        price: 185000,
        images: ["https://images.unsplash.com/photo-1596702830007-710127761797?w=300&h=400&fit=crop"],
        sizes: ["46S", "48R", "50L", "52XL"],
        colors: [
          { name: "Темно-синий", hex: "#1e3a8a" },
          { name: "Серый", hex: "#6b7280" }
        ],
        category: "classic",
        description: "Роскошный классический костюм от итальянского бренда Ermenegildo Zegna"
      },
      {
        _id: "2",
        name: "Slim Fit костюм Hugo Boss",
        price: 125000,
        images: ["https://images.unsplash.com/photo-1555069519-127aadedf1f3?w=300&h=400&fit=crop"],
        sizes: ["44S", "46S", "48R", "50L"],
        colors: [
          { name: "Черный", hex: "#000000" },
          { name: "Темно-синий", hex: "#1e3a8a" }
        ],
        category: "slim",
        description: "Современный Slim Fit костюм от Hugo Boss"
      }
    ]

    const filtered = category ? mockProducts.filter(p => p.category === category) : mockProducts
    return {
      products: filtered.slice(skip, skip + limit),
      total: filtered.length,
      hasMore: (skip + limit) < filtered.length
    }
  }

  static async getProductById(productId: string): Promise<Product | null> {
    const result = await this.getProducts()
    return result.products.find(p => p._id === productId) || null
  }

  static async addToCart(userId: string, productId: string, size: string, color: string, quantity: number = 1) {
    // Имитация добавления в корзину
    const product = await this.getProductById(productId)
    if (!product) throw new Error("Product not found")

    const cartItem: CartItem = {
      productId,
      product,
      size,
      color,
      quantity,
      price: product.price,
      totalPrice: product.price * quantity
    }

    return {
      ...cartItem,
      totalItems: quantity
    }
  }
}
