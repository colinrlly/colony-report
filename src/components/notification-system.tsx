"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// Notification types
type NotificationType = "calendar" | "reminder" | "warning" | "alarm";

interface NotificationContent {
  type: NotificationType;
  title: string;
  body?: string;
  id: string;
}

// All notification content definitions
const CALENDAR_NOTIFICATIONS: Omit<NotificationContent, "id">[] = [
  {
    type: "calendar",
    title: "Calendar Event — 08:00 Field Operation",
    body: "Note to self: bring Hank the experimental morning-cheer tonic.",
  },
  {
    type: "calendar",
    title: "Weekly Team Sync — 9:00 Tomorrow",
    body: "10 minutes — status updates only.",
  },
  {
    type: "calendar",
    title: "Calendar Event — Specimen 14 Enrichment at 16:30",
    body: "Note to self: bring new puzzle object. Last one dissolved.",
  },
];

const REMINDER_NOTIFICATIONS: Omit<NotificationContent, "id">[] = [
  {
    type: "reminder",
    title: "Reminder: Prep your workstation before next Friday's lab check.",
    body: "You know how Facility Ops gets about \"organizational standards.\"",
  },
  {
    type: "reminder",
    title: "Reminder: Walk Toby through the H1 feeding protocol.",
    body: "Remind Toby he will get use to the smell and the itching only lasts a couple minutes.",
  },
  {
    type: "reminder",
    title: "Reminder: Don't forget to feed… you know.. the specimen.",
    body: "REDACTED", // Special handling for redacted text
  },
];

const WARNING_NOTIFICATION: Omit<NotificationContent, "id"> = {
  type: "warning",
  title: "Warning! Unusual movement detected in Security Camera B.",
};

const ALARM_NOTIFICATION: Omit<NotificationContent, "id"> = {
  type: "alarm",
  title: "Warning! Water the exploding beanfang plant!",
  body: "You know what happens when you forget… we can't have another incident report like that on our record so soon.",
};

// Combine all non-alarm notifications for rotation
const ALL_REGULAR_NOTIFICATIONS = [
  ...CALENDAR_NOTIFICATIONS,
  ...REMINDER_NOTIFICATIONS,
  WARNING_NOTIFICATION,
];

// Angry Plant Pixel Art Icon Component
function AngryPlantIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Pot */}
      <rect x="4" y="12" width="8" height="4" fill="#8B4513" />
      <rect x="3" y="12" width="10" height="1" fill="#A0522D" />
      {/* Pot rim highlight */}
      <rect x="4" y="13" width="8" height="1" fill="#6B3510" />
      {/* Stem */}
      <rect x="7" y="8" width="2" height="4" fill="#228B22" />
      {/* Main head/body */}
      <rect x="4" y="4" width="8" height="5" fill="#32CD32" />
      <rect x="5" y="3" width="6" height="1" fill="#32CD32" />
      <rect x="5" y="9" width="6" height="1" fill="#32CD32" />
      {/* Angry eyes */}
      <rect x="5" y="5" width="2" height="2" fill="#000" />
      <rect x="9" y="5" width="2" height="2" fill="#000" />
      {/* Angry eyebrows */}
      <rect x="4" y="4" width="2" height="1" fill="#1a1a1a" />
      <rect x="6" y="3" width="1" height="1" fill="#1a1a1a" />
      <rect x="10" y="4" width="2" height="1" fill="#1a1a1a" />
      <rect x="9" y="3" width="1" height="1" fill="#1a1a1a" />
      {/* Frown mouth */}
      <rect x="6" y="8" width="4" height="1" fill="#1a1a1a" />
      <rect x="5" y="7" width="1" height="1" fill="#1a1a1a" />
      <rect x="10" y="7" width="1" height="1" fill="#1a1a1a" />
      {/* Leaves/spikes on top (angry looking) */}
      <rect x="3" y="2" width="1" height="3" fill="#228B22" />
      <rect x="2" y="1" width="1" height="2" fill="#228B22" />
      <rect x="12" y="2" width="1" height="3" fill="#228B22" />
      <rect x="13" y="1" width="1" height="2" fill="#228B22" />
      <rect x="7" y="1" width="2" height="2" fill="#228B22" />
      <rect x="7" y="0" width="2" height="1" fill="#32CD32" />
      {/* Red anger marks */}
      <rect x="2" y="4" width="1" height="1" fill="#FF4444" />
      <rect x="13" y="4" width="1" height="1" fill="#FF4444" />
    </svg>
  );
}

// Calendar Icon Component
function CalendarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Calendar body */}
      <rect x="1" y="3" width="14" height="12" fill="#fff" stroke="#444" strokeWidth="1" />
      {/* Header */}
      <rect x="1" y="3" width="14" height="3" fill="#4A90D9" />
      {/* Rings */}
      <rect x="4" y="1" width="2" height="4" fill="#666" />
      <rect x="10" y="1" width="2" height="4" fill="#666" />
      {/* Date grid lines */}
      <rect x="1" y="8" width="14" height="1" fill="#ddd" />
      <rect x="1" y="11" width="14" height="1" fill="#ddd" />
      <rect x="5" y="6" width="1" height="9" fill="#ddd" />
      <rect x="10" y="6" width="1" height="9" fill="#ddd" />
      {/* Highlighted date */}
      <rect x="6" y="9" width="3" height="2" fill="#FF6B6B" />
    </svg>
  );
}

