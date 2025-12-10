"use client";

import { forwardRef, createContext, useContext } from "react";
import { cn } from "@/lib/utils";
import type { WindowProps } from "./types";

const WindowContext = createContext<{ active: boolean }>({ active: true });
export const useWindowContext = () => useContext(WindowContext);

export const Window = forwardRef<HTMLDivElement, WindowProps>(
  ({ className, active = true, children, ...props }, ref) => {
    return (
      <WindowContext.Provider value={{ active }}>
        <div
          ref={ref}
          className={cn(
            "bg-win98-surface",
            "win98-border-raised",
            "p-[3px]",
            "text-win98-text text-[11px]",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </WindowContext.Provider>
    );
  }
);
Window.displayName = "Window";
