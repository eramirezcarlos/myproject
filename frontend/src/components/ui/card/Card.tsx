"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export default function Card({ 
  children, 
  className = "",
  variant = 'default',
  padding = 'md',
  rounded = 'lg'
}: CardProps) {
  const cardClasses = cn(
    "bg-white dark:bg-gray-800",
    {
      // Variants
      'border border-gray-200 dark:border-gray-700': variant === 'default',
      'shadow-lg border border-gray-200 dark:border-gray-700 dark:shadow-gray-800/25': variant === 'elevated',
      'border-2 border-gray-300 dark:border-gray-600': variant === 'outlined',
      'bg-gray-50 dark:bg-gray-750': variant === 'filled',
      
      // Padding
      'p-0': padding === 'none',
      'p-3': padding === 'sm',
      'p-4 lg:p-6': padding === 'md',
      'p-6 lg:p-8': padding === 'lg',
      'p-8 lg:p-10': padding === 'xl',
      
      // Rounded corners
      'rounded-none': rounded === 'none',
      'rounded-sm': rounded === 'sm',
      'rounded-md': rounded === 'md',
      'rounded-lg': rounded === 'lg',
      'rounded-xl': rounded === 'xl',
      'rounded-full': rounded === 'full',
    },
    className
  );

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
}

// Card Header Component
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export function CardHeader({ children, className = "", actions }: CardHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-4", className)}>
      <div>{children}</div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

// Card Title Component
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function CardTitle({ children, className = "", level = 3 }: CardTitleProps) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  
  const titleClasses = cn(
    "font-semibold text-gray-900 dark:text-white",
    {
      'text-2xl': level === 1,
      'text-xl': level === 2,
      'text-lg': level === 3,
      'text-base': level === 4,
      'text-sm': level === 5,
      'text-xs': level === 6,
    },
    className
  );

  return <Tag className={titleClasses}>{children}</Tag>;
}

// Card Content Component
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return (
    <div className={cn("text-gray-600 dark:text-gray-300", className)}>
      {children}
    </div>
  );
}

// Card Footer Component
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right' | 'between';
}

export function CardFooter({ children, className = "", align = 'right' }: CardFooterProps) {
  const footerClasses = cn(
    "border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 flex",
    {
      'justify-start': align === 'left',
      'justify-center': align === 'center',
      'justify-end': align === 'right',
      'justify-between': align === 'between',
    },
    className
  );

  return (
    <div className={footerClasses}>
      {children}
    </div>
  );
}

// Statistics Card Component
interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({ title, value, change, icon, className = "" }: StatsCardProps) {
  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
          {change && (
            <p className={cn("text-sm mt-2 flex items-center", {
              'text-green-600 dark:text-green-400': change.type === 'increase',
              'text-red-600 dark:text-red-400': change.type === 'decrease',
              'text-gray-600 dark:text-gray-400': change.type === 'neutral',
            })}>
              {change.type === 'increase' && (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l6-6 6 6" />
                </svg>
              )}
              {change.type === 'decrease' && (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-6 6-6-6" />
                </svg>
              )}
              {change.value}
            </p>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full dark:bg-blue-900/20 dark:text-blue-400">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}