from aiogram import Router, F
from aiogram.types import Message, CallbackQuery
from aiogram.filters import Command
from keyboards.main_menu import get_back_to_menu_keyboard
from models.database import Order, OrderItem, Product, get_session
from sqlalchemy import select, desc

router = Router()

@router.message(F.text == "📋 Заказы")
@router.message(Command("orders"))
async def cmd_orders(message: Message):
    """Показать заказы пользователя"""
    user_id = message.from_user.id

    async with get_session() as session:
        result = await session.execute(
            select(Order).where(Order.user_id == user_id).order_by(desc(Order.created_at))
        )
        orders = result.scalars().all()

    if not orders:
        text = (
            "📋 <b>У вас пока нет заказов</b>\n\n"
            "Сделайте свой первый заказ в нашем каталоге!\n\n"
            "Хотите посмотреть товары?"
        )
        await message.answer(text, reply_markup=get_back_to_menu_keyboard())
        return

    text = f"📋 <b>Мои заказы ({len(orders)})</b>\n\n"

    from aiogram.utils.keyboard import InlineKeyboardBuilder
    from aiogram.types import InlineKeyboardButton

    builder = InlineKeyboardBuilder()

    for i, order in enumerate(orders, 1):
        status_emoji = get_status_emoji(order.status)
        status_text = get_status_text(order.status)

        text += (
            f"{i}. <b>Заказ #{order.id}</b>\n"
            f"   📅 {order.created_at.strftime('%d.%m.%Y %H:%M')}\n"
            f"   {status_emoji} {status_text}\n"
            f"   💰 {order.total_price:,} ₸\n\n"
        )

        builder.add(
            InlineKeyboardButton(
                text=f"📋 Детали #{i}",
                callback_data=f"order_details_{order.id}"
            ),
            InlineKeyboardButton(
                text=f"🚚 Отследить #{i}",
                callback_data=f"track_order_{order.id}"
            )
        )

    builder.add(
        InlineKeyboardButton(text="⬅️ Главное меню", callback_data="main_menu")
    )

    builder.adjust(2, 1)

    await message.answer(text, reply_markup=builder.as_markup())

@router.callback_query(F.data == "orders")
async def callback_orders(callback: CallbackQuery):
    """Показать заказы через callback"""
    user_id = callback.from_user.id

    async with get_session() as session:
        result = await session.execute(
            select(Order).where(Order.user_id == user_id).order_by(desc(Order.created_at))
        )
        orders = result.scalars().all()

    if not orders:
        text = (
            "📋 <b>У вас пока нет заказов</b>\n\n"
            "Сделайте свой первый заказ в нашем каталоге!"
        )
        await callback.message.edit_text(text, reply_markup=get_back_to_menu_keyboard())
        await callback.answer()
        return

    text = f"📋 <b>Мои заказы ({len(orders)})</b>\n\n"

    from aiogram.utils.keyboard import InlineKeyboardBuilder
    from aiogram.types import InlineKeyboardButton

    builder = InlineKeyboardBuilder()

    for i, order in enumerate(orders, 1):
        status_emoji = get_status_emoji(order.status)
        status_text = get_status_text(order.status)

        text += (
            f"{i}. <b>Заказ #{order.id}</b>\n"
            f"   📅 {order.created_at.strftime('%d.%m.%Y %H:%M')}\n"
            f"   {status_emoji} {status_text}\n"
            f"   💰 {order.total_price:,} ₸\n\n"
        )

        builder.add(
            InlineKeyboardButton(text=f"📋 Детали #{i}", callback_data=f"order_details_{order.id}"),
            InlineKeyboardButton(text=f"🚚 Отследить #{i}", callback_data=f"track_order_{order.id}")
        )

    builder.add(
        InlineKeyboardButton(text="⬅️ Главное меню", callback_data="main_menu")
    )

    builder.adjust(2, 1)

    await callback.message.edit_text(text, reply_markup=builder.as_markup())
    await callback.answer()

