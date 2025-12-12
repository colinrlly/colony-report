"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ============================================
// Constants
// ============================================

const STORAGE_KEY = "notification-queue-state";
const GAP_BETWEEN_NOTIFICATIONS = 30000; // 30 seconds between notifications
const INITIAL_DELAY = 3000; // 3 seconds before first notification

// ============================================
// Types
// ============================================

export type NotificationType =
  | "calendar-1"    // Field Operation
  | "calendar-2"    // Weekly Team Sync
  | "calendar-3"    // Specimen 14 Enrichment Session
  | "reminder-1"    // Desk Cleanup Reminder
  | "reminder-2"    // Teach Toby to Feed Specimen H1
  | "reminder-3"    // Feed Specimen X7 (redacted)
  | "plant-alarm"   // Center modal, requires button
  | "security-warning"; // Side notification, requires button

export const ALL_NOTIFICATION_TYPES: NotificationType[] = [
  "calendar-1",
  "calendar-2",
  "calendar-3",
  "reminder-1",
  "reminder-2",
  "reminder-3",
  "plant-alarm",
  "security-warning",
];

interface NotificationQueueState {
  queue: NotificationType[];
  currentIndex: number;
}

interface UseNotificationQueueReturn {
  currentNotification: NotificationType | null;
  isNotificationVisible: boolean;
  handleNotificationComplete: () => void;
}

// ============================================
// Helper Functions
// ============================================

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Shuffle array ensuring first element is not equal to lastItem
 */
function shuffleWithConstraint(
  items: NotificationType[],
  lastItem: NotificationType | null
): NotificationType[] {
  let shuffled = shuffleArray(items);

  // Keep reshuffling if first element matches lastItem (up to 10 attempts)
  let attempts = 0;
  while (lastItem && shuffled[0] === lastItem && attempts < 10) {
    shuffled = shuffleArray(items);
    attempts++;
  }

  // If still matching after 10 attempts, swap first with another position
  if (lastItem && shuffled[0] === lastItem && shuffled.length > 1) {
    const swapIndex = 1 + Math.floor(Math.random() * (shuffled.length - 1));
    [shuffled[0], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[0]];
  }

  return shuffled;
}

/**
 * Load state from localStorage
 */
function loadState(): NotificationQueueState | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored) as NotificationQueueState;

    // Validate the stored state
    if (
      Array.isArray(parsed.queue) &&
      typeof parsed.currentIndex === "number" &&
      parsed.currentIndex >= 0 &&
      parsed.currentIndex < parsed.queue.length &&
      parsed.queue.length === ALL_NOTIFICATION_TYPES.length
    ) {
      return parsed;
    }
  } catch {
    // Invalid stored data, return null
  }

  return null;
}

/**
 * Save state to localStorage
 */
function saveState(state: NotificationQueueState): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage might be full or unavailable
  }
}

// ============================================
// Hook
// ============================================

export function useNotificationQueue(): UseNotificationQueueReturn {
  const [queue, setQueue] = useState<NotificationType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const gapTimerRef = useRef<NodeJS.Timeout | null>(null);
  const initialTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedState = loadState();

    if (storedState) {
      setQueue(storedState.queue);
      setCurrentIndex(storedState.currentIndex);
    } else {
      // First time - create new shuffled queue
      const newQueue = shuffleWithConstraint(ALL_NOTIFICATION_TYPES, null);
      setQueue(newQueue);
      setCurrentIndex(0);
      saveState({ queue: newQueue, currentIndex: 0 });
    }

    setIsInitialized(true);
  }, []);

  // Start showing first notification after initial delay
  useEffect(() => {
    if (!isInitialized || queue.length === 0) return;

    initialTimerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, INITIAL_DELAY);

    return () => {
      if (initialTimerRef.current) {
        clearTimeout(initialTimerRef.current);
      }
    };
  }, [isInitialized, queue.length]);

  // Save state changes to localStorage
  useEffect(() => {
    if (isInitialized && queue.length > 0) {
      saveState({ queue, currentIndex });
    }
  }, [queue, currentIndex, isInitialized]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (gapTimerRef.current) {
        clearTimeout(gapTimerRef.current);
      }
      if (initialTimerRef.current) {
        clearTimeout(initialTimerRef.current);
      }
    };
  }, []);

  const handleNotificationComplete = useCallback(() => {
    setIsVisible(false);

    // Clear any existing timer
    if (gapTimerRef.current) {
      clearTimeout(gapTimerRef.current);
    }

    // Schedule next notification
    gapTimerRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        if (nextIndex >= queue.length) {
          // Cycle complete - reshuffle for next cycle
          const lastNotification = queue[queue.length - 1];
          const newQueue = shuffleWithConstraint(ALL_NOTIFICATION_TYPES, lastNotification);
          setQueue(newQueue);
          return 0;
        }

        return nextIndex;
      });

      setIsVisible(true);
    }, GAP_BETWEEN_NOTIFICATIONS);
  }, [queue]);

  const currentNotification = queue.length > 0 ? queue[currentIndex] : null;

  return {
    currentNotification,
    isNotificationVisible: isVisible,
    handleNotificationComplete,
  };
}
