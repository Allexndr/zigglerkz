#!/usr/bin/env python3
"""
Скрипт для запуска Telegram бота Ziggler
"""

import sys
import os

# Добавляем корневую директорию в путь
sys.path.insert(0, os.path.dirname(__file__))

from src.main import main
import asyncio

if __name__ == "__main__":
    print("🤖 Запуск бота Ziggler...")
    print("Для остановки нажмите Ctrl+C")
    print("-" * 40)

    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n👋 Бот остановлен пользователем")
    except Exception as e:
        print(f"\n❌ Ошибка запуска бота: {e}")
        sys.exit(1)
