from aiogram import Router, F
from aiogram.types import Message, CallbackQuery
from aiogram.filters import Command
from keyboards.main_menu import get_main_keyboard, get_main_menu_buttons
from models.database import User, get_session
from sqlalchemy import select
from datetime import datetime

router = Router()

@router.message(Command("start"))
async def cmd_start(message: Message):
    """Обработчик команды /start"""
    telegram_id = message.from_user.id
    username = message.from_user.username
    full_name = message.from_user.full_name

    # Сохраняем или обновляем пользователя в БД
    async with get_session() as session:
        # Проверяем, существует ли пользователь
        result = await session.execute(
            select(User).where(User.telegram_id == telegram_id)
        )
        user = result.scalar_one_or_none()

        if user:
            # Обновляем информацию о пользователе
            user.username = username
            user.full_name = full_name
            user.updated_at = datetime.utcnow()
        else:
            # Создаем нового пользователя
            user = User(
                telegram_id=telegram_id,
                username=username,
                full_name=full_name
            )
            session.add(user)

        await session.commit()

    # Приветственное сообщение
    welcome_text = (
        f"👔 <b>Добро пожаловать в Ziggler!</b>\n\n"
        f"Здравствуйте, {full_name or 'уважаемый клиент'}! 👋\n\n"
        f"Мы рады представить вам премиум коллекцию мужских костюмов. "
        f"Здесь вы найдёте идеальный вариант для любого случая.\n\n"
        f"🎯 <b>Что вы можете сделать:</b>\n"
        f"• Просмотреть каталог стильных костюмов\n"
        f"• Добавить товары в избранное\n"
        f"• Оформить заказ через удобный интерфейс\n"
        f"• Отследить статус ваших заказов\n\n"
        f"Выберите действие ниже:"
    )

    await message.answer(
        welcome_text,
        reply_markup=get_main_keyboard()
    )

@router.callback_query(F.data == "main_menu")
async def callback_main_menu(callback: CallbackQuery):
    """Обработчик кнопки главного меню"""
    welcome_text = (
        f"👔 <b>Ziggler - Главное меню</b>\n\n"
        f"Выберите интересующий вас раздел:"
    )

    await callback.message.edit_text(
        welcome_text,
        reply_markup=get_main_menu_buttons()
    )
    await callback.answer()

def register_start_handlers(dp):
    """Регистрация обработчиков для старта"""
    dp.include_router(router)
