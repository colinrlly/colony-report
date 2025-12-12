"use client";

import { useState, useRef, useEffect } from "react";
import {
  Window,
  WindowTitleBar,
  WindowTitle,
  WindowControls,
} from "@/components/ui/window";

// Sample video data with placeholder colors matching the mockup's blue-grey tones
const videoItems = [
  { id: "mov-1124", label: "mov.1124", color: "#6b7a8a", notes: "Initial survey of sector 7. Strange readings detected near the northern ridge." },
  { id: "mov-1125", label: "mov.1125", color: "#5a7a7a", notes: "my hand never quite returned to normal after this encounter" },
  { id: "mov-1126", label: "mov.1126", color: "#7a6b8a", notes: "Follow-up documentation. Subject showed increased aggression today." },
  { id: "mov-1127", label: "mov.1127", color: "#6b8a7a", notes: "Specimen feeding routine - note the unusual coloration." },
  { id: "mov-1128", label: "mov.1128", color: "#8a7a6b", notes: "Equipment malfunction during recording. Audio corrupted." },
  { id: "mov-1129", label: "mov.1129", color: "#7a7a6b", notes: "Night vision capture. Movement detected at 02:47." },
];

// Media Player icon for title bar
function MediaPlayerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" shapeRendering="crispEdges">
      {/* Film frame border */}
      <rect x="1" y="2" width="18" height="16" fill="#2a2a5a" stroke="#1a1a3a" strokeWidth="1" />
      {/* Film holes left */}
      <rect x="2" y="4" width="2" height="2" fill="#1a1a3a" />
      <rect x="2" y="8" width="2" height="2" fill="#1a1a3a" />
      <rect x="2" y="12" width="2" height="2" fill="#1a1a3a" />
      {/* Film holes right */}
      <rect x="16" y="4" width="2" height="2" fill="#1a1a3a" />
      <rect x="16" y="8" width="2" height="2" fill="#1a1a3a" />
      <rect x="16" y="12" width="2" height="2" fill="#1a1a3a" />
      {/* Play button */}
      <rect x="8" y="6" width="2" height="8" fill="#4a9a4a" />
      <rect x="10" y="7" width="2" height="6" fill="#4a9a4a" />
      <rect x="12" y="8" width="2" height="4" fill="#4a9a4a" />
    </svg>
  );
}

// Previous button icon - cleaner media style with double arrows
function PrevIcon() {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" shapeRendering="crispEdges">
      {/* Stop bar */}
      <rect x="1" y="2" width="2" height="12" fill="currentColor" />
      {/* First arrow */}
      <rect x="6" y="7" width="2" height="2" fill="currentColor" />
      <rect x="8" y="5" width="2" height="6" fill="currentColor" />
      <rect x="10" y="3" width="2" height="10" fill="currentColor" />
      {/* Second arrow */}
      <rect x="12" y="7" width="2" height="2" fill="currentColor" />
      <rect x="14" y="5" width="2" height="6" fill="currentColor" />
      <rect x="16" y="3" width="2" height="10" fill="currentColor" />
    </svg>
  );
}

// Next button icon - cleaner media style with double arrows
function NextIcon() {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" shapeRendering="crispEdges">
      {/* First arrow */}
      <rect x="2" y="3" width="2" height="10" fill="currentColor" />
      <rect x="4" y="5" width="2" height="6" fill="currentColor" />
      <rect x="6" y="7" width="2" height="2" fill="currentColor" />
      {/* Second arrow */}
      <rect x="8" y="3" width="2" height="10" fill="currentColor" />
      <rect x="10" y="5" width="2" height="6" fill="currentColor" />
      <rect x="12" y="7" width="2" height="2" fill="currentColor" />
      {/* Stop bar */}
      <rect x="17" y="2" width="2" height="12" fill="currentColor" />
    </svg>
  );
}

