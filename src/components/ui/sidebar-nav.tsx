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
    <nav className="flex flex-col bg-[#5a4d42] w-[70px] py-4 gap-2" role="tablist">
      {items.map((item) => {
        const isSelected = selectedId === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={cn(
              "relative flex items-center justify-center",
              "w-full h-[60px]",
              "transition-colors",
              isSelected
                ? "bg-[#6b5d50]"
                : "hover:bg-[#65574b]"
            )}
            aria-label={item.label}
            role="tab"
            aria-selected={isSelected}
          >
            {/* Highlight bar for selected item */}
            {isSelected && (
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#c4a574]" />
            )}
            {/* Pixel art icon */}
            <SidebarIcon icon={item.icon} />
          </button>
        );
      })}
    </nav>
  );
}
