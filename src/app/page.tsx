"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Animation timing constants (synced with CSS durations in globals.css)
const ZOOM_DURATION = 600;
const FLICKER_DURATION = 200;
const TOTAL_ANIMATION_DURATION = ZOOM_DURATION + FLICKER_DURATION;

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isExitingFromShutdown = searchParams.get("exiting") === "true";

  const [isEnteringAnimation, setIsEnteringAnimation] = useState(false);
  const [showEntryFlicker, setShowEntryFlicker] = useState(false);
  const [isExitAnimation, setIsExitAnimation] = useState(false);
  const [showExitFlicker, setShowExitFlicker] = useState(false);

  // Handle exit animation sequence (returning from desktop via shutdown)
  useEffect(() => {
    if (!isExitingFromShutdown) return;

    // Reset entry state (component may be reused via soft navigation)
    setIsEnteringAnimation(false);
    setIsExitAnimation(true);
    setShowExitFlicker(true);

    const flickerTimer = setTimeout(() => {
      setShowExitFlicker(false);
    }, FLICKER_DURATION);

    const zoomTimer = setTimeout(() => {
      setIsExitAnimation(false);
      router.replace("/", { scroll: false });
    }, TOTAL_ANIMATION_DURATION);

    return () => {
      clearTimeout(flickerTimer);
      clearTimeout(zoomTimer);
    };
  }, [isExitingFromShutdown, router]);

  // Handle entry animation sequence (clicking monitor to enter desktop)
  const handleMonitorClick = useCallback(() => {
    setIsEnteringAnimation((prev) => {
      if (prev) return prev; // Already animating

      setTimeout(() => {
        setShowEntryFlicker(true);
        setTimeout(() => router.push("/desktop"), FLICKER_DURATION);
      }, ZOOM_DURATION);

      return true;
    });
  }, [router]);

  const isAnimating = isEnteringAnimation || isExitAnimation;
  const animationClass = isEnteringAnimation
    ? "entry-zoom"
    : isExitAnimation
      ? "exit-zoom"
      : "";

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <video
        src="/images/Handbrake Copy.mp4"
        autoPlay
        loop
        muted
        playsInline
        className={`w-full h-full object-cover select-none ${animationClass}`}
      />
      <button
        onClick={handleMonitorClick}
        disabled={isAnimating}
        className="absolute outline-none cursor-pointer disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm"
        style={{ left: "45%", top: "13%", width: "30%", height: "52%" }}
        aria-label="Click monitor to enter"
      />
      {showEntryFlicker && (
        <div className="fixed inset-0 bg-black entry-flicker" />
      )}
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
