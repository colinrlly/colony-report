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
        "h-[36px]",
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
        <span className="text-[14px] font-bold text-[#333]">NEC</span>
      </button>

      {showPopup && (
        <div
          ref={popupRef}
          className={cn(
            "absolute top-full left-0 mt-1",
            "bg-win98-surface",
            "win98-border-raised",
            "p-3",
            "text-[14px]",
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

export interface MenuItemData {
  label: string;
  onClick?: () => void;
  submenu?: MenuItemData[];
  isHistoryItem?: boolean;
}

interface MenubarItemProps {
  label: string;
  onClick?: () => void;
  menuItems?: MenuItemData[];
}

function MenuDropdownItem({ item, onClose }: { item: MenuItemData; onClose: () => void }) {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  if (item.submenu) {
    return (
      <div
        ref={itemRef}
        className="relative"
        onMouseEnter={() => setShowSubmenu(true)}
        onMouseLeave={() => setShowSubmenu(false)}
      >
        <div
          className={cn(
            "px-4 py-1 cursor-pointer flex items-center justify-between",
            "hover:bg-win98-title-active hover:text-white"
          )}
        >
          <span>{item.label}</span>
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-4"
          >
            <path d="M2 1L6 4L2 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {showSubmenu && (
          <div
            className={cn(
              "absolute left-full top-0 -mt-1",
              "bg-win98-surface",
              "win98-border-raised",
              "py-1",
              "min-w-[140px]",
              "z-50"
            )}
          >
            {item.submenu.map((subItem, index) => (
              <div
                key={index}
                onClick={() => {
                  subItem.onClick?.();
                  onClose();
                }}
                className={cn(
                  "px-4 py-1 cursor-pointer whitespace-nowrap",
                  "hover:bg-win98-title-active hover:text-white"
                )}
              >
                {subItem.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (item.isHistoryItem) {
    return (
      <div
        className={cn(
          "px-4 py-0.5 text-[13px] whitespace-nowrap",
          "text-[#333] cursor-default"
        )}
      >
        {item.label}
      </div>
    );
  }

  return (
    <div
      onClick={() => {
        item.onClick?.();
        onClose();
      }}
      className={cn(
        "px-4 py-1 cursor-pointer whitespace-nowrap",
        "hover:bg-win98-title-active hover:text-white"
      )}
    >
      {item.label}
    </div>
  );
}

export function MenubarItem({ label, onClick, menuItems }: MenubarItemProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  if (!menuItems) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "px-2 py-1",
          "text-[14px]",
          "hover:bg-win98-title-active hover:text-white",
          "active:win98-border-pressed"
        )}
      >
        {label}
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setShowDropdown(!showDropdown)}
        className={cn(
          "px-2 py-1",
          "text-[14px]",
          "hover:bg-win98-title-active hover:text-white",
          showDropdown && "bg-win98-title-active text-white"
        )}
      >
        {label}
      </button>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className={cn(
            "absolute top-full left-0 mt-0",
            "bg-win98-surface",
            "win98-border-raised",
            "py-1",
            "text-[14px]",
            "z-50",
            "min-w-[160px]"
          )}
        >
          {menuItems.map((item, index) => (
            <MenuDropdownItem
              key={index}
              item={item}
              onClose={() => setShowDropdown(false)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function MenubarProfile() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="relative ml-auto flex items-center">
      <button
        ref={buttonRef}
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-1 hover:bg-win98-title-active hover:bg-opacity-20 rounded px-2 py-1 cursor-pointer"
      >
        {/* Pixel art profile icon - neon green on dark green */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ imageRendering: "pixelated" }}
        >
          {/* Dark green circle background */}
          <circle cx="12" cy="12" r="11" fill="#1a4d1a" />
          <circle cx="12" cy="12" r="11" stroke="#0d260d" strokeWidth="1" />

          {/* User silhouette - head (pixel art style using rects) */}
          <rect x="9" y="5" width="6" height="2" fill="#39ff14" />
          <rect x="8" y="7" width="8" height="2" fill="#39ff14" />
          <rect x="8" y="9" width="8" height="2" fill="#39ff14" />
          <rect x="9" y="11" width="6" height="1" fill="#39ff14" />

          {/* User silhouette - body/shoulders (pixel art style) */}
          <rect x="10" y="12" width="4" height="1" fill="#39ff14" />
          <rect x="7" y="13" width="10" height="2" fill="#39ff14" />
          <rect x="5" y="15" width="14" height="2" fill="#39ff14" />
          <rect x="4" y="17" width="16" height="3" fill="#39ff14" />
        </svg>

        {/* Dropdown caret */}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 4L5 7L8 4" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className={cn(
            "absolute top-full right-0 mt-1",
            "bg-win98-surface",
            "win98-border-raised",
            "p-3",
            "text-[14px]",
            "z-50",
            "min-w-[280px]"
          )}
        >
          <div className="whitespace-nowrap space-y-0.5">
            <div><span className="font-bold">Account User:</span> Dr. Jasmine Thorne</div>
            <div><span className="font-bold">Account ID:</span> 2387-F-BT-XV</div>
            <div><span className="font-bold">Division:</span> Formica</div>
            <div><span className="font-bold">Clearance Level:</span> 3</div>
            <div className="text-[12px] text-[#555]">Dr.JasmineThorne@NECFormica.com</div>
          </div>
        </div>
      )}
    </div>
  );
}
