from aiogram import Router, F
from aiogram.types import CallbackQuery, Message
from aiogram.filters import Command
from keyboards.main_menu import get_categories_keyboard, get_back_to_menu_keyboard, get_product_actions_keyboard
from services.product_service import ProductService
from services.cart_service import CartService
from typing import List, Dict, Any

router = Router()

@router.message(F.text == "📦 Каталог")
@router.message(Command("catalog"))
async def cmd_catalog(message: Message):
    """Показать каталог товаров"""
    text = (
        "👔 <b>Каталог Ziggler</b>\n\n"
        "Выберите категорию костюмов:"
    )

    await message.answer(text, reply_markup=get_categories_keyboard())

@router.callback_query(F.data == "catalog")
async def callback_catalog(callback: CallbackQuery):
    """Показать каталог через callback"""
    text = (
        "👔 <b>Каталог Ziggler</b>\n\n"
        "Выберите категорию костюмов:"
    )

    await callback.message.edit_text(text, reply_markup=get_categories_keyboard())
    await callback.answer()

@router.callback_query(F.data.startswith("category_"))
async def callback_category(callback: CallbackQuery):
    """Показать товары категории"""
    category_code = callback.data.replace("category_", "")

    # Маппинг кодов категорий на ID (пока захардкожено, позже из БД)
    category_map = {
        "classic": 1,
        "slim": 2,
        "casual": 3,
        "festive": 4,
        "sales": 5
    }

    category_id = category_map.get(category_code)
    if not category_id:
        await callback.answer("Категория не найдена")
        return

    # Получаем товары категории
    result = await ProductService.get_all_products(category=category_name, limit=10)
    products = result["products"]

    if not products:
        text = "😔 В этой категории пока нет товаров.\nПопробуйте выбрать другую категорию."
        await callback.message.edit_text(text, reply_markup=get_categories_keyboard())
        await callback.answer()
        return

    # Показываем первый товар
    product = products[0]
    text = format_product_card(product)

    # Получаем доступные размеры и цвета
    sizes, colors = get_product_variants(product)

    # Добавляем информацию о вариантах
    if sizes:
        text += f"\n📏 <b>Размеры:</b> {' '.join(sizes)}"
    if colors:
        text += f"\n🎨 <b>Цвета:</b> {' '.join([c['emoji'] for c in colors])}"

    # Сохраняем информацию о товарах в состоянии для навигации
    # TODO: Добавить state management для навигации между товарами

    await callback.message.edit_text(
        text,
        reply_markup=get_product_actions_keyboard(product.id)
    )
    await callback.answer()

def format_product_card(product: dict) -> str:
    """Форматирование карточки товара"""
    price_text = f"{product['price']:,} ₸"

    # MongoDB doesn't have discount_price field in our current schema
    price_text = f"💰 {price_text}"

    rating_text = ""
    if product.get('rating', 0) > 0:
        stars = "⭐" * int(product['rating'])
        rating_text = f"⭐ {product['rating']:.1f}/5 ({product.get('reviewCount', 0)} отзывов)"

    text = f"""
<b>{product['name']}</b>

{rating_text}

{price_text}

📝 <b>Описание:</b>
{product.get('description', 'Описание товара отсутствует')}

⚡ <b>Характеристики:</b>
"""

    # Add material info if available
    materials = product.get('materials', [])
    if materials:
        text += f"• Материалы: {', '.join(materials)}\n"

    text += "• Страна: Выполнено в Корее\n• Рекомендация: Брать на размер больше"

    return text.strip()

def get_product_variants(product: dict) -> tuple[List[str], List[Dict[str, Any]]]:
    """Получить доступные размеры и цвета товара из MongoDB документа"""

    # Получаем размеры
    sizes = [
        size['name'] for size in product.get('sizes', [])
        if size.get('inStock', False)
    ]

    # Получаем цвета
    colors = [
        {
            "name": color['name'],
            "hex": color.get('hexCode', '#000000'),
            "emoji": color.get('name', '')  # Using name as emoji placeholder
        }
        for color in product.get('colors', [])
        if color.get('inStock', False)
    ]

    return sizes, colors

@router.callback_query(F.data.startswith("add_to_cart_"))
async def callback_add_to_cart(callback: CallbackQuery):
    """Добавить товар в корзину"""
    try:
        product_id = callback.data.replace("add_to_cart_", "")
        user_id = callback.from_user.id

        # Получаем размеры и цвета товара для выбора
        # Пока добавляем с дефолтными значениями
        size = "M"  # TODO: Добавить выбор размера
        color = "Черный"  # TODO: Добавить выбор цвета
        quantity = 1

        # Добавляем в корзину
        cart = await CartService.add_to_cart(
            product_id=product_id,
            size=size,
            color=color,
            quantity=quantity,
            user_id=user_id
        )

        await callback.answer(f"✅ Товар добавлен в корзину! ({cart['totalItems']} товаров)", show_alert=True)

    except Exception as e:
        print(f"Error adding to cart: {e}")
        await callback.answer("❌ Ошибка при добавлении в корзину", show_alert=True)

@router.callback_query(F.data.startswith("favorite_"))
async def callback_toggle_favorite(callback: CallbackQuery):
    """Добавить/убрать из избранного"""
    product_id = int(callback.data.replace("favorite_", ""))

    # TODO: Реализовать логику избранного
    await callback.answer("❤️ Добавлено в избранное!", show_alert=True)

def register_catalog_handlers(dp):
    """Регистрация обработчиков каталога"""
    dp.include_router(router)
