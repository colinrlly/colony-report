"use client";

import { useState, useEffect, useRef, useCallback, PointerEvent as ReactPointerEvent } from "react";

// Shared timing constants for all notification types
export const NOTIFICATION_TIMING = {
  DISPLAY_DURATION: 4000,    // How long notification stays visible (ms)
  ANIMATION_DURATION: 400,   // Slide in/out animation duration (ms)
  INITIAL_DELAY: 3000,       // Delay before first notification (ms)
  GAP_BETWEEN: 3000,         // Gap between notifications (ms)
} as const;

// Swipe dismiss constants
const SWIPE_DISMISS_THRESHOLD = 100; // Pixels to swipe before auto-dismissing
const SWIPE_VELOCITY_THRESHOLD = 0.5; // Velocity threshold for quick swipes

interface UseNotificationAnimationOptions {
  isVisible: boolean;
  onComplete: () => void;
  displayDuration?: number;
  animationDuration?: number;
}

interface UseNotificationAnimationReturn {
  shouldRender: boolean;
  animationClass: string;
  // Swipe-to-dismiss functionality
  swipeX: number;
  isDragging: boolean;
  swipeHandlers: {
    onPointerDown: (e: ReactPointerEvent) => void;
    onPointerMove: (e: ReactPointerEvent) => void;
    onPointerUp: (e: ReactPointerEvent) => void;
    onPointerCancel: (e: ReactPointerEvent) => void;
  };
  dismiss: () => void;
}

/**
 * Shared hook for notification slide-in/slide-out animation behavior.
 * Used by CalendarNotification, ReminderNotification, and future notification types.
 *
 * Animation sequence:
 * 1. Slide in (400ms)
 * 2. Stay visible (4000ms default)
 * 3. Slide out (400ms)
 * 4. Call onComplete callback
 *
 * Supports swipe-to-dismiss: user can drag notification to the right to dismiss it early.
 */
export function useNotificationAnimation({
  isVisible,
  onComplete,
  displayDuration = NOTIFICATION_TIMING.DISPLAY_DURATION,
  animationDuration = NOTIFICATION_TIMING.ANIMATION_DURATION,
}: UseNotificationAnimationOptions): UseNotificationAnimationReturn {
  const [animationClass, setAnimationClass] = useState("");
  const [shouldRender, setShouldRender] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isDismissingRef = useRef(false);

  // Swipe state
  const [swipeX, setSwipeX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartTime = useRef(0);
  const lastX = useRef(0);

  // Memoize onComplete to prevent unnecessary effect re-runs
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Dismiss function - triggers slide out immediately
  const dismiss = useCallback(() => {
    if (isDismissingRef.current) return;
    isDismissingRef.current = true;

    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Reset swipe state
    setSwipeX(0);
    setIsDragging(false);

    // Start slide out animation
    setAnimationClass("notification-slide-out");

    // After slide-out completes, hide and notify parent
    timeoutRef.current = setTimeout(() => {
      setShouldRender(false);
      setAnimationClass("");
      isDismissingRef.current = false;
      onCompleteRef.current();
    }, animationDuration);
  }, [animationDuration]);

  // Pointer event handlers for swipe-to-dismiss
  const onPointerDown = useCallback((e: ReactPointerEvent) => {
    if (isDismissingRef.current) return;

    // Capture pointer for tracking outside element
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartTime.current = Date.now();
    lastX.current = e.clientX;
  }, []);

  const onPointerMove = useCallback((e: ReactPointerEvent) => {
    if (!isDragging || isDismissingRef.current) return;

    const deltaX = e.clientX - dragStartX.current;
    // Only allow swiping to the right (positive direction)
    const newSwipeX = Math.max(0, deltaX);
    setSwipeX(newSwipeX);
    lastX.current = e.clientX;
  }, [isDragging]);

  const onPointerUp = useCallback((e: ReactPointerEvent) => {
    if (!isDragging || isDismissingRef.current) return;

    // Release pointer capture
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);

    const deltaX = e.clientX - dragStartX.current;
    const deltaTime = Date.now() - dragStartTime.current;
    const velocity = deltaX / deltaTime; // pixels per millisecond

    // Dismiss if swiped far enough or with enough velocity
    if (deltaX > SWIPE_DISMISS_THRESHOLD || velocity > SWIPE_VELOCITY_THRESHOLD) {
      dismiss();
    } else {
      // Spring back to original position
      setSwipeX(0);
    }

    setIsDragging(false);
  }, [isDragging, dismiss]);

  const onPointerCancel = useCallback((e: ReactPointerEvent) => {
    // Release pointer capture
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    setIsDragging(false);
    setSwipeX(0);
  }, []);

  useEffect(() => {
    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isVisible) {
      // Reset dismissing flag when becoming visible
      isDismissingRef.current = false;

      // Start showing - slide in
      setShouldRender(true);
      setAnimationClass("notification-slide-in");

      // After slide-in completes, wait for display duration, then slide out
      timeoutRef.current = setTimeout(() => {
        if (!isDismissingRef.current) {
          setAnimationClass("notification-slide-out");

          // After slide-out completes, hide and notify parent
          timeoutRef.current = setTimeout(() => {
            setShouldRender(false);
            setAnimationClass("");
            onCompleteRef.current();
          }, animationDuration);
        }
      }, animationDuration + displayDuration);
    } else {
      // If visibility is set to false externally, reset immediately
      setShouldRender(false);
      setAnimationClass("");
      setSwipeX(0);
      setIsDragging(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible, displayDuration, animationDuration]);

  return {
    shouldRender,
    animationClass,
    swipeX,
    isDragging,
    swipeHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
    dismiss,
  };
}

/**
 * Hook to manage a cycling notification queue.
 * Handles the timing between notifications and cycling through items.
 */
export function useNotificationCycle<T>(
  items: T[],
  initialDelay: number = NOTIFICATION_TIMING.INITIAL_DELAY
) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const gapTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Start the cycle on mount
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, initialDelay);

    return () => {
      clearTimeout(initialTimer);
      if (gapTimerRef.current) {
        clearTimeout(gapTimerRef.current);
      }
    };
  }, [initialDelay]);

  // Handle notification complete - wait for gap then show next
  const handleComplete = useCallback(() => {
    setIsVisible(false);

    // Clear any existing gap timer
    if (gapTimerRef.current) {
      clearTimeout(gapTimerRef.current);
    }

    // After gap, show the next notification
    gapTimerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
      setIsVisible(true);
    }, NOTIFICATION_TIMING.GAP_BETWEEN);
  }, [items.length]);

  return {
    isVisible,
    currentIndex,
    currentItem: items[currentIndex],
    handleComplete,
  };
}
