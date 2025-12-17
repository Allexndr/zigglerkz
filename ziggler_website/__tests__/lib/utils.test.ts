import {
  cn,
  formatPrice,
  formatDate,
  formatDateTime,
  getOrderStatusText,
  getOrderStatusColor,
  debounce,
  generateSlug,
  truncateText,
  calculateDiscountPercentage,
} from '@/lib/utils'

describe('Utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2')
      expect(cn('class1', null, undefined, 'class2')).toBe('class1 class2')
      expect(cn('class1', { 'class2': true, 'class3': false })).toBe('class1 class2')
    })
  })

  describe('formatPrice', () => {
    it('should format price in KZT', () => {
      expect(formatPrice(1000)).toBe('1 000 ₸')
      expect(formatPrice(50000)).toBe('50 000 ₸')
    })
  })

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2025-01-15')
      expect(formatDate(date)).toMatch(/15 января 2025/)
    })
  })

  describe('formatDateTime', () => {
    it('should format date and time correctly', () => {
      const date = new Date('2025-01-15T10:30:00')
      const result = formatDateTime(date)
      expect(result).toMatch(/15 янв/)
      expect(result).toMatch(/10:30/)
    })
  })

  describe('getOrderStatusText', () => {
    it('should return correct status text', () => {
      expect(getOrderStatusText('pending')).toBe('Ожидает подтверждения')
      expect(getOrderStatusText('confirmed')).toBe('Подтверждён')
      expect(getOrderStatusText('delivered')).toBe('Доставлен')
      expect(getOrderStatusText('unknown')).toBe('Неизвестный статус')
    })
  })

  describe('getOrderStatusColor', () => {
    it('should return correct color classes', () => {
      const color = getOrderStatusColor('pending')
      expect(color).toContain('text-yellow-600')
      expect(color).toContain('bg-yellow-50')
    })
  })

  describe('debounce', () => {
    jest.useFakeTimers()

    it('should debounce function calls', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn()
      debouncedFn()
      debouncedFn()

      expect(mockFn).not.toHaveBeenCalled()

      jest.advanceTimersByTime(100)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('generateSlug', () => {
    it('should generate URL slug', () => {
      expect(generateSlug('Классический костюм')).toBe('klassicheskii-kostyum')
      expect(generateSlug('Premium Suit 2025!')).toBe('premium-suit-2025')
    })
  })

  describe('truncateText', () => {
    it('should truncate text correctly', () => {
      const longText = 'This is a very long text that should be truncated'
      expect(truncateText(longText, 10)).toBe('This is a...')
      expect(truncateText('Short', 10)).toBe('Short')
    })
  })

  describe('calculateDiscountPercentage', () => {
    it('should calculate discount percentage', () => {
      expect(calculateDiscountPercentage(1000, 800)).toBe(20)
      expect(calculateDiscountPercentage(2000, 1500)).toBe(25)
    })
  })
})
