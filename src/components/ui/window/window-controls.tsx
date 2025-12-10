"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useWindowContext } from "./window";
import type { WindowControlsProps, WindowControlButtonProps } from "./types";

const MinimizeIcon = () => (
  <svg width="6" height="2" viewBox="0 0 6 2" className="fill-current">
    <rect width="6" height="2" />
  </svg>
);

const MaximizeIcon = () => (
  <svg
    width="9"
    height="9"
    viewBox="0 0 9 9"
    className="fill-none stroke-current"
    strokeWidth="1"
  >
    <rect x="0.5" y="0.5" width="8" height="8" />
    <rect x="0.5" y="0.5" width="8" height="2" className="fill-current" />
  </svg>
);

const CloseIcon = () => (
  <svg width="8" height="7" viewBox="0 0 8 7" className="fill-current">
    <path d="M0 0h2l2 3 2-3h2L5.5 3.5 8 7H6L4 4 2 7H0l2.5-3.5z" />
  </svg>
);

export const WindowControlButton = forwardRef<
  HTMLButtonElement,
  WindowControlButtonProps
>(({ className, variant, icon, ...props }, ref) => {
  const defaultIcons = {
    minimize: <MinimizeIcon />,
    maximize: <MaximizeIcon />,
    close: <CloseIcon />,
  };

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "w-[16px] h-[14px]",
        "flex items-center justify-center",
        "bg-win98-surface",
        "win98-border-raised",
        "active:win98-border-pressed",
        "focus:outline-none",
        className
      )}
      {...props}
    >
      {icon ?? defaultIcons[variant]}
    </button>
  );
});
WindowControlButton.displayName = "WindowControlButton";

export const WindowControls = forwardRef<HTMLDivElement, WindowControlsProps>(
  (
    {
      className,
      showMinimize = true,
      showMaximize = true,
      showClose = true,
      minimizeIcon,
      maximizeIcon,
      closeIcon,
      onMinimize,
      onMaximize,
      onClose,
      ...props
    },
    ref
  ) => {
    const { toggleMaximize } = useWindowContext();

    const handleMaximize = () => {
      toggleMaximize();
      onMaximize?.();
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-[2px]", className)}
        {...props}
      >
        {showMinimize && (
          <WindowControlButton
            variant="minimize"
            icon={minimizeIcon}
            onClick={onMinimize}
            aria-label="Minimize"
          />
        )}
        {showMaximize && (
          <WindowControlButton
            variant="maximize"
            icon={maximizeIcon}
            onClick={handleMaximize}
            aria-label="Maximize"
          />
        )}
        {showClose && (
          <WindowControlButton
            variant="close"
            icon={closeIcon}
            onClick={onClose}
            aria-label="Close"
          />
        )}
      </div>
    );
  }
);
WindowControls.displayName = "WindowControls";
