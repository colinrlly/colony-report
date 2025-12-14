"use client";

import { useState, useEffect, useCallback } from "react";
import Draggable from "react-draggable";
import {
  Window,
  WindowTitleBar,
  WindowTitle,
  WindowControls,
  ResizeGrip,
} from "@/components/ui/window";
import { useWindowResize } from "@/hooks/use-window-resize";

interface SecurityCameraFeedProps {
  cameraNumber: number;
  onClose?: () => void;
  onMinimize?: () => void;
  warningMode?: boolean;
}

// Window dimensions
const BASE_WIDTH = 420;
const BASE_HEIGHT = 360;
const MIN_WIDTH = 300;
const MAX_WIDTH = 560;

// Signal messages for camera feed effects
const SIGNAL_MESSAGES = [
  "SIGNAL LOST",
  "NO SIGNAL",
  "SIGNAL TEMPORARILY DOWN",
  "CONNECTION INTERRUPTED",
  "FEED UNAVAILABLE",
  "RECONNECTING...",
];

const CAMERA_LOCATIONS: Record<number, string> = {
  1: "MAIN TUNNEL - ENTRANCE",
  2: "FOOD STORAGE - SECTOR B",
  3: "NURSERY CHAMBER",
  4: "WEST HALLWAY A",
};

export function SecurityCameraFeed({
  cameraNumber,
  onClose,
  onMinimize,
  warningMode = false,
}: SecurityCameraFeedProps) {
  const {
    nodeRef,
    position,
    bounds,
    dimensions,
    isResizing,
    scaleFactor,
    handleDrag,
    handleResizeStart,
  } = useWindowResize({
    baseWidth: BASE_WIDTH,
    baseHeight: BASE_HEIGHT,
    minWidth: MIN_WIDTH,
    maxWidth: MAX_WIDTH,
  });

  const [isFlickering, setIsFlickering] = useState(false);
  const [isSignalLost, setIsSignalLost] = useState(false);
  const [signalMessage, setSignalMessage] = useState(SIGNAL_MESSAGES[0]);
  const [staticIntensity, setStaticIntensity] = useState(0);

  // Random flicker effect
  useEffect(() => {
    const triggerFlicker = () => {
      const flickerChance = Math.random();

      if (flickerChance < 0.15) {
        setIsFlickering(true);
        setTimeout(() => setIsFlickering(false), 100 + Math.random() * 150);
      } else if (flickerChance < 0.25) {
        setStaticIntensity(0.3 + Math.random() * 0.4);
        setTimeout(() => setStaticIntensity(0), 200 + Math.random() * 300);
      } else if (flickerChance < 0.3) {
        setIsSignalLost(true);
        setSignalMessage(
          SIGNAL_MESSAGES[Math.floor(Math.random() * SIGNAL_MESSAGES.length)]
        );
        setTimeout(() => setIsSignalLost(false), 1500 + Math.random() * 2500);
      }
    };

    const interval = setInterval(triggerFlicker, 1000);

    // Initial connection animation
    setIsSignalLost(true);
    setSignalMessage("ESTABLISHING CONNECTION...");
    setTimeout(() => setIsSignalLost(false), 1500);

    return () => clearInterval(interval);
  }, []);

  const generateStaticStyle = useCallback(() => {
    if (staticIntensity === 0) return {};
    return {
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      opacity: staticIntensity,
    };
  }, [staticIntensity]);

  const location = CAMERA_LOCATIONS[cameraNumber] || "UNKNOWN SECTOR";

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
            willChange: isResizing ? "transform" : "auto",
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

          {/* Video feed area */}
          <div className="flex-1 bg-black win98-border-sunken m-[2px] flex items-center justify-center overflow-hidden">
            <div className="w-full h-full relative flex items-center justify-center">
              {/* CRT scanline overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.4) 2px, rgba(0, 0, 0, 0.4) 4px)",
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

              {/* Main content */}
              {isSignalLost ? (
                <div className="text-center">
                  <div className="text-gray-400 font-mono text-lg mb-2 animate-pulse">
                    {signalMessage}
                  </div>
                  <div className="flex justify-center gap-1">
                    <span
                      className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"
                      style={{ animationDelay: "200ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"
                      style={{ animationDelay: "400ms" }}
                    />
                  </div>
                  <div className="text-gray-600 font-mono text-xs mt-4">
                    CAM_{cameraNumber.toString().padStart(2, "0")} // {location}
                  </div>
                </div>
              ) : warningMode ? (
                <div className="text-red-500 font-mono text-sm flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="animate-pulse">ALERT - MOVEMENT DETECTED</span>
                  </div>
                  <span className="text-xs text-red-400/80">
                    [Warning GIF Placeholder]
                  </span>
                  <span className="text-xs text-red-400/60 mt-2">
                    Unusual Activity Recorded
                  </span>
                </div>
              ) : (
                <div className="text-green-500 font-mono text-sm flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span>LIVE FEED</span>
                  </div>
                  <span className="text-xs text-green-400/60">
                    [Animation Placeholder]
                  </span>
                  <span className="text-xs text-green-400/40 mt-2">
                    Monitoring Active
                  </span>
                </div>
              )}

              {/* Camera ID overlay */}
              <div className="absolute bottom-2 right-2 text-green-500/80 font-mono text-xs">
                CAM_{cameraNumber.toString().padStart(2, "0")} // ANT_HILL
              </div>

              {/* Location overlay */}
              <div className="absolute bottom-2 left-2 text-green-500/60 font-mono text-[10px]">
                {location}
              </div>

              {/* Recording indicator */}
              {!isSignalLost && (
                <div className="absolute top-2 left-2 flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                  <span className="text-red-500 font-mono text-xs">REC</span>
                </div>
              )}

              {/* Camera number badge */}
              <div className="absolute top-2 right-2 text-green-500/60 font-mono text-xs border border-green-500/30 px-2 py-0.5">
                CAM {cameraNumber}
              </div>

              {/* Vignette effect */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
                }}
              />
            </div>
          </div>

          {/* Status bar */}
          <div className="h-[22px] flex items-center px-2 bg-win98-surface border-t border-win98-shadow">
            <div className="win98-border-status px-2 py-0.5 flex-1">
              <span className="text-[10px] text-win98-text">
                {isSignalLost
                  ? "Status: Reconnecting... | Signal: Weak"
                  : "Status: Active | Signal: Good | Recording: Enabled"}
              </span>
            </div>
          </div>
        </Window>

        {/* Resize grip */}
        <div
          onMouseDown={handleResizeStart}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize flex items-center justify-center z-50"
          style={{ touchAction: "none" }}
        >
          <ResizeGrip />
        </div>
      </div>
    </Draggable>
  );
}
