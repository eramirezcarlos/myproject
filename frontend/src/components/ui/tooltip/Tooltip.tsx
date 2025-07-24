"use client";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
  trigger?: 'hover' | 'click' | 'focus';
  delay?: number;
  className?: string;
  tooltipClassName?: string;
  arrow?: boolean;
  disabled?: boolean;
}

export default function Tooltip({
  children,
  content,
  position = 'top',
  trigger = 'hover',
  delay = 0,
  className = "",
  tooltipClassName = "",
  arrow = true,
  disabled = false
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState(position);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (disabled) return;
    
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    } else {
      setIsVisible(true);
    }
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleClick = () => {
    if (trigger === 'click') {
      if (isVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
  };

  // Position calculation and adjustment
  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let newPosition = position;

      // Check if tooltip goes outside viewport and adjust position
      switch (position) {
        case 'top':
        case 'top-start':
        case 'top-end':
          if (triggerRect.top - tooltipRect.height < 0) {
            newPosition = position.replace('top', 'bottom') as typeof position;
          }
          break;
        case 'bottom':
        case 'bottom-start':
        case 'bottom-end':
          if (triggerRect.bottom + tooltipRect.height > viewportHeight) {
            newPosition = position.replace('bottom', 'top') as typeof position;
          }
          break;
        case 'left':
          if (triggerRect.left - tooltipRect.width < 0) {
            newPosition = 'right';
          }
          break;
        case 'right':
          if (triggerRect.right + tooltipRect.width > viewportWidth) {
            newPosition = 'left';
          }
          break;
      }

      setActualPosition(newPosition);
    }
  }, [isVisible, position]);

  // Close on click outside for click trigger
  useEffect(() => {
    if (trigger === 'click' && isVisible) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node) &&
          !tooltipRef.current?.contains(event.target as Node)
        ) {
          hideTooltip();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [trigger, isVisible]);

  const getTooltipClasses = () => {
    const baseClasses = "absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700 transition-opacity duration-200";
    
    const positionClasses = {
      'top': 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
      'top-start': 'bottom-full left-0 mb-2',
      'top-end': 'bottom-full right-0 mb-2',
      'bottom': 'top-full left-1/2 transform -translate-x-1/2 mt-2',
      'bottom-start': 'top-full left-0 mt-2',
      'bottom-end': 'top-full right-0 mt-2',
      'left': 'right-full top-1/2 transform -translate-y-1/2 mr-2',
      'right': 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    };

    return cn(
      baseClasses,
      positionClasses[actualPosition],
      {
        'opacity-0 pointer-events-none': !isVisible,
        'opacity-100': isVisible,
      },
      tooltipClassName
    );
  };

  const getArrowClasses = () => {
    const arrowClasses = {
      'top': 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900 dark:border-t-gray-700',
      'top-start': 'top-full left-3 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900 dark:border-t-gray-700',
      'top-end': 'top-full right-3 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900 dark:border-t-gray-700',
      'bottom': 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900 dark:border-b-gray-700',
      'bottom-start': 'bottom-full left-3 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900 dark:border-b-gray-700',
      'bottom-end': 'bottom-full right-3 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900 dark:border-b-gray-700',
      'left': 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900 dark:border-l-gray-700',
      'right': 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900 dark:border-r-gray-700',
    };

    return cn(
      "absolute w-0 h-0 border-4",
      arrowClasses[actualPosition]
    );
  };

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <div className={cn("relative inline-block", className)}>
      <div
        ref={triggerRef}
        onMouseEnter={trigger === 'hover' ? showTooltip : undefined}
        onMouseLeave={trigger === 'hover' ? hideTooltip : undefined}
        onFocus={trigger === 'focus' ? showTooltip : undefined}
        onBlur={trigger === 'focus' ? hideTooltip : undefined}
        onClick={handleClick}
        className="inline-block"
      >
        {children}
      </div>

      <div
        ref={tooltipRef}
        className={getTooltipClasses()}
        role="tooltip"
      >
        {content}
        {arrow && <div className={getArrowClasses()} />}
      </div>
    </div>
  );
}

// Tooltip variants for common use cases
export function InfoTooltip({ 
  children, 
  content, 
  ...props 
}: Omit<TooltipProps, 'children'> & { children?: React.ReactNode }) {
  return (
    <Tooltip content={content} {...props}>
      {children || (
        <svg className="w-4 h-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
    </Tooltip>
  );
}

export function HelpTooltip({ 
  children, 
  content, 
  ...props 
}: Omit<TooltipProps, 'children'> & { children?: React.ReactNode }) {
  return (
    <Tooltip content={content} {...props}>
      {children || (
        <svg className="w-4 h-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
    </Tooltip>
  );
}