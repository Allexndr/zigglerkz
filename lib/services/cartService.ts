import { ObjectId } from 'mongodb'
import { connectToDatabase } from '../mongodb'
import { Cart, CartItem, Product } from '../../types/database'
import { ProductService } from './productService'

export class CartService {
  static async getCart(userId?: string, sessionId?: string): Promise<Cart | null> {
    const { db } = await connectToDatabase()

    const query: any = {}
    if (userId) {
      query.userId = new ObjectId(userId)
    } else if (sessionId) {
      query.sessionId = sessionId
    } else {
      return null
    }

    // Remove expired carts
    await db.collection('carts').deleteMany({
      expiresAt: { $lt: new Date() }
    })

    const cart = await db.collection('carts').findOne(query)

    if (!cart) {
      // Create empty cart
      const newCart: Omit<Cart, '_id'> = {
        userId: userId ? new ObjectId(userId) : undefined,
        sessionId,
        items: [],
        totalPrice: 0,
        totalItems: 0,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        createdAt: new Date(),
        updatedAt: new Date()
      }
      const result = await db.collection('carts').insertOne(newCart)
      return {
        ...newCart,
        _id: result.insertedId
      } as Cart
    }

    return cart as Cart
  }

  static async addToCart(
    productId: string,
    size: string,
    color: string,
    quantity: number,
    userId?: string,
    sessionId?: string
  ): Promise<Cart> {
    const cart = await this.getCart(userId, sessionId)
    if (!cart) {
      throw new Error('Cart not found')
    }

    const { db } = await connectToDatabase()
    const product = await ProductService.getProductById(productId)

    if (!product) {
      throw new Error('Product not found')
    }

    // Check if product is in stock
    const selectedSize = product.sizes.find(s => s.name === size)
    const selectedColor = product.colors.find(c => c.name === color)

    if (!selectedSize || !selectedColor) {
      throw new Error('Invalid size or color')
    }

    if (!selectedSize.inStock || !selectedColor.inStock) {
      throw new Error('Product out of stock')
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId &&
               item.size === size &&
               item.color === color
    )

    if (existingItemIndex >= 0) {
      // Update existing item
      cart.items[existingItemIndex].quantity += quantity
      cart.items[existingItemIndex].totalPrice = cart.items[existingItemIndex].quantity * cart.items[existingItemIndex].price
    } else {
      // Add new item
      const cartItem: CartItem = {
        productId: new ObjectId(productId),
        product,
        size,
        color,
        quantity,
        price: product.price,
        totalPrice: product.price * quantity,
        addedAt: new Date()
      }
      cart.items.push(cartItem)
    }

    // Update totals
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0)
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.totalPrice, 0)
    cart.updatedAt = new Date()

    await db.collection('carts').updateOne(
      { _id: cart._id },
      { $set: cart }
    )

    return cart
  }

  static async updateCartItem(
    productId: string,
    size: string,
    color: string,
    quantity: number,
    userId?: string,
    sessionId?: string
  ): Promise<Cart> {
    const cart = await this.getCart(userId, sessionId)
    if (!cart) {
      throw new Error('Cart not found')
    }

    const { db } = await connectToDatabase()

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId &&
               item.size === size &&
               item.color === color
    )

    if (itemIndex === -1) {
      throw new Error('Item not found in cart')
    }

    if (quantity <= 0) {
      // Remove item
      cart.items.splice(itemIndex, 1)
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity
      cart.items[itemIndex].totalPrice = quantity * cart.items[itemIndex].price
    }

    // Update totals
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0)
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.totalPrice, 0)
    cart.updatedAt = new Date()

    await db.collection('carts').updateOne(
      { _id: cart._id },
      { $set: cart }
    )

    return cart
  }

  static async removeFromCart(
    productId: string,
    size: string,
    color: string,
    userId?: string,
    sessionId?: string
  ): Promise<Cart> {
    return this.updateCartItem(productId, size, color, 0, userId, sessionId)
  }

  static async clearCart(userId?: string, sessionId?: string): Promise<void> {
    const { db } = await connectToDatabase()

    const query: any = {}
    if (userId) {
      query.userId = new ObjectId(userId)
    } else if (sessionId) {
      query.sessionId = sessionId
    }

    await db.collection('carts').updateOne(
      query,
      {
        $set: {
          items: [],
          totalPrice: 0,
          totalItems: 0,
          updatedAt: new Date()
        }
      }
    )
  }

  static async mergeCarts(sessionId: string, userId: string): Promise<void> {
    const { db } = await connectToDatabase()

    const sessionCart = await this.getCart(undefined, sessionId)
    const userCart = await this.getCart(userId)

    if (!sessionCart || sessionCart.items.length === 0) {
      return
    }

    if (!userCart) {
      // Move session cart to user
      await db.collection('carts').updateOne(
        { sessionId },
        { $set: { userId: new ObjectId(userId), sessionId: undefined } }
      )
      return
    }

    // Merge items
    for (const sessionItem of sessionCart.items) {
      const existingItem = userCart.items.find(
        item => item.productId.toString() === sessionItem.productId.toString() &&
                 item.size === sessionItem.size &&
                 item.color === sessionItem.color
      )

      if (existingItem) {
        existingItem.quantity += sessionItem.quantity
        existingItem.totalPrice = existingItem.quantity * existingItem.price
      } else {
        userCart.items.push(sessionItem)
      }
    }

    // Update user cart totals
    userCart.totalItems = userCart.items.reduce((sum, item) => sum + item.quantity, 0)
    userCart.totalPrice = userCart.items.reduce((sum, item) => sum + item.totalPrice, 0)
    userCart.updatedAt = new Date()

    await db.collection('carts').updateOne(
      { _id: userCart._id },
      { $set: userCart }
    )

    // Remove session cart
    await db.collection('carts').deleteOne({ sessionId })
  }
}
