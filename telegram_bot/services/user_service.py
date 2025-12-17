from lib.mongodb import get_users_collection
from typing import Optional, Dict
import datetime

class UserService:
    @staticmethod
    async def create_or_update_user(telegram_data: Dict) -> Dict:
        """Create or update user from Telegram data"""
        collection = get_users_collection()

        user_data = {
            "telegramId": telegram_data["id"],
            "username": telegram_data.get("username"),
            "fullName": f"{telegram_data.get('first_name', '')} {telegram_data.get('last_name', '')}".strip(),
            "language": "ru",
            "notificationsEnabled": True,
            "updatedAt": datetime.datetime.utcnow()
        }

        # Try to find existing user
        existing_user = await collection.find_one({"telegramId": telegram_data["id"]})

        if existing_user:
            # Update existing user
            await collection.update_one(
                {"telegramId": telegram_data["id"]},
                {"$set": user_data}
            )
            user_data["_id"] = existing_user["_id"]
            user_data["createdAt"] = existing_user["createdAt"]
            return user_data
        else:
            # Create new user
            user_data["createdAt"] = datetime.datetime.utcnow()
            result = await collection.insert_one(user_data)
            user_data["_id"] = result.inserted_id
            return user_data

    @staticmethod
    async def get_user_by_telegram_id(telegram_id: int) -> Optional[Dict]:
        """Get user by Telegram ID"""
        collection = get_users_collection()
        user = await collection.find_one({"telegramId": telegram_id})
        return user

    @staticmethod
    async def update_user_preferences(telegram_id: int, preferences: Dict) -> None:
        """Update user preferences"""
        collection = get_users_collection()

        await collection.update_one(
            {"telegramId": telegram_id},
            {
                "$set": {
                    "preferences": preferences,
                    "updatedAt": datetime.datetime.utcnow()
                }
            }
        )

    @staticmethod
    async def add_user_address(telegram_id: int, address: Dict) -> None:
        """Add address to user"""
        collection = get_users_collection()

        address_data = {
            "id": str(datetime.datetime.utcnow().timestamp()),
            **address
        }

        # If this is default address, unset other defaults
        if address_data.get("isDefault"):
            await collection.update_one(
                {"telegramId": telegram_id},
                {"$unset": {"addresses.$[].isDefault": False}}
            )

        await collection.update_one(
            {"telegramId": telegram_id},
            {
                "$push": {"addresses": address_data},
                "$set": {"updatedAt": datetime.datetime.utcnow()}
            }
        )
