"use client";

import { ReactNode } from "react";
import { useNotificationAnimation } from "@/hooks/use-notification-animation";

interface ReminderNotificationProps {
  isVisible: boolean;
  onComplete: () => void;
  title: ReactNode;
  message: ReactNode;
}

// Pixel art clipboard/reminder icon component
function ReminderIcon() {
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
      {/* Clipboard body - beige background */}
      <rect x="2" y="3" width="12" height="12" fill="#fef9c3" />

      {/* Clipboard top clip - brown */}
      <rect x="5" y="1" width="6" height="3" fill="#92400e" />
      <rect x="6" y="2" width="4" height="1" fill="#78350f" />

      {/* Clipboard lines - representing text/checklist */}
      <rect x="4" y="6" width="8" height="1" fill="#a16207" />
      <rect x="4" y="8" width="6" height="1" fill="#a16207" />
      <rect x="4" y="10" width="7" height="1" fill="#a16207" />
      <rect x="4" y="12" width="5" height="1" fill="#a16207" />

      {/* Border - dark brown */}
      <rect x="1" y="3" width="1" height="12" fill="#78350f" />
      <rect x="14" y="3" width="1" height="12" fill="#78350f" />
      <rect x="2" y="15" width="12" height="1" fill="#78350f" />
      <rect x="2" y="2" width="3" height="1" fill="#78350f" />
      <rect x="11" y="2" width="3" height="1" fill="#78350f" />
    </svg>
  );
}

export function ReminderNotification({
  isVisible,
  onComplete,
  title,
  message,
}: ReminderNotificationProps) {
  const { shouldRender, animationClass, swipeX, isDragging, swipeHandlers } = useNotificationAnimation({
    isVisible,
    onComplete,
  });

  if (!shouldRender) {
    return null;
  }

  // Calculate opacity based on swipe distance (fade out as it's swiped)
  const swipeOpacity = Math.max(0, 1 - swipeX / 200);

  return (
    <div
      className={`fixed top-[60px] right-4 z-[9000] ${animationClass} notification-swipeable ${isDragging ? 'notification-dragging' : 'notification-spring-back'}`}
      style={{
        transform: swipeX > 0 ? `translateX(${swipeX}px)` : undefined,
        opacity: swipeX > 0 ? swipeOpacity : undefined,
      }}
      {...swipeHandlers}
    >
      {/* Notification container with Win98 styling */}
      <div
        className="win98-border-raised"
        style={{
          backgroundColor: "#fef9c3",
          padding: "2px",
          width: "340px",
        }}
      >
        {/* Title bar - yellow/golden gradient */}
        <div
          className="flex items-center gap-2 px-2 py-1"
          style={{
            background: "linear-gradient(180deg, #facc15 0%, #ca8a04 100%)",
          }}
        >
          <ReminderIcon />
          <span
            className="font-bold text-white text-sm tracking-wide uppercase"
            style={{
              textShadow: "1px 1px 0px #78350f",
            }}
          >
            Reminder
          </span>
        </div>

        {/* Content area */}
        <div
          className="px-3 py-2"
          style={{
            backgroundColor: "#fef9c3",
            borderTop: "1px solid #ca8a04",
          }}
        >
          {/* Reminder title */}
          <div
            className="text-sm font-semibold"
            style={{ color: "#78350f" }}
          >
            {title}
          </div>

          {/* Message */}
          <div
            className="text-xs mt-2 leading-relaxed"
            style={{ color: "#92400e" }}
          >
            {message}
          </div>
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            height: "3px",
            background: "linear-gradient(90deg, #ca8a04 0%, #facc15 50%, #ca8a04 100%)",
          }}
        />
      </div>
    </div>
  );
}

// Helper component for redacted text
export function RedactedText({ children }: { children: string }) {
  return (
    <span
      style={{
        backgroundColor: "#1a1a1a",
        color: "#1a1a1a",
        padding: "0 4px",
        borderRadius: "2px",
        userSelect: "none",
      }}
    >
      {children}
    </span>
  );
}
