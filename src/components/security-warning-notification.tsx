"use client";

import { useNotificationAnimation } from "@/hooks/use-notification-animation";

interface SecurityWarningNotificationProps {
  isVisible: boolean;
  onComplete: () => void;
  onViewCamera: () => void;
}

// Pixel art warning/shield icon component
function WarningIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
      shapeRendering="crispEdges"
    >
      {/* Shield/camera body - dark red background */}
      <rect x="2" y="2" width="12" height="12" fill="#dc2626" />

      {/* Inner dark area */}
      <rect x="3" y="3" width="10" height="10" fill="#7f1d1d" />

      {/* Exclamation mark - white/yellow */}
      <rect x="7" y="4" width="2" height="5" fill="#fef08a" />
      <rect x="7" y="10" width="2" height="2" fill="#fef08a" />

      {/* Border - darker red */}
      <rect x="1" y="2" width="1" height="12" fill="#991b1b" />
      <rect x="14" y="2" width="1" height="12" fill="#991b1b" />
      <rect x="2" y="1" width="12" height="1" fill="#991b1b" />
      <rect x="2" y="14" width="12" height="1" fill="#991b1b" />

      {/* Corner accents */}
      <rect x="1" y="1" width="1" height="1" fill="#450a0a" />
      <rect x="14" y="1" width="1" height="1" fill="#450a0a" />
      <rect x="1" y="14" width="1" height="1" fill="#450a0a" />
      <rect x="14" y="14" width="1" height="1" fill="#450a0a" />
    </svg>
  );
}

export function SecurityWarningNotification({
  isVisible,
  onComplete,
  onViewCamera,
}: SecurityWarningNotificationProps) {
  const { shouldRender, animationClass } = useNotificationAnimation({
    isVisible,
    onComplete,
    displayDuration: 8000, // Longer display for warnings
  });

  if (!shouldRender) {
    return null;
  }

  const handleViewCamera = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewCamera();
  };

  return (
    <div
      className={`fixed top-[340px] right-4 z-[9000] ${animationClass}`}
      style={{ pointerEvents: "auto" }}
    >
      {/* Notification container with Win98 styling */}
      <div
        className="win98-border-raised"
        style={{
          backgroundColor: "#fef2f2",
          padding: "2px",
          width: "340px",
        }}
      >
        {/* Title bar - red gradient for warning */}
        <div
          className="flex items-center gap-2 px-2 py-1"
          style={{
            background: "linear-gradient(180deg, #ef4444 0%, #dc2626 100%)",
          }}
        >
          <WarningIcon />
          <span
            className="font-bold text-white text-sm tracking-wide uppercase"
            style={{
              textShadow: "1px 1px 0px #7f1d1d",
            }}
          >
            Security Alert
          </span>
        </div>

        {/* Content area */}
        <div
          className="px-3 py-2"
          style={{
            backgroundColor: "#fef2f2",
            borderTop: "1px solid #fca5a5",
          }}
        >
          {/* Warning message */}
          <div
            className="text-sm font-semibold"
            style={{ color: "#991b1b" }}
          >
            Warning!
          </div>

          {/* Description */}
          <div
            className="text-xs mt-1 leading-relaxed"
            style={{ color: "#b91c1c" }}
          >
            Unusual movement detected in security cam 3.
          </div>

          {/* View Camera Button */}
          <button
            onClick={handleViewCamera}
            className="mt-3 w-full win98-border-raised px-3 py-1.5 text-xs font-semibold cursor-pointer hover:bg-gray-100 active:win98-border-sunken"
            style={{
              backgroundColor: "#e5e5e5",
              color: "#1a1a1a",
            }}
          >
            View Camera 3
          </button>
        </div>

        {/* Bottom accent bar - pulsing red */}
        <div
          className="animate-pulse"
          style={{
            height: "3px",
            background: "linear-gradient(90deg, #dc2626 0%, #ef4444 50%, #dc2626 100%)",
          }}
        />
      </div>
    </div>
  );
}
