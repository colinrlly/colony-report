"use client";

import { forwardRef, createContext, useContext, useRef, useState } from "react";
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

export const Window = forwardRef<HTMLDivElement, WindowProps>(
  ({ className, active = true, children, ...props }, ref) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const [isMaximized, setIsMaximized] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [savedPosition, setSavedPosition] = useState({ x: 0, y: 0 });

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
        >
          <div
            ref={nodeRef}
            className={cn(
              "bg-win98-surface",
              "win98-border-raised",
              "p-[3px]",
              "text-win98-text text-[11px]",
              isMaximized
                ? "!absolute !inset-0 !w-full !h-full"
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
  }
);
Window.displayName = "Window";
