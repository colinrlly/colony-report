"use client";

import { useState, useEffect, useCallback } from "react";

interface AlarmNotificationProps {
  isVisible: boolean;
  onDismiss: () => void;
}

// Pixel art angry plant icon
function AngryPlantIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
      shapeRendering="crispEdges"
    >
      {/* Pot */}
      <rect x="4" y="12" width="8" height="4" fill="#8B4513" />
      <rect x="3" y="11" width="10" height="1" fill="#A0522D" />

      {/* Stem */}
      <rect x="7" y="8" width="2" height="4" fill="#228B22" />

      {/* Main plant body - menacing shape */}
      <rect x="5" y="4" width="6" height="5" fill="#32CD32" />
      <rect x="4" y="5" width="1" height="3" fill="#32CD32" />
      <rect x="11" y="5" width="1" height="3" fill="#32CD32" />

      {/* Angry eyes */}
      <rect x="6" y="5" width="1" height="2" fill="#1a1a1a" />
      <rect x="9" y="5" width="1" height="2" fill="#1a1a1a" />

      {/* Angry eyebrows - slanted inward */}
      <rect x="5" y="4" width="2" height="1" fill="#8B0000" />
      <rect x="9" y="4" width="2" height="1" fill="#8B0000" />

      {/* Angry mouth - jagged teeth */}
      <rect x="6" y="7" width="4" height="1" fill="#8B0000" />
      <rect x="6" y="8" width="1" height="1" fill="#FFFFFF" />
      <rect x="8" y="8" width="1" height="1" fill="#FFFFFF" />
      <rect x="9" y="8" width="1" height="1" fill="#FFFFFF" />

      {/* Spiky leaves - aggressive */}
      <rect x="3" y="3" width="1" height="2" fill="#228B22" />
      <rect x="2" y="2" width="1" height="1" fill="#228B22" />
      <rect x="12" y="3" width="1" height="2" fill="#228B22" />
      <rect x="13" y="2" width="1" height="1" fill="#228B22" />

      {/* Top spikes */}
      <rect x="5" y="3" width="1" height="1" fill="#32CD32" />
      <rect x="7" y="2" width="2" height="2" fill="#32CD32" />
      <rect x="10" y="3" width="1" height="1" fill="#32CD32" />
    </svg>
  );
}

// Pixel art happy plant icon
function HappyPlantIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
      shapeRendering="crispEdges"
    >
      {/* Pot with water droplet */}
      <rect x="4" y="12" width="8" height="4" fill="#8B4513" />
      <rect x="3" y="11" width="10" height="1" fill="#A0522D" />

      {/* Water drops on pot */}
      <rect x="5" y="13" width="1" height="1" fill="#4FC3F7" />
      <rect x="10" y="14" width="1" height="1" fill="#4FC3F7" />

      {/* Stem */}
      <rect x="7" y="8" width="2" height="4" fill="#228B22" />

      {/* Main plant body - rounder, friendlier */}
      <rect x="5" y="4" width="6" height="5" fill="#32CD32" />
      <rect x="4" y="5" width="1" height="3" fill="#32CD32" />
      <rect x="11" y="5" width="1" height="3" fill="#32CD32" />

      {/* Happy eyes - curved like ^^ */}
      <rect x="6" y="5" width="1" height="1" fill="#1a1a1a" />
      <rect x="5" y="6" width="1" height="1" fill="#1a1a1a" />
      <rect x="7" y="6" width="1" height="1" fill="#1a1a1a" />
      <rect x="9" y="5" width="1" height="1" fill="#1a1a1a" />
      <rect x="8" y="6" width="1" height="1" fill="#1a1a1a" />
      <rect x="10" y="6" width="1" height="1" fill="#1a1a1a" />

      {/* Happy smile */}
      <rect x="6" y="7" width="1" height="1" fill="#1a1a1a" />
      <rect x="7" y="8" width="2" height="1" fill="#1a1a1a" />
      <rect x="9" y="7" width="1" height="1" fill="#1a1a1a" />

      {/* Rosy cheeks */}
      <rect x="4" y="6" width="1" height="1" fill="#FFB6C1" />
      <rect x="11" y="6" width="1" height="1" fill="#FFB6C1" />

      {/* Friendly leaves */}
      <rect x="3" y="4" width="1" height="1" fill="#228B22" />
      <rect x="2" y="3" width="1" height="1" fill="#228B22" />
      <rect x="12" y="4" width="1" height="1" fill="#228B22" />
      <rect x="13" y="3" width="1" height="1" fill="#228B22" />

      {/* Small flower on top */}
      <rect x="7" y="2" width="2" height="2" fill="#32CD32" />
      <rect x="7" y="1" width="1" height="1" fill="#FF69B4" />
      <rect x="8" y="1" width="1" height="1" fill="#FF69B4" />
      <rect x="6" y="2" width="1" height="1" fill="#FF69B4" />
      <rect x="9" y="2" width="1" height="1" fill="#FF69B4" />
    </svg>
  );
}

