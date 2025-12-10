"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { WindowIconProps } from "./types";

export const WindowIcon = forwardRef<HTMLDivElement, WindowIconProps>(
  ({ className, src, alt = "Window icon", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("w-[16px] h-[16px] flex-shrink-0", className)}
        {...props}
      >
        {src ? (
          <Image src={src} alt={alt} width={16} height={16} className="w-full h-full object-contain" />
        ) : (
          <svg
            viewBox="0 0 16 16"
            className="w-full h-full"
            fill="currentColor"
          >
            <rect x="2" y="2" width="12" height="12" fill="#808080" />
            <rect x="3" y="3" width="10" height="10" fill="#c0c0c0" />
            <rect x="3" y="3" width="10" height="2" fill="#000080" />
          </svg>
        )}
      </div>
    );
  }
);
WindowIcon.displayName = "WindowIcon";
