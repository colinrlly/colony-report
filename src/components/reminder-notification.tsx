"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

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
  const [animationClass, setAnimationClass] = useState("");
  const [shouldRender, setShouldRender] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Display duration - how long the notification stays visible (in ms)
  const displayDuration = 4000;
  const animationDuration = 400;

  useEffect(() => {
    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isVisible) {
      // Start showing - slide in
      setShouldRender(true);
      setAnimationClass("notification-slide-in");

      // After slide-in completes, wait for display duration, then slide out
      timeoutRef.current = setTimeout(() => {
        setAnimationClass("notification-slide-out");

        // After slide-out completes, hide and notify parent
        timeoutRef.current = setTimeout(() => {
          setShouldRender(false);
          setAnimationClass("");
          onComplete();
        }, animationDuration);
      }, animationDuration + displayDuration);
    } else {
      // If visibility is set to false externally, reset immediately
      setShouldRender(false);
      setAnimationClass("");
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible, onComplete]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`fixed top-[200px] right-4 z-[9000] ${animationClass}`}
      style={{ pointerEvents: "none" }}
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
