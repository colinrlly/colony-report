"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface PlantAlarmNotificationProps {
  isVisible: boolean;
  onDismiss: () => void;
}

// Pixel art angry plant icon - red/maroon with angry expression
function AngryPlantIcon() {
  return (
    <svg
      width="64"
      height="80"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
      shapeRendering="crispEdges"
    >
      {/* Pot */}
      <rect x="4" y="15" width="8" height="5" fill="#d97706" />
      <rect x="3" y="15" width="10" height="1" fill="#f59e0b" />
      <rect x="5" y="16" width="6" height="1" fill="#b45309" />

      {/* Stem */}
      <rect x="7" y="12" width="2" height="3" fill="#15803d" />

      {/* Plant body - red/maroon angry plant */}
      <rect x="5" y="5" width="6" height="7" fill="#dc2626" />
      <rect x="4" y="6" width="1" height="5" fill="#dc2626" />
      <rect x="11" y="6" width="1" height="5" fill="#dc2626" />
      <rect x="3" y="7" width="1" height="3" fill="#b91c1c" />
      <rect x="12" y="7" width="1" height="3" fill="#b91c1c" />

      {/* Top spiky leaves - green */}
      <rect x="6" y="3" width="1" height="2" fill="#16a34a" />
      <rect x="9" y="3" width="1" height="2" fill="#16a34a" />
      <rect x="5" y="2" width="1" height="2" fill="#15803d" />
      <rect x="10" y="2" width="1" height="2" fill="#15803d" />
      <rect x="4" y="1" width="1" height="2" fill="#16a34a" />
      <rect x="11" y="1" width="1" height="2" fill="#16a34a" />
      <rect x="3" y="0" width="1" height="2" fill="#15803d" />
      <rect x="12" y="0" width="1" height="2" fill="#15803d" />

      {/* Angry eyes - white with dark pupils looking angry */}
      <rect x="5" y="7" width="2" height="2" fill="#ffffff" />
      <rect x="9" y="7" width="2" height="2" fill="#ffffff" />
      <rect x="5" y="8" width="1" height="1" fill="#1a1a1a" />
      <rect x="10" y="8" width="1" height="1" fill="#1a1a1a" />

      {/* Angry eyebrows */}
      <rect x="4" y="6" width="2" height="1" fill="#7f1d1d" />
      <rect x="10" y="6" width="2" height="1" fill="#7f1d1d" />

      {/* Angry mouth - open shouting */}
      <rect x="6" y="10" width="4" height="2" fill="#1a1a1a" />
      <rect x="7" y="10" width="2" height="1" fill="#fca5a5" />
    </svg>
  );
}

// Pixel art happy plant icon - green with happy expression and flowers
function HappyPlantIcon() {
  return (
    <svg
      width="64"
      height="80"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
      shapeRendering="crispEdges"
    >
      {/* Pot */}
      <rect x="4" y="15" width="8" height="5" fill="#d97706" />
      <rect x="3" y="15" width="10" height="1" fill="#f59e0b" />
      <rect x="5" y="16" width="6" height="1" fill="#b45309" />

      {/* Stem */}
      <rect x="7" y="12" width="2" height="3" fill="#15803d" />

      {/* Plant body - green happy plant */}
      <rect x="5" y="5" width="6" height="7" fill="#22c55e" />
      <rect x="4" y="6" width="1" height="5" fill="#22c55e" />
      <rect x="11" y="6" width="1" height="5" fill="#22c55e" />
      <rect x="3" y="7" width="1" height="3" fill="#16a34a" />
      <rect x="12" y="7" width="1" height="3" fill="#16a34a" />

      {/* Flowers on top - pink */}
      <rect x="5" y="2" width="2" height="2" fill="#f472b6" />
      <rect x="6" y="1" width="1" height="1" fill="#f9a8d4" />
      <rect x="5" y="3" width="1" height="1" fill="#db2777" />
      <rect x="9" y="2" width="2" height="2" fill="#f472b6" />
      <rect x="10" y="1" width="1" height="1" fill="#f9a8d4" />
      <rect x="10" y="3" width="1" height="1" fill="#db2777" />

      {/* Yellow flower centers */}
      <rect x="6" y="2" width="1" height="1" fill="#facc15" />
      <rect x="9" y="2" width="1" height="1" fill="#facc15" />

      {/* Top leaves */}
      <rect x="7" y="3" width="2" height="2" fill="#16a34a" />
      <rect x="4" y="4" width="1" height="1" fill="#15803d" />
      <rect x="11" y="4" width="1" height="1" fill="#15803d" />

      {/* Happy eyes */}
      <rect x="5" y="7" width="2" height="2" fill="#1a1a1a" />
      <rect x="9" y="7" width="2" height="2" fill="#1a1a1a" />
      <rect x="6" y="7" width="1" height="1" fill="#ffffff" />
      <rect x="10" y="7" width="1" height="1" fill="#ffffff" />

      {/* Happy smile */}
      <rect x="6" y="10" width="4" height="1" fill="#15803d" />
      <rect x="5" y="9" width="1" height="1" fill="#15803d" />
      <rect x="10" y="9" width="1" height="1" fill="#15803d" />
    </svg>
  );
}

