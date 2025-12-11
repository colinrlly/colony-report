import { HTMLAttributes, ReactNode, ButtonHTMLAttributes } from "react";

export interface WindowProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  resizable?: boolean;
  children: ReactNode;
  /** If set, window will snap to the right of this x-coordinate when dropped overlapping it */
  leftSnapBoundary?: number;
}

export interface WindowTitleBarProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface WindowIconProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
}

export interface WindowTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export interface WindowControlsProps extends HTMLAttributes<HTMLDivElement> {
  showMinimize?: boolean;
  showMaximize?: boolean;
  showClose?: boolean;
  minimizeIcon?: ReactNode;
  maximizeIcon?: ReactNode;
  closeIcon?: ReactNode;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
}

export interface WindowControlButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "minimize" | "maximize" | "close";
  icon?: ReactNode;
}

export interface WindowContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface WindowStatusBarProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface WindowStatusFieldProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
