"use client";

export type SidebarIconType =
  | "bee"
  | "snail"
  | "ladybug"
  | "hand"
  | "apricot"
  | "cactus"
  | "dandelion"
  | "frog";

export function BeeIcon() {
  return (
    <img
      src="/bee icon.png"
      alt="Bee"
      width="42"
      height="42"
      style={{ imageRendering: "pixelated", objectFit: "contain" }}
    />
  );
}

export function SnailIcon() {
  return (
    <img
      src="/snail-icon.png"
      alt="Snail"
      width="42"
      height="42"
      style={{ imageRendering: "pixelated", objectFit: "contain" }}
    />
  );
}

export function LadybugIcon() {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      {/* Head - black */}
      <rect x="13" y="4" width="6" height="1" fill="#000" />
      <rect x="12" y="5" width="8" height="1" fill="#222" />
      <rect x="11" y="6" width="10" height="2" fill="#222" />
      <rect x="12" y="8" width="8" height="1" fill="#222" />

      {/* Antennae */}
      <rect x="12" y="2" width="1" height="2" fill="#222" />
      <rect x="11" y="1" width="1" height="1" fill="#222" />
      <rect x="19" y="2" width="1" height="2" fill="#222" />
      <rect x="20" y="1" width="1" height="1" fill="#222" />

      {/* Body outline - black */}
      <rect x="10" y="9" width="12" height="1" fill="#000" />
      <rect x="8" y="10" width="2" height="1" fill="#000" />
      <rect x="22" y="10" width="2" height="1" fill="#000" />
      <rect x="6" y="11" width="2" height="1" fill="#000" />
      <rect x="24" y="11" width="2" height="1" fill="#000" />
      <rect x="5" y="12" width="1" height="2" fill="#000" />
      <rect x="26" y="12" width="1" height="2" fill="#000" />
      <rect x="4" y="14" width="1" height="6" fill="#000" />
      <rect x="27" y="14" width="1" height="6" fill="#000" />
      <rect x="5" y="20" width="1" height="2" fill="#000" />
      <rect x="26" y="20" width="1" height="2" fill="#000" />
      <rect x="6" y="22" width="2" height="1" fill="#000" />
      <rect x="24" y="22" width="2" height="1" fill="#000" />
      <rect x="8" y="23" width="2" height="1" fill="#000" />
      <rect x="22" y="23" width="2" height="1" fill="#000" />
      <rect x="10" y="24" width="12" height="1" fill="#000" />

      {/* Body - red */}
      <rect x="10" y="10" width="12" height="1" fill="#e53935" />
      <rect x="8" y="11" width="16" height="1" fill="#e53935" />
      <rect x="6" y="12" width="20" height="2" fill="#e53935" />
      <rect x="5" y="14" width="22" height="6" fill="#e53935" />
      <rect x="6" y="20" width="20" height="2" fill="#e53935" />
      <rect x="8" y="22" width="16" height="1" fill="#e53935" />
      <rect x="10" y="23" width="12" height="1" fill="#e53935" />

      {/* Center line - black */}
      <rect x="15" y="10" width="2" height="14" fill="#222" />

      {/* Spots - black */}
      {/* Left side spots */}
      <rect x="8" y="13" width="3" height="3" fill="#222" />
      <rect x="10" y="17" width="3" height="3" fill="#222" />
      <rect x="7" y="19" width="2" height="2" fill="#222" />

      {/* Right side spots */}
      <rect x="21" y="13" width="3" height="3" fill="#222" />
      <rect x="19" y="17" width="3" height="3" fill="#222" />
      <rect x="23" y="19" width="2" height="2" fill="#222" />

      {/* Body highlight */}
      <rect x="10" y="11" width="4" height="1" fill="#ef5350" />
      <rect x="8" y="12" width="5" height="1" fill="#ef5350" />
      <rect x="6" y="13" width="2" height="2" fill="#ef5350" />

      {/* Eyes on head */}
      <rect x="13" y="6" width="2" height="1" fill="#fff" />
      <rect x="17" y="6" width="2" height="1" fill="#fff" />
    </svg>
  );
}

