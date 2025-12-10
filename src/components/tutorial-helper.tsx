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

// Face component that changes based on tiredness level (0 = happy, 1 = annoyed, 2 = exhausted)
function HelperFace({ tirednessLevel }: { tirednessLevel: number }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-lg"
    >
      {/* Yellow circle face */}
      <circle cx="40" cy="40" r="36" fill="#FFD93D" stroke="#E6B800" strokeWidth="3" />

      {tirednessLevel === 0 && (
        <>
          {/* Happy face - bright eyes, smile */}
          {/* Left eye */}
          <ellipse cx="28" cy="32" rx="6" ry="8" fill="white" stroke="#333" strokeWidth="1.5" />
          <circle cx="29" cy="33" r="4" fill="#333" />
          <circle cx="27" cy="31" r="1.5" fill="white" />

          {/* Right eye */}
          <ellipse cx="52" cy="32" rx="6" ry="8" fill="white" stroke="#333" strokeWidth="1.5" />
          <circle cx="53" cy="33" r="4" fill="#333" />
          <circle cx="51" cy="31" r="1.5" fill="white" />

          {/* Raised eyebrows - friendly */}
          <path d="M20 24 Q28 20 36 24" stroke="#996600" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M44 24 Q52 20 60 24" stroke="#996600" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Big smile */}
          <path d="M24 50 Q40 65 56 50" stroke="#333" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Rosy cheeks */}
          <circle cx="18" cy="45" r="5" fill="#FFB6C1" opacity="0.6" />
          <circle cx="62" cy="45" r="5" fill="#FFB6C1" opacity="0.6" />
        </>
      )}

      {tirednessLevel === 1 && (
        <>
          {/* Annoyed face - half-lidded eyes, flat mouth */}
          {/* Left eye - half closed */}
          <ellipse cx="28" cy="34" rx="6" ry="5" fill="white" stroke="#333" strokeWidth="1.5" />
          <circle cx="28" cy="35" r="3" fill="#333" />
          {/* Eyelid */}
          <path d="M22 32 Q28 28 34 32" fill="#FFD93D" stroke="#E6B800" strokeWidth="1" />

          {/* Right eye - half closed */}
          <ellipse cx="52" cy="34" rx="6" ry="5" fill="white" stroke="#333" strokeWidth="1.5" />
          <circle cx="52" cy="35" r="3" fill="#333" />
          {/* Eyelid */}
          <path d="M46 32 Q52 28 58 32" fill="#FFD93D" stroke="#E6B800" strokeWidth="1" />

          {/* Furrowed eyebrows - annoyed */}
          <path d="M20 26 Q28 28 36 24" stroke="#996600" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M44 24 Q52 28 60 26" stroke="#996600" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Flat/slight frown */}
          <path d="M28 52 Q40 48 52 52" stroke="#333" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      )}

      {tirednessLevel === 2 && (
        <>
          {/* Exhausted face - droopy eyes, frown, sweat drop */}
          {/* Left eye - nearly closed, droopy */}
          <ellipse cx="28" cy="36" rx="6" ry="3" fill="white" stroke="#333" strokeWidth="1.5" />
          <circle cx="28" cy="36" r="2" fill="#333" />
          {/* Heavy eyelid */}
          <path d="M22 34 Q28 30 34 34" fill="#FFD93D" stroke="#E6B800" strokeWidth="1.5" />

          {/* Right eye - nearly closed, droopy */}
          <ellipse cx="52" cy="36" rx="6" ry="3" fill="white" stroke="#333" strokeWidth="1.5" />
          <circle cx="52" cy="36" r="2" fill="#333" />
          {/* Heavy eyelid */}
          <path d="M46 34 Q52 30 58 34" fill="#FFD93D" stroke="#E6B800" strokeWidth="1.5" />

          {/* Very furrowed/tired eyebrows */}
          <path d="M18 28 Q28 32 36 26" stroke="#996600" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M44 26 Q52 32 62 28" stroke="#996600" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Frown */}
          <path d="M28 56 Q40 50 52 56" stroke="#333" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Sweat drop */}
          <ellipse cx="66" cy="28" rx="4" ry="6" fill="#87CEEB" />
          <circle cx="66" cy="24" r="3" fill="#87CEEB" />

          {/* Bags under eyes */}
          <path d="M22 40 Q28 42 34 40" stroke="#D4A84B" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
          <path d="M46 40 Q52 42 58 40" stroke="#D4A84B" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
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
      className={`fixed bottom-[60px] right-4 z-[1000] flex items-end gap-2 transition-transform duration-500 ease-out ${
        isVisible && !isAnimatingOut
          ? "translate-x-0"
          : isAnimatingOut
          ? "translate-x-[400px]"
          : "translate-x-[400px]"
      }`}
    >
      {/* Speech Bubble */}
      <div className="relative bg-[#ffffcc] border-2 border-black rounded-lg p-3 max-w-[240px] shadow-lg mb-4">
        <p className="text-sm text-black font-sans">{message}</p>
        {/* Speech bubble tail */}
        <div
          className="absolute -bottom-2 right-8 w-4 h-4 bg-[#ffffcc] border-r-2 border-b-2 border-black"
          style={{ transform: "rotate(45deg)" }}
        />
      </div>

      {/* Smiley Face Character */}
      <div className="relative w-[80px] h-[80px] flex-shrink-0">
        <HelperFace tirednessLevel={messageIndex} />
      </div>
    </div>
  );
}
