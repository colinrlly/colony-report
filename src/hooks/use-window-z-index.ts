import { useState, useCallback, useMemo } from "react";

// Base z-index for windows - above desktop icons (z-10) but below menubar (z-50)
const BASE_WINDOW_Z_INDEX = 20;

// Window ID type for type safety
export type WindowId =
  | "colony-reports"
  | "secrets-folder"
  | "nothing"
  | "seriously-nothing"
  | "please-stop"
  | "go-no-further"
  | "are-you-serious"
  | "ugh-fine"
  | "pet-monitor"
  | "minesweeper"
  | "contact-hr";

export interface UseWindowZIndexReturn {
  /** Get the z-index for a specific window */
  getZIndex: (windowId: WindowId) => number;
  /** Bring a window to the front (highest z-index) */
  bringToFront: (windowId: WindowId) => void;
  /** Register a window when it opens (adds to top of stack) */
  registerWindow: (windowId: WindowId) => void;
  /** Unregister a window when it closes */
  unregisterWindow: (windowId: WindowId) => void;
  /** The currently focused window ID */
  focusedWindow: WindowId | null;
}

/**
 * Hook to manage z-index stacking order for windows.
 *
 * Windows are stacked based on their order in the stack array.
 * The last item in the array has the highest z-index.
 *
 * Z-index range: BASE_WINDOW_Z_INDEX (20) to BASE_WINDOW_Z_INDEX + stack.length
 * This keeps windows:
 * - Above desktop icons (z-10)
 * - Below menubar (z-50)
 * - Below tutorial helper (z-1000)
 * - Below screensaver/restart (z-9999+)
 */
export function useWindowZIndex(): UseWindowZIndexReturn {
  // Stack of window IDs - last item is on top
  const [windowStack, setWindowStack] = useState<WindowId[]>([]);

  // Get z-index for a window based on its position in the stack
  const getZIndex = useCallback(
    (windowId: WindowId): number => {
      const index = windowStack.indexOf(windowId);
      if (index === -1) {
        // Window not in stack, return base z-index
        return BASE_WINDOW_Z_INDEX;
      }
      // Each window gets a z-index based on its stack position
      return BASE_WINDOW_Z_INDEX + index;
    },
    [windowStack]
  );

  // Bring a window to the front
  const bringToFront = useCallback((windowId: WindowId) => {
    setWindowStack((prevStack) => {
      // Remove the window from its current position
      const filteredStack = prevStack.filter((id) => id !== windowId);
      // Add it to the end (top of stack)
      return [...filteredStack, windowId];
    });
  }, []);

  // Register a new window (opens at the top)
  const registerWindow = useCallback((windowId: WindowId) => {
    setWindowStack((prevStack) => {
      // Don't add if already in stack
      if (prevStack.includes(windowId)) {
        // But bring to front if already exists
        const filteredStack = prevStack.filter((id) => id !== windowId);
        return [...filteredStack, windowId];
      }
      return [...prevStack, windowId];
    });
  }, []);

  // Unregister a window when it closes
  const unregisterWindow = useCallback((windowId: WindowId) => {
    setWindowStack((prevStack) => prevStack.filter((id) => id !== windowId));
  }, []);

  // The focused window is the one on top of the stack
  const focusedWindow = useMemo(
    () => (windowStack.length > 0 ? windowStack[windowStack.length - 1] : null),
    [windowStack]
  );

  return {
    getZIndex,
    bringToFront,
    registerWindow,
    unregisterWindow,
    focusedWindow,
  };
}
