from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from typing import Optional
from datetime import datetime
from config.config import config

# Создание асинхронного движка
engine = create_async_engine(config.DATABASE_URL, echo=False)

# Создание фабрики сессий
async_session = async_sessionmaker(engine, expire_on_commit=False)

class Base(DeclarativeBase):
    """Базовый класс для всех моделей"""
    pass

class User(Base):
    """Модель пользователя"""
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    telegram_id: Mapped[int] = mapped_column(unique=True, index=True)
    username: Mapped[Optional[str]]
    full_name: Mapped[Optional[str]]
    phone: Mapped[Optional[str]]
    email: Mapped[Optional[str]]
    language: Mapped[str] = mapped_column(default="ru")
    notifications_enabled: Mapped[bool] = mapped_column(default=True)
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(default=datetime.utcnow, onupdate=datetime.utcnow)

class Category(Base):
    """Модель категории товаров"""
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(index=True)
    name_kk: Mapped[Optional[str]]  # Название на казахском
    name_en: Mapped[Optional[str]]  # Название на английском
    description: Mapped[Optional[str]]
    parent_id: Mapped[Optional[int]]  # Для подкатегорий
    emoji: Mapped[str] = mapped_column(default="📦")
    sort_order: Mapped[int] = mapped_column(default=0)
    is_active: Mapped[bool] = mapped_column(default=True)

class Product(Base):
    """Модель товара"""
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(index=True)
    description: Mapped[Optional[str]]
    price: Mapped[int]  # Цена в тенге
    discount_price: Mapped[Optional[int]]  # Акционная цена
    category_id: Mapped[int]
    material: Mapped[Optional[str]]
    fit_type: Mapped[Optional[str]]  # Посадка: Regular, Slim, etc.
    rating: Mapped[float] = mapped_column(default=0.0)
    review_count: Mapped[int] = mapped_column(default=0)
    is_active: Mapped[bool] = mapped_column(default=True)
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)

class ProductSize(Base):
    """Размеры товаров (многие ко многим)"""
    __tablename__ = "product_sizes"

    id: Mapped[int] = mapped_column(primary_key=True)
    product_id: Mapped[int]
    size: Mapped[str]  # XS, S, M, L, XL, XXL
    quantity: Mapped[int] = mapped_column(default=0)  # Количество в наличии

class ProductColor(Base):
    """Цвета товаров"""
    __tablename__ = "product_colors"

    id: Mapped[int] = mapped_column(primary_key=True)
    product_id: Mapped[int]
    color_name: Mapped[str]  # Название цвета
    color_hex: Mapped[str]  # HEX код цвета
    emoji: Mapped[str] = mapped_column(default="⬜")  # Эмодзи для отображения

class CartItem(Base):
    """Товары в корзине"""
    __tablename__ = "cart_items"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int]
    product_id: Mapped[int]
    size: Mapped[str]
    color: Mapped[str]
    quantity: Mapped[int] = mapped_column(default=1)
    added_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)

class Favorite(Base):
    """Избранные товары"""
    __tablename__ = "favorites"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int]
    product_id: Mapped[int]
    added_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)

class Order(Base):
    """Заказы"""
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int]
    status: Mapped[str] = mapped_column(default="pending")  # pending, confirmed, preparing, shipping, delivered, cancelled
    total_price: Mapped[int]
    delivery_type: Mapped[str] = mapped_column(default="courier")  # courier, pickup
    delivery_address: Mapped[Optional[str]]
    delivery_city: Mapped[str] = mapped_column(default="Алматы")
    phone: Mapped[str]
    email: Mapped[Optional[str]]
    notes: Mapped[Optional[str]]
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(default=datetime.utcnow, onupdate=datetime.utcnow)

class OrderItem(Base):
    """Товары в заказе"""
    __tablename__ = "order_items"

    id: Mapped[int] = mapped_column(primary_key=True)
    order_id: Mapped[int]
    product_id: Mapped[int]
    size: Mapped[str]
    color: Mapped[str]
    quantity: Mapped[int]
    price: Mapped[int]  # Цена на момент заказа

class Review(Base):
    """Отзывы о товарах"""
    __tablename__ = "reviews"

    id: Mapped[int] = mapped_column(primary_key=True)
    product_id: Mapped[int]
    user_id: Mapped[int]
    rating: Mapped[int]  # 1-5 звёзд
    text: Mapped[Optional[str]]
    is_approved: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)

async def init_db():
    """Инициализация базы данных"""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

def get_session() -> AsyncSession:
    """Получение сессии базы данных"""
    return async_session()
