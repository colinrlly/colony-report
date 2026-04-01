"use client";

import { useState, useRef, useCallback } from "react";
import {
  Window,
  WindowTitleBar,
  WindowTitle,
  WindowControls,
} from "@/components/ui/window";

interface MissionStatementPlayerProps {
  onClose: () => void;
  onMinimize: () => void;
  zIndex?: number;
  onFocus?: () => void;
}

// SVG icon helpers
function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 6h12v12H6z" />
    </svg>
  );
}

function SpeakerOnIcon() {
  return (
    <svg width="16" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  );
}

function SpeakerOffIcon() {
  return (
    <svg width="16" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
    </svg>
  );
}

export function MissionStatementPlayer({
  onClose,
  onMinimize,
  zIndex,
  onFocus,
}: MissionStatementPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  // Dynamic sizing: start at 4:3 default, updated once metadata loads
  const [playerWidth, setPlayerWidth] = useState(620);
  const [playerHeight, setPlayerHeight] = useState(465);

  const handlePlayOverlayClick = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = false;
    videoRef.current
      .play()
      .then(() => {
        setHasStarted(true);
        setIsPlaying(true);
      })
      .catch(() => {
        // Browser blocked autoplay with sound — play muted then unmute
        if (!videoRef.current) return;
        videoRef.current.muted = true;
        videoRef.current.play().then(() => {
          setHasStarted(true);
          setIsPlaying(true);
          if (videoRef.current) {
            videoRef.current.muted = false;
            setIsMuted(false);
          }
        });
      });
  }, []);

  const handlePlay = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.play();
    setIsPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  }, []);

  const handleStop = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  const handleToggleMute = useCallback(() => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  }, [isMuted]);

  const handleVideoEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
    const vw = videoRef.current.videoWidth;
    const vh = videoRef.current.videoHeight;
    if (vw && vh) {
      // Cap width at 700px, derive height from true aspect ratio
      const maxWidth = 700;
      const w = Math.min(vw, maxWidth);
      const h = Math.round(w * (vh / vw));
      setPlayerWidth(w);
      setPlayerHeight(h);
    }
  }, []);

  const handleScrub = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, []);

  const scrubPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Window
      className="absolute"
      style={{ top: "calc(50vh - 380px)", left: "calc(50vw - 320px)", zIndex }}
      onFocus={onFocus}
      resizable={false}
      draggable
    >
      <WindowTitleBar>
        <WindowTitle>Mission Statement Video</WindowTitle>
        <WindowControls onMinimize={onMinimize} onClose={onClose} />
      </WindowTitleBar>

      <div className="flex flex-col" style={{ width: playerWidth }}>
        {/* Video area — sized to exact video dimensions, no letterbox bars */}
        <div className="relative overflow-hidden" style={{ height: playerHeight }}>
          <video
            ref={videoRef}
            src="/images/Welcome Video- test- will be replaced.mp4"
            className="w-full h-full object-fill cursor-pointer"
            onEnded={handleVideoEnded}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onClick={hasStarted ? (isPlaying ? handlePause : handlePlay) : undefined}
            playsInline
            preload="metadata"
          />

          {/* Big play overlay — shown until user clicks play */}
          {!hasStarted && (
            <button
              onClick={handlePlayOverlayClick}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 hover:bg-black/40 transition-colors cursor-pointer w-full border-0"
              style={{ outline: "none" }}
            >
              <div
                className="flex items-center justify-center rounded-full border-4 border-white bg-white/10 hover:bg-white/25 transition-colors"
                style={{ width: 112, height: 112, marginBottom: 20 }}
              >
                <svg
                  width="52"
                  height="52"
                  viewBox="0 0 24 24"
                  fill="white"
                  style={{ marginLeft: 7 }}
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span
                className="text-white text-[13px] tracking-[0.2em] font-bold"
                style={{
                  fontFamily: "Arial Black, sans-serif",
                  textShadow: "0 2px 6px rgba(0,0,0,0.9)",
                }}
              >
                CLICK TO PLAY WITH SOUND
              </span>
            </button>
          )}
        </div>

        {/* Controls area */}
        <div
          className="bg-win98-surface flex-shrink-0 px-2 pt-2 pb-2"
          style={{ borderTop: "2px solid #808080" }}
        >
          {/* Scrub / progress bar */}
          <div className="mb-2 px-1">
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.05}
              value={currentTime}
              onChange={handleScrub}
              disabled={!hasStarted}
              className="w-full disabled:cursor-default"
              style={{
                accentColor: "#000080",
                cursor: hasStarted ? "pointer" : "default",
                height: 14,
                // Sunken track via box-shadow on the overall element
                boxShadow: "inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff",
                background: `linear-gradient(to right, #000080 ${scrubPercent}%, #c0c0c0 ${scrubPercent}%)`,
              }}
            />
          </div>

          {/* Button row: [▶ ⏸ ■]  ···  [🔊] */}
          <div className="flex items-center justify-between px-1">
            {/* Transport buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePlay}
                disabled={!hasStarted || isPlaying}
                className="win98-border-raised flex items-center justify-center bg-win98-surface disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ width: 32, height: 26 }}
                title="Play"
              >
                <PlayIcon />
              </button>

              <button
                onClick={handlePause}
                disabled={!hasStarted || !isPlaying}
                className="win98-border-raised flex items-center justify-center bg-win98-surface disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ width: 32, height: 26 }}
                title="Pause"
              >
                <PauseIcon />
              </button>

              <button
                onClick={handleStop}
                disabled={!hasStarted}
                className="win98-border-raised flex items-center justify-center bg-win98-surface disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ width: 32, height: 26 }}
                title="Stop"
              >
                <StopIcon />
              </button>
            </div>

            {/* Mute toggle */}
            <button
              onClick={handleToggleMute}
              disabled={!hasStarted}
              className="win98-border-raised flex items-center justify-center bg-win98-surface disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ width: 36, height: 26 }}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
            </button>
          </div>
        </div>
      </div>
    </Window>
  );
}
