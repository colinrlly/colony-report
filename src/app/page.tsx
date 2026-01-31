"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isEnteringAnimation, setIsEnteringAnimation] = useState(false);
  const [showEntryFlicker, setShowEntryFlicker] = useState(false);

  // Entry animation timing constants (sync with CSS durations)
  const ZOOM_DURATION = 600;
  const ENTRY_FLICKER_DURATION = 200;

  // Handle entry animation sequence
  const handleMonitorClick = useCallback(() => {
    if (isEnteringAnimation) return;

    setIsEnteringAnimation(true);

    // Sequence: zoom → entry flicker → navigate to desktop
    setTimeout(() => {
      setShowEntryFlicker(true);

      setTimeout(() => {
        // Navigate to desktop route
        router.push('/desktop');
      }, ENTRY_FLICKER_DURATION);
    }, ZOOM_DURATION);
  }, [isEnteringAnimation, router]);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <img
        src="/images/computer scene 1.jpg"
        alt="Computer workstation"
        className={`w-full h-full object-cover select-none ${isEnteringAnimation ? 'entry-zoom' : ''}`}
        draggable={false}
      />
      {/* Clickable zone over the monitor screen */}
      <button
        onClick={handleMonitorClick}
        className={`absolute outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm ${isEnteringAnimation ? 'pointer-events-none' : 'cursor-pointer'}`}
        style={{ left: '45%', top: '13%', width: '30%', height: '52%' }}
        aria-label="Click monitor to enter"
      />
      {/* Screen flicker overlay after zoom */}
      {showEntryFlicker && (
        <div className="fixed inset-0 bg-black entry-flicker" />
      )}
    </div>
  );
}
