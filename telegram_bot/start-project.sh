#!/bin/bash

# Ziggler.kz Project Launcher
echo "🤖 Запуск проекта Ziggler.kz"

# Проверка зависимостей
command -v node >/dev/null 2>&1 || { echo "❌ Node.js не установлен"; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo "❌ Python3 не установлен"; exit 1; }

echo "✅ Node.js: $(node --version)"
echo "✅ Python: $(python3 --version)"

# Установка зависимостей сайта
cd ziggler_website
[ ! -d "node_modules" ] && npm install

# Запуск сайта и бота
echo "🚀 Запуск..."
npm run dev &
sleep 3
npm run bot &
echo "🎉 Готово! Сайт: http://localhost:3000"
wait
