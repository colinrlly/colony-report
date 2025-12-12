"use client";

import { useNotificationAnimation } from "@/hooks/use-notification-animation";

interface CalendarNotificationProps {
  isVisible: boolean;
  onComplete: () => void;
  eventName: string;
  time: string;
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
  eventName,
  time,
  note,
}: CalendarNotificationProps) {
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
            className="font-bold text-white text-sm tracking-wide uppercase"
            style={{
              textShadow: "1px 1px 0px #78350f",
            }}
          >
            Calendar Event
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
          {/* Event name */}
          <div
            className="text-sm font-semibold"
            style={{ color: "#78350f" }}
          >
            Event: {eventName}
          </div>

          {/* Time */}
          <div
            className="text-sm mt-1"
            style={{ color: "#78350f" }}
          >
            {time}
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