// Reminder Icon Component
function ReminderIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Note paper */}
      <rect x="2" y="1" width="11" height="14" fill="#FFFACD" stroke="#C4A000" strokeWidth="1" />
      {/* Folded corner */}
      <path d="M10 1 L13 4 L10 4 Z" fill="#E6D888" stroke="#C4A000" strokeWidth="0.5" />
      {/* Lines */}
      <rect x="4" y="5" width="7" height="1" fill="#888" />
      <rect x="4" y="7" width="5" height="1" fill="#888" />
      <rect x="4" y="9" width="6" height="1" fill="#888" />
      <rect x="4" y="11" width="4" height="1" fill="#888" />
      {/* Pin */}
      <circle cx="7" cy="2" r="1.5" fill="#FF4444" />
    </svg>
  );
}

// Warning Icon Component
function WarningIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Triangle */}
      <path d="M8 1 L15 14 L1 14 Z" fill="#FFD700" stroke="#B8860B" strokeWidth="1" />
      {/* Exclamation mark */}
      <rect x="7" y="5" width="2" height="5" fill="#1a1a1a" />
      <rect x="7" y="11" width="2" height="2" fill="#1a1a1a" />
    </svg>
  );
}

// Notification Toast Component
interface NotificationToastProps {
  notification: NotificationContent;
  onDismiss: () => void;
  isExiting: boolean;
}

function NotificationToast({ notification, onDismiss, isExiting }: NotificationToastProps) {
  const { type, title, body } = notification;

  // Get styling based on notification type
  const getTypeStyles = () => {
    switch (type) {
      case "calendar":
        return {
          borderColor: "#4A90D9",
          headerBg: "#4A90D9",
          headerText: "#fff",
        };
      case "reminder":
        return {
          borderColor: "#C4A000",
          headerBg: "#FFFACD",
          headerText: "#5c4a00",
        };
      case "warning":
        return {
          borderColor: "#FF8C00",
          headerBg: "#FFD700",
          headerText: "#5c3d00",
        };
      default:
        return {
          borderColor: "#808080",
          headerBg: "#c8b9a9",
          headerText: "#222",
        };
    }
  };

  const styles = getTypeStyles();

  const getIcon = () => {
    switch (type) {
      case "calendar":
        return <CalendarIcon />;
      case "reminder":
        return <ReminderIcon />;
      case "warning":
        return <WarningIcon />;
      default:
        return null;
    }
  };

  // Render body with redacted text handling
  const renderBody = () => {
    if (body === "REDACTED") {
      return (
        <p className="text-[11px] text-[#333] mt-1">
          Don&apos;t forget to feed{" "}
          <span
            className="inline-block bg-black text-black select-none px-1 mx-0.5"
            style={{ minWidth: "60px" }}
          >
            ███████
          </span>
        </p>
      );
    }
    return body ? <p className="text-[11px] text-[#333] mt-1">{body}</p> : null;
  };

  return (
    <div
      className={`notification-toast ${isExiting ? "notification-exit" : "notification-enter"}`}
      style={{
        borderLeft: `4px solid ${styles.borderColor}`,
      }}
    >
      <div
        className="flex items-center gap-2 px-2 py-1"
        style={{ backgroundColor: styles.headerBg }}
      >
        {getIcon()}
        <span className="text-[11px] font-bold" style={{ color: styles.headerText }}>
          {type === "calendar" ? "Calendar" : type === "reminder" ? "Reminder" : "Warning"}
        </span>
      </div>
      <div className="px-3 py-2 bg-[#f5f0e6]">
        <p className="text-[11px] font-bold text-[#222]">{title}</p>
        {renderBody()}
      </div>
    </div>
  );
}

// Alarm Modal Component
interface AlarmModalProps {
  onDismiss: () => void;
}

