"use client";

import { cn } from "@/lib/utils";

type IconType = "folder" | "notebook" | "badge" | "camera" | "video-camera";

interface DesktopIconProps {
  label: string;
  icon?: IconType;
  color?: string;
  onClick?: () => void;
}

function FolderIcon() {
  return (
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
  );
}

function NotebookIcon() {
  return (
    <svg
      width="96"
      height="96"
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
      width="96"
      height="96"
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      {/* Lanyard */}
      <rect x="15" y="1" width="2" height="5" fill="#2060A0" />
      <rect x="14" y="2" width="1" height="3" fill="#3080C0" />
      <rect x="17" y="2" width="1" height="3" fill="#1850A0" />

      {/* Badge clip */}
      <rect x="13" y="5" width="6" height="2" fill="#888" />
      <rect x="13" y="5" width="6" height="1" fill="#AAA" />

      {/* Badge outline */}
      <rect x="7" y="7" width="1" height="1" fill="#000" />
      <rect x="8" y="6" width="16" height="1" fill="#000" />
      <rect x="24" y="7" width="1" height="1" fill="#000" />
      <rect x="25" y="8" width="1" height="20" fill="#000" />
      <rect x="24" y="28" width="1" height="1" fill="#000" />
      <rect x="8" y="29" width="16" height="1" fill="#000" />
      <rect x="7" y="28" width="1" height="1" fill="#000" />
      <rect x="6" y="8" width="1" height="20" fill="#000" />

      {/* Badge body - white */}
      <rect x="8" y="7" width="16" height="1" fill="#FFF" />
      <rect x="7" y="8" width="18" height="20" fill="#F8F8F8" />
      <rect x="8" y="28" width="16" height="1" fill="#E0E0E0" />

      {/* Left highlight */}
      <rect x="7" y="8" width="1" height="19" fill="#FFF" />

      {/* Right shadow */}
      <rect x="24" y="9" width="1" height="19" fill="#D0D0D0" />

      {/* Photo area - blue background */}
      <rect x="10" y="10" width="12" height="10" fill="#4080C0" />
      <rect x="10" y="10" width="12" height="1" fill="#5090D0" />
      <rect x="10" y="11" width="1" height="8" fill="#5090D0" />
      <rect x="21" y="11" width="1" height="9" fill="#3070B0" />
      <rect x="10" y="19" width="12" height="1" fill="#3070B0" />

      {/* Person silhouette */}
      <rect x="14" y="11" width="4" height="1" fill="#E8D8C0" />
      <rect x="13" y="12" width="6" height="3" fill="#E8D8C0" />
      <rect x="14" y="15" width="4" height="1" fill="#E8D8C0" />
      <rect x="12" y="16" width="8" height="3" fill="#606060" />

      {/* Text lines */}
      <rect x="9" y="22" width="14" height="2" fill="#333" />
      <rect x="11" y="25" width="10" height="1" fill="#666" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      {/* Camera body outline */}
      <rect x="3" y="10" width="1" height="1" fill="#000" />
      <rect x="4" y="9" width="4" height="1" fill="#000" />
      <rect x="8" y="8" width="1" height="1" fill="#000" />
      <rect x="9" y="7" width="6" height="1" fill="#000" />
      <rect x="15" y="8" width="1" height="1" fill="#000" />
      <rect x="16" y="9" width="12" height="1" fill="#000" />
      <rect x="28" y="10" width="1" height="1" fill="#000" />
      <rect x="29" y="11" width="1" height="14" fill="#000" />
      <rect x="28" y="25" width="1" height="1" fill="#000" />
      <rect x="4" y="26" width="24" height="1" fill="#000" />
      <rect x="3" y="25" width="1" height="1" fill="#000" />
      <rect x="2" y="11" width="1" height="14" fill="#000" />

      {/* Camera body - dark gray */}
      <rect x="4" y="10" width="24" height="1" fill="#505050" />
      <rect x="3" y="11" width="26" height="14" fill="#404040" />
      <rect x="4" y="25" width="24" height="1" fill="#303030" />

      {/* Top highlight */}
      <rect x="4" y="10" width="23" height="1" fill="#606060" />
      <rect x="3" y="11" width="1" height="13" fill="#505050" />

      {/* Right/bottom shadow */}
      <rect x="28" y="12" width="1" height="13" fill="#303030" />

      {/* Viewfinder bump */}
      <rect x="9" y="8" width="6" height="1" fill="#505050" />
      <rect x="8" y="9" width="8" height="1" fill="#404040" />

      {/* Flash */}
      <rect x="5" y="12" width="4" height="3" fill="#F0E8D0" />
      <rect x="5" y="12" width="4" height="1" fill="#FFF" />
      <rect x="5" y="13" width="1" height="1" fill="#FFF" />

      {/* Lens - outer ring */}
      <rect x="13" y="12" width="8" height="1" fill="#000" />
      <rect x="12" y="13" width="1" height="1" fill="#000" />
      <rect x="21" y="13" width="1" height="1" fill="#000" />
      <rect x="11" y="14" width="1" height="4" fill="#000" />
      <rect x="22" y="14" width="1" height="4" fill="#000" />
      <rect x="12" y="18" width="1" height="1" fill="#000" />
      <rect x="21" y="18" width="1" height="1" fill="#000" />
      <rect x="13" y="19" width="8" height="1" fill="#000" />

      {/* Lens - silver ring */}
      <rect x="13" y="13" width="8" height="1" fill="#A0A0A0" />
      <rect x="12" y="14" width="1" height="4" fill="#A0A0A0" />
      <rect x="21" y="14" width="1" height="4" fill="#808080" />
      <rect x="13" y="18" width="8" height="1" fill="#808080" />

      {/* Lens - glass */}
      <rect x="14" y="14" width="6" height="1" fill="#2040A0" />
      <rect x="13" y="15" width="8" height="2" fill="#1830A0" />
      <rect x="14" y="17" width="6" height="1" fill="#102080" />

      {/* Lens highlight */}
      <rect x="14" y="14" width="2" height="1" fill="#4080E0" />
      <rect x="13" y="15" width="2" height="1" fill="#3060C0" />

      {/* Shutter button */}
      <rect x="23" y="11" width="3" height="2" fill="#C04040" />
      <rect x="23" y="11" width="3" height="1" fill="#E05050" />
    </svg>
  );
}