export function HandIcon() {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      {/* Outline - brown */}
      {/* Finger 1 (extra pinky) outline */}
      <rect x="4" y="5" width="1" height="1" fill="#5d4037" />
      <rect x="5" y="4" width="2" height="1" fill="#5d4037" />
      <rect x="7" y="5" width="1" height="9" fill="#5d4037" />

      {/* Finger 2 outline */}
      <rect x="8" y="3" width="1" height="1" fill="#5d4037" />
      <rect x="9" y="2" width="2" height="1" fill="#5d4037" />
      <rect x="11" y="3" width="1" height="11" fill="#5d4037" />

      {/* Finger 3 outline */}
      <rect x="12" y="1" width="1" height="1" fill="#5d4037" />
      <rect x="13" y="0" width="2" height="1" fill="#5d4037" />
      <rect x="15" y="1" width="1" height="13" fill="#5d4037" />

      {/* Finger 4 outline */}
      <rect x="16" y="1" width="1" height="1" fill="#5d4037" />
      <rect x="17" y="0" width="2" height="1" fill="#5d4037" />
      <rect x="19" y="1" width="1" height="13" fill="#5d4037" />

      {/* Finger 5 outline */}
      <rect x="20" y="2" width="1" height="1" fill="#5d4037" />
      <rect x="21" y="1" width="2" height="1" fill="#5d4037" />
      <rect x="23" y="2" width="1" height="12" fill="#5d4037" />

      {/* Finger 6 outline */}
      <rect x="24" y="4" width="1" height="1" fill="#5d4037" />
      <rect x="25" y="3" width="2" height="1" fill="#5d4037" />
      <rect x="27" y="4" width="1" height="10" fill="#5d4037" />

      {/* Palm outline */}
      <rect x="4" y="6" width="1" height="8" fill="#5d4037" />
      <rect x="5" y="14" width="1" height="5" fill="#5d4037" />
      <rect x="6" y="19" width="1" height="4" fill="#5d4037" />
      <rect x="7" y="23" width="19" height="1" fill="#5d4037" />
      <rect x="26" y="14" width="1" height="9" fill="#5d4037" />

      {/* Thumb outline */}
      <rect x="3" y="14" width="1" height="1" fill="#5d4037" />
      <rect x="2" y="15" width="1" height="4" fill="#5d4037" />
      <rect x="3" y="19" width="3" height="1" fill="#5d4037" />

      {/* Finger fills - skin tone */}
      {/* Finger 1 */}
      <rect x="5" y="5" width="2" height="9" fill="#e8c8a0" />
      <rect x="5" y="4" width="2" height="1" fill="#f0d8b8" />

      {/* Finger 2 */}
      <rect x="8" y="3" width="3" height="11" fill="#e8c8a0" />
      <rect x="9" y="2" width="2" height="1" fill="#f0d8b8" />

      {/* Finger 3 */}
      <rect x="12" y="1" width="3" height="13" fill="#e8c8a0" />
      <rect x="13" y="0" width="2" height="1" fill="#f0d8b8" />

      {/* Finger 4 */}
      <rect x="16" y="1" width="3" height="13" fill="#e8c8a0" />
      <rect x="17" y="0" width="2" height="1" fill="#f0d8b8" />

      {/* Finger 5 */}
      <rect x="20" y="2" width="3" height="12" fill="#e8c8a0" />
      <rect x="21" y="1" width="2" height="1" fill="#f0d8b8" />

      {/* Finger 6 */}
      <rect x="24" y="4" width="3" height="10" fill="#e8c8a0" />
      <rect x="25" y="3" width="2" height="1" fill="#f0d8b8" />

      {/* Palm fill */}
      <rect x="5" y="14" width="21" height="9" fill="#e8c8a0" />

      {/* Thumb fill */}
      <rect x="3" y="15" width="2" height="4" fill="#e8c8a0" />
      <rect x="3" y="14" width="1" height="1" fill="#f0d8b8" />

      {/* Palm highlight */}
      <rect x="8" y="15" width="10" height="3" fill="#f0d8b8" />

      {/* Finger separation lines */}
      <rect x="7" y="9" width="1" height="5" fill="#d4a574" />
      <rect x="11" y="8" width="1" height="6" fill="#d4a574" />
      <rect x="15" y="8" width="1" height="6" fill="#d4a574" />
      <rect x="19" y="8" width="1" height="6" fill="#d4a574" />
      <rect x="23" y="9" width="1" height="5" fill="#d4a574" />

      {/* Palm lines */}
      <rect x="9" y="18" width="8" height="1" fill="#d4a574" />
      <rect x="11" y="20" width="6" height="1" fill="#d4a574" />
    </svg>
  );
}

