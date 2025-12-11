"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// Individual notification items in the queue
// Format: "type" or "type-index" for types with multiple items
export type NotificationItem =
  | 'calendar-0' | 'calendar-1' | 'calendar-2'
  | 'reminder-0' | 'reminder-1' | 'reminder-2'
  | 'plant-alarm'
  | 'security-warning';

// All 8 individual notifications
const ALL_NOTIFICATIONS: NotificationItem[] = [
  'calendar-0', 'calendar-1', 'calendar-2',
  'reminder-0', 'reminder-1', 'reminder-2',
  'plant-alarm',
  'security-warning',
];

// LocalStorage keys
const STORAGE_KEY_ORDER = 'notification-queue-order-v2';
const STORAGE_KEY_INDEX = 'notification-queue-index-v2';

// Timing constants
export const QUEUE_TIMING = {
  INITIAL_DELAY: 5000,      // 5 seconds before first notification
  GAP_BETWEEN: 5000,        // 5 seconds between notifications (for testing)
} as const;

/**
 * Fisher-Yates shuffle algorithm with constraint: no same item twice in a row
 * When reshuffling, ensures first item of new order isn't same as last item of previous order
 */
function shuffleArray<T>(array: T[], lastItem?: T): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // If the first item matches lastItem, swap it with a random other position
  if (lastItem !== undefined && shuffled[0] === lastItem && shuffled.length > 1) {
    const swapIndex = 1 + Math.floor(Math.random() * (shuffled.length - 1));
    [shuffled[0], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[0]];
  }

  return shuffled;
}

/**
 * Get or create the shuffled order from localStorage
 */
function getStoredOrder(): NotificationItem[] {
  if (typeof window === 'undefined') return shuffleArray(ALL_NOTIFICATIONS);

  try {
    const stored = localStorage.getItem(STORAGE_KEY_ORDER);
    if (stored) {
      const parsed = JSON.parse(stored) as NotificationItem[];
      // Validate that it contains all expected notification items
      if (parsed.length === ALL_NOTIFICATIONS.length &&
          ALL_NOTIFICATIONS.every(item => parsed.includes(item))) {
        return parsed;
      }
    }
  } catch {
    // If parsing fails, create new order
  }

  // Create new shuffled order
  const newOrder = shuffleArray(ALL_NOTIFICATIONS);
  localStorage.setItem(STORAGE_KEY_ORDER, JSON.stringify(newOrder));
  return newOrder;
}

/**
 * Get the stored index from localStorage
 */
function getStoredIndex(): number {
  if (typeof window === 'undefined') return 0;

  try {
    const stored = localStorage.getItem(STORAGE_KEY_INDEX);
    if (stored !== null) {
      const index = parseInt(stored, 10);
      if (!isNaN(index) && index >= 0 && index < ALL_NOTIFICATIONS.length) {
        return index;
      }
    }
  } catch {
    // If parsing fails, start from 0
  }

  return 0;
}

/**
 * Parse a notification item to get its type and index
 */
function parseNotificationItem(item: NotificationItem): { type: string; index: number } {
  if (item === 'plant-alarm' || item === 'security-warning') {
    return { type: item, index: 0 };
  }
  const parts = item.split('-');
  const index = parseInt(parts[parts.length - 1], 10);
  const type = parts.slice(0, -1).join('-');
  return { type, index };
}

/**
 * Hook to manage a unified notification queue that cycles through all 8 individual notifications.
 *
 * Features:
 * - Shows one notification at a time
 * - All 8 notifications shown once before reshuffling (no repeats in a cycle)
 * - Random order persisted across page refreshes via localStorage
 * - Never shows the same notification twice in a row (even across reshuffles)
 * - Infrequent display with configurable gap between notifications
 */
