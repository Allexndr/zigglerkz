import pytest
import asyncio
from unittest.mock import AsyncMock, MagicMock
from aiogram import Bot
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.fsm.context import FSMContext
from aiogram.types import User, Chat, Message, CallbackQuery

from lib.mongodb import MongoDB


@pytest.fixture(scope="session")
def event_loop():
    """Create an instance of the default event loop for the test session."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture(autouse=True)
async def setup_database():
    """Initialize test database before each test."""
    await MongoDB.connect()
    yield
    # Cleanup could be added here if needed


@pytest.fixture
def mock_bot():
    """Mock Bot instance."""
    bot = MagicMock(spec=Bot)
    bot.send_message = AsyncMock()
    bot.edit_message_text = AsyncMock()
    bot.delete_message = AsyncMock()
    return bot


@pytest.fixture
def mock_user():
    """Mock Telegram User."""
    return User(
        id=123456789,
        is_bot=False,
        first_name="Test",
        last_name="User",
        username="testuser",
        language_code="ru"
    )


@pytest.fixture
def mock_chat():
    """Mock Telegram Chat."""
    return Chat(
        id=123456789,
        type="private",
        title=None,
        username="testuser",
        first_name="Test",
        last_name="User"
    )


@pytest.fixture
def mock_message(mock_user, mock_chat):
    """Mock Telegram Message."""
    message = MagicMock(spec=Message)
    message.message_id = 1
    message.from_user = mock_user
    message.chat = mock_chat
    message.text = "/start"
    message.date = 1640995200  # 2022-01-01 00:00:00 UTC
    message.reply = AsyncMock()
    message.answer = AsyncMock()
    return message


@pytest.fixture
def mock_callback_query(mock_user, mock_chat):
    """Mock Telegram CallbackQuery."""
    callback_query = MagicMock(spec=CallbackQuery)
    callback_query.id = "test_callback_id"
    callback_query.from_user = mock_user
    callback_query.message = MagicMock()
    callback_query.message.chat = mock_chat
    callback_query.message.message_id = 1
    callback_query.data = "test_data"
    callback_query.answer = AsyncMock()
    return callback_query


@pytest.fixture
def mock_fsm_context():
    """Mock FSM Context."""
    context = MagicMock(spec=FSMContext)
    context.get_state = AsyncMock(return_value=None)
    context.set_state = AsyncMock()
    context.update_data = AsyncMock()
    context.get_data = AsyncMock(return_value={})
    context.clear = AsyncMock()
    return context


@pytest.fixture
async def db_user(mock_user):
    """Create a test database user."""
    from services.user_service import UserService

    user_data = {
        "id": mock_user.id,
        "username": mock_user.username,
        "first_name": mock_user.first_name,
        "last_name": mock_user.last_name
    }

    # Create or update user using the service
    user = await UserService.create_or_update_user(user_data)
    return user
