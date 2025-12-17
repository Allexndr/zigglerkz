import { ObjectId } from 'mongodb'
import { connectToDatabase } from '../mongodb'
import { Order, OrderItem, CustomerInfo, Address, PaymentMethod } from '../../types/database'
import { CartService } from './cartService'

export class OrderService {
  static generateOrderNumber(): string {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `ORD-${timestamp}-${random}`
  }

  static async createOrder(
    cartId: string,
    customerInfo: CustomerInfo,
    shippingAddress: Address,
    billingAddress?: Address,
    paymentMethod: PaymentMethod,
    notes?: string
  ): Promise<Order> {
    const { db } = await connectToDatabase()

    // Get cart
    const cart = await db.collection('carts').findOne({ _id: new ObjectId(cartId) })
    if (!cart || cart.items.length === 0) {
      throw new Error('Cart not found or empty')
    }

    // Calculate totals
    const subtotal = cart.totalPrice
    const shippingCost = subtotal > 50000 ? 0 : 2000 // Free shipping over 50k tenge
    const tax = Math.round(subtotal * 0.12) // 12% tax
    const discount = 0 // Could be calculated based on coupons
    const total = subtotal + shippingCost + tax - discount

    // Create order items
    const orderItems: OrderItem[] = cart.items.map(cartItem => ({
      productId: cartItem.productId,
      product: cartItem.product,
      size: cartItem.size,
      color: cartItem.color,
      quantity: cartItem.quantity,
      price: cartItem.price,
      totalPrice: cartItem.totalPrice
    }))

    // Create order
    const order: Omit<Order, '_id'> = {
      orderNumber: this.generateOrderNumber(),
      userId: cart.userId,
      customerInfo,
      items: orderItems,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      paymentMethod,
      paymentStatus: 'pending',
      orderStatus: 'pending',
      subtotal,
      shippingCost,
      tax,
      discount,
      total,
      notes,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await db.collection('orders').insertOne(order)

    // Clear cart after successful order creation
    if (cart.userId) {
      await CartService.clearCart(cart.userId.toString())
    } else if (cart.sessionId) {
      await CartService.clearCart(undefined, cart.sessionId)
    }

    return {
      ...order,
      _id: result.insertedId
    } as Order
  }

  static async getOrderById(id: string, userId?: string): Promise<Order | null> {
    const { db } = await connectToDatabase()

    const query: any = { _id: new ObjectId(id) }
    if (userId) {
      query.userId = new ObjectId(userId)
    }

    const order = await db.collection('orders').findOne(query)
    return order as Order | null
  }

  static async getUserOrders(userId: string, limit: number = 20, skip: number = 0): Promise<Order[]> {
    const { db } = await connectToDatabase()

    const orders = await db
      .collection('orders')
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    return orders as Order[]
  }

  static async updateOrderStatus(
    orderId: string,
    orderStatus: Order['orderStatus'],
    trackingNumber?: string,
    estimatedDelivery?: Date
  ): Promise<void> {
    const { db } = await connectToDatabase()

    const update: any = {
      orderStatus,
      updatedAt: new Date()
    }

    if (trackingNumber) {
      update.trackingNumber = trackingNumber
    }

    if (estimatedDelivery) {
      update.estimatedDelivery = estimatedDelivery
    }

    if (orderStatus === 'delivered') {
      update.deliveredAt = new Date()
    }

    await db.collection('orders').updateOne(
      { _id: new ObjectId(orderId) },
      { $set: update }
    )
  }

  static async updatePaymentStatus(
    orderId: string,
    paymentStatus: Order['paymentStatus']
  ): Promise<void> {
    const { db } = await connectToDatabase()

    await db.collection('orders').updateOne(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          paymentStatus,
          updatedAt: new Date()
        }
      }
    )
  }

  static async getOrderStats(userId?: string) {
    const { db } = await connectToDatabase()

    const matchStage: any = {}
    if (userId) {
      matchStage.userId = new ObjectId(userId)
    }

    const stats = await db.collection('orders').aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$total' },
          pendingOrders: {
            $sum: { $cond: [{ $eq: ['$orderStatus', 'pending'] }, 1, 0] }
          },
          completedOrders: {
            $sum: { $cond: [{ $eq: ['$orderStatus', 'delivered'] }, 1, 0] }
          }
        }
      }
    ]).toArray()

    return stats[0] || {
      totalOrders: 0,
      totalRevenue: 0,
      pendingOrders: 0,
      completedOrders: 0
    }
  }

  static async getRecentOrders(limit: number = 10): Promise<Order[]> {
    const { db } = await connectToDatabase()

    const orders = await db
      .collection('orders')
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray()

    return orders as Order[]
  }
}