export function useNotificationQueue(
  initialDelay: number = QUEUE_TIMING.INITIAL_DELAY,
  gapBetween: number = QUEUE_TIMING.GAP_BETWEEN
) {
  // State for the queue order and current position
  const [order, setOrder] = useState<NotificationItem[]>(() => getStoredOrder());
  const [currentIndex, setCurrentIndex] = useState<number>(() => getStoredIndex());

  // Which notification item is currently visible (null = none)
  const [activeItem, setActiveItem] = useState<NotificationItem | null>(null);

  // Timer refs
  const gapTimerRef = useRef<NodeJS.Timeout | null>(null);
  const initialTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Track if initial mount effect has run
  const hasInitialized = useRef(false);

  // Track the latest order and index for use in timeout callbacks
  const orderRef = useRef(order);
  orderRef.current = order;
  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex;

  // Save order to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_ORDER, JSON.stringify(order));
    }
  }, [order]);

  // Save index to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_INDEX, currentIndex.toString());
    }
  }, [currentIndex]);

  // Start the queue on mount only
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Debug: log initial queue state
    console.log('[NotificationQueue] Starting queue:', {
      order: orderRef.current,
      index: currentIndexRef.current,
      firstItem: orderRef.current[currentIndexRef.current],
    });

    initialTimerRef.current = setTimeout(() => {
      const nextItem = orderRef.current[currentIndexRef.current];
      console.log('[NotificationQueue] Showing first notification:', nextItem, 'at index', currentIndexRef.current);
      setActiveItem(nextItem);
    }, initialDelay);

    // Only cleanup on unmount, not on re-renders
    return () => {
      if (initialTimerRef.current) {
        clearTimeout(initialTimerRef.current);
      }
      if (gapTimerRef.current) {
        clearTimeout(gapTimerRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle notification complete - called when any notification finishes
  const handleNotificationComplete = useCallback((item: NotificationItem) => {
    // Only process if this is the active notification
    if (activeItem !== item) {
      console.log('[NotificationQueue] Ignored completion for', item, '- active is', activeItem);
      return;
    }

    console.log('[NotificationQueue] Completing:', item, 'at index', currentIndexRef.current);

    // Hide the notification
    setActiveItem(null);

    // Clear any existing gap timer
    if (gapTimerRef.current) {
      clearTimeout(gapTimerRef.current);
    }

    // Calculate next index using ref for latest value
    const nextIndex = (currentIndexRef.current + 1) % ALL_NOTIFICATIONS.length;
    const lastItem = orderRef.current[currentIndexRef.current];

    // If we've completed a full cycle, reshuffle (ensuring no repeat)
    if (nextIndex === 0) {
      console.log('[NotificationQueue] Cycle complete! Reshuffling...');
      const newOrder = shuffleArray(ALL_NOTIFICATIONS, lastItem);
      console.log('[NotificationQueue] New order:', newOrder);
      setOrder(newOrder);
      orderRef.current = newOrder;
    }

    // Update the index
    setCurrentIndex(nextIndex);
    currentIndexRef.current = nextIndex;

    // After gap, show the next notification
    gapTimerRef.current = setTimeout(() => {
      // Use the ref to get the most up-to-date order
      const nextItem = orderRef.current[nextIndex];
      console.log('[NotificationQueue] Showing next:', nextItem, 'at index', nextIndex);
      setActiveItem(nextItem);
    }, gapBetween);
  }, [activeItem, gapBetween]);

  // Parse active item to get type and index
  const parsed = activeItem ? parseNotificationItem(activeItem) : null;

  // Create completion handlers that match the specific active item
  const handleCalendarComplete = useCallback(() => {
    if (activeItem?.startsWith('calendar-')) {
      handleNotificationComplete(activeItem);
    }
  }, [activeItem, handleNotificationComplete]);

  const handleReminderComplete = useCallback(() => {
    if (activeItem?.startsWith('reminder-')) {
      handleNotificationComplete(activeItem);
    }
  }, [activeItem, handleNotificationComplete]);

  const handlePlantAlarmComplete = useCallback(() => {
    handleNotificationComplete('plant-alarm');
  }, [handleNotificationComplete]);

  const handleSecurityWarningComplete = useCallback(() => {
    handleNotificationComplete('security-warning');
  }, [handleNotificationComplete]);

  return {
    // Which notification item should be visible
    activeItem,

    // Convenience booleans for each notification type
    isCalendarVisible: activeItem?.startsWith('calendar-') ?? false,
    isReminderVisible: activeItem?.startsWith('reminder-') ?? false,
    isPlantAlarmVisible: activeItem === 'plant-alarm',
    isSecurityWarningVisible: activeItem === 'security-warning',

    // Item indices for notification types with multiple items
    calendarIndex: parsed?.type === 'calendar' ? parsed.index : 0,
    reminderIndex: parsed?.type === 'reminder' ? parsed.index : 0,

    // Completion handlers for each notification type
    handleCalendarComplete,
    handleReminderComplete,
    handlePlantAlarmComplete,
    handleSecurityWarningComplete,

    // Current queue state (for debugging)
    queueOrder: order,
    queueIndex: currentIndex,
  };
}
