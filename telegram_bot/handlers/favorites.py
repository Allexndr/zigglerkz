from aiogram import Router, F
from aiogram.types import Message, CallbackQuery
from aiogram.filters import Command
from keyboards.main_menu import get_back_to_menu_keyboard
from models.database import Favorite, Product, get_session
from sqlalchemy import select

router = Router()

@router.message(F.text == "❤️ Избранное")
@router.message(Command("favorites"))
async def cmd_favorites(message: Message):
    """Показать избранные товары"""
    user_id = message.from_user.id

    async with get_session() as session:
        result = await session.execute(
            select(Favorite, Product).join(
                Product, Favorite.product_id == Product.id
            ).where(
                Favorite.user_id == user_id,
                Product.is_active == True
            ).order_by(Favorite.added_at.desc())
        )
        favorites = result.all()

    if not favorites:
        text = (
            "❤️ <b>Избранное пусто</b>\n\n"
            "Добавляйте товары в избранное, нажимая ❤️ на карточке товара.\n\n"
            "Посмотреть каталог?"
        )
        await message.answer(text, reply_markup=get_back_to_menu_keyboard())
        return

    text = f"❤️ <b>Избранное ({len(favorites)} товаров)</b>\n\n"

    from aiogram.utils.keyboard import InlineKeyboardBuilder
    from aiogram.types import InlineKeyboardButton

    builder = InlineKeyboardBuilder()

    for i, (favorite, product) in enumerate(favorites, 1):
        price = product.discount_price or product.price
        price_text = f"{price:,} ₸"

        if product.discount_price and product.discount_price < product.price:
            discount_percent = int((1 - product.discount_price / product.price) * 100)
            price_text += f" (-{discount_percent}%)"

        text += (
            f"{i}. <b>{product.name}</b>\n"
            f"   💰 {price_text}\n"
            f"   ⭐ {product.rating:.1f}/5 ({product.review_count} отзывов)\n\n"
        )

        # Добавляем кнопки для каждого товара
        builder.add(
            InlineKeyboardButton(
                text=f"👀 Посмотреть #{i}",
                callback_data=f"view_fav_{product.id}"
            ),
            InlineKeyboardButton(
                text=f"🛒 В корзину #{i}",
                callback_data=f"add_fav_to_cart_{product.id}"
            )
        )
        builder.add(
            InlineKeyboardButton(
                text=f"💔 Удалить #{i}",
                callback_data=f"remove_fav_{product.id}"
            )
        )

    builder.add(
        InlineKeyboardButton(text="⬅️ Главное меню", callback_data="main_menu")
    )

    builder.adjust(2, 1)  # 2 кнопки в первом ряду, 1 во втором

    await message.answer(text, reply_markup=builder.as_markup())

@router.callback_query(F.data == "favorites")
async def callback_favorites(callback: CallbackQuery):
    """Показать избранное через callback"""
    user_id = callback.from_user.id

    async with get_session() as session:
        result = await session.execute(
            select(Favorite, Product).join(
                Product, Favorite.product_id == Product.id
            ).where(
                Favorite.user_id == user_id,
                Product.is_active == True
            ).order_by(Favorite.added_at.desc())
        )
        favorites = result.all()

    if not favorites:
        text = (
            "❤️ <b>Избранное пусто</b>\n\n"
            "Добавляйте товары в избранное, нажимая ❤️ на карточке товара."
        )
        await callback.message.edit_text(text, reply_markup=get_back_to_menu_keyboard())
        await callback.answer()
        return

    text = f"❤️ <b>Избранное ({len(favorites)} товаров)</b>\n\n"

    from aiogram.utils.keyboard import InlineKeyboardBuilder
    from aiogram.types import InlineKeyboardButton

    builder = InlineKeyboardBuilder()

    for i, (favorite, product) in enumerate(favorites, 1):
        price = product.discount_price or product.price
        price_text = f"{price:,} ₸"

        if product.discount_price and product.discount_price < product.price:
            discount_percent = int((1 - product.discount_price / product.price) * 100)
            price_text += f" (-{discount_percent}%)"

        text += (
            f"{i}. <b>{product.name}</b>\n"
            f"   💰 {price_text}\n"
            f"   ⭐ {product.rating:.1f}/5 ({product.review_count} отзывов)\n\n"
        )

        builder.add(
            InlineKeyboardButton(text=f"👀 Посмотреть #{i}", callback_data=f"view_fav_{product.id}"),
            InlineKeyboardButton(text=f"🛒 В корзину #{i}", callback_data=f"add_fav_to_cart_{product.id}")
        )
        builder.add(
            InlineKeyboardButton(text=f"💔 Удалить #{i}", callback_data=f"remove_fav_{product.id}")
        )

    builder.add(
        InlineKeyboardButton(text="⬅️ Главное меню", callback_data="main_menu")
    )

    builder.adjust(2, 1)

    await callback.message.edit_text(text, reply_markup=builder.as_markup())
    await callback.answer()

@router.callback_query(F.data.startswith("remove_fav_"))
async def callback_remove_favorite(callback: CallbackQuery):
    """Удалить товар из избранного"""
    product_id = int(callback.data.replace("remove_fav_", ""))
    user_id = callback.from_user.id

    async with get_session() as session:
        await session.execute(
            select(Favorite).where(
                Favorite.user_id == user_id,
                Favorite.product_id == product_id
            ).delete()
        )
        await session.commit()

    await callback.answer("💔 Удалено из избранного")

    # Обновляем сообщение
    await callback_favorites(callback)

@router.callback_query(F.data.startswith("view_fav_"))
async def callback_view_favorite(callback: CallbackQuery):
    """Показать товар из избранного"""
    product_id = int(callback.data.replace("view_fav_", ""))

    async with get_session() as session:
        result = await session.execute(
            select(Product).where(Product.id == product_id)
        )
        product = result.scalar_one_or_none()

    if not product:
        await callback.answer("Товар не найден")
        return

    # Импортируем функцию форматирования из catalog.py
    from handlers.catalog import format_product_card, get_product_variants
    from keyboards.main_menu import get_product_actions_keyboard

    text = format_product_card(product)
    sizes, colors = await get_product_variants(session, product.id)

    if sizes:
        text += f"\n📏 <b>Размеры:</b> {' '.join(sizes)}"
    if colors:
        text += f"\n🎨 <b>Цвета:</b> {' '.join([c['emoji'] for c in colors])}"

    await callback.message.edit_text(
        text,
        reply_markup=get_product_actions_keyboard(product.id, in_favorites=True)
    )
    await callback.answer()

def register_favorites_handlers(dp):
    """Регистрация обработчиков избранного"""
    dp.include_router(router)
