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
      // Настраиваем реальный webhook через Telegram Bot API
      const telegramApiUrl = `https://api.telegram.org/bot${botToken}/setWebhook`

      try {
        const response = await fetch(telegramApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: webhookUrl,
            drop_pending_updates: true,
            allowed_updates: ['message', 'callback_query']
          })
        })

        const result = await response.json()

        if (result.ok) {
          console.log('✅ Webhook set successfully:', webhookUrl)
          return NextResponse.json({
            success: true,
            message: 'Webhook configured successfully',
            webhook_url: webhookUrl,
            telegram_response: result
          })
        } else {
          console.error('❌ Failed to set webhook:', result)
          return NextResponse.json(
            {
              error: 'Failed to set webhook',
              telegram_error: result
            },
            { status: 500 }
          )
        }
      } catch (fetchError) {
        console.error('❌ Network error setting webhook:', fetchError)
        return NextResponse.json(
          {
            error: 'Network error setting webhook',
            details: fetchError instanceof Error ? fetchError.message : 'Unknown error'
          },
          { status: 500 }
        )
      }

    } else if (action === 'delete') {
      // Удаляем webhook через Telegram Bot API
      const telegramApiUrl = `https://api.telegram.org/bot${botToken}/deleteWebhook`

      try {
        const response = await fetch(telegramApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        })

        const result = await response.json()

        if (result.ok) {
          console.log('✅ Webhook deleted successfully')
          return NextResponse.json({
            success: true,
            message: 'Webhook deleted successfully',
            telegram_response: result
          })
        } else {
          console.error('❌ Failed to delete webhook:', result)
          return NextResponse.json(
            { error: 'Failed to delete webhook', telegram_error: result },
            { status: 500 }
          )
        }
      } catch (fetchError) {
        console.error('❌ Network error deleting webhook:', fetchError)
        return NextResponse.json(
          {
            error: 'Network error deleting webhook',
            details: fetchError instanceof Error ? fetchError.message : 'Unknown error'
          },
          { status: 500 }
        )
      }

    } else if (action === 'info') {
      // Получаем информацию о webhook через Telegram Bot API
      const telegramApiUrl = `https://api.telegram.org/bot${botToken}/getWebhookInfo`

      try {
        const response = await fetch(telegramApiUrl)
        const result = await response.json()

        return NextResponse.json(result)
      } catch (fetchError) {
        console.error('❌ Network error getting webhook info:', fetchError)
        return NextResponse.json(
          {
            error: 'Network error getting webhook info',
            details: fetchError instanceof Error ? fetchError.message : 'Unknown error'
          },
          { status: 500 }
        )
      }
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