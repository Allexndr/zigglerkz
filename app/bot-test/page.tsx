'use client'

import { useState } from 'react'

export default function BotTestPage() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const testWebhook = async () => {
    if (!message.trim()) return

    setLoading(true)
    try {
      // Имитируем сообщение от Telegram
      const testUpdate = {
        update_id: Date.now(),
        message: {
          message_id: Math.floor(Math.random() * 1000000),
          from: {
            id: 123456789,
            is_bot: false,
            first_name: "Test",
            last_name: "User",
            username: "testuser"
          },
          chat: {
            id: 123456789,
            first_name: "Test",
            last_name: "User",
            username: "testuser",
            type: "private"
          },
          date: Math.floor(Date.now() / 1000),
          text: message
        }
      }

      const res = await fetch('/api/bot/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testUpdate)
      })

      const data = await res.json()
      setResponse(`Webhook response: ${JSON.stringify(data, null, 2)}`)

    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const checkStatus = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/bot/status')
      const data = await res.json()
      setResponse(`Bot status: ${JSON.stringify(data, null, 2)}`)
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const setupWebhook = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/bot/setup-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'set' })
      })
      const data = await res.json()
      setResponse(`Setup webhook: ${JSON.stringify(data, null, 2)}`)
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-8">
          🤖 Тестирование бота
        </h1>

        <div className="space-y-6">
          {/* Кнопки управления */}
          <div className="flex gap-4">
            <button
              onClick={checkStatus}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              📊 Проверить статус
            </button>
            <button
              onClick={setupWebhook}
              disabled={loading}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              🔗 Настроить webhook
            </button>
          </div>

          {/* Тестовое сообщение */}
          <div className="bg-surface dark:bg-dark-surface p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-4">
              Отправить тестовое сообщение
            </h2>
            <div className="flex gap-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Введите команду (например: /start)"
                className="flex-1 px-3 py-2 border border-border dark:border-dark-border rounded bg-background dark:bg-dark-background text-text-primary dark:text-dark-text-primary"
              />
              <button
                onClick={testWebhook}
                disabled={loading || !message.trim()}
                className="px-4 py-2 bg-accent text-primary rounded hover:bg-accent/90 disabled:opacity-50"
              >
                📤 Отправить
              </button>
            </div>
          </div>

          {/* Ответ */}
          <div className="bg-surface dark:bg-dark-surface p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-4">
              Ответ webhook
            </h2>
            <pre className="bg-background dark:bg-dark-background p-4 rounded text-sm overflow-x-auto text-text-primary dark:text-dark-text-primary">
              {response || 'Здесь появится ответ...'}
            </pre>
          </div>

          {/* Инструкции */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              📝 Инструкции по тестированию
            </h3>
            <ul className="text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>1. Нажмите "Проверить статус" чтобы увидеть состояние бота</li>
              <li>2. Если webhook не активен, нажмите "Настроить webhook"</li>
              <li>3. Введите команду (например: /start) и нажмите "Отправить"</li>
              <li>4. Проверьте ответ в секции ниже</li>
              <li>5. Реальный бот в Telegram: <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">@zigger_suits_bot</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
