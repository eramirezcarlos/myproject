"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DropdownItemProps {
  children: React.ReactNode;
  onItemClick?: () => void;
  tag?: "a" | "button" | "div";
  href?: string;
  className?: string;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  onItemClick,
  tag = "div",
  href,
  className,
}) => {
  const baseClasses = cn(
    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    className
  );

  const handleClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  if (tag === "a" && href) {
    return (
      <Link href={href} className={baseClasses} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  if (tag === "button") {
    return (
      <button className={baseClasses} onClick={handleClick}>
        {children}
      </button>
    );
  }

  return (
    <div className={baseClasses} onClick={handleClick}>
      {children}
    </div>
  );
};