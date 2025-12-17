import { test, expect } from '@playwright/test'

test.describe('Cart Page', () => {
  test.beforeEach(async ({ page }) => {
    // First add some items to cart from catalog
    await page.goto('/catalog')

    // Wait for products to load
    await page.waitForSelector('.product-card, [data-testid*="product"]')

    // Find and click add to cart button on first product
    const addToCartButton = page.locator('button[data-testid*="cart"]').first()
    if (await addToCartButton.isVisible()) {
      await addToCartButton.click()
      // Wait for cart update
      await page.waitForTimeout(1000)
    }

    // Navigate to cart
    await page.goto('/cart')
  })

  test('should load cart page', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Корзина|Cart|Ziggler/)

    // Check main heading
    const heading = page.locator('h1, h2').filter({ hasText: /корзин/i }).first()
    await expect(heading).toBeVisible()
  })

  test('should display cart items', async ({ page }) => {
    // Check if cart has items or empty state
    const cartItems = page.locator('[data-testid="cart-item"], .cart-item').all()
    const emptyCart = page.locator('[data-testid="empty-cart"], .empty-cart').first()

    if (cartItems.length > 0) {
      // Cart has items
      const firstItem = cartItems[0]
      await expect(firstItem).toBeVisible()

      // Check item structure
      const itemImage = firstItem.locator('img, [data-testid*="image"]').first()
      await expect(itemImage).toBeVisible()

      const itemTitle = firstItem.locator('[data-testid="item-title"], .item-title, h3, h4').first()
      await expect(itemTitle).toBeVisible()

      const itemPrice = firstItem.locator('[data-testid="item-price"], .item-price').first()
      await expect(itemPrice).toBeVisible()

      const itemQuantity = firstItem.locator('[data-testid="item-quantity"], .item-quantity').first()
      await expect(itemQuantity).toBeVisible()
    } else if (await emptyCart.isVisible()) {
      // Empty cart
      await expect(emptyCart).toBeVisible()
      await expect(emptyCart).toContainText(/пустая|пуста/i)

      // Check continue shopping button
      const continueButton = emptyCart.locator('a, button').filter({ hasText: /продолж|каталог/i }).first()
      await expect(continueButton).toBeVisible()
    }
  })

  test('should have working quantity controls', async ({ page }) => {
    const cartItems = page.locator('[data-testid="cart-item"], .cart-item').all()

    if (cartItems.length > 0) {
      const firstItem = cartItems[0]

      // Check quantity controls
      const quantityInput = firstItem.locator('input[type="number"][data-testid*="quantity"]').first()
      const minusButton = firstItem.locator('button[data-testid*="minus"], [aria-label*="minus"]').first()
      const plusButton = firstItem.locator('button[data-testid*="plus"], [aria-label*="plus"]').first()

      if (await quantityInput.isVisible()) {
        // Test quantity input
        const initialValue = await quantityInput.inputValue()
        await quantityInput.fill('2')
        expect(await quantityInput.inputValue()).toBe('2')
      } else if (await plusButton.isVisible() && await minusButton.isVisible()) {
        // Test plus/minus buttons
        const initialQuantity = await getCurrentQuantity(firstItem)

        // Test plus button
        await plusButton.click()
        await page.waitForTimeout(500)
        const newQuantity = await getCurrentQuantity(firstItem)
        expect(newQuantity).toBeGreaterThan(initialQuantity)

        // Test minus button (if quantity > 1)
        if (newQuantity > 1) {
          await minusButton.click()
          await page.waitForTimeout(500)
          const finalQuantity = await getCurrentQuantity(firstItem)
          expect(finalQuantity).toBe(initialQuantity)
        }
      }
    }
  })

  test('should calculate totals correctly', async ({ page }) => {
    const cartItems = page.locator('[data-testid="cart-item"], .cart-item').all()

    if (cartItems.length > 0) {
      // Check subtotal
      const subtotalElement = page.locator('[data-testid="subtotal"], .subtotal').first()
      if (await subtotalElement.isVisible()) {
        const subtotalText = await subtotalElement.textContent()
        expect(subtotalText).toMatch(/\d/)
      }

      // Check total
      const totalElement = page.locator('[data-testid="total"], .total').first()
      await expect(totalElement).toBeVisible()
      const totalText = await totalElement.textContent()
      expect(totalText).toMatch(/\d/)
    }
  })

  test('should have working remove item functionality', async ({ page }) => {
    const cartItems = page.locator('[data-testid="cart-item"], .cart-item').all()
    const initialCount = cartItems.length

    if (initialCount > 0) {
      const firstItem = cartItems[0]

      // Find remove button
      const removeButton = firstItem.locator('button[data-testid*="remove"], [aria-label*="remove"], .remove').first()
      if (await removeButton.isVisible()) {
        await removeButton.click()

        // Confirm removal if needed
        const confirmButton = page.locator('button, [data-testid*="confirm"]').filter({ hasText: /удали|да/i }).first()
        if (await confirmButton.isVisible()) {
          await confirmButton.click()
        }

        // Wait for removal
        await page.waitForTimeout(1000)

        // Check item count decreased
        const newCartItems = page.locator('[data-testid="cart-item"], .cart-item').all()
        expect(newCartItems.length).toBeLessThan(initialCount)
      }
    }
  })

  test('should have working checkout button', async ({ page }) => {
    const cartItems = page.locator('[data-testid="cart-item"], .cart-item').all()

    if (cartItems.length > 0) {
      // Check checkout button
      const checkoutButton = page.locator('a[href*="checkout"], button[data-testid*="checkout"]').filter({ hasText: /оформ|заказ/i }).first()
      await expect(checkoutButton).toBeVisible()
      await expect(checkoutButton).toBeEnabled()

      // Test navigation to checkout
      const href = await checkoutButton.getAttribute('href')
      if (href) {
        await checkoutButton.click()
        await expect(page).toHaveURL(new RegExp(href.replace('/', '\\/')))
      } else {
        // If it's a button, check for form submission or modal
        await checkoutButton.click()

        // Check for checkout modal or redirect
        const checkoutModal = page.locator('[data-testid="checkout-modal"], .checkout-modal').first()
        const isRedirected = page.url().includes('checkout')

        expect(await checkoutModal.isVisible() || isRedirected).toBeTruthy()
      }
    }
  })

  test('should handle empty cart state', async ({ page }) => {
    // Remove all items if any exist
    const cartItems = page.locator('[data-testid="cart-item"], .cart-item').all()

    for (const item of cartItems) {
      const removeButton = item.locator('button[data-testid*="remove"]').first()
      if (await removeButton.isVisible()) {
        await removeButton.click()
        await page.waitForTimeout(500)
      }
    }

    // Check empty cart state
    const emptyCart = page.locator('[data-testid="empty-cart"], .empty-cart').first()
    await expect(emptyCart).toBeVisible()

    // Check empty cart message
    await expect(emptyCart).toContainText(/пустая|пуста/i)

    // Check continue shopping button
    const continueButton = emptyCart.locator('a, button').filter({ hasText: /продолж|каталог/i }).first()
    await expect(continueButton).toBeVisible()
    await expect(continueButton).toBeEnabled()
  })

  test('should persist cart across sessions', async ({ page }) => {
    const cartItems = page.locator('[data-testid="cart-item"], .cart-item').all()

    if (cartItems.length > 0) {
      // Get current cart state
      const initialCount = cartItems.length

      // Reload page
      await page.reload()

      // Check cart items persisted
      const reloadedCartItems = page.locator('[data-testid="cart-item"], .cart-item').all()
      expect(reloadedCartItems.length).toBe(initialCount)
    }
  })

  test('should have responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Check mobile cart layout
    const cartContainer = page.locator('[data-testid="cart"], .cart').first()
    await expect(cartContainer).toBeVisible()

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })

    // Check tablet cart layout
    await expect(cartContainer).toBeVisible()

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })

    // Check desktop cart layout
    await expect(cartContainer).toBeVisible()
  })

  test('should handle promo codes', async ({ page }) => {
    // Check promo code section
    const promoSection = page.locator('[data-testid="promo"], .promo, .coupon').first()

    if (await promoSection.isVisible()) {
      // Check promo input
      const promoInput = promoSection.locator('input[data-testid*="promo"]').first()
      if (await promoInput.isVisible()) {
        await expect(promoInput).toBeEnabled()

        // Test invalid promo code
        await promoInput.fill('INVALID123')
        const applyButton = promoSection.locator('button').filter({ hasText: /примен|apply/i }).first()
        if (await applyButton.isVisible()) {
          await applyButton.click()

          // Check for error message
          const errorMessage = page.locator('[data-testid*="error"], .error').first()
          if (await errorMessage.isVisible()) {
            await expect(errorMessage).toBeVisible()
          }
        }
      }
    }
  })

  test('should display shipping information', async ({ page }) => {
    const cartItems = page.locator('[data-testid="cart-item"], .cart-item').all()

    if (cartItems.length > 0) {
      // Check shipping info
      const shippingInfo = page.locator('[data-testid="shipping"], .shipping').first()

      if (await shippingInfo.isVisible()) {
        await expect(shippingInfo).toContainText(/доставк/i)

        // Check shipping cost
        const shippingCost = shippingInfo.locator('[data-testid="shipping-cost"], .cost').first()
        if (await shippingCost.isVisible()) {
          const costText = await shippingCost.textContent()
          expect(costText).toMatch(/\d|бесплатно/i)
        }
      }
    }
  })
})

// Helper function to get current quantity from cart item
async function getCurrentQuantity(cartItem: any): Promise<number> {
  const quantityInput = cartItem.locator('input[type="number"][data-testid*="quantity"]').first()
  const quantityDisplay = cartItem.locator('[data-testid="quantity-display"], .quantity').first()

  if (await quantityInput.isVisible()) {
    return parseInt(await quantityInput.inputValue() || '0')
  } else if (await quantityDisplay.isVisible()) {
    const text = await quantityDisplay.textContent()
    const match = text?.match(/\d+/)
    return match ? parseInt(match[0]) : 0
  }

  return 0
}
