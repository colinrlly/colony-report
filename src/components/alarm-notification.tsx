"use client";

import { useState, useEffect, useCallback } from "react";

interface AlarmNotificationProps {
  isVisible: boolean;
  onDismiss: () => void;
}

// Pixel art caution/warning triangle icon
function CautionIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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

// Pixel art angry RED plant icon - matches the mockup
function AngryPlantIcon() {
  return (
    <svg
      width="80"
      height="100"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
      shapeRendering="crispEdges"
    >
      {/* Pot */}
      <rect x="5" y="16" width="6" height="4" fill="#CD853F" />
      <rect x="4" y="15" width="8" height="1" fill="#DEB887" />

      {/* Stem */}
      <rect x="7" y="13" width="2" height="3" fill="#228B22" />

      {/* Main body - RED angry plant */}
      <rect x="4" y="5" width="8" height="9" fill="#DC2626" />
      <rect x="5" y="4" width="6" height="1" fill="#DC2626" />
      <rect x="6" y="3" width="4" height="1" fill="#DC2626" />

      {/* Darker red shading */}
      <rect x="4" y="10" width="8" height="3" fill="#B91C1C" />

      {/* Green spiky leaves/arms - left side */}
      <rect x="2" y="6" width="2" height="1" fill="#22C55E" />
      <rect x="1" y="5" width="2" height="1" fill="#22C55E" />
      <rect x="0" y="3" width="2" height="2" fill="#22C55E" />
      <rect x="0" y="2" width="1" height="1" fill="#22C55E" />

      {/* Green spiky leaves/arms - right side */}
      <rect x="12" y="6" width="2" height="1" fill="#22C55E" />
      <rect x="13" y="5" width="2" height="1" fill="#22C55E" />
      <rect x="14" y="3" width="2" height="2" fill="#22C55E" />
      <rect x="15" y="2" width="1" height="1" fill="#22C55E" />

      {/* Green top spikes */}
      <rect x="5" y="2" width="1" height="2" fill="#22C55E" />
      <rect x="4" y="1" width="1" height="1" fill="#22C55E" />
      <rect x="10" y="2" width="1" height="2" fill="#22C55E" />
      <rect x="11" y="1" width="1" height="1" fill="#22C55E" />

      {/* Angry eyebrows - dark black V shape */}
      <rect x="4" y="5" width="3" height="1" fill="#1a1a1a" />
      <rect x="5" y="6" width="2" height="1" fill="#1a1a1a" />
      <rect x="9" y="5" width="3" height="1" fill="#1a1a1a" />
      <rect x="9" y="6" width="2" height="1" fill="#1a1a1a" />

      {/* Eyes - white with black pupils */}
      <rect x="5" y="7" width="2" height="3" fill="#FFFFFF" />
      <rect x="9" y="7" width="2" height="3" fill="#FFFFFF" />
      <rect x="6" y="8" width="1" height="2" fill="#1a1a1a" />
      <rect x="9" y="8" width="1" height="2" fill="#1a1a1a" />

      {/* Angry mouth - open showing teeth */}
      <rect x="5" y="11" width="6" height="2" fill="#1a1a1a" />
      <rect x="6" y="11" width="1" height="1" fill="#FFFFFF" />
      <rect x="8" y="11" width="1" height="1" fill="#FFFFFF" />
      <rect x="10" y="11" width="1" height="1" fill="#FFFFFF" />
    </svg>
  );
}

