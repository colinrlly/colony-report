"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ColonyReports } from "@/components/colony-reports";
import { SecretsFolder } from "@/components/secrets-folder";
import { StressReliefGallery } from "@/components/stress-relief-gallery";
import { PhotoLibrary } from "@/components/photo-library";
import { VideoLogs } from "@/components/video-logs";
import { NestedFolderWindow } from "@/components/nested-folder-window";
import { SecretPetMonitor } from "@/components/secret-pet-monitor";
import { SecurityCameraFeed } from "@/components/security-camera-feed";
import { SecurityCameraGrid } from "@/components/security-camera-grid";
import { Germsweeper } from "@/components/minesweeper";
import { ContactHRForm } from "@/components/contact-hr-form";
import { TutorialHelper } from "@/components/tutorial-helper";
import { Screensaver } from "@/components/screensaver";
import { CalendarNotification } from "@/components/calendar-notification";
import { ReminderNotification, RedactedText } from "@/components/reminder-notification";
import { PlantAlarmNotification } from "@/components/plant-alarm-notification";
import { SecurityWarningNotification } from "@/components/security-warning-notification";
import { useNotificationQueue } from "@/hooks/use-notification-queue";
import { DesktopIcon } from "@/components/ui/desktop-icon";
import { Taskbar, TaskbarButton } from "@/components/ui/taskbar";
import { Menubar, MenubarItem, MenubarLogo, MenubarProfile, MenuItemData } from "@/components/ui/menubar";

// viewMenuItems, toolsMenuItems, and helpMenuItems are defined inside the component to access state handlers

const historyMenuItems: MenuItemData[] = [
  { label: "Internet Browsing History", isHistoryTitle: true },
  { label: "WebMED  How to treat mild acid burn?", isHistoryItem: true },
  { label: "What to do if I poisoned my coworker by mistake?", isHistoryItem: true },
  { label: "Cute baby animals", isHistoryItem: true },
  { label: "eden-iv/unlisted-biome-sightings", isHistoryItem: true },
  { label: "BuzzQuiz-what taco would I be based off my favorite board games", isHistoryItem: true },
  { label: "WikHowTo- seem more chill at work", isHistoryItem: true },
  { label: "ecology-db/soil-analysis/Type_3_compounds", isHistoryItem: true },
  { label: "specimen-index/14_behavioral_patterns", isHistoryItem: true },
  { label: "how-long-does-chemical-lumen-residue-last", isHistoryItem: true },
  { label: "WebMED Is it bad to get nutrient gel in your eyes?", isHistoryItem: true },
  { label: "emergency-protocol/what-counts-as-\"sentient\"", isHistoryItem: true },
  { label: "BuzzQuiz - which cryptid are you based on your work style", isHistoryItem: true },
  { label: "How long does it take to grow back eyebrows", isHistoryItem: true },
];

type IconType = "folder" | "notebook" | "badge" | "camera" | "video-camera" | "lock";

interface DesktopIconConfig {
  id: string;
  label: string;
  icon: IconType;
  initialPosition: { x: number; y: number };
}

// Define the desktop icons with their initial positions
const DESKTOP_ICONS: DesktopIconConfig[] = [
  { id: "colony-reports", label: "Colony Reports", icon: "folder", initialPosition: { x: 24, y: 53 } },
  { id: "field-notes", label: "Field Notes", icon: "notebook", initialPosition: { x: 24, y: 183 } },
  { id: "employee-files", label: "Employee Files", icon: "badge", initialPosition: { x: 24, y: 313 } },
  { id: "photo-library", label: "Photo Library", icon: "camera", initialPosition: { x: 24, y: 443 } },
  { id: "video-logs", label: "Video Logs", icon: "video-camera", initialPosition: { x: 24, y: 573 } },
];

// Hidden file configuration - appears at bottom right
const HIDDEN_FILE = {
  id: "hidden-secrets",
  label: ".secrets",
  icon: "lock" as IconType,
  position: { x: 0, y: 0 }, // Will be calculated based on screen size
};

// Wallpaper options
type WallpaperType = 0 | 1 | 2;

/* ============================================
   NOTIFICATION SYSTEM DATA

   Architecture for popup notifications:
   - Unified queue system in: src/hooks/use-notification-queue.ts
   - Shows ONE notification at a time from a pool of 8:
     * 3 Calendar events (auto-dismiss after animation)
     * 3 Reminders (auto-dismiss after animation)
     * 1 Plant Alarm (requires clicking "Water Plants Remotely")
     * 1 Security Warning (requires clicking "View Camera 3")
   - Randomized order each cycle, all 8 shown before repeating
   - State persisted to localStorage (survives page refresh)
   - 5 second gap between notifications (for testing)
   - Each notification type has its own component
   ============================================ */

// Calendar notification data
interface CalendarNotificationData {
  eventName: string;
  time: string;
  note?: string;
}

const CALENDAR_NOTIFICATIONS: CalendarNotificationData[] = [
  {
    eventName: "Field Operation",
    time: "Tomorrow 08:00-18:00",
    note: "Note to self: bring Hank the experimental morning-cheer tonic.",
  },
  {
    eventName: "Weekly Team Sync",
    time: "Every Thursday 7:00-7:15",
    note: "Note to self: Bring updated notes. Don't forget yesterday's field anomaly.",
  },
  {
    eventName: "Specimen 14 Enrichment Session",
    time: "Every other Monday",
    note: "Note to self: bring new puzzle object, last one dissolved.",
  },
];

