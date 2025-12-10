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
      width="96"
      height="96"
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      {/* Camera body outline - black */}
      <rect x="3" y="11" width="1" height="1" fill="#000" />
      <rect x="4" y="10" width="5" height="1" fill="#000" />
      <rect x="9" y="9" width="1" height="1" fill="#000" />
      <rect x="10" y="8" width="4" height="1" fill="#000" />
      <rect x="14" y="9" width="1" height="1" fill="#000" />
      <rect x="15" y="10" width="13" height="1" fill="#000" />
      <rect x="28" y="11" width="1" height="1" fill="#000" />
      <rect x="29" y="12" width="1" height="12" fill="#000" />
      <rect x="28" y="24" width="1" height="1" fill="#000" />
      <rect x="4" y="25" width="24" height="1" fill="#000" />
      <rect x="3" y="24" width="1" height="1" fill="#000" />
      <rect x="2" y="12" width="1" height="12" fill="#000" />

      {/* Viewfinder top - black outline */}
      <rect x="11" y="6" width="1" height="1" fill="#000" />
      <rect x="12" y="5" width="3" height="1" fill="#000" />
      <rect x="15" y="6" width="1" height="1" fill="#000" />
      <rect x="16" y="7" width="1" height="1" fill="#000" />
      <rect x="10" y="7" width="1" height="1" fill="#000" />

      {/* Viewfinder top - fill */}
      <rect x="11" y="7" width="5" height="1" fill="#909090" />
      <rect x="12" y="6" width="3" height="1" fill="#A0A0A0" />

      {/* Shutter button on top */}
      <rect x="20" y="8" width="4" height="2" fill="#404040" />
      <rect x="21" y="7" width="2" height="1" fill="#505050" />

      {/* Camera body - silver/gray with 3D effect */}
      <rect x="4" y="11" width="24" height="1" fill="#D0D0D0" />
      <rect x="3" y="12" width="26" height="12" fill="#B0B0B0" />
      <rect x="4" y="24" width="24" height="1" fill="#808080" />

      {/* Top highlight - white */}
      <rect x="4" y="11" width="23" height="1" fill="#E8E8E8" />
      <rect x="3" y="12" width="1" height="11" fill="#D0D0D0" />

      {/* Right and bottom shadow */}
      <rect x="28" y="13" width="1" height="11" fill="#808080" />

      {/* Top panel with detail */}
      <rect x="9" y="9" width="6" height="1" fill="#C0C0C0" />
      <rect x="9" y="10" width="6" height="1" fill="#A0A0A0" />

      {/* Grip texture on left side */}
      <rect x="4" y="13" width="3" height="10" fill="#606060" />
      <rect x="5" y="14" width="1" height="1" fill="#404040" />
      <rect x="5" y="16" width="1" height="1" fill="#404040" />
      <rect x="5" y="18" width="1" height="1" fill="#404040" />
      <rect x="5" y="20" width="1" height="1" fill="#404040" />

      {/* Lens outer ring - black outline */}
      <rect x="12" y="12" width="8" height="1" fill="#000" />
      <rect x="11" y="13" width="1" height="1" fill="#000" />
      <rect x="20" y="13" width="1" height="1" fill="#000" />
      <rect x="10" y="14" width="1" height="6" fill="#000" />
      <rect x="21" y="14" width="1" height="6" fill="#000" />
      <rect x="11" y="20" width="1" height="1" fill="#000" />
      <rect x="20" y="20" width="1" height="1" fill="#000" />
      <rect x="12" y="21" width="8" height="1" fill="#000" />

      {/* Lens - chrome ring outer */}
      <rect x="12" y="13" width="8" height="1" fill="#E0E0E0" />
      <rect x="11" y="14" width="1" height="6" fill="#D0D0D0" />
      <rect x="20" y="14" width="1" height="6" fill="#909090" />
      <rect x="12" y="20" width="8" height="1" fill="#909090" />

      {/* Lens - chrome ring inner */}
      <rect x="12" y="14" width="8" height="1" fill="#C0C0C0" />
      <rect x="12" y="19" width="8" height="1" fill="#808080" />

      {/* Lens - glass area */}
      <rect x="13" y="14" width="6" height="1" fill="#1a3a6e" />
      <rect x="12" y="15" width="8" height="4" fill="#0d2654" />
      <rect x="13" y="19" width="6" height="1" fill="#061530" />

      {/* Lens reflections - bright spots */}
      <rect x="13" y="15" width="3" height="2" fill="#2060B0" />
      <rect x="14" y="15" width="2" height="1" fill="#4090E0" />
      <rect x="17" y="17" width="2" height="1" fill="#3070C0" />

      {/* Small white highlight dots */}
      <rect x="14" y="15" width="1" height="1" fill="#80B0F0" />

      {/* Mode dial on top right */}
      <rect x="24" y="11" width="3" height="2" fill="#505050" />
      <rect x="25" y="11" width="1" height="1" fill="#707070" />

      {/* White flash/AF assist */}
      <rect x="9" y="13" width="1" height="2" fill="#F0F0F0" />
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
      {/* Clapperboard - hinged top part (angled) */}
      {/* Black outline for top clapper */}
      <rect x="4" y="4" width="1" height="1" fill="#000" />
      <rect x="5" y="3" width="1" height="1" fill="#000" />
      <rect x="6" y="2" width="20" height="1" fill="#000" />
      <rect x="26" y="3" width="1" height="1" fill="#000" />
      <rect x="27" y="4" width="1" height="5" fill="#000" />
      <rect x="4" y="5" width="1" height="4" fill="#000" />
      <rect x="5" y="9" width="22" height="1" fill="#000" />

      {/* Top clapper fill - dark base */}
      <rect x="5" y="4" width="22" height="5" fill="#1a1a1a" />
      <rect x="6" y="3" width="20" height="1" fill="#2a2a2a" />

      {/* Diagonal stripes on top clapper - orange */}
      <rect x="7" y="4" width="3" height="4" fill="#E07020" />
      <rect x="6" y="5" width="1" height="3" fill="#E07020" />
      <rect x="13" y="4" width="3" height="4" fill="#E07020" />
      <rect x="12" y="5" width="1" height="3" fill="#E07020" />
      <rect x="19" y="4" width="3" height="4" fill="#E07020" />
      <rect x="18" y="5" width="1" height="3" fill="#E07020" />
      <rect x="25" y="4" width="1" height="4" fill="#E07020" />
      <rect x="24" y="5" width="1" height="3" fill="#E07020" />

      {/* Stripe highlights */}
      <rect x="7" y="4" width="2" height="1" fill="#F08030" />
      <rect x="13" y="4" width="2" height="1" fill="#F08030" />
      <rect x="19" y="4" width="2" height="1" fill="#F08030" />

      {/* Main board body outline */}
      <rect x="3" y="10" width="1" height="1" fill="#000" />
      <rect x="4" y="9" width="24" height="1" fill="#000" />
      <rect x="28" y="10" width="1" height="1" fill="#000" />
      <rect x="29" y="11" width="1" height="16" fill="#000" />
      <rect x="28" y="27" width="1" height="1" fill="#000" />
      <rect x="4" y="28" width="24" height="1" fill="#000" />
      <rect x="3" y="27" width="1" height="1" fill="#000" />
      <rect x="2" y="11" width="1" height="16" fill="#000" />

      {/* Main board fill - green with dimension */}
      <rect x="4" y="10" width="24" height="1" fill="#5cb85c" />
      <rect x="3" y="11" width="26" height="16" fill="#4cae4c" />
      <rect x="4" y="27" width="24" height="1" fill="#3d8b3d" />

      {/* Left edge highlight */}
      <rect x="3" y="11" width="1" height="15" fill="#6ec86e" />
      <rect x="4" y="10" width="23" height="1" fill="#7ed07e" />

      {/* Right/bottom shadow */}
      <rect x="28" y="12" width="1" height="15" fill="#3d8b3d" />

      {/* Play button - triangle outline */}
      <rect x="12" y="14" width="1" height="8" fill="#000" />
      <rect x="13" y="13" width="1" height="1" fill="#000" />
      <rect x="13" y="22" width="1" height="1" fill="#000" />
      <rect x="14" y="14" width="1" height="1" fill="#000" />
      <rect x="14" y="21" width="1" height="1" fill="#000" />
      <rect x="15" y="15" width="1" height="1" fill="#000" />
      <rect x="15" y="20" width="1" height="1" fill="#000" />
      <rect x="16" y="16" width="1" height="1" fill="#000" />
      <rect x="16" y="19" width="1" height="1" fill="#000" />
      <rect x="17" y="17" width="1" height="2" fill="#000" />
      <rect x="18" y="18" width="1" height="1" fill="#000" />

      {/* Play button - white fill */}
      <rect x="13" y="14" width="1" height="8" fill="#FFF" />
      <rect x="14" y="15" width="1" height="6" fill="#FFF" />
      <rect x="15" y="16" width="1" height="4" fill="#FFF" />
      <rect x="16" y="17" width="1" height="2" fill="#FFF" />

      {/* Play button highlights */}
      <rect x="13" y="14" width="1" height="3" fill="#F8F8F8" />

      {/* Hinge detail at connection */}
      <rect x="5" y="9" width="3" height="1" fill="#404040" />
      <rect x="24" y="9" width="3" height="1" fill="#404040" />

      {/* Board details - small text lines */}
      <rect x="20" y="15" width="6" height="1" fill="#3d8b3d" />
      <rect x="20" y="17" width="5" height="1" fill="#3d8b3d" />
      <rect x="20" y="19" width="6" height="1" fill="#3d8b3d" />
      <rect x="20" y="21" width="4" height="1" fill="#3d8b3d" />
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
