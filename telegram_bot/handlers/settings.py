from aiogram import Router, F
from aiogram.types import Message, CallbackQuery
from aiogram.filters import Command
from keyboards.main_menu import get_back_to_menu_keyboard
from models.database import User, get_session
from sqlalchemy import select

router = Router()

@router.message(F.text == "⚙️ Настройки")
@router.message(Command("settings"))
async def cmd_settings(message: Message):
    """Показать настройки пользователя"""
    user_id = message.from_user.id

    async with get_session() as session:
        result = await session.execute(
            select(User).where(User.telegram_id == user_id)
        )
        user = result.scalar_one_or_none()

    if not user:
        await message.answer("Пользователь не найден. Попробуйте перезапустить бота командой /start")
        return

    text = (
        f"⚙️ <b>Настройки профиля</b>\n\n"
        f"👤 <b>Личные данные:</b>\n"
        f"   Имя: {user.full_name or 'Не указано'}\n"
        f"   Телефон: {user.phone or 'Не указан'}\n"
        f"   Email: {user.email or 'Не указан'}\n\n"
        f"🌐 <b>Язык:</b> {get_language_name(user.language)}\n"
        f"🔔 <b>Уведомления:</b> {'Включены' if user.notifications_enabled else 'Отключены'}\n\n"
        f"Выберите действие:"
    )

    from aiogram.utils.keyboard import InlineKeyboardBuilder
    from aiogram.types import InlineKeyboardButton

    builder = InlineKeyboardBuilder()

    builder.add(
        InlineKeyboardButton(text="👤 Изменить данные", callback_data="edit_profile"),
        InlineKeyboardButton(text="📍 Адреса доставки", callback_data="delivery_addresses")
    )
    builder.add(
        InlineKeyboardButton(text="🌐 Изменить язык", callback_data="change_language"),
        InlineKeyboardButton(text="🔔 Уведомления", callback_data="toggle_notifications")
    )
    builder.add(
        InlineKeyboardButton(text="⬅️ Главное меню", callback_data="main_menu")
    )

    builder.adjust(2, 2, 1)

    await message.answer(text, reply_markup=builder.as_markup())

@router.callback_query(F.data == "settings")
async def callback_settings(callback: CallbackQuery):
    """Показать настройки через callback"""
    user_id = callback.from_user.id

    async with get_session() as session:
        result = await session.execute(
            select(User).where(User.telegram_id == user_id)
        )
        user = result.scalar_one_or_none()

    if not user:
        await callback.answer("Пользователь не найден")
        return

    text = (
        f"⚙️ <b>Настройки профиля</b>\n\n"
        f"👤 <b>Личные данные:</b>\n"
        f"   Имя: {user.full_name or 'Не указано'}\n"
        f"   Телефон: {user.phone or 'Не указано'}\n"
        f"   Email: {user.email or 'Не указан'}\n\n"
        f"🌐 <b>Язык:</b> {get_language_name(user.language)}\n"
        f"🔔 <b>Уведомления:</b> {'Включены' if user.notifications_enabled else 'Отключены'}\n\n"
        f"Выберите действие:"
    )

    from aiogram.utils.keyboard import InlineKeyboardBuilder
    from aiogram.types import InlineKeyboardButton

    builder = InlineKeyboardBuilder()

    builder.add(
        InlineKeyboardButton(text="👤 Изменить данные", callback_data="edit_profile"),
        InlineKeyboardButton(text="📍 Адреса доставки", callback_data="delivery_addresses")
    )
    builder.add(
        InlineKeyboardButton(text="🌐 Изменить язык", callback_data="change_language"),
        InlineKeyboardButton(text="🔔 Уведомления", callback_data="toggle_notifications")
    )
    builder.add(
        InlineKeyboardButton(text="⬅️ Главное меню", callback_data="main_menu")
    )

    builder.adjust(2, 2, 1)

    await callback.message.edit_text(text, reply_markup=builder.as_markup())
    await callback.answer()