// Confetti particle component
function ConfettiParticle({
  index,
  color
}: {
  index: number;
  color: string;
}) {
  const angle = (index * 36) % 360; // Spread particles evenly
  const distance = 80 + (index % 3) * 40;
  const delay = (index % 5) * 0.05;
  const size = 6 + (index % 3) * 2;

  return (
    <div
      className="confetti-particle"
      style={{
        '--angle': `${angle}deg`,
        '--distance': `${distance}px`,
        '--delay': `${delay}s`,
        '--size': `${size}px`,
        backgroundColor: color,
      } as React.CSSProperties}
    />
  );
}

const CONFETTI_COLORS = [
  '#FF6B6B', // red
  '#4ECDC4', // teal
  '#FFE66D', // yellow
  '#95E1D3', // mint
  '#F38181', // coral
  '#AA96DA', // purple
  '#FCBAD3', // pink
  '#A8D8EA', // light blue
];

export function AlarmNotification({
  isVisible,
  onDismiss,
}: AlarmNotificationProps) {
  const [isWatered, setIsWatered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [shouldRender, setShouldRender] = useState(false);

  // Handle visibility changes
  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      setAnimationClass("alarm-slide-in");
      setIsWatered(false);
      setShowConfetti(false);
    }
  }, [isVisible]);

  // Handle water button click
  const handleWaterClick = useCallback(() => {
    setIsWatered(true);
    setShowConfetti(true);

    // After showing "Watered!" and confetti, slide out
    setTimeout(() => {
      setAnimationClass("alarm-slide-out");

      // After slide-out animation, hide completely
      setTimeout(() => {
        setShouldRender(false);
        setAnimationClass("");
        setShowConfetti(false);
        setIsWatered(false);
        onDismiss();
      }, 400);
    }, 1500); // Show watered state for 1.5 seconds
  }, [onDismiss]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9500] flex items-center justify-center ${animationClass}`}
      style={{ pointerEvents: "auto" }}
    >
      {/* Confetti burst */}
      {showConfetti && (
        <div className="confetti-container">
          {Array.from({ length: 30 }).map((_, i) => (
            <ConfettiParticle
              key={i}
              index={i}
              color={CONFETTI_COLORS[i % CONFETTI_COLORS.length]}
            />
          ))}
        </div>
      )}

      {/* Alarm notification container */}
      <div
        className="win98-border-raised"
        style={{
          backgroundColor: isWatered ? "#d4edda" : "#fde2e2",
          padding: "2px",
          width: "380px",
        }}
      >
        {/* Title bar - red/danger or green/success */}
        <div
          className="flex items-center gap-2 px-2 py-1"
          style={{
            background: isWatered
              ? "linear-gradient(180deg, #28a745 0%, #1e7e34 100%)"
              : "linear-gradient(180deg, #dc3545 0%, #a71d2a 100%)",
          }}
        >
          {isWatered ? <HappyPlantIcon /> : <AngryPlantIcon />}
          <span
            className="font-bold text-white text-sm tracking-wide uppercase"
            style={{
              textShadow: "1px 1px 0px #4a1a1a",
            }}
          >
            {isWatered ? "Plant Watered!" : "Plant Alarm"}
          </span>
        </div>

        {/* Content area */}
        <div
          className="px-4 py-3"
          style={{
            backgroundColor: isWatered ? "#d4edda" : "#fde2e2",
            borderTop: isWatered ? "1px solid #28a745" : "1px solid #dc3545",
          }}
        >
          {isWatered ? (
            /* Watered state */
            <div className="text-center">
              <div
                className="text-xl font-bold mb-2"
                style={{ color: "#155724" }}
              >
                Watered!
              </div>
              <div
                className="text-sm"
                style={{ color: "#155724" }}
              >
                The beanfang plants are happy now.
              </div>
            </div>
          ) : (
            /* Alert state */
            <>
              <div
                className="text-sm font-bold mb-2"
                style={{ color: "#721c24" }}
              >
                WARNING!
              </div>
              <div
                className="text-sm leading-relaxed mb-4"
                style={{ color: "#721c24" }}
              >
                Remotely water the exploding beanfang plants now! You know what happens when you forget… we can&apos;t have another incident report like that on our record so soon.
              </div>

              {/* Water button */}
              <button
                onClick={handleWaterClick}
                className="w-full win98-border-raised cursor-pointer active:win98-border-pressed"
                style={{
                  backgroundColor: "#c8b9a9",
                  padding: "8px 16px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                Water Plant Remotely
              </button>
            </>
          )}
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            height: "3px",
            background: isWatered
              ? "linear-gradient(90deg, #1e7e34 0%, #28a745 50%, #1e7e34 100%)"
              : "linear-gradient(90deg, #a71d2a 0%, #dc3545 50%, #a71d2a 100%)",
          }}
        />
      </div>
    </div>
  );
}
