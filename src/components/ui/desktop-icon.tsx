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
      {/* Pixel art folder icon */}
      <svg
        width="96"
        height="96"
        viewBox="0 0 32 32"
        shapeRendering="crispEdges"
      >
        {/* Black outline - bottom and right */}
        <rect x="2" y="28" width="28" height="1" fill="#000" />
        <rect x="29" y="12" width="1" height="16" fill="#000" />
        <rect x="28" y="11" width="1" height="1" fill="#000" />

        {/* Black outline - left side */}
        <rect x="2" y="8" width="1" height="20" fill="#000" />
        <rect x="3" y="7" width="1" height="1" fill="#000" />

        {/* Black outline - folder tab */}
        <rect x="4" y="6" width="1" height="1" fill="#000" />
        <rect x="5" y="5" width="1" height="1" fill="#000" />
        <rect x="6" y="4" width="6" height="1" fill="#000" />
        <rect x="12" y="5" width="1" height="1" fill="#000" />
        <rect x="13" y="6" width="1" height="1" fill="#000" />
        <rect x="14" y="7" width="14" height="1" fill="#000" />
        <rect x="28" y="8" width="1" height="3" fill="#000" />

        {/* Orange folder tab */}
        <rect x="5" y="6" width="1" height="1" fill="#E8A030" />
        <rect x="6" y="5" width="6" height="1" fill="#E8A030" />
        <rect x="6" y="6" width="7" height="1" fill="#E8A030" />
        <rect x="4" y="7" width="10" height="1" fill="#E8A030" />
        <rect x="3" y="8" width="11" height="2" fill="#E8A030" />

        {/* Dark orange shadow on tab */}
        <rect x="12" y="6" width="1" height="1" fill="#D89020" />
        <rect x="13" y="7" width="1" height="1" fill="#D89020" />
        <rect x="14" y="8" width="1" height="2" fill="#D89020" />

        {/* White paper/documents visible */}
        <rect x="15" y="8" width="12" height="1" fill="#FFF" />
        <rect x="15" y="9" width="12" height="1" fill="#E8E8E8" />
        <rect x="27" y="8" width="1" height="2" fill="#C0C0C0" />

        {/* Yellow folder body - main fill */}
        <rect x="3" y="10" width="25" height="17" fill="#F0C030" />

        {/* Yellow highlight on top edge */}
        <rect x="3" y="10" width="24" height="1" fill="#F8D850" />
        <rect x="3" y="11" width="1" height="16" fill="#F8D850" />

        {/* Darker yellow shadow */}
        <rect x="4" y="26" width="24" height="1" fill="#D8A820" />
        <rect x="27" y="11" width="1" height="15" fill="#D8A820" />
        <rect x="28" y="11" width="1" height="16" fill="#C89810" />

        {/* Bottom shadow */}
        <rect x="3" y="27" width="25" height="1" fill="#B08010" />
      </svg>
      <span className="text-[14px] text-center leading-tight max-w-[100px] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
        {label}
      </span>
    </button>
  );
}
