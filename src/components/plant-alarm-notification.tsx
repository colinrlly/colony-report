"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ============================================
// Constants
// ============================================

const ANIMATION_DURATION = 400;
const SUCCESS_STATE_DURATION = 1500;
const CONFETTI_PARTICLE_COUNT = 30;

const CONFETTI_COLORS = [
  "#ef4444", // red
  "#14b8a6", // teal
  "#facc15", // yellow
  "#34d399", // mint
  "#f97316", // coral
  "#a855f7", // purple
  "#ec4899", // pink
  "#38bdf8", // light blue
] as const;

const COLORS = {
  // Alarm state
  alarm: {
    titleBarGradient: "linear-gradient(180deg, #ef4444 0%, #b91c1c 100%)",
    background: "#d4c8b8",
    border: "#b91c1c",
    accentGradient: "linear-gradient(90deg, #b91c1c 0%, #ef4444 50%, #b91c1c 100%)",
    warningText: "#b91c1c",
    actionText: "#7f1d1d",
    actionUnderline: "#991b1b",
    bodyText: "#57534e",
  },
  // Success state
  success: {
    titleBarGradient: "linear-gradient(180deg, #22c55e 0%, #15803d 100%)",
    background: "#dcfce7",
    border: "#15803d",
    accentGradient: "linear-gradient(90deg, #15803d 0%, #22c55e 50%, #15803d 100%)",
    titleText: "#15803d",
    bodyText: "#166534",
  },
  // Button area
  button: {
    background: "#c8b8a8",
    border: "#a8a098",
    buttonBg: "#e8e0d8",
    buttonText: "#1c1917",
  },
} as const;

// ============================================
// Types
// ============================================

interface PlantAlarmNotificationProps {
  isVisible: boolean;
  onDismiss: () => void;
}

interface ConfettiParticleProps {
  color: string;
  x: number;
  y: number;
  delay: number;
}

// ============================================
// Pixel Art Icon Components
// ============================================

const pixelArtStyle = { imageRendering: "pixelated" as const };

function AngryPlantIcon() {
  return (
    <svg
      width="64"
      height="80"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={pixelArtStyle}
      shapeRendering="crispEdges"
    >
      {/* Pot */}
      <rect x="4" y="15" width="8" height="5" fill="#d97706" />
      <rect x="3" y="15" width="10" height="1" fill="#f59e0b" />
      <rect x="5" y="16" width="6" height="1" fill="#b45309" />
      {/* Stem */}
      <rect x="7" y="12" width="2" height="3" fill="#15803d" />
      {/* Plant body */}
      <rect x="5" y="5" width="6" height="7" fill="#dc2626" />
      <rect x="4" y="6" width="1" height="5" fill="#dc2626" />
      <rect x="11" y="6" width="1" height="5" fill="#dc2626" />
      <rect x="3" y="7" width="1" height="3" fill="#b91c1c" />
      <rect x="12" y="7" width="1" height="3" fill="#b91c1c" />
      {/* Spiky leaves */}
      <rect x="6" y="3" width="1" height="2" fill="#16a34a" />
      <rect x="9" y="3" width="1" height="2" fill="#16a34a" />
      <rect x="5" y="2" width="1" height="2" fill="#15803d" />
      <rect x="10" y="2" width="1" height="2" fill="#15803d" />
      <rect x="4" y="1" width="1" height="2" fill="#16a34a" />
      <rect x="11" y="1" width="1" height="2" fill="#16a34a" />
      <rect x="3" y="0" width="1" height="2" fill="#15803d" />
      <rect x="12" y="0" width="1" height="2" fill="#15803d" />
      {/* Angry eyes */}
      <rect x="5" y="7" width="2" height="2" fill="#ffffff" />
      <rect x="9" y="7" width="2" height="2" fill="#ffffff" />
      <rect x="5" y="8" width="1" height="1" fill="#1a1a1a" />
      <rect x="10" y="8" width="1" height="1" fill="#1a1a1a" />
      {/* Angry eyebrows */}
      <rect x="4" y="6" width="2" height="1" fill="#1a1a1a" />
      <rect x="10" y="6" width="2" height="1" fill="#1a1a1a" />
      {/* Angry mouth */}
      <rect x="6" y="10" width="4" height="2" fill="#1a1a1a" />
      <rect x="7" y="10" width="2" height="1" fill="#fca5a5" />
    </svg>
  );
}