// Speaker icon for volume control
function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges">
      {/* Speaker body */}
      <rect x="1" y="5" width="3" height="6" fill="#ffdd44" />
      {/* Speaker cone */}
      <rect x="4" y="4" width="2" height="8" fill="#ffdd44" />
      <rect x="6" y="3" width="2" height="10" fill="#ffdd44" />
      {/* Sound waves or X for muted */}
      {muted ? (
        <>
          <rect x="10" y="5" width="2" height="2" fill="#aa0000" />
          <rect x="12" y="7" width="2" height="2" fill="#aa0000" />
          <rect x="10" y="9" width="2" height="2" fill="#aa0000" />
          <rect x="14" y="5" width="2" height="2" fill="#aa0000" />
          <rect x="14" y="9" width="2" height="2" fill="#aa0000" />
        </>
      ) : (
        <>
          <rect x="10" y="6" width="1" height="4" fill="#666666" />
          <rect x="12" y="5" width="1" height="6" fill="#666666" />
          <rect x="14" y="4" width="1" height="8" fill="#666666" />
        </>
      )}
    </svg>
  );
}

// Up/Down arrow icons for scrollbar
function UpArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" shapeRendering="crispEdges">
      <rect x="5" y="2" width="2" height="2" fill="currentColor" />
      <rect x="4" y="4" width="4" height="2" fill="currentColor" />
      <rect x="3" y="6" width="6" height="2" fill="currentColor" />
    </svg>
  );
}

function DownArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" shapeRendering="crispEdges">
      <rect x="3" y="4" width="6" height="2" fill="currentColor" />
      <rect x="4" y="6" width="4" height="2" fill="currentColor" />
      <rect x="5" y="8" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

interface VideoLogsProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

