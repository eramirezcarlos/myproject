import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'success' | 'warning' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md', 
    asChild = false, 
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      {
        // Variants
        'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700': variant === 'default',
        'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700': variant === 'outline',
        'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600': variant === 'secondary',
        'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100': variant === 'ghost',
        'bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700': variant === 'destructive',
        'bg-green-600 text-white hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700': variant === 'success',
        'bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-500 dark:hover:bg-yellow-600': variant === 'warning',
        'text-blue-600 underline-offset-4 hover:underline dark:text-blue-400': variant === 'link',
        
        // Sizes
        'h-7 px-2 text-xs': size === 'xs',
        'h-8 px-3 text-sm': size === 'sm',
        'h-10 px-4 py-2': size === 'md',
        'h-11 px-8': size === 'lg',
        'h-12 px-10 text-base': size === 'xl',
      },
      className
    );

    const isDisabled = disabled || loading;

    if (asChild) {
      return (
        <div className={baseClasses} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
          {children}
        </div>
      );
    }

    return (
      <button
        className={baseClasses}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);
Button.displayName = 'Button';

export default Button;
