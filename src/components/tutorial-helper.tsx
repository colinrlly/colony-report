"use client";

import { useEffect, useState } from "react";

interface TutorialHelperProps {
  clickCount: number;
  onAnimationComplete: () => void;
}

const messages = [
  "First time using a computer? Try clicking around!",
  "Seriously…? Just try opening a folder.",
];

export function TutorialHelper({ clickCount, onAnimationComplete }: TutorialHelperProps) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Get message based on click count (alternates between the two)
  const messageIndex = (clickCount - 1) % messages.length;
  const message = messages[messageIndex];

  useEffect(() => {
    // Small delay before showing to ensure animation plays
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    // Start animating out after showing the message
    const hideTimer = setTimeout(() => {
      setIsAnimatingOut(true);
    }, 3500);

    // Complete animation and notify parent
    const completeTimer = setTimeout(() => {
      onAnimationComplete();
    }, 4500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(completeTimer);
    };
  }, [onAnimationComplete]);

  return (
    <div
      className={`fixed bottom-[60px] right-4 z-[1000] flex items-end gap-2 transition-transform duration-500 ease-out ${
        isVisible && !isAnimatingOut
          ? "translate-x-0"
          : isAnimatingOut
          ? "translate-x-[400px]"
          : "translate-x-[400px]"
      }`}
    >
      {/* Speech Bubble */}
      <div className="relative bg-[#ffffcc] border-2 border-black rounded-lg p-3 max-w-[220px] shadow-lg mb-8">
        <p className="text-sm text-black font-sans">{message}</p>
        {/* Speech bubble tail */}
        <div
          className="absolute -bottom-2 right-8 w-4 h-4 bg-[#ffffcc] border-r-2 border-b-2 border-black"
          style={{ transform: "rotate(45deg)" }}
        />
      </div>

      {/* Clippy-like Paperclip Character */}
      <div className="relative w-[80px] h-[120px] flex-shrink-0">
        <svg
          viewBox="0 0 80 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-lg"
        >
          {/* Paperclip body - bent wire shape */}
          <path
            d="M25 110
               L25 30
               Q25 15 40 15
               Q55 15 55 30
               L55 90
               Q55 100 45 100
               Q35 100 35 90
               L35 40
               Q35 35 40 35
               Q45 35 45 40
               L45 75"
            stroke="#C0C0C0"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          {/* Metallic highlight */}
          <path
            d="M25 110
               L25 30
               Q25 15 40 15
               Q55 15 55 30
               L55 90
               Q55 100 45 100
               Q35 100 35 90
               L35 40
               Q35 35 40 35
               Q45 35 45 40
               L45 75"
            stroke="#E8E8E8"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Eyes - big and googly */}
          {/* Left eye white */}
          <ellipse cx="32" cy="50" rx="10" ry="12" fill="white" stroke="#333" strokeWidth="2" />
          {/* Left eye pupil */}
          <circle cx="34" cy="52" r="5" fill="#333" />
          {/* Left eye highlight */}
          <circle cx="32" cy="49" r="2" fill="white" />

          {/* Right eye white */}
          <ellipse cx="52" cy="50" rx="10" ry="12" fill="white" stroke="#333" strokeWidth="2" />
          {/* Right eye pupil */}
          <circle cx="54" cy="52" r="5" fill="#333" />
          {/* Right eye highlight */}
          <circle cx="52" cy="49" r="2" fill="white" />

          {/* Eyebrows - slightly raised, friendly */}
          <path d="M24 38 Q32 34 40 38" stroke="#666" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M44 38 Q52 34 60 38" stroke="#666" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Smile */}
          <path d="M35 68 Q42 76 50 68" stroke="#333" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    </div>
  );
}
