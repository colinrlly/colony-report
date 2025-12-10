"use client";

import { cn } from "@/lib/utils";

interface TaskbarProps {
  children?: React.ReactNode;
}

export function Taskbar({ children }: TaskbarProps) {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0",
        "h-[40px]",
        "bg-win98-surface",
        "win98-border-raised",
        "flex items-center",
        "px-1 gap-1"
      )}
    >
      {/* Start Button */}
      <button
        className={cn(
          "h-[32px] px-3",
          "flex items-center gap-2",
          "bg-win98-surface",
          "win98-border-raised",
          "active:win98-border-pressed",
          "font-bold text-[14px]"
        )}
      >
        <div className="w-[20px] h-[20px] bg-[#008080] flex items-center justify-center">
          <span className="text-white text-[12px]">W</span>
        </div>
        Start
      </button>

      {/* Divider */}
      <div className="w-[2px] h-[28px] bg-win98-shadow mx-1" />

      {/* Open windows / task buttons */}
      <div className="flex-1 flex items-center gap-1">
        {children}
      </div>

      {/* System tray */}
      <div className="win98-border-sunken h-[28px] px-2 flex items-center gap-2 text-[12px]">
        <span>
          {new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
}

interface TaskbarButtonProps {
  title: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function TaskbarButton({ title, isActive, onClick }: TaskbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-[28px] px-2 min-w-[120px] max-w-[200px]",
        "flex items-center gap-2",
        "bg-win98-surface",
        "text-left text-[12px] truncate",
        isActive ? "win98-border-pressed" : "win98-border-raised"
      )}
    >
      <div className="w-[16px] h-[16px] bg-[#8b7355] flex-shrink-0" />
      <span className="truncate">{title}</span>
    </button>
  );
}