export function ApricotIcon() {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      {/* Stem */}
      <rect x="15" y="2" width="2" height="1" fill="#5d4037" />
      <rect x="16" y="3" width="1" height="2" fill="#6d4c41" />
      <rect x="15" y="4" width="1" height="1" fill="#6d4c41" />

      {/* Leaf */}
      <rect x="18" y="3" width="3" height="1" fill="#4caf50" />
      <rect x="17" y="4" width="5" height="1" fill="#66bb6a" />
      <rect x="18" y="5" width="4" height="1" fill="#4caf50" />
      <rect x="19" y="6" width="2" height="1" fill="#388e3c" />

      {/* Apricot outline */}
      <rect x="11" y="6" width="10" height="1" fill="#000" />
      <rect x="9" y="7" width="2" height="1" fill="#000" />
      <rect x="21" y="7" width="2" height="1" fill="#000" />
      <rect x="7" y="8" width="2" height="1" fill="#000" />
      <rect x="23" y="8" width="2" height="1" fill="#000" />
      <rect x="6" y="9" width="1" height="2" fill="#000" />
      <rect x="25" y="9" width="1" height="2" fill="#000" />
      <rect x="5" y="11" width="1" height="8" fill="#000" />
      <rect x="26" y="11" width="1" height="8" fill="#000" />
      <rect x="6" y="19" width="1" height="2" fill="#000" />
      <rect x="25" y="19" width="1" height="2" fill="#000" />
      <rect x="7" y="21" width="2" height="1" fill="#000" />
      <rect x="23" y="21" width="2" height="1" fill="#000" />
      <rect x="9" y="22" width="2" height="1" fill="#000" />
      <rect x="21" y="22" width="2" height="1" fill="#000" />
      <rect x="11" y="23" width="10" height="1" fill="#000" />

      {/* Apricot body - orange */}
      <rect x="11" y="7" width="10" height="1" fill="#ffb74d" />
      <rect x="9" y="8" width="14" height="1" fill="#ffb74d" />
      <rect x="7" y="9" width="18" height="2" fill="#ffb74d" />
      <rect x="6" y="11" width="20" height="8" fill="#ffa726" />
      <rect x="7" y="19" width="18" height="2" fill="#ffa726" />
      <rect x="9" y="21" width="14" height="1" fill="#fb8c00" />
      <rect x="11" y="22" width="10" height="1" fill="#f57c00" />

      {/* Crease/indent on right side */}
      <rect x="17" y="8" width="1" height="1" fill="#ef6c00" />
      <rect x="18" y="9" width="1" height="3" fill="#ef6c00" />
      <rect x="17" y="12" width="1" height="4" fill="#ef6c00" />
      <rect x="18" y="16" width="1" height="3" fill="#ef6c00" />
      <rect x="17" y="19" width="1" height="2" fill="#ef6c00" />

      {/* Highlight - lighter orange */}
      <rect x="9" y="9" width="5" height="2" fill="#ffcc80" />
      <rect x="8" y="11" width="4" height="3" fill="#ffcc80" />
      <rect x="9" y="14" width="2" height="2" fill="#ffcc80" />

      {/* Blush - reddish tint */}
      <rect x="20" y="13" width="4" height="3" fill="#ff8a65" />
      <rect x="21" y="16" width="3" height="2" fill="#ff8a65" />
    </svg>
  );
}

