"use client";

import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  color: string;
  label: string;
}

interface SidebarNavProps {
  items: NavItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function SidebarNav({ items, selectedId, onSelect }: SidebarNavProps) {
  return (
    <nav className="flex flex-col bg-[#5a5a5a] w-[50px] py-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={cn(
            "relative flex items-center justify-center",
            "w-full h-[50px]",
            "hover:bg-[#6a6a6a]",
            "transition-colors"
          )}
          aria-label={item.label}
          aria-selected={selectedId === item.id}
        >
          {/* Green highlight bar */}
          {selectedId === item.id && (
            <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#7cb342]" />
          )}
          {/* Placeholder icon */}
          <div
            className="w-[32px] h-[32px] rounded-sm"
            style={{ backgroundColor: item.color }}
          />
        </button>
      ))}
    </nav>
  );
}
