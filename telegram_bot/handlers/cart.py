from aiogram import Router, F
from aiogram.types import Message, CallbackQuery
from aiogram.filters import Command
from keyboards.main_menu import get_back_to_menu_keyboard
from models.database import CartItem, Product, get_session
from sqlalchemy import select, func

router = Router()

@router.message(F.text == "🛒 Корзина")
@router.message(Command("cart"))
async def cmd_cart(message: Message):
    """Показать корзину пользователя"""
    user_id = message.from_user.id

    async with get_session() as session:
        # Получаем товары в корзине с информацией о продуктах
        result = await session.execute(
            select(CartItem, Product).join(
                Product, CartItem.product_id == Product.id
            ).where(CartItem.user_id == user_id)
        )
        cart_items = result.all()

    if not cart_items:
        text = (
            "🛒 <b>Ваша корзина пуста</b>\n\n"
            "Добавьте товары из каталога, чтобы оформить заказ.\n\n"
            "Хотите посмотреть каталог?"
        )
        await message.answer(text, reply_markup=get_back_to_menu_keyboard())
        return

    # Формируем текст корзины
    text = "🛒 <b>Ваша корзина</b>\n\n"
    total_price = 0

    for cart_item, product in cart_items:
        price = product.discount_price or product.price
        item_total = price * cart_item.quantity
        total_price += item_total

        text += (
            f"• <b>{product.name}</b>\n"
            f"   Размер: {cart_item.size}, Цвет: {cart_item.color}\n"
            f"   Количество: {cart_item.quantity} × {price:,} ₸ = {item_total:,} ₸\n\n"
        )

    text += f"💰 <b>Итого: {total_price:,} ₸</b>\n\n"

    if total_price < 100000:  # Бесплатная доставка от 100к
        delivery_cost = 5000
        text += f"🚚 Доставка: {delivery_cost:,} ₸\n"
        text += f"💰 <b>К оплате: {total_price + delivery_cost:,} ₸</b>\n\n"
    else:
        text += "🚚 Доставка: <b>Бесплатно</b> (от 100,000 ₸)\n\n"

    # Создаем клавиатуру для корзины
    from aiogram.utils.keyboard import InlineKeyboardBuilder
    builder = InlineKeyboardBuilder()

    builder.add(
        InlineKeyboardButton(text="✅ Оформить заказ", callback_data="checkout"),
        InlineKeyboardButton(text="🗑️ Очистить корзину", callback_data="clear_cart")
    )
    builder.add(
        InlineKeyboardButton(text="⬅️ Продолжить покупки", callback_data="catalog")
    )

    await message.answer(text, reply_markup=builder.as_markup())

@router.callback_query(F.data == "cart")
async def callback_cart(callback: CallbackQuery):
    """Показать корзину через callback"""
    user_id = callback.from_user.id

    async with get_session() as session:
        result = await session.execute(
            select(CartItem, Product).join(
                Product, CartItem.product_id == Product.id
            ).where(CartItem.user_id == user_id)
        )
        cart_items = result.all()

    if not cart_items:
        text = (
            "🛒 <b>Ваша корзина пуста</b>\n\n"
            "Добавьте товары из каталога, чтобы оформить заказ."
        )
        await callback.message.edit_text(text, reply_markup=get_back_to_menu_keyboard())
        await callback.answer()
        return

    # Формируем текст корзины (аналогично cmd_cart)
    text = "🛒 <b>Ваша корзина</b>\n\n"
    total_price = 0

    for cart_item, product in cart_items:
        price = product.discount_price or product.price
        item_total = price * cart_item.quantity
        total_price += item_total

        text += (
            f"• <b>{product.name}</b>\n"
            f"   Размер: {cart_item.size}, Цвет: {cart_item.color}\n"
            f"   Количество: {cart_item.quantity} × {price:,} ₸ = {item_total:,} ₸\n\n"
        )

    text += f"💰 <b>Итого: {total_price:,} ₸</b>\n\n"

    if total_price < 100000:
        delivery_cost = 5000
        text += f"🚚 Доставка: {delivery_cost:,} ₸\n"
        text += f"💰 <b>К оплате: {total_price + delivery_cost:,} ₸</b>\n\n"
    else:
        text += "🚚 Доставка: <b>Бесплатно</b> (от 100,000 ₸)\n\n"

    from aiogram.types import InlineKeyboardButton
    from aiogram.utils.keyboard import InlineKeyboardBuilder
    builder = InlineKeyboardBuilder()

    builder.add(
        InlineKeyboardButton(text="✅ Оформить заказ", callback_data="checkout"),
        InlineKeyboardButton(text="🗑️ Очистить корзину", callback_data="clear_cart")
    )
    builder.add(
        InlineKeyboardButton(text="⬅️ Продолжить покупки", callback_data="catalog")
    )

    await callback.message.edit_text(text, reply_markup=builder.as_markup())
    await callback.answer()

@router.callback_query(F.data == "clear_cart")
async def callback_clear_cart(callback: CallbackQuery):
    """Очистить корзину"""
    user_id = callback.from_user.id

    async with get_session() as session:
        await session.execute(
            select(CartItem).where(CartItem.user_id == user_id).delete()
        )
        await session.commit()

    text = (
        "🗑️ <b>Корзина очищена</b>\n\n"
        "Все товары удалены из корзины.\n\n"
        "Хотите посмотреть каталог?"
    )

    await callback.message.edit_text(text, reply_markup=get_back_to_menu_keyboard())
    await callback.answer("Корзина очищена")

def register_cart_handlers(dp):
    """Регистрация обработчиков корзины"""
    dp.include_router(router)
