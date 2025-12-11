"use client";

import { useState, useEffect, useCallback } from "react";
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

export function SecurityCameraFeed({ cameraNumber, onClose, onMinimize }: SecurityCameraFeedProps) {
  const [isFlickering, setIsFlickering] = useState(false);
  const [isSignalLost, setIsSignalLost] = useState(false);
  const [signalMessage, setSignalMessage] = useState(SIGNAL_MESSAGES[0]);
  const [staticIntensity, setStaticIntensity] = useState(0);

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

  return (
    <Window
      className="w-[420px] h-[360px] absolute flex flex-col"
      style={{
        top: `${12 + (cameraNumber - 1) * 3}vh`,
        left: `${20 + (cameraNumber - 1) * 4}vw`,
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
          ) : (
            // Active feed placeholder
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
  );
}
