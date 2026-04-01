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
        // If autoplay with sound blocked, play muted then unmute
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

  const handleTogglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const handleToggleMute = useCallback(() => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  }, [isMuted]);

  const handleVideoEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  return (
    <Window
      className="absolute top-[12vh] left-[54%]"
      style={{ zIndex }}
      onFocus={onFocus}
      resizable={false}
      draggable
    >
      <WindowTitleBar>
        <WindowTitle>Mission Statement</WindowTitle>
        <WindowControls onMinimize={onMinimize} onClose={onClose} />
      </WindowTitleBar>

      <div className="flex flex-col" style={{ width: 620 }}>
        {/* Video area */}
        <div className="relative bg-black overflow-hidden" style={{ height: 360 }}>
          <video
            ref={videoRef}
            src="/images/Welcome Video- test- will be replaced.mp4"
            className="w-full h-full object-contain"
            onEnded={handleVideoEnded}
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
              {/* Large circular play button */}
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
                className="text-white text-[13px] tracking-[0.2em] font-bold drop-shadow-lg"
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

        {/* Player controls bar */}
        <div
          className="flex items-center gap-2 px-3 py-2 bg-win98-surface flex-shrink-0"
          style={{ borderTop: "2px solid #808080" }}
        >
          {/* Play / Pause */}
          <button
            onClick={handleTogglePlay}
            disabled={!hasStarted}
            className="win98-border-raised px-4 py-1 text-xs bg-win98-surface disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ fontFamily: "Arial, sans-serif", minWidth: 76 }}
          >
            {isPlaying ? "⏸  Pause" : "▶  Play"}
          </button>

          {/* Divider */}
          <div className="w-px bg-[#808080] mx-1" style={{ height: 20 }} />

          {/* Mute / Unmute */}
          <button
            onClick={handleToggleMute}
            disabled={!hasStarted}
            className="win98-border-raised px-4 py-1 text-xs bg-win98-surface disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ fontFamily: "Arial, sans-serif", minWidth: 84 }}
          >
            {isMuted ? "🔇  Unmute" : "🔊  Mute"}
          </button>
        </div>
      </div>
    </Window>
  );
}
