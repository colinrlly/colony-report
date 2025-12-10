"use client";

import { cn } from "@/lib/utils";

interface DesktopIconProps {
  label: string;
  color?: string;
  onClick?: () => void;
}

export function DesktopIcon({ label, color = "#c44", onClick }: DesktopIconProps) {
  return (
    <button
      onClick={onClick}
      onDoubleClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1",
        "p-2 rounded",
        "hover:bg-white/10",
        "focus:outline-none focus:bg-white/20",
        "text-white"
      )}
    >
      {/* Placeholder icon */}
      <div
        className="w-[48px] h-[48px] rounded-sm flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="white"
          className="opacity-80"
        >
          <rect x="4" y="6" width="24" height="18" rx="1" fill="none" stroke="white" strokeWidth="2" />
          <rect x="6" y="8" width="20" height="2" fill="white" />
          <rect x="8" y="12" width="6" height="6" fill="white" opacity="0.5" />
          <rect x="16" y="12" width="8" height="2" fill="white" opacity="0.5" />
          <rect x="16" y="16" width="6" height="2" fill="white" opacity="0.5" />
        </svg>
      </div>
      <span className="text-[12px] text-center leading-tight max-w-[80px] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
        {label}
      </span>
    </button>
  );
}
