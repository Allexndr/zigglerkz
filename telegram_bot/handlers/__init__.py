from aiogram import Dispatcher
from .start import register_start_handlers
from .catalog import register_catalog_handlers
from .cart import register_cart_handlers
# from .favorites import register_favorites_handlers  # Temporarily disabled
from .orders import register_orders_handlers
from .settings import register_settings_handlers
from .common import register_common_handlers

def register_all_handlers(dp: Dispatcher):
    """Регистрация всех обработчиков команд"""
    register_start_handlers(dp)
    register_catalog_handlers(dp)
    register_cart_handlers(dp)
    # register_favorites_handlers(dp)  # Temporarily disabled
    register_orders_handlers(dp)
    register_settings_handlers(dp)
    register_common_handlers(dp)
