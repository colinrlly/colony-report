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
    <svg
      width="42"
      height="42"
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      {/* Wings - translucent blue-white */}
      <rect x="6" y="8" width="4" height="1" fill="#b0d4f1" />
      <rect x="5" y="9" width="6" height="3" fill="#c8e4ff" />
      <rect x="6" y="12" width="4" height="1" fill="#b0d4f1" />
      <rect x="22" y="8" width="4" height="1" fill="#b0d4f1" />
      <rect x="21" y="9" width="6" height="3" fill="#c8e4ff" />
      <rect x="22" y="12" width="4" height="1" fill="#b0d4f1" />

      {/* Body outline - black */}
      <rect x="10" y="7" width="12" height="1" fill="#000" />
      <rect x="8" y="8" width="2" height="1" fill="#000" />
      <rect x="22" y="8" width="2" height="1" fill="#000" />
      <rect x="7" y="9" width="1" height="3" fill="#000" />
      <rect x="24" y="9" width="1" height="3" fill="#000" />
      <rect x="8" y="12" width="2" height="1" fill="#000" />
      <rect x="22" y="12" width="2" height="1" fill="#000" />

      {/* Head - black */}
      <rect x="10" y="8" width="12" height="1" fill="#222" />
      <rect x="8" y="9" width="16" height="3" fill="#222" />
      <rect x="10" y="12" width="12" height="1" fill="#222" />

      {/* Eyes - white with black pupil */}
      <rect x="10" y="9" width="3" height="2" fill="#fff" />
      <rect x="19" y="9" width="3" height="2" fill="#fff" />
      <rect x="11" y="10" width="1" height="1" fill="#000" />
      <rect x="20" y="10" width="1" height="1" fill="#000" />

      {/* Antennae */}
      <rect x="11" y="5" width="1" height="2" fill="#222" />
      <rect x="10" y="4" width="1" height="1" fill="#222" />
      <rect x="20" y="5" width="1" height="2" fill="#222" />
      <rect x="21" y="4" width="1" height="1" fill="#222" />

      {/* Body stripes - yellow and black alternating */}
      {/* Yellow stripe 1 */}
      <rect x="9" y="13" width="14" height="3" fill="#f5d000" />
      <rect x="8" y="14" width="1" height="2" fill="#f5d000" />
      <rect x="23" y="14" width="1" height="2" fill="#f5d000" />

      {/* Black stripe 1 */}
      <rect x="9" y="16" width="14" height="2" fill="#222" />
      <rect x="8" y="16" width="1" height="2" fill="#222" />
      <rect x="23" y="16" width="1" height="2" fill="#222" />

      {/* Yellow stripe 2 */}
      <rect x="10" y="18" width="12" height="2" fill="#f5d000" />
      <rect x="9" y="18" width="1" height="2" fill="#f5d000" />
      <rect x="22" y="18" width="1" height="2" fill="#f5d000" />

      {/* Black stripe 2 */}
      <rect x="11" y="20" width="10" height="2" fill="#222" />
      <rect x="10" y="20" width="1" height="1" fill="#222" />
      <rect x="21" y="20" width="1" height="1" fill="#222" />

      {/* Yellow stripe 3 (tail) */}
      <rect x="12" y="22" width="8" height="2" fill="#f5d000" />

      {/* Stinger */}
      <rect x="14" y="24" width="4" height="1" fill="#222" />
      <rect x="15" y="25" width="2" height="1" fill="#222" />
      <rect x="15" y="26" width="2" height="1" fill="#333" />
    </svg>
  );
}

