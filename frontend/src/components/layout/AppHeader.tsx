"use client";
import React from "react";
import { useSidebar } from "@/contexts/SidebarContext";
import UserDropdown from "@/components/header/UserDropdown";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import { ThemeToggleButton } from "@/components/dashboard/common/ThemeToggleButton";

export default function AppHeader() {
  const { toggleMobileOpen } = useSidebar();

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden dark:text-gray-400"
        onClick={toggleMobileOpen}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1">
          {/* Search placeholder */}
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Theme toggle */}
          <ThemeToggleButton />

          {/* Notifications */}
          <NotificationDropdown />

          {/* Profile dropdown */}
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}