"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import {
  Window,
  WindowTitleBar,
  WindowTitle,
  WindowControls,
} from "@/components/ui/window";

interface SecurityCameraFeedProps {
  cameraNumber: number;
  onClose?: () => void;
  onMinimize?: () => void;
  warningMode?: boolean;
}

const MENUBAR_HEIGHT = 36;
const TASKBAR_HEIGHT = 40;

// Base dimensions for the window content
const BASE_WIDTH = 420;
const BASE_HEIGHT = 360;
const ASPECT_RATIO = BASE_WIDTH / BASE_HEIGHT;

// Resize constraints
const MIN_WIDTH = 300;
const MAX_WIDTH = 560;

interface Bounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
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

// Different signal lost messages for variety
const SIGNAL_MESSAGES = [
  "SIGNAL LOST",
  "NO SIGNAL",
  "SIGNAL TEMPORARILY DOWN",
  "CONNECTION INTERRUPTED",
  "FEED UNAVAILABLE",
  "RECONNECTING...",
];

// Camera location names for each camera
const CAMERA_LOCATIONS: Record<number, string> = {
  1: "MAIN TUNNEL - ENTRANCE",
  2: "FOOD STORAGE - SECTOR B",
  3: "NURSERY CHAMBER",
  4: "WEST HALLWAY A",
};

