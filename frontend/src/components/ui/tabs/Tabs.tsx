"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

interface TabsProps {
  items: TabItem[];
  defaultActiveTab?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline' | 'cards';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  tabListClassName?: string;
  tabContentClassName?: string;
}

export default function Tabs({
  items,
  defaultActiveTab,
  activeTab: controlledActiveTab,
  onTabChange,
  variant = 'default',
  size = 'md',
  className = "",
  tabListClassName = "",
  tabContentClassName = ""
}: TabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(
    defaultActiveTab || items[0]?.id || ""
  );

  const activeTab = controlledActiveTab || internalActiveTab;

  useEffect(() => {
    if (defaultActiveTab && !controlledActiveTab) {
      setInternalActiveTab(defaultActiveTab);
    }
  }, [defaultActiveTab, controlledActiveTab]);

  const handleTabClick = (tabId: string) => {
    const tab = items.find(item => item.id === tabId);
    if (tab && !tab.disabled) {
      if (!controlledActiveTab) {
        setInternalActiveTab(tabId);
      }
      onTabChange?.(tabId);
    }
  };


  const getTabListClasses = () => {
    const baseClasses = "flex";
    
    switch (variant) {
      case 'pills':
        return cn(baseClasses, "bg-gray-100 p-1 rounded-lg dark:bg-gray-800");
      case 'underline':
        return cn(baseClasses, "border-b border-gray-200 dark:border-gray-700");
      case 'cards':
        return cn(baseClasses, "border-b border-gray-200 dark:border-gray-700");
      default:
        return cn(baseClasses, "border-b border-gray-200 dark:border-gray-700");
    }
  };

  const getTabClasses = (tab: TabItem, isActive: boolean) => {
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const baseClasses = cn(
      "flex items-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
      sizeClasses[size],
      {
        'cursor-not-allowed opacity-50': tab.disabled,
        'cursor-pointer': !tab.disabled,
      }
    );

    switch (variant) {
      case 'pills':
        return cn(
          baseClasses,
          "rounded-md",
          {
            'bg-white text-blue-600 shadow-sm dark:bg-gray-700 dark:text-blue-400': isActive && !tab.disabled,
            'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white': !isActive && !tab.disabled,
          }
        );

      case 'underline':
        return cn(
          baseClasses,
          "border-b-2 -mb-px",
          {
            'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400': isActive && !tab.disabled,
            'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300': !isActive && !tab.disabled,
          }
        );

      case 'cards':
        return cn(
          baseClasses,
          "border border-gray-200 rounded-t-lg -mb-px dark:border-gray-700",
          {
            'bg-white border-b-white text-blue-600 dark:bg-gray-800 dark:border-b-gray-800 dark:text-blue-400': isActive && !tab.disabled,
            'bg-gray-50 text-gray-500 hover:text-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:text-gray-300': !isActive && !tab.disabled,
          }
        );

      default:
        return cn(
          baseClasses,
          "border-b-2 -mb-px",
          {
            'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400': isActive && !tab.disabled,
            'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300': !isActive && !tab.disabled,
          }
        );
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Tab List */}
      <div className={cn(getTabListClasses(), tabListClassName)} role="tablist">
        {items.map((tab) => {
          const isActive = tab.id === activeTab;
          
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              className={getTabClasses(tab, isActive)}
              onClick={() => handleTabClick(tab.id)}
              disabled={tab.disabled}
            >
              {tab.icon && (
                <span className="mr-2">{tab.icon}</span>
              )}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={cn(
                  "ml-2 px-2 py-0.5 text-xs rounded-full",
                  {
                    'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400': isActive,
                    'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400': !isActive,
                  }
                )}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className={cn("mt-4", tabContentClassName)}>
        {items.map((tab) => (
          <div
            key={tab.id}
            id={`tabpanel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            className={cn({
              'hidden': tab.id !== activeTab,
              'block': tab.id === activeTab,
            })}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}

// Vertical Tabs Component
interface VerticalTabsProps extends Omit<TabsProps, 'variant'> {
  tabWidth?: string;
}

export function VerticalTabs({
  items,
  defaultActiveTab,
  activeTab: controlledActiveTab,
  onTabChange,
  size = 'md',
  className = "",
  tabListClassName = "",
  tabContentClassName = "",
  tabWidth = "200px"
}: VerticalTabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(
    defaultActiveTab || items[0]?.id || ""
  );

  const activeTab = controlledActiveTab || internalActiveTab;

  const handleTabClick = (tabId: string) => {
    const tab = items.find(item => item.id === tabId);
    if (tab && !tab.disabled) {
      if (!controlledActiveTab) {
        setInternalActiveTab(tabId);
      }
      onTabChange?.(tabId);
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  return (
    <div className={cn("flex", className)}>
      {/* Vertical Tab List */}
      <div 
        className={cn("flex flex-col border-r border-gray-200 dark:border-gray-700", tabListClassName)}
        style={{ minWidth: tabWidth }}
        role="tablist"
      >
        {items.map((tab) => {
          const isActive = tab.id === activeTab;
          
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={cn(
                "flex items-center text-left font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                sizeClasses[size],
                {
                  'bg-blue-50 text-blue-600 border-r-2 border-blue-500 dark:bg-blue-900/20 dark:text-blue-400': isActive && !tab.disabled,
                  'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white': !isActive && !tab.disabled,
                  'cursor-not-allowed opacity-50': tab.disabled,
                  'cursor-pointer': !tab.disabled,
                }
              )}
              onClick={() => handleTabClick(tab.id)}
              disabled={tab.disabled}
            >
              {tab.icon && (
                <span className="mr-3">{tab.icon}</span>
              )}
              <span className="flex-1">{tab.label}</span>
              {tab.badge && (
                <span className={cn(
                  "ml-2 px-2 py-0.5 text-xs rounded-full",
                  {
                    'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400': isActive,
                    'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400': !isActive,
                  }
                )}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Vertical Tab Content */}
      <div className={cn("flex-1 p-6", tabContentClassName)}>
        {items.map((tab) => (
          <div
            key={tab.id}
            id={`tabpanel-${tab.id}`}
            role="tabpanel"
            className={cn({
              'hidden': tab.id !== activeTab,
              'block': tab.id === activeTab,
            })}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}