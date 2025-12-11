"use client";

import { useState, useEffect, useCallback } from "react";

interface AlarmNotificationProps {
  isVisible: boolean;
  onDismiss: () => void;
}

// Pixel art caution/warning triangle icon
function CautionIcon() {
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
      {/* Yellow triangle background */}
      <rect x="7" y="1" width="2" height="1" fill="#FFD700" />
      <rect x="6" y="2" width="4" height="1" fill="#FFD700" />
      <rect x="5" y="3" width="6" height="1" fill="#FFD700" />
      <rect x="4" y="4" width="8" height="1" fill="#FFD700" />
      <rect x="3" y="5" width="10" height="1" fill="#FFD700" />
      <rect x="2" y="6" width="12" height="1" fill="#FFD700" />
      <rect x="2" y="7" width="12" height="1" fill="#FFD700" />
      <rect x="1" y="8" width="14" height="1" fill="#FFD700" />
      <rect x="1" y="9" width="14" height="1" fill="#FFD700" />
      <rect x="0" y="10" width="16" height="1" fill="#FFD700" />
      <rect x="0" y="11" width="16" height="1" fill="#FFD700" />
      <rect x="0" y="12" width="16" height="1" fill="#FFD700" />
      <rect x="0" y="13" width="16" height="1" fill="#FFD700" />

      {/* Black border */}
      <rect x="7" y="0" width="2" height="1" fill="#1a1a1a" />
      <rect x="6" y="1" width="1" height="1" fill="#1a1a1a" />
      <rect x="9" y="1" width="1" height="1" fill="#1a1a1a" />
      <rect x="5" y="2" width="1" height="1" fill="#1a1a1a" />
      <rect x="10" y="2" width="1" height="1" fill="#1a1a1a" />
      <rect x="4" y="3" width="1" height="1" fill="#1a1a1a" />
      <rect x="11" y="3" width="1" height="1" fill="#1a1a1a" />
      <rect x="3" y="4" width="1" height="1" fill="#1a1a1a" />
      <rect x="12" y="4" width="1" height="1" fill="#1a1a1a" />
      <rect x="2" y="5" width="1" height="1" fill="#1a1a1a" />
      <rect x="13" y="5" width="1" height="1" fill="#1a1a1a" />
      <rect x="1" y="6" width="1" height="2" fill="#1a1a1a" />
      <rect x="14" y="6" width="1" height="2" fill="#1a1a1a" />
      <rect x="0" y="8" width="1" height="2" fill="#1a1a1a" />
      <rect x="15" y="8" width="1" height="2" fill="#1a1a1a" />
      <rect x="0" y="14" width="16" height="1" fill="#1a1a1a" />

      {/* Exclamation mark */}
      <rect x="7" y="4" width="2" height="5" fill="#1a1a1a" />
      <rect x="7" y="10" width="2" height="2" fill="#1a1a1a" />
    </svg>
  );
}

// Pixel art angry plant icon - cuter and bigger
function AngryPlantIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
      shapeRendering="crispEdges"
    >
      {/* Pot - terracotta orange */}
      <rect x="4" y="12" width="8" height="3" fill="#CD853F" />
      <rect x="3" y="11" width="10" height="1" fill="#DEB887" />
      <rect x="5" y="15" width="6" height="1" fill="#8B4513" />

      {/* Stem */}
      <rect x="7" y="9" width="2" height="3" fill="#228B22" />

      {/* Main plant body - round and cute */}
      <rect x="4" y="4" width="8" height="6" fill="#32CD32" />
      <rect x="3" y="5" width="1" height="4" fill="#32CD32" />
      <rect x="12" y="5" width="1" height="4" fill="#32CD32" />

      {/* Angry eyes - big and cute but mad */}
      <rect x="5" y="5" width="2" height="2" fill="#FFFFFF" />
      <rect x="9" y="5" width="2" height="2" fill="#FFFFFF" />
      <rect x="6" y="5" width="1" height="2" fill="#1a1a1a" />
      <rect x="9" y="5" width="1" height="2" fill="#1a1a1a" />

      {/* Angry eyebrows - V shaped */}
      <rect x="4" y="4" width="1" height="1" fill="#8B0000" />
      <rect x="5" y="3" width="1" height="1" fill="#8B0000" />
      <rect x="6" y="4" width="1" height="1" fill="#8B0000" />
      <rect x="9" y="4" width="1" height="1" fill="#8B0000" />
      <rect x="10" y="3" width="1" height="1" fill="#8B0000" />
      <rect x="11" y="4" width="1" height="1" fill="#8B0000" />

      {/* Frowny mouth */}
      <rect x="6" y="8" width="1" height="1" fill="#1a1a1a" />
      <rect x="7" y="9" width="2" height="1" fill="#1a1a1a" />
      <rect x="9" y="8" width="1" height="1" fill="#1a1a1a" />

      {/* Angry red cheeks */}
      <rect x="3" y="6" width="1" height="2" fill="#FF6B6B" />
      <rect x="12" y="6" width="1" height="2" fill="#FF6B6B" />

      {/* Spiky angry leaves */}
      <rect x="2" y="3" width="1" height="3" fill="#228B22" />
      <rect x="1" y="2" width="1" height="2" fill="#228B22" />
      <rect x="0" y="1" width="1" height="1" fill="#228B22" />
      <rect x="13" y="3" width="1" height="3" fill="#228B22" />
      <rect x="14" y="2" width="1" height="2" fill="#228B22" />
      <rect x="15" y="1" width="1" height="1" fill="#228B22" />

      {/* Top spikes */}
      <rect x="6" y="2" width="1" height="2" fill="#32CD32" />
      <rect x="7" y="1" width="2" height="3" fill="#32CD32" />
      <rect x="9" y="2" width="1" height="2" fill="#32CD32" />
    </svg>
  );
}

