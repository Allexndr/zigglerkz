import logging
from loguru import logger
from config.config import config

def setup_logger():
    """Настройка логирования для бота"""
    # Удаляем стандартный логгер
    logging.getLogger().handlers.clear()

    # Настраиваем loguru
    logger.remove()  # Удаляем стандартный обработчик

    # Добавляем обработчик для файла
    logger.add(
        "logs/bot.log",
        rotation="1 day",
        retention="7 days",
        level=config.LOG_LEVEL,
        format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {name}:{function}:{line} | {message}"
    )

    # Добавляем обработчик для консоли
    logger.add(
        logging.StreamHandler(),
        level=config.LOG_LEVEL,
        format="{time:HH:mm:ss} | {level} | {message}"
    )

    # Интеграция с aiogram
    logging.basicConfig(level=logging.INFO)