// Pixel art happy plant icon - green and content
function HappyPlantIcon() {
  return (
    <svg
      width="80"
      height="100"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
      shapeRendering="crispEdges"
    >
      {/* Pot */}
      <rect x="5" y="16" width="6" height="4" fill="#CD853F" />
      <rect x="4" y="15" width="8" height="1" fill="#DEB887" />

      {/* Water drops on pot */}
      <rect x="5" y="17" width="1" height="1" fill="#4FC3F7" />
      <rect x="9" y="18" width="1" height="1" fill="#4FC3F7" />

      {/* Stem */}
      <rect x="7" y="13" width="2" height="3" fill="#228B22" />

      {/* Main body - GREEN happy plant */}
      <rect x="4" y="5" width="8" height="9" fill="#32CD32" />
      <rect x="5" y="4" width="6" height="1" fill="#32CD32" />
      <rect x="6" y="3" width="4" height="1" fill="#32CD32" />

      {/* Lighter green highlight */}
      <rect x="5" y="5" width="6" height="3" fill="#4ADE80" />

      {/* Green leaves - relaxed/droopy */}
      <rect x="2" y="7" width="2" height="1" fill="#22C55E" />
      <rect x="1" y="8" width="2" height="1" fill="#22C55E" />
      <rect x="0" y="9" width="2" height="2" fill="#22C55E" />

      <rect x="12" y="7" width="2" height="1" fill="#22C55E" />
      <rect x="13" y="8" width="2" height="1" fill="#22C55E" />
      <rect x="14" y="9" width="2" height="2" fill="#22C55E" />

      {/* Little flower on top */}
      <rect x="7" y="1" width="2" height="2" fill="#32CD32" />
      <rect x="7" y="0" width="2" height="1" fill="#FF69B4" />
      <rect x="6" y="1" width="1" height="1" fill="#FF69B4" />
      <rect x="9" y="1" width="1" height="1" fill="#FF69B4" />

      {/* Happy closed eyes ^^ */}
      <rect x="5" y="6" width="1" height="1" fill="#1a1a1a" />
      <rect x="6" y="7" width="1" height="1" fill="#1a1a1a" />
      <rect x="7" y="6" width="1" height="1" fill="#1a1a1a" />
      <rect x="8" y="6" width="1" height="1" fill="#1a1a1a" />
      <rect x="9" y="7" width="1" height="1" fill="#1a1a1a" />
      <rect x="10" y="6" width="1" height="1" fill="#1a1a1a" />

      {/* Happy smile */}
      <rect x="6" y="9" width="1" height="1" fill="#1a1a1a" />
      <rect x="7" y="10" width="2" height="1" fill="#1a1a1a" />
      <rect x="9" y="9" width="1" height="1" fill="#1a1a1a" />

      {/* Rosy cheeks */}
      <rect x="4" y="8" width="1" height="1" fill="#FFB6C1" />
      <rect x="11" y="8" width="1" height="1" fill="#FFB6C1" />
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
          backgroundColor: "#c8b9a9",
          padding: "2px",
          width: "480px",
        }}
      >
        {/* Title bar - red gradient */}
        <div
          className="flex items-center gap-2 px-2 py-1"
          style={{
            background: isWatered
              ? "linear-gradient(180deg, #28a745 0%, #1e7e34 100%)"
              : "linear-gradient(180deg, #c53030 0%, #9b2c2c 100%)",
          }}
        >
          <CautionIcon size={36} />
          <span
            className="font-bold tracking-wide uppercase"
            style={{
              fontSize: "18px",
              color: isWatered ? "#FFFFFF" : "#FFD700",
              textShadow: "1px 1px 0px rgba(0,0,0,0.5)",
            }}
          >
            {isWatered ? "Plant Watered!" : "PLANT ALARM"}
          </span>
        </div>

        {/* Content area */}
        <div
          className="px-5 py-4"
          style={{
            backgroundColor: "#d4caba",
          }}
        >
          {isWatered ? (
            /* Watered state */
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <HappyPlantIcon />
              </div>
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
              {/* Top row: WARNING! + underlined message */}
              <div className="flex items-baseline gap-3 mb-4">
                <span
                  className="font-bold"
                  style={{
                    fontSize: "28px",
                    color: "#991b1b",
                  }}
                >
                  WARNING!
                </span>
                <span
                  style={{
                    fontSize: "18px",
                    color: "#7f1d1d",
                    textDecoration: "underline",
                    textDecorationColor: "#991b1b",
                    textUnderlineOffset: "3px",
                  }}
                >
                  Water the exploding beanfang plant!
                </span>
              </div>

              {/* Plant icon + message side by side */}
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <AngryPlantIcon />
                </div>
                <div
                  className="text-sm leading-relaxed pt-2"
                  style={{ color: "#44403c" }}
                >
                  You know what happens when you forget.. we can&apos;t have another incident report like that on our record so soon.
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer with button */}
        <div
          className="px-4 py-3 flex justify-center"
          style={{
            backgroundColor: "#c8b9a9",
            borderTop: "1px solid #a09080",
          }}
        >
          <button
            onClick={handleWaterClick}
            className="win98-border-raised cursor-pointer active:win98-border-pressed"
            style={{
              backgroundColor: "#e8e0d0",
              padding: "8px 32px",
              fontSize: "14px",
              minWidth: "180px",
            }}
          >
            {isWatered ? "Done!" : "Water Plant Remotely"}
          </button>
        </div>
      </div>
    </div>
  );
}
