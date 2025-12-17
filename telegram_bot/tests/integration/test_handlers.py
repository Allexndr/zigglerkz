import pytest
from unittest.mock import AsyncMock
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram import Dispatcher

from handlers.start import register_start_handlers
from handlers.catalog import register_catalog_handlers


class TestStartHandler:
    """Integration tests for start handler."""

    @pytest.fixture
    async def dispatcher(self):
        """Create dispatcher with handlers."""
        dp = Dispatcher(storage=MemoryStorage())
        register_start_handlers(dp)
        return dp

    @pytest.mark.asyncio
    async def test_start_command(self, dispatcher, mock_message, mock_bot):
        """Test /start command handling."""
        # Mock the message.reply method
        mock_message.reply = AsyncMock()

        # Process the message through dispatcher
        await dispatcher.process_update({
            "update_id": 1,
            "message": {
                "message_id": mock_message.message_id,
                "from": {
                    "id": mock_message.from_user.id,
                    "is_bot": False,
                    "first_name": mock_message.from_user.first_name,
                    "username": mock_message.from_user.username,
                    "language_code": "ru"
                },
                "chat": {
                    "id": mock_message.chat.id,
                    "type": "private",
                    "username": mock_message.chat.username,
                    "first_name": mock_message.chat.first_name
                },
                "date": mock_message.date,
                "text": "/start"
            }
        })

        # Verify that reply was called with welcome message
        mock_message.reply.assert_called_once()
        call_args = mock_message.reply.call_args[0][0]
        assert "Добро пожаловать в Ziggler" in call_args


class TestCatalogHandler:
    """Integration tests for catalog handler."""

    @pytest.fixture
    async def dispatcher(self):
        """Create dispatcher with handlers."""
        dp = Dispatcher(storage=MemoryStorage())
        register_catalog_handlers(dp)
        return dp

    @pytest.mark.asyncio
    async def test_catalog_command(self, dispatcher, mock_message):
        """Test /catalog command handling."""
        mock_message.reply = AsyncMock()

        await dispatcher.process_update({
            "update_id": 1,
            "message": {
                "message_id": mock_message.message_id,
                "from": {
                    "id": mock_message.from_user.id,
                    "is_bot": False,
                    "first_name": mock_message.from_user.first_name,
                    "username": mock_message.from_user.username
                },
                "chat": {
                    "id": mock_message.chat.id,
                    "type": "private"
                },
                "date": mock_message.date,
                "text": "/catalog"
            }
        })

        # Verify catalog menu was sent
        mock_message.reply.assert_called_once()
        call_args = mock_message.reply.call_args[0][0]
        assert "Каталог Ziggler" in call_args


class TestCallbackHandlers:
    """Integration tests for callback query handlers."""

    @pytest.fixture
    async def dispatcher(self):
        """Create dispatcher with all handlers."""
        dp = Dispatcher(storage=MemoryStorage())
        register_start_handlers(dp)
        register_catalog_handlers(dp)
        return dp

    @pytest.mark.asyncio
    async def test_catalog_callback(self, dispatcher, mock_callback_query):
        """Test catalog callback handling."""
        mock_callback_query.data = "catalog"
        mock_callback_query.message.edit_text = AsyncMock()

        await dispatcher.process_update({
            "update_id": 1,
            "callback_query": {
                "id": mock_callback_query.id,
                "from": {
                    "id": mock_callback_query.from_user.id,
                    "is_bot": False,
                    "first_name": mock_callback_query.from_user.first_name
                },
                "data": "catalog",
                "message": {
                    "message_id": 1,
                    "chat": {
                        "id": mock_callback_query.message.chat.id,
                        "type": "private"
                    }
                }
            }
        })

        # Verify catalog menu was shown
        mock_callback_query.message.edit_text.assert_called_once()
        call_args = mock_callback_query.message.edit_text.call_args[0][0]
        assert "Каталог Ziggler" in call_args

        # Verify callback was answered
        mock_callback_query.answer.assert_called_once()

    @pytest.mark.asyncio
    async def test_main_menu_callback(self, dispatcher, mock_callback_query):
        """Test main menu callback handling."""
        mock_callback_query.data = "main_menu"
        mock_callback_query.message.edit_text = AsyncMock()

        await dispatcher.process_update({
            "update_id": 1,
            "callback_query": {
                "id": mock_callback_query.id,
                "from": {
                    "id": mock_callback_query.from_user.id,
                    "is_bot": False,
                    "first_name": mock_callback_query.from_user.first_name
                },
                "data": "main_menu",
                "message": {
                    "message_id": 1,
                    "chat": {
                        "id": mock_callback_query.message.chat.id,
                        "type": "private"
                    }
                }
            }
        })

        # Verify main menu was shown
        mock_callback_query.message.edit_text.assert_called_once()
        call_args = mock_callback_query.message.edit_text.call_args[0][0]
        assert "Ziggler - Главное меню" in call_args