export function CactusIcon() {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      {/* Pot outline */}
      <rect x="9" y="24" width="14" height="1" fill="#000" />
      <rect x="8" y="25" width="1" height="1" fill="#000" />
      <rect x="23" y="25" width="1" height="1" fill="#000" />
      <rect x="7" y="26" width="1" height="4" fill="#000" />
      <rect x="24" y="26" width="1" height="4" fill="#000" />
      <rect x="8" y="30" width="16" height="1" fill="#000" />

      {/* Pot fill - terracotta */}
      <rect x="9" y="25" width="14" height="1" fill="#d84315" />
      <rect x="8" y="26" width="16" height="4" fill="#bf360c" />

      {/* Pot rim highlight */}
      <rect x="9" y="25" width="13" height="1" fill="#e64a19" />
      <rect x="8" y="26" width="1" height="3" fill="#e64a19" />

      {/* Pot shadow */}
      <rect x="23" y="27" width="1" height="3" fill="#8d2408" />

      {/* Main cactus body outline */}
      <rect x="13" y="8" width="6" height="1" fill="#000" />
      <rect x="12" y="9" width="1" height="1" fill="#000" />
      <rect x="19" y="9" width="1" height="1" fill="#000" />
      <rect x="11" y="10" width="1" height="14" fill="#000" />
      <rect x="20" y="10" width="1" height="14" fill="#000" />

      {/* Main cactus body - green */}
      <rect x="13" y="9" width="6" height="1" fill="#66bb6a" />
      <rect x="12" y="10" width="8" height="14" fill="#4caf50" />

      {/* Left arm outline */}
      <rect x="5" y="12" width="1" height="1" fill="#000" />
      <rect x="4" y="13" width="1" height="5" fill="#000" />
      <rect x="5" y="18" width="1" height="1" fill="#000" />
      <rect x="6" y="19" width="5" height="1" fill="#000" />
      <rect x="6" y="11" width="5" height="1" fill="#000" />
      <rect x="10" y="12" width="1" height="7" fill="#000" />

      {/* Left arm fill */}
      <rect x="5" y="13" width="5" height="5" fill="#4caf50" />
      <rect x="6" y="12" width="4" height="1" fill="#66bb6a" />
      <rect x="6" y="18" width="4" height="1" fill="#388e3c" />

      {/* Right arm outline */}
      <rect x="26" y="14" width="1" height="1" fill="#000" />
      <rect x="27" y="15" width="1" height="4" fill="#000" />
      <rect x="26" y="19" width="1" height="1" fill="#000" />
      <rect x="21" y="20" width="5" height="1" fill="#000" />
      <rect x="21" y="13" width="5" height="1" fill="#000" />
      <rect x="21" y="14" width="1" height="6" fill="#000" />

      {/* Right arm fill */}
      <rect x="22" y="14" width="4" height="6" fill="#4caf50" />
      <rect x="22" y="14" width="4" height="1" fill="#66bb6a" />
      <rect x="26" y="15" width="1" height="4" fill="#388e3c" />

      {/* Highlight on main body */}
      <rect x="13" y="10" width="2" height="10" fill="#66bb6a" />
      <rect x="13" y="9" width="3" height="1" fill="#81c784" />

      {/* Shadow on main body */}
      <rect x="18" y="11" width="2" height="12" fill="#388e3c" />

      {/* Spines */}
      <rect x="10" y="12" width="1" height="1" fill="#a5d6a7" />
      <rect x="10" y="16" width="1" height="1" fill="#a5d6a7" />
      <rect x="10" y="20" width="1" height="1" fill="#a5d6a7" />
      <rect x="21" y="14" width="1" height="1" fill="#a5d6a7" />
      <rect x="21" y="18" width="1" height="1" fill="#a5d6a7" />
      <rect x="21" y="22" width="1" height="1" fill="#a5d6a7" />
      <rect x="14" y="8" width="1" height="1" fill="#a5d6a7" />
      <rect x="17" y="8" width="1" height="1" fill="#a5d6a7" />

      {/* Flower on top */}
      <rect x="15" y="5" width="2" height="1" fill="#f48fb1" />
      <rect x="14" y="6" width="4" height="1" fill="#ec407a" />
      <rect x="15" y="7" width="2" height="1" fill="#f48fb1" />
      <rect x="15" y="6" width="2" height="1" fill="#fce4ec" />
    </svg>
  );
}

