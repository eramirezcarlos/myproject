"use client";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  separator?: boolean;
}

interface MenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  className?: string;
  menuClassName?: string;
}

export default function Menu({
  trigger,
  items,
  position = 'bottom-right',
  className = "",
  menuClassName = ""
}: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item: MenuItem) => {
    if (!item.disabled && item.onClick) {
      item.onClick();
      setIsOpen(false);
    }
  };

  const positionClasses = {
    'bottom-left': 'top-full left-0 mt-2',
    'bottom-right': 'top-full right-0 mt-2',
    'top-left': 'bottom-full left-0 mb-2',
    'top-right': 'bottom-full right-0 mb-2',
  };

  return (
    <div ref={menuRef} className={cn("relative inline-block", className)}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div className={cn(
          "absolute z-50 min-w-48 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700",
          positionClasses[position],
          menuClassName
        )}>
          <div className="py-1">
            {items.map((item, index) => {
              if (item.separator) {
                return (
                  <hr key={`separator-${index}`} className="my-1 border-gray-200 dark:border-gray-700" />
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  className={cn(
                    "w-full flex items-center px-4 py-2 text-sm text-left transition-colors",
                    {
                      'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700': !item.danger && !item.disabled,
                      'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20': item.danger && !item.disabled,
                      'text-gray-400 cursor-not-allowed dark:text-gray-600': item.disabled,
                    }
                  )}
                >
                  {item.icon && (
                    <span className="mr-3 flex-shrink-0">{item.icon}</span>
                  )}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}