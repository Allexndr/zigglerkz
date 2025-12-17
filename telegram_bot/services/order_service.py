from lib.mongodb import get_orders_collection
from typing import List, Optional, Dict
import datetime

class OrderService:
    @staticmethod
    async def get_user_orders(user_id: int, limit: int = 20) -> List[Dict]:
        """Get user orders"""
        collection = get_orders_collection()

        orders = await collection.find(
            {"userId": user_id}
        ).sort("createdAt", -1).limit(limit).to_list(length=limit)

        return orders

    @staticmethod
    async def get_order_by_id(order_id: str, user_id: int) -> Optional[Dict]:
        """Get order by ID for user"""
        collection = get_orders_collection()

        order = await collection.find_one({
            "orderNumber": order_id,
            "userId": user_id
        })

        return order
