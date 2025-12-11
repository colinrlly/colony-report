"use client";

import { useState, useEffect, useCallback } from "react";

interface CalendarNotificationProps {
  isVisible: boolean;
  onComplete: () => void;
  title: string;
  event: string;
  note?: string;
}

// Pixel art calendar icon component
function CalendarIcon() {
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
      {/* Calendar body - beige/cream background */}
      <rect x="1" y="3" width="14" height="12" fill="#fef3c7" />

      {/* Calendar top bar - orange */}
      <rect x="1" y="3" width="14" height="3" fill="#d97706" />

      {/* Calendar binding holes */}
      <rect x="3" y="2" width="2" height="2" fill="#78350f" />
      <rect x="11" y="2" width="2" height="2" fill="#78350f" />

      {/* Calendar rings */}
      <rect x="3" y="1" width="2" height="1" fill="#a3a3a3" />
      <rect x="11" y="1" width="2" height="1" fill="#a3a3a3" />

      {/* Grid lines - horizontal */}
      <rect x="1" y="8" width="14" height="1" fill="#d4a574" />
      <rect x="1" y="11" width="14" height="1" fill="#d4a574" />

      {/* Grid lines - vertical */}
      <rect x="5" y="6" width="1" height="9" fill="#d4a574" />
      <rect x="10" y="6" width="1" height="9" fill="#d4a574" />

      {/* Date number "8" in orange */}
      <rect x="7" y="9" width="1" height="1" fill="#b45309" />
      <rect x="8" y="9" width="1" height="1" fill="#b45309" />
      <rect x="6" y="10" width="1" height="1" fill="#b45309" />
      <rect x="9" y="10" width="1" height="1" fill="#b45309" />
      <rect x="7" y="11" width="1" height="1" fill="#b45309" />
      <rect x="8" y="11" width="1" height="1" fill="#b45309" />
      <rect x="6" y="12" width="1" height="1" fill="#b45309" />
      <rect x="9" y="12" width="1" height="1" fill="#b45309" />
      <rect x="7" y="13" width="1" height="1" fill="#b45309" />
      <rect x="8" y="13" width="1" height="1" fill="#b45309" />

      {/* Border - dark brown */}
      <rect x="0" y="3" width="1" height="12" fill="#78350f" />
      <rect x="15" y="3" width="1" height="12" fill="#78350f" />
      <rect x="1" y="15" width="14" height="1" fill="#78350f" />
      <rect x="1" y="2" width="14" height="1" fill="#78350f" />
    </svg>
  );
}

export function CalendarNotification({
  isVisible,
  onComplete,
  title,
  event,
  note,
}: CalendarNotificationProps) {
  const [animationPhase, setAnimationPhase] = useState<"in" | "visible" | "out" | "hidden">("hidden");

  // Display duration - how long the notification stays visible (in ms)
  const displayDuration = 4000;

  useEffect(() => {
    if (isVisible && animationPhase === "hidden") {
      // Start slide in
      setAnimationPhase("in");

      // After slide in animation completes, mark as visible
      const slideInTimer = setTimeout(() => {
        setAnimationPhase("visible");
      }, 400);

      return () => clearTimeout(slideInTimer);
    }
  }, [isVisible, animationPhase]);

  useEffect(() => {
    if (animationPhase === "visible") {
      // Wait for display duration, then slide out
      const displayTimer = setTimeout(() => {
        setAnimationPhase("out");
      }, displayDuration);

      return () => clearTimeout(displayTimer);
    }
  }, [animationPhase]);

  useEffect(() => {
    if (animationPhase === "out") {
      // After slide out animation completes, hide and notify parent
      const slideOutTimer = setTimeout(() => {
        setAnimationPhase("hidden");
        onComplete();
      }, 400);

      return () => clearTimeout(slideOutTimer);
    }
  }, [animationPhase, onComplete]);

  // Reset when visibility changes to hidden
  useEffect(() => {
    if (!isVisible) {
      setAnimationPhase("hidden");
    }
  }, [isVisible]);

  if (animationPhase === "hidden") {
    return null;
  }

  const animationClass =
    animationPhase === "in"
      ? "notification-slide-in"
      : animationPhase === "out"
      ? "notification-slide-out"
      : "";

  return (
    <div
      className={`fixed top-[60px] right-4 z-[9000] ${animationClass}`}
      style={{ pointerEvents: "none" }}
    >
      {/* Notification container with Win98 styling */}
      <div
        className="win98-border-raised"
        style={{
          backgroundColor: "#fef3c7",
          padding: "2px",
          width: "320px",
        }}
      >
        {/* Title bar - orange */}
        <div
          className="flex items-center gap-2 px-2 py-1"
          style={{
            background: "linear-gradient(180deg, #f59e0b 0%, #d97706 100%)",
          }}
        >
          <CalendarIcon />
          <span
            className="font-bold text-white text-sm tracking-wide"
            style={{
              textShadow: "1px 1px 0px #78350f",
            }}
          >
            {title}
          </span>
        </div>

        {/* Content area */}
        <div
          className="px-3 py-2"
          style={{
            backgroundColor: "#fef3c7",
            borderTop: "1px solid #d4a574",
          }}
        >
          {/* Event line */}
          <div
            className="text-sm font-semibold"
            style={{ color: "#78350f" }}
          >
            {event}
          </div>

          {/* Note line (if provided) */}
          {note && (
            <div
              className="text-xs mt-1 italic"
              style={{ color: "#92400e" }}
            >
              {note}
            </div>
          )}
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            height: "3px",
            background: "linear-gradient(90deg, #d97706 0%, #f59e0b 50%, #d97706 100%)",
          }}
        />
      </div>
    </div>
  );
}