@router.callback_query(F.data == "toggle_notifications")
async def callback_toggle_notifications(callback: CallbackQuery):
    """Включить/выключить уведомления"""
    user_id = callback.from_user.id

    async with get_session() as session:
        result = await session.execute(
            select(User).where(User.telegram_id == user_id)
        )
        user = result.scalar_one_or_none()

        if user:
            user.notifications_enabled = not user.notifications_enabled
            await session.commit()

            status = "включены" if user.notifications_enabled else "отключены"
            await callback.answer(f"🔔 Уведомления {status}", show_alert=True)

            # Обновляем сообщение настроек
            await callback_settings(callback)

@router.callback_query(F.data == "change_language")
async def callback_change_language(callback: CallbackQuery):
    """Изменить язык"""
    text = (
        "🌐 <b>Выбор языка</b>\n\n"
        "Выберите язык интерфейса:"
    )

    from aiogram.utils.keyboard import InlineKeyboardBuilder
    from aiogram.types import InlineKeyboardButton

    builder = InlineKeyboardBuilder()

    builder.add(
        InlineKeyboardButton(text="🇷🇺 Русский", callback_data="set_lang_ru"),
        InlineKeyboardButton(text="🇰🇿 Қазақша", callback_data="set_lang_kk")
    )
    builder.add(
        InlineKeyboardButton(text="🇬🇧 English", callback_data="set_lang_en"),
        InlineKeyboardButton(text="⬅️ Назад", callback_data="settings")
    )

    builder.adjust(2, 2)

    await callback.message.edit_text(text, reply_markup=builder.as_markup())
    await callback.answer()

@router.callback_query(F.data.startswith("set_lang_"))
async def callback_set_language(callback: CallbackQuery):
    """Установить язык"""
    lang_code = callback.data.replace("set_lang_", "")
    user_id = callback.from_user.id

    async with get_session() as session:
        result = await session.execute(
            select(User).where(User.telegram_id == user_id)
        )
        user = result.scalar_one_or_none()

        if user:
            user.language = lang_code
            await session.commit()

            lang_name = get_language_name(lang_code)
            await callback.answer(f"🌐 Язык изменён на {lang_name}", show_alert=True)

            # Возвращаемся к настройкам
            await callback_settings(callback)

@router.callback_query(F.data == "edit_profile")
async def callback_edit_profile(callback: CallbackQuery):
    """Изменить личные данные"""
    text = (
        "👤 <b>Редактирование профиля</b>\n\n"
        "Выберите, что хотите изменить:"
    )

    from aiogram.utils.keyboard import InlineKeyboardBuilder
    from aiogram.types import InlineKeyboardButton

    builder = InlineKeyboardBuilder()

    builder.add(
        InlineKeyboardButton(text="📱 Изменить телефон", callback_data="edit_phone"),
        InlineKeyboardButton(text="📧 Изменить email", callback_data="edit_email")
    )
    builder.add(
        InlineKeyboardButton(text="⬅️ Назад к настройкам", callback_data="settings")
    )

    builder.adjust(2, 1)

    await callback.message.edit_text(text, reply_markup=builder.as_markup())
    await callback.answer()

@router.callback_query(F.data == "delivery_addresses")
async def callback_delivery_addresses(callback: CallbackQuery):
    """Показать адреса доставки"""
    text = (
        "📍 <b>Адреса доставки</b>\n\n"
        "Здесь будут отображаться ваши сохранённые адреса доставки.\n\n"
        "<i>Функция в разработке</i>"
    )

    from aiogram.types import InlineKeyboardButton
    from aiogram.utils.keyboard import InlineKeyboardBuilder

    builder = InlineKeyboardBuilder()
    builder.add(
        InlineKeyboardButton(text="➕ Добавить адрес", callback_data="add_address"),
        InlineKeyboardButton(text="⬅️ Назад к настройкам", callback_data="settings")
    )

    await callback.message.edit_text(text, reply_markup=builder.as_markup())
    await callback.answer()

def get_language_name(lang_code: str) -> str:
    """Получить название языка по коду"""
    languages = {
        "ru": "Русский",
        "kk": "Қазақша",
        "en": "English"
    }
    return languages.get(lang_code, "Русский")

def register_settings_handlers(dp):
    """Регистрация обработчиков настроек"""
    dp.include_router(router)
