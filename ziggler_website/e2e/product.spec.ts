import { test, expect } from '@playwright/test'

test.describe('Product Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a product page (assuming product with ID 1 exists)
    await page.goto('/product/1')
  })

  test('should load product detail page', async ({ page }) => {
    // Check page loaded successfully
    await expect(page).toHaveTitle(/Ziggler|Костюм/)

    // Check main product title
    const productTitle = page.locator('h1, h2').first()
    await expect(productTitle).toBeVisible()
    expect(await productTitle.textContent()).toBeTruthy()

    // Check breadcrumb navigation
    const breadcrumb = page.locator('[data-testid="breadcrumb"], .breadcrumb').first()
    if (await breadcrumb.isVisible()) {
      await expect(breadcrumb).toContainText('Главная')
      await expect(breadcrumb).toContainText('Каталог')
    }
  })

  test('should display product images', async ({ page }) => {
    // Check main product image
    const mainImage = page.locator('[data-testid="main-image"], .product-image img').first()
    await expect(mainImage).toBeVisible()

    // Check image gallery
    const galleryImages = page.locator('[data-testid*="gallery"], .gallery img').all()
    expect(galleryImages.length).toBeGreaterThan(0)

    // Check if gallery images are clickable
    if (galleryImages.length > 1) {
      const secondImage = galleryImages[1]
      await expect(secondImage).toBeVisible()

      // Click on gallery image
      await secondImage.click()

      // Main image should change (if implemented)
      const newMainImage = page.locator('[data-testid="main-image"], .product-image img').first()
      await expect(newMainImage).toBeVisible()
    }
  })

  test('should display product information', async ({ page }) => {
    // Check product price
    const priceElement = page.locator('[data-testid="price"], .price').first()
    await expect(priceElement).toBeVisible()
    const priceText = await priceElement.textContent()
    expect(priceText).toMatch(/\d/)

    // Check rating
    const ratingElement = page.locator('[data-testid="rating"], .rating, .stars').first()
    if (await ratingElement.isVisible()) {
      await expect(ratingElement).toBeVisible()
    }

    // Check reviews count
    const reviewsElement = page.locator('[data-testid*="reviews"], .reviews-count').first()
    if (await reviewsElement.isVisible()) {
      const reviewsText = await reviewsElement.textContent()
      expect(reviewsText).toMatch(/\d/)
    }

    // Check availability status
    const availabilityElement = page.locator('[data-testid*="availability"], .availability').first()
    await expect(availabilityElement).toBeVisible()
  })

  test('should have working size selection', async ({ page }) => {
    // Check size options
    const sizeOptions = page.locator('[data-testid*="size"], .size-option, button').filter({ hasText: /^[SMLX]+$/ }).all()

    if (sizeOptions.length > 0) {
      // Check first size option
      const firstSize = sizeOptions[0]
      await expect(firstSize).toBeEnabled()

      // Click on size
      await firstSize.click()

      // Check if size is selected (has active class or aria-selected)
      await expect(firstSize).toHaveAttribute('aria-selected', 'true')
    }
  })

  test('should have working color selection', async ({ page }) => {
    // Check color options
    const colorOptions = page.locator('[data-testid*="color"], .color-option, button').all()

    if (colorOptions.length > 0) {
      // Check first color option
      const firstColor = colorOptions[0]
      await expect(firstColor).toBeVisible()

      // Click on color
      await firstColor.click()

      // Check if color is selected
      await expect(firstColor).toHaveAttribute('aria-selected', 'true')
    }
  })

  test('should have quantity selector', async ({ page }) => {
    // Check quantity input or buttons
    const quantityInput = page.locator('input[type="number"][data-testid*="quantity"]').first()
    const quantityButtons = page.locator('button[data-testid*="quantity"]').all()

    if (await quantityInput.isVisible()) {
      // Check quantity input
      await expect(quantityInput).toHaveValue('1')
      await expect(quantityInput).toBeEnabled()

      // Test increment
      const currentValue = await quantityInput.inputValue()
      await quantityInput.fill('2')
      expect(await quantityInput.inputValue()).toBe('2')
    } else if (quantityButtons.length >= 2) {
      // Check quantity buttons (+ and -)
      const minusButton = quantityButtons[0]
      const plusButton = quantityButtons[1]

      await expect(minusButton).toBeVisible()
      await expect(plusButton).toBeEnabled()

      // Test plus button
      await plusButton.click()

      // Check quantity display
      const quantityDisplay = page.locator('[data-testid="quantity-display"], .quantity').first()
      if (await quantityDisplay.isVisible()) {
        const quantityText = await quantityDisplay.textContent()
        expect(quantityText).toMatch(/[2-9]/)
      }
    }
  })

  test('should have working add to cart', async ({ page }) => {
    // Check add to cart button
    const addToCartButton = page.locator('button, [data-testid*="cart"]').filter({ hasText: /корзин/i }).first()
    await expect(addToCartButton).toBeVisible()
    await expect(addToCartButton).toBeEnabled()

    // Click add to cart
    await addToCartButton.click()

    // Check for success feedback
    const successMessage = page.locator('[data-testid*="success"], .success').filter({ hasText: /добавлен|успешно/i }).first()
    const cartUpdated = page.locator('[data-testid*="cart-updated"]').first()

    // Either success message or cart update indicator
    const hasSuccess = await successMessage.isVisible()
    const hasUpdate = await cartUpdated.isVisible()

    expect(hasSuccess || hasUpdate).toBeTruthy()
  })

  test('should have working add to favorites', async ({ page }) => {
    // Check favorites button
    const favoritesButton = page.locator('button[data-testid*="favorite"], [aria-label*="favorite"]').first()

    if (await favoritesButton.isVisible()) {
      await expect(favoritesButton).toBeEnabled()

      // Click favorites button
      await favoritesButton.click()

      // Check for feedback
      const successMessage = page.locator('[data-testid*="success"], .success').filter({ hasText: /избранн|сердц/i }).first()

      if (await successMessage.isVisible()) {
        await expect(successMessage).toBeVisible()
      }
    }
  })

  test('should display product description', async ({ page }) => {
    // Check product description
    const description = page.locator('[data-testid="description"], .description').first()
    await expect(description).toBeVisible()
    expect(await description.textContent()).toBeTruthy()

    // Check product specifications
    const specs = page.locator('[data-testid="specifications"], .specs, .specifications').first()
    if (await specs.isVisible()) {
      await expect(specs).toBeVisible()
    }
  })

  test('should have reviews section', async ({ page }) => {
    // Check reviews section
    const reviewsSection = page.locator('[data-testid="reviews"], .reviews').first()

    if (await reviewsSection.isVisible()) {
      // Check reviews header
      const reviewsHeader = reviewsSection.locator('h3, h4').filter({ hasText: /отзыв/i }).first()
      await expect(reviewsHeader).toBeVisible()

      // Check individual reviews
      const reviewCards = reviewsSection.locator('.review, [data-testid*="review"]').all()

      if (reviewCards.length > 0) {
        const firstReview = reviewCards[0]

        // Check review author
        const author = firstReview.locator('[data-testid*="author"], .author').first()
        await expect(author).toBeVisible()

        // Check review rating
        const rating = firstReview.locator('[data-testid*="rating"], .rating').first()
        await expect(rating).toBeVisible()

        // Check review text
        const text = firstReview.locator('[data-testid*="text"], .text').first()
        await expect(text).toBeVisible()
      }

      // Check "show all reviews" link
      const showAllLink = reviewsSection.locator('a, button').filter({ hasText: /все отзывы|все/i }).first()
      if (await showAllLink.isVisible()) {
        await expect(showAllLink).toBeEnabled()
      }
    }
  })

  test('should display delivery information', async ({ page }) => {
    // Check delivery section
    const deliverySection = page.locator('[data-testid="delivery"], .delivery').first()

    if (await deliverySection.isVisible()) {
      await expect(deliverySection).toContainText(/доставк/i)

      // Check delivery options
      await expect(deliverySection).toContainText(/курьер|самовывоз/i)
    }
  })

  test('should have share functionality', async ({ page }) => {
    // Check share buttons
    const shareButtons = page.locator('button[data-testid*="share"], [aria-label*="share"]').all()

    if (shareButtons.length > 0) {
      // Check share button is visible
      await expect(shareButtons[0]).toBeVisible()
      await expect(shareButtons[0]).toBeEnabled()
    }
  })

  test('should handle zoom functionality', async ({ page }) => {
    // Check if image zoom is available
    const zoomButton = page.locator('button[data-testid*="zoom"], [aria-label*="zoom"]').first()
    const zoomableImage = page.locator('[data-testid="zoomable-image"], .zoomable').first()

    if (await zoomButton.isVisible()) {
      // Click zoom button
      await zoomButton.click()

      // Check if zoom modal or overlay appears
      const zoomModal = page.locator('[data-testid="zoom-modal"], .zoom-modal').first()

      if (await zoomModal.isVisible()) {
        await expect(zoomModal).toBeVisible()

        // Check close button
        const closeButton = zoomModal.locator('button[data-testid*="close"]').first()
        await expect(closeButton).toBeVisible()
      }
    } else if (await zoomableImage.isVisible()) {
      // Test hover zoom
      await zoomableImage.hover()

      // Check if zoom effect is applied
      await page.waitForTimeout(500)
    }
  })

  test('should have responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Check mobile layout
    const productImage = page.locator('[data-testid="main-image"], .product-image').first()
    await expect(productImage).toBeVisible()

    const productInfo = page.locator('[data-testid="product-info"], .product-info').first()
    await expect(productInfo).toBeVisible()

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })

    // Check tablet layout
    await expect(productImage).toBeVisible()
    await expect(productInfo).toBeVisible()

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })

    // Check desktop layout
    await expect(productImage).toBeVisible()
    await expect(productInfo).toBeVisible()
  })

  test('should handle out of stock products', async ({ page }) => {
    // Check if product is out of stock
    const outOfStockBadge = page.locator('[data-testid*="out-of-stock"], .out-of-stock').first()
    const addToCartButton = page.locator('button[data-testid*="cart"]').first()

    if (await outOfStockBadge.isVisible()) {
      // If out of stock, add to cart button should be disabled
      await expect(addToCartButton).toBeDisabled()
    }
  })
})