// Warning icon triangle
function WarningIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
      shapeRendering="crispEdges"
    >
      {/* Yellow triangle background */}
      <polygon points="8,1 15,14 1,14" fill="#facc15" />
      <polygon points="8,2 14,13 2,13" fill="#fde047" />

      {/* Black border */}
      <rect x="7" y="2" width="2" height="1" fill="#1a1a1a" />
      <rect x="6" y="3" width="1" height="1" fill="#1a1a1a" />
      <rect x="9" y="3" width="1" height="1" fill="#1a1a1a" />
      <rect x="5" y="4" width="1" height="1" fill="#1a1a1a" />
      <rect x="10" y="4" width="1" height="1" fill="#1a1a1a" />
      <rect x="4" y="5" width="1" height="2" fill="#1a1a1a" />
      <rect x="11" y="5" width="1" height="2" fill="#1a1a1a" />
      <rect x="3" y="7" width="1" height="2" fill="#1a1a1a" />
      <rect x="12" y="7" width="1" height="2" fill="#1a1a1a" />
      <rect x="2" y="9" width="1" height="2" fill="#1a1a1a" />
      <rect x="13" y="9" width="1" height="2" fill="#1a1a1a" />
      <rect x="1" y="11" width="1" height="2" fill="#1a1a1a" />
      <rect x="14" y="11" width="1" height="2" fill="#1a1a1a" />
      <rect x="1" y="13" width="14" height="1" fill="#1a1a1a" />

      {/* Exclamation mark */}
      <rect x="7" y="5" width="2" height="4" fill="#1a1a1a" />
      <rect x="7" y="10" width="2" height="2" fill="#1a1a1a" />
    </svg>
  );
}

// Confetti colors
const CONFETTI_COLORS = [
  "#ef4444", // red
  "#14b8a6", // teal
  "#facc15", // yellow
  "#34d399", // mint
  "#f97316", // coral
  "#a855f7", // purple
  "#ec4899", // pink
  "#38bdf8", // light blue
];

// Single confetti particle component
function ConfettiParticle({
  color,
  delay,
  angle,
  distance,
}: {
  color: string;
  delay: number;
  angle: number;
  distance: number;
}) {
  // Calculate x/y offsets using JavaScript
  const radians = (angle * Math.PI) / 180;
  const x = Math.cos(radians) * distance;
  const y = Math.sin(radians) * distance;

  const style = {
    "--x": `${x}px`,
    "--y": `${y}px`,
    "--delay": `${delay}ms`,
    backgroundColor: color,
  } as React.CSSProperties;

  return <div className="confetti-particle" style={style} />;
}

