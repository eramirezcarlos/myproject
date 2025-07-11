"use client";
import React from "react";
import { useSidebar } from "@/contexts/SidebarContext";

export default function Backdrop() {
  const { isMobileOpen, closeMobile } = useSidebar();

  if (!isMobileOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-gray-900/80 lg:hidden"
      onClick={closeMobile}
    />
  );
}