export function SnailIcon() {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
    >
      {/* Shell outline */}
      <rect x="12" y="5" width="8" height="1" fill="#000" />
      <rect x="10" y="6" width="2" height="1" fill="#000" />
      <rect x="20" y="6" width="2" height="1" fill="#000" />
      <rect x="9" y="7" width="1" height="2" fill="#000" />
      <rect x="22" y="7" width="1" height="3" fill="#000" />
      <rect x="8" y="9" width="1" height="4" fill="#000" />
      <rect x="23" y="10" width="1" height="4" fill="#000" />
      <rect x="9" y="13" width="1" height="2" fill="#000" />
      <rect x="22" y="14" width="1" height="2" fill="#000" />
      <rect x="10" y="15" width="2" height="1" fill="#000" />
      <rect x="20" y="16" width="2" height="1" fill="#000" />
      <rect x="12" y="16" width="8" height="1" fill="#000" />

      {/* Shell - pink spiral */}
      <rect x="12" y="6" width="8" height="1" fill="#ffb6c1" />
      <rect x="10" y="7" width="12" height="2" fill="#ffb6c1" />
      <rect x="9" y="9" width="14" height="4" fill="#ffb6c1" />
      <rect x="10" y="13" width="12" height="2" fill="#ffb6c1" />
      <rect x="12" y="15" width="8" height="1" fill="#ffb6c1" />

      {/* Shell spiral detail - darker pink */}
      <rect x="14" y="8" width="4" height="1" fill="#ff69b4" />
      <rect x="13" y="9" width="1" height="1" fill="#ff69b4" />
      <rect x="18" y="9" width="1" height="1" fill="#ff69b4" />
      <rect x="12" y="10" width="1" height="2" fill="#ff69b4" />
      <rect x="19" y="10" width="1" height="2" fill="#ff69b4" />
      <rect x="13" y="12" width="1" height="1" fill="#ff69b4" />
      <rect x="18" y="12" width="1" height="1" fill="#ff69b4" />
      <rect x="14" y="13" width="4" height="1" fill="#ff69b4" />

      {/* Inner spiral */}
      <rect x="15" y="10" width="2" height="2" fill="#ff1493" />

      {/* Shell highlight */}
      <rect x="11" y="8" width="2" height="1" fill="#ffc0cb" />
      <rect x="10" y="9" width="1" height="2" fill="#ffc0cb" />

      {/* Body - lighter pink */}
      <rect x="3" y="20" width="1" height="1" fill="#000" />
      <rect x="4" y="19" width="1" height="1" fill="#000" />
      <rect x="5" y="18" width="3" height="1" fill="#000" />
      <rect x="8" y="17" width="14" height="1" fill="#000" />
      <rect x="2" y="21" width="1" height="3" fill="#000" />
      <rect x="3" y="24" width="1" height="1" fill="#000" />
      <rect x="4" y="25" width="20" height="1" fill="#000" />
      <rect x="24" y="24" width="1" height="1" fill="#000" />
      <rect x="22" y="18" width="2" height="1" fill="#000" />
      <rect x="24" y="19" width="1" height="5" fill="#000" />

      {/* Body fill */}
      <rect x="4" y="20" width="2" height="1" fill="#ffb6c1" />
      <rect x="3" y="21" width="21" height="3" fill="#ffb6c1" />
      <rect x="4" y="24" width="20" height="1" fill="#ffb6c1" />
      <rect x="6" y="19" width="2" height="1" fill="#ffb6c1" />
      <rect x="8" y="18" width="14" height="1" fill="#ffb6c1" />
      <rect x="22" y="19" width="2" height="5" fill="#ffb6c1" />

      {/* Eye stalks */}
      <rect x="5" y="17" width="1" height="2" fill="#ffb6c1" />
      <rect x="5" y="15" width="1" height="2" fill="#ffb6c1" />
      <rect x="5" y="14" width="1" height="1" fill="#000" />
      <rect x="7" y="17" width="1" height="2" fill="#ffb6c1" />
      <rect x="7" y="15" width="1" height="2" fill="#ffb6c1" />
      <rect x="7" y="14" width="1" height="1" fill="#000" />

      {/* Body highlight */}
      <rect x="4" y="21" width="18" height="1" fill="#ffc0cb" />
    </svg>
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
      {/* Hand outline - dark */}
      <rect x="4" y="14" width="1" height="1" fill="#000" />
      <rect x="5" y="13" width="1" height="1" fill="#000" />
      <rect x="6" y="12" width="1" height="1" fill="#000" />
      <rect x="7" y="11" width="1" height="1" fill="#000" />
      <rect x="8" y="10" width="1" height="1" fill="#000" />
      <rect x="9" y="9" width="1" height="1" fill="#000" />
      <rect x="10" y="8" width="1" height="1" fill="#000" />
      <rect x="11" y="4" width="1" height="4" fill="#000" />
      <rect x="12" y="3" width="2" height="1" fill="#000" />
      <rect x="14" y="2" width="1" height="1" fill="#000" />
      <rect x="15" y="1" width="1" height="1" fill="#000" />
      <rect x="16" y="2" width="1" height="1" fill="#000" />
      <rect x="17" y="3" width="1" height="4" fill="#000" />
      <rect x="18" y="2" width="1" height="1" fill="#000" />
      <rect x="19" y="1" width="1" height="1" fill="#000" />
      <rect x="20" y="2" width="1" height="1" fill="#000" />
      <rect x="21" y="3" width="1" height="5" fill="#000" />
      <rect x="22" y="2" width="1" height="1" fill="#000" />
      <rect x="23" y="1" width="1" height="1" fill="#000" />
      <rect x="24" y="2" width="1" height="1" fill="#000" />
      <rect x="25" y="3" width="1" height="6" fill="#000" />
      <rect x="26" y="4" width="1" height="1" fill="#000" />
      <rect x="27" y="5" width="1" height="1" fill="#000" />
      <rect x="28" y="6" width="1" height="5" fill="#000" />
      <rect x="27" y="11" width="1" height="8" fill="#000" />
      <rect x="26" y="19" width="1" height="3" fill="#000" />
      <rect x="25" y="22" width="1" height="3" fill="#000" />
      <rect x="24" y="25" width="1" height="2" fill="#000" />
      <rect x="8" y="27" width="16" height="1" fill="#000" />
      <rect x="7" y="26" width="1" height="1" fill="#000" />
      <rect x="6" y="25" width="1" height="1" fill="#000" />
      <rect x="5" y="24" width="1" height="1" fill="#000" />
      <rect x="4" y="15" width="1" height="9" fill="#000" />

      {/* Finger 1 (pinky - extra!) */}
      <rect x="12" y="4" width="4" height="4" fill="#e8c8a0" />
      <rect x="13" y="3" width="2" height="1" fill="#e8c8a0" />
      <rect x="14" y="2" width="1" height="1" fill="#e8c8a0" />
      <rect x="15" y="2" width="1" height="1" fill="#e8c8a0" />

      {/* Finger 2 */}
      <rect x="16" y="3" width="1" height="5" fill="#e8c8a0" />
      <rect x="18" y="3" width="2" height="1" fill="#e8c8a0" />
      <rect x="19" y="2" width="1" height="1" fill="#e8c8a0" />

      {/* Finger 3 */}
      <rect x="20" y="3" width="1" height="6" fill="#e8c8a0" />
      <rect x="22" y="3" width="2" height="1" fill="#e8c8a0" />
      <rect x="23" y="2" width="1" height="1" fill="#e8c8a0" />

      {/* Finger 4 */}
      <rect x="24" y="3" width="1" height="7" fill="#e8c8a0" />
      <rect x="26" y="5" width="1" height="1" fill="#e8c8a0" />
      <rect x="27" y="6" width="1" height="4" fill="#e8c8a0" />

      {/* Finger 5 (ring finger area) - extra finger */}
      <rect x="18" y="4" width="2" height="5" fill="#e8c8a0" />

      {/* Finger 6 (index) */}
      <rect x="22" y="4" width="2" height="6" fill="#e8c8a0" />

      {/* Palm and hand body */}
      <rect x="5" y="14" width="22" height="5" fill="#e8c8a0" />
      <rect x="6" y="13" width="20" height="1" fill="#e8c8a0" />
      <rect x="7" y="12" width="19" height="1" fill="#e8c8a0" />
      <rect x="8" y="11" width="18" height="1" fill="#e8c8a0" />
      <rect x="9" y="10" width="17" height="1" fill="#e8c8a0" />
      <rect x="10" y="9" width="16" height="1" fill="#e8c8a0" />
      <rect x="11" y="8" width="15" height="1" fill="#e8c8a0" />
      <rect x="5" y="19" width="21" height="3" fill="#e8c8a0" />
      <rect x="6" y="22" width="19" height="3" fill="#e8c8a0" />
      <rect x="7" y="25" width="17" height="1" fill="#e8c8a0" />
      <rect x="8" y="26" width="16" height="1" fill="#e8c8a0" />

      {/* Thumb */}
      <rect x="5" y="15" width="1" height="8" fill="#e8c8a0" />
      <rect x="6" y="19" width="1" height="6" fill="#e8c8a0" />

      {/* Finger separation lines */}
      <rect x="16" y="8" width="1" height="2" fill="#d4a574" />
      <rect x="20" y="8" width="1" height="2" fill="#d4a574" />
      <rect x="24" y="9" width="1" height="2" fill="#d4a574" />

      {/* Palm lines */}
      <rect x="8" y="17" width="10" height="1" fill="#d4a574" />
      <rect x="10" y="20" width="8" height="1" fill="#d4a574" />

      {/* Highlight */}
      <rect x="12" y="5" width="2" height="2" fill="#f0d8b8" />
      <rect x="6" y="14" width="8" height="2" fill="#f0d8b8" />
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
      <rect x="15" y="18" width="2" height="10" fill="#558b2f" />
      <rect x="14" y="20" width="1" height="1" fill="#558b2f" />
      <rect x="17" y="23" width="1" height="1" fill="#558b2f" />

      {/* Leaf on stem */}
      <rect x="11" y="22" width="3" height="1" fill="#7cb342" />
      <rect x="10" y="23" width="4" height="1" fill="#689f38" />
      <rect x="11" y="24" width="3" height="1" fill="#558b2f" />

      {/* Flower center */}
      <rect x="14" y="8" width="4" height="4" fill="#fdd835" />
      <rect x="13" y="9" width="1" height="2" fill="#fdd835" />
      <rect x="18" y="9" width="1" height="2" fill="#fdd835" />
      <rect x="15" y="7" width="2" height="1" fill="#fdd835" />
      <rect x="15" y="12" width="2" height="1" fill="#fdd835" />

      {/* Center detail - darker yellow */}
      <rect x="15" y="9" width="2" height="2" fill="#f9a825" />

      {/* Petals - bright yellow */}
      {/* Top petals */}
      <rect x="14" y="3" width="4" height="1" fill="#ffee58" />
      <rect x="15" y="2" width="2" height="1" fill="#ffee58" />
      <rect x="13" y="4" width="6" height="1" fill="#ffee58" />
      <rect x="14" y="5" width="4" height="2" fill="#ffee58" />

      {/* Bottom petals */}
      <rect x="14" y="13" width="4" height="2" fill="#ffee58" />
      <rect x="13" y="15" width="6" height="1" fill="#ffee58" />
      <rect x="14" y="16" width="4" height="1" fill="#ffee58" />
      <rect x="15" y="17" width="2" height="1" fill="#ffee58" />

      {/* Left petals */}
      <rect x="7" y="9" width="1" height="2" fill="#ffee58" />
      <rect x="8" y="8" width="1" height="4" fill="#ffee58" />
      <rect x="9" y="7" width="2" height="6" fill="#ffee58" />
      <rect x="11" y="8" width="2" height="4" fill="#ffee58" />

      {/* Right petals */}
      <rect x="24" y="9" width="1" height="2" fill="#ffee58" />
      <rect x="23" y="8" width="1" height="4" fill="#ffee58" />
      <rect x="21" y="7" width="2" height="6" fill="#ffee58" />
      <rect x="19" y="8" width="2" height="4" fill="#ffee58" />

      {/* Diagonal petals - top left */}
      <rect x="9" y="4" width="2" height="2" fill="#ffee58" />
      <rect x="10" y="5" width="2" height="2" fill="#ffee58" />
      <rect x="11" y="6" width="2" height="2" fill="#ffee58" />

      {/* Diagonal petals - top right */}
      <rect x="21" y="4" width="2" height="2" fill="#ffee58" />
      <rect x="20" y="5" width="2" height="2" fill="#ffee58" />
      <rect x="19" y="6" width="2" height="2" fill="#ffee58" />

      {/* Diagonal petals - bottom left */}
      <rect x="9" y="14" width="2" height="2" fill="#ffee58" />
      <rect x="10" y="13" width="2" height="2" fill="#ffee58" />
      <rect x="11" y="12" width="2" height="2" fill="#ffee58" />

      {/* Diagonal petals - bottom right */}
      <rect x="21" y="14" width="2" height="2" fill="#ffee58" />
      <rect x="20" y="13" width="2" height="2" fill="#ffee58" />
      <rect x="19" y="12" width="2" height="2" fill="#ffee58" />

      {/* Petal highlights */}
      <rect x="15" y="3" width="1" height="1" fill="#fff59d" />
      <rect x="8" y="9" width="1" height="1" fill="#fff59d" />
      <rect x="10" y="5" width="1" height="1" fill="#fff59d" />
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
      {/* Head outline */}
      <rect x="8" y="6" width="16" height="1" fill="#000" />
      <rect x="6" y="7" width="2" height="1" fill="#000" />
      <rect x="24" y="7" width="2" height="1" fill="#000" />
      <rect x="5" y="8" width="1" height="3" fill="#000" />
      <rect x="26" y="8" width="1" height="3" fill="#000" />
      <rect x="4" y="11" width="1" height="6" fill="#000" />
      <rect x="27" y="11" width="1" height="6" fill="#000" />
      <rect x="5" y="17" width="1" height="2" fill="#000" />
      <rect x="26" y="17" width="1" height="2" fill="#000" />
      <rect x="6" y="19" width="2" height="1" fill="#000" />
      <rect x="24" y="19" width="2" height="1" fill="#000" />
      <rect x="8" y="20" width="16" height="1" fill="#000" />

      {/* Head fill - green */}
      <rect x="8" y="7" width="16" height="1" fill="#66bb6a" />
      <rect x="6" y="8" width="20" height="3" fill="#4caf50" />
      <rect x="5" y="11" width="22" height="6" fill="#4caf50" />
      <rect x="6" y="17" width="20" height="2" fill="#4caf50" />
      <rect x="8" y="19" width="16" height="1" fill="#388e3c" />

      {/* Eye bumps outline */}
      <rect x="7" y="3" width="4" height="1" fill="#000" />
      <rect x="21" y="3" width="4" height="1" fill="#000" />
      <rect x="6" y="4" width="1" height="2" fill="#000" />
      <rect x="11" y="4" width="1" height="2" fill="#000" />
      <rect x="20" y="4" width="1" height="2" fill="#000" />
      <rect x="25" y="4" width="1" height="2" fill="#000" />

      {/* Eye bumps fill */}
      <rect x="7" y="4" width="4" height="2" fill="#4caf50" />
      <rect x="21" y="4" width="4" height="2" fill="#4caf50" />

      {/* Eyes - white with black pupil */}
      <rect x="7" y="5" width="3" height="3" fill="#fff" />
      <rect x="22" y="5" width="3" height="3" fill="#fff" />
      <rect x="8" y="6" width="2" height="2" fill="#222" />
      <rect x="22" y="6" width="2" height="2" fill="#222" />
      <rect x="9" y="6" width="1" height="1" fill="#fff" />
      <rect x="23" y="6" width="1" height="1" fill="#fff" />

      {/* Nostrils */}
      <rect x="12" y="12" width="2" height="1" fill="#388e3c" />
      <rect x="18" y="12" width="2" height="1" fill="#388e3c" />

      {/* Mouth */}
      <rect x="10" y="16" width="12" height="1" fill="#388e3c" />
      <rect x="9" y="15" width="1" height="1" fill="#388e3c" />
      <rect x="22" y="15" width="1" height="1" fill="#388e3c" />

      {/* Body */}
      <rect x="8" y="21" width="16" height="1" fill="#4caf50" />
      <rect x="10" y="22" width="12" height="2" fill="#4caf50" />

      {/* Front legs */}
      <rect x="4" y="19" width="3" height="1" fill="#000" />
      <rect x="3" y="20" width="1" height="3" fill="#000" />
      <rect x="4" y="23" width="4" height="1" fill="#000" />
      <rect x="4" y="20" width="3" height="3" fill="#4caf50" />

      <rect x="25" y="19" width="3" height="1" fill="#000" />
      <rect x="28" y="20" width="1" height="3" fill="#000" />
      <rect x="24" y="23" width="4" height="1" fill="#000" />
      <rect x="25" y="20" width="3" height="3" fill="#4caf50" />

      {/* Back legs */}
      <rect x="6" y="24" width="1" height="4" fill="#000" />
      <rect x="7" y="28" width="5" height="1" fill="#000" />
      <rect x="7" y="24" width="4" height="4" fill="#4caf50" />
      <rect x="11" y="26" width="1" height="2" fill="#4caf50" />

      <rect x="25" y="24" width="1" height="4" fill="#000" />
      <rect x="20" y="28" width="5" height="1" fill="#000" />
      <rect x="21" y="24" width="4" height="4" fill="#4caf50" />
      <rect x="20" y="26" width="1" height="2" fill="#4caf50" />

      {/* Highlight */}
      <rect x="8" y="8" width="4" height="2" fill="#81c784" />
      <rect x="6" y="9" width="2" height="2" fill="#81c784" />
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
