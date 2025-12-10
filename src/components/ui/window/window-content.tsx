"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { WindowContentProps } from "./types";

export const WindowContent = forwardRef<HTMLDivElement, WindowContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("bg-win98-surface", "p-2", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
WindowContent.displayName = "WindowContent";
