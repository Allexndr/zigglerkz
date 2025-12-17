import os
from typing import List
from dotenv import load_dotenv

load_dotenv()

class Config:
    BOT_TOKEN: str = os.getenv("BOT_TOKEN", "8542343040:AAFf60s5j84QU33caha4JcxLhNbPMUrZU7A")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/ziggler_bot")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379")
    ADMIN_IDS: List[int] = [int(x) for x in os.getenv("ADMIN_IDS", "123456789").split(",")]
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")

    # Telegram settings
    WEBHOOK_URL: str = os.getenv("WEBHOOK_URL", "")
    WEBHOOK_PATH: str = os.getenv("WEBHOOK_PATH", "/webhook")

    # Bot settings
    BOT_USERNAME: str = "ziggler_kz_bot"
    SUPPORT_EMAIL: str = "support@ziggler.kz"

config = Config()
