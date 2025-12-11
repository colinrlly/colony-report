"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TaskbarProps {
  children?: React.ReactNode;
  onRestart?: () => void;
  onSleep?: () => void;
}

function AntIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Ant head */}
      <rect x="8" y="2" width="4" height="3" fill="#1a1a1a" />
      {/* Antennae */}
      <rect x="6" y="1" width="1" height="2" fill="#1a1a1a" />
      <rect x="13" y="1" width="1" height="2" fill="#1a1a1a" />
      <rect x="5" y="0" width="1" height="1" fill="#1a1a1a" />
      <rect x="14" y="0" width="1" height="1" fill="#1a1a1a" />
      {/* Thorax (middle body) */}
      <rect x="7" y="5" width="6" height="4" fill="#1a1a1a" />
      {/* Abdomen (back body) */}
      <rect x="6" y="9" width="8" height="5" fill="#1a1a1a" />
      <rect x="7" y="14" width="6" height="3" fill="#1a1a1a" />
      <rect x="8" y="17" width="4" height="2" fill="#1a1a1a" />
      {/* Front legs */}
      <rect x="4" y="5" width="3" height="1" fill="#1a1a1a" />
      <rect x="13" y="5" width="3" height="1" fill="#1a1a1a" />
      <rect x="3" y="6" width="1" height="2" fill="#1a1a1a" />
      <rect x="16" y="6" width="1" height="2" fill="#1a1a1a" />
      {/* Middle legs */}
      <rect x="4" y="8" width="3" height="1" fill="#1a1a1a" />
      <rect x="13" y="8" width="3" height="1" fill="#1a1a1a" />
      <rect x="2" y="9" width="2" height="1" fill="#1a1a1a" />
      <rect x="16" y="9" width="2" height="1" fill="#1a1a1a" />
      {/* Back legs */}
      <rect x="4" y="11" width="2" height="1" fill="#1a1a1a" />
      <rect x="14" y="11" width="2" height="1" fill="#1a1a1a" />
      <rect x="2" y="12" width="2" height="1" fill="#1a1a1a" />
      <rect x="16" y="12" width="2" height="1" fill="#1a1a1a" />
      <rect x="1" y="13" width="1" height="2" fill="#1a1a1a" />
      <rect x="18" y="13" width="1" height="2" fill="#1a1a1a" />
      {/* Eyes */}
      <rect x="8" y="3" width="1" height="1" fill="#4a4a4a" />
      <rect x="11" y="3" width="1" height="1" fill="#4a4a4a" />
    </svg>
  );
}

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart?: () => void;
  onSleep?: () => void;
}

function StartMenu({ isOpen, onClose, onRestart, onSleep }: StartMenuProps) {
  if (!isOpen) return null;

  const menuItems = [
    { label: "Restart...", onClick: () => { onClose(); onRestart?.(); } },
    { label: "Sleep", onClick: () => { onClose(); onSleep?.(); } },
    { label: "Shut Down...", onClick: () => { onClose(); } },
  ];

  return (
    <div
      className={cn(
        "absolute bottom-full left-0 mb-1",
        "bg-win98-surface",
        "win98-border-raised",
        "py-1",
        "text-[14px]",
        "min-w-[140px]"
      )}
    >
      {menuItems.map((item, index) => (
        <div
          key={index}
          onClick={item.onClick}
          className={cn(
            "px-4 py-1 cursor-pointer whitespace-nowrap",
            "hover:bg-win98-title-active hover:text-white"
          )}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}

export function Taskbar({ children, onRestart, onSleep }: TaskbarProps) {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const startButtonRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (startButtonRef.current && !startButtonRef.current.contains(event.target as Node)) {
        setStartMenuOpen(false);
      }
    }

    if (startMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [startMenuOpen]);

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
      <div ref={startButtonRef} className="relative">
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className={cn(
            "h-[32px] px-3",
            "flex items-center gap-2",
            "bg-win98-surface",
            startMenuOpen ? "win98-border-pressed" : "win98-border-raised",
            "active:win98-border-pressed",
            "font-bold text-[14px]"
          )}
        >
          <AntIcon />
          Start
        </button>
        <StartMenu isOpen={startMenuOpen} onClose={() => setStartMenuOpen(false)} onRestart={onRestart} onSleep={onSleep} />
      </div>

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
