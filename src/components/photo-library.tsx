"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
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
const VISIBLE_THUMBNAILS = 6;
const FULLSCREEN_PADDING = 20;

// Photo library data
const photoItems = [
  { id: "photolog-1", label: "img.1", image: "/images/PhotoLog1.jpg", coordinates: "43.2187° N, 118.4523° W", location: "West Forest- Anomaly", date: "2157.03.14", time: "09:15:02", color: "#7A6B5E" },
  { id: "photolog-6", label: "img.6", image: "/images/PhotoLog6.jpg", coordinates: "41.8934° N, 124.1876° W", location: "Coastal Tidewaters", date: "2157.03.15", time: "12:33:42", color: "#4A7B9D" },
  { id: "photolog-5", label: "img.5", image: "/images/PhotoLog5.jpg", coordinates: "38.7261° N, 121.8347° W", location: "Southern Dune Pools", date: "2157.03.15", time: "10:45:18", color: "#C9A86C" },
  { id: "photolog-4", label: "img.4", image: "/images/PhotoLog4.jpg", coordinates: "44.5612° N, 120.2938° W", location: "Mosslands", date: "2157.03.15", time: "17:08:12", color: "#8B7355" },
  { id: "img-2", label: "img.2", image: "/images/PhotoLog3.jpg", coordinates: "42.3749° N, 116.5182° W", location: "Eastern Meadows", date: "2157.03.14", time: "14:25:31", color: "#A67B5B" },
  { id: "photolog-2", label: "img.3", image: "/images/PhotoLog2.jpg", coordinates: "40.1523° N, 119.7641° W", location: "Pale Flats", date: "2157.03.14", time: "06:01:03", color: "#8B7355" },
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
  zIndex?: number;
  onFocus?: () => void;
}

