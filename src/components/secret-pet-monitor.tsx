"use client";

import {
  Window,
  WindowTitleBar,
  WindowTitle,
  WindowControls,
} from "@/components/ui/window";

interface SecretPetMonitorProps {
  onClose?: () => void;
}

export function SecretPetMonitor({ onClose }: SecretPetMonitorProps) {
  return (
    <Window className="w-[480px] h-[400px] absolute top-[12vh] left-[25vw] flex flex-col">
      <WindowTitleBar>
        <WindowTitle>secret_pet_monitor</WindowTitle>
        <WindowControls
          showMaximize={false}
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
  );
}
