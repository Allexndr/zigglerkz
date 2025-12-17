import pytest
from datetime import datetime
from models.database import User, Product, Category, CartItem, Order


class TestUserModel:
    """Tests for User model."""

    def test_user_creation(self):
        """Test creating a user."""
        user = User(
            telegram_id=123456789,
            username="testuser",
            full_name="Test User",
            phone="+77071234567",
            email="test@example.com",
            language="ru",
            notifications_enabled=True
        )

        assert user.telegram_id == 123456789
        assert user.username == "testuser"
        assert user.full_name == "Test User"
        assert user.phone == "+77071234567"
        assert user.email == "test@example.com"
        assert user.language == "ru"
        assert user.notifications_enabled is True

    def test_user_defaults(self):
        """Test default values."""
        user = User(telegram_id=123456789)

        assert user.language == "ru"
        assert user.notifications_enabled is True
        assert isinstance(user.created_at, datetime)
        assert isinstance(user.updated_at, datetime)


class TestProductModel:
    """Tests for Product model."""

    def test_product_creation(self):
        """Test creating a product."""
        product = Product(
            name="Test Product",
            description="Test description",
            price=10000,
            discount_price=8000,
            category_id=1,
            material="Cotton",
            fit_type="Regular",
            rating=4.5,
            review_count=10,
            is_active=True
        )

        assert product.name == "Test Product"
        assert product.price == 10000
        assert product.discount_price == 8000
        assert product.category_id == 1
        assert product.rating == 4.5
        assert product.review_count == 10
        assert product.is_active is True

    def test_product_defaults(self):
        """Test default values."""
        product = Product(
            name="Test Product",
            price=10000,
            category_id=1
        )

        assert product.rating == 0.0
        assert product.review_count == 0
        assert product.is_active is True


class TestCategoryModel:
    """Tests for Category model."""

    def test_category_creation(self):
        """Test creating a category."""
        category = Category(
            name="Test Category",
            emoji="📦",
            sort_order=1,
            is_active=True
        )

        assert category.name == "Test Category"
        assert category.emoji == "📦"
        assert category.sort_order == 1
        assert category.is_active is True
        assert category.parent_id is None

    def test_category_with_parent(self):
        """Test category with parent."""
        category = Category(
            name="Subcategory",
            parent_id=1,
            sort_order=2
        )

        assert category.parent_id == 1
        assert category.sort_order == 2


class TestCartItemModel:
    """Tests for CartItem model."""

    def test_cart_item_creation(self):
        """Test creating a cart item."""
        cart_item = CartItem(
            user_id=1,
            product_id=1,
            size="M",
            color="Black",
            quantity=2
        )

        assert cart_item.user_id == 1
        assert cart_item.product_id == 1
        assert cart_item.size == "M"
        assert cart_item.color == "Black"
        assert cart_item.quantity == 2

    def test_cart_item_defaults(self):
        """Test default values."""
        cart_item = CartItem(
            user_id=1,
            product_id=1,
            size="M",
            color="Black"
        )

        assert cart_item.quantity == 1
        assert isinstance(cart_item.added_at, datetime)


class TestOrderModel:
    """Tests for Order model."""

    def test_order_creation(self):
        """Test creating an order."""
        order = Order(
            user_id=1,
            status="pending",
            total_price=50000,
            delivery_type="courier",
            delivery_city="Алматы",
            phone="+77071234567"
        )

        assert order.user_id == 1
        assert order.status == "pending"
        assert order.total_price == 50000
        assert order.delivery_type == "courier"
        assert order.delivery_city == "Алматы"
        assert order.phone == "+77071234567"

    def test_order_defaults(self):
        """Test default values."""
        order = Order(
            user_id=1,
            total_price=50000,
            delivery_city="Алматы",
            phone="+77071234567"
        )

        assert order.status == "pending"
        assert order.delivery_type == "courier"
        assert isinstance(order.created_at, datetime)
        assert isinstance(order.updated_at, datetime)