// Reminder notification data - function returns array to support JSX content
const getReminderNotifications = () => [
  {
    title: "Desk Cleanup Reminder",
    message: "Prep your workstation before next Friday's lab check. You know how Facility Ops gets about \"organizational standards.\"",
  },
  {
    title: "Teach Toby to Feed Specimen H1",
    message: "Walk Toby through the H1 feeding protocol. Could be a good teaching moment… and he'll get used to the risk. Eventually.",
  },
  {
    title: <>Feed <RedactedText>Specimen X7</RedactedText></>,
    message: <>Don&apos;t forget to feed… well, you know. The specimen.</>,
  },
];

export default function Home() {
  const [isColonyReportsOpen, setIsColonyReportsOpen] = useState(false);
  const [isColonyReportsMinimized, setIsColonyReportsMinimized] = useState(false);
  const [isSecretsFolderOpen, setIsSecretsFolderOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const [restartPhase, setRestartPhase] = useState<'black' | 'flicker'>('black');
  const [showHiddenFiles, setShowHiddenFiles] = useState(false);
  const [currentWallpaper, setCurrentWallpaper] = useState<WallpaperType>(0);
  const [isAntWiggling, setIsAntWiggling] = useState(false);

  // Nested folder windows state - chain from "Nothing..." to pet monitor
  const [isNothingOpen, setIsNothingOpen] = useState(false);
  const [isSeriouslyNothingOpen, setIsSeriouslyNothingOpen] = useState(false);
  const [isPleaseStopOpen, setIsPleaseStopOpen] = useState(false);
  const [isGoNoFurtherOpen, setIsGoNoFurtherOpen] = useState(false);
  const [isAreYouSeriousOpen, setIsAreYouSeriousOpen] = useState(false);
  const [isUghFineOpen, setIsUghFineOpen] = useState(false);
  const [isPetMonitorOpen, setIsPetMonitorOpen] = useState(false);
  const [isPetMonitorMinimized, setIsPetMonitorMinimized] = useState(false);

  // Minesweeper game state
  const [isMinesweeperOpen, setIsMinesweeperOpen] = useState(false);
  const [isMinesweeperMinimized, setIsMinesweeperMinimized] = useState(false);

  // Contact HR form state
  const [isContactHROpen, setIsContactHROpen] = useState(false);
  const [isContactHRMinimized, setIsContactHRMinimized] = useState(false);

  // Security camera state (4 cameras)
  const [openCameras, setOpenCameras] = useState<Record<number, boolean>>({});
  const [minimizedCameras, setMinimizedCameras] = useState<Record<number, boolean>>({});

  // Security camera grid view state (all cameras)
  const [isAllCamerasOpen, setIsAllCamerasOpen] = useState(false);
  const [isAllCamerasMinimized, setIsAllCamerasMinimized] = useState(false);

  // Stress Relief gallery state
  const [isStressReliefOpen, setIsStressReliefOpen] = useState(false);
  const [isStressReliefMinimized, setIsStressReliefMinimized] = useState(false);

  // Photo Library state
  const [isPhotoLibraryOpen, setIsPhotoLibraryOpen] = useState(false);
  const [isPhotoLibraryMinimized, setIsPhotoLibraryMinimized] = useState(false);

  // Video Logs state
  const [isVideoLogsOpen, setIsVideoLogsOpen] = useState(false);
  const [isVideoLogsMinimized, setIsVideoLogsMinimized] = useState(false);

  // Tutorial helper state
  const [isTutorialHelperVisible, setIsTutorialHelperVisible] = useState(false);
  const [tutorialClickCount, setTutorialClickCount] = useState(0);

  // Screensaver state
  const [isScreensaverActive, setIsScreensaverActive] = useState(false);

  // Unified notification queue system
  const {
    currentNotification,
    isNotificationVisible,
    handleNotificationComplete,
  } = useNotificationQueue();

  // Camera 3 warning mode (separate from notification visibility)
  const [isCam3WarningMode, setIsCam3WarningMode] = useState(false);

  // Track positions for each icon - initialized to their starting positions
  const [iconPositions, setIconPositions] = useState<Record<string, { x: number; y: number }>>(
    () => DESKTOP_ICONS.reduce((acc, icon) => {
      acc[icon.id] = { ...icon.initialPosition };
      return acc;
    }, {} as Record<string, { x: number; y: number }>)
  );

  // Track which icon is being dragged
  const [draggingIcon, setDraggingIcon] = useState<string | null>(null);
  const dragStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragStartIconPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mainRef = useRef<HTMLElement>(null);
  const hasDragged = useRef(false);

  const handleMouseDown = useCallback((iconId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setDraggingIcon(iconId);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    dragStartIconPos.current = { ...iconPositions[iconId] };
    hasDragged.current = false;
  }, [iconPositions]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!draggingIcon || !mainRef.current) return;

    const deltaX = e.clientX - dragStartPos.current.x;
    const deltaY = e.clientY - dragStartPos.current.y;

    // Consider it a drag if moved more than 5 pixels
    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      hasDragged.current = true;
    }

    // Get the bounds of the main container
    const bounds = mainRef.current.getBoundingClientRect();

    // Calculate new position
    let newX = dragStartIconPos.current.x + deltaX;
    let newY = dragStartIconPos.current.y + deltaY;

    // Constrain to bounds (accounting for icon size and UI bars)
    const iconWidth = 100;
    const iconHeight = 120;
    const menubarHeight = 46;  // Height of top menubar
    const taskbarHeight = 50;  // Height of bottom taskbar

    // Horizontal bounds: 0 to (width - iconWidth)
    newX = Math.max(0, Math.min(newX, bounds.width - iconWidth));
    // Vertical bounds: below menubar to above taskbar
    newY = Math.max(menubarHeight, Math.min(newY, bounds.height - iconHeight - taskbarHeight));

    setIconPositions(prev => ({
      ...prev,
      [draggingIcon]: { x: newX, y: newY }
    }));
  }, [draggingIcon]);

  const handleMouseUp = useCallback(() => {
    setDraggingIcon(null);
  }, []);

  // Add global mouse event listeners when dragging
  useEffect(() => {
    if (draggingIcon) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggingIcon, handleMouseMove, handleMouseUp]);

  const handleIconClick = (iconId: string) => {
    // Only trigger click if we didn't drag
    if (hasDragged.current) {
      hasDragged.current = false;
      return;
    }

    switch (iconId) {
      case "colony-reports":
        setIsColonyReportsOpen(true);
        break;
      case "photo-library":
        setIsPhotoLibraryOpen(true);
        setIsPhotoLibraryMinimized(false);
        break;
      case "video-logs":
        setIsVideoLogsOpen(true);
        setIsVideoLogsMinimized(false);
        break;
    }
  };

  // Handle refresh desktop - reset all folder positions, wallpaper, with flicker animation
  const handleRefreshDesktop = useCallback(() => {
    // Trigger flicker animation
    setIsRefreshing(true);

    // Reset all icon positions to their initial positions, hide hidden files, and reset wallpaper
    setTimeout(() => {
      setIconPositions(
        DESKTOP_ICONS.reduce((acc, icon) => {
          acc[icon.id] = { ...icon.initialPosition };
          return acc;
        }, {} as Record<string, { x: number; y: number }>)
      );
      setShowHiddenFiles(false);
      setCurrentWallpaper(0);

      // Close all open windows
      setIsColonyReportsOpen(false);
      setIsColonyReportsMinimized(false);
      setIsSecretsFolderOpen(false);
      setIsNothingOpen(false);
      setIsSeriouslyNothingOpen(false);
      setIsPleaseStopOpen(false);
      setIsGoNoFurtherOpen(false);
      setIsAreYouSeriousOpen(false);
      setIsUghFineOpen(false);
      setIsPetMonitorOpen(false);
      setIsPetMonitorMinimized(false);
      setIsMinesweeperOpen(false);
      setIsMinesweeperMinimized(false);
      setIsContactHROpen(false);
      setIsContactHRMinimized(false);
      setIsStressReliefOpen(false);
      setIsStressReliefMinimized(false);
      setIsPhotoLibraryOpen(false);
      setIsPhotoLibraryMinimized(false);
      setIsVideoLogsOpen(false);
      setIsVideoLogsMinimized(false);
      setIsTutorialHelperVisible(false);
      setOpenCameras({});
      setMinimizedCameras({});
      setIsAllCamerasOpen(false);
      setIsAllCamerasMinimized(false);
      setIsCam3WarningMode(false);
    }, 100);

    // End the flicker animation after a short delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 300);
  }, []);

  // Handle restart - black screen with neon green text, then flicker back to life
  const handleRestart = useCallback(() => {
    setIsRestarting(true);
    setRestartPhase('black');

    // After showing the "Restarting..." screen, perform the desktop refresh
    setTimeout(() => {
      // Reset all icon positions to their initial positions, hide hidden files, and reset wallpaper
      setIconPositions(
        DESKTOP_ICONS.reduce((acc, icon) => {
          acc[icon.id] = { ...icon.initialPosition };
          return acc;
        }, {} as Record<string, { x: number; y: number }>)
      );
      setShowHiddenFiles(false);
      setCurrentWallpaper(0);

      // Close all open windows
      setIsColonyReportsOpen(false);
      setIsColonyReportsMinimized(false);
      setIsSecretsFolderOpen(false);
      setIsNothingOpen(false);
      setIsSeriouslyNothingOpen(false);
      setIsPleaseStopOpen(false);
      setIsGoNoFurtherOpen(false);
      setIsAreYouSeriousOpen(false);
      setIsUghFineOpen(false);
      setIsPetMonitorOpen(false);
      setIsPetMonitorMinimized(false);
      setIsMinesweeperOpen(false);
      setIsMinesweeperMinimized(false);
      setIsContactHROpen(false);
      setIsContactHRMinimized(false);
      setIsStressReliefOpen(false);
      setIsStressReliefMinimized(false);
      setIsPhotoLibraryOpen(false);
      setIsPhotoLibraryMinimized(false);
      setIsVideoLogsOpen(false);
      setIsVideoLogsMinimized(false);
      setIsTutorialHelperVisible(false);
      setOpenCameras({});
      setMinimizedCameras({});
      setIsAllCamerasOpen(false);
      setIsAllCamerasMinimized(false);
      setIsCam3WarningMode(false);
    }, 1800); // Just after progress bar completes

    // Start the flicker-out phase
    setTimeout(() => {
      setRestartPhase('flicker');
    }, 2000);

    // End the restart animation
    setTimeout(() => {
      setIsRestarting(false);
      setRestartPhase('black');
    }, 2400);
  }, []);

  // Handle show hidden files toggle
  const handleShowHiddenFiles = useCallback(() => {
    setShowHiddenFiles(prev => !prev);
  }, []);

  // Handle wallpaper toggle - cycles through 3 options
  const handleToggleWallpaper = useCallback(() => {
    setCurrentWallpaper(prev => ((prev + 1) % 3) as WallpaperType);
  }, []);

  // Handle ant click - wiggle legs
  const handleAntClick = useCallback(() => {
    if (isAntWiggling) return; // Don't restart if already wiggling
    setIsAntWiggling(true);
    setTimeout(() => setIsAntWiggling(false), 600); // Animation duration: 0.15s * 4 repeats
  }, [isAntWiggling]);

  // Handle tutorial click - show Clippy-like helper
  const handleTutorialClick = useCallback(() => {
    if (isTutorialHelperVisible) return; // Don't restart if already visible
    setTutorialClickCount(prev => prev + 1);
    setIsTutorialHelperVisible(true);
  }, [isTutorialHelperVisible]);

  // Handle sleep - activate screensaver
  const handleSleep = useCallback(() => {
    setIsScreensaverActive(true);
  }, []);

  // Handle screensaver exit
  const handleScreensaverExit = useCallback(() => {
    setIsScreensaverActive(false);
  }, []);

  // Handle security warning "View Camera" button click
  const handleSecurityWarningViewCamera = useCallback(() => {
    // Open camera 3 in warning mode
    setIsCam3WarningMode(true);
    setIsAllCamerasOpen(false);
    setIsAllCamerasMinimized(false);
    setOpenCameras(prev => ({ ...prev, 3: true }));
    setMinimizedCameras(prev => ({ ...prev, 3: false }));

    // Complete the notification (advances to next in queue)
    handleNotificationComplete();
  }, [handleNotificationComplete]);

  // Handle camera 3 close - reset warning mode
  const handleCam3Close = useCallback(() => {
    setOpenCameras(prev => ({ ...prev, 3: false }));
    setMinimizedCameras(prev => ({ ...prev, 3: false }));
    setIsCam3WarningMode(false); // Reset warning mode when closed
  }, []);


  // View menu items - defined here to access the refresh handler
  const viewMenuItems: MenuItemData[] = [
    { label: "Refresh Desktop", onClick: handleRefreshDesktop },
    { label: showHiddenFiles ? "Hide Hidden Files" : "Show Hidden Files", onClick: handleShowHiddenFiles },
    { label: "Toggle Wallpaper", onClick: handleToggleWallpaper },
  ];

  // Tools menu items - defined here to access game handlers
  const toolsMenuItems: MenuItemData[] = [
    {
      label: "Games",
      submenu: [
        { label: "Germsweeper", onClick: () => {
          setIsMinesweeperOpen(true);
          setIsMinesweeperMinimized(false);
        }},
      ],
    },
    {
      label: "Security Cams",
      submenu: [
        { label: "Ant Hill- Cam 1", onClick: () => {
          // Close grid view when opening single camera
          setIsAllCamerasOpen(false);
          setIsAllCamerasMinimized(false);
          setOpenCameras(prev => ({ ...prev, 1: true }));
          setMinimizedCameras(prev => ({ ...prev, 1: false }));
        }},
        { label: "Ant Hill- Cam 2", onClick: () => {
          // Close grid view when opening single camera
          setIsAllCamerasOpen(false);
          setIsAllCamerasMinimized(false);
          setOpenCameras(prev => ({ ...prev, 2: true }));
          setMinimizedCameras(prev => ({ ...prev, 2: false }));
        }},
        { label: "Ant Hill- Cam 3", onClick: () => {
          // Close grid view when opening single camera
          setIsAllCamerasOpen(false);
          setIsAllCamerasMinimized(false);
          setOpenCameras(prev => ({ ...prev, 3: true }));
          setMinimizedCameras(prev => ({ ...prev, 3: false }));
          setIsCam3WarningMode(false); // Reset warning mode when opening from menu
        }},
        { label: "Ant Hill- Cam 4", onClick: () => {
          // Close grid view when opening single camera
          setIsAllCamerasOpen(false);
          setIsAllCamerasMinimized(false);
          setOpenCameras(prev => ({ ...prev, 4: true }));
          setMinimizedCameras(prev => ({ ...prev, 4: false }));
        }},
        { label: "See all security cameras", onClick: () => {
          // Close all single cameras when opening grid view
          setOpenCameras({});
          setMinimizedCameras({});
          setIsAllCamerasOpen(true);
          setIsAllCamerasMinimized(false);
        }},
      ],
    },
    { label: "Plant Monitor" },
  ];

  // Help menu items - defined here to access contact HR handler
  const helpMenuItems: MenuItemData[] = [
    { label: "Tutorial", onClick: handleTutorialClick },
    { label: "Contact HR", onClick: () => {
      setIsContactHROpen(true);
      setIsContactHRMinimized(false);
    }},
  ];

  return (
    <>
      {/* Screen flicker animation overlay */}
      {isRefreshing && (
        <div
          className="fixed inset-0 z-[9999] pointer-events-none animate-flicker"
          style={{
            background: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.25) 50%)',
            backgroundSize: '100% 4px',
          }}
        >
          <div className="absolute inset-0 bg-white/30 animate-pulse" />
        </div>
      )}

      {/* Restart animation overlay */}
      {isRestarting && (
        <div className={`restart-overlay ${restartPhase === 'flicker' ? 'restart-flicker-out' : ''}`}>
          {restartPhase === 'black' && (
            <>
              <div className="restart-text">
                Restarting
                <span className="restart-dot-1">.</span>
                <span className="restart-dot-2">.</span>
                <span className="restart-dot-3">.</span>
              </div>
              <div className="restart-progress-container">
                <div className="restart-progress-bar" />
              </div>
            </>
          )}
        </div>
      )}

      <Menubar>
        <MenubarLogo />
        <MenubarItem label="View" menuItems={viewMenuItems} />
        <MenubarItem label="Tools" menuItems={toolsMenuItems} />
        <MenubarItem label="History" menuItems={historyMenuItems} />
        <MenubarItem label="Help" menuItems={helpMenuItems} />
        <MenubarProfile />
      </Menubar>

      <main ref={mainRef} className="min-h-screen relative p-4 pt-[46px] pb-[50px]">
        {/* Wallpaper Backgrounds */}
        {currentWallpaper === 0 && (
          <div className="wallpaper-default absolute inset-0 -z-10" />
        )}
        {currentWallpaper === 1 && (
          <div className="wallpaper-formica absolute inset-0 -z-10" />
        )}
        {currentWallpaper === 1 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none">
            {/* N.E.C. FORMICA DIVISION styled like Microsoft Windows Premiere Edition */}
            <div className="text-center">
              {/* N.E.C. on its own line - large with periods */}
              <div className="text-[96px] font-bold tracking-[0.15em] text-[#d4c8a0] drop-shadow-[3px_3px_0px_#3d2914] leading-none" style={{ fontFamily: 'Arial Black, sans-serif' }}>
                N.E.C.
              </div>
              {/* Formica Division on its own line - bold */}
              <div className="text-[36px] font-bold tracking-[0.25em] text-[#d4c8a0] mt-4 drop-shadow-[2px_2px_0px_#3d2914]" style={{ fontFamily: 'Arial Black, sans-serif' }}>
                FORMICA DIVISION
              </div>
              {/* Pixel Art Ant Logo - below text, clickable */}
              <svg
                className="mx-auto mt-8 cursor-pointer hover:scale-105 transition-transform pointer-events-auto"
                width="80"
                height="80"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ imageRendering: "pixelated" }}
                onClick={handleAntClick}
              >
                {/* Ant head */}
                <rect x="8" y="2" width="4" height="3" fill="#1a1a1a" />
                {/* Antennae */}
                <rect x="6" y="1" width="1" height="2" fill="#1a1a1a" />
                <rect x="13" y="1" width="1" height="2" fill="#1a1a1a" />
                <rect x="5" y="0" width="1" height="1" fill="#1a1a1a" />
                <rect x="14" y="0" width="1" height="1" fill="#1a1a1a" />
                {/* Thorax (middle body) */}
                <rect x="7" y="5" width="6" height="4" fill="#1a1a1a" />
                {/* Abdomen (back body) */}
                <rect x="6" y="9" width="8" height="5" fill="#1a1a1a" />
                <rect x="7" y="14" width="6" height="3" fill="#1a1a1a" />
                <rect x="8" y="17" width="4" height="2" fill="#1a1a1a" />
                {/* Left legs - animated */}
                <g className={`ant-leg-left ${isAntWiggling ? 'wiggling' : ''}`}>
                  <rect x="4" y="5" width="3" height="1" fill="#1a1a1a" />
                  <rect x="3" y="6" width="1" height="2" fill="#1a1a1a" />
                  <rect x="4" y="8" width="3" height="1" fill="#1a1a1a" />
                  <rect x="2" y="9" width="2" height="1" fill="#1a1a1a" />
                  <rect x="4" y="11" width="2" height="1" fill="#1a1a1a" />
                  <rect x="2" y="12" width="2" height="1" fill="#1a1a1a" />
                  <rect x="1" y="13" width="1" height="2" fill="#1a1a1a" />
                </g>
                {/* Right legs - animated */}
                <g className={`ant-leg-right ${isAntWiggling ? 'wiggling' : ''}`}>
                  <rect x="13" y="5" width="3" height="1" fill="#1a1a1a" />
                  <rect x="16" y="6" width="1" height="2" fill="#1a1a1a" />
                  <rect x="13" y="8" width="3" height="1" fill="#1a1a1a" />
                  <rect x="16" y="9" width="2" height="1" fill="#1a1a1a" />
                  <rect x="14" y="11" width="2" height="1" fill="#1a1a1a" />
                  <rect x="16" y="12" width="2" height="1" fill="#1a1a1a" />
                  <rect x="18" y="13" width="1" height="2" fill="#1a1a1a" />
                </g>
                {/* Eyes */}
                <rect x="8" y="3" width="1" height="1" fill="#4a4a4a" />
                <rect x="11" y="3" width="1" height="1" fill="#4a4a4a" />
              </svg>
              <div className="mt-8 text-[11px] text-[#a09080] tracking-wide">
                For Authorized Personnel Only
              </div>
              <div className="text-[11px] text-[#a09080] tracking-wide mt-1">
                ColonyOS Workstation v4.2 - Ant Hill Subnetwork
              </div>
              <div className="text-[11px] text-[#a09080] tracking-wide mt-1">
                Property of N.E.C. - Unauthorized access prohibited
              </div>
            </div>
          </div>
        )}
        {currentWallpaper === 2 && (
          <div className="wallpaper-eden absolute inset-0 -z-10">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* NEW EDEN COMMITTEE with large earth logo */}
              <div className="text-center">
                {/* Large Earth Logo */}
                <img
                  className="mx-auto mb-6"
                  src="/earth logo2.png"
                  alt="Earth logo"
                  width="180"
                  height="180"
                />
                <div className="text-[56px] font-bold tracking-[0.1em] text-[#39ff14]" style={{ fontFamily: 'Arial Black, sans-serif', textShadow: '0 0 4px rgba(57, 255, 20, 0.8), 2px 2px 0px #1a4d0a' }}>
                  NEW EDEN
                </div>
                <div className="text-[32px] tracking-[0.4em] text-[#39ff14] mt-2" style={{ fontFamily: 'Arial, sans-serif', textShadow: '0 0 3px rgba(57, 255, 20, 0.7), 1px 1px 0px #1a4d0a' }}>
                  COMMITTEE
                </div>
                <div className="mt-10 text-[12px] text-[#7dff7d] tracking-wide">
                  Cultivating Tomorrow, Today™
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CRT Screen Effect Overlay - behind all content, only affects wallpaper */}
        <div className="crt-overlay pointer-events-none -z-5" />

        {/* Desktop Icons - each independently draggable */}
        {DESKTOP_ICONS.map((iconConfig) => (
          <div
            key={iconConfig.id}
            className={`absolute select-none ${draggingIcon === iconConfig.id ? 'cursor-grabbing z-50' : 'cursor-grab z-10'}`}
            style={{
              left: iconPositions[iconConfig.id].x,
              top: iconPositions[iconConfig.id].y,
            }}
            onMouseDown={(e) => handleMouseDown(iconConfig.id, e)}
          >
            <DesktopIcon
              label={iconConfig.label}
              icon={iconConfig.icon}
              onClick={() => handleIconClick(iconConfig.id)}
            />
          </div>
        ))}

        {/* Hidden file - appears at bottom right when Show Hidden Files is clicked */}
        {showHiddenFiles && (
          <div
            className="absolute select-none cursor-pointer z-10"
            style={{
              right: 24,
              bottom: 70,
            }}
          >
            <DesktopIcon
              label={HIDDEN_FILE.label}
              icon={HIDDEN_FILE.icon}
              onClick={() => setIsSecretsFolderOpen(true)}
            />
          </div>
        )}

        {/* Windows */}
        {isColonyReportsOpen && !isColonyReportsMinimized && (
          <ColonyReports
            onClose={() => {
              setIsColonyReportsOpen(false);
              setIsColonyReportsMinimized(false);
            }}
            onMinimize={() => setIsColonyReportsMinimized(true)}
          />
        )}
        {isSecretsFolderOpen && (
          <SecretsFolder
            onClose={() => setIsSecretsFolderOpen(false)}
            onOpenNothing={() => setIsNothingOpen(true)}
            onOpenStressRelief={() => {
              setIsStressReliefOpen(true);
              setIsStressReliefMinimized(false);
            }}
          />
        )}

        {/* Nested folder chain from Nothing... */}
        {isNothingOpen && (
          <NestedFolderWindow
            title="Nothing..."
            childFolderLabel="Seriously Nothing…"
            onClose={() => setIsNothingOpen(false)}
            onOpenChild={() => setIsSeriouslyNothingOpen(true)}
            position={{ top: "20vh", left: "32vw" }}
          />
        )}
        {isSeriouslyNothingOpen && (
          <NestedFolderWindow
            title="Seriously Nothing…"
            childFolderLabel="Please Stop"
            onClose={() => setIsSeriouslyNothingOpen(false)}
            onOpenChild={() => setIsPleaseStopOpen(true)}
            position={{ top: "22vh", left: "36vw" }}
          />
        )}
        {isPleaseStopOpen && (
          <NestedFolderWindow
            title="Please Stop"
            childFolderLabel="Go No Further"
            onClose={() => setIsPleaseStopOpen(false)}
            onOpenChild={() => setIsGoNoFurtherOpen(true)}
            position={{ top: "24vh", left: "40vw" }}
          />
        )}
        {isGoNoFurtherOpen && (
          <NestedFolderWindow
            title="Go No Further"
            childFolderLabel="Are You Serious"
            onClose={() => setIsGoNoFurtherOpen(false)}
            onOpenChild={() => setIsAreYouSeriousOpen(true)}
            position={{ top: "26vh", left: "44vw" }}
          />
        )}
        {isAreYouSeriousOpen && (
          <NestedFolderWindow
            title="Are You Serious"
            childFolderLabel="Unbelievable"
            showSkullOnChild={true}
            onClose={() => setIsAreYouSeriousOpen(false)}
            onOpenChild={() => setIsUghFineOpen(true)}
            position={{ top: "28vh", left: "48vw" }}
          />
        )}
        {isUghFineOpen && (
          <NestedFolderWindow
            title="Unbelievable 💀"
            childFolderLabel="secret_pet_monitor"
            onClose={() => {
              // Close this folder, pet monitor, and all nested folders, but keep .secrets open
              setIsUghFineOpen(false);
              setIsPetMonitorOpen(false);
              setIsPetMonitorMinimized(false);
              setIsAreYouSeriousOpen(false);
              setIsGoNoFurtherOpen(false);
              setIsPleaseStopOpen(false);
              setIsSeriouslyNothingOpen(false);
              setIsNothingOpen(false);
            }}
            onOpenChild={() => setIsPetMonitorOpen(true)}
            position={{ top: "30vh", left: "52vw" }}
          />
        )}

        {/* Secret Pet Monitor - final destination */}
        {isPetMonitorOpen && !isPetMonitorMinimized && (
          <SecretPetMonitor
            onClose={() => {
              // Close pet monitor and all nested folders, but keep .secrets open
              setIsPetMonitorOpen(false);
              setIsPetMonitorMinimized(false);
              setIsUghFineOpen(false);
              setIsAreYouSeriousOpen(false);
              setIsGoNoFurtherOpen(false);
              setIsPleaseStopOpen(false);
              setIsSeriouslyNothingOpen(false);
              setIsNothingOpen(false);
            }}
            onMinimize={() => setIsPetMonitorMinimized(true)}
          />
        )}

        {/* Germsweeper Game */}
        {isMinesweeperOpen && !isMinesweeperMinimized && (
          <Germsweeper
            onClose={() => {
              setIsMinesweeperOpen(false);
              setIsMinesweeperMinimized(false);
            }}
            onMinimize={() => setIsMinesweeperMinimized(true)}
          />
        )}

        {/* Contact HR Form */}
        {isContactHROpen && !isContactHRMinimized && (
          <ContactHRForm
            onClose={() => {
              setIsContactHROpen(false);
              setIsContactHRMinimized(false);
            }}
            onMinimize={() => setIsContactHRMinimized(true)}
          />
        )}

        {/* Security Camera Feeds */}
        {[1, 2, 4].map((camNum) => (
          openCameras[camNum] && !minimizedCameras[camNum] && (
            <SecurityCameraFeed
              key={camNum}
              cameraNumber={camNum}
              onClose={() => {
                setOpenCameras(prev => ({ ...prev, [camNum]: false }));
                setMinimizedCameras(prev => ({ ...prev, [camNum]: false }));
              }}
              onMinimize={() => setMinimizedCameras(prev => ({ ...prev, [camNum]: true }))}
            />
          )
        ))}

        {/* Camera 3 - special handling for warning mode */}
        {openCameras[3] && !minimizedCameras[3] && (
          <SecurityCameraFeed
            cameraNumber={3}
            warningMode={isCam3WarningMode}
            onClose={handleCam3Close}
            onMinimize={() => setMinimizedCameras(prev => ({ ...prev, 3: true }))}
          />
        )}

        {/* Security Camera Grid (All Cameras) */}
        {isAllCamerasOpen && !isAllCamerasMinimized && (
          <SecurityCameraGrid
            onClose={() => {
              setIsAllCamerasOpen(false);
              setIsAllCamerasMinimized(false);
            }}
            onMinimize={() => setIsAllCamerasMinimized(true)}
          />
        )}

        {/* Stress Relief Gallery */}
        {isStressReliefOpen && !isStressReliefMinimized && (
          <StressReliefGallery
            onClose={() => {
              setIsStressReliefOpen(false);
              setIsStressReliefMinimized(false);
            }}
            onMinimize={() => setIsStressReliefMinimized(true)}
          />
        )}

        {/* Photo Library */}
        {isPhotoLibraryOpen && !isPhotoLibraryMinimized && (
          <PhotoLibrary
            onClose={() => {
              setIsPhotoLibraryOpen(false);
              setIsPhotoLibraryMinimized(false);
            }}
            onMinimize={() => setIsPhotoLibraryMinimized(true)}
          />
        )}

        {/* Video Logs */}
        {isVideoLogsOpen && !isVideoLogsMinimized && (
          <VideoLogs
            onClose={() => {
              setIsVideoLogsOpen(false);
              setIsVideoLogsMinimized(false);
            }}
            onMinimize={() => setIsVideoLogsMinimized(true)}
          />
        )}

        {/* Tutorial Helper (Clippy knockoff) */}
        {isTutorialHelperVisible && (
          <TutorialHelper
            clickCount={tutorialClickCount}
            onAnimationComplete={() => setIsTutorialHelperVisible(false)}
          />
        )}
      </main>

      {/* Unified Notification System - shows one notification at a time */}
      {/* Calendar Notifications */}
      <CalendarNotification
        isVisible={isNotificationVisible && currentNotification === "calendar-1"}
        onComplete={handleNotificationComplete}
        eventName={CALENDAR_NOTIFICATIONS[0].eventName}
        time={CALENDAR_NOTIFICATIONS[0].time}
        note={CALENDAR_NOTIFICATIONS[0].note}
      />
      <CalendarNotification
        isVisible={isNotificationVisible && currentNotification === "calendar-2"}
        onComplete={handleNotificationComplete}
        eventName={CALENDAR_NOTIFICATIONS[1].eventName}
        time={CALENDAR_NOTIFICATIONS[1].time}
        note={CALENDAR_NOTIFICATIONS[1].note}
      />
      <CalendarNotification
        isVisible={isNotificationVisible && currentNotification === "calendar-3"}
        onComplete={handleNotificationComplete}
        eventName={CALENDAR_NOTIFICATIONS[2].eventName}
        time={CALENDAR_NOTIFICATIONS[2].time}
        note={CALENDAR_NOTIFICATIONS[2].note}
      />

      {/* Reminder Notifications */}
      <ReminderNotification
        isVisible={isNotificationVisible && currentNotification === "reminder-1"}
        onComplete={handleNotificationComplete}
        title={getReminderNotifications()[0].title}
        message={getReminderNotifications()[0].message}
      />
      <ReminderNotification
        isVisible={isNotificationVisible && currentNotification === "reminder-2"}
        onComplete={handleNotificationComplete}
        title={getReminderNotifications()[1].title}
        message={getReminderNotifications()[1].message}
      />
      <ReminderNotification
        isVisible={isNotificationVisible && currentNotification === "reminder-3"}
        onComplete={handleNotificationComplete}
        title={getReminderNotifications()[2].title}
        message={getReminderNotifications()[2].message}
      />

      {/* Plant Alarm Notification - requires user action to dismiss */}
      <PlantAlarmNotification
        isVisible={isNotificationVisible && currentNotification === "plant-alarm"}
        onDismiss={handleNotificationComplete}
      />

      {/* Security Warning Notification - stays until button clicked */}
      <SecurityWarningNotification
        isVisible={isNotificationVisible && currentNotification === "security-warning"}
        onViewCamera={handleSecurityWarningViewCamera}
      />

      {/* Screensaver */}
      {isScreensaverActive && (
        <Screensaver onExit={handleScreensaverExit} />
      )}

      <Taskbar onRestart={handleRestart} onSleep={handleSleep}>
        {isColonyReportsOpen && (
          <TaskbarButton
            title="COLONY REPORTS"
            isActive={!isColonyReportsMinimized && !isSecretsFolderOpen && !isPetMonitorOpen && (!isMinesweeperOpen || isMinesweeperMinimized)}
            onClick={() => setIsColonyReportsMinimized(!isColonyReportsMinimized)}
          />
        )}
        {isSecretsFolderOpen && (
          <TaskbarButton
            title=".secrets"
            isActive={!isPetMonitorOpen && (!isMinesweeperOpen || isMinesweeperMinimized)}
            onClick={() => setIsSecretsFolderOpen(true)}
          />
        )}
        {isPetMonitorOpen && (
          <TaskbarButton
            title="secret_pet_monitor"
            isActive={!isPetMonitorMinimized}
            onClick={() => setIsPetMonitorMinimized(!isPetMonitorMinimized)}
          />
        )}
        {isMinesweeperOpen && (
          <TaskbarButton
            title="Germsweeper"
            isActive={!isMinesweeperMinimized}
            onClick={() => setIsMinesweeperMinimized(!isMinesweeperMinimized)}
          />
        )}
        {isContactHROpen && (
          <TaskbarButton
            title="Contact HR"
            isActive={!isContactHRMinimized}
            onClick={() => setIsContactHRMinimized(!isContactHRMinimized)}
          />
        )}
        {[1, 2, 3, 4].map((camNum) => (
          openCameras[camNum] && (
            <TaskbarButton
              key={`cam-${camNum}`}
              title={`Cam ${camNum}`}
              isActive={!minimizedCameras[camNum]}
              onClick={() => setMinimizedCameras(prev => ({ ...prev, [camNum]: !prev[camNum] }))}
            />
          )
        ))}
        {isAllCamerasOpen && (
          <TaskbarButton
            title="All Cameras"
            isActive={!isAllCamerasMinimized}
            onClick={() => setIsAllCamerasMinimized(!isAllCamerasMinimized)}
          />
        )}
        {isStressReliefOpen && (
          <TaskbarButton
            title="Stress Relief"
            isActive={!isStressReliefMinimized}
            onClick={() => setIsStressReliefMinimized(!isStressReliefMinimized)}
          />
        )}
        {isPhotoLibraryOpen && (
          <TaskbarButton
            title="Photo Library"
            isActive={!isPhotoLibraryMinimized}
            onClick={() => setIsPhotoLibraryMinimized(!isPhotoLibraryMinimized)}
          />
        )}
        {isVideoLogsOpen && (
          <TaskbarButton
            title="Video Logs"
            isActive={!isVideoLogsMinimized}
            onClick={() => setIsVideoLogsMinimized(!isVideoLogsMinimized)}
          />
        )}
      </Taskbar>
    </>
  );
}
