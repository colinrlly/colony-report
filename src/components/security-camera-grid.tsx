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

interface SecurityCameraGridProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

// Window dimensions
const BASE_WIDTH = 560;
const BASE_HEIGHT = 480;
const MIN_WIDTH = 400;
const MAX_WIDTH = 700;

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

interface CameraState {
  isFlickering: boolean;
  isSignalLost: boolean;
  signalMessage: string;
  staticIntensity: number;
}

function CameraCell({ cameraNumber }: { cameraNumber: number }) {
  const [state, setState] = useState<CameraState>({
    isFlickering: false,
    isSignalLost: true,
    signalMessage: "ESTABLISHING CONNECTION...",
    staticIntensity: 0,
  });

  useEffect(() => {
    const triggerFlicker = () => {
      const flickerChance = Math.random();

      if (flickerChance < 0.15) {
        setState((prev) => ({ ...prev, isFlickering: true }));
        setTimeout(
          () => setState((prev) => ({ ...prev, isFlickering: false })),
          100 + Math.random() * 150
        );
      } else if (flickerChance < 0.25) {
        const intensity = 0.3 + Math.random() * 0.4;
        setState((prev) => ({ ...prev, staticIntensity: intensity }));
        setTimeout(
          () => setState((prev) => ({ ...prev, staticIntensity: 0 })),
          200 + Math.random() * 300
        );
      } else if (flickerChance < 0.3) {
        setState((prev) => ({
          ...prev,
          isSignalLost: true,
          signalMessage:
            SIGNAL_MESSAGES[Math.floor(Math.random() * SIGNAL_MESSAGES.length)],
        }));
        setTimeout(
          () => setState((prev) => ({ ...prev, isSignalLost: false })),
          1500 + Math.random() * 2500
        );
      }
    };

    const interval = setInterval(triggerFlicker, 1000);
    setTimeout(() => setState((prev) => ({ ...prev, isSignalLost: false })), 1500);

    return () => clearInterval(interval);
  }, []);

  const generateStaticStyle = useCallback(() => {
    if (state.staticIntensity === 0) return {};
    return {
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      opacity: state.staticIntensity,
    };
  }, [state.staticIntensity]);

  const location = CAMERA_LOCATIONS[cameraNumber] || "UNKNOWN SECTOR";

  return (
    <div className="bg-black win98-border-sunken flex items-center justify-center overflow-hidden relative">
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
      {state.isFlickering && (
        <div className="absolute inset-0 bg-white/20 pointer-events-none" />
      )}

      {/* Main content */}
      {state.isSignalLost ? (
        <div className="text-center">
          <div className="text-gray-400 font-mono text-xs mb-1 animate-pulse">
            {state.signalMessage}
          </div>
          <div className="flex justify-center gap-1">
            <span
              className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse"
              style={{ animationDelay: "200ms" }}
            />
            <span
              className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse"
              style={{ animationDelay: "400ms" }}
            />
          </div>
        </div>
      ) : (
        <div className="text-green-500 font-mono text-xs flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            <span className="text-[10px]">LIVE</span>
          </div>
          <span className="text-[8px] text-green-400/40">Monitoring Active</span>
        </div>
      )}

      {/* Camera ID overlay */}
      <div className="absolute bottom-1 right-1 text-green-500/80 font-mono text-[8px]">
        CAM_{cameraNumber.toString().padStart(2, "0")}
      </div>

      {/* Location overlay */}
      <div className="absolute bottom-1 left-1 text-green-500/60 font-mono text-[7px] max-w-[60%] truncate">
        {location}
      </div>

      {/* Recording indicator */}
      {!state.isSignalLost && (
        <div className="absolute top-1 left-1 flex items-center gap-0.5">
          <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
          <span className="text-red-500 font-mono text-[8px]">REC</span>
        </div>
      )}

      {/* Camera number badge */}
      <div className="absolute top-1 right-1 text-green-500/60 font-mono text-[8px] border border-green-500/30 px-1">
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
  );
}

export function SecurityCameraGrid({
  onClose,
  onMinimize,
}: SecurityCameraGridProps) {
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
          top: "10vh",
          left: "50%",
          marginLeft: -dimensions.width / 2,
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
            <WindowTitle>Ant Hill - All Cameras</WindowTitle>
            <WindowControls
              showMaximize={false}
              onMinimize={onMinimize}
              onClose={onClose}
            />
          </WindowTitleBar>

          {/* 2x2 Camera grid */}
          <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-1 p-1 bg-win98-surface">
            <CameraCell cameraNumber={1} />
            <CameraCell cameraNumber={2} />
            <CameraCell cameraNumber={3} />
            <CameraCell cameraNumber={4} />
          </div>

          {/* Status bar */}
          <div className="h-[22px] flex items-center px-2 bg-win98-surface border-t border-win98-shadow">
            <div className="win98-border-status px-2 py-0.5 flex-1">
              <span className="text-[10px] text-win98-text">
                All Cameras | 4 Feeds Active | Recording: Enabled
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
