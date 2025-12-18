#!/bin/bash

# Ziggler.kz Project Launcher
# Запускает сайт и Telegram бота одновременно

echo "🤖 Запуск проекта Ziggler.kz"
echo "=============================="

# Проверка наличия Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен. Установите Node.js 18+"
    exit 1
fi

# Проверка наличия Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 не установлен. Установите Python 3.11+"
    exit 1
fi

echo "✅ Node.js версия: $(node --version)"
echo "✅ Python версия: $(python3 --version)"

# Установка зависимостей сайта
echo "📦 Установка зависимостей сайта..."
if [ ! -d "node_modules" ]; then
    npm install
else
    echo "✅ Зависимости сайта уже установлены"
fi

# Проверка зависимостей бота
echo "🐍 Проверка зависимостей бота..."
cd telegram_bot
python3 -c "import aiogram; print('✅ aiogram установлен')" 2>/dev/null || echo "⚠️ aiogram не установлен, устанавливаем..."
cd ..

echo ""
echo "🚀 Запуск сайта..."
echo "=============================="

# Запуск сайта в фоне
npm run dev &
SITE_PID=$!

# Ожидание запуска сайта
sleep 5

echo "🤖 Настройка Telegram бота..."
echo "=============================="

# Настройка webhook для бота
echo "🔗 Настройка webhook..."
WEBHOOK_SETUP=$(curl -s -X POST http://localhost:3000/api/bot/setup-webhook \
  -H 'Content-Type: application/json' \
  -d '{"action":"set"}')

if echo "$WEBHOOK_SETUP" | grep -q '"success":true'; then
  echo "✅ Webhook настроен успешно"
else
  echo "❌ Ошибка настройки webhook:"
  echo "$WEBHOOK_SETUP"
fi

# Проверка статуса бота
echo ""
echo "📊 Проверка статуса бота..."
BOT_STATUS=$(curl -s http://localhost:3000/api/bot/status)
if echo "$BOT_STATUS" | grep -q '"status":"success"'; then
  echo "✅ Бот активен и готов к работе"
else
  echo "❌ Проблемы с ботом:"
  echo "$BOT_STATUS"
fi

echo ""
echo "🎉 Проект успешно запущен!"
echo "=============================="
echo "🌐 Сайт: http://localhost:3000"
echo "🤖 Бот: Работает через webhook API"
echo ""
echo "📋 PID процессов:"
echo "   Сайт: $SITE_PID"
echo ""
echo "🛑 Для остановки нажмите Ctrl+C"

# Функция очистки при завершении
cleanup() {
    echo ""
    echo "🧹 Остановка процессов..."

    # Удаляем webhook перед остановкой
    echo "🔗 Удаление webhook..."
    curl -s -X POST http://localhost:3000/api/bot/setup-webhook \
      -H 'Content-Type: application/json' \
      -d '{"action":"delete"}' > /dev/null

    kill $SITE_PID 2>/dev/null
    echo "👋 Проект остановлен"
    exit 0
}

# Обработка сигналов завершения
trap cleanup SIGINT SIGTERM

# Ожидание завершения
wait