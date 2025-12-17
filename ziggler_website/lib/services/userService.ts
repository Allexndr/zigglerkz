import { ObjectId } from 'mongodb'
import { connectToDatabase } from '../mongodb'
import { User, Address, UserPreferences } from '../../types/database'

export class UserService {
  static async createOrUpdateUser(telegramData: {
    id: number
    username?: string
    first_name?: string
    last_name?: string
  }): Promise<User> {
    const { db } = await connectToDatabase()

    const fullName = [telegramData.first_name, telegramData.last_name]
      .filter(Boolean)
      .join(' ') || telegramData.username || 'Пользователь'

    const userData: Omit<User, '_id'> = {
      telegramId: telegramData.id,
      username: telegramData.username,
      fullName,
      language: 'ru',
      notificationsEnabled: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Try to find existing user
    const existingUser = await db.collection('users').findOne({
      telegramId: telegramData.id
    })

    if (existingUser) {
      // Update user data
      await db.collection('users').updateOne(
        { telegramId: telegramData.id },
        {
          $set: {
            username: telegramData.username,
            fullName,
            updatedAt: new Date()
          }
        }
      )
      return existingUser as User
    }

    // Create new user
    const result = await db.collection('users').insertOne(userData)
    return {
      ...userData,
      _id: result.insertedId
    } as User
  }

  static async getUserByTelegramId(telegramId: number): Promise<User | null> {
    const { db } = await connectToDatabase()
    const user = await db.collection('users').findOne({ telegramId })
    return user as User | null
  }

  static async getUserById(id: string): Promise<User | null> {
    const { db } = await connectToDatabase()
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) })
    return user as User | null
  }

  static async updateUserPreferences(
    userId: string,
    preferences: Partial<UserPreferences>
  ): Promise<void> {
    const { db } = await connectToDatabase()

    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          preferences,
          updatedAt: new Date()
        }
      }
    )
  }

  static async addUserAddress(userId: string, address: Omit<Address, 'id'>): Promise<void> {
    const { db } = await connectToDatabase()

    const addressWithId: Address = {
      ...address,
      id: new ObjectId().toString()
    }

    // If this is the default address, unset other defaults
    if (addressWithId.isDefault) {
      await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $unset: { 'addresses.$[].isDefault': false } }
      )
    }

    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      {
        $push: { addresses: addressWithId },
        $set: { updatedAt: new Date() }
      }
    )
  }

  static async updateUserAddress(
    userId: string,
    addressId: string,
    updates: Partial<Address>
  ): Promise<void> {
    const { db } = await connectToDatabase()

    // If setting as default, unset other defaults
    if (updates.isDefault) {
      await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $unset: { 'addresses.$[].isDefault': false } }
      )
    }

    await db.collection('users').updateOne(
      {
        _id: new ObjectId(userId),
        'addresses.id': addressId
      },
      {
        $set: {
          'addresses.$': updates,
          updatedAt: new Date()
        }
      }
    )
  }

  static async deleteUserAddress(userId: string, addressId: string): Promise<void> {
    const { db } = await connectToDatabase()

    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      {
        $pull: { addresses: { id: addressId } },
        $set: { updatedAt: new Date() }
      }
    )
  }

  static async updateUserProfile(
    userId: string,
    updates: {
      email?: string
      phone?: string
      language?: 'ru' | 'en' | 'kz'
      notificationsEnabled?: boolean
    }
  ): Promise<void> {
    const { db } = await connectToDatabase()

    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          ...updates,
          updatedAt: new Date()
        }
      }
    )
  }

  static async getUserStats(userId: string) {
    const { db } = await connectToDatabase()

    const userObjectId = new ObjectId(userId)

    const stats = await db.collection('orders').aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$total' },
          averageOrderValue: { $avg: '$total' },
          lastOrderDate: { $max: '$createdAt' }
        }
      }
    ]).toArray()

    const wishlistCount = await db.collection('wishlists').countDocuments({
      userId: userObjectId
    })

    const reviewCount = await db.collection('reviews').countDocuments({
      userId: userObjectId
    })

    return {
      ...(stats[0] || {
        totalOrders: 0,
        totalSpent: 0,
        averageOrderValue: 0,
        lastOrderDate: null
      }),
      wishlistCount,
      reviewCount
    }
  }

  static async searchUsers(query: string, limit: number = 20): Promise<User[]> {
    const { db } = await connectToDatabase()

    const users = await db
      .collection('users')
      .find({
        $or: [
          { fullName: { $regex: query, $options: 'i' } },
          { username: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } }
        ]
      })
      .limit(limit)
      .toArray()

    return users as User[]
  }
}
