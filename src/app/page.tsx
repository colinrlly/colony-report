"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Animation timing constants (synced with CSS durations in globals.css)
const ZOOM_DURATION = 600;
const FLICKER_DURATION = 200;

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isExitingFromShutdown = searchParams.get('exiting') === 'true';

  const [isEnteringAnimation, setIsEnteringAnimation] = useState(false);
  const [showEntryFlicker, setShowEntryFlicker] = useState(false);
  const [isExitAnimation, setIsExitAnimation] = useState(false);
  const [showExitFlicker, setShowExitFlicker] = useState(false);

  // Handle exit animation sequence (when returning from desktop via shutdown)
  useEffect(() => {
    if (!isExitingFromShutdown) return;

    // Reset entry animation state in case component was reused via soft navigation
    setIsEnteringAnimation(false);

    // Start exit animation
    setIsExitAnimation(true);
    setShowExitFlicker(true);

    // End flicker after animation completes
    const flickerTimer = setTimeout(() => {
      setShowExitFlicker(false);
    }, FLICKER_DURATION);

    // End zoom animation and clean up URL after all animations complete
    const zoomTimer = setTimeout(() => {
      setIsExitAnimation(false);
      // Use router.replace to properly update Next.js state
      router.replace('/', { scroll: false });
    }, ZOOM_DURATION + FLICKER_DURATION);

    return () => {
      clearTimeout(flickerTimer);
      clearTimeout(zoomTimer);
    };
  }, [isExitingFromShutdown, router]);

  // Handle entry animation sequence (when clicking monitor to enter desktop)
  const handleMonitorClick = useCallback(() => {
    if (isEnteringAnimation) return;
    setIsEnteringAnimation(true);

    // Sequence: zoom into monitor → flicker → navigate to desktop
    setTimeout(() => {
      setShowEntryFlicker(true);
      setTimeout(() => {
        router.push('/desktop');
      }, FLICKER_DURATION);
    }, ZOOM_DURATION);
  }, [isEnteringAnimation, router]);

  const isAnimating = isEnteringAnimation || isExitAnimation;
  const animationClass = isEnteringAnimation ? 'entry-zoom' : isExitAnimation ? 'exit-zoom' : '';

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <img
        src="/images/computer scene 1.jpg"
        alt="Computer workstation"
        className={`w-full h-full object-cover select-none ${animationClass}`}
        draggable={false}
      />
      {/* Clickable zone over the monitor screen */}
      <button
        onClick={handleMonitorClick}
        disabled={isAnimating}
        className="absolute outline-none cursor-pointer disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm"
        style={{ left: '45%', top: '13%', width: '30%', height: '52%' }}
        aria-label="Click monitor to enter"
      />
      {/* Screen flicker overlays */}
      {showEntryFlicker && <div className="fixed inset-0 bg-black entry-flicker" />}
      {showExitFlicker && <div className="fixed inset-0 bg-black exit-flicker" />}
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
