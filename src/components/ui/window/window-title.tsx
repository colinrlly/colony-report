"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useWindowContext } from "./window";
import type { WindowTitleProps } from "./types";

export const WindowTitle = forwardRef<HTMLHeadingElement, WindowTitleProps>(
  ({ className, children, ...props }, ref) => {
    const { active } = useWindowContext();

    return (
      <h1
        ref={ref}
        className={cn(
          "text-[11px] font-bold truncate",
          active ? "text-white" : "text-[var(--win98-title-inactive-text)]",
          className
        )}
        {...props}
      >
        {children}
      </h1>
    );
  }
);
WindowTitle.displayName = "WindowTitle";
