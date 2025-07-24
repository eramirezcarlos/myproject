"use client";
import React from "react";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export default function Breadcrumbs({ 
  items, 
  separator = "/", 
  className = "" 
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex ${className}`}>
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="inline-flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-400 dark:text-gray-600">
                  {separator}
                </span>
              )}
              
              {isLast ? (
                <span className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href || "#"}
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Alternative separator options
export const BreadcrumbSeparators = {
  slash: "/",
  chevron: (
    <svg
      className="w-3 h-3 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  ),
  arrow: "→",
  dot: "•",
};