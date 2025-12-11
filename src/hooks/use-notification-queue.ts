"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// All 8 individual notifications - each is equal and independent
const ALL_NOTIFICATIONS = [
  'calendar-0',
  'calendar-1',
  'calendar-2',
  'reminder-0',
  'reminder-1',
  'reminder-2',
  'plant-alarm',
  'security-warning',
] as const;

type NotificationItem = typeof ALL_NOTIFICATIONS[number];

// LocalStorage key
const STORAGE_KEY = 'notification-queue-v3';

// Timing constants
export const QUEUE_TIMING = {
  INITIAL_DELAY: 5000,      // 5 seconds before first notification
  GAP_BETWEEN: 5000,        // 5 seconds between notifications (for testing)
} as const;

interface QueueState {
  order: NotificationItem[];
  index: number;
}

/**
 * Fisher-Yates shuffle
 */
function shuffleArray(array: NotificationItem[], excludeFirst?: NotificationItem): NotificationItem[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Ensure first item isn't the excluded one (to prevent back-to-back repeats)
  if (excludeFirst && shuffled[0] === excludeFirst && shuffled.length > 1) {
    const swapIndex = 1 + Math.floor(Math.random() * (shuffled.length - 1));
    [shuffled[0], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[0]];
  }

  return shuffled;
}

/**
 * Load queue state from localStorage
 */
function loadQueueState(): QueueState | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as QueueState;
      // Validate
      if (
        Array.isArray(parsed.order) &&
        parsed.order.length === ALL_NOTIFICATIONS.length &&
        ALL_NOTIFICATIONS.every(item => parsed.order.includes(item)) &&
        typeof parsed.index === 'number' &&
        parsed.index >= 0 &&
        parsed.index < ALL_NOTIFICATIONS.length
      ) {
        return parsed;
      }
    }
  } catch {
    // Invalid data
  }
  return null;
}

/**
 * Save queue state to localStorage
 */
function saveQueueState(state: QueueState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/**
 * Hook to manage notification queue - all 8 notifications cycle once before reshuffling
 */
export function useNotificationQueue(
  initialDelay: number = QUEUE_TIMING.INITIAL_DELAY,
  gapBetween: number = QUEUE_TIMING.GAP_BETWEEN
) {
  // Queue state - order of notifications and current position
  const [queueState, setQueueState] = useState<QueueState | null>(null);

  // Currently visible notification
  const [activeItem, setActiveItem] = useState<NotificationItem | null>(null);

  // Timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Track if we've started
  const isStarted = useRef(false);

  // Initialize queue from localStorage on mount (client-only)
  useEffect(() => {
    const loaded = loadQueueState();
    if (loaded) {
      console.log('[Queue] Loaded from storage:', loaded);
      setQueueState(loaded);
    } else {
      const newState: QueueState = {
        order: shuffleArray([...ALL_NOTIFICATIONS]),
        index: 0,
      };
      console.log('[Queue] Created new queue:', newState);
      saveQueueState(newState);
      setQueueState(newState);
    }
  }, []);

  // Start showing notifications once queue is ready
  useEffect(() => {
    if (!queueState || isStarted.current) return;
    isStarted.current = true;

    console.log('[Queue] Starting - will show:', queueState.order[queueState.index], 'in', initialDelay, 'ms');

    timerRef.current = setTimeout(() => {
      const item = queueState.order[queueState.index];
      console.log('[Queue] Showing:', item, '(index', queueState.index, 'of 8)');
      setActiveItem(item);
    }, initialDelay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [queueState, initialDelay]);

  // Use ref to always have latest activeItem
  const activeItemRef = useRef(activeItem);
  activeItemRef.current = activeItem;

  // Handle notification completion
  const completeNotification = useCallback((completedItem: NotificationItem) => {
    const currentActive = activeItemRef.current;

    console.log('[Queue] completeNotification called with:', completedItem, '- current active:', currentActive);

    if (currentActive !== completedItem) {
      console.log('[Queue] Ignored - mismatch');
      return;
    }

    console.log('[Queue] Completing:', completedItem);
    setActiveItem(null);

    if (timerRef.current) clearTimeout(timerRef.current);

    setQueueState(prev => {
      if (!prev) return prev;

      let nextIndex = prev.index + 1;
      let nextOrder = prev.order;

      // If we've shown all 8, reshuffle
      if (nextIndex >= ALL_NOTIFICATIONS.length) {
        console.log('[Queue] All 8 shown! Reshuffling...');
        nextIndex = 0;
        nextOrder = shuffleArray([...ALL_NOTIFICATIONS], prev.order[prev.order.length - 1]);
        console.log('[Queue] New order:', nextOrder);
      }

      const newState: QueueState = { order: nextOrder, index: nextIndex };
      saveQueueState(newState);

      // Schedule next notification
      timerRef.current = setTimeout(() => {
        const nextItem = nextOrder[nextIndex];
        console.log('[Queue] Showing:', nextItem, '(index', nextIndex, 'of 8)');
        setActiveItem(nextItem);
      }, gapBetween);

      return newState;
    });
  }, [gapBetween]);

  // Parse notification item to get type and sub-index
  const getNotificationInfo = (item: NotificationItem | null) => {
    if (!item) return { type: null, subIndex: 0 };

    if (item === 'plant-alarm') return { type: 'plant-alarm', subIndex: 0 };
    if (item === 'security-warning') return { type: 'security-warning', subIndex: 0 };

    const match = item.match(/^(calendar|reminder)-(\d+)$/);
    if (match) {
      return { type: match[1], subIndex: parseInt(match[2], 10) };
    }
    return { type: null, subIndex: 0 };
  };

  const info = getNotificationInfo(activeItem);

  return {
    // Visibility flags
    isCalendarVisible: info.type === 'calendar',
    isReminderVisible: info.type === 'reminder',
    isPlantAlarmVisible: info.type === 'plant-alarm',
    isSecurityWarningVisible: info.type === 'security-warning',

    // Sub-indices for calendar/reminder
    calendarIndex: info.type === 'calendar' ? info.subIndex : 0,
    reminderIndex: info.type === 'reminder' ? info.subIndex : 0,

    // Completion handlers - use refs to avoid stale closures
    handleCalendarComplete: useCallback(() => {
      const current = activeItemRef.current;
      console.log('[Queue] handleCalendarComplete called, activeItem:', current);
      if (current?.startsWith('calendar-')) {
        completeNotification(current);
      }
    }, [completeNotification]),

    handleReminderComplete: useCallback(() => {
      const current = activeItemRef.current;
      console.log('[Queue] handleReminderComplete called, activeItem:', current);
      if (current?.startsWith('reminder-')) {
        completeNotification(current);
      }
    }, [completeNotification]),

    handlePlantAlarmComplete: useCallback(() => {
      console.log('[Queue] handlePlantAlarmComplete called');
      completeNotification('plant-alarm');
    }, [completeNotification]),

    handleSecurityWarningComplete: useCallback(() => {
      console.log('[Queue] handleSecurityWarningComplete called');
      completeNotification('security-warning');
    }, [completeNotification]),

    // Debug info
    queueOrder: queueState?.order ?? [],
    queueIndex: queueState?.index ?? 0,
  };
}
