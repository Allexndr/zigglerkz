import asyncio
import logging
from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode

from config.config import config
from handlers import register_all_handlers
from lib.mongodb import MongoDB
from utils.logger import setup_logger

async def main():
    # Настройка логирования
    setup_logger()

    # Подключение к MongoDB
    await MongoDB.connect()

    # Инициализация бота и диспетчера
    bot = Bot(
        token=config.BOT_TOKEN,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML)
    )
    dp = Dispatcher()

    # Регистрация всех обработчиков
    register_all_handlers(dp)

    # Запуск бота
    logging.info("Бот запущен!")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