function HappyPlantIcon() {
  return (
    <svg
      width="52"
      height="65"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={pixelArtStyle}
      shapeRendering="crispEdges"
    >
      {/* Pot */}
      <rect x="4" y="15" width="8" height="5" fill="#d97706" />
      <rect x="3" y="15" width="10" height="1" fill="#f59e0b" />
      <rect x="5" y="16" width="6" height="1" fill="#b45309" />
      {/* Stem */}
      <rect x="7" y="12" width="2" height="3" fill="#15803d" />
      {/* Plant body */}
      <rect x="5" y="5" width="6" height="7" fill="#22c55e" />
      <rect x="4" y="6" width="1" height="5" fill="#22c55e" />
      <rect x="11" y="6" width="1" height="5" fill="#22c55e" />
      <rect x="3" y="7" width="1" height="3" fill="#16a34a" />
      <rect x="12" y="7" width="1" height="3" fill="#16a34a" />
      {/* Flowers */}
      <rect x="5" y="2" width="2" height="2" fill="#f472b6" />
      <rect x="6" y="1" width="1" height="1" fill="#f9a8d4" />
      <rect x="5" y="3" width="1" height="1" fill="#db2777" />
      <rect x="9" y="2" width="2" height="2" fill="#f472b6" />
      <rect x="10" y="1" width="1" height="1" fill="#f9a8d4" />
      <rect x="10" y="3" width="1" height="1" fill="#db2777" />
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
      {/* Happy smile - curved smile shape */}
      <rect x="6" y="10" width="4" height="1" fill="#1a1a1a" />
      <rect x="5" y="9" width="1" height="1" fill="#1a1a1a" />
      <rect x="10" y="9" width="1" height="1" fill="#1a1a1a" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={pixelArtStyle}
      shapeRendering="crispEdges"
    >
      {/* Yellow triangle */}
      <polygon points="8,1 15,14 1,14" fill="#facc15" />
      <polygon points="8,2 14,13 2,13" fill="#fde047" />
      {/* Border */}
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

function CheckmarkIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={pixelArtStyle}
      shapeRendering="crispEdges"
    >
      {/* Green circle background */}
      <rect x="4" y="1" width="8" height="1" fill="#22c55e" />
      <rect x="2" y="2" width="12" height="1" fill="#22c55e" />
      <rect x="1" y="3" width="14" height="1" fill="#22c55e" />
      <rect x="1" y="4" width="14" height="8" fill="#22c55e" />
      <rect x="1" y="12" width="14" height="1" fill="#22c55e" />
      <rect x="2" y="13" width="12" height="1" fill="#22c55e" />
      <rect x="4" y="14" width="8" height="1" fill="#22c55e" />
      {/* White checkmark */}
      <rect x="3" y="7" width="2" height="2" fill="#ffffff" />
      <rect x="5" y="9" width="2" height="2" fill="#ffffff" />
      <rect x="7" y="7" width="2" height="2" fill="#ffffff" />
      <rect x="9" y="5" width="2" height="2" fill="#ffffff" />
      <rect x="11" y="3" width="2" height="2" fill="#ffffff" />
    </svg>
  );
}

// ============================================
// Confetti Component
// ============================================

function ConfettiParticle({ color, x, y, delay }: ConfettiParticleProps) {
  return (
    <div
      className="confetti-particle"
      style={{
        "--x": `${x}px`,
        "--y": `${y}px`,
        "--delay": `${delay}ms`,
        backgroundColor: color,
      } as React.CSSProperties}
    />
  );
}

function generateConfettiParticles() {
  const particles: ConfettiParticleProps[] = [];
  for (let i = 0; i < CONFETTI_PARTICLE_COUNT; i++) {
    const angle = (i / CONFETTI_PARTICLE_COUNT) * 360 + Math.random() * 30;
    const radians = (angle * Math.PI) / 180;
    const distance = 150 + Math.random() * 100;
    particles.push({
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      x: Math.cos(radians) * distance,
      y: Math.sin(radians) * distance,
      delay: Math.random() * 200,
    });
  }
  return particles;
}

// ============================================
// Main Component
// ============================================