function VideoCameraIcon() {
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      {/* Camera body outline */}
      <rect x="2" y="10" width="1" height="1" fill="#000" />
      <rect x="3" y="9" width="16" height="1" fill="#000" />
      <rect x="19" y="10" width="1" height="1" fill="#000" />
      <rect x="20" y="11" width="1" height="12" fill="#000" />
      <rect x="19" y="23" width="1" height="1" fill="#000" />
      <rect x="3" y="24" width="16" height="1" fill="#000" />
      <rect x="2" y="23" width="1" height="1" fill="#000" />
      <rect x="1" y="11" width="1" height="12" fill="#000" />

      {/* Camera body - dark gray */}
      <rect x="3" y="10" width="16" height="1" fill="#505050" />
      <rect x="2" y="11" width="18" height="12" fill="#404040" />
      <rect x="3" y="23" width="16" height="1" fill="#303030" />

      {/* Top highlight */}
      <rect x="3" y="10" width="15" height="1" fill="#606060" />
      <rect x="2" y="11" width="1" height="11" fill="#505050" />

      {/* Right shadow */}
      <rect x="19" y="12" width="1" height="11" fill="#303030" />

      {/* Lens */}
      <rect x="5" y="12" width="6" height="1" fill="#000" />
      <rect x="4" y="13" width="1" height="6" fill="#000" />
      <rect x="11" y="13" width="1" height="6" fill="#000" />
      <rect x="5" y="19" width="6" height="1" fill="#000" />

      <rect x="5" y="13" width="6" height="1" fill="#606080" />
      <rect x="5" y="14" width="6" height="4" fill="#2040A0" />
      <rect x="5" y="18" width="6" height="1" fill="#102080" />

      {/* Lens highlight */}
      <rect x="5" y="14" width="2" height="2" fill="#4080E0" />

      {/* Viewfinder */}
      <rect x="14" y="11" width="4" height="4" fill="#222" />
      <rect x="15" y="12" width="2" height="2" fill="#3060C0" />

      {/* Record button */}
      <rect x="14" y="17" width="4" height="4" fill="#333" />
      <rect x="15" y="18" width="2" height="2" fill="#E02020" />

      {/* Side grip/tape area outline */}
      <rect x="21" y="12" width="8" height="1" fill="#000" />
      <rect x="29" y="13" width="1" height="8" fill="#000" />
      <rect x="21" y="21" width="8" height="1" fill="#000" />
      <rect x="20" y="13" width="1" height="8" fill="#000" />

      {/* Side extension - tape deck style */}
      <rect x="21" y="13" width="8" height="8" fill="#505050" />
      <rect x="21" y="13" width="7" height="1" fill="#606060" />
      <rect x="21" y="14" width="1" height="6" fill="#606060" />
      <rect x="28" y="14" width="1" height="7" fill="#404040" />
      <rect x="21" y="20" width="8" height="1" fill="#404040" />

      {/* Tape reels */}
      <rect x="22" y="15" width="3" height="3" fill="#222" />
      <rect x="26" y="15" width="2" height="3" fill="#222" />
      <rect x="23" y="16" width="1" height="1" fill="#888" />
      <rect x="26" y="16" width="1" height="1" fill="#888" />
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
