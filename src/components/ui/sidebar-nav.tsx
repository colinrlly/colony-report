"use client";

import { cn } from "@/lib/utils";
import { SidebarIcon, SidebarIconType } from "./sidebar-icons";

interface NavItem {
  id: string;
  icon: SidebarIconType;
  label: string;
}

interface SidebarNavProps {
  items: NavItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function SidebarNav({ items, selectedId, onSelect }: SidebarNavProps) {
  return (
    <nav className="flex flex-col bg-[#5a5a5a] w-[70px] py-4 gap-2" role="tablist">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={cn(
            "relative flex items-center justify-center",
            "w-full h-[60px]",
            "hover:bg-[#6a6a6a]",
            "transition-colors"
          )}
          aria-label={item.label}
          role="tab"
          aria-selected={selectedId === item.id}
        >
          {/* Green highlight bar */}
          {selectedId === item.id && (
            <div className="absolute left-0 top-1 bottom-1 w-[4px] bg-[#7cb342]" />
          )}
          {/* Pixel art icon */}
          <SidebarIcon icon={item.icon} />
        </button>
      ))}
    </nav>
  );
}
