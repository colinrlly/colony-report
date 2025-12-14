"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import {
  Window,
  WindowTitleBar,
  WindowTitle,
  WindowControls,
} from "@/components/ui/window";

interface SecurityCameraGridProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

const MENUBAR_HEIGHT = 36;
const TASKBAR_HEIGHT = 40;

// Base dimensions for the window content
const BASE_WIDTH = 560;
const BASE_HEIGHT = 480;
const ASPECT_RATIO = BASE_WIDTH / BASE_HEIGHT;

// Resize constraints
const MIN_WIDTH = 400;
const MAX_WIDTH = 700;

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

  // Random flicker effect
  useEffect(() => {
    const triggerFlicker = () => {
      const flickerChance = Math.random();

      if (flickerChance < 0.15) {
        setState(prev => ({ ...prev, isFlickering: true }));
        setTimeout(() => setState(prev => ({ ...prev, isFlickering: false })), 100 + Math.random() * 150);
      } else if (flickerChance < 0.25) {
        const intensity = 0.3 + Math.random() * 0.4;
        setState(prev => ({ ...prev, staticIntensity: intensity }));
        setTimeout(() => setState(prev => ({ ...prev, staticIntensity: 0 })), 200 + Math.random() * 300);
      } else if (flickerChance < 0.30) {
        setState(prev => ({
          ...prev,
          isSignalLost: true,
          signalMessage: SIGNAL_MESSAGES[Math.floor(Math.random() * SIGNAL_MESSAGES.length)],
        }));
        setTimeout(() => setState(prev => ({ ...prev, isSignalLost: false })), 1500 + Math.random() * 2500);
      }
    };

    const interval = setInterval(triggerFlicker, 1000);

    // Initial signal lost state for dramatic effect
    setTimeout(() => setState(prev => ({ ...prev, isSignalLost: false })), 1500);

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
      {state.isFlickering && (
        <div className="absolute inset-0 bg-white/20 pointer-events-none" />
      )}

      {/* Main content area */}
      {state.isSignalLost ? (
        <div className="text-center">
          <div className="text-gray-400 font-mono text-xs mb-1 animate-pulse">
            {state.signalMessage}
          </div>
          <div className="flex justify-center gap-1">
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
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

      {/* Corner timestamp overlay */}
      <div className="absolute bottom-1 right-1 text-green-500/80 font-mono text-[8px]">
        CAM_{cameraNumber.toString().padStart(2, '0')}
      </div>

      {/* Location overlay */}
      <div className="absolute bottom-1 left-1 text-green-500/60 font-mono text-[7px] max-w-[60%] truncate">
        {location}
      </div>

      {/* Corner recording indicator */}
      {!state.isSignalLost && (
        <div className="absolute top-1 left-1 flex items-center gap-0.5">
          <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
          <span className="text-red-500 font-mono text-[8px]">REC</span>
        </div>
      )}

      {/* Camera number in top right */}
      <div className="absolute top-1 right-1 text-green-500/60 font-mono text-[8px] border border-green-500/30 px-1">
        CAM {cameraNumber}
      </div>

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </div>
  );
}

export function SecurityCameraGrid({ onClose, onMinimize }: SecurityCameraGridProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bounds, setBounds] = useState<Bounds | undefined>(undefined);
  const [dimensions, setDimensions] = useState({ width: BASE_WIDTH, height: BASE_HEIGHT });
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartRef = useRef({ mouseX: 0, mouseY: 0, width: BASE_WIDTH, height: BASE_HEIGHT });

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
            willChange: isResizing ? 'transform' : 'auto',
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

          {/* 2x2 Grid of camera feeds */}
          <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-1 p-1 bg-win98-surface">
            <CameraCell cameraNumber={1} />
            <CameraCell cameraNumber={2} />
            <CameraCell cameraNumber={3} />
            <CameraCell cameraNumber={4} />
          </div>

          {/* Status bar at bottom */}
          <div className="h-[22px] flex items-center px-2 bg-win98-surface border-t border-win98-shadow">
            <div className="win98-border-status px-2 py-0.5 flex-1">
              <span className="text-[10px] text-win98-text">
                All Cameras | 4 Feeds Active | Recording: Enabled
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
