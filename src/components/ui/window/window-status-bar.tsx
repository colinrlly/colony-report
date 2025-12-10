"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { WindowStatusBarProps, WindowStatusFieldProps } from "./types";

export const WindowStatusBar = forwardRef<HTMLDivElement, WindowStatusBarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-1",
          "h-[22px] px-1",
          "bg-win98-surface",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
WindowStatusBar.displayName = "WindowStatusBar";

export const WindowStatusField = forwardRef<
  HTMLDivElement,
  WindowStatusFieldProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex-1 px-1", "win98-border-status", "truncate", className)}
      {...props}
    >
      {children}
    </div>
  );
});
WindowStatusField.displayName = "WindowStatusField";
