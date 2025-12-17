#!/usr/bin/env python3
"""
Скрипт для инициализации базы данных с тестовыми данными
"""

import asyncio
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from models.database import init_db, get_session, Category, Product, ProductSize, ProductColor
from datetime import datetime

async def create_test_data():
    """Создание тестовых данных"""
    print("🗄️ Инициализация базы данных...")

    # Инициализируем базу данных
    await init_db()

    async with get_session() as session:
        print("📝 Создание категорий...")

        # Создаем категории
        categories_data = [
            {"id": 1, "name": "Классические костюмы", "name_kk": "Классикалық костюмдер", "name_en": "Classic Suits", "emoji": "👔"},
            {"id": 2, "name": "Slim Fit костюмы", "name_kk": "Slim Fit костюмдер", "name_en": "Slim Fit Suits", "emoji": "🧥"},
            {"id": 3, "name": "Casual костюмы", "name_kk": "Casual костюмдер", "name_en": "Casual Suits", "emoji": "👗"},
            {"id": 4, "name": "Праздничные костюмы", "name_kk": "Мереке костюмдері", "name_en": "Festive Suits", "emoji": "✨"},
            {"id": 5, "name": "Акции", "name_kk": "Акциялар", "name_en": "Sales", "emoji": "🔥"}
        ]

        for cat_data in categories_data:
            category = Category(**cat_data)
            session.add(category)

        print("👔 Создание товаров...")

        # Создаем товары
        products_data = [
            {
                "id": 1,
                "name": "Классический чёрный костюм",
                "description": "Элегантный классический костюм в чёрном цвете. Идеально подходит для деловых встреч и официальных мероприятий.",
                "price": 89990,
                "discount_price": 79990,
                "category_id": 1,
                "material": "Шерсть 100%",
                "fit_type": "Regular",
                "rating": 4.8,
                "review_count": 156
            },
            {
                "id": 2,
                "name": "Синий костюм Slim Fit",
                "description": "Современный костюм в синем цвете с идеальной посадкой. Комфорт и стиль в одном изделии.",
                "price": 75990,
                "category_id": 2,
                "material": "Шерсть с эластаном",
                "fit_type": "Slim",
                "rating": 4.6,
                "review_count": 89
            },
            {
                "id": 3,
                "name": "Серый костюм для повседневного использования",
                "description": "Универсальный серый костюм для офиса и casual мероприятий. Практичный и стильный вариант.",
                "price": 65990,
                "discount_price": 59990,
                "category_id": 3,
                "material": "Хлопок с шерстью",
                "fit_type": "Regular",
                "rating": 4.4,
                "review_count": 67
            },
            {
                "id": 4,
                "name": "Белый свадебный костюм",
                "description": "Роскошный белый костюм для особых случаев. Идеальный выбор для свадьбы или торжественного события.",
                "price": 129990,
                "category_id": 4,
                "material": "Шерсть премиум класса",
                "fit_type": "Regular",
                "rating": 4.9,
                "review_count": 23
            },
            {
                "id": 5,
                "name": "Тёмно-синий костюм с акцией",
                "description": "Классический тёмно-синий костюм по специальной цене. Отличное качество по доступной стоимости.",
                "price": 99990,
                "discount_price": 69990,
                "category_id": 5,
                "material": "Шерсть 100%",
                "fit_type": "Regular",
                "rating": 4.7,
                "review_count": 45
            }
        ]

        for prod_data in products_data:
            product = Product(**prod_data)
            session.add(product)

        print("📏 Добавление размеров и цветов...")

        # Размеры для товаров
        sizes_data = [
            # Товар 1
            {"product_id": 1, "size": "XS", "quantity": 5},
            {"product_id": 1, "size": "S", "quantity": 10},
            {"product_id": 1, "size": "M", "quantity": 15},
            {"product_id": 1, "size": "L", "quantity": 12},
            {"product_id": 1, "size": "XL", "quantity": 8},
            {"product_id": 1, "size": "XXL", "quantity": 3},
            # Товар 2
            {"product_id": 2, "size": "S", "quantity": 7},
            {"product_id": 2, "size": "M", "quantity": 12},
            {"product_id": 2, "size": "L", "quantity": 9},
            {"product_id": 2, "size": "XL", "quantity": 5},
            # И так далее для остальных товаров...
        ]

        for size_data in sizes_data:
            size = ProductSize(**size_data)
            session.add(size)

        # Цвета для товаров
        colors_data = [
            {"product_id": 1, "color_name": "Чёрный", "color_hex": "#000000", "emoji": "⬛"},
            {"product_id": 2, "color_name": "Синий", "color_hex": "#000080", "emoji": "🔵"},
            {"product_id": 2, "color_name": "Тёмно-синий", "color_hex": "#00008B", "emoji": "🔵"},
            {"product_id": 3, "color_name": "Серый", "color_hex": "#808080", "emoji": "🔘"},
            {"product_id": 4, "color_name": "Белый", "color_hex": "#FFFFFF", "emoji": "⬜"},
            {"product_id": 5, "color_name": "Тёмно-синий", "color_hex": "#00008B", "emoji": "🔵"},
        ]

        for color_data in colors_data:
            color = ProductColor(**color_data)
            session.add(color)

        # Сохраняем изменения
        await session.commit()

    print("✅ База данных успешно инициализирована!")
    print("📊 Добавлено:")
    print(f"   • {len(categories_data)} категорий")
    print(f"   • {len(products_data)} товаров")
    print(f"   • {len(sizes_data)} размеров")
    print(f"   • {len(colors_data)} цветов")

if __name__ == "__main__":
    asyncio.run(create_test_data())