@router.callback_query(F.data.startswith("order_details_"))
async def callback_order_details(callback: CallbackQuery):
    """Показать детали заказа"""
    order_id = int(callback.data.replace("order_details_", ""))
    user_id = callback.from_user.id

    async with get_session() as session:
        # Получаем заказ
        result = await session.execute(
            select(Order).where(Order.id == order_id, Order.user_id == user_id)
        )
        order = result.scalar_one_or_none()

        if not order:
            await callback.answer("Заказ не найден")
            return

        # Получаем товары заказа
        items_result = await session.execute(
            select(OrderItem, Product).join(
                Product, OrderItem.product_id == Product.id
            ).where(OrderItem.order_id == order_id)
        )
        items = items_result.all()

    status_emoji = get_status_emoji(order.status)
    status_text = get_status_text(order.status)

    text = (
        f"📋 <b>Заказ #{order.id}</b>\n\n"
        f"📅 Дата: {order.created_at.strftime('%d.%m.%Y %H:%M')}\n"
        f"{status_emoji} Статус: {status_text}\n"
        f"💰 Сумма: {order.total_price:,} ₸\n"
        f"🚚 Доставка: {order.delivery_type}\n"
        f"📍 Адрес: {order.delivery_address or 'Не указан'}\n"
        f"📱 Телефон: {order.phone}\n"
    )

    if order.email:
        text += f"📧 Email: {order.email}\n"

    if order.notes:
        text += f"📝 Примечание: {order.notes}\n"

    text += "\n<b>Товары:</b>\n"

    for item, product in items:
        text += (
            f"• {product.name}\n"
            f"   Размер: {item.size}, Цвет: {item.color}\n"
            f"   Количество: {item.quantity} × {item.price:,} ₸\n\n"
        )

    from aiogram.types import InlineKeyboardButton
    from aiogram.utils.keyboard import InlineKeyboardBuilder
    builder = InlineKeyboardBuilder()

    builder.add(
        InlineKeyboardButton(text="🚚 Отследить заказ", callback_data=f"track_order_{order.id}"),
        InlineKeyboardButton(text="⬅️ Назад к заказам", callback_data="orders")
    )

    await callback.message.edit_text(text, reply_markup=builder.as_markup())
    await callback.answer()

@router.callback_query(F.data.startswith("track_order_"))
async def callback_track_order(callback: CallbackQuery):
    """Отследить заказ"""
    order_id = int(callback.data.replace("track_order_", ""))

    # TODO: Интеграция с системой отслеживания доставки
    # Пока показываем статический статус

    text = (
        f"🚚 <b>Отслеживание заказа #{order_id}</b>\n\n"
        f"📍 <b>Текущий статус:</b> Готовится к отправке\n\n"
        f"📦 <b>История:</b>\n"
        f"✅ Заказ подтверждён - {callback.message.date.strftime('%d.%m.%Y %H:%M')}\n"
        f"⏳ Готовится к отправке - Ожидается\n"
        f"🚚 В пути - Ожидается\n"
        f"📬 Доставлен - Ожидается\n\n"
        f"<i>Статус обновляется автоматически</i>"
    )

    from aiogram.types import InlineKeyboardButton
    from aiogram.utils.keyboard import InlineKeyboardBuilder
    builder = InlineKeyboardBuilder()

    builder.add(
        InlineKeyboardButton(text="📋 Детали заказа", callback_data=f"order_details_{order_id}"),
        InlineKeyboardButton(text="⬅️ Назад к заказам", callback_data="orders")
    )

    await callback.message.edit_text(text, reply_markup=builder.as_markup())
    await callback.answer()

def get_status_emoji(status: str) -> str:
    """Получить emoji для статуса заказа"""
    status_emojis = {
        "pending": "⏳",
        "confirmed": "✅",
        "preparing": "📦",
        "shipping": "🚚",
        "delivered": "📬",
        "cancelled": "❌"
    }
    return status_emojis.get(status, "❓")

def get_status_text(status: str) -> str:
    """Получить текстовое описание статуса"""
    status_texts = {
        "pending": "Ожидает подтверждения",
        "confirmed": "Подтверждён",
        "preparing": "Готовится",
        "shipping": "В пути",
        "delivered": "Доставлен",
        "cancelled": "Отменён"
    }
    return status_texts.get(status, "Неизвестный статус")

def register_orders_handlers(dp):
    """Регистрация обработчиков заказов"""
    dp.include_router(router)