// Pixel art happy plant icon - cute and content
function HappyPlantIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
      shapeRendering="crispEdges"
    >
      {/* Pot - terracotta orange */}
      <rect x="4" y="12" width="8" height="3" fill="#CD853F" />
      <rect x="3" y="11" width="10" height="1" fill="#DEB887" />
      <rect x="5" y="15" width="6" height="1" fill="#8B4513" />

      {/* Water drops on pot */}
      <rect x="5" y="13" width="1" height="1" fill="#4FC3F7" />
      <rect x="10" y="12" width="1" height="1" fill="#4FC3F7" />

      {/* Stem */}
      <rect x="7" y="9" width="2" height="3" fill="#228B22" />

      {/* Main plant body - round and cute */}
      <rect x="4" y="4" width="8" height="6" fill="#32CD32" />
      <rect x="3" y="5" width="1" height="4" fill="#32CD32" />
      <rect x="12" y="5" width="1" height="4" fill="#32CD32" />

      {/* Happy closed eyes ^^ */}
      <rect x="5" y="5" width="1" height="1" fill="#1a1a1a" />
      <rect x="6" y="6" width="1" height="1" fill="#1a1a1a" />
      <rect x="7" y="5" width="1" height="1" fill="#1a1a1a" />
      <rect x="8" y="5" width="1" height="1" fill="#1a1a1a" />
      <rect x="9" y="6" width="1" height="1" fill="#1a1a1a" />
      <rect x="10" y="5" width="1" height="1" fill="#1a1a1a" />

      {/* Happy smile */}
      <rect x="6" y="7" width="1" height="1" fill="#1a1a1a" />
      <rect x="7" y="8" width="2" height="1" fill="#1a1a1a" />
      <rect x="9" y="7" width="1" height="1" fill="#1a1a1a" />

      {/* Pink happy cheeks */}
      <rect x="3" y="6" width="1" height="2" fill="#FFB6C1" />
      <rect x="12" y="6" width="1" height="2" fill="#FFB6C1" />

      {/* Friendly droopy leaves */}
      <rect x="2" y="4" width="1" height="2" fill="#228B22" />
      <rect x="1" y="5" width="1" height="2" fill="#228B22" />
      <rect x="13" y="4" width="1" height="2" fill="#228B22" />
      <rect x="14" y="5" width="1" height="2" fill="#228B22" />

      {/* Little flower on top */}
      <rect x="7" y="2" width="2" height="2" fill="#32CD32" />
      <rect x="7" y="1" width="2" height="1" fill="#FF69B4" />
      <rect x="6" y="2" width="1" height="1" fill="#FF69B4" />
      <rect x="9" y="2" width="1" height="1" fill="#FF69B4" />
      <rect x="7" y="0" width="1" height="1" fill="#FFD700" />
      <rect x="8" y="0" width="1" height="1" fill="#FFD700" />
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
  const angle = (index * 36) % 360;
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
    }, 1500);
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
          width: "420px",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-2 py-1"
          style={{
            background: isWatered
              ? "linear-gradient(180deg, #28a745 0%, #1e7e34 100%)"
              : "linear-gradient(180deg, #dc3545 0%, #a71d2a 100%)",
          }}
        >
          <CautionIcon />
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
            <div className="flex items-center gap-4">
              <HappyPlantIcon />
              <div>
                <div
                  className="text-2xl font-bold mb-1"
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
            </div>
          ) : (
            /* Alert state */
            <>
              {/* Large WARNING! heading */}
              <div
                className="text-2xl font-bold mb-3"
                style={{
                  color: "#721c24",
                  textShadow: "1px 1px 0px #ffc0c0",
                }}
              >
                WARNING!
              </div>

              {/* Plant icon + message side by side */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <AngryPlantIcon />
                </div>
                <div
                  className="text-sm leading-relaxed pt-2"
                  style={{ color: "#721c24" }}
                >
                  Remotely water the exploding beanfang plants now! You know what happens when you forget… we can&apos;t have another incident report like that on our record so soon.
                </div>
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