export function DandelionIcon() {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      {/* Stem */}
      <rect x="15" y="17" width="2" height="11" fill="#558b2f" />
      <rect x="14" y="19" width="1" height="1" fill="#689f38" />
      <rect x="17" y="22" width="1" height="1" fill="#689f38" />

      {/* Left leaf - serrated */}
      <rect x="7" y="22" width="2" height="1" fill="#2e7d32" />
      <rect x="8" y="21" width="2" height="1" fill="#388e3c" />
      <rect x="9" y="20" width="2" height="1" fill="#43a047" />
      <rect x="10" y="21" width="2" height="1" fill="#388e3c" />
      <rect x="11" y="22" width="3" height="1" fill="#2e7d32" />
      <rect x="12" y="23" width="2" height="1" fill="#1b5e20" />
      <rect x="10" y="24" width="4" height="1" fill="#2e7d32" />
      <rect x="8" y="23" width="3" height="1" fill="#388e3c" />

      {/* Right leaf - serrated */}
      <rect x="18" y="23" width="3" height="1" fill="#2e7d32" />
      <rect x="20" y="22" width="2" height="1" fill="#388e3c" />
      <rect x="21" y="21" width="2" height="1" fill="#43a047" />
      <rect x="22" y="22" width="2" height="1" fill="#388e3c" />
      <rect x="23" y="23" width="2" height="1" fill="#2e7d32" />

      {/* Puffball base - cream/white fluffy sphere */}
      {/* Center core */}
      <rect x="13" y="8" width="6" height="6" fill="#f5f5dc" />
      <rect x="12" y="9" width="1" height="4" fill="#f5f5dc" />
      <rect x="19" y="9" width="1" height="4" fill="#f5f5dc" />
      <rect x="14" y="7" width="4" height="1" fill="#f5f5dc" />
      <rect x="14" y="14" width="4" height="1" fill="#f5f5dc" />

      {/* Fluffy wisps - top */}
      <rect x="15" y="2" width="2" height="1" fill="#fafafa" />
      <rect x="14" y="3" width="4" height="1" fill="#f5f5dc" />
      <rect x="13" y="4" width="6" height="1" fill="#fffde7" />
      <rect x="12" y="5" width="8" height="1" fill="#f5f5dc" />
      <rect x="11" y="6" width="10" height="1" fill="#fafafa" />
      <rect x="12" y="7" width="8" height="1" fill="#f5f5dc" />

      {/* Fluffy wisps - bottom */}
      <rect x="12" y="14" width="8" height="1" fill="#f5f5dc" />
      <rect x="11" y="15" width="10" height="1" fill="#fffde7" />
      <rect x="13" y="16" width="6" height="1" fill="#f5f5dc" />

      {/* Fluffy wisps - left */}
      <rect x="7" y="9" width="1" height="4" fill="#fafafa" />
      <rect x="8" y="8" width="1" height="6" fill="#f5f5dc" />
      <rect x="9" y="7" width="1" height="8" fill="#fffde7" />
      <rect x="10" y="8" width="1" height="6" fill="#f5f5dc" />
      <rect x="11" y="8" width="1" height="6" fill="#fafafa" />

      {/* Fluffy wisps - right */}
      <rect x="24" y="9" width="1" height="4" fill="#fafafa" />
      <rect x="23" y="8" width="1" height="6" fill="#f5f5dc" />
      <rect x="22" y="7" width="1" height="8" fill="#fffde7" />
      <rect x="21" y="8" width="1" height="6" fill="#f5f5dc" />
      <rect x="20" y="8" width="1" height="6" fill="#fafafa" />

      {/* Diagonal wisps */}
      <rect x="9" y="5" width="2" height="2" fill="#fafafa" />
      <rect x="21" y="5" width="2" height="2" fill="#fafafa" />
      <rect x="9" y="14" width="2" height="2" fill="#fffde7" />
      <rect x="21" y="14" width="2" height="2" fill="#fffde7" />

      {/* Center details - slightly darker/greenish */}
      <rect x="14" y="9" width="4" height="4" fill="#e8e8d0" />
      <rect x="15" y="10" width="2" height="2" fill="#d4d4bc" />

      {/* Highlight spots */}
      <rect x="13" y="6" width="1" height="1" fill="#ffffff" />
      <rect x="18" y="5" width="1" height="1" fill="#ffffff" />
      <rect x="10" y="10" width="1" height="1" fill="#ffffff" />
      <rect x="21" y="11" width="1" height="1" fill="#ffffff" />
    </svg>
  );
}

