"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Window,
  WindowTitleBar,
  WindowTitle,
  WindowControls,
} from "@/components/ui/window";

// =============================================================================
// TYPES
// =============================================================================

interface VideoItem {
  id: string;
  label: string;
  // Visual placeholders (replace with actual paths when adding media)
  thumbnail?: string;      // Path to thumbnail image/gif
  video?: string;          // Path to main video/animated gif
  // Audio support (for future use)
  audio?: string;          // Path to audio file
  // Metadata displayed in info bar
  date: string;            // Recording date
  time: string;            // Recording time
  location: string;        // Recording location
  duration: string;        // Video duration
  // Notes displayed in Video Notes panel
  notes: string;
  // Placeholder color (used until actual media is added)
  placeholderColor: string;
}

// =============================================================================
// VIDEO DATA
// Add your video entries here. When ready to add actual media:
// 1. Add thumbnail/video paths to each entry
// 2. Optionally add audio paths for sound
// 3. The component will automatically display them
// =============================================================================

const VIDEO_ITEMS: VideoItem[] = [
  {
    id: "mov-1124",
    label: "mov.1124",
    date: "2157.03.12",
    time: "09:14:33",
    location: "Sector 7 - Northern Ridge",
    duration: "00:03:42",
    notes: "Initial survey of sector 7. Strange readings detected near the northern ridge.",
    placeholderColor: "#6b7a8a",
  },
  {
    id: "mov-1125",
    label: "mov.1125",
    date: "2157.03.12",
    time: "14:22:07",
    location: "Lab 3 - Containment Unit B",
    duration: "00:01:58",
    notes: "my hand never quite returned to normal after this encounter",
    placeholderColor: "#5a7a7a",
  },
  {
    id: "mov-1126",
    label: "mov.1126",
    date: "2157.03.13",
    time: "08:45:19",
    location: "Specimen Habitat - Zone 4",
    duration: "00:05:21",
    notes: "Follow-up documentation. Subject showed increased aggression today.",
    placeholderColor: "#7a6b8a",
  },
  {
    id: "mov-1127",
    label: "mov.1127",
    date: "2157.03.14",
    time: "12:30:00",
    location: "Feeding Station Alpha",
    duration: "00:02:15",
    notes: "Specimen feeding routine - note the unusual coloration.",
    placeholderColor: "#6b8a7a",
  },
  {
    id: "mov-1128",
    label: "mov.1128",
    date: "2157.03.14",
    time: "23:58:41",
    location: "Monitoring Room 2",
    duration: "00:00:47",
    notes: "Equipment malfunction during recording. Audio corrupted.",
    placeholderColor: "#8a7a6b",
  },
  {
    id: "mov-1129",
    label: "mov.1129",
    date: "2157.03.15",
    time: "02:47:12",
    location: "Perimeter Fence - East",
    duration: "00:04:33",
    notes: "Night vision capture. Movement detected at 02:47.",
    placeholderColor: "#7a7a6b",
  },
];

// =============================================================================
// ICONS
// =============================================================================

function MediaPlayerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" shapeRendering="crispEdges">
      <rect x="1" y="2" width="18" height="16" fill="#2a2a5a" stroke="#1a1a3a" strokeWidth="1" />
      <rect x="2" y="4" width="2" height="2" fill="#1a1a3a" />
      <rect x="2" y="8" width="2" height="2" fill="#1a1a3a" />
      <rect x="2" y="12" width="2" height="2" fill="#1a1a3a" />
      <rect x="16" y="4" width="2" height="2" fill="#1a1a3a" />
      <rect x="16" y="8" width="2" height="2" fill="#1a1a3a" />
      <rect x="16" y="12" width="2" height="2" fill="#1a1a3a" />
      <rect x="8" y="6" width="2" height="8" fill="#4a9a4a" />
      <rect x="10" y="7" width="2" height="6" fill="#4a9a4a" />
      <rect x="12" y="8" width="2" height="4" fill="#4a9a4a" />
    </svg>
  );
}

