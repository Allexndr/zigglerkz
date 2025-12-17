import { ObjectId } from 'mongodb'
import { connectToDatabase } from '../mongodb'
import { Product, ProductView } from '../../types/database'

export class ProductService {
  static async getAllProducts(options: {
    category?: string
    limit?: number
    skip?: number
    sortBy?: 'price' | 'rating' | 'newest' | 'popular'
    sortOrder?: 'asc' | 'desc'
    minPrice?: number
    maxPrice?: number
    sizes?: string[]
    colors?: string[]
    inStock?: boolean
  } = {}) {
    const { db } = await connectToDatabase()

    let query: any = { isActive: true }

    if (options.category) {
      query.category = options.category
    }

    if (options.minPrice !== undefined || options.maxPrice !== undefined) {
      query.price = {}
      if (options.minPrice !== undefined) query.price.$gte = options.minPrice
      if (options.maxPrice !== undefined) query.price.$lte = options.maxPrice
    }

    if (options.sizes && options.sizes.length > 0) {
      query['sizes.name'] = { $in: options.sizes }
    }

    if (options.colors && options.colors.length > 0) {
      query['colors.name'] = { $in: options.colors }
    }

    if (options.inStock !== undefined) {
      query.inStock = options.inStock
    }

    let sort: any = {}
    const sortOrder = options.sortOrder === 'desc' ? -1 : 1

    switch (options.sortBy) {
      case 'price':
        sort.price = sortOrder
        break
      case 'rating':
        sort.rating = sortOrder
        break
      case 'newest':
        sort.createdAt = -1
        break
      case 'popular':
        sort.rating = -1
        break
      default:
        sort.createdAt = -1
    }

    const products = await db
      .collection('products')
      .find(query)
      .sort(sort)
      .skip(options.skip || 0)
      .limit(options.limit || 20)
      .toArray()

    const total = await db.collection('products').countDocuments(query)

    return {
      products: products as Product[],
      total,
      hasMore: (options.skip || 0) + (options.limit || 20) < total
    }
  }

  static async getProductById(id: string) {
    const { db } = await connectToDatabase()
    const product = await db.collection('products').findOne({
      _id: new ObjectId(id),
      isActive: true
    })
    return product as Product | null
  }

  static async getProductsByIds(ids: string[]) {
    const { db } = await connectToDatabase()
    const objectIds = ids.map(id => new ObjectId(id))
    const products = await db
      .collection('products')
      .find({
        _id: { $in: objectIds },
        isActive: true
      })
      .toArray()
    return products as Product[]
  }

  static async getCategories() {
    const { db } = await connectToDatabase()
    const categories = await db
      .collection('categories')
      .find({ isActive: true })
      .sort({ sortOrder: 1 })
      .toArray()
    return categories
  }

  static async searchProducts(query: string, options: {
    limit?: number
    category?: string
  } = {}) {
    const { db } = await connectToDatabase()

    const searchQuery: any = {
      isActive: true,
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } },
        { category: { $regex: query, $options: 'i' } }
      ]
    }

    if (options.category) {
      searchQuery.category = options.category
    }

    const products = await db
      .collection('products')
      .find(searchQuery)
      .limit(options.limit || 20)
      .toArray()

    return products as Product[]
  }

  static async recordProductView(productId: string, userId?: string, sessionId?: string, source: string = 'website') {
    const { db } = await connectToDatabase()

    const view: Omit<ProductView, '_id'> = {
      productId: new ObjectId(productId),
      userId: userId ? new ObjectId(userId) : undefined,
      sessionId: sessionId || 'anonymous',
      viewedAt: new Date(),
      source: source as any
    }

    await db.collection('productViews').insertOne(view)
  }

  static async getRecommendedProducts(userId?: string, category?: string, limit: number = 6) {
    const { db } = await connectToDatabase()

    // Simple recommendation logic - products from same category with high rating
    let query: any = { isActive: true, rating: { $gte: 4.0 } }

    if (category) {
      query.category = category
    }

    const products = await db
      .collection('products')
      .find(query)
      .sort({ rating: -1, reviewCount: -1 })
      .limit(limit)
      .toArray()

    return products as Product[]
  }
}
