"use client";

import Draggable from "react-draggable";
import {
  Window,
  WindowTitleBar,
  WindowTitle,
  WindowControls,
  ResizeGrip,
} from "@/components/ui/window";
import { useWindowResize } from "@/hooks/use-window-resize";

interface SecretPetMonitorProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

// Window dimensions
const BASE_WIDTH = 480;
const BASE_HEIGHT = 400;
const MIN_WIDTH = 320;
const MAX_WIDTH = 600;

export function SecretPetMonitor({ onClose, onMinimize }: SecretPetMonitorProps) {
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
        className="absolute top-[12vh] left-[25vw] z-30"
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
            willChange: isResizing ? "transform" : "auto",
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

          <div className="flex-1 bg-black win98-border-sunken m-[2px] flex items-center justify-center overflow-hidden">
            <div className="w-full h-full relative flex items-center justify-center">
              {/* CRT scanline overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.3) 2px, rgba(0, 0, 0, 0.3) 4px)",
                }}
              />

              <div className="text-green-500 font-mono text-sm flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span>LIVE FEED</span>
                </div>
                <span className="text-xs text-green-400/60">
                  Connecting to camera...
                </span>
              </div>

              <div className="absolute bottom-2 right-2 text-green-500/80 font-mono text-xs">
                CAM_07 // PET_MONITOR
              </div>

              <div className="absolute top-2 left-2 flex items-center gap-1">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                <span className="text-red-500 font-mono text-xs">REC</span>
              </div>
            </div>
          </div>

          <div className="h-[22px] flex items-center px-2 bg-win98-surface border-t border-win98-shadow">
            <div className="win98-border-status px-2 py-0.5 flex-1">
              <span className="text-[10px] text-win98-text">
                Status: Active | Signal: Strong | Encryption: Enabled
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
