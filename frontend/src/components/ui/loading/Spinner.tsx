"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'white' | 'gray';
  className?: string;
  variant?: 'circular' | 'dots' | 'pulse' | 'bars' | 'ring';
}

export default function Spinner({ 
  size = 'md', 
  color = 'primary',
  className = "",
  variant = 'circular'
}: SpinnerProps) {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    warning: 'text-yellow-500',
    danger: 'text-red-600',
    white: 'text-white',
    gray: 'text-gray-400',
  };

  if (variant === 'circular') {
    return (
      <svg
        className={cn(
          "animate-spin",
          sizeClasses[size],
          colorClasses[color],
          className
        )}
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
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn("flex space-x-1", className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-full animate-pulse",
              sizeClasses[size],
              `bg-current ${colorClasses[color]}`
            )}
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: '0.6s'
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div
        className={cn(
          "rounded-full bg-current animate-pulse",
          sizeClasses[size],
          colorClasses[color],
          className
        )}
      />
    );
  }

  if (variant === 'bars') {
    return (
      <div className={cn("flex space-x-1", className)}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "w-1 bg-current animate-pulse",
              colorClasses[color],
              {
                'h-3': size === 'xs',
                'h-4': size === 'sm',
                'h-6': size === 'md',
                'h-8': size === 'lg',
                'h-12': size === 'xl',
              }
            )}
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: '0.8s'
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'ring') {
    return (
      <div
        className={cn(
          "border-4 border-gray-200 border-t-current rounded-full animate-spin",
          sizeClasses[size],
          colorClasses[color],
          className
        )}
      />
    );
  }

  return null;
}

// Loading Overlay Component
interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
  spinnerProps?: Omit<SpinnerProps, 'className'>;
  className?: string;
}

export function LoadingOverlay({
  isLoading,
  children,
  message = "Loading...",
  spinnerProps = {},
  className = ""
}: LoadingOverlayProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 dark:bg-gray-900 dark:bg-opacity-75">
          <div className="flex flex-col items-center">
            <Spinner {...spinnerProps} />
            {message && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Skeleton Loader Component
interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export function Skeleton({
  className = "",
  variant = 'text',
  width,
  height,
  lines = 1
}: SkeletonProps) {
  const baseClasses = "animate-pulse bg-gray-200 dark:bg-gray-700";
  
  if (variant === 'text' && lines > 1) {
    return (
      <div className={className}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={cn(baseClasses, "h-4 rounded mb-2 last:mb-0")}
            style={{
              width: i === lines - 1 ? '75%' : '100%'
            }}
          />
        ))}
      </div>
    );
  }

  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      style={{
        width: width || (variant === 'circular' ? height : '100%'),
        height: height || (variant === 'text' ? '1rem' : '200px')
      }}
    />
  );
}