export function PlantAlarmNotification({
  isVisible,
  onDismiss,
}: PlantAlarmNotificationProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [isWatered, setIsWatered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Generate confetti particles
  const confettiParticles = useCallback(() => {
    const particles = [];
    for (let i = 0; i < 30; i++) {
      const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
      const angle = (i / 30) * 360 + Math.random() * 30;
      const distance = 150 + Math.random() * 100;
      const delay = Math.random() * 200;
      particles.push(
        <ConfettiParticle
          key={i}
          color={color}
          delay={delay}
          angle={angle}
          distance={distance}
        />
      );
    }
    return particles;
  }, []);

  // Handle visibility changes
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isVisible) {
      // Reset states for new alarm
      setIsWatered(false);
      setShowConfetti(false);
      setShouldRender(true);
      setAnimationClass("alarm-slide-in");
    } else {
      // If visibility is set to false externally, reset
      setShouldRender(false);
      setAnimationClass("");
      setIsWatered(false);
      setShowConfetti(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible]);

  // Handle water button click
  const handleWaterClick = useCallback(() => {
    setIsWatered(true);
    setShowConfetti(true);

    // After success state duration, animate out and dismiss
    timeoutRef.current = setTimeout(() => {
      setAnimationClass("alarm-slide-out");

      timeoutRef.current = setTimeout(() => {
        setShouldRender(false);
        setAnimationClass("");
        setIsWatered(false);
        setShowConfetti(false);
        onDismiss();
      }, 400); // Animation duration
    }, 1500); // Success state duration
  }, [onDismiss]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9500] flex items-center justify-center ${animationClass}`}
      style={{ pointerEvents: "auto" }}
    >
      {/* Confetti container */}
      {showConfetti && (
        <div className="confetti-container">{confettiParticles()}</div>
      )}

      {/* Notification container */}
      <div
        className="win98-border-raised"
        style={{
          backgroundColor: isWatered ? "#dcfce7" : "#d4c8b8",
          padding: "2px",
          width: "480px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-2 py-1"
          style={{
            background: isWatered
              ? "linear-gradient(180deg, #22c55e 0%, #15803d 100%)"
              : "linear-gradient(180deg, #ef4444 0%, #b91c1c 100%)",
          }}
        >
          <WarningIcon />
          <span
            className="font-bold text-white text-sm tracking-wide uppercase"
            style={{
              textShadow: "1px 1px 0px #1a1a1a",
            }}
          >
            {isWatered ? "Plant Watered!" : "Plant Alarm"}
          </span>
        </div>

        {/* Content area */}
        <div
          className="px-4 py-4"
          style={{
            backgroundColor: isWatered ? "#dcfce7" : "#d4c8b8",
            borderTop: isWatered ? "1px solid #15803d" : "1px solid #b91c1c",
          }}
        >
          {isWatered ? (
            // Success state
            <div className="flex items-center gap-4">
              <HappyPlantIcon />
              <div>
                <div
                  className="text-xl font-bold"
                  style={{ color: "#15803d" }}
                >
                  Watered!
                </div>
                <div
                  className="text-sm mt-1"
                  style={{ color: "#166534" }}
                >
                  The beanfang plants are happy now.
                </div>
              </div>
            </div>
          ) : (
            // Alarm state - WARNING line on top, then icon + body text below
            <div>
              {/* Warning header line */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-2xl font-bold"
                  style={{ color: "#dc2626" }}
                >
                  WARNING!
                </span>
                <span
                  className="text-lg font-semibold"
                  style={{
                    color: "#7f1d1d",
                    textDecoration: "underline",
                    textDecorationColor: "#b91c1c",
                  }}
                >
                  Water the exploding beanfang plant!
                </span>
              </div>
              {/* Icon and body text */}
              <div className="flex items-start gap-4">
                <AngryPlantIcon />
                <div
                  className="text-sm leading-relaxed pt-2"
                  style={{ color: "#44403c" }}
                >
                  You know what happens when you forget.. we can&apos;t have
                  another incident report like that on our record so soon.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Button area - only show when not watered */}
        {!isWatered && (
          <div
            className="px-4 py-3 flex justify-center"
            style={{
              backgroundColor: "#b8a898",
              borderTop: "1px solid #a09080",
            }}
          >
            <button
              onClick={handleWaterClick}
              className="win98-border-raised px-6 py-2 font-bold text-sm cursor-pointer hover:brightness-95 active:win98-border-pressed"
              style={{
                backgroundColor: "#d4c8b8",
                color: "#1c1917",
              }}
            >
              Water Plant Remotely
            </button>
          </div>
        )}

        {/* Bottom accent bar */}
        <div
          style={{
            height: "3px",
            background: isWatered
              ? "linear-gradient(90deg, #15803d 0%, #22c55e 50%, #15803d 100%)"
              : "linear-gradient(90deg, #b91c1c 0%, #ef4444 50%, #b91c1c 100%)",
          }}
        />
      </div>
    </div>
  );
}
