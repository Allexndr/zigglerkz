from aiogram import Router, F
from aiogram.types import Message, CallbackQuery
from keyboards.main_menu import get_back_to_menu_keyboard

router = Router()

@router.message(F.text == "📞 Контакты")
async def cmd_contacts(message: Message):
    """Показать контактную информацию"""
    text = (
        "📞 <b>Контакты Ziggler</b>\n\n"
        "📍 <b>Адрес:</b>\n"
        "г. Алматы, ул. Центральная, 123\n\n"
        "📱 <b>Телефон:</b>\n"
        "+7 (727) 123-45-67\n\n"
        "📧 <b>Email:</b>\n"
        "info@ziggler.kz\n"
        "support@ziggler.kz\n\n"
        "🕒 <b>Режим работы:</b>\n"
        "Пн-Пт: 9:00 - 18:00\n"
        "Сб-Вс: 10:00 - 16:00\n\n"
        "🌐 <b>Социальные сети:</b>\n"
        "Instagram: @ziggler_kz\n"
        "WhatsApp: +7 (727) 123-45-67\n"
        "Telegram: @ziggler_kz\n\n"
        "❓ <b>Есть вопросы?</b>\n"
        "Напишите нам в удобный мессенджер!"
    )

    from aiogram.utils.keyboard import InlineKeyboardBuilder
    from aiogram.types import InlineKeyboardButton

    builder = InlineKeyboardBuilder()

    builder.add(
        InlineKeyboardButton(text="📱 Позвонить", callback_data="call_phone"),
        InlineKeyboardButton(text="💬 WhatsApp", callback_data="whatsapp_contact")
    )
    builder.add(
        InlineKeyboardButton(text="📧 Написать email", callback_data="email_contact"),
        InlineKeyboardButton(text="⬅️ Главное меню", callback_data="main_menu")
    )

    builder.adjust(2, 2)

    await message.answer(text, reply_markup=builder.as_markup())

@router.callback_query(F.data == "contacts")
async def callback_contacts(callback: CallbackQuery):
    """Показать контакты через callback"""
    text = (
        "📞 <b>Контакты Ziggler</b>\n\n"
        "📍 <b>Адрес:</b>\n"
        "г. Алматы, ул. Центральная, 123\n\n"
        "📱 <b>Телефон:</b>\n"
        "+7 (727) 123-45-67\n\n"
        "📧 <b>Email:</b>\n"
        "info@ziggler.kz\n"
        "support@ziggler.kz\n\n"
        "🕒 <b>Режим работы:</b>\n"
        "Пн-Пт: 9:00 - 18:00\n"
        "Сб-Вс: 10:00 - 16:00\n\n"
        "🌐 <b>Социальные сети:</b>\n"
        "Instagram: @ziggler_kz\n"
        "WhatsApp: +7 (727) 123-45-67\n"
        "Telegram: @ziggler_kz"
    )

    from aiogram.utils.keyboard import InlineKeyboardBuilder
    from aiogram.types import InlineKeyboardButton

    builder = InlineKeyboardBuilder()

    builder.add(
        InlineKeyboardButton(text="📱 Позвонить", callback_data="call_phone"),
        InlineKeyboardButton(text="💬 WhatsApp", callback_data="whatsapp_contact")
    )
    builder.add(
        InlineKeyboardButton(text="📧 Написать email", callback_data="email_contact"),
        InlineKeyboardButton(text="⬅️ Главное меню", callback_data="main_menu")
    )

    builder.adjust(2, 2)

    await callback.message.edit_text(text, reply_markup=builder.as_markup())
    await callback.answer()

@router.callback_query(F.data == "call_phone")
async def callback_call_phone(callback: CallbackQuery):
    """Показать телефон для звонка"""
    phone_text = (
        "📱 <b>Телефон для связи:</b>\n\n"
        "+7 (727) 123-45-67\n\n"
        "Нажмите на номер, чтобы позвонить, или скопируйте его."
    )
    await callback.message.answer(phone_text, reply_markup=get_back_to_menu_keyboard())
    await callback.answer()

@router.callback_query(F.data == "whatsapp_contact")
async def callback_whatsapp_contact(callback: CallbackQuery):
    """Показать ссылку на WhatsApp"""
    whatsapp_text = (
        "💬 <b>WhatsApp:</b>\n\n"
        "Свяжитесь с нами в WhatsApp:\n"
        "+7 (727) 123-45-67\n\n"
        "Мы отвечаем в течение 15 минут в рабочее время."
    )
    await callback.message.answer(whatsapp_text, reply_markup=get_back_to_menu_keyboard())
    await callback.answer()

@router.callback_query(F.data == "email_contact")
async def callback_email_contact(callback: CallbackQuery):
    """Показать email для связи"""
    email_text = (
        "📧 <b>Email для связи:</b>\n\n"
        "📧 support@ziggler.kz - общие вопросы\n"
        "📧 info@ziggler.kz - информация о товарах\n\n"
        "Мы отвечаем в течение 24 часов."
    )
    await callback.message.answer(email_text, reply_markup=get_back_to_menu_keyboard())
    await callback.answer()

def register_common_handlers(dp):
    """Регистрация общих обработчиков"""
    dp.include_router(router)
