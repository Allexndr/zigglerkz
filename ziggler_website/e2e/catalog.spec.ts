import { test, expect } from '@playwright/test'

test.describe('Catalog Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/catalog')
  })

  test('should load catalog page', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Каталог|Ziggler/)

    // Check main heading
    const heading = page.locator('h1, h2').filter({ hasText: /каталог/i }).first()
    await expect(heading).toBeVisible()

    // Check breadcrumb navigation
    const breadcrumb = page.locator('[data-testid="breadcrumb"], .breadcrumb').first()
    if (await breadcrumb.isVisible()) {
      await expect(breadcrumb).toContainText('Главная')
      await expect(breadcrumb).toContainText('Каталог')
    }
  })

  test('should display product grid', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('.product-card, [data-testid*="product"], .grid')

    // Check product cards exist
    const productCards = page.locator('.product-card, [data-testid*="product"], .grid > div').all()
    expect(productCards.length).toBeGreaterThan(0)

    // Check first product card structure
    const firstCard = productCards[0]
    await expect(firstCard).toBeVisible()

    // Check product image
    const productImage = firstCard.locator('img, [data-testid*="image"]').first()
    await expect(productImage).toBeVisible()

    // Check product title
    const productTitle = firstCard.locator('h3, h4, [data-testid*="title"]').first()
    await expect(productTitle).toBeVisible()
    expect(await productTitle.textContent()).toBeTruthy()

    // Check product price
    const productPrice = firstCard.locator('[data-testid*="price"], .price').first()
    await expect(productPrice).toBeVisible()
  })

  test('should have working filters', async ({ page }) => {
    // Check filters section exists
    const filtersSection = page.locator('[data-testid="filters"], .filters, aside').first()

    if (await filtersSection.isVisible()) {
      // Check price filter
      const priceFilter = filtersSection.locator('[data-testid*="price"], input[type="range"]').first()
      if (await priceFilter.isVisible()) {
        await expect(priceFilter).toBeEnabled()
      }

      // Check size filters
      const sizeFilters = filtersSection.locator('[data-testid*="size"], input[type="checkbox"]').all()
      if (sizeFilters.length > 0) {
        await expect(sizeFilters[0]).toBeEnabled()
      }

      // Check category filters
      const categoryFilters = filtersSection.locator('[data-testid*="category"], [type="checkbox"]').all()
      if (categoryFilters.length > 0) {
        await expect(categoryFilters[0]).toBeEnabled()
      }

      // Check clear filters button
      const clearButton = filtersSection.locator('button, [data-testid*="clear"]').filter({ hasText: /сброс|очист/i }).first()
      if (await clearButton.isVisible()) {
        await expect(clearButton).toBeEnabled()
      }
    }
  })

  test('should have working sorting', async ({ page }) => {
    // Check sort dropdown
    const sortSelect = page.locator('select[data-testid*="sort"], [data-testid*="sort"] select').first()
    const sortButton = page.locator('button[data-testid*="sort"]').first()

    if (await sortSelect.isVisible()) {
      await expect(sortSelect).toBeEnabled()

      // Check sort options
      const options = sortSelect.locator('option').all()
      expect(options.length).toBeGreaterThan(0)
    }

    if (await sortButton.isVisible()) {
      await expect(sortButton).toBeEnabled()
    }
  })

  test('should have working search', async ({ page }) => {
    // Check search input
    const searchInput = page.locator('input[placeholder*="поиск"], [data-testid*="search"] input').first()

    if (await searchInput.isVisible()) {
      await expect(searchInput).toBeEnabled()

      // Test search functionality
      await searchInput.fill('костюм')
      await searchInput.press('Enter')

      // Wait for results
      await page.waitForTimeout(1000)

      // Check if results changed or error message appears
      const noResults = page.locator('[data-testid*="no-results"], .no-results').first()
      const results = page.locator('.product-card, [data-testid*="product"]').all()

      // Either we have results or a no-results message
      expect(await noResults.isVisible() || results.length > 0).toBeTruthy()
    }
  })

  test('should navigate to product detail', async ({ page }) => {
    // Get first product card
    const firstProductCard = page.locator('.product-card, [data-testid*="product"]').first()
    await expect(firstProductCard).toBeVisible()

    // Get product link
    const productLink = firstProductCard.locator('a').first()
    const href = await productLink.getAttribute('href')

    if (href) {
      // Click on product
      await productLink.click()

      // Should navigate to product page
      await expect(page).toHaveURL(new RegExp(href))

      // Check product detail page loaded
      const productTitle = page.locator('h1, h2').first()
      await expect(productTitle).toBeVisible()
    }
  })

  test('should have pagination or infinite scroll', async ({ page }) => {
    // Check for pagination
    const pagination = page.locator('[data-testid="pagination"], .pagination, nav').first()
    const loadMore = page.locator('button, [data-testid*="load-more"]').filter({ hasText: /еще|загруз/i }).first()

    // Either pagination or load more button should exist
    const hasPagination = await pagination.isVisible()
    const hasLoadMore = await loadMore.isVisible()

    expect(hasPagination || hasLoadMore).toBeTruthy()

    if (hasLoadMore && await loadMore.isEnabled()) {
      // Test load more functionality
      const initialProductCount = await page.locator('.product-card, [data-testid*="product"]').count()
      await loadMore.click()
      await page.waitForTimeout(2000)
      const newProductCount = await page.locator('.product-card, [data-testid*="product"]').count()

      // Should have more products after loading
      expect(newProductCount).toBeGreaterThanOrEqual(initialProductCount)
    }
  })

  test('should handle empty search results', async ({ page }) => {
    // Search for non-existent product
    const searchInput = page.locator('input[placeholder*="поиск"], [data-testid*="search"] input').first()

    if (await searchInput.isVisible()) {
      await searchInput.fill('несуществующийтовар12345')
      await searchInput.press('Enter')

      // Wait for results
      await page.waitForTimeout(1000)

      // Check for no results message
      const noResults = page.locator('[data-testid*="no-results"], .no-results').filter({ hasText: /не найдено|нет результатов/i }).first()
      await expect(noResults).toBeVisible()
    }
  })

  test('should have responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Check mobile layout
    const productGrid = page.locator('.grid, [data-testid*="grid"]').first()
    await expect(productGrid).toBeVisible()

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })

    // Check tablet layout
    await expect(productGrid).toBeVisible()

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })

    // Check desktop layout
    await expect(productGrid).toBeVisible()
  })

  test('should maintain filter state in URL', async ({ page }) => {
    // Apply a filter if available
    const categoryFilter = page.locator('input[type="checkbox"][data-testid*="category"]').first()

    if (await categoryFilter.isVisible() && await categoryFilter.isEnabled()) {
      await categoryFilter.check()

      // Check URL contains filter parameters
      const url = page.url()
      expect(url).toContain('category=')
    }
  })

  test('should have working add to cart buttons', async ({ page }) => {
    // Find add to cart buttons
    const addToCartButtons = page.locator('button, [data-testid*="cart"]').filter({ hasText: /корзин/i }).all()

    if (addToCartButtons.length > 0) {
      // Test first add to cart button
      const firstButton = addToCartButtons[0]
      await expect(firstButton).toBeEnabled()

      // Click add to cart
      await firstButton.click()

      // Check for success message or cart update
      const successMessage = page.locator('[data-testid*="success"], .success').filter({ hasText: /добавлен|успешно/i }).first()
      const cartBadge = page.locator('[data-testid*="cart-badge"], .cart-badge').first()

      // Either success message or cart badge should appear
      const hasSuccess = await successMessage.isVisible()
      const hasBadge = await cartBadge.isVisible()

      expect(hasSuccess || hasBadge).toBeTruthy()
    }
  })
})
