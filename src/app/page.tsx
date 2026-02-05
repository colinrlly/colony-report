"use client";

import { useState, useCallback, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Animation timing constants (synced with CSS durations in globals.css)
const ZOOM_DURATION = 600;
const FLICKER_DURATION = 200;
const TOTAL_ANIMATION_DURATION = ZOOM_DURATION + FLICKER_DURATION;

const STARTUP_VIDEO_SRC = "/images/FINAL With Sound.mp4";

const SoundOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

const SoundOnIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isExitingFromShutdown = searchParams.get("exiting") === "true";

  const [isEnteringAnimation, setIsEnteringAnimation] = useState(false);
  const [showEntryFlicker, setShowEntryFlicker] = useState(false);
  const [isExitAnimation, setIsExitAnimation] = useState(false);
  const [showExitFlicker, setShowExitFlicker] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const toggleSound = useCallback(() => {
    setIsMuted((prev) => {
      if (videoRef.current) {
        videoRef.current.muted = !prev;
      }
      return !prev;
    });
  }, []);

  const isAnimating = isEnteringAnimation || isExitAnimation;
  const animationClass = isEnteringAnimation
    ? "entry-zoom"
    : isExitAnimation
      ? "exit-zoom"
      : "";

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <video
        ref={videoRef}
        src={STARTUP_VIDEO_SRC}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        disablePictureInPicture
        className={`w-full h-full object-cover select-none ${animationClass}`}
      />
      {/* Invisible button overlay positioned over the monitor screen */}
      <button
        onClick={handleMonitorClick}
        disabled={isAnimating}
        aria-label="Click monitor to enter"
        className="absolute left-[45%] top-[13%] w-[30%] h-[52%] outline-none cursor-pointer disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm"
      />
      {/* Sound toggle button */}
      <button
        onClick={toggleSound}
        aria-label={isMuted ? "Unmute sound" : "Mute sound"}
        className="absolute left-6 bottom-6 p-4 rounded-full bg-black/60 hover:bg-black/80 transition-all text-white hover:scale-110 shadow-lg"
      >
        {isMuted ? <SoundOffIcon /> : <SoundOnIcon />}
      </button>
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
