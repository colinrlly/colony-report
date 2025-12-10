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

// Pixelated sticky note face that changes based on tiredness level (0 = happy, 1 = annoyed, 2 = exhausted)
function StickyNoteFace({ tirednessLevel }: { tirednessLevel: number }) {
  return (
    <svg
      viewBox="0 0 64 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-lg"
      style={{ imageRendering: "pixelated" }}
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
          {/* Happy face - pixelated style */}
          {/* Left eye - pixel blocks */}
          <rect x="16" y="20" width="4" height="4" fill="white" />
          <rect x="20" y="20" width="4" height="4" fill="white" />
          <rect x="16" y="24" width="4" height="4" fill="white" />
          <rect x="20" y="24" width="4" height="4" fill="white" />
          <rect x="16" y="28" width="4" height="4" fill="white" />
          <rect x="20" y="28" width="4" height="4" fill="white" />
          {/* Left pupil */}
          <rect x="18" y="24" width="4" height="4" fill="#333" />

          {/* Right eye - pixel blocks */}
          <rect x="40" y="20" width="4" height="4" fill="white" />
          <rect x="44" y="20" width="4" height="4" fill="white" />
          <rect x="40" y="24" width="4" height="4" fill="white" />
          <rect x="44" y="24" width="4" height="4" fill="white" />
          <rect x="40" y="28" width="4" height="4" fill="white" />
          <rect x="44" y="28" width="4" height="4" fill="white" />
          {/* Right pupil */}
          <rect x="42" y="24" width="4" height="4" fill="#333" />

          {/* Big smile - pixel blocks */}
          <rect x="18" y="40" width="4" height="4" fill="#333" />
          <rect x="22" y="44" width="4" height="4" fill="#333" />
          <rect x="26" y="46" width="4" height="4" fill="#333" />
          <rect x="30" y="46" width="4" height="4" fill="#333" />
          <rect x="34" y="46" width="4" height="4" fill="#333" />
          <rect x="38" y="44" width="4" height="4" fill="#333" />
          <rect x="42" y="40" width="4" height="4" fill="#333" />

          {/* Rosy cheeks - pixel style */}
          <rect x="10" y="34" width="4" height="4" fill="#FFB6C1" opacity="0.7" />
          <rect x="14" y="34" width="4" height="4" fill="#FFB6C1" opacity="0.7" />
          <rect x="46" y="34" width="4" height="4" fill="#FFB6C1" opacity="0.7" />
          <rect x="50" y="34" width="4" height="4" fill="#FFB6C1" opacity="0.7" />
        </>
      )}

      {tirednessLevel === 1 && (
        <>
          {/* Annoyed face - half-lidded eyes */}
          {/* Left eye - smaller, half closed */}
          <rect x="16" y="24" width="4" height="4" fill="white" />
          <rect x="20" y="24" width="4" height="4" fill="white" />
          <rect x="16" y="28" width="4" height="4" fill="white" />
          <rect x="20" y="28" width="4" height="4" fill="white" />
          {/* Left pupil */}
          <rect x="18" y="26" width="4" height="4" fill="#333" />
          {/* Eyelid */}
          <rect x="14" y="22" width="14" height="4" fill="#E6CF5C" />

          {/* Right eye - smaller, half closed */}
          <rect x="40" y="24" width="4" height="4" fill="white" />
          <rect x="44" y="24" width="4" height="4" fill="white" />
          <rect x="40" y="28" width="4" height="4" fill="white" />
          <rect x="44" y="28" width="4" height="4" fill="white" />
          {/* Right pupil */}
          <rect x="42" y="26" width="4" height="4" fill="#333" />
          {/* Eyelid */}
          <rect x="38" y="22" width="14" height="4" fill="#E6CF5C" />

          {/* Flat/slight frown - pixel blocks */}
          <rect x="20" y="44" width="4" height="4" fill="#333" />
          <rect x="24" y="46" width="4" height="4" fill="#333" />
          <rect x="28" y="46" width="4" height="4" fill="#333" />
          <rect x="32" y="46" width="4" height="4" fill="#333" />
          <rect x="36" y="46" width="4" height="4" fill="#333" />
          <rect x="40" y="44" width="4" height="4" fill="#333" />
        </>
      )}

      {tirednessLevel === 2 && (
        <>
          {/* Exhausted face - nearly closed eyes, frown */}
          {/* Left eye - nearly closed, just a slit */}
          <rect x="16" y="26" width="4" height="4" fill="white" />
          <rect x="20" y="26" width="4" height="4" fill="white" />
          {/* Left pupil - tiny */}
          <rect x="18" y="26" width="4" height="2" fill="#333" />
          {/* Heavy eyelid */}
          <rect x="14" y="22" width="14" height="6" fill="#E6CF5C" />

          {/* Right eye - nearly closed, just a slit */}
          <rect x="40" y="26" width="4" height="4" fill="white" />
          <rect x="44" y="26" width="4" height="4" fill="white" />
          {/* Right pupil - tiny */}
          <rect x="42" y="26" width="4" height="2" fill="#333" />
          {/* Heavy eyelid */}
          <rect x="38" y="22" width="14" height="6" fill="#E6CF5C" />

          {/* Frown - pixel blocks */}
          <rect x="20" y="48" width="4" height="4" fill="#333" />
          <rect x="24" y="46" width="4" height="4" fill="#333" />
          <rect x="28" y="44" width="4" height="4" fill="#333" />
          <rect x="32" y="44" width="4" height="4" fill="#333" />
          <rect x="36" y="46" width="4" height="4" fill="#333" />
          <rect x="40" y="48" width="4" height="4" fill="#333" />

          {/* Sweat drop - pixel style */}
          <rect x="52" y="14" width="4" height="4" fill="#87CEEB" />
          <rect x="52" y="18" width="4" height="4" fill="#87CEEB" />
          <rect x="50" y="22" width="4" height="4" fill="#87CEEB" />
          <rect x="54" y="22" width="4" height="4" fill="#87CEEB" />
          <rect x="52" y="26" width="4" height="4" fill="#87CEEB" />

          {/* Bags under eyes - pixel style */}
          <rect x="16" y="32" width="8" height="2" fill="#D4B800" opacity="0.4" />
          <rect x="40" y="32" width="8" height="2" fill="#D4B800" opacity="0.4" />
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
      {/* Speech Bubble - positioned above sticky note */}
      <div className="relative bg-[#ffffcc] border-2 border-black rounded-lg p-3 max-w-[240px] shadow-lg mb-1 mr-2">
        <p className="text-sm text-black font-sans">{message}</p>
        {/* Speech bubble tail pointing down */}
        <div
          className="absolute -bottom-2 right-6 w-4 h-4 bg-[#ffffcc] border-r-2 border-b-2 border-black"
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
