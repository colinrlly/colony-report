"use client";

import { createContext, useContext, useRef, useState, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { cn } from "@/lib/utils";
import type { WindowProps } from "./types";

interface WindowContextValue {
  active: boolean;
  isMaximized: boolean;
  toggleMaximize: () => void;
}

const WindowContext = createContext<WindowContextValue>({
  active: true,
  isMaximized: false,
  toggleMaximize: () => {},
});
export const useWindowContext = () => useContext(WindowContext);

// Constants for menu bar and taskbar heights
const MENUBAR_HEIGHT = 36;
const TASKBAR_HEIGHT = 40;

export const Window = forwardRef<HTMLDivElement, WindowProps>(function Window({ className, active = true, children, ...props }, ref) {
  const nodeRef = useRef<HTMLDivElement>(null);

  // Expose the internal ref to the parent via forwardRef
  useImperativeHandle(ref, () => nodeRef.current!, []);
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [savedPosition, setSavedPosition] = useState({ x: 0, y: 0 });
  const [bounds, setBounds] = useState<{ left: number; top: number; right: number; bottom: number } | undefined>(undefined);

  const calculateBounds = useCallback(() => {
    if (!nodeRef.current) return;

    const windowRect = nodeRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate the initial position of the window (before any dragging)
    const initialLeft = windowRect.left - position.x;
    const initialTop = windowRect.top - position.y;

    // Bounds are relative to the initial position
    // Left bound: prevent going off left edge
    const leftBound = -initialLeft;
    // Right bound: prevent going off right edge
    const rightBound = viewportWidth - initialLeft - windowRect.width;
    // Top bound: keep below menubar
    const topBound = MENUBAR_HEIGHT - initialTop;
    // Bottom bound: keep above taskbar
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

  const toggleMaximize = () => {
    if (!isMaximized) {
      // Save current position before maximizing
      setSavedPosition(position);
    } else {
      // Restore position when un-maximizing
      setPosition(savedPosition);
    }
    setIsMaximized((prev) => !prev);
  };

  const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <WindowContext.Provider value={{ active, isMaximized, toggleMaximize }}>
      <Draggable
        nodeRef={nodeRef}
        handle=".window-drag-handle"
        disabled={isMaximized}
        position={isMaximized ? { x: 0, y: 0 } : position}
        onDrag={handleDrag}
        bounds={bounds}
      >
        <div
          ref={nodeRef}
          className={cn(
            "bg-win98-surface",
            "win98-border-raised",
            "p-[3px]",
            "text-win98-text text-[11px]",
            isMaximized
              ? "!fixed !top-[36px] !left-0 !right-0 !bottom-[40px] !w-auto !h-auto !transform-none !max-w-none !max-h-none"
              : "resize overflow-auto",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </Draggable>
    </WindowContext.Provider>
  );
});
