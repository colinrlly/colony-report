"use client";

import { cn } from "@/lib/utils";

type IconType = "folder" | "notebook" | "badge" | "camera" | "video-camera" | "lock";

interface DesktopIconProps {
  label: string;
  icon?: IconType;
  onClick?: () => void;
}

function FolderIcon() {
  return (
    <svg
      width="80"
      height="80"
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
  );
}

function NotebookIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      {/* Black outline */}
      <rect x="6" y="3" width="1" height="1" fill="#000" />
      <rect x="7" y="2" width="18" height="1" fill="#000" />
      <rect x="25" y="3" width="1" height="1" fill="#000" />
      <rect x="26" y="4" width="1" height="24" fill="#000" />
      <rect x="25" y="28" width="1" height="1" fill="#000" />
      <rect x="7" y="29" width="18" height="1" fill="#000" />
      <rect x="6" y="28" width="1" height="1" fill="#000" />
      <rect x="5" y="4" width="1" height="24" fill="#000" />

      {/* Notebook cover - brown/tan */}
      <rect x="7" y="3" width="18" height="1" fill="#A08060" />
      <rect x="6" y="4" width="19" height="24" fill="#8B7355" />
      <rect x="7" y="28" width="18" height="1" fill="#6B5340" />

      {/* Highlight on left edge */}
      <rect x="6" y="4" width="1" height="23" fill="#A08060" />

      {/* Shadow on right edge */}
      <rect x="25" y="5" width="1" height="23" fill="#6B5340" />

      {/* Spiral binding holes - left side */}
      <rect x="8" y="6" width="2" height="2" fill="#333" />
      <rect x="8" y="10" width="2" height="2" fill="#333" />
      <rect x="8" y="14" width="2" height="2" fill="#333" />
      <rect x="8" y="18" width="2" height="2" fill="#333" />
      <rect x="8" y="22" width="2" height="2" fill="#333" />

      {/* Spiral rings */}
      <rect x="4" y="6" width="4" height="1" fill="#888" />
      <rect x="4" y="8" width="4" height="1" fill="#888" />
      <rect x="4" y="10" width="4" height="1" fill="#888" />
      <rect x="4" y="12" width="4" height="1" fill="#888" />
      <rect x="4" y="14" width="4" height="1" fill="#888" />
      <rect x="4" y="16" width="4" height="1" fill="#888" />
      <rect x="4" y="18" width="4" height="1" fill="#888" />
      <rect x="4" y="20" width="4" height="1" fill="#888" />
      <rect x="4" y="22" width="4" height="1" fill="#888" />
      <rect x="4" y="24" width="4" height="1" fill="#888" />

      {/* Paper edge visible */}
      <rect x="11" y="5" width="13" height="1" fill="#FFF" />
      <rect x="11" y="6" width="13" height="19" fill="#F8F8F0" />
      <rect x="24" y="6" width="1" height="19" fill="#E0E0D0" />
      <rect x="11" y="25" width="13" height="1" fill="#D8D8C8" />

      {/* Lines on paper */}
      <rect x="12" y="9" width="11" height="1" fill="#C0C0B0" />
      <rect x="12" y="12" width="11" height="1" fill="#C0C0B0" />
      <rect x="12" y="15" width="11" height="1" fill="#C0C0B0" />
      <rect x="12" y="18" width="11" height="1" fill="#C0C0B0" />
      <rect x="12" y="21" width="11" height="1" fill="#C0C0B0" />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      {/* Black outline - outer edge */}
      <rect x="4" y="3" width="1" height="1" fill="#000" />
      <rect x="5" y="2" width="22" height="1" fill="#000" />
      <rect x="27" y="3" width="1" height="1" fill="#000" />
      <rect x="28" y="4" width="1" height="26" fill="#000" />
      <rect x="27" y="30" width="1" height="1" fill="#000" />
      <rect x="5" y="31" width="22" height="1" fill="#000" />
      <rect x="4" y="30" width="1" height="1" fill="#000" />
      <rect x="3" y="4" width="1" height="26" fill="#000" />

      {/* Clipboard outline - orange */}
      <rect x="5" y="4" width="1" height="1" fill="#8B4513" />
      <rect x="6" y="3" width="20" height="1" fill="#8B4513" />
      <rect x="26" y="4" width="1" height="1" fill="#8B4513" />
      <rect x="27" y="5" width="1" height="24" fill="#8B4513" />
      <rect x="26" y="29" width="1" height="1" fill="#8B4513" />
      <rect x="6" y="30" width="20" height="1" fill="#8B4513" />
      <rect x="5" y="29" width="1" height="1" fill="#8B4513" />
      <rect x="4" y="5" width="1" height="24" fill="#8B4513" />

      {/* Clipboard body - cream/light orange */}
      <rect x="6" y="4" width="20" height="1" fill="#FFF8E8" />
      <rect x="5" y="5" width="22" height="24" fill="#FFF5E0" />
      <rect x="6" y="29" width="20" height="1" fill="#F0E0C0" />

      {/* Left highlight */}
      <rect x="5" y="5" width="1" height="23" fill="#FFFAF0" />

      {/* Right/bottom shadow */}
      <rect x="26" y="6" width="1" height="23" fill="#E8D8C0" />

      {/* Clip at top */}
      <rect x="12" y="1" width="8" height="1" fill="#D2691E" />
      <rect x="11" y="2" width="10" height="3" fill="#D2691E" />
      <rect x="12" y="2" width="8" height="1" fill="#E07830" />
      <rect x="11" y="2" width="1" height="2" fill="#E07830" />

      {/* Person profile area - light background */}
      <rect x="10" y="7" width="12" height="10" fill="#FFF8F0" />
      <rect x="10" y="7" width="12" height="1" fill="#FFFCF8" />

      {/* Person head */}
      <rect x="14" y="8" width="4" height="1" fill="#6b5040" />
      <rect x="13" y="9" width="6" height="1" fill="#6b5040" />
      <rect x="14" y="9" width="4" height="1" fill="#e8c8a0" />
      <rect x="13" y="10" width="6" height="2" fill="#e8c8a0" />
      <rect x="14" y="12" width="4" height="1" fill="#e8c8a0" />

      {/* Person body - orange shirt */}
      <rect x="12" y="13" width="8" height="1" fill="#E07020" />
      <rect x="11" y="14" width="10" height="3" fill="#E07020" />
      <rect x="15" y="13" width="2" height="1" fill="#F08030" />
      <rect x="14" y="14" width="4" height="1" fill="#F08030" />

      {/* Checkboxes on left */}
      <rect x="7" y="19" width="3" height="3" fill="#F0A050" />
      <rect x="8" y="20" width="1" height="1" fill="#FFF8F0" />
      <rect x="7" y="24" width="3" height="3" fill="#F0A050" />
      <rect x="8" y="25" width="1" height="1" fill="#FFF8F0" />

      {/* Text lines on right */}
      <rect x="12" y="19" width="12" height="1" fill="#8B4513" />
      <rect x="12" y="21" width="10" height="1" fill="#8B4513" />
      <rect x="12" y="24" width="12" height="1" fill="#8B4513" />
      <rect x="12" y="26" width="8" height="1" fill="#8B4513" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      {/* Black outline - outer edge with grip protrusion on right */}
      <rect x="3" y="5" width="20" height="1" fill="#000" />
      <rect x="23" y="3" width="6" height="1" fill="#000" />
      <rect x="22" y="4" width="1" height="1" fill="#000" />
      <rect x="29" y="4" width="1" height="1" fill="#000" />
      <rect x="30" y="5" width="1" height="22" fill="#000" />
      <rect x="2" y="6" width="1" height="1" fill="#000" />
      <rect x="1" y="7" width="1" height="20" fill="#000" />
      <rect x="2" y="27" width="1" height="1" fill="#000" />
      <rect x="29" y="27" width="1" height="1" fill="#000" />
      <rect x="3" y="28" width="26" height="1" fill="#000" />

      {/* Camera body - tan/beige retro color */}
      <rect x="3" y="6" width="26" height="1" fill="#D4B896" />
      <rect x="2" y="7" width="28" height="20" fill="#C4A876" />
      <rect x="3" y="27" width="26" height="1" fill="#A48856" />

      {/* Grip protrusion fill */}
      <rect x="23" y="4" width="6" height="1" fill="#D4B896" />
      <rect x="23" y="5" width="6" height="1" fill="#C4A876" />

      {/* Top highlight */}
      <rect x="3" y="6" width="19" height="1" fill="#E4C8A6" />
      <rect x="23" y="4" width="5" height="1" fill="#E4C8A6" />
      <rect x="2" y="7" width="1" height="19" fill="#D4B896" />

      {/* Right/bottom shadow */}
      <rect x="29" y="6" width="1" height="21" fill="#A48856" />

      {/* Shutter button on grip */}
      <rect x="24" y="5" width="4" height="2" fill="#404040" />
      <rect x="25" y="5" width="2" height="1" fill="#606060" />

      {/* Viewfinder - small rectangle on top left */}
      <rect x="5" y="7" width="6" height="4" fill="#000" />
      <rect x="6" y="8" width="4" height="2" fill="#404040" />
      <rect x="6" y="8" width="2" height="1" fill="#606060" />

      {/* Flash unit - under grip protrusion */}
      <rect x="24" y="8" width="4" height="3" fill="#E8E8E8" />
      <rect x="25" y="9" width="2" height="1" fill="#F8F8F8" />

      {/* Lens outer ring - black outline */}
      <rect x="11" y="12" width="10" height="1" fill="#000" />
      <rect x="10" y="13" width="1" height="1" fill="#000" />
      <rect x="21" y="13" width="1" height="1" fill="#000" />
      <rect x="9" y="14" width="1" height="8" fill="#000" />
      <rect x="22" y="14" width="1" height="8" fill="#000" />
      <rect x="10" y="22" width="1" height="1" fill="#000" />
      <rect x="21" y="22" width="1" height="1" fill="#000" />
      <rect x="11" y="23" width="10" height="1" fill="#000" />

      {/* Lens - silver ring */}
      <rect x="11" y="13" width="10" height="1" fill="#D0D0D0" />
      <rect x="10" y="14" width="1" height="8" fill="#C0C0C0" />
      <rect x="21" y="14" width="1" height="8" fill="#909090" />
      <rect x="11" y="22" width="10" height="1" fill="#909090" />

      {/* Lens - glass area */}
      <rect x="11" y="14" width="10" height="8" fill="#1a3a6e" />
      <rect x="12" y="15" width="8" height="6" fill="#0d2654" />

      {/* Lens inner darker ring */}
      <rect x="13" y="16" width="6" height="1" fill="#061530" />
      <rect x="12" y="17" width="1" height="3" fill="#061530" />
      <rect x="19" y="17" width="1" height="3" fill="#061530" />
      <rect x="13" y="20" width="6" height="1" fill="#061530" />

      {/* Lens reflections */}
      <rect x="13" y="17" width="3" height="2" fill="#2060B0" />
      <rect x="14" y="17" width="2" height="1" fill="#4090E0" />
      <rect x="17" y="19" width="2" height="1" fill="#3070C0" />
      <rect x="14" y="17" width="1" height="1" fill="#80B0F0" />

      {/* Brand stripe - bottom decorative element */}
      <rect x="4" y="25" width="24" height="1" fill="#8B4513" />
    </svg>
  );
}

function VideoCameraIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      {/* Rounded square outline - black */}
      <rect x="6" y="4" width="20" height="1" fill="#000" />
      <rect x="4" y="5" width="2" height="1" fill="#000" />
      <rect x="26" y="5" width="2" height="1" fill="#000" />
      <rect x="3" y="6" width="1" height="2" fill="#000" />
      <rect x="28" y="6" width="1" height="2" fill="#000" />
      <rect x="2" y="8" width="1" height="16" fill="#000" />
      <rect x="29" y="8" width="1" height="16" fill="#000" />
      <rect x="3" y="24" width="1" height="2" fill="#000" />
      <rect x="28" y="24" width="1" height="2" fill="#000" />
      <rect x="4" y="26" width="2" height="1" fill="#000" />
      <rect x="26" y="26" width="2" height="1" fill="#000" />
      <rect x="6" y="27" width="20" height="1" fill="#000" />

      {/* Rounded square fill - orange base */}
      <rect x="6" y="5" width="20" height="1" fill="#FF7020" />
      <rect x="4" y="6" width="24" height="2" fill="#FF7020" />
      <rect x="3" y="8" width="26" height="16" fill="#FF7020" />
      <rect x="4" y="24" width="24" height="2" fill="#FF7020" />
      <rect x="6" y="26" width="20" height="1" fill="#FF7020" />

      {/* Highlight - lighter orange on top/left */}
      <rect x="6" y="5" width="18" height="1" fill="#FF9040" />
      <rect x="4" y="6" width="20" height="1" fill="#FF9040" />
      <rect x="3" y="7" width="18" height="1" fill="#FF9040" />
      <rect x="3" y="8" width="2" height="10" fill="#FF9040" />

      {/* Shadow - darker orange on bottom/right */}
      <rect x="27" y="16" width="1" height="8" fill="#D05010" />
      <rect x="24" y="24" width="4" height="1" fill="#D05010" />
      <rect x="20" y="25" width="8" height="1" fill="#D05010" />
      <rect x="10" y="26" width="16" height="1" fill="#D05010" />

      {/* Play triangle outline - black */}
      <rect x="11" y="10" width="1" height="12" fill="#000" />
      <rect x="12" y="9" width="1" height="1" fill="#000" />
      <rect x="12" y="22" width="1" height="1" fill="#000" />
      <rect x="13" y="10" width="1" height="1" fill="#000" />
      <rect x="13" y="21" width="1" height="1" fill="#000" />
      <rect x="14" y="11" width="1" height="1" fill="#000" />
      <rect x="14" y="20" width="1" height="1" fill="#000" />
      <rect x="15" y="12" width="1" height="1" fill="#000" />
      <rect x="15" y="19" width="1" height="1" fill="#000" />
      <rect x="16" y="13" width="1" height="1" fill="#000" />
      <rect x="16" y="18" width="1" height="1" fill="#000" />
      <rect x="17" y="14" width="1" height="1" fill="#000" />
      <rect x="17" y="17" width="1" height="1" fill="#000" />
      <rect x="18" y="15" width="1" height="2" fill="#000" />
      <rect x="19" y="15" width="1" height="2" fill="#000" />

      {/* Play triangle fill - beige */}
      <rect x="12" y="10" width="1" height="12" fill="#F5E6D3" />
      <rect x="13" y="11" width="1" height="10" fill="#F5E6D3" />
      <rect x="14" y="12" width="1" height="8" fill="#F5E6D3" />
      <rect x="15" y="13" width="1" height="6" fill="#F5E6D3" />
      <rect x="16" y="14" width="1" height="4" fill="#F5E6D3" />
      <rect x="17" y="15" width="1" height="2" fill="#F5E6D3" />

      {/* Play triangle highlight - lighter beige */}
      <rect x="12" y="10" width="1" height="5" fill="#FFF8F0" />
      <rect x="13" y="11" width="1" height="4" fill="#FFF8F0" />
      <rect x="14" y="12" width="1" height="3" fill="#FFF8F0" />

      {/* Play triangle shadow - darker beige */}
      <rect x="12" y="20" width="1" height="2" fill="#E0D0B8" />
      <rect x="13" y="19" width="1" height="2" fill="#E0D0B8" />
      <rect x="14" y="18" width="1" height="2" fill="#E0D0B8" />
      <rect x="15" y="17" width="1" height="2" fill="#E0D0B8" />
      <rect x="16" y="16" width="1" height="2" fill="#E0D0B8" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      {/* Lock shackle outline - black */}
      <rect x="10" y="4" width="1" height="1" fill="#000" />
      <rect x="11" y="3" width="10" height="1" fill="#000" />
      <rect x="21" y="4" width="1" height="1" fill="#000" />
      <rect x="22" y="5" width="1" height="9" fill="#000" />
      <rect x="9" y="5" width="1" height="9" fill="#000" />

      {/* Shackle fill - silver/gray */}
      <rect x="10" y="4" width="1" height="10" fill="#C0C0C0" />
      <rect x="11" y="3" width="10" height="1" fill="#D8D8D8" />
      <rect x="11" y="4" width="10" height="1" fill="#E8E8E8" />
      <rect x="21" y="4" width="1" height="10" fill="#909090" />

      {/* Inner shackle cutout */}
      <rect x="12" y="6" width="8" height="1" fill="#6b6359" />
      <rect x="12" y="7" width="8" height="6" fill="#6b6359" />
      <rect x="11" y="7" width="1" height="6" fill="#A0A0A0" />
      <rect x="20" y="7" width="1" height="6" fill="#707070" />

      {/* Lock body outline - black */}
      <rect x="6" y="13" width="1" height="1" fill="#000" />
      <rect x="7" y="12" width="18" height="1" fill="#000" />
      <rect x="25" y="13" width="1" height="1" fill="#000" />
      <rect x="26" y="14" width="1" height="14" fill="#000" />
      <rect x="25" y="28" width="1" height="1" fill="#000" />
      <rect x="7" y="29" width="18" height="1" fill="#000" />
      <rect x="6" y="28" width="1" height="1" fill="#000" />
      <rect x="5" y="14" width="1" height="14" fill="#000" />

      {/* Lock body - gold/brass fill */}
      <rect x="7" y="13" width="18" height="1" fill="#E8C850" />
      <rect x="6" y="14" width="20" height="14" fill="#D4A840" />
      <rect x="7" y="28" width="18" height="1" fill="#B08020" />

      {/* Lock body highlight - top/left */}
      <rect x="7" y="13" width="17" height="1" fill="#F0D868" />
      <rect x="6" y="14" width="1" height="13" fill="#E8C850" />

      {/* Lock body shadow - bottom/right */}
      <rect x="25" y="15" width="1" height="13" fill="#B08020" />

      {/* Keyhole - black circle and slot */}
      <rect x="14" y="18" width="4" height="1" fill="#000" />
      <rect x="13" y="19" width="6" height="1" fill="#000" />
      <rect x="13" y="20" width="6" height="1" fill="#000" />
      <rect x="14" y="21" width="4" height="1" fill="#000" />
      <rect x="15" y="22" width="2" height="4" fill="#000" />

      {/* Keyhole inner highlight */}
      <rect x="14" y="19" width="2" height="1" fill="#404040" />
      <rect x="14" y="20" width="1" height="1" fill="#303030" />
    </svg>
  );
}

export function DesktopIcon({ label, icon = "folder", onClick }: DesktopIconProps) {
  const renderIcon = () => {
    switch (icon) {
      case "notebook":
        return <NotebookIcon />;
      case "badge":
        return <BadgeIcon />;
      case "camera":
        return <CameraIcon />;
      case "video-camera":
        return <VideoCameraIcon />;
      case "lock":
        return <LockIcon />;
      case "folder":
      default:
        return <FolderIcon />;
    }
  };

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
      {renderIcon()}
      <span className="text-[14px] text-center leading-tight max-w-[100px] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
        {label}
      </span>
    </button>
  );
}
