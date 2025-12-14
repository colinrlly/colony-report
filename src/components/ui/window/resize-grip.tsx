/**
 * Windows 98-style resize grip for the bottom-right corner of resizable windows.
 * Renders a diagonal pattern of dots that indicates the window can be resized.
 */
export function ResizeGrip() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      style={{ display: "block" }}
      aria-hidden="true"
    >
      {/* Top-right dot */}
      <rect x="9" y="2" width="1" height="1" fill="#808080" />
      <rect x="10" y="1" width="1" height="1" fill="#DFDFDF" />
      {/* Middle row */}
      <rect x="6" y="5" width="1" height="1" fill="#808080" />
      <rect x="7" y="4" width="1" height="1" fill="#DFDFDF" />
      <rect x="9" y="5" width="1" height="1" fill="#808080" />
      <rect x="10" y="4" width="1" height="1" fill="#DFDFDF" />
      {/* Bottom row */}
      <rect x="3" y="8" width="1" height="1" fill="#808080" />
      <rect x="4" y="7" width="1" height="1" fill="#DFDFDF" />
      <rect x="6" y="8" width="1" height="1" fill="#808080" />
      <rect x="7" y="7" width="1" height="1" fill="#DFDFDF" />
      <rect x="9" y="8" width="1" height="1" fill="#808080" />
      <rect x="10" y="7" width="1" height="1" fill="#DFDFDF" />
    </svg>
  );
}
