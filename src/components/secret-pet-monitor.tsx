"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import {
  Window,
  WindowTitleBar,
  WindowTitle,
  WindowControls,
} from "@/components/ui/window";

// Constants for menu bar and taskbar heights
const MENUBAR_HEIGHT = 36;
const TASKBAR_HEIGHT = 40;

// Base dimensions and aspect ratio
const BASE_WIDTH = 480;
const BASE_HEIGHT = 400;
const ASPECT_RATIO = BASE_WIDTH / BASE_HEIGHT;
const MIN_WIDTH = 320;
const MAX_WIDTH = 800;

// Resize grip icon component
function ResizeGrip() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ display: 'block' }}>
      {/* Diagonal grip pattern */}
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

interface SecretPetMonitorProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

export function SecretPetMonitor({ onClose, onMinimize }: SecretPetMonitorProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bounds, setBounds] = useState<{ left: number; top: number; right: number; bottom: number } | undefined>(undefined);

  // Resize state
  const [dimensions, setDimensions] = useState({ width: BASE_WIDTH, height: BASE_HEIGHT });
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartRef = useRef({ mouseX: 0, mouseY: 0, width: BASE_WIDTH, height: BASE_HEIGHT });

  const calculateBounds = useCallback(() => {
    if (!nodeRef.current) return;

    const windowRect = nodeRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate the initial position of the window (before any dragging)
    const initialLeft = windowRect.left - position.x;
    const initialTop = windowRect.top - position.y;

    // Bounds are relative to the initial position
    const leftBound = -initialLeft;
    const rightBound = viewportWidth - initialLeft - windowRect.width;
    const topBound = MENUBAR_HEIGHT - initialTop;
    const bottomBound = viewportHeight - TASKBAR_HEIGHT - initialTop - windowRect.height;

    setBounds({
      left: leftBound,
      top: topBound,
      right: rightBound,
      bottom: bottomBound,
    });
  }, [position]);

  useEffect(() => {
    calculateBounds();

    const handleResize = () => calculateBounds();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [calculateBounds]);

  const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

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

      // Use the larger delta to determine the new size (maintaining aspect ratio)
      // This makes the resize feel more natural
      const deltaForRatio = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY * ASPECT_RATIO;

      let newWidth = resizeStartRef.current.width + deltaForRatio;
      newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth));

      let newHeight = newWidth / ASPECT_RATIO;

      // Prevent window from overlapping the taskbar
      if (nodeRef.current) {
        const windowTop = nodeRef.current.getBoundingClientRect().top;
        const availableHeight = window.innerHeight - TASKBAR_HEIGHT - windowTop;

        if (newHeight > availableHeight) {
          newHeight = availableHeight;
          newWidth = newHeight * ASPECT_RATIO;
          // Ensure we don't go below minimum
          if (newWidth < MIN_WIDTH) {
            newWidth = MIN_WIDTH;
            newHeight = newWidth / ASPECT_RATIO;
          }
        }
      }

      setDimensions({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Change cursor globally while resizing
    document.body.style.cursor = 'nwse-resize';
    document.body.style.userSelect = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  // Calculate scale factor
  const scaleFactor = dimensions.width / BASE_WIDTH;

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-drag-handle"
      position={position}
      onDrag={handleDrag}
      bounds={bounds}
    >
      <div
        ref={nodeRef}
        className="absolute top-[12vh] left-[25vw] z-30"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
        }}
      >
        {/* Inner scaled content - renders at base size, then scaled */}
        <Window
          resizable={false}
          draggable={false}
          className="flex flex-col absolute top-0 left-0 origin-top-left"
          style={{
            width: `${BASE_WIDTH}px`,
            height: `${BASE_HEIGHT}px`,
            transform: `scale(${scaleFactor})`,
            willChange: isResizing ? 'transform' : 'auto',
          }}
        >
          <WindowTitleBar>
            <WindowTitle>secret_pet_monitor</WindowTitle>
            <WindowControls
              showMaximize={false}
              onMinimize={onMinimize}
              onClose={onClose}
            />
          </WindowTitleBar>

          {/* Video feed area - black background for the camera stream */}
          <div className="flex-1 bg-black win98-border-sunken m-[2px] flex items-center justify-center overflow-hidden">
            {/* Placeholder for animation - will be replaced with actual content */}
            <div className="w-full h-full relative flex items-center justify-center">
              {/* Scanline overlay effect for CRT monitor look */}
              <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.3) 2px, rgba(0, 0, 0, 0.3) 4px)',
                }}
              />

              {/* Placeholder text - can be replaced with video/animation */}
              <div className="text-green-500 font-mono text-sm flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span>LIVE FEED</span>
                </div>
                <span className="text-xs text-green-400/60">Connecting to camera...</span>
              </div>

              {/* Corner timestamp overlay */}
              <div className="absolute bottom-2 right-2 text-green-500/80 font-mono text-xs">
                CAM_07 // PET_MONITOR
              </div>

              {/* Corner recording indicator */}
              <div className="absolute top-2 left-2 flex items-center gap-1">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                <span className="text-red-500 font-mono text-xs">REC</span>
              </div>
            </div>
          </div>

          {/* Status bar at bottom */}
          <div className="h-[22px] flex items-center px-2 bg-win98-surface border-t border-win98-shadow">
            <div className="win98-border-status px-2 py-0.5 flex-1">
              <span className="text-[10px] text-win98-text">Status: Active | Signal: Strong | Encryption: Enabled</span>
            </div>
          </div>
        </Window>

        {/* Resize Handle - Outside scaled content so it stays at correct position */}
        <div
          onMouseDown={handleResizeStart}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize flex items-center justify-center z-50"
          style={{
            touchAction: 'none',
          }}
        >
          <ResizeGrip />
        </div>
      </div>
    </Draggable>
  );
}
