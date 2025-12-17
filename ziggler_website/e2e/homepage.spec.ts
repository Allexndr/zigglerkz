import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load homepage with all sections', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Ziggler\.kz/)

    // Check hero section
    const heroSection = page.locator('[data-testid="hero-section"], .hero-section').first()
    await expect(heroSection).toBeVisible()

    // Check hero title
    const heroTitle = page.locator('h1').first()
    await expect(heroTitle).toContainText(/идеальный костюм/i)

    // Check CTA buttons
    const ctaButton = page.locator('a[href*="catalog"], button').filter({ hasText: /смотреть/i }).first()
    await expect(ctaButton).toBeVisible()

    // Check personalization section
    const personalizationSection = page.locator('[id="personalization"], .personalization').first()
    await expect(personalizationSection).toBeVisible()

    // Check collections section
    const collectionsSection = page.locator('.collections, [data-testid="collections"]').first()
    await expect(collectionsSection).toBeVisible()

    // Check why choose us section
    const whyChooseUsSection = page.locator('.why-choose-us, [data-testid="why-choose-us"]').first()
    await expect(whyChooseUsSection).toBeVisible()

    // Check reviews section
    const reviewsSection = page.locator('.reviews, [data-testid="reviews"]').first()
    await expect(reviewsSection).toBeVisible()

    // Check newsletter section
    const newsletterSection = page.locator('.newsletter, [data-testid="newsletter"]').first()
    await expect(newsletterSection).toBeVisible()
  })

  test('should have working navigation', async ({ page }) => {
    // Check header is visible
    const header = page.locator('header').first()
    await expect(header).toBeVisible()

    // Check logo
    const logo = page.locator('a[href="/"], [data-testid="logo"]').first()
    await expect(logo).toBeVisible()
    await expect(logo).toContainText('Ziggler')

    // Check navigation links
    const navLinks = page.locator('nav a')
    await expect(navLinks.filter({ hasText: 'Каталог' })).toBeVisible()
    await expect(navLinks.filter({ hasText: 'Коллекции' })).toBeVisible()

    // Check search functionality
    const searchInput = page.locator('input[placeholder*="Поиск"]').first()
    await expect(searchInput).toBeVisible()

    // Check theme toggle
    const themeToggle = page.locator('button[data-testid*="theme"], [aria-label*="theme"]').first()
    await expect(themeToggle).toBeVisible()

    // Check cart icon
    const cartIcon = page.locator('[data-testid*="cart"], [aria-label*="cart"]').first()
    await expect(cartIcon).toBeVisible()

    // Check user account icon
    const userIcon = page.locator('[data-testid*="user"], [aria-label*="account"]').first()
    await expect(userIcon).toBeVisible()
  })

  test('should have responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Check mobile menu button appears
    const mobileMenuButton = page.locator('button[aria-label*="menu"], [data-testid*="menu"]').first()
    await expect(mobileMenuButton).toBeVisible()

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })

    // Check navigation is visible
    const nav = page.locator('nav').first()
    await expect(nav).toBeVisible()

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })

    // Check all elements are properly positioned
    const header = page.locator('header').first()
    await expect(header).toBeVisible()
  })

  test('should have working theme toggle', async ({ page }) => {
    // Get initial theme
    const html = page.locator('html')
    const initialClass = await html.getAttribute('class')

    // Click theme toggle
    const themeToggle = page.locator('button[data-testid*="theme"], button').filter({ has: page.locator('[aria-label*="theme"]') }).first()
    if (await themeToggle.isVisible()) {
      await themeToggle.click()

      // Check theme changed
      const newClass = await html.getAttribute('class')
      expect(newClass).not.toBe(initialClass)
    }
  })

  test('should have working personalization quiz', async ({ page }) => {
    // Scroll to personalization section
    const personalizationSection = page.locator('[id="personalization"]').first()
    await personalizationSection.scrollIntoViewIfNeeded()

    // Check quiz is visible
    await expect(personalizationSection).toBeVisible()

    // Check quiz title
    const quizTitle = personalizationSection.locator('h2, h3').first()
    await expect(quizTitle).toContainText(/подберём|персонал/i)

    // Check quiz has options
    const options = personalizationSection.locator('button, [role="button"]').all()
    expect(options.length).toBeGreaterThan(0)
  })

  test('should display collections correctly', async ({ page }) => {
    // Check collections section
    const collectionsSection = page.locator('.collections, section').filter({ hasText: 'Коллекции' }).first()
    await expect(collectionsSection).toBeVisible()

    // Check collection cards
    const collectionCards = collectionsSection.locator('.card, [data-testid*="collection"]').all()
    expect(collectionCards.length).toBeGreaterThan(0)

    // Check first collection card has required elements
    const firstCard = collectionCards[0]
    await expect(firstCard.locator('img, [data-testid*="image"]').first()).toBeVisible()
    await expect(firstCard.locator('h3, h4').first()).toBeVisible()
  })

  test('should have working footer', async ({ page }) => {
    // Scroll to footer
    const footer = page.locator('footer').first()
    await footer.scrollIntoViewIfNeeded()

    // Check footer is visible
    await expect(footer).toBeVisible()

    // Check footer content
    await expect(footer).toContainText('Ziggler')
    await expect(footer).toContainText('©')

    // Check social links
    const socialLinks = footer.locator('a[href*="instagram"], a[href*="facebook"]').all()
    expect(socialLinks.length).toBeGreaterThan(0)

    // Check contact information
    await expect(footer).toContainText('Алматы')
    await expect(footer).toContainText('+7')
  })

  test('should have proper meta tags', async ({ page }) => {
    // Check meta title
    const title = await page.title()
    expect(title).toContain('Ziggler')

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]').first()
    const description = await metaDescription.getAttribute('content')
    expect(description).toBeTruthy()
    expect(description!.length).toBeGreaterThan(10)
  })

  test('should handle page load performance', async ({ page }) => {
    // Measure page load time
    const startTime = Date.now()
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - startTime

    // Should load within reasonable time (under 5 seconds)
    expect(loadTime).toBeLessThan(5000)
  })

  test('should be accessible', async ({ page }) => {
    // Check for alt text on images
    const images = page.locator('img')
    const imageCount = await images.count()

    if (imageCount > 0) {
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const alt = await images.nth(i).getAttribute('alt')
        expect(alt).toBeTruthy()
      }
    }

    // Check for proper heading hierarchy
    const h1 = page.locator('h1').first()
    await expect(h1).toBeVisible()

    // Check for focusable elements
    const focusableElements = page.locator('button, a[href], input, select, textarea').all()
    expect(focusableElements.length).toBeGreaterThan(5)
  })
})
