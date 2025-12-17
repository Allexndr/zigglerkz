from lib.mongodb import get_carts_collection, get_products_collection
from typing import Optional, Dict, List
from bson import ObjectId
import datetime

class CartService:
    @staticmethod
    async def get_cart(user_id: Optional[int] = None, session_id: Optional[str] = None) -> Optional[Dict]:
        """Get cart for user or session"""
        collection = get_carts_collection()

        query = {}
        if user_id:
            query["userId"] = user_id
        elif session_id:
            query["sessionId"] = session_id
        else:
            return None

        # Clean expired carts
        await collection.delete_many({"expiresAt": {"$lt": datetime.datetime.utcnow()}})

        cart = await collection.find_one(query)
        return cart

    @staticmethod
    async def create_cart(user_id: Optional[int] = None, session_id: Optional[str] = None) -> Dict:
        """Create new cart"""
        collection = get_carts_collection()

        cart = {
            "userId": user_id,
            "sessionId": session_id,
            "items": [],
            "totalPrice": 0,
            "totalItems": 0,
            "expiresAt": datetime.datetime.utcnow() + datetime.timedelta(days=7),
            "createdAt": datetime.datetime.utcnow(),
            "updatedAt": datetime.datetime.utcnow()
        }

        result = await collection.insert_one(cart)
        cart["_id"] = result.inserted_id
        return cart

    @staticmethod
    async def add_to_cart(
        product_id: str,
        size: str,
        color: str,
        quantity: int,
        user_id: Optional[int] = None,
        session_id: Optional[str] = None
    ) -> Dict:
        """Add product to cart"""
        cart = await CartService.get_cart(user_id, session_id)
        if not cart:
            cart = await CartService.create_cart(user_id, session_id)

        # Get product
        products_collection = get_products_collection()
        product = await products_collection.find_one({"_id": ObjectId(product_id), "isActive": True})
        if not product:
            raise ValueError("Product not found")

        # Check if item already exists
        existing_item = None
        for item in cart["items"]:
            if (str(item["productId"]) == product_id and
                item["size"] == size and
                item["color"] == color):
                existing_item = item
                break

        if existing_item:
            existing_item["quantity"] += quantity
            existing_item["totalPrice"] = existing_item["quantity"] * existing_item["price"]
        else:
            cart_item = {
                "productId": ObjectId(product_id),
                "product": product,
                "size": size,
                "color": color,
                "quantity": quantity,
                "price": product["price"],
                "totalPrice": product["price"] * quantity,
                "addedAt": datetime.datetime.utcnow()
            }
            cart["items"].append(cart_item)

        # Update totals
        cart["totalItems"] = sum(item["quantity"] for item in cart["items"])
        cart["totalPrice"] = sum(item["totalPrice"] for item in cart["items"])
        cart["updatedAt"] = datetime.datetime.utcnow()

        # Save cart
        collection = get_carts_collection()
        await collection.replace_one({"_id": cart["_id"]}, cart)

        return cart

    @staticmethod
    async def update_cart_item(
        product_id: str,
        size: str,
        color: str,
        quantity: int,
        user_id: Optional[int] = None,
        session_id: Optional[str] = None
    ) -> Dict:
        """Update cart item quantity"""
        cart = await CartService.get_cart(user_id, session_id)
        if not cart:
            raise ValueError("Cart not found")

        # Find and update item
        for item in cart["items"]:
            if (str(item["productId"]) == product_id and
                item["size"] == size and
                item["color"] == color):
                if quantity <= 0:
                    cart["items"].remove(item)
                else:
                    item["quantity"] = quantity
                    item["totalPrice"] = quantity * item["price"]
                break
        else:
            raise ValueError("Item not found in cart")

        # Update totals
        cart["totalItems"] = sum(item["quantity"] for item in cart["items"])
        cart["totalPrice"] = sum(item["totalPrice"] for item in cart["items"])
        cart["updatedAt"] = datetime.datetime.utcnow()

        # Save cart
        collection = get_carts_collection()
        await collection.replace_one({"_id": cart["_id"]}, cart)

        return cart

    @staticmethod
    async def clear_cart(user_id: Optional[int] = None, session_id: Optional[str] = None) -> None:
        """Clear cart"""
        collection = get_carts_collection()

        query = {}
        if user_id:
            query["userId"] = user_id
        elif session_id:
            query["sessionId"] = session_id

        await collection.update_one(
            query,
            {
                "$set": {
                    "items": [],
                    "totalPrice": 0,
                    "totalItems": 0,
                    "updatedAt": datetime.datetime.utcnow()
                }
            }
        )

    @staticmethod
    async def get_cart_summary(cart: Dict) -> str:
        """Generate cart summary text"""
        if not cart["items"]:
            return "Ваша корзина пуста"

        summary = f"🛒 Корзина ({cart['totalItems']} товаров)\n\n"

        for i, item in enumerate(cart["items"], 1):
            product = item["product"]
            summary += f"{i}. {product['name']}\n"
            summary += f"   Размер: {item['size']}, Цвет: {item['color']}\n"
            summary += f"   Количество: {item['quantity']}\n"
            summary += f"   Цена: {item['totalPrice']:,} ₸\n\n"

        summary += f"💰 Итого: {cart['totalPrice']:,} ₸"

        return summary
