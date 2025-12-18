import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const mongodbUri = process.env.MONGODB_URI

    if (!botToken) {
      return NextResponse.json({
        status: 'error',
        message: 'TELEGRAM_BOT_TOKEN is not configured'
      }, { status: 500 })
    }

    // Имитируем проверку статуса (в реальном приложении здесь были бы реальные запросы к Telegram API)
    const botConfigured = !!botToken
    const dbConfigured = !!mongodbUri

    return NextResponse.json({
      status: 'success',
      timestamp: new Date().toISOString(),
      simulation: true,
      bot: {
        configured: botConfigured,
        token_prefix: botToken.substring(0, 10) + '...',
        webhook_simulation: true
      },
      database: {
        configured: dbConfigured,
        uri_prefix: dbConfigured ? mongodbUri!.substring(0, 20) + '...' : null
      },
      note: 'This is a webhook simulation. Real bot would check actual Telegram API status.'
    })

  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json(
      { error: 'Status check failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}