"use client";

import { useEffect, useState } from "react";

interface TutorialHelperProps {
  clickCount: number;
  onAnimationComplete: () => void;
}

const messages = [
  "First time using a computer? Try clicking around!",
  "Seriously…? Just try opening a folder.",
  "Please don't make me come back here.. I'm TIRED. Open a folder",
];

// Sticky note with smooth face expressions (no eyebrows)
function StickyNoteFace({ tirednessLevel }: { tirednessLevel: number }) {
  return (
    <svg
      viewBox="0 0 64 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-lg"
    >
      {/* Sticky note body */}
      <rect x="2" y="2" width="60" height="60" fill="#FFE566" stroke="#D4B800" strokeWidth="2" />

      {/* Folded corner */}
      <polygon points="48,62 62,62 62,48" fill="#E6CF5C" stroke="#D4B800" strokeWidth="1" />
      <polygon points="48,62 62,48 48,48" fill="#FFF2A3" />

      {/* Shadow under fold */}
      <polygon points="48,62 62,62 62,60 50,60" fill="#D4B800" opacity="0.3" />

      {tirednessLevel === 0 && (
        <>
          {/* Happy face - smooth style, no eyebrows */}
          {/* Left eye */}
          <ellipse cx="22" cy="26" rx="5" ry="7" fill="white" stroke="#333" strokeWidth="1.5" />
          <circle cx="23" cy="27" r="3.5" fill="#333" />
          <circle cx="21" cy="25" r="1.5" fill="white" />

          {/* Right eye */}
          <ellipse cx="42" cy="26" rx="5" ry="7" fill="white" stroke="#333" strokeWidth="1.5" />
          <circle cx="43" cy="27" r="3.5" fill="#333" />
          <circle cx="41" cy="25" r="1.5" fill="white" />

          {/* Big smile */}
          <path d="M18 42 Q32 54 46 42" stroke="#333" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      )}

      {tirednessLevel === 1 && (
        <>
          {/* Annoyed face - half-lidded eyes, no eyebrows */}
          {/* Left eye - half closed */}
          <ellipse cx="22" cy="28" rx="5" ry="4" fill="white" stroke="#333" strokeWidth="1.5" />
          <circle cx="22" cy="29" r="2.5" fill="#333" />
          {/* Eyelid */}
          <path d="M17 26 Q22 22 27 26" fill="#FFE566" stroke="#D4B800" strokeWidth="1" />

          {/* Right eye - half closed */}
          <ellipse cx="42" cy="28" rx="5" ry="4" fill="white" stroke="#333" strokeWidth="1.5" />
          <circle cx="42" cy="29" r="2.5" fill="#333" />
          {/* Eyelid */}
          <path d="M37 26 Q42 22 47 26" fill="#FFE566" stroke="#D4B800" strokeWidth="1" />

          {/* Flat/slight frown */}
          <path d="M22 44 Q32 40 42 44" stroke="#333" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      )}

      {tirednessLevel === 2 && (
        <>
          {/* Exhausted face - droopy eyes, frown, no eyebrows */}
          {/* Left eye - nearly closed, droopy */}
          <ellipse cx="22" cy="30" rx="5" ry="2.5" fill="white" stroke="#333" strokeWidth="1.5" />
          <circle cx="22" cy="30" r="1.5" fill="#333" />
          {/* Heavy eyelid */}
          <path d="M17 28 Q22 24 27 28" fill="#FFE566" stroke="#D4B800" strokeWidth="1.5" />

          {/* Right eye - nearly closed, droopy */}
          <ellipse cx="42" cy="30" rx="5" ry="2.5" fill="white" stroke="#333" strokeWidth="1.5" />
          <circle cx="42" cy="30" r="1.5" fill="#333" />
          {/* Heavy eyelid */}
          <path d="M37 28 Q42 24 47 28" fill="#FFE566" stroke="#D4B800" strokeWidth="1.5" />

          {/* Frown */}
          <path d="M22 48 Q32 42 42 48" stroke="#333" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Sweat drop */}
          <ellipse cx="56" cy="22" rx="3" ry="5" fill="#87CEEB" />
          <circle cx="56" cy="18" r="2.5" fill="#87CEEB" />

          {/* Bags under eyes */}
          <path d="M17 34 Q22 36 27 34" stroke="#D4B800" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
          <path d="M37 34 Q42 36 47 34" stroke="#D4B800" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
        </>
      )}
    </svg>
  );
}

export function TutorialHelper({ clickCount, onAnimationComplete }: TutorialHelperProps) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Get message based on click count (cycles through 3 messages)
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
      className={`fixed bottom-[60px] right-4 z-[1000] flex flex-col items-end transition-transform duration-500 ease-out ${
        isVisible && !isAnimatingOut
          ? "translate-x-0"
          : isAnimatingOut
          ? "translate-x-[400px]"
          : "translate-x-[400px]"
      }`}
    >
      {/* Speech Bubble - floating above and to the left */}
      <div className="relative bg-[#ffffcc] border-2 border-black rounded-lg p-3 max-w-[240px] shadow-lg mb-4 mr-12">
        <p className="text-sm text-black font-sans">{message}</p>
        {/* Speech bubble tail pointing down-right toward character */}
        <div
          className="absolute -bottom-2 right-4 w-4 h-4 bg-[#ffffcc] border-r-2 border-b-2 border-black"
          style={{ transform: "rotate(45deg)" }}
        />
      </div>

      {/* Sticky Note Character */}
      <div className="relative w-[80px] h-[90px] flex-shrink-0">
        <StickyNoteFace tirednessLevel={messageIndex} />
      </div>
    </div>
  );
}
