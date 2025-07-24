"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Profile', href: '/profile', icon: UserIcon },
  { name: 'UI Elements', href: '/ui-elements', icon: GridIcon }
];

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}

function GridIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 0C2.25 4.504 2.871 3.875 4 3.875h4.5c1.129 0 2.25.621 2.25 1.75v4.5c0 1.129-.621 2.25-1.75 2.25h-4.5A1.875 1.875 0 014 10.625V5.625zM14.25 5.625c0-1.129.621-2.25 1.75-2.25H20.5c1.129 0 2.25.621 2.25 1.75v4.5c0 1.129-.621 2.25-1.75 2.25h-4.5a1.875 1.875 0 01-1.875-1.875V5.625zM10.125 14.25c0-1.129.621-2.25 1.75-2.25H16.5c1.129 0 2.25.621 2.25 1.75v4.5c0 1.129-.621 2.25-1.75 2.25h-4.625a1.875 1.875 0 01-1.875-1.875v-4.5zM4.125 14.25c0-1.129.621-2.25 1.75-2.25h4.5c1.129 0 2.25.621 2.25 1.75v4.5c0 1.129-.621 2.25-1.75 2.25h-4.5a1.875 1.875 0 01-1.875-1.875v-4.5z" />
    </svg>
  );
}

export default function AppSidebar() {
  const pathname = usePathname();
  const { isExpanded, isHovered, isMobileOpen, setHovered, closeMobile } = useSidebar();

  const shouldShowExpanded = isExpanded || isHovered;

  return (
    <>
      {/* Desktop sidebar */}
      <div
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300",
          shouldShowExpanded ? "lg:w-72" : "lg:w-20"
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-900 px-6 pb-4 border-r border-gray-200 dark:border-gray-800">
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              {shouldShowExpanded && (
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  MyProject
                </span>
              )}
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                            isActive
                              ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                              : "text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-gray-800"
                          )}
                        >
                          <item.icon
                            className={cn(
                              "h-6 w-6 shrink-0",
                              isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                            )}
                            aria-hidden="true"
                          />
                          {shouldShowExpanded && item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={cn("lg:hidden", isMobileOpen ? "block" : "hidden")}>
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-gray-900/80"
            onClick={closeMobile}
          />
          <div className="relative mr-16 flex w-full max-w-xs flex-1">
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
              <button
                type="button"
                className="-m-2.5 p-2.5"
                onClick={closeMobile}
              >
                <span className="sr-only">Close sidebar</span>
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-900 px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">M</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    MyProject
                  </span>
                </div>
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              onClick={closeMobile}
                              className={cn(
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                                isActive
                                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-gray-800"
                              )}
                            >
                              <item.icon
                                className={cn(
                                  "h-6 w-6 shrink-0",
                                  isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}