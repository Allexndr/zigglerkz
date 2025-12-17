import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeProvider, useTheme } from '@/components/providers/ThemeProvider'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Test component that uses the theme hook
function TestComponent() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div>
      <div data-testid="theme-value">{theme}</div>
      <button onClick={toggleTheme} data-testid="toggle-button">
        Toggle Theme
      </button>
    </div>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
  })

  it('provides theme context to children', () => {
    localStorageMock.getItem.mockReturnValue('light')

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme-value')).toHaveTextContent('light')
  })

  it('loads theme from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('dark')

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark')
  })

  it('detects system preference when no stored theme', () => {
    localStorageMock.getItem.mockReturnValue(null)
    // Mock prefers-color-scheme: dark
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark')
  })

  it('toggles theme correctly', () => {
    localStorageMock.getItem.mockReturnValue('light')

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    const toggleButton = screen.getByTestId('toggle-button')
    const themeValue = screen.getByTestId('theme-value')

    expect(themeValue).toHaveTextContent('light')

    fireEvent.click(toggleButton)
    expect(themeValue).toHaveTextContent('dark')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('ziggler-theme', 'dark')

    fireEvent.click(toggleButton)
    expect(themeValue).toHaveTextContent('light')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('ziggler-theme', 'light')
  })

  it('applies theme class to document element', () => {
    localStorageMock.getItem.mockReturnValue('dark')

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(document.documentElement).toHaveClass('dark')
  })

  it('throws error when useTheme is used outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(<TestComponent />)
    }).toThrow('useTheme must be used within a ThemeProvider')

    consoleSpy.mockRestore()
  })

  it('handles SSR correctly', async () => {
    // Mock SSR environment
    const originalMatchMedia = window.matchMedia
    delete (window as any).matchMedia

    localStorageMock.getItem.mockReturnValue('light')

    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    )

    // Should render children after hydration
    await screen.findByText('Test')

    // Restore matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: originalMatchMedia,
    })
  })
})
