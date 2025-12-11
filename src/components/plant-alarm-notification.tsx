"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ============================================
// Constants
// ============================================

const ANIMATION_DURATION_MS = 400;
const SUCCESS_STATE_DURATION_MS = 2000;
const CONFETTI_PARTICLE_COUNT = 30;
const POPUP_VERTICAL_OFFSET = "96px";

// Alarm sound configuration
const ALARM_FREQUENCY_HIGH = 880; // Hz - A5 note
const ALARM_FREQUENCY_LOW = 440; // Hz - A4 note
const ALARM_BEEP_DURATION = 150; // ms
const ALARM_VOLUME = 0.15;

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
  success: {
    titleBarGradient: "linear-gradient(180deg, #22c55e 0%, #15803d 100%)",
    background: "#dcfce7",
    border: "#15803d",
    accentGradient: "linear-gradient(90deg, #15803d 0%, #22c55e 50%, #15803d 100%)",
    titleText: "#15803d",
    bodyText: "#166534",
  },
  button: {
    background: "#c8b8a8",
    border: "#a8a098",
    buttonBg: "#e8e0d8",
    buttonText: "#1c1917",
  },
  common: {
    black: "#1a1a1a",
    white: "#ffffff",
  },
} as const;

const WINDOW_WIDTH = {
  alarm: "520px",
  success: "280px",
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
  startX: number;
  startY: number;
  delay: number;
}

// ============================================
// Alarm Sound Hook
// ============================================

function useAlarmSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef(false);

  const playBeep = useCallback((frequency: number) => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    gainNode.gain.setValueAtTime(ALARM_VOLUME, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      ctx.currentTime + ALARM_BEEP_DURATION / 1000
    );

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + ALARM_BEEP_DURATION / 1000);
  }, []);

  const startAlarm = useCallback(() => {
    if (isPlayingRef.current) return;

    // Create audio context on user interaction or when alarm starts
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    // Resume context if suspended (browser autoplay policy)
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }

    isPlayingRef.current = true;
    let isHigh = true;

    // Play alternating beeps
    const playAlarmPattern = () => {
      if (!isPlayingRef.current) return;
      playBeep(isHigh ? ALARM_FREQUENCY_HIGH : ALARM_FREQUENCY_LOW);
      isHigh = !isHigh;
    };

    // Start immediately
    playAlarmPattern();

    // Continue pattern
    intervalRef.current = setInterval(playAlarmPattern, ALARM_BEEP_DURATION * 2);
  }, [playBeep]);

  const stopAlarm = useCallback(() => {
    isPlayingRef.current = false;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAlarm();
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [stopAlarm]);

  return { startAlarm, stopAlarm };
}

// ============================================
// Shared Styles
// ============================================

const pixelArtSvgProps = {
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  style: { imageRendering: "pixelated" as const },
  shapeRendering: "crispEdges" as const,
};

const titleTextStyle = {
  textShadow: `1px 1px 0px ${COLORS.common.black}`,
  fontSize: "12px",
};

// ============================================
// Pixel Art Icon Components
// ============================================

function AngryPlantIcon() {
  return (
    <svg width="64" height="80" viewBox="0 0 16 20" {...pixelArtSvgProps}>
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
      <rect x="5" y="7" width="2" height="2" fill={COLORS.common.white} />
      <rect x="9" y="7" width="2" height="2" fill={COLORS.common.white} />
      <rect x="5" y="8" width="1" height="1" fill={COLORS.common.black} />
      <rect x="10" y="8" width="1" height="1" fill={COLORS.common.black} />
      {/* Angry eyebrows - angled down toward center */}
      <rect x="4" y="5" width="1" height="1" fill={COLORS.common.black} />
      <rect x="5" y="6" width="1" height="1" fill={COLORS.common.black} />
      <rect x="10" y="6" width="1" height="1" fill={COLORS.common.black} />
      <rect x="11" y="5" width="1" height="1" fill={COLORS.common.black} />
      {/* Angry mouth */}
      <rect x="6" y="10" width="4" height="2" fill={COLORS.common.black} />
      <rect x="7" y="10" width="2" height="1" fill="#fca5a5" />
    </svg>
  );
}

