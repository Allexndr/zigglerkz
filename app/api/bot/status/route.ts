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

    // Проверяем статус webhook через Telegram API
    const webhookInfoUrl = `https://api.telegram.org/bot${botToken}/getWebhookInfo`
    const botInfoUrl = `https://api.telegram.org/bot${botToken}/getMe`

    let webhookInfo = null
    let botInfo = null

    try {
      const [webhookResponse, botResponse] = await Promise.all([
        fetch(webhookInfoUrl),
        fetch(botInfoUrl)
      ])

      webhookInfo = await webhookResponse.json()
      botInfo = await botResponse.json()
    } catch (apiError) {
      console.error('❌ Error checking Telegram API:', apiError)
    }

    const botConfigured = !!botToken
    const dbConfigured = !!mongodbUri

    return NextResponse.json({
      status: 'success',
      timestamp: new Date().toISOString(),
      bot: {
        configured: botConfigured,
        token_prefix: botToken.substring(0, 10) + '...',
        info: botInfo?.ok ? botInfo.result : null,
        webhook: webhookInfo?.ok ? webhookInfo.result : null,
        webhook_active: webhookInfo?.ok && webhookInfo.result?.url ? true : false
      },
      database: {
        configured: dbConfigured,
        uri_prefix: dbConfigured ? mongodbUri!.substring(0, 20) + '...' : null
      }
    })

  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json(
      { error: 'Status check failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}