function AlarmModal({ onDismiss }: AlarmModalProps) {
  const audioRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isStoppedRef = useRef(false);

  // Play alarm sound using Web Audio API
  useEffect(() => {
    isStoppedRef.current = false;

    const playAlarmSound = () => {
      try {
        if (!audioRef.current) {
          audioRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        }

        const ctx = audioRef.current;

        // Create a beeping pattern
        const beep = () => {
          // Don't beep if stopped
          if (isStoppedRef.current || !audioRef.current) return;

          try {
            const oscillator = ctx.createOscillator();
            const gain = ctx.createGain();

            oscillator.connect(gain);
            gain.connect(ctx.destination);

            oscillator.frequency.value = 800;
            oscillator.type = "square";

            // Keep it quiet
            gain.gain.value = 0.08;

            oscillator.start();

            // Stop after short beep
            setTimeout(() => {
              if (!isStoppedRef.current) {
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
              }
              setTimeout(() => {
                try {
                  oscillator.stop();
                } catch {
                  // Already stopped
                }
              }, 100);
            }, 150);
          } catch {
            // Audio context may be closed
          }
        };

        // Initial beep
        beep();

        // Continue beeping every 800ms
        intervalRef.current = setInterval(beep, 800);
      } catch (e) {
        console.log("Audio not supported:", e);
      }
    };

    playAlarmSound();

    return () => {
      isStoppedRef.current = true;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (audioRef.current) {
        try {
          audioRef.current.close();
        } catch {
          // Already closed
        }
        audioRef.current = null;
      }
    };
  }, []);

  const handleTurnOff = () => {
    isStoppedRef.current = true;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioRef.current) {
      try {
        audioRef.current.close();
      } catch {
        // Already closed
      }
      audioRef.current = null;
    }
    onDismiss();
  };

  return (
    <div className="alarm-overlay">
      <div className="alarm-modal win98-border-raised">
        {/* Title bar */}
        <div className="flex items-center justify-between px-2 py-1 bg-[#c41e1e]">
          <div className="flex items-center gap-2">
            <WarningIcon />
            <span className="text-[11px] font-bold text-white">⚠️ URGENT ALARM</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-4 p-4 bg-[#c8b9a9]">
          {/* Angry plant icon */}
          <div className="flex-shrink-0 alarm-shake">
            <AngryPlantIcon />
          </div>

          {/* Message */}
          <div className="flex-1">
            <p className="text-[12px] font-bold text-[#8B0000] mb-2">
              {ALARM_NOTIFICATION.title}
            </p>
            <p className="text-[11px] text-[#222]">
              {ALARM_NOTIFICATION.body}
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center p-3 bg-[#c8b9a9] border-t border-[#808080]">
          <button
            onClick={handleTurnOff}
            className="px-6 py-1 bg-[#c8b9a9] win98-border-raised text-[11px] font-bold text-[#222] hover:bg-[#d8c9b9] active:win98-border-pressed cursor-pointer"
          >
            Turn Off
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Notification System Component
export function NotificationSystem() {
  const [currentNotification, setCurrentNotification] = useState<NotificationContent | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [showAlarm, setShowAlarm] = useState(false);
  const notificationQueue = useRef<number[]>([]);
  const hasShownAlarm = useRef(false);
  const notificationCount = useRef(0);

  // Shuffle array helper
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Initialize or refill the queue
  const refillQueue = useCallback(() => {
    const indices = ALL_REGULAR_NOTIFICATIONS.map((_, i) => i);
    notificationQueue.current = shuffleArray(indices);
  }, []);

  // Show next notification
  const showNextNotification = useCallback(() => {
    // Check if we should show alarm (after a few regular notifications)
    notificationCount.current++;

    // Show alarm after a few notifications
    // TODO: TEMP - reduced for testing (was >= 8)
    if (notificationCount.current >= 4 && !hasShownAlarm.current && Math.random() < 0.5) {
      hasShownAlarm.current = true;
      setShowAlarm(true);
      return;
    }

    // Refill queue if empty
    if (notificationQueue.current.length === 0) {
      refillQueue();
      hasShownAlarm.current = false; // Reset alarm flag when queue refills
    }

    const nextIndex = notificationQueue.current.pop()!;
    const notification = ALL_REGULAR_NOTIFICATIONS[nextIndex];

    setCurrentNotification({
      ...notification,
      id: `${notification.type}-${Date.now()}`,
    });
    setIsExiting(false);
  }, [refillQueue]);

  // Auto-dismiss regular notifications
  useEffect(() => {
    if (currentNotification && !showAlarm) {
      const displayTimer = setTimeout(() => {
        setIsExiting(true);
      }, 5000); // Show for 5 seconds

      const removeTimer = setTimeout(() => {
        setCurrentNotification(null);
      }, 5500); // Remove after exit animation (500ms)

      return () => {
        clearTimeout(displayTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [currentNotification, showAlarm]);

  // Schedule notifications at random intervals
  useEffect(() => {
    refillQueue();

    // Show first notification after a short delay
    // TODO: TEMP - reduced for testing (was 15000ms)
    const initialDelay = setTimeout(() => {
      showNextNotification();
    }, 2000); // First notification after 2 seconds

    // Then show notifications at random intervals
    // TODO: TEMP - reduced for testing (was 30000 + random * 60000)
    const scheduleNext = () => {
      const delay = 3000 + Math.random() * 2000; // 3-5 seconds for testing
      return setTimeout(() => {
        if (!showAlarm) {
          showNextNotification();
        }
        intervalRef.current = scheduleNext();
      }, delay);
    };

    let intervalRef = { current: scheduleNext() };

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(intervalRef.current);
    };
  }, [refillQueue, showNextNotification, showAlarm]);

  return (
    <>
      {/* Regular notifications - top right */}
      <div className="notification-container">
        {currentNotification && !showAlarm && (
          <NotificationToast
            key={currentNotification.id}
            notification={currentNotification}
            onDismiss={() => setCurrentNotification(null)}
            isExiting={isExiting}
          />
        )}
      </div>

      {/* Alarm modal - centered */}
      {showAlarm && (
        <AlarmModal onDismiss={() => setShowAlarm(false)} />
      )}
    </>
  );
}