export function VideoLogs({ onClose, onMinimize }: VideoLogsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDraggingScrollbar, setIsDraggingScrollbar] = useState(false);
  const [volume, setVolume] = useState(75); // Volume 0-100
  const [isMuted, setIsMuted] = useState(false);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);
  const scrollbarTrackRef = useRef<HTMLDivElement>(null);
  const volumeTrackRef = useRef<HTMLDivElement>(null);

  const selectedVideo = videoItems[selectedIndex];
  const visibleThumbnails = 3; // Show 3 thumbnails at a time in the sidebar
  const maxScroll = Math.max(0, videoItems.length - visibleThumbnails);

  // Calculate scrollbar thumb position and height
  const scrollbarThumbHeightPercent = (visibleThumbnails / videoItems.length) * 100;
  const scrollbarThumbPositionPercent = maxScroll > 0 ? (scrollPosition / maxScroll) * (100 - scrollbarThumbHeightPercent) : 0;

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  // Navigate to previous video
  const handlePreviousVideo = () => {
    const newIndex = selectedIndex === 0 ? videoItems.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    // Auto-scroll to keep selected video visible
    if (newIndex < scrollPosition) {
      setScrollPosition(newIndex);
    } else if (newIndex >= scrollPosition + visibleThumbnails) {
      setScrollPosition(newIndex - visibleThumbnails + 1);
    }
  };

  // Navigate to next video
  const handleNextVideo = () => {
    const newIndex = selectedIndex === videoItems.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    // Auto-scroll to keep selected video visible
    if (newIndex < scrollPosition) {
      setScrollPosition(newIndex);
    } else if (newIndex >= scrollPosition + visibleThumbnails) {
      setScrollPosition(newIndex - visibleThumbnails + 1);
    }
  };

  // Scroll up in sidebar
  const handleScrollUp = () => {
    setScrollPosition(prev => Math.max(0, prev - 1));
  };

  // Scroll down in sidebar
  const handleScrollDown = () => {
    setScrollPosition(prev => Math.min(maxScroll, prev + 1));
  };

  // Handle scrollbar drag
  const handleScrollbarMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingScrollbar(true);
  };

  // Handle scrollbar track click
  const handleTrackClick = (e: React.MouseEvent) => {
    if (!scrollbarTrackRef.current) return;
    const track = scrollbarTrackRef.current;
    const rect = track.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const trackHeight = rect.height;
    const thumbHeight = (scrollbarThumbHeightPercent / 100) * trackHeight;
    const scrollableHeight = trackHeight - thumbHeight;
    const newPosition = Math.round((clickY - thumbHeight / 2) / scrollableHeight * maxScroll);
    setScrollPosition(Math.max(0, Math.min(maxScroll, newPosition)));
  };

  // Toggle mute
  const handleToggleMute = () => {
    setIsMuted(prev => !prev);
  };

  // Handle volume track click
  const handleVolumeTrackClick = (e: React.MouseEvent) => {
    if (!volumeTrackRef.current) return;
    const track = volumeTrackRef.current;
    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const trackWidth = rect.width;
    const newVolume = Math.round((clickX / trackWidth) * 100);
    setVolume(Math.max(0, Math.min(100, newVolume)));
    if (newVolume > 0) setIsMuted(false);
  };

  // Handle volume thumb drag start
  const handleVolumeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingVolume(true);
  };

  // Global mouse handlers for scrollbar dragging
  useEffect(() => {
    if (!isDraggingScrollbar) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!scrollbarTrackRef.current) return;
      const track = scrollbarTrackRef.current;
      const rect = track.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      const trackHeight = rect.height;
      const thumbHeight = (scrollbarThumbHeightPercent / 100) * trackHeight;
      const scrollableHeight = trackHeight - thumbHeight;
      const newPosition = Math.round((mouseY - thumbHeight / 2) / scrollableHeight * maxScroll);
      setScrollPosition(Math.max(0, Math.min(maxScroll, newPosition)));
    };

    const handleMouseUp = () => {
      setIsDraggingScrollbar(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingScrollbar, maxScroll, scrollbarThumbHeightPercent]);

  // Global mouse handlers for volume dragging
  useEffect(() => {
    if (!isDraggingVolume) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!volumeTrackRef.current) return;
      const track = volumeTrackRef.current;
      const rect = track.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const trackWidth = rect.width;
      const newVolume = Math.round((mouseX / trackWidth) * 100);
      setVolume(Math.max(0, Math.min(100, newVolume)));
      if (newVolume > 0) setIsMuted(false);
    };

    const handleMouseUp = () => {
      setIsDraggingVolume(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingVolume]);

  const ICON_COLUMN_RIGHT_EDGE = 132;

  // Get effective volume (0 if muted)
  const effectiveVolume = isMuted ? 0 : volume;

  return (
    <Window
      resizable={false}
      leftSnapBoundary={ICON_COLUMN_RIGHT_EDGE}
      className="z-20 w-[920px] h-[680px] absolute top-[6vh] left-1/2 -translate-x-1/2 flex flex-col"
    >
      <WindowTitleBar>
        <div className="flex items-center gap-2">
          <MediaPlayerIcon />
          <WindowTitle>MEDIA PLAYER</WindowTitle>
        </div>
        <WindowControls showMaximize={false} onMinimize={onMinimize} onClose={onClose} />
      </WindowTitleBar>

      {/* Main content area - vertical layout with two rows */}
      <div className="flex-1 bg-[#c8b9a9] p-2 flex flex-col gap-2">
        {/* Top row: Main video + Thumbnails sidebar */}
        <div className="flex-1 flex gap-2 min-h-0">
          {/* Main video display area */}
          <div
            className="flex-1 win98-border-sunken flex items-center justify-center"
            style={{ backgroundColor: selectedVideo.color }}
          >
            <div className="text-white/80 text-xl font-bold text-center drop-shadow-[2px_2px_3px_rgba(0,0,0,0.5)]">
              <div>placeholder</div>
              <div>animated GIF goes here</div>
            </div>
          </div>

          {/* Right side - Videos sidebar (thumbnails only) */}
          <div className="w-[260px] flex gap-1">
            {/* Videos panel with header and thumbnails grouped */}
            <div className="flex-1 flex flex-col win98-border-sunken bg-[#a09080]">
              {/* Videos header */}
              <div className="bg-[#8b7355] text-white text-xs px-2 py-1 font-bold">
                Videos
              </div>

              {/* Thumbnail list */}
              <div className="flex-1 p-2 overflow-hidden">
                <div className="flex flex-col gap-2 h-full">
                  {videoItems.slice(scrollPosition, scrollPosition + visibleThumbnails).map((video, displayIndex) => {
                    const actualIndex = scrollPosition + displayIndex;
                    const isSelected = actualIndex === selectedIndex;

                    return (
                      <div
                        key={video.id}
                        className="cursor-pointer flex-1 flex flex-col"
                        onClick={() => handleThumbnailClick(actualIndex)}
                      >
                        {/* Thumbnail */}
                        <div
                          className={`w-full flex-1 win98-border-sunken flex items-center justify-center ${
                            isSelected ? 'ring-2 ring-[#ffdd44]' : ''
                          }`}
                          style={{ backgroundColor: video.color }}
                        >
                          <div className="text-white/80 text-[10px] text-center drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]">
                            <div>placeholder</div>
                            <div>animated GIF goes here</div>
                          </div>
                        </div>
                        {/* Label */}
                        <div className={`text-[11px] text-right mt-1 flex-shrink-0 ${isSelected ? 'text-[#222222] font-bold' : 'text-[#4a4a4a]'}`}>
                          {video.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Vertical scrollbar - outside the brown panel */}
            <div className="w-4 flex flex-col">
              {/* Up arrow button */}
              <button
                onClick={handleScrollUp}
                className="win98-border-raised bg-[#c8b9a9] hover:bg-[#d8c9b9] active:win98-border-sunken h-4 flex items-center justify-center text-[#222222]"
              >
                <UpArrowIcon />
              </button>

              {/* Scrollbar track */}
              <div
                ref={scrollbarTrackRef}
                onClick={handleTrackClick}
                className="flex-1 win98-border-sunken bg-[#a09080] relative cursor-pointer"
              >
                {/* Scrollbar thumb */}
                <div
                  onMouseDown={handleScrollbarMouseDown}
                  className={`absolute left-0 w-full win98-border-raised bg-[#c8b9a9] cursor-grab ${isDraggingScrollbar ? 'cursor-grabbing' : ''}`}
                  style={{
                    top: `${scrollbarThumbPositionPercent}%`,
                    height: `${scrollbarThumbHeightPercent}%`,
                  }}
                />
              </div>

              {/* Down arrow button */}
              <button
                onClick={handleScrollDown}
                className="win98-border-raised bg-[#c8b9a9] hover:bg-[#d8c9b9] active:win98-border-sunken h-4 flex items-center justify-center text-[#222222]"
              >
                <DownArrowIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom row: Info bar + Controls + Video Notes - one continuous line */}
        <div className="flex gap-2">
          {/* Left: Info bar and controls */}
          <div className="flex-1 flex flex-col gap-2">
            {/* Video info bar */}
            <div className="win98-border-sunken bg-[#d8c9b9] px-3 py-2 text-[#222222] text-sm">
              video data info date recording etc
            </div>

            {/* Media controls bar - prev/next buttons + volume */}
            <div className="win98-border-raised bg-[#c8b9a9] p-2 flex items-center gap-4">
              {/* Previous button */}
              <button
                onClick={handlePreviousVideo}
                className="win98-border-raised bg-[#c8b9a9] hover:bg-[#d8c9b9] active:win98-border-sunken px-3 py-1 flex items-center justify-center text-[#222222]"
              >
                <PrevIcon />
              </button>

              {/* Next button */}
              <button
                onClick={handleNextVideo}
                className="win98-border-raised bg-[#c8b9a9] hover:bg-[#d8c9b9] active:win98-border-sunken px-3 py-1 flex items-center justify-center text-[#222222]"
              >
                <NextIcon />
              </button>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Volume control */}
              <div className="flex items-center gap-2">
                {/* Speaker icon / mute button */}
                <button
                  onClick={handleToggleMute}
                  className="win98-border-raised bg-[#c8b9a9] hover:bg-[#d8c9b9] active:win98-border-sunken w-6 h-6 flex items-center justify-center"
                >
                  <SpeakerIcon muted={isMuted || volume === 0} />
                </button>

                {/* Volume slider track */}
                <div
                  ref={volumeTrackRef}
                  onClick={handleVolumeTrackClick}
                  className="win98-border-sunken bg-[#a09080] w-24 h-4 relative cursor-pointer"
                >
                  {/* Volume fill */}
                  <div
                    className="absolute left-0 top-0 h-full bg-[#6b8a6b]"
                    style={{ width: `${effectiveVolume}%` }}
                  />
                  {/* Volume thumb */}
                  <div
                    onMouseDown={handleVolumeMouseDown}
                    className={`absolute top-0 w-2 h-full win98-border-raised bg-[#c8b9a9] cursor-grab ${isDraggingVolume ? 'cursor-grabbing' : ''}`}
                    style={{ left: `calc(${effectiveVolume}% - 4px)` }}
                  />
                </div>

                {/* Volume percentage */}
                <span className="text-[#222222] text-xs w-8 text-right">
                  {effectiveVolume}%
                </span>
              </div>
            </div>
          </div>

          {/* Right: Video Notes - same width as sidebar */}
          <div className="w-[260px] win98-border-sunken bg-[#5a4d42] px-3 py-2">
            <div className="text-[#d8c9b9] text-[12px] leading-relaxed">
              <span className="font-bold">Video Notes: </span>
              <span>{selectedVideo.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}