export function SecurityCameraFeed({ cameraNumber, onClose, onMinimize, warningMode = false }: SecurityCameraFeedProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bounds, setBounds] = useState<Bounds | undefined>(undefined);
  const [dimensions, setDimensions] = useState({ width: BASE_WIDTH, height: BASE_HEIGHT });
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartRef = useRef({ mouseX: 0, mouseY: 0, width: BASE_WIDTH, height: BASE_HEIGHT });

  const [isFlickering, setIsFlickering] = useState(false);
  const [isSignalLost, setIsSignalLost] = useState(false);
  const [signalMessage, setSignalMessage] = useState(SIGNAL_MESSAGES[0]);
  const [staticIntensity, setStaticIntensity] = useState(0);

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
    window.addEventListener("resize", calculateBounds);
    return () => window.removeEventListener("resize", calculateBounds);
  }, [calculateBounds]);

  const handleDrag = useCallback((_e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  }, []);

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

      // Use larger delta to determine size, maintaining aspect ratio
      const deltaForRatio = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY * ASPECT_RATIO;

      let newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, resizeStartRef.current.width + deltaForRatio));
      let newHeight = newWidth / ASPECT_RATIO;

      // Prevent window from overlapping the taskbar
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

  // Random flicker effect
  useEffect(() => {
    const triggerFlicker = () => {
      // Random chance to flicker (roughly every 3-8 seconds on average)
      const flickerChance = Math.random();

      if (flickerChance < 0.15) {
        // Quick flicker
        setIsFlickering(true);
        setTimeout(() => setIsFlickering(false), 100 + Math.random() * 150);
      } else if (flickerChance < 0.25) {
        // Longer static burst
        setStaticIntensity(0.3 + Math.random() * 0.4);
        setTimeout(() => setStaticIntensity(0), 200 + Math.random() * 300);
      } else if (flickerChance < 0.30) {
        // Signal loss (longer duration)
        setIsSignalLost(true);
        setSignalMessage(SIGNAL_MESSAGES[Math.floor(Math.random() * SIGNAL_MESSAGES.length)]);
        setTimeout(() => setIsSignalLost(false), 1500 + Math.random() * 2500);
      }
    };

    // Check for flicker every second
    const interval = setInterval(triggerFlicker, 1000);

    // Initial signal lost state for dramatic effect
    setIsSignalLost(true);
    setSignalMessage("ESTABLISHING CONNECTION...");
    setTimeout(() => setIsSignalLost(false), 1500);

    return () => clearInterval(interval);
  }, []);

  // Generate random static noise pattern
  const generateStaticStyle = useCallback(() => {
    if (staticIntensity === 0) return {};
    return {
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      opacity: staticIntensity,
    };
  }, [staticIntensity]);

  const location = CAMERA_LOCATIONS[cameraNumber] || "UNKNOWN SECTOR";
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
        className="absolute z-30"
        style={{
          top: `${12 + (cameraNumber - 1) * 3}vh`,
          left: `${20 + (cameraNumber - 1) * 4}vw`,
          width: dimensions.width,
          height: dimensions.height,
        }}
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
            <WindowTitle>Ant Hill - Cam {cameraNumber}</WindowTitle>
            <WindowControls
              showMaximize={false}
              onMinimize={onMinimize}
              onClose={onClose}
            />
          </WindowTitleBar>

          {/* Video feed area - black background for the camera stream */}
          <div className="flex-1 bg-black win98-border-sunken m-[2px] flex items-center justify-center overflow-hidden">
            <div className="w-full h-full relative flex items-center justify-center">
              {/* Scanline overlay effect for CRT monitor look */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.4) 2px, rgba(0, 0, 0, 0.4) 4px)',
                }}
              />

              {/* Static noise overlay */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay"
                style={generateStaticStyle()}
              />

              {/* Flicker overlay */}
              {isFlickering && (
                <div className="absolute inset-0 bg-white/20 pointer-events-none" />
              )}

              {/* Main content area */}
              {isSignalLost ? (
                // Signal lost screen
                <div className="text-center">
                  <div className="text-gray-400 font-mono text-lg mb-2 animate-pulse">
                    {signalMessage}
                  </div>
                  <div className="flex justify-center gap-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
                  </div>
                  <div className="text-gray-600 font-mono text-xs mt-4">
                    CAM_{cameraNumber.toString().padStart(2, '0')} // {location}
                  </div>
                </div>
              ) : warningMode ? (
                // Warning mode - special animation placeholder for security alert
                <div className="text-red-500 font-mono text-sm flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="animate-pulse">ALERT - MOVEMENT DETECTED</span>
                  </div>
                  <span className="text-xs text-red-400/80">[Warning GIF Placeholder]</span>
                  <span className="text-xs text-red-400/60 mt-2">Unusual Activity Recorded</span>
                </div>
              ) : (
                // Active feed placeholder - normal mode
                <div className="text-green-500 font-mono text-sm flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span>LIVE FEED</span>
                  </div>
                  <span className="text-xs text-green-400/60">[Animation Placeholder]</span>
                  <span className="text-xs text-green-400/40 mt-2">Monitoring Active</span>
                </div>
              )}

              {/* Corner timestamp overlay - always visible */}
              <div className="absolute bottom-2 right-2 text-green-500/80 font-mono text-xs">
                CAM_{cameraNumber.toString().padStart(2, '0')} // ANT_HILL
              </div>

              {/* Location overlay */}
              <div className="absolute bottom-2 left-2 text-green-500/60 font-mono text-[10px]">
                {location}
              </div>

              {/* Corner recording indicator */}
              {!isSignalLost && (
                <div className="absolute top-2 left-2 flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                  <span className="text-red-500 font-mono text-xs">REC</span>
                </div>
              )}

              {/* Camera number in top right */}
              <div className="absolute top-2 right-2 text-green-500/60 font-mono text-xs border border-green-500/30 px-2 py-0.5">
                CAM {cameraNumber}
              </div>

              {/* Vignette effect for that old monitor look */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)',
                }}
              />
            </div>
          </div>

          {/* Status bar at bottom */}
          <div className="h-[22px] flex items-center px-2 bg-win98-surface border-t border-win98-shadow">
            <div className="win98-border-status px-2 py-0.5 flex-1">
              <span className="text-[10px] text-win98-text">
                {isSignalLost
                  ? "Status: Reconnecting... | Signal: Weak"
                  : "Status: Active | Signal: Good | Recording: Enabled"
                }
              </span>
            </div>
          </div>
        </Window>

        {/* Resize grip in bottom-right corner */}
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
