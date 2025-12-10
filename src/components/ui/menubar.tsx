"use client";

import { useState, useRef, useEffect } from "react";
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
        "px-2 gap-1",
        "z-50"
      )}
    >
      {children}
    </div>
  );
}

export function MenubarLogo() {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    }

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  return (
    <div className="relative flex items-center gap-1 mr-2">
      <button
        ref={buttonRef}
        onClick={() => setShowPopup(!showPopup)}
        className="flex items-center gap-1 hover:bg-win98-title-active hover:bg-opacity-20 rounded px-1 cursor-pointer"
      >
        {/* Earth with smiley face */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Earth circle */}
          <circle cx="12" cy="12" r="10" fill="#4A90D9" stroke="#2E5A88" strokeWidth="1" />
          {/* Continents/land masses */}
          <ellipse cx="8" cy="8" rx="3" ry="4" fill="#5CB85C" />
          <ellipse cx="15" cy="10" rx="4" ry="3" fill="#5CB85C" />
          <ellipse cx="10" cy="16" rx="3" ry="2" fill="#5CB85C" />
          {/* Smiley face */}
          <circle cx="9" cy="10" r="1.5" fill="#333" /> {/* Left eye */}
          <circle cx="15" cy="10" r="1.5" fill="#333" /> {/* Right eye */}
          <path
            d="M8 14 Q12 18 16 14"
            stroke="#333"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          /> {/* Smile */}
        </svg>
        {/* NEC text */}
        <span className="text-[12px] font-bold text-[#333]">NEC</span>
      </button>

      {showPopup && (
        <div
          ref={popupRef}
          className={cn(
            "absolute top-full left-0 mt-1",
            "bg-win98-surface",
            "win98-border-raised",
            "p-2",
            "text-[10px]",
            "z-50"
          )}
        >
          <div className="text-center whitespace-nowrap">
            <div>© N.E.C. New Eden Committee</div>
            <div>Version: 4.2.1</div>
          </div>
        </div>
      )}
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
