"use client";

import { useState, useCallback, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isExiting = searchParams.get('exiting') === 'true';
  const hasHandledExit = useRef(false);

  const [isEnteringAnimation, setIsEnteringAnimation] = useState(false);
  const [showEntryFlicker, setShowEntryFlicker] = useState(false);
  const [isExitAnimation, setIsExitAnimation] = useState(isExiting);
  const [showExitFlicker, setShowExitFlicker] = useState(isExiting);

  // Entry animation timing constants (sync with CSS durations)
  const ZOOM_DURATION = 600;
  const ENTRY_FLICKER_DURATION = 200;

  // Handle exit animation timing
  useEffect(() => {
    if (isExiting && !hasHandledExit.current) {
      hasHandledExit.current = true;

      // Remove the query param from URL without triggering navigation
      setTimeout(() => {
        setShowExitFlicker(false);
        window.history.replaceState({}, '', '/');
      }, 200);

      // End exit animation after zoom completes
      setTimeout(() => {
        setIsExitAnimation(false);
      }, ZOOM_DURATION + 200);
    }
  }, [isExiting]);

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

  // Determine which animation class to use
  const getAnimationClass = () => {
    if (isEnteringAnimation) return 'entry-zoom';
    if (isExitAnimation) return 'exit-zoom';
    return '';
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <img
        src="/images/computer scene 1.jpg"
        alt="Computer workstation"
        className={`w-full h-full object-cover select-none ${getAnimationClass()}`}
        draggable={false}
      />
      {/* Clickable zone over the monitor screen */}
      <button
        onClick={handleMonitorClick}
        className={`absolute outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm ${isEnteringAnimation || isExitAnimation ? 'pointer-events-none' : 'cursor-pointer'}`}
        style={{ left: '45%', top: '13%', width: '30%', height: '52%' }}
        aria-label="Click monitor to enter"
      />
      {/* Screen flicker overlay after zoom in */}
      {showEntryFlicker && (
        <div className="fixed inset-0 bg-black entry-flicker" />
      )}
      {/* Screen flicker overlay when exiting */}
      {showExitFlicker && (
        <div className="fixed inset-0 bg-black exit-flicker" />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
      <HomeContent />
    </Suspense>
  );
}
