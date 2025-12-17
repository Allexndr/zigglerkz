from aiogram import Router, F
from aiogram.types import CallbackQuery, Message
from aiogram.filters import Command
from keyboards.main_menu import get_categories_keyboard, get_back_to_menu_keyboard, get_product_actions_keyboard
from models.database import Product, Category, get_session
from sqlalchemy import select, func
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
    async with get_session() as session:
        result = await session.execute(
            select(Product).where(
                Product.category_id == category_id,
                Product.is_active == True
            ).limit(10)
        )
        products = result.scalars().all()

    if not products:
        text = "😔 В этой категории пока нет товаров.\nПопробуйте выбрать другую категорию."
        await callback.message.edit_text(text, reply_markup=get_categories_keyboard())
        await callback.answer()
        return

    # Показываем первый товар
    product = products[0]
    text = format_product_card(product)

    # Получаем доступные размеры и цвета
    sizes, colors = await get_product_variants(session, product.id)

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

def format_product_card(product: Product) -> str:
    """Форматирование карточки товара"""
    price_text = f"{product.price:,} ₸"

    if product.discount_price and product.discount_price < product.price:
        discount_percent = int((1 - product.discount_price / product.price) * 100)
        price_text = f"💰 <s>{product.price:,} ₸</s> {product.discount_price:,} ₸ (-{discount_percent}%)"
    else:
        price_text = f"💰 {price_text}"

    rating_text = ""
    if product.rating > 0:
        stars = "⭐" * int(product.rating)
        rating_text = f"⭐ {product.rating:.1f}/5 ({product.review_count} отзывов)"

    text = f"""
<b>{product.name}</b>

{rating_text}

{price_text}

📝 <b>Описание:</b>
{product.description or 'Описание товара отсутствует'}

⚡ <b>Характеристики:</b>
"""

    if product.material:
        text += f"• Материал: {product.material}\n"
    if product.fit_type:
        text += f"• Посадка: {product.fit_type}\n"

    text += "• Страна: Выполнено в Корее\n• Рекомендация: Брать на размер больше"

    return text.strip()

async def get_product_variants(session, product_id: int) -> tuple[List[str], List[Dict[str, Any]]]:
    """Получить доступные размеры и цвета товара"""
    from models.database import ProductSize, ProductColor

    # Получаем размеры
    sizes_result = await session.execute(
        select(ProductSize.size).where(
            ProductSize.product_id == product_id,
            ProductSize.quantity > 0
        )
    )
    sizes = [row[0] for row in sizes_result.fetchall()]

    # Получаем цвета
    colors_result = await session.execute(
        select(ProductColor.color_name, ProductColor.emoji).where(
            ProductColor.product_id == product_id
        )
    )
    colors = [{"name": row[0], "emoji": row[1]} for row in colors_result.fetchall()]

    return sizes, colors

@router.callback_query(F.data.startswith("add_to_cart_"))
async def callback_add_to_cart(callback: CallbackQuery):
    """Добавить товар в корзину"""
    product_id = int(callback.data.replace("add_to_cart_", ""))

    # TODO: Реализовать логику добавления в корзину
    # Пока просто показываем сообщение
    await callback.answer("✅ Товар добавлен в корзину!", show_alert=True)

@router.callback_query(F.data.startswith("favorite_"))
async def callback_toggle_favorite(callback: CallbackQuery):
    """Добавить/убрать из избранного"""
    product_id = int(callback.data.replace("favorite_", ""))

    # TODO: Реализовать логику избранного
    await callback.answer("❤️ Добавлено в избранное!", show_alert=True)

def register_catalog_handlers(dp):
    """Регистрация обработчиков каталога"""
    dp.include_router(router)
