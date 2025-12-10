"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useWindowContext } from "./window";
import type { WindowTitleBarProps } from "./types";

export const WindowTitleBar = forwardRef<HTMLDivElement, WindowTitleBarProps>(
  ({ className, children, ...props }, ref) => {
    const { active } = useWindowContext();

    return (
      <div
        ref={ref}
        className={cn(
          "window-drag-handle",
          "flex items-center justify-between",
          "h-[18px] px-[2px]",
          "select-none",
          "cursor-grab active:cursor-grabbing",
          active ? "bg-win98-title-active" : "bg-win98-title-inactive",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
WindowTitleBar.displayName = "WindowTitleBar";
