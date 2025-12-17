import pytest
from datetime import datetime, UTC
from lib.utils import (
    format_price_kzt,
    format_datetime,
    validate_phone_number,
    validate_email,
    generate_order_number,
    calculate_discount,
    truncate_text,
    sanitize_html
)


class TestUtils:
    """Unit tests for utility functions."""

    def test_format_price_kzt(self):
        """Test KZT price formatting."""
        assert format_price_kzt(1000) == "1 000 ₸"
        assert format_price_kzt(50000) == "50 000 ₸"
        assert format_price_kzt(1234567) == "1 234 567 ₸"

    def test_format_datetime(self):
        """Test datetime formatting."""
        dt = datetime(2025, 1, 15, 10, 30, 45, tzinfo=UTC)
        result = format_datetime(dt)
        assert "15.01.2025" in result
        assert "10:30" in result

    def test_validate_phone_number(self):
        """Test phone number validation."""
        assert validate_phone_number("+77071234567") is True
        assert validate_phone_number("87071234567") is True
        assert validate_phone_number("77071234567") is True
        assert validate_phone_number("invalid") is False
        assert validate_phone_number("") is False

    def test_validate_email(self):
        """Test email validation."""
        assert validate_email("test@example.com") is True
        assert validate_email("user.name+tag@domain.co.uk") is True
        assert validate_email("invalid-email") is False
        assert validate_email("") is False

    def test_generate_order_number(self):
        """Test order number generation."""
        order_num = generate_order_number()
        assert len(order_num) == 12  # YYYYMMDD + 4 digits
        assert order_num.isdigit()

        # Test uniqueness
        order_num2 = generate_order_number()
        assert order_num != order_num2

    def test_calculate_discount(self):
        """Test discount calculation."""
        assert calculate_discount(1000, 20) == 800  # 20% off
        assert calculate_discount(500, 10) == 450   # 10% off
        assert calculate_discount(100, 0) == 100    # No discount
        assert calculate_discount(100, 100) == 0    # 100% discount

    def test_truncate_text(self):
        """Test text truncation."""
        text = "This is a very long text that should be truncated"
        assert truncate_text(text, 10) == "This is a ..."
        assert truncate_text(text, 50) == text  # No truncation needed
        assert truncate_text("Short", 10) == "Short"

    def test_sanitize_html(self):
        """Test HTML sanitization."""
        html = '<script>alert("xss")</script><p>Hello <b>world</b></p>'
        sanitized = sanitize_html(html)
        assert '<script>' not in sanitized
        assert '<p>Hello <b>world</b></p>' == sanitized
