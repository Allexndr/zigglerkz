from lib.mongodb import get_products_collection, get_categories_collection
from typing import List, Dict, Optional
from bson import ObjectId

class ProductService:
    @staticmethod
    async def get_all_products(category: Optional[str] = None, limit: int = 10, skip: int = 0) -> Dict:
        """Get all products with optional filtering"""
        collection = get_products_collection()

        query = {"isActive": True}
        if category:
            query["category"] = category

        total = await collection.count_documents(query)
        products = await collection.find(query).skip(skip).limit(limit).to_list(length=limit)

        return {
            "products": products,
            "total": total,
            "has_more": (skip + limit) < total
        }

    @staticmethod
    async def get_product_by_id(product_id: str) -> Optional[Dict]:
        """Get product by ID"""
        collection = get_products_collection()
        try:
            product = await collection.find_one({
                "_id": ObjectId(product_id),
                "isActive": True
            })
            return product
        except:
            return None

    @staticmethod
    async def search_products(query: str, limit: int = 10) -> List[Dict]:
        """Search products by name or description"""
        collection = get_products_collection()

        search_query = {
            "isActive": True,
            "$or": [
                {"name": {"$regex": query, "$options": "i"}},
                {"description": {"$regex": query, "$options": "i"}},
                {"tags": {"$in": [query]}}
            ]
        }

        products = await collection.find(search_query).limit(limit).to_list(length=limit)
        return products

    @staticmethod
    async def get_categories() -> List[Dict]:
        """Get all active categories"""
        collection = get_categories_collection()
        categories = await collection.find({"isActive": True}).sort("sortOrder", 1).to_list(length=100)
        return categories

    @staticmethod
    async def get_featured_products(limit: int = 5) -> List[Dict]:
        """Get featured products (high rating)"""
        collection = get_products_collection()

        products = await collection.find({
            "isActive": True,
            "rating": {"$gte": 4.5}
        }).sort("rating", -1).limit(limit).to_list(length=limit)

        return products
