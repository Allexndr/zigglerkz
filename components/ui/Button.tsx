import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-accent text-primary hover:bg-accent/90',
        secondary: 'bg-surface text-text-primary border border-border hover:bg-surface/80 dark:bg-dark-surface dark:text-dark-text-primary dark:border-dark-border',
        outline: 'border border-border bg-background hover:bg-surface text-text-primary dark:bg-dark-background dark:border-dark-border dark:hover:bg-dark-surface',
        ghost: 'hover:bg-surface hover:text-text-primary dark:hover:bg-dark-surface dark:hover:text-dark-text-primary',
        link: 'underline-offset-4 hover:underline text-accent',
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
