"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import {
  Window,
  WindowTitleBar,
  WindowTitle,
  WindowControls,
} from "@/components/ui/window";

// Layout constants
const MENUBAR_HEIGHT = 36;
const TASKBAR_HEIGHT = 40;
const ICON_COLUMN_RIGHT_EDGE = 132;

// Window dimension constants
const BASE_WIDTH = 750;
const BASE_HEIGHT = 700;
const ASPECT_RATIO = BASE_WIDTH / BASE_HEIGHT;
const MIN_WIDTH = 500;
const MAX_WIDTH = 1000;

// Photo library data
const photoItems = [
  { id: "img-1", label: "img.1", image: "/images/photo-library/img-1.jpg", coordinates: "47.6062° N, 122.3321° W", location: "Mushroom Forest", date: "2157.03.14", time: "14:23:07", color: "#8B7355" },
  { id: "img-2", label: "img.2", image: "/images/photo-library/img-2.jpg", coordinates: "47.6088° N, 122.3359° W", location: "Amber Dunes", date: "2157.03.14", time: "14:25:31", color: "#A67B5B" },
  { id: "img-3", label: "img.3", image: "/images/photo-library/img-3.jpg", coordinates: "47.6101° N, 122.3412° W", location: "Mosslands", date: "2157.03.14", time: "14:28:45", color: "#6B8E6B" },
  { id: "img-4", label: "img.4", image: "/images/photo-library/img-4.jpg", coordinates: "47.6134° N, 122.3478° W", location: "Pale Flats", date: "2157.03.14", time: "14:32:19", color: "#C4A77D" },
  { id: "img-5", label: "img.5", image: "/images/photo-library/img-5.jpg", coordinates: "47.6156° N, 122.3521° W", location: "Rust Canyons", date: "2157.03.14", time: "14:35:52", color: "#8B4513" },
  { id: "img-6", label: "img.6", image: "/images/photo-library/img-6.jpg", coordinates: "47.6178° N, 122.3567° W", location: "Ashen Basin", date: "2157.03.14", time: "14:39:08", color: "#9C8B7D" },
  { id: "img-7", label: "img.7", image: "/images/photo-library/img-7.jpg", coordinates: "47.6192° N, 122.3601° W", location: "Spore Hollow", date: "2157.03.15", time: "08:12:33", color: "#704214" },
  { id: "img-8", label: "img.8", image: "/images/photo-library/img-8.jpg", coordinates: "47.6215° N, 122.3645° W", location: "Crystal Steppes", date: "2157.03.15", time: "08:15:47", color: "#B8A088" },
  { id: "img-9", label: "img.9", image: "/images/photo-library/img-9.jpg", coordinates: "47.6238° N, 122.3689° W", location: "Obsidian Marsh", date: "2157.03.15", time: "08:19:22", color: "#5C4033" },
  { id: "img-10", label: "img.10", image: "/images/photo-library/img-10.jpg", coordinates: "47.6261° N, 122.3732° W", location: "Fern Wilds", date: "2157.03.15", time: "08:22:56", color: "#7B9971" },
];

// Icon components
function CameraIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" shapeRendering="crispEdges">
      <rect x="2" y="6" width="20" height="14" fill="#5a9c5a" stroke="#2a5a2a" strokeWidth="1" />
      <rect x="8" y="9" width="8" height="8" fill="#1a1a1a" />
      <rect x="10" y="11" width="4" height="4" fill="#3a3a3a" />
      <rect x="11" y="12" width="2" height="2" fill="#5a5a5a" />
      <rect x="16" y="8" width="4" height="3" fill="#ffdd44" stroke="#aa8800" strokeWidth="0.5" />
      <rect x="8" y="3" width="8" height="4" fill="#4a8a4a" stroke="#2a5a2a" strokeWidth="1" />
      <rect x="10" y="4" width="4" height="2" fill="#1a1a1a" />
    </svg>
  );
}

function LeftArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges">
      <rect x="8" y="2" width="2" height="2" fill="currentColor" />
      <rect x="6" y="4" width="2" height="2" fill="currentColor" />
      <rect x="4" y="6" width="2" height="4" fill="currentColor" />
      <rect x="6" y="10" width="2" height="2" fill="currentColor" />
      <rect x="8" y="12" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

function RightArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges">
      <rect x="6" y="2" width="2" height="2" fill="currentColor" />
      <rect x="8" y="4" width="2" height="2" fill="currentColor" />
      <rect x="10" y="6" width="2" height="4" fill="currentColor" />
      <rect x="8" y="10" width="2" height="2" fill="currentColor" />
      <rect x="6" y="12" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

function ResizeGrip() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ display: 'block' }}>
      <rect x="9" y="2" width="1" height="1" fill="#808080" />
      <rect x="10" y="1" width="1" height="1" fill="#DFDFDF" />
      <rect x="6" y="5" width="1" height="1" fill="#808080" />
      <rect x="7" y="4" width="1" height="1" fill="#DFDFDF" />
      <rect x="9" y="5" width="1" height="1" fill="#808080" />
      <rect x="10" y="4" width="1" height="1" fill="#DFDFDF" />
      <rect x="3" y="8" width="1" height="1" fill="#808080" />
      <rect x="4" y="7" width="1" height="1" fill="#DFDFDF" />
      <rect x="6" y="8" width="1" height="1" fill="#808080" />
      <rect x="7" y="7" width="1" height="1" fill="#DFDFDF" />
      <rect x="9" y="8" width="1" height="1" fill="#808080" />
      <rect x="10" y="7" width="1" height="1" fill="#DFDFDF" />
    </svg>
  );
}

interface PhotoLibraryProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