export function PlantAlarmNotification({
  isVisible,
  onDismiss,
}: PlantAlarmNotificationProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [isWatered, setIsWatered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Generate confetti particles once when confetti is shown
  const confettiParticles = useMemo(
    () => (showConfetti ? generateConfettiParticles() : []),
    [showConfetti]
  );

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle visibility changes
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isVisible) {
      setIsWatered(false);
      setShowConfetti(false);
      setShouldRender(true);
      setAnimationClass("alarm-slide-in");
    } else {
      setShouldRender(false);
      setAnimationClass("");
      setIsWatered(false);
      setShowConfetti(false);
    }
  }, [isVisible]);

  const handleWaterClick = useCallback(() => {
    setIsWatered(true);
    setShowConfetti(true);

    // Animate out after success state duration
    timeoutRef.current = setTimeout(() => {
      setAnimationClass("alarm-slide-out");

      timeoutRef.current = setTimeout(() => {
        setShouldRender(false);
        setAnimationClass("");
        setIsWatered(false);
        setShowConfetti(false);
        onDismiss();
      }, ANIMATION_DURATION);
    }, SUCCESS_STATE_DURATION);
  }, [onDismiss]);

  if (!shouldRender) {
    return null;
  }

  const colors = isWatered ? COLORS.success : COLORS.alarm;

  return (
    <div
      className={`fixed inset-0 z-[9500] flex items-center justify-center ${animationClass}`}
      style={{ pointerEvents: "auto", paddingBottom: "96px" }}
    >
      {/* Confetti */}
      {showConfetti && (
        <div className="confetti-container">
          {confettiParticles.map((particle, i) => (
            <ConfettiParticle key={i} {...particle} />
          ))}
        </div>
      )}

      {/* Notification container */}
      <div
        className="win98-border-raised"
        style={{
          backgroundColor: isWatered ? COLORS.success.background : COLORS.alarm.background,
          padding: "2px",
          width: isWatered ? "280px" : "520px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          transform: isWatered ? "scale(1.15)" : "none",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-2 py-1"
          style={{
            background: isWatered
              ? COLORS.success.titleBarGradient
              : COLORS.alarm.titleBarGradient,
          }}
        >
          {isWatered ? <CheckmarkIcon /> : <WarningIcon />}
          <span
            className="font-bold text-white tracking-wide uppercase"
            style={{ textShadow: "1px 1px 0px #1a1a1a", fontSize: "12px" }}
          >
            {isWatered ? "Plants Watered!" : "Plants Alarm"}
          </span>
        </div>

        {/* Content area */}
        <div
          className="px-3 py-2"
          style={{
            backgroundColor: isWatered ? COLORS.success.background : COLORS.alarm.background,
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          {isWatered ? (
            <div className="flex items-center gap-3">
              <HappyPlantIcon />
              <div>
                <div
                  className="font-bold"
                  style={{ color: COLORS.success.titleText, fontSize: "16px" }}
                >
                  Watered!
                </div>
                <div
                  className="mt-1"
                  style={{ color: COLORS.success.bodyText, fontSize: "12px" }}
                >
                  The beanfang plants are happy now.
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Warning header */}
              <div className="flex items-baseline gap-3 mb-1">
                <span
                  className="font-bold"
                  style={{ color: COLORS.alarm.warningText, fontSize: "26px" }}
                >
                  WARNING!
                </span>
                <span
                  className="font-semibold"
                  style={{
                    color: COLORS.alarm.actionText,
                    fontSize: "16px",
                    borderBottom: `2px solid ${COLORS.alarm.actionUnderline}`,
                    paddingBottom: "1px",
                  }}
                >
                  Water the exploding beanfang plants!
                </span>
              </div>
              {/* Icon and body text */}
              <div className="flex items-start gap-4 mt-2">
                <div className="flex-shrink-0">
                  <AngryPlantIcon />
                </div>
                <div
                  className="leading-relaxed pt-1"
                  style={{
                    color: COLORS.alarm.bodyText,
                    fontSize: "12px",
                    fontStyle: "italic",
                  }}
                >
                  You know what happens when you forget.. we can&apos;t have
                  another incident report like that on our record so soon.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Button area */}
        {!isWatered && (
          <div
            className="px-4 py-2 flex justify-center"
            style={{
              backgroundColor: COLORS.button.background,
              borderTop: `2px solid ${COLORS.button.border}`,
            }}
          >
            <button
              onClick={handleWaterClick}
              className="win98-border-raised px-12 py-1.5 font-bold cursor-pointer hover:brightness-95 active:win98-border-pressed"
              style={{
                backgroundColor: COLORS.button.buttonBg,
                color: COLORS.button.buttonText,
                fontSize: "13px",
              }}
            >
              Water Plants Remotely
            </button>
          </div>
        )}

        {/* Bottom accent bar */}
        <div
          style={{
            height: "3px",
            background: isWatered
              ? COLORS.success.accentGradient
              : COLORS.alarm.accentGradient,
          }}
        />
      </div>
    </div>
  );
}
