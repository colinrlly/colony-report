"use client";

import { useState, useRef, useEffect, useCallback, RefObject } from "react";
import { DraggableData, DraggableEvent } from "react-draggable";

const MENUBAR_HEIGHT = 36;
const TASKBAR_HEIGHT = 40;

interface Bounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface UseWindowResizeOptions {
  /** Base width of the window content (before scaling) */
  baseWidth: number;
  /** Base height of the window content (before scaling) */
  baseHeight: number;
  /** Minimum width the window can be resized to */
  minWidth: number;
  /** Maximum width the window can be resized to */
  maxWidth: number;
}

interface UseWindowResizeReturn {
  /** Ref to attach to the outer draggable container */
  nodeRef: RefObject<HTMLDivElement | null>;
  /** Current position offset from initial position */
  position: { x: number; y: number };
  /** Calculated drag bounds to keep window on screen */
  bounds: Bounds | undefined;
  /** Current dimensions of the window */
  dimensions: { width: number; height: number };
  /** Whether the window is currently being resized */
  isResizing: boolean;
  /** Scale factor to apply to the window content */
  scaleFactor: number;
  /** Handler for drag events */
  handleDrag: (e: DraggableEvent, data: DraggableData) => void;
  /** Handler to start resize operation (attach to resize grip mousedown) */
  handleResizeStart: (e: React.MouseEvent) => void;
}

/**
 * Custom hook for window drag and resize functionality.
 * Provides smooth scaling-based resize with aspect ratio locking.
 */
export function useWindowResize({
  baseWidth,
  baseHeight,
  minWidth,
  maxWidth,
}: UseWindowResizeOptions): UseWindowResizeReturn {
  const aspectRatio = baseWidth / baseHeight;

  const nodeRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bounds, setBounds] = useState<Bounds | undefined>(undefined);
  const [dimensions, setDimensions] = useState({ width: baseWidth, height: baseHeight });
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartRef = useRef({ mouseX: 0, mouseY: 0, width: baseWidth, height: baseHeight });

  const calculateBounds = useCallback(() => {
    if (!nodeRef.current) return;

    const windowRect = nodeRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const initialLeft = windowRect.left - position.x;
    const initialTop = windowRect.top - position.y;

    setBounds({
      left: -initialLeft,
      top: MENUBAR_HEIGHT - initialTop,
      right: viewportWidth - initialLeft - windowRect.width,
      bottom: viewportHeight - TASKBAR_HEIGHT - initialTop - windowRect.height,
    });
  }, [position]);

  useEffect(() => {
    calculateBounds();
    window.addEventListener("resize", calculateBounds);
    return () => window.removeEventListener("resize", calculateBounds);
  }, [calculateBounds]);

  const handleDrag = useCallback((_e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  }, []);

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      resizeStartRef.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        width: dimensions.width,
        height: dimensions.height,
      };
      setIsResizing(true);
    },
    [dimensions]
  );

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStartRef.current.mouseX;
      const deltaY = e.clientY - resizeStartRef.current.mouseY;

      // Use larger delta to determine size, maintaining aspect ratio
      const deltaForRatio =
        Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY * aspectRatio;

      let newWidth = Math.max(
        minWidth,
        Math.min(maxWidth, resizeStartRef.current.width + deltaForRatio)
      );
      let newHeight = newWidth / aspectRatio;

      // Prevent window from overlapping the taskbar
      if (nodeRef.current) {
        const windowTop = nodeRef.current.getBoundingClientRect().top;
        const availableHeight = window.innerHeight - TASKBAR_HEIGHT - windowTop;

        if (newHeight > availableHeight) {
          newHeight = availableHeight;
          newWidth = Math.max(minWidth, newHeight * aspectRatio);
          newHeight = newWidth / aspectRatio;
        }
      }

      setDimensions({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => setIsResizing(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.body.style.cursor = "nwse-resize";
    document.body.style.userSelect = "none";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, aspectRatio, minWidth, maxWidth]);

  const scaleFactor = dimensions.width / baseWidth;

  return {
    nodeRef,
    position,
    bounds,
    dimensions,
    isResizing,
    scaleFactor,
    handleDrag,
    handleResizeStart,
  };
}
