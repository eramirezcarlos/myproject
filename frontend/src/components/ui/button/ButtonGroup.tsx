"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
}

export default function ButtonGroup({ 
  children, 
  orientation = 'horizontal',
  className = "",
}: ButtonGroupProps) {
  const groupClasses = cn(
    "inline-flex",
    {
      "flex-row [&>*]:first:rounded-r-none [&>*]:last:rounded-l-none [&>*]:middle:rounded-none [&>*]:not(:last-child):border-r-0": orientation === 'horizontal',
      "flex-col [&>*]:first:rounded-b-none [&>*]:last:rounded-t-none [&>*]:middle:rounded-none [&>*]:not(:last-child):border-b-0": orientation === 'vertical',
    },
    className
  );

  return (
    <div className={groupClasses} role="group">
      {children}
    </div>
  );
}

// Export useful ButtonGroup combinations
export const ButtonGroupPresets = {
  // Segmented control style
  segmented: {
    variant: 'outline' as const,
    className: 'bg-gray-100 p-1 rounded-lg dark:bg-gray-800'
  },
  
  // Action group style
  actions: {
    variant: 'default' as const,
    className: 'shadow-sm'
  },
  
  // Icon group style
  icons: {
    variant: 'ghost' as const,
    size: 'sm' as const,
    className: 'bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700'
  }
};