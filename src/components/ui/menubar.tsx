"use client";

import { cn } from "@/lib/utils";

interface MenubarProps {
  children?: React.ReactNode;
}

export function Menubar({ children }: MenubarProps) {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0",
        "h-[28px]",
        "bg-win98-surface",
        "win98-border-raised",
        "flex items-center",
        "px-2 gap-1"
      )}
    >
      {children}
    </div>
  );
}

interface MenubarItemProps {
  label: string;
  onClick?: () => void;
}

export function MenubarItem({ label, onClick }: MenubarItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-2 py-1",
        "text-[12px]",
        "hover:bg-win98-title-active hover:text-white",
        "active:win98-border-pressed"
      )}
    >
      {label}
    </button>
  );
}