function HappyPlantIcon() {
  return (
    <svg width="52" height="65" viewBox="0 0 16 20" {...pixelArtSvgProps}>
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
      <rect x="5" y="6" width="2" height="2" fill={COLORS.common.black} />
      <rect x="9" y="6" width="2" height="2" fill={COLORS.common.black} />
      <rect x="6" y="6" width="1" height="1" fill={COLORS.common.white} />
      <rect x="10" y="6" width="1" height="1" fill={COLORS.common.white} />
      {/* Happy smile - small U-shaped curve */}
      <rect x="7" y="10" width="2" height="1" fill={COLORS.common.black} />
      <rect x="6" y="9" width="1" height="1" fill={COLORS.common.black} />
      <rect x="9" y="9" width="1" height="1" fill={COLORS.common.black} />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 16 16" {...pixelArtSvgProps}>
      {/* Yellow triangle */}
      <polygon points="8,1 15,14 1,14" fill="#facc15" />
      <polygon points="8,2 14,13 2,13" fill="#fde047" />
      {/* Border */}
      <rect x="7" y="2" width="2" height="1" fill={COLORS.common.black} />
      <rect x="6" y="3" width="1" height="1" fill={COLORS.common.black} />
      <rect x="9" y="3" width="1" height="1" fill={COLORS.common.black} />
      <rect x="5" y="4" width="1" height="1" fill={COLORS.common.black} />
      <rect x="10" y="4" width="1" height="1" fill={COLORS.common.black} />
      <rect x="4" y="5" width="1" height="2" fill={COLORS.common.black} />
      <rect x="11" y="5" width="1" height="2" fill={COLORS.common.black} />
      <rect x="3" y="7" width="1" height="2" fill={COLORS.common.black} />
      <rect x="12" y="7" width="1" height="2" fill={COLORS.common.black} />
      <rect x="2" y="9" width="1" height="2" fill={COLORS.common.black} />
      <rect x="13" y="9" width="1" height="2" fill={COLORS.common.black} />
      <rect x="1" y="11" width="1" height="2" fill={COLORS.common.black} />
      <rect x="14" y="11" width="1" height="2" fill={COLORS.common.black} />
      <rect x="1" y="13" width="14" height="1" fill={COLORS.common.black} />
      {/* Exclamation mark */}
      <rect x="7" y="5" width="2" height="4" fill={COLORS.common.black} />
      <rect x="7" y="10" width="2" height="2" fill={COLORS.common.black} />
    </svg>
  );
}

function CheckmarkIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 16 16" {...pixelArtSvgProps}>
      {/* Green circle background */}
      <rect x="4" y="1" width="8" height="1" fill="#22c55e" />
      <rect x="2" y="2" width="12" height="1" fill="#22c55e" />
      <rect x="1" y="3" width="14" height="1" fill="#22c55e" />
      <rect x="1" y="4" width="14" height="8" fill="#22c55e" />
      <rect x="1" y="12" width="14" height="1" fill="#22c55e" />
      <rect x="2" y="13" width="12" height="1" fill="#22c55e" />
      <rect x="4" y="14" width="8" height="1" fill="#22c55e" />
      {/* White checkmark */}
      <rect x="3" y="7" width="2" height="2" fill={COLORS.common.white} />
      <rect x="5" y="9" width="2" height="2" fill={COLORS.common.white} />
      <rect x="7" y="7" width="2" height="2" fill={COLORS.common.white} />
      <rect x="9" y="5" width="2" height="2" fill={COLORS.common.white} />
      <rect x="11" y="3" width="2" height="2" fill={COLORS.common.white} />
    </svg>
  );
}

// ============================================
// Confetti
// ============================================

function ConfettiParticle({ color, x, y, startX, startY, delay }: ConfettiParticleProps) {
  return (
    <div
      className="confetti-particle"
      style={
        {
          "--x": `${x}px`,
          "--y": `${y}px`,
          "--start-x": `${startX}px`,
          "--start-y": `${startY}px`,
          "--delay": `${delay}ms`,
          backgroundColor: color,
        } as React.CSSProperties
      }
    />
  );
}