export function PhotoLibrary({ onClose, onMinimize }: PhotoLibraryProps) {
  // Photo selection state
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDraggingScrollbar, setIsDraggingScrollbar] = useState(false);

  // Window state
  const [dimensions, setDimensions] = useState({ width: BASE_WIDTH, height: BASE_HEIGHT });
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bounds, setBounds] = useState<{ left: number; top: number; right: number; bottom: number } | undefined>(undefined);

  // Refs
  const nodeRef = useRef<HTMLDivElement>(null);
  const scrollbarTrackRef = useRef<HTMLDivElement>(null);
  const resizeStartRef = useRef({ mouseX: 0, mouseY: 0, width: BASE_WIDTH, height: BASE_HEIGHT });

  // Derived values
  const selectedPhoto = photoItems[selectedIndex];
  const visibleThumbnails = 6;
  const maxScroll = Math.max(0, photoItems.length - visibleThumbnails);
  const scrollbarThumbWidthPercent = (visibleThumbnails / photoItems.length) * 100;
  const scrollbarThumbPositionPercent = maxScroll > 0 ? (scrollPosition / maxScroll) * (100 - scrollbarThumbWidthPercent) : 0;
  const scaleFactor = dimensions.width / BASE_WIDTH;

  // Navigation handlers
  const handlePreviousImage = useCallback(() => {
    const newIndex = selectedIndex === 0 ? photoItems.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    if (newIndex < scrollPosition) {
      setScrollPosition(newIndex);
    } else if (newIndex >= scrollPosition + visibleThumbnails) {
      setScrollPosition(newIndex - visibleThumbnails + 1);
    }
  }, [selectedIndex, scrollPosition, visibleThumbnails]);

  const handleNextImage = useCallback(() => {
    const newIndex = selectedIndex === photoItems.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    if (newIndex < scrollPosition) {
      setScrollPosition(newIndex);
    } else if (newIndex >= scrollPosition + visibleThumbnails) {
      setScrollPosition(newIndex - visibleThumbnails + 1);
    }
  }, [selectedIndex, scrollPosition, visibleThumbnails]);

  const handleThumbnailClick = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  // Scrollbar handlers
  const handleScrollbarMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingScrollbar(true);
  }, []);

  const handleTrackClick = useCallback((e: React.MouseEvent) => {
    if (!scrollbarTrackRef.current) return;
    const rect = scrollbarTrackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const trackWidth = rect.width;
    const thumbWidth = (scrollbarThumbWidthPercent / 100) * trackWidth;
    const scrollableWidth = trackWidth - thumbWidth;
    const newPosition = Math.round((clickX - thumbWidth / 2) / scrollableWidth * maxScroll);
    setScrollPosition(Math.max(0, Math.min(maxScroll, newPosition)));
  }, [scrollbarThumbWidthPercent, maxScroll]);

  // Scrollbar drag effect
  useEffect(() => {
    if (!isDraggingScrollbar) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!scrollbarTrackRef.current) return;
      const rect = scrollbarTrackRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const trackWidth = rect.width;
      const thumbWidth = (scrollbarThumbWidthPercent / 100) * trackWidth;
      const scrollableWidth = trackWidth - thumbWidth;
      const newPosition = Math.round((mouseX - thumbWidth / 2) / scrollableWidth * maxScroll);
      setScrollPosition(Math.max(0, Math.min(maxScroll, newPosition)));
    };

    const handleMouseUp = () => setIsDraggingScrollbar(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingScrollbar, maxScroll, scrollbarThumbWidthPercent]);

  // Resize handlers
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    resizeStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      width: dimensions.width,
      height: dimensions.height,
    };
    setIsResizing(true);
  }, [dimensions]);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStartRef.current.mouseX;
      const deltaY = e.clientY - resizeStartRef.current.mouseY;
      const deltaForRatio = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY * ASPECT_RATIO;

      let newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, resizeStartRef.current.width + deltaForRatio));
      let newHeight = newWidth / ASPECT_RATIO;

      // Prevent overlap with taskbar
      if (nodeRef.current) {
        const windowTop = nodeRef.current.getBoundingClientRect().top;
        const availableHeight = window.innerHeight - TASKBAR_HEIGHT - windowTop;
        if (newHeight > availableHeight) {
          newHeight = availableHeight;
          newWidth = Math.max(MIN_WIDTH, newHeight * ASPECT_RATIO);
          newHeight = newWidth / ASPECT_RATIO;
        }
      }

      setDimensions({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => setIsResizing(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'nwse-resize';
    document.body.style.userSelect = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  // Drag bounds calculation
  const calculateBounds = useCallback(() => {
    if (!nodeRef.current) return;

    const windowRect = nodeRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const initialLeft = windowRect.left - position.x;
    const initialTop = windowRect.top - position.y;

    setBounds({
      left: -initialLeft,
      top: MENUBAR_HEIGHT - initialTop,
      right: viewportWidth - initialLeft - windowRect.width,
      bottom: viewportHeight - TASKBAR_HEIGHT - initialTop - windowRect.height,
    });
  }, [position]);

  useEffect(() => {
    calculateBounds();
    const handleResize = () => calculateBounds();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateBounds]);

  // Drag handlers
  const handleDrag = useCallback((_e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  }, []);

  const handleDragStop = useCallback((_e: DraggableEvent, data: DraggableData) => {
    if (!nodeRef.current) return;
    const windowRect = nodeRef.current.getBoundingClientRect();
    if (windowRect.left < ICON_COLUMN_RIGHT_EDGE) {
      const adjustment = ICON_COLUMN_RIGHT_EDGE - windowRect.left;
      setPosition({ x: data.x + adjustment, y: data.y });
    }
  }, []);

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-drag-handle"
      position={position}
      onDrag={handleDrag}
      onStop={handleDragStop}
      bounds={bounds}
    >
      <div
        ref={nodeRef}
        className="z-20 absolute top-[6vh] left-1/2 -translate-x-1/2"
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        <Window
          resizable={false}
          draggable={false}
          className="flex flex-col absolute top-0 left-0 origin-top-left"
          style={{
            width: BASE_WIDTH,
            height: BASE_HEIGHT,
            transform: `scale(${scaleFactor})`,
            willChange: isResizing ? 'transform' : 'auto',
          }}
        >
          <WindowTitleBar>
            <div className="flex items-center gap-2">
              <CameraIcon />
              <WindowTitle>PHOTO LIBRARY</WindowTitle>
            </div>
            <WindowControls showMaximize={false} onMinimize={onMinimize} onClose={onClose} />
          </WindowTitleBar>

          <div className="flex-1 bg-[#5a4d42] p-3 flex flex-col gap-2">
            {/* Main image display */}
            <div
              className="flex-1 win98-border-sunken flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: selectedPhoto.color }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="text-white/80 text-xl font-bold text-center drop-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]">
                  <div>image to go here</div>
                  <div>placeholder</div>
                </div>
              </div>
            </div>

            {/* Info bar */}
            <div className="flex justify-between items-center px-2 py-1 text-[#c8b9a9] text-[11px]">
              <div>{selectedPhoto.coordinates}</div>
              <div>{selectedPhoto.location} {selectedPhoto.date} {selectedPhoto.time}</div>
            </div>

            {/* Navigation bar */}
            <div className="flex items-center gap-1 px-1">
              <button
                onClick={handlePreviousImage}
                className="win98-border-raised bg-[#c8b9a9] hover:bg-[#d8c9b9] active:win98-border-sunken w-6 h-5 flex items-center justify-center text-[#5a4d42]"
                aria-label="Previous image"
              >
                <LeftArrowIcon />
              </button>

              <div
                ref={scrollbarTrackRef}
                onClick={handleTrackClick}
                className="flex-1 h-5 win98-border-sunken bg-[#a09080] relative cursor-pointer"
              >
                <div
                  onMouseDown={handleScrollbarMouseDown}
                  className={`absolute top-0 h-full win98-border-raised bg-[#c8b9a9] cursor-grab ${isDraggingScrollbar ? 'cursor-grabbing' : ''}`}
                  style={{
                    left: `${scrollbarThumbPositionPercent}%`,
                    width: `${scrollbarThumbWidthPercent}%`,
                  }}
                />
              </div>

              <button
                onClick={handleNextImage}
                className="win98-border-raised bg-[#c8b9a9] hover:bg-[#d8c9b9] active:win98-border-sunken w-6 h-5 flex items-center justify-center text-[#5a4d42]"
                aria-label="Next image"
              >
                <RightArrowIcon />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="bg-[#8b7d72] win98-border-sunken p-2">
              <div className="flex gap-3 overflow-hidden justify-center">
                {photoItems.slice(scrollPosition, scrollPosition + visibleThumbnails).map((photo, displayIndex) => {
                  const actualIndex = scrollPosition + displayIndex;
                  const isSelected = actualIndex === selectedIndex;

                  return (
                    <div
                      key={photo.id}
                      className="flex flex-col items-center cursor-pointer flex-shrink-0"
                      onClick={() => handleThumbnailClick(actualIndex)}
                    >
                      <div className={`text-[11px] mb-1 font-bold ${isSelected ? 'text-[#ffdd44]' : 'text-[#c8b9a9]'}`}>
                        {photo.label}
                      </div>
                      <div
                        className={`w-[115px] h-[90px] win98-border-sunken flex items-center justify-center ${isSelected ? 'ring-2 ring-[#ffdd44]' : ''}`}
                        style={{ backgroundColor: photo.color }}
                      >
                        <div className="text-white/80 text-[10px] text-center drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]">
                          <div>img.</div>
                          <div>placeholder</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Window>

        {/* Resize handle */}
        <div
          onMouseDown={handleResizeStart}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize flex items-center justify-center z-50"
          style={{ touchAction: 'none' }}
        >
          <ResizeGrip />
        </div>
      </div>
    </Draggable>
  );
}