function PrevIcon() {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" shapeRendering="crispEdges">
      <rect x="1" y="2" width="2" height="12" fill="currentColor" />
      <rect x="6" y="7" width="2" height="2" fill="currentColor" />
      <rect x="8" y="5" width="2" height="6" fill="currentColor" />
      <rect x="10" y="3" width="2" height="10" fill="currentColor" />
      <rect x="12" y="7" width="2" height="2" fill="currentColor" />
      <rect x="14" y="5" width="2" height="6" fill="currentColor" />
      <rect x="16" y="3" width="2" height="10" fill="currentColor" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" shapeRendering="crispEdges">
      <rect x="2" y="3" width="2" height="10" fill="currentColor" />
      <rect x="4" y="5" width="2" height="6" fill="currentColor" />
      <rect x="6" y="7" width="2" height="2" fill="currentColor" />
      <rect x="8" y="3" width="2" height="10" fill="currentColor" />
      <rect x="10" y="5" width="2" height="6" fill="currentColor" />
      <rect x="12" y="7" width="2" height="2" fill="currentColor" />
      <rect x="17" y="2" width="2" height="12" fill="currentColor" />
    </svg>
  );
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges">
      <rect x="1" y="5" width="3" height="6" fill="#ffdd44" />
      <rect x="4" y="4" width="2" height="8" fill="#ffdd44" />
      <rect x="6" y="3" width="2" height="10" fill="#ffdd44" />
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

// =============================================================================
// CUSTOM HOOKS
// =============================================================================

/**
 * Hook for handling drag interactions (scrollbar, volume slider)
 */
function useDragHandler(
  trackRef: React.RefObject<HTMLDivElement | null>,
  onDrag: (position: number) => void,
  direction: 'horizontal' | 'vertical' = 'vertical'
) {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleTrackClick = useCallback((e: React.MouseEvent) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const position = direction === 'horizontal'
      ? (e.clientX - rect.left) / rect.width
      : (e.clientY - rect.top) / rect.height;
    onDrag(Math.max(0, Math.min(1, position)));
  }, [trackRef, onDrag, direction]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const position = direction === 'horizontal'
        ? (e.clientX - rect.left) / rect.width
        : (e.clientY - rect.top) / rect.height;
      onDrag(Math.max(0, Math.min(1, position)));
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, trackRef, onDrag, direction]);

  return { isDragging, handleMouseDown, handleTrackClick };
}

// =============================================================================
// COMPONENT
// =============================================================================

interface VideoLogsProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

const VISIBLE_THUMBNAILS = 3;
const ICON_COLUMN_RIGHT_EDGE = 132;

