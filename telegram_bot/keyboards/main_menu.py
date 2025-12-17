from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, ReplyKeyboardMarkup, KeyboardButton
from aiogram.utils.keyboard import InlineKeyboardBuilder

def get_main_menu_buttons() -> InlineKeyboardMarkup:
    """Inline кнопки главного меню"""
    builder = InlineKeyboardBuilder()

    builder.add(
        InlineKeyboardButton(text="👔 Каталог", callback_data="catalog"),
        InlineKeyboardButton(text="❤️ Избранное", callback_data="favorites")
    )
    builder.add(
        InlineKeyboardButton(text="🛒 Корзина", callback_data="cart"),
        InlineKeyboardButton(text="📋 Мои заказы", callback_data="orders")
    )
    builder.add(
        InlineKeyboardButton(text="⚙️ Настройки", callback_data="settings"),
        InlineKeyboardButton(text="📞 Контакты", callback_data="contacts")
    )

    builder.adjust(2)  # 2 кнопки в ряд
    return builder.as_markup()

def get_main_keyboard() -> ReplyKeyboardMarkup:
    """Reply клавиатура с основными командами"""
    keyboard = [
        [KeyboardButton(text="📦 Каталог"), KeyboardButton(text="❤️ Избранное")],
        [KeyboardButton(text="🛒 Корзина"), KeyboardButton(text="📋 Заказы")],
        [KeyboardButton(text="⚙️ Настройки"), KeyboardButton(text="📞 Контакты")]
    ]
    return ReplyKeyboardMarkup(keyboard=keyboard, resize_keyboard=True)

def get_categories_keyboard() -> InlineKeyboardMarkup:
    """Клавиатура с категориями товаров"""
    builder = InlineKeyboardBuilder()

    builder.add(
        InlineKeyboardButton(text="👔 Классические костюмы", callback_data="category_classic"),
        InlineKeyboardButton(text="🧥 Slim Fit", callback_data="category_slim")
    )
    builder.add(
        InlineKeyboardButton(text="👗 Casual", callback_data="category_casual"),
        InlineKeyboardButton(text="✨ Праздничные", callback_data="category_festive")
    )
    builder.add(
        InlineKeyboardButton(text="🔥 Акции", callback_data="category_sales")
    )
    builder.add(
        InlineKeyboardButton(text="⬅️ Назад", callback_data="main_menu")
    )

    builder.adjust(2, 2, 1, 1)  # 2-2-1-1 кнопки в ряд
    return builder.as_markup()

def get_back_to_menu_keyboard() -> InlineKeyboardMarkup:
    """Клавиатура с кнопкой возврата в главное меню"""
    builder = InlineKeyboardBuilder()
    builder.add(InlineKeyboardButton(text="⬅️ Главное меню", callback_data="main_menu"))
    return builder.as_markup()

def get_product_actions_keyboard(product_id: int, in_favorites: bool = False) -> InlineKeyboardMarkup:
    """Клавиатура действий с товаром"""
    builder = InlineKeyboardBuilder()

    heart_text = "💔 Убрать из избранного" if in_favorites else "❤️ В избранное"

    builder.add(
        InlineKeyboardButton(text=heart_text, callback_data=f"favorite_{product_id}"),
        InlineKeyboardButton(text="🛒 В корзину", callback_data=f"add_to_cart_{product_id}")
    )
    builder.add(
        InlineKeyboardButton(text="📸 Ещё фото", callback_data=f"gallery_{product_id}"),
        InlineKeyboardButton(text="⭐ Отзывы", callback_data=f"reviews_{product_id}")
    )
    builder.add(
        InlineKeyboardButton(text="⬅️ Назад в каталог", callback_data="catalog")
    )

    builder.adjust(2, 2, 1)
    return builder.as_markup()