function generateConfettiParticles(): ConfettiParticleProps[] {
  // Window dimensions in success state (280px width * 1.15 scale)
  const windowWidth = 322;
  const windowHeight = 115; // Approximate height scaled
  const halfWidth = windowWidth / 2;
  const halfHeight = windowHeight / 2;

  // Calculate perimeter for distributing particles
  const perimeter = 2 * (windowWidth + windowHeight);

  return Array.from({ length: CONFETTI_PARTICLE_COUNT }, (_, i) => {
    // Distribute particles evenly around the perimeter
    const perimeterPosition = (i / CONFETTI_PARTICLE_COUNT) * perimeter;
    const randomOffset = (Math.random() - 0.5) * 20; // Small random variation

    let startX: number;
    let startY: number;
    let outwardAngle: number;

    if (perimeterPosition < windowWidth) {
      // Top edge
      startX = -halfWidth + perimeterPosition + randomOffset;
      startY = -halfHeight;
      outwardAngle = -90 + (Math.random() - 0.5) * 60; // Upward with spread
    } else if (perimeterPosition < windowWidth + windowHeight) {
      // Right edge
      startX = halfWidth;
      startY = -halfHeight + (perimeterPosition - windowWidth) + randomOffset;
      outwardAngle = 0 + (Math.random() - 0.5) * 60; // Rightward with spread
    } else if (perimeterPosition < 2 * windowWidth + windowHeight) {
      // Bottom edge
      startX = halfWidth - (perimeterPosition - windowWidth - windowHeight) + randomOffset;
      startY = halfHeight;
      outwardAngle = 90 + (Math.random() - 0.5) * 60; // Downward with spread
    } else {
      // Left edge
      startX = -halfWidth;
      startY = halfHeight - (perimeterPosition - 2 * windowWidth - windowHeight) + randomOffset;
      outwardAngle = 180 + (Math.random() - 0.5) * 60; // Leftward with spread
    }

    const radians = (outwardAngle * Math.PI) / 180;
    const distance = 120 + Math.random() * 80;

    return {
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      x: Math.cos(radians) * distance,
      y: Math.sin(radians) * distance,
      startX,
      startY,
      delay: Math.random() * 200,
    };
  });
}

// ============================================
// Content Components
// ============================================

function SuccessContent() {
  return (
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
  );
}

function AlarmContent() {
  return (
    <div>
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
          You know what happens when you forget.. we can&apos;t have another
          incident report like that on our record so soon.
        </div>
      </div>
    </div>
  );
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
  const { startAlarm, stopAlarm } = useAlarmSound();

  const confettiParticles = useMemo(
    () => (showConfetti ? generateConfettiParticles() : []),
    [showConfetti]
  );

  const clearPendingTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const resetState = useCallback(() => {
    setShouldRender(false);
    setAnimationClass("");
    setIsWatered(false);
    setShowConfetti(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => clearPendingTimeout, [clearPendingTimeout]);

  // Handle visibility changes
  useEffect(() => {
    clearPendingTimeout();

    if (isVisible) {
      setIsWatered(false);
      setShowConfetti(false);
      setShouldRender(true);
      setAnimationClass("alarm-slide-in");
      startAlarm();
    } else {
      stopAlarm();
      resetState();
    }
  }, [isVisible, clearPendingTimeout, resetState, startAlarm, stopAlarm]);

  const handleWaterClick = useCallback(() => {
    stopAlarm();
    setIsWatered(true);
    setShowConfetti(true);

    timeoutRef.current = setTimeout(() => {
      setAnimationClass("alarm-slide-out");

      timeoutRef.current = setTimeout(() => {
        resetState();
        onDismiss();
      }, ANIMATION_DURATION_MS);
    }, SUCCESS_STATE_DURATION_MS);
  }, [onDismiss, resetState, stopAlarm]);

  if (!shouldRender) {
    return null;
  }

  const colors = isWatered ? COLORS.success : COLORS.alarm;

  return (
    <div
      className={`fixed inset-0 z-[9500] flex items-center justify-center ${animationClass}`}
      style={{ pointerEvents: "auto", paddingBottom: POPUP_VERTICAL_OFFSET }}
    >
      {showConfetti && (
        <div className="confetti-container">
          {confettiParticles.map((particle, i) => (
            <ConfettiParticle key={i} {...particle} />
          ))}
        </div>
      )}

      <div
        className="win98-border-raised"
        style={{
          backgroundColor: colors.background,
          padding: "2px",
          width: isWatered ? WINDOW_WIDTH.success : WINDOW_WIDTH.alarm,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          transform: isWatered ? "scale(1.15)" : "none",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-2 py-1"
          style={{ background: colors.titleBarGradient }}
        >
          {isWatered ? <CheckmarkIcon /> : <WarningIcon />}
          <span
            className="font-bold text-white tracking-wide uppercase"
            style={titleTextStyle}
          >
            {isWatered ? "Plants Watered!" : "Plants Alarm"}
          </span>
        </div>

        {/* Content area */}
        <div
          className="px-3 py-2"
          style={{
            backgroundColor: colors.background,
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          {isWatered ? <SuccessContent /> : <AlarmContent />}
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
        <div style={{ height: "3px", background: colors.accentGradient }} />
      </div>
    </div>
  );
}
