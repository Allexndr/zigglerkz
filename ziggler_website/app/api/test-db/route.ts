import { connectToDatabase } from '../../../lib/mongodb'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { db } = await connectToDatabase()

    // Test connection by counting products
    const productCount = await db.collection('products').countDocuments()
    const userCount = await db.collection('users').countDocuments()

    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful',
      data: {
        products: productCount,
        users: userCount
      }
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json({
      success: false,
      message: 'MongoDB connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