export function PhotoLibrary({ onClose, onMinimize, zIndex, onFocus }: PhotoLibraryProps) {
  // Photo selection state
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Window state
  const [dimensions, setDimensions] = useState({ width: BASE_WIDTH, height: BASE_HEIGHT });
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bounds, setBounds] = useState<{ left: number; top: number; right: number; bottom: number } | undefined>(undefined);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [preFullscreenState, setPreFullscreenState] = useState<{
    dimensions: { width: number; height: number };
    position: { x: number; y: number };
  } | null>(null);

  // Refs
  const nodeRef = useRef<HTMLDivElement>(null);
  const resizeStartRef = useRef({ mouseX: 0, mouseY: 0, width: BASE_WIDTH, height: BASE_HEIGHT });

  // Derived values
  const selectedPhoto = photoItems[selectedIndex];
  const maxScroll = Math.max(0, photoItems.length - VISIBLE_THUMBNAILS);
  const scaleFactor = dimensions.width / BASE_WIDTH;

  // Navigation handlers
  const handlePreviousImage = useCallback(() => {
    const newIndex = selectedIndex === 0 ? photoItems.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    if (newIndex < scrollPosition) {
      setScrollPosition(newIndex);
    } else if (newIndex >= scrollPosition + VISIBLE_THUMBNAILS) {
      setScrollPosition(newIndex - VISIBLE_THUMBNAILS + 1);
    }
  }, [selectedIndex, scrollPosition]);

  const handleNextImage = useCallback(() => {
    const newIndex = selectedIndex === photoItems.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    if (newIndex < scrollPosition) {
      setScrollPosition(newIndex);
    } else if (newIndex >= scrollPosition + VISIBLE_THUMBNAILS) {
      setScrollPosition(newIndex - VISIBLE_THUMBNAILS + 1);
    }
  }, [selectedIndex, scrollPosition]);

  const handleThumbnailClick = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const handleThumbnailScroll = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY || e.deltaX;
    setScrollPosition(delta > 0 ? maxScroll : 0);
  }, [maxScroll]);

  // Keyboard navigation with arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          handlePreviousImage();
          break;
        case "ArrowRight":
          handleNextImage();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePreviousImage, handleNextImage]);

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

  // Fullscreen toggle handler
  const handleFullscreen = useCallback(() => {
    if (isFullscreen && preFullscreenState) {
      setDimensions(preFullscreenState.dimensions);
      setPosition(preFullscreenState.position);
      setIsFullscreen(false);
      setPreFullscreenState(null);
      return;
    }

    setPreFullscreenState({ dimensions: { ...dimensions }, position: { ...position } });

    const availableWidth = window.innerWidth - ICON_COLUMN_RIGHT_EDGE - FULLSCREEN_PADDING;
    const availableHeight = window.innerHeight - MENUBAR_HEIGHT - TASKBAR_HEIGHT - FULLSCREEN_PADDING;

    // Calculate max dimensions while maintaining aspect ratio
    let newWidth = availableWidth;
    let newHeight = newWidth / ASPECT_RATIO;

    if (newHeight > availableHeight) {
      newHeight = availableHeight;
      newWidth = newHeight * ASPECT_RATIO;
    }

    if (newWidth > MAX_WIDTH) {
      newWidth = MAX_WIDTH;
      newHeight = newWidth / ASPECT_RATIO;
    }

    // Calculate centered position relative to initial window position (left-1/2 -translate-x-1/2, top-[6vh])
    const initialLeft = window.innerWidth / 2;
    const initialTop = window.innerHeight * 0.06;
    const targetCenterX = ICON_COLUMN_RIGHT_EDGE + availableWidth / 2;
    const targetCenterY = MENUBAR_HEIGHT + availableHeight / 2 + FULLSCREEN_PADDING / 2;

    setDimensions({ width: newWidth, height: newHeight });
    setPosition({ x: targetCenterX - initialLeft, y: targetCenterY - initialTop - newHeight / 2 });
    setIsFullscreen(true);
  }, [isFullscreen, preFullscreenState, dimensions, position]);

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
        className="absolute top-[6vh] left-1/2 -translate-x-1/2"
        style={{ width: dimensions.width, height: dimensions.height, zIndex }}
        onMouseDown={onFocus}
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
          onFocus={onFocus}
        >
          <WindowTitleBar>
            <div className="flex items-center gap-2">
              <CameraIcon />
              <WindowTitle>PHOTO LIBRARY</WindowTitle>
            </div>
            <WindowControls showMaximize={false} showFullscreen={true} onMinimize={onMinimize} onFullscreen={handleFullscreen} onClose={onClose} />
          </WindowTitleBar>

          <div className="flex-1 bg-[#5a4d42] p-3 flex flex-col gap-2">
            {/* Main image display */}
            <div
              className="flex-1 win98-border-sunken flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: selectedPhoto.color }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={selectedPhoto.image}
                  alt={selectedPhoto.label}
                  fill
                  className="object-contain"
                  priority
                />
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

              <div className="flex-1" />

              <button
                onClick={handleNextImage}
                className="win98-border-raised bg-[#c8b9a9] hover:bg-[#d8c9b9] active:win98-border-sunken w-6 h-5 flex items-center justify-center text-[#5a4d42]"
                aria-label="Next image"
              >
                <RightArrowIcon />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div
              className="bg-[#8b7d72] win98-border-sunken p-2"
              onWheel={handleThumbnailScroll}
            >
              <div className="flex gap-3 overflow-hidden justify-center">
                {photoItems.slice(scrollPosition, scrollPosition + VISIBLE_THUMBNAILS).map((photo, displayIndex) => {
                  const actualIndex = scrollPosition + displayIndex;
                  const isSelected = actualIndex === selectedIndex;

                  return (
                    <div
                      key={photo.id}
                      className="flex flex-col items-center cursor-pointer flex-shrink-0"
                      onClick={() => handleThumbnailClick(actualIndex)}
                    >
                      <div
                        className={`w-[115px] h-[90px] win98-border-sunken relative overflow-hidden ${isSelected ? 'ring-2 ring-[#ffdd44]' : ''}`}
                        style={{ backgroundColor: photo.color }}
                      >
                        <Image
                          src={photo.image}
                          alt={photo.label}
                          fill
                          className="object-cover"
                        />
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
