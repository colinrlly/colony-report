"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useWindowContext } from "./window";
import type { WindowControlsProps, WindowControlButtonProps } from "./types";

const MinimizeIcon = () => (
  <svg width="10" height="3" viewBox="0 0 10 3" className="fill-current">
    <rect width="10" height="3" />
  </svg>
);

const MaximizeIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    className="fill-none stroke-current"
    strokeWidth="1.5"
  >
    <rect x="1" y="1" width="10" height="10" />
    <rect x="1" y="1" width="10" height="3" className="fill-current" />
  </svg>
);

const RestoreIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    className="fill-none stroke-current"
    strokeWidth="1.5"
  >
    {/* Back window */}
    <rect x="3" y="0.5" width="8" height="8" />
    <rect x="3" y="0.5" width="8" height="2" className="fill-current" />
    {/* Front window */}
    <rect x="0.5" y="3" width="8" height="8" className="fill-win98-surface" />
    <rect x="0.5" y="3" width="8" height="8" />
    <rect x="0.5" y="3" width="8" height="2" className="fill-current" />
  </svg>
);

const CloseIcon = () => (
  <svg width="12" height="11" viewBox="0 0 12 11" className="fill-current">
    <path d="M0 0h2.5l3.5 4.5 3.5-4.5H12L7.5 5.5 12 11H9.5L6 6.5 2.5 11H0l4.5-5.5z" />
  </svg>
);

export const WindowControlButton = forwardRef<
  HTMLButtonElement,
  WindowControlButtonProps
>(({ className, variant, icon, ...props }, ref) => {
  const { isMaximized } = useWindowContext();

  const defaultIcons = {
    minimize: <MinimizeIcon />,
    maximize: isMaximized ? <RestoreIcon /> : <MaximizeIcon />,
    close: <CloseIcon />,
  };

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "w-[22px] h-[20px]",
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
