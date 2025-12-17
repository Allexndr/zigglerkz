import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '@/components/ui/Input'

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
  })

  it('renders with different types', () => {
    render(<Input type="email" placeholder="Enter email" />)
    const input = screen.getByPlaceholderText('Enter email')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('handles value changes', () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test value' } })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(input).toHaveValue('test value')
  })

  it('applies custom className', () => {
    render(<Input className="custom-input" />)
    expect(screen.getByRole('textbox')).toHaveClass('custom-input')
  })

  it('handles disabled state', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('handles required attribute', () => {
    render(<Input required />)
    expect(screen.getByRole('textbox')).toHaveAttribute('required')
  })

  it('renders with placeholder', () => {
    render(<Input placeholder="Search products..." />)
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument()
  })

  it('forwards other props', () => {
    render(<Input maxLength={50} autoComplete="off" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('maxLength', '50')
    expect(input).toHaveAttribute('autoComplete', 'off')
  })
})