export function VideoLogs({ onClose, onMinimize }: VideoLogsProps) {
  // State
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);

  // Refs
  const scrollbarTrackRef = useRef<HTMLDivElement>(null);
  const volumeTrackRef = useRef<HTMLDivElement>(null);

  // Derived values
  const selectedVideo = VIDEO_ITEMS[selectedIndex];
  const maxScroll = Math.max(0, VIDEO_ITEMS.length - VISIBLE_THUMBNAILS);
  const scrollbarThumbHeightPercent = (VISIBLE_THUMBNAILS / VIDEO_ITEMS.length) * 100;
  const scrollbarThumbPositionPercent = maxScroll > 0
    ? (scrollPosition / maxScroll) * (100 - scrollbarThumbHeightPercent)
    : 0;
  const effectiveVolume = isMuted ? 0 : volume;

  // Scrollbar drag handler
  const handleScrollDrag = useCallback((position: number) => {
    const thumbHeightRatio = VISIBLE_THUMBNAILS / VIDEO_ITEMS.length;
    const adjustedPosition = position / (1 - thumbHeightRatio);
    setScrollPosition(Math.round(Math.max(0, Math.min(maxScroll, adjustedPosition * maxScroll))));
  }, [maxScroll]);

  const {
    isDragging: isDraggingScrollbar,
    handleMouseDown: handleScrollbarMouseDown,
    handleTrackClick: handleScrollTrackClick,
  } = useDragHandler(scrollbarTrackRef, handleScrollDrag, 'vertical');

  // Volume drag handler
  const handleVolumeDrag = useCallback((position: number) => {
    const newVolume = Math.round(position * 100);
    setVolume(newVolume);
    if (newVolume > 0) setIsMuted(false);
  }, []);

  const {
    isDragging: isDraggingVolume,
    handleMouseDown: handleVolumeMouseDown,
    handleTrackClick: handleVolumeTrackClick,
  } = useDragHandler(volumeTrackRef, handleVolumeDrag, 'horizontal');

  // Navigation handlers
  const navigateToVideo = useCallback((newIndex: number) => {
    setSelectedIndex(newIndex);
    // Auto-scroll to keep selected video visible
    if (newIndex < scrollPosition) {
      setScrollPosition(newIndex);
    } else if (newIndex >= scrollPosition + VISIBLE_THUMBNAILS) {
      setScrollPosition(newIndex - VISIBLE_THUMBNAILS + 1);
    }
  }, [scrollPosition]);

  const handlePreviousVideo = useCallback(() => {
    const newIndex = selectedIndex === 0 ? VIDEO_ITEMS.length - 1 : selectedIndex - 1;
    navigateToVideo(newIndex);
  }, [selectedIndex, navigateToVideo]);

  const handleNextVideo = useCallback(() => {
    const newIndex = selectedIndex === VIDEO_ITEMS.length - 1 ? 0 : selectedIndex + 1;
    navigateToVideo(newIndex);
  }, [selectedIndex, navigateToVideo]);

  const handleScrollUp = useCallback(() => {
    setScrollPosition(prev => Math.max(0, prev - 1));
  }, []);

  const handleScrollDown = useCallback(() => {
    setScrollPosition(prev => Math.min(maxScroll, prev + 1));
  }, [maxScroll]);

  const handleToggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  // Format info bar text from video metadata
  const infoBarText = `${selectedVideo.location} // ${selectedVideo.date} ${selectedVideo.time} // Duration: ${selectedVideo.duration}`;

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

      <div className="flex-1 bg-[#c8b9a9] p-2 flex flex-col gap-2">
        {/* Top row: Main video + Thumbnails sidebar */}
        <div className="flex-1 flex gap-2 min-h-0">
          {/* Main video display area */}
          <div
            className="flex-1 win98-border-sunken flex items-center justify-center"
            style={{ backgroundColor: selectedVideo.placeholderColor }}
          >
            {/* TODO: Replace with actual video/gif when available */}
            {/* {selectedVideo.video ? (
              <img src={selectedVideo.video} alt={selectedVideo.label} className="max-w-full max-h-full object-contain" />
            ) : ( */}
            <div className="text-white/80 text-xl font-bold text-center drop-shadow-[2px_2px_3px_rgba(0,0,0,0.5)]">
              <div>placeholder</div>
              <div>animated GIF goes here</div>
            </div>
            {/* )} */}
          </div>

          {/* Videos sidebar */}
          <div className="w-[260px] flex gap-1">
            <div className="flex-1 flex flex-col win98-border-sunken bg-[#a09080]">
              <div className="bg-[#8b7355] text-white text-xs px-2 py-1 font-bold">
                Videos
              </div>

              <div className="flex-1 p-2 overflow-hidden">
                <div className="flex flex-col gap-2 h-full">
                  {VIDEO_ITEMS.slice(scrollPosition, scrollPosition + VISIBLE_THUMBNAILS).map((video, displayIndex) => {
                    const actualIndex = scrollPosition + displayIndex;
                    const isSelected = actualIndex === selectedIndex;

                    return (
                      <div
                        key={video.id}
                        className="cursor-pointer flex-1 flex flex-col"
                        onClick={() => navigateToVideo(actualIndex)}
                      >
                        <div
                          className={`w-full flex-1 win98-border-sunken flex items-center justify-center ${
                            isSelected ? 'ring-2 ring-[#ffdd44]' : ''
                          }`}
                          style={{ backgroundColor: video.placeholderColor }}
                        >
                          {/* TODO: Replace with actual thumbnail when available */}
                          <div className="text-white/80 text-[10px] text-center drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]">
                            <div>placeholder</div>
                            <div>animated GIF goes here</div>
                          </div>
                        </div>
                        <div className={`text-[11px] text-right mt-1 flex-shrink-0 ${
                          isSelected ? 'text-[#222222] font-bold' : 'text-[#4a4a4a]'
                        }`}>
                          {video.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Scrollbar */}
            <div className="w-4 flex flex-col">
              <button
                onClick={handleScrollUp}
                className="win98-border-raised bg-[#c8b9a9] hover:bg-[#d8c9b9] active:win98-border-sunken h-4 flex items-center justify-center text-[#222222]"
              >
                <UpArrowIcon />
              </button>

              <div
                ref={scrollbarTrackRef}
                onClick={handleScrollTrackClick}
                className="flex-1 win98-border-sunken bg-[#a09080] relative cursor-pointer"
              >
                <div
                  onMouseDown={handleScrollbarMouseDown}
                  className={`absolute left-0 w-full win98-border-raised bg-[#c8b9a9] ${
                    isDraggingScrollbar ? 'cursor-grabbing' : 'cursor-grab'
                  }`}
                  style={{
                    top: `${scrollbarThumbPositionPercent}%`,
                    height: `${scrollbarThumbHeightPercent}%`,
                  }}
                />
              </div>

              <button
                onClick={handleScrollDown}
                className="win98-border-raised bg-[#c8b9a9] hover:bg-[#d8c9b9] active:win98-border-sunken h-4 flex items-center justify-center text-[#222222]"
              >
                <DownArrowIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom row: Info bar + Controls + Video Notes */}
        <div className="flex gap-2">
          <div className="flex-1 flex flex-col gap-2">
            {/* Video info bar - shows metadata for selected video */}
            <div className="win98-border-sunken bg-[#d8c9b9] px-3 py-2 text-[#222222] text-sm truncate">
              {infoBarText}
            </div>

            {/* Media controls */}
            <div className="win98-border-raised bg-[#c8b9a9] p-2 flex items-center gap-4">
              <button
                onClick={handlePreviousVideo}
                className="win98-border-raised bg-[#c8b9a9] hover:bg-[#d8c9b9] active:win98-border-sunken px-3 py-1 flex items-center justify-center text-[#222222]"
              >
                <PrevIcon />
              </button>

              <button
                onClick={handleNextVideo}
                className="win98-border-raised bg-[#c8b9a9] hover:bg-[#d8c9b9] active:win98-border-sunken px-3 py-1 flex items-center justify-center text-[#222222]"
              >
                <NextIcon />
              </button>

              <div className="flex-1" />

              {/* Volume control */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleMute}
                  className="win98-border-raised bg-[#c8b9a9] hover:bg-[#d8c9b9] active:win98-border-sunken w-6 h-6 flex items-center justify-center"
                >
                  <SpeakerIcon muted={isMuted || volume === 0} />
                </button>

                <div
                  ref={volumeTrackRef}
                  onClick={handleVolumeTrackClick}
                  className="win98-border-sunken bg-[#a09080] w-24 h-4 relative cursor-pointer"
                >
                  <div
                    className="absolute left-0 top-0 h-full bg-[#6b8a6b]"
                    style={{ width: `${effectiveVolume}%` }}
                  />
                  <div
                    onMouseDown={handleVolumeMouseDown}
                    className={`absolute top-0 w-2 h-full win98-border-raised bg-[#c8b9a9] ${
                      isDraggingVolume ? 'cursor-grabbing' : 'cursor-grab'
                    }`}
                    style={{ left: `calc(${effectiveVolume}% - 4px)` }}
                  />
                </div>

                <span className="text-[#222222] text-xs w-8 text-right">
                  {effectiveVolume}%
                </span>
              </div>
            </div>
          </div>

          {/* Video Notes */}
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
