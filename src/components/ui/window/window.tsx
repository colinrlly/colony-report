"use client";

import { forwardRef, createContext, useContext, useRef } from "react";
import Draggable from "react-draggable";
import { cn } from "@/lib/utils";
import type { WindowProps } from "./types";

const WindowContext = createContext<{ active: boolean }>({ active: true });
export const useWindowContext = () => useContext(WindowContext);

export const Window = forwardRef<HTMLDivElement, WindowProps>(
  ({ className, active = true, children, ...props }, ref) => {
    const nodeRef = useRef<HTMLDivElement>(null);

    return (
      <WindowContext.Provider value={{ active }}>
        <Draggable nodeRef={nodeRef} handle=".window-drag-handle">
          <div
            ref={nodeRef}
            className={cn(
              "bg-win98-surface",
              "win98-border-raised",
              "p-[3px]",
              "text-win98-text text-[11px]",
              "resize overflow-auto",
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
