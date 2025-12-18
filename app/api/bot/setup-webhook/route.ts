import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json()

    // Получаем переменные окружения
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zigglerkz.vercel.app'

    if (!botToken) {
      return NextResponse.json(
        { error: 'TELEGRAM_BOT_TOKEN is not configured' },
        { status: 500 }
      )
    }

    const webhookUrl = `${baseUrl}/api/bot/webhook`

    if (action === 'set') {
      // Имитируем установку webhook (в реальном приложении здесь был бы реальный запрос к Telegram API)
      console.log('✅ Webhook simulation - would set webhook to:', webhookUrl)
      console.log('✅ Bot token configured:', botToken.substring(0, 10) + '...')

      return NextResponse.json({
        success: true,
        message: 'Webhook configured successfully (simulation)',
        webhook_url: webhookUrl,
        note: 'This is a simulation. Real bot would connect to Telegram API.'
      })

    } else if (action === 'delete') {
      // Имитируем удаление webhook
      console.log('✅ Webhook simulation - would delete webhook')

      return NextResponse.json({
        success: true,
        message: 'Webhook deleted successfully (simulation)',
        note: 'This is a simulation. Real bot would disconnect from Telegram API.'
      })

    } else if (action === 'info') {
      // Имитируем получение информации о webhook
      return NextResponse.json({
        ok: true,
        result: {
          url: webhookUrl,
          has_custom_certificate: false,
          pending_update_count: 0,
          max_connections: 40,
          ip_address: "simulated"
        }
      })
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "set", "delete", or "info"' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Setup webhook error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Получаем информацию о webhook
    const botToken = process.env.TELEGRAM_BOT_TOKEN

    if (!botToken) {
      return NextResponse.json(
        { error: 'TELEGRAM_BOT_TOKEN is not configured' },
        { status: 500 }
      )
    }

    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/getWebhookInfo`
    const response = await fetch(telegramApiUrl)
    const result = await response.json()

    return NextResponse.json(result)

  } catch (error) {
    console.error('Get webhook info error:', error)
    return NextResponse.json(
      { error: 'Failed to get webhook info', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}