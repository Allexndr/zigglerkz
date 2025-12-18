import { NextRequest, NextResponse } from 'next/server'

// Имитация webhook обработки для демонстрации
// В реальном приложении здесь будет полноценная интеграция с Telegram Bot API
let webhookActive = false

async function initializeWebhook() {
  if (webhookActive) return

  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zigglerkz.vercel.app'

    if (!botToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is not set')
    }

    // Имитация настройки webhook
    console.log(`🤖 Webhook would be set to: ${baseUrl}/api/bot/webhook`)
    console.log(`🤖 Bot token configured: ${botToken.substring(0, 10)}...`)

    webhookActive = true
    console.log('✅ Webhook simulation initialized')

  } catch (error) {
    console.error('Failed to initialize webhook:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const update = await request.json()
    const botToken = process.env.TELEGRAM_BOT_TOKEN

    if (!botToken) {
      console.error('❌ TELEGRAM_BOT_TOKEN not configured')
      return NextResponse.json({ error: 'Bot token not configured' }, { status: 500 })
    }

    console.log('📨 Webhook received:', {
      update_id: update.update_id,
      message_type: update.message ? 'message' : update.callback_query ? 'callback' : 'other',
      chat_id: update.message?.chat?.id || update.callback_query?.message?.chat?.id,
      text: update.message?.text?.substring(0, 50) || update.callback_query?.data?.substring(0, 50)
    })

    // Обрабатываем сообщения
    if (update.message) {
      await handleMessage(update.message, botToken)
    }

    // Обрабатываем callback queries
    if (update.callback_query) {
      await handleCallbackQuery(update.callback_query, botToken)
    }

    return NextResponse.json({ ok: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Обработка текстовых сообщений
async function handleMessage(message: any, botToken: string) {
  const chatId = message.chat.id
  const text = message.text

  if (!text) return

  console.log(`💬 Processing message: "${text}" from chat ${chatId}`)

  // Отправляем сообщение в Telegram
  const sendMessage = async (text: string, replyMarkup?: any) => {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`

    const payload: any = {
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML'
    }

    if (replyMarkup) {
      payload.reply_markup = replyMarkup
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const result = await response.json()
      if (!result.ok) {
        console.error('❌ Failed to send message:', result)
      } else {
        console.log('✅ Message sent successfully')
      }
    } catch (error) {
      console.error('❌ Error sending message:', error)
    }
  }

  // Обработка команд
  if (text === '/start') {
    await sendMessage(
      `👔 <b>Добро пожаловать в Ziggler!</b>\n\n` +
      `Премиум мужские костюмы с доставкой по всему Казахстану.\n\n` +
      `Выберите действие:`,
      {
        inline_keyboard: [
          [
            { text: "📦 Каталог", callback_data: "catalog" },
            { text: "❤️ Избранное", callback_data: "favorites" }
          ],
          [
            { text: "🛒 Корзина", callback_data: "cart" },
            { text: "📋 Заказы", callback_data: "orders" }
          ],
          [
            { text: "⚙️ Настройки", callback_data: "settings" },
            { text: "📞 Контакты", callback_data: "contacts" }
          ]
        ]
      }
    )
  } else if (text === '/catalog' || text === '📦 Каталог') {
    await sendMessage(
      "👔 <b>Каталог Ziggler</b>\n\nВыберите категорию костюмов:",
      {
        inline_keyboard: [
          [
            { text: "👔 Классические костюмы", callback_data: "category_classic" },
            { text: "🧥 Slim Fit", callback_data: "category_slim" }
          ],
          [
            { text: "👗 Casual", callback_data: "category_casual" },
            { text: "✨ Праздничные", callback_data: "category_festive" }
          ],
          [
            { text: "🔥 Акции", callback_data: "category_sales" }
          ],
          [
            { text: "⬅️ Главное меню", callback_data: "main_menu" }
          ]
        ]
      }
    )
  } else {
    await sendMessage(
      "❓ Неизвестная команда. Используйте /start для начала работы или выберите действие из меню.",
      {
        inline_keyboard: [[
          { text: "🏠 Главное меню", callback_data: "main_menu" }
        ]]
      }
    )
  }
}

// Обработка callback запросов
async function handleCallbackQuery(callbackQuery: any, botToken: string) {
  const chatId = callbackQuery.message.chat.id
  const data = callbackQuery.data

  console.log(`🔘 Processing callback: "${data}" from chat ${chatId}`)

  // Отправляем ответ на callback
  await answerCallbackQuery(callbackQuery.id, botToken)

  // Обновляем сообщение
  const editMessage = async (text: string, replyMarkup?: any) => {
    const url = `https://api.telegram.org/bot${botToken}/editMessageText`

    const payload: any = {
      chat_id: chatId,
      message_id: callbackQuery.message.message_id,
      text: text,
      parse_mode: 'HTML'
    }

    if (replyMarkup) {
      payload.reply_markup = replyMarkup
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const result = await response.json()
      if (!result.ok) {
        console.error('❌ Failed to edit message:', result)
      }
    } catch (error) {
      console.error('❌ Error editing message:', error)
    }
  }

  // Обработка callback данных
  if (data === 'main_menu') {
    await editMessage(
      `👔 <b>Ziggler - Главное меню</b>\n\nВыберите действие:`,
      {
        inline_keyboard: [
          [
            { text: "📦 Каталог", callback_data: "catalog" },
            { text: "❤️ Избранное", callback_data: "favorites" }
          ],
          [
            { text: "🛒 Корзина", callback_data: "cart" },
            { text: "📋 Заказы", callback_data: "orders" }
          ],
          [
            { text: "⚙️ Настройки", callback_data: "settings" },
            { text: "📞 Контакты", callback_data: "contacts" }
          ]
        ]
      }
    )
  } else if (data === 'catalog') {
    await editMessage(
      "👔 <b>Каталог Ziggler</b>\n\nВыберите категорию костюмов:",
      {
        inline_keyboard: [
          [
            { text: "👔 Классические костюмы", callback_data: "category_classic" },
            { text: "🧥 Slim Fit", callback_data: "category_slim" }
          ],
          [
            { text: "👗 Casual", callback_data: "category_casual" },
            { text: "✨ Праздничные", callback_data: "category_festive" }
          ],
          [
            { text: "🔥 Акции", callback_data: "category_sales" }
          ],
          [
            { text: "⬅️ Главное меню", callback_data: "main_menu" }
          ]
        ]
      }
    )
  } else if (data.startsWith('category_')) {
    const category = data.replace('category_', '')
    const categoryNames: { [key: string]: string } = {
      'classic': 'Классические костюмы',
      'slim': 'Slim Fit',
      'casual': 'Casual',
      'festive': 'Праздничные',
      'sales': 'Акции'
    }

    await editMessage(
      `👔 <b>${categoryNames[category] || category}</b>\n\nВыберите товар:`,
      {
        inline_keyboard: [
          [
            { text: "1. Костюм Ermenegildo Zegna", callback_data: "product_1" },
            { text: "2. Костюм Hugo Boss", callback_data: "product_2" }
          ],
          [
            { text: "3. Костюм Canali", callback_data: "product_3" },
            { text: "4. Костюм Brioni", callback_data: "product_4" }
          ],
          [
            { text: "⬅️ Назад в каталог", callback_data: "catalog" },
            { text: "🏠 Главное меню", callback_data: "main_menu" }
          ]
        ]
      }
    )
  } else if (data.startsWith('product_')) {
    const productId = data.replace('product_', '')
    const products: { [key: string]: any } = {
      '1': {
        name: 'Классический костюм Ermenegildo Zegna',
        price: 185000,
        description: 'Роскошный классический костюм от итальянского бренда Ermenegildo Zegna. Выполнен из высококачественной шерсти премиум класса.'
      },
      '2': {
        name: 'Slim Fit костюм Hugo Boss',
        price: 125000,
        description: 'Современный Slim Fit костюм от Hugo Boss с добавлением эластана для комфортной носки.'
      },
      '3': {
        name: 'Повседневный костюм Canali',
        price: 95000,
        description: 'Стильный повседневный костюм от итальянского бренда Canali.'
      },
      '4': {
        name: 'Праздничный костюм Brioni',
        price: 250000,
        description: 'Роскошный праздничный костюм от легендарного итальянского бренда Brioni.'
      }
    }

    const product = products[productId]
    if (product) {
      await editMessage(
        `👔 <b>${product.name}</b>\n\n` +
        `💰 <b>${product.price.toLocaleString()} ₸</b>\n\n` +
        `📝 ${product.description}\n\n` +
        `Выберите действие:`,
        {
          inline_keyboard: [
            [
              { text: "📏 Выбрать размер", callback_data: `size_${productId}` },
              { text: "❤️ В избранное", callback_data: `favorite_${productId}` }
            ],
            [
              { text: "⬅️ Назад в каталог", callback_data: "catalog" },
              { text: "🏠 Главное меню", callback_data: "main_menu" }
            ]
          ]
        }
      )
    }
  } else if (data.startsWith('size_')) {
    const productId = data.replace('size_', '')
    await editMessage(
      `📏 Выберите размер для товара:\n\nРазмеры в наличии:`,
      {
        inline_keyboard: [
          [
            { text: "46S", callback_data: `select_size_${productId}_46S` },
            { text: "48R", callback_data: `select_size_${productId}_48R` }
          ],
          [
            { text: "50L", callback_data: `select_size_${productId}_50L` },
            { text: "52XL", callback_data: `select_size_${productId}_52XL` }
          ],
          [
            { text: "⬅️ Назад к товару", callback_data: `product_${productId}` },
            { text: "🏠 Главное меню", callback_data: "main_menu" }
          ]
        ]
      }
    )
  } else if (data.startsWith('select_size_')) {
    const parts = data.split('_')
    const productId = parts[2]
    const size = parts[3]

    await editMessage(
      `✅ Размер <b>${size}</b> выбран!\n\nТеперь выберите цвет:`,
      {
        inline_keyboard: [
          [
            { text: "⚫ Черный", callback_data: `select_color_${productId}_${size}_Черный` },
            { text: "🔵 Темно-синий", callback_data: `select_color_${productId}_${size}_Темно-синий` }
          ],
          [
            { text: "⚪ Серый", callback_data: `select_color_${productId}_${size}_Серый` },
            { text: "🟤 Бежевый", callback_data: `select_color_${productId}_${size}_Бежевый` }
          ],
          [
            { text: "⬅️ Изменить размер", callback_data: `size_${productId}` },
            { text: "🏠 Главное меню", callback_data: "main_menu" }
          ]
        ]
      }
    )
  } else if (data.startsWith('select_color_')) {
    const parts = data.split('_')
    const productId = parts[2]
    const size = parts[3]
    const color = parts.slice(4).join('_')

    await editMessage(
      `🎉 <b>Товар добавлен в корзину!</b>\n\n` +
      `📏 Размер: ${size}\n` +
      `🎨 Цвет: ${color}\n\n` +
      `Что дальше?`,
      {
        inline_keyboard: [
          [
            { text: "🛒 Посмотреть корзину", callback_data: "cart" },
            { text: "📦 Продолжить покупки", callback_data: "catalog" }
          ],
          [
            { text: "🏠 Главное меню", callback_data: "main_menu" }
          ]
        ]
      }
    )
  } else if (data === 'cart') {
    await editMessage(
      `🛒 <b>Ваша корзина</b>\n\n` +
      `В корзине пока нет товаров.\n\n` +
      `Добавьте товары из каталога!`,
      {
        inline_keyboard: [
          [
            { text: "📦 Перейти в каталог", callback_data: "catalog" }
          ],
          [
            { text: "🏠 Главное меню", callback_data: "main_menu" }
          ]
        ]
      }
    )
  } else if (data === 'favorites') {
    await editMessage(
      `❤️ <b>Избранное</b>\n\n` +
      `Список избранного пока пуст.\n\n` +
      `Добавляйте товары, которые вам понравились!`,
      {
        inline_keyboard: [
          [
            { text: "📦 Посмотреть каталог", callback_data: "catalog" }
          ],
          [
            { text: "🏠 Главное меню", callback_data: "main_menu" }
          ]
        ]
      }
    )
  } else if (data === 'orders') {
    await editMessage(
      `📋 <b>Мои заказы</b>\n\n` +
      `У вас пока нет заказов.\n\n` +
      `Сделайте свой первый заказ в нашем каталоге!`,
      {
        inline_keyboard: [
          [
            { text: "📦 Перейти в каталог", callback_data: "catalog" }
          ],
          [
            { text: "🏠 Главное меню", callback_data: "main_menu" }
          ]
        ]
      }
    )
  } else if (data === 'settings') {
    await editMessage(
      `⚙️ <b>Настройки</b>\n\n` +
      `Здесь вы можете настроить:\n` +
      `• Язык интерфейса\n` +
      `• Уведомления\n` +
      `• Личные данные`,
      {
        inline_keyboard: [
          [
            { text: "🌐 Изменить язык", callback_data: "change_language" },
            { text: "🔔 Уведомления", callback_data: "toggle_notifications" }
          ],
          [
            { text: "🏠 Главное меню", callback_data: "main_menu" }
          ]
        ]
      }
    )
  } else if (data === 'contacts') {
    await editMessage(
      `📞 <b>Контакты Ziggler</b>\n\n` +
      `🏢 <b>Адрес:</b>\n` +
      `г. Алматы, ул. Центральная, 123\n` +
      `БЦ "Premium Plaza", 5 этаж\n\n` +
      `📱 <b>Телефон:</b>\n` +
      `+7 (727) 123-45-67\n\n` +
      `📧 <b>Email:</b>\n` +
      `info@ziggler.kz\n\n` +
      `🌐 <b>Сайт:</b>\n` +
      `https://ziggler.kz`,
      {
        inline_keyboard: [
          [
            { text: "🌐 Открыть сайт", url: "https://zigglerkz.vercel.app" },
            { text: "📸 Instagram", url: "https://instagram.com/ziggler_kz" }
          ],
          [
            { text: "🏠 Главное меню", callback_data: "main_menu" }
          ]
        ]
      }
    )
  } else {
    await editMessage(
      `❓ Неизвестное действие. Возвращаемся в главное меню.`,
      {
        inline_keyboard: [
          [
            { text: "📦 Каталог", callback_data: "catalog" },
            { text: "❤️ Избранное", callback_data: "favorites" }
          ],
          [
            { text: "🛒 Корзина", callback_data: "cart" },
            { text: "📋 Заказы", callback_data: "orders" }
          ],
          [
            { text: "⚙️ Настройки", callback_data: "settings" },
            { text: "📞 Контакты", callback_data: "contacts" }
          ]
        ]
      }
    )
  }
}

// Отправка ответа на callback query
async function answerCallbackQuery(callbackQueryId: string, botToken: string) {
  const url = `https://api.telegram.org/bot${botToken}/answerCallbackQuery`

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        callback_query_id: callbackQueryId
      })
    })
  } catch (error) {
    console.error('❌ Error answering callback query:', error)
  }
}

export async function GET() {
  try {
    if (!webhookActive) {
      await initializeWebhook()
    }

    return NextResponse.json({
      status: 'Bot webhook simulation is active',
      webhookActive,
      timestamp: new Date().toISOString(),
      note: 'This is a simulation. Real bot would handle messages here.'
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Webhook status check failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}