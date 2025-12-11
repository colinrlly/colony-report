"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// Notification types in the queue
export type NotificationType = 'calendar' | 'reminder' | 'plant-alarm' | 'security-warning';

// All notification types
const ALL_NOTIFICATIONS: NotificationType[] = ['calendar', 'reminder', 'plant-alarm', 'security-warning'];

// LocalStorage keys
const STORAGE_KEY_ORDER = 'notification-queue-order';
const STORAGE_KEY_INDEX = 'notification-queue-index';
const STORAGE_KEY_ITEM_INDICES = 'notification-item-indices';

// Timing constants
export const QUEUE_TIMING = {
  INITIAL_DELAY: 5000,      // 5 seconds before first notification
  GAP_BETWEEN: 25000,       // 25 seconds between notifications (infrequent)
} as const;

// Item counts for notification types that have multiple items
const ITEM_COUNTS: Partial<Record<NotificationType, number>> = {
  'calendar': 3,  // 3 calendar events
  'reminder': 3,  // 3 reminders
};

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get or create the shuffled order from localStorage
 */
function getStoredOrder(): NotificationType[] {
  if (typeof window === 'undefined') return shuffleArray(ALL_NOTIFICATIONS);

  try {
    const stored = localStorage.getItem(STORAGE_KEY_ORDER);
    if (stored) {
      const parsed = JSON.parse(stored) as NotificationType[];
      // Validate that it contains all expected notification types
      if (parsed.length === ALL_NOTIFICATIONS.length &&
          ALL_NOTIFICATIONS.every(type => parsed.includes(type))) {
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
 * Get stored item indices for notification types with multiple items
 */
function getStoredItemIndices(): Record<string, number> {
  if (typeof window === 'undefined') return {};

  try {
    const stored = localStorage.getItem(STORAGE_KEY_ITEM_INDICES);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // If parsing fails, return empty
  }

  return {};
}

/**
 * Hook to manage a unified notification queue that cycles through all notification types.
 *
 * Features:
 * - Shows one notification at a time
 * - Random order persisted across page refreshes via localStorage
 * - Each notification shown once before reshuffling
 * - Infrequent display with configurable gap between notifications
 * - Tracks item indices within notification types that have multiple items
 */
export function useNotificationQueue(
  initialDelay: number = QUEUE_TIMING.INITIAL_DELAY,
  gapBetween: number = QUEUE_TIMING.GAP_BETWEEN
) {
  // State for the queue order and current position
  const [order, setOrder] = useState<NotificationType[]>(() => getStoredOrder());
  const [currentIndex, setCurrentIndex] = useState<number>(() => getStoredIndex());

  // Track which item to show within each notification type (for calendar/reminder)
  const [itemIndices, setItemIndices] = useState<Record<string, number>>(() => getStoredItemIndices());

  // Which notification is currently visible (null = none)
  const [activeNotification, setActiveNotification] = useState<NotificationType | null>(null);

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

  // Save item indices to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_ITEM_INDICES, JSON.stringify(itemIndices));
    }
  }, [itemIndices]);

  // Start the queue on mount only
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    initialTimerRef.current = setTimeout(() => {
      const nextType = orderRef.current[currentIndexRef.current];
      setActiveNotification(nextType);
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
  const handleNotificationComplete = useCallback((type: NotificationType) => {
    // Only process if this is the active notification
    if (activeNotification !== type) return;

    // Hide the notification
    setActiveNotification(null);

    // Update item index for this notification type if it has multiple items
    const itemCount = ITEM_COUNTS[type];
    if (itemCount) {
      setItemIndices(prev => ({
        ...prev,
        [type]: ((prev[type] || 0) + 1) % itemCount,
      }));
    }

    // Clear any existing gap timer
    if (gapTimerRef.current) {
      clearTimeout(gapTimerRef.current);
    }

    // Calculate next index using ref for latest value
    const nextIndex = (currentIndexRef.current + 1) % ALL_NOTIFICATIONS.length;

    // If we've completed a full cycle, reshuffle
    if (nextIndex === 0) {
      const newOrder = shuffleArray(ALL_NOTIFICATIONS);
      setOrder(newOrder);
      orderRef.current = newOrder;
    }

    // Update the index
    setCurrentIndex(nextIndex);
    currentIndexRef.current = nextIndex;

    // After gap, show the next notification
    gapTimerRef.current = setTimeout(() => {
      // Use the ref to get the most up-to-date order
      const nextType = orderRef.current[nextIndex];
      setActiveNotification(nextType);
    }, gapBetween);
  }, [activeNotification, gapBetween]);

  // Create stable completion handlers for each notification type
  const handleCalendarComplete = useCallback(() => {
    handleNotificationComplete('calendar');
  }, [handleNotificationComplete]);

  const handleReminderComplete = useCallback(() => {
    handleNotificationComplete('reminder');
  }, [handleNotificationComplete]);

  const handlePlantAlarmComplete = useCallback(() => {
    handleNotificationComplete('plant-alarm');
  }, [handleNotificationComplete]);

  const handleSecurityWarningComplete = useCallback(() => {
    handleNotificationComplete('security-warning');
  }, [handleNotificationComplete]);

  return {
    // Which notification should be visible
    activeNotification,

    // Convenience booleans for each notification type
    isCalendarVisible: activeNotification === 'calendar',
    isReminderVisible: activeNotification === 'reminder',
    isPlantAlarmVisible: activeNotification === 'plant-alarm',
    isSecurityWarningVisible: activeNotification === 'security-warning',

    // Item indices for notification types with multiple items
    calendarIndex: itemIndices['calendar'] || 0,
    reminderIndex: itemIndices['reminder'] || 0,

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
