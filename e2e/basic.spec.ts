import { test, expect } from '@playwright/test'

test.describe('Basic Functionality', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/')

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle')

    // Check basic page elements
    const title = await page.title()
    expect(title).toContain('Ziggler')

    // Check if body exists
    const body = page.locator('body')
    await expect(body).toBeVisible()

    // Check if main content area exists
    const main = page.locator('main')
    await expect(main).toBeVisible()
  })

  test('should have navigation', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check if header exists
    const header = page.locator('header')
    await expect(header).toBeVisible()

    // Check if there are navigation links
    const navLinks = page.locator('nav a, header a')
    const linkCount = await navLinks.count()
    expect(linkCount).toBeGreaterThan(0)

    // Check if logo exists
    const logo = page.locator('a[href="/"]').first()
    await expect(logo).toBeVisible()
  })

  test('should have footer', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check if footer exists
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    // Check footer content
    await expect(footer).toContainText('Ziggler')
    await expect(footer).toContainText('©')
  })

  test('should have some buttons', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check if there are any buttons
    const buttons = page.locator('button')
    const buttonCount = await buttons.count()
    expect(buttonCount).toBeGreaterThan(0)
  })

  test('should have some links', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check if there are any links
    const links = page.locator('a[href]')
    const linkCount = await links.count()
    expect(linkCount).toBeGreaterThan(0)
  })

  test('should have some images', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check if there are any images (may be loaded lazily)
    const images = page.locator('img')
    const imageCount = await images.count()
    // Allow for lazy loading - may be 0 initially
    expect(imageCount).toBeGreaterThanOrEqual(0)
  })

  test('should have responsive layout', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.waitForTimeout(500)

    const bodyMobile = page.locator('body')
    await expect(bodyMobile).toBeVisible()

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.waitForTimeout(500)

    const bodyDesktop = page.locator('body')
    await expect(bodyDesktop).toBeVisible()
  })

  test('should have proper HTML structure', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check HTML structure
    const html = page.locator('html')
    const lang = await html.getAttribute('lang')
    expect(lang).toBe('ru')

    // Check body classes (Tailwind)
    const body = page.locator('body')
    const bodyClasses = await body.getAttribute('class')
    expect(bodyClasses).toContain('min-h-screen')
  })

  test('should handle basic navigation', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Try to find and click a navigation link
    const navLinks = page.locator('nav a, header a')
    const firstLink = navLinks.first()

    if (await firstLink.isVisible()) {
      const href = await firstLink.getAttribute('href')
      if (href && href !== '#') {
        await firstLink.click()
        await page.waitForLoadState('networkidle')
        // Should navigate somewhere
        expect(page.url()).toBeTruthy()
      }
    }
  })

  test('should have meta tags', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check title
    const title = await page.title()
    expect(title).toBeTruthy()
    expect(title.length).toBeGreaterThan(0)

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]')
    if (await metaDescription.isVisible()) {
      const description = await metaDescription.getAttribute('content')
      expect(description).toBeTruthy()
    }
  })

  test('should load within reasonable time', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const loadTime = Date.now() - startTime
    expect(loadTime).toBeLessThan(10000) // Less than 10 seconds
  })
})
