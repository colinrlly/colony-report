"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// Shared timing constants for all notification types
export const NOTIFICATION_TIMING = {
  DISPLAY_DURATION: 4000,    // How long notification stays visible (ms)
  ANIMATION_DURATION: 400,   // Slide in/out animation duration (ms)
  INITIAL_DELAY: 3000,       // Delay before first notification (ms)
  GAP_BETWEEN: 3000,         // Gap between notifications (ms)
} as const;

interface UseNotificationAnimationOptions {
  isVisible: boolean;
  onComplete: () => void;
  displayDuration?: number;
  animationDuration?: number;
}

interface UseNotificationAnimationReturn {
  shouldRender: boolean;
  animationClass: string;
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

  // Memoize onComplete to prevent unnecessary effect re-runs
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isVisible) {
      // Start showing - slide in
      setShouldRender(true);
      setAnimationClass("notification-slide-in");

      // After slide-in completes, wait for display duration, then slide out
      timeoutRef.current = setTimeout(() => {
        setAnimationClass("notification-slide-out");

        // After slide-out completes, hide and notify parent
        timeoutRef.current = setTimeout(() => {
          setShouldRender(false);
          setAnimationClass("");
          onCompleteRef.current();
        }, animationDuration);
      }, animationDuration + displayDuration);
    } else {
      // If visibility is set to false externally, reset immediately
      setShouldRender(false);
      setAnimationClass("");
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible, displayDuration, animationDuration]);

  return { shouldRender, animationClass };
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