export function FrogIcon() {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      {/* Eye area - left */}
      <rect x="5" y="4" width="1" height="1" fill="#2e7d32" />
      <rect x="6" y="3" width="4" height="1" fill="#2e7d32" />
      <rect x="10" y="4" width="1" height="1" fill="#2e7d32" />
      <rect x="4" y="5" width="1" height="2" fill="#2e7d32" />
      <rect x="11" y="5" width="1" height="2" fill="#2e7d32" />
      <rect x="5" y="5" width="6" height="3" fill="#4caf50" />

      {/* Eye area - right */}
      <rect x="21" y="4" width="1" height="1" fill="#2e7d32" />
      <rect x="22" y="3" width="4" height="1" fill="#2e7d32" />
      <rect x="26" y="4" width="1" height="1" fill="#2e7d32" />
      <rect x="20" y="5" width="1" height="2" fill="#2e7d32" />
      <rect x="27" y="5" width="1" height="2" fill="#2e7d32" />
      <rect x="21" y="5" width="6" height="3" fill="#4caf50" />

      {/* Eyes - yellowish with black pupil */}
      <rect x="6" y="4" width="4" height="3" fill="#c5e1a5" />
      <rect x="22" y="4" width="4" height="3" fill="#c5e1a5" />
      <rect x="7" y="5" width="2" height="2" fill="#1b5e20" />
      <rect x="23" y="5" width="2" height="2" fill="#1b5e20" />

      {/* Head/face area */}
      <rect x="5" y="7" width="1" height="1" fill="#2e7d32" />
      <rect x="26" y="7" width="1" height="1" fill="#2e7d32" />
      <rect x="4" y="8" width="1" height="3" fill="#2e7d32" />
      <rect x="27" y="8" width="1" height="3" fill="#2e7d32" />
      <rect x="6" y="8" width="20" height="4" fill="#4caf50" />
      <rect x="5" y="8" width="1" height="3" fill="#66bb6a" />

      {/* Head highlight */}
      <rect x="12" y="8" width="8" height="1" fill="#66bb6a" />
      <rect x="11" y="9" width="10" height="1" fill="#81c784" />

      {/* Face center stripe */}
      <rect x="15" y="8" width="2" height="3" fill="#388e3c" />

      {/* Body - wide */}
      <rect x="3" y="11" width="1" height="1" fill="#2e7d32" />
      <rect x="28" y="11" width="1" height="1" fill="#2e7d32" />
      <rect x="2" y="12" width="1" height="5" fill="#2e7d32" />
      <rect x="29" y="12" width="1" height="5" fill="#2e7d32" />
      <rect x="3" y="12" width="26" height="6" fill="#4caf50" />
      <rect x="4" y="11" width="24" height="1" fill="#4caf50" />

      {/* Body highlight - lighter green */}
      <rect x="4" y="12" width="4" height="3" fill="#66bb6a" />
      <rect x="24" y="12" width="4" height="3" fill="#66bb6a" />
      <rect x="8" y="12" width="16" height="2" fill="#81c784" />

      {/* Yellow belly */}
      <rect x="10" y="14" width="12" height="4" fill="#fdd835" />
      <rect x="11" y="13" width="10" height="1" fill="#ffeb3b" />
      <rect x="9" y="15" width="1" height="2" fill="#fbc02d" />
      <rect x="22" y="15" width="1" height="2" fill="#fbc02d" />

      {/* Belly highlight */}
      <rect x="12" y="14" width="8" height="2" fill="#ffee58" />

      {/* Body shadow bottom */}
      <rect x="3" y="17" width="1" height="1" fill="#2e7d32" />
      <rect x="28" y="17" width="1" height="1" fill="#2e7d32" />
      <rect x="4" y="18" width="24" height="1" fill="#388e3c" />
      <rect x="6" y="19" width="20" height="1" fill="#2e7d32" />

      {/* Front legs/feet - left */}
      <rect x="2" y="17" width="2" height="1" fill="#4caf50" />
      <rect x="1" y="18" width="3" height="2" fill="#4caf50" />
      <rect x="0" y="20" width="4" height="1" fill="#2e7d32" />
      <rect x="1" y="19" width="1" height="1" fill="#66bb6a" />

      {/* Front legs/feet - right */}
      <rect x="28" y="17" width="2" height="1" fill="#4caf50" />
      <rect x="28" y="18" width="3" height="2" fill="#4caf50" />
      <rect x="28" y="20" width="4" height="1" fill="#2e7d32" />
      <rect x="30" y="19" width="1" height="1" fill="#66bb6a" />

      {/* Back legs - left */}
      <rect x="4" y="19" width="3" height="3" fill="#4caf50" />
      <rect x="3" y="20" width="1" height="3" fill="#388e3c" />
      <rect x="4" y="22" width="5" height="2" fill="#4caf50" />
      <rect x="3" y="23" width="1" height="2" fill="#2e7d32" />
      <rect x="4" y="24" width="6" height="1" fill="#388e3c" />

      {/* Back legs - right */}
      <rect x="25" y="19" width="3" height="3" fill="#4caf50" />
      <rect x="28" y="20" width="1" height="3" fill="#388e3c" />
      <rect x="23" y="22" width="5" height="2" fill="#4caf50" />
      <rect x="28" y="23" width="1" height="2" fill="#2e7d32" />
      <rect x="22" y="24" width="6" height="1" fill="#388e3c" />
    </svg>
  );
}

export function SidebarIcon({ icon }: { icon: SidebarIconType }) {
  switch (icon) {
    case "bee":
      return <BeeIcon />;
    case "snail":
      return <SnailIcon />;
    case "ladybug":
      return <LadybugIcon />;
    case "hand":
      return <HandIcon />;
    case "apricot":
      return <ApricotIcon />;
    case "cactus":
      return <CactusIcon />;
    case "dandelion":
      return <DandelionIcon />;
    case "frog":
      return <FrogIcon />;
    default:
      return <BeeIcon />;
  }
}
