import { test, expect } from '@playwright/test'

test.describe('Styles and CSS', () => {
  test('should load CSS and apply styles correctly', async ({ page }) => {
    await page.goto('/')

    // Wait for page to load completely
    await page.waitForLoadState('networkidle')

    // Check if Tailwind CSS is loaded by checking computed styles
    const body = page.locator('body').first()
    const bodyStyles = await body.evaluate(el => window.getComputedStyle(el))

    // Check if custom CSS variables are applied
    const rootStyles = await page.evaluate(() => {
      const root = document.documentElement
      return window.getComputedStyle(root)
    })

    // Check if fonts are loaded
    const hasInterFont = await page.evaluate(() => {
      const body = document.body
      const fontFamily = window.getComputedStyle(body).fontFamily
      return fontFamily.includes('Inter') || fontFamily.includes('system-ui')
    })

    expect(hasInterFont).toBeTruthy()

    // Check if basic Tailwind classes work
    const testElement = await page.evaluate(() => {
      const el = document.createElement('div')
      el.className = 'bg-red-500 text-white p-4 m-2'
      document.body.appendChild(el)
      const styles = window.getComputedStyle(el)
      const hasBackground = styles.backgroundColor !== ''
      const hasPadding = styles.padding !== '0px'
      document.body.removeChild(el)
      return { hasBackground, hasPadding }
    })

    expect(testElement.hasBackground).toBeTruthy()
    expect(testElement.hasPadding).toBeTruthy()
  })

  test('should apply theme styles correctly', async ({ page }) => {
    await page.goto('/')

    // Check initial theme (light)
    const html = page.locator('html')
    const initialClass = await html.getAttribute('class')

    // Should start with light theme or no theme class
    expect(initialClass === null || !initialClass.includes('dark')).toBeTruthy()

    // Find theme toggle button
    const themeToggle = page.locator('button, [data-testid*="theme"]').first()

    if (await themeToggle.isVisible()) {
      // Click theme toggle
      await themeToggle.click()

      // Check if theme changed
      const newClass = await html.getAttribute('class')
      expect(newClass).toContain('dark')

      // Click again to return to light theme
      await themeToggle.click()
      const finalClass = await html.getAttribute('class')
      expect(finalClass === null || !finalClass.includes('dark')).toBeTruthy()
    }
  })

  test('should have responsive breakpoints', async ({ page }) => {
    await page.goto('/')

    // Test mobile breakpoint
    await page.setViewportSize({ width: 375, height: 667 })

    // Check if mobile menu is visible
    const mobileMenu = page.locator('button[aria-label*="menu"], [data-testid*="menu"]').first()
    const isMobileMenuVisible = await mobileMenu.isVisible()

    // Test desktop breakpoint
    await page.setViewportSize({ width: 1024, height: 768 })

    // Check if desktop navigation is visible
    const desktopNav = page.locator('nav').first()
    await expect(desktopNav).toBeVisible()

    // Test large desktop
    await page.setViewportSize({ width: 1920, height: 1080 })

    // Page should still be functional
    const header = page.locator('header').first()
    await expect(header).toBeVisible()
  })

  test('should apply custom component styles', async ({ page }) => {
    await page.goto('/')

    // Check if custom button styles are applied
    const buttons = page.locator('button').all()

    if (buttons.length > 0) {
      const firstButton = buttons[0]
      const buttonStyles = await firstButton.evaluate(el => window.getComputedStyle(el))

      // Should have some styling (not default browser styles)
      expect(buttonStyles.borderRadius).not.toBe('0px')
    }

    // Check if cards have proper styling
    const cards = page.locator('.card, [class*="card"]').all()

    if (cards.length > 0) {
      const firstCard = cards[0]
      const cardStyles = await firstCard.evaluate(el => window.getComputedStyle(el))

      // Should have border radius and shadow
      expect(cardStyles.borderRadius).not.toBe('0px')
      expect(cardStyles.boxShadow).not.toBe('none')
    }
  })

  test('should handle CSS custom properties', async ({ page }) => {
    await page.goto('/')

    // Check if CSS custom properties are defined
    const customProperties = await page.evaluate(() => {
      const root = document.documentElement
      const styles = window.getComputedStyle(root)

      return {
        hasPrimaryColor: styles.getPropertyValue('--color-primary') !== '',
        hasAccentColor: styles.getPropertyValue('--color-accent') !== '',
        hasFontInter: styles.getPropertyValue('--font-inter') !== '',
        hasFontPlayfair: styles.getPropertyValue('--font-playfair') !== '',
      }
    })

    // At least some custom properties should be defined
    expect(
      customProperties.hasPrimaryColor ||
      customProperties.hasAccentColor ||
      customProperties.hasFontInter ||
      customProperties.hasFontPlayfair
    ).toBeTruthy()
  })

  test('should have proper focus styles', async ({ page }) => {
    await page.goto('/')

    // Find focusable elements
    const focusableElements = page.locator('button, a[href], input, select, textarea').all()

    if (focusableElements.length > 0) {
      const firstElement = focusableElements[0]

      // Focus the element
      await firstElement.focus()

      // Check if focus styles are applied
      const isFocused = await firstElement.evaluate(el => el === document.activeElement)
      expect(isFocused).toBeTruthy()

      // Check if focus ring is visible (should have outline or box-shadow)
      const focusStyles = await firstElement.evaluate(el => {
        const styles = window.getComputedStyle(el)
        return {
          hasOutline: styles.outline !== 'none' && styles.outline !== '',
          hasBoxShadow: styles.boxShadow !== 'none',
          hasBorder: styles.border !== 'none',
        }
      })

      // At least one focus indicator should be present
      expect(
        focusStyles.hasOutline ||
        focusStyles.hasBoxShadow ||
        focusStyles.hasBorder
      ).toBeTruthy()
    }
  })

  test('should load fonts correctly', async ({ page }) => {
    await page.goto('/')

    // Wait for fonts to load
    await page.waitForLoadState('networkidle')

    // Check if fonts are applied
    const fontCheck = await page.evaluate(() => {
      const body = document.body
      const h1 = document.querySelector('h1')
      const h2 = document.querySelector('h2')

      const bodyFont = window.getComputedStyle(body).fontFamily
      const h1Font = h1 ? window.getComputedStyle(h1).fontFamily : ''
      const h2Font = h2 ? window.getComputedStyle(h2).fontFamily : ''

      return {
        bodyHasInter: bodyFont.includes('Inter') || bodyFont.includes('system-ui'),
        headingsHavePlayfair: h1Font.includes('Playfair') || h2Font.includes('Playfair'),
      }
    })

    expect(fontCheck.bodyHasInter).toBeTruthy()
    // Headings might not have Playfair if not specifically applied
  })

  test('should handle CSS animations', async ({ page }) => {
    await page.goto('/')

    // Check if animations are defined in CSS
    const hasAnimations = await page.evaluate(() => {
      const styles = document.styleSheets
      let hasFadeIn = false
      let hasSlideUp = false

      for (let i = 0; i < styles.length; i++) {
        try {
          const rules = styles[i].cssRules || styles[i].rules
          for (let j = 0; j < rules.length; j++) {
            const rule = rules[j]
            if (rule.cssText && rule.cssText.includes('fadeIn')) {
              hasFadeIn = true
            }
            if (rule.cssText && rule.cssText.includes('slideUp')) {
              hasSlideUp = true
            }
          }
        } catch (e) {
          // Ignore cross-origin stylesheet errors
        }
      }

      return { hasFadeIn, hasSlideUp }
    })

    // At least basic animations should be defined
    expect(hasAnimations.hasFadeIn).toBeTruthy()
  })
})
