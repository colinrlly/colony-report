"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ColonyReports } from "@/components/colony-reports";
import { SecretsFolder } from "@/components/secrets-folder";
import { NestedFolderWindow } from "@/components/nested-folder-window";
import { SecretPetMonitor } from "@/components/secret-pet-monitor";
import { DesktopIcon } from "@/components/ui/desktop-icon";
import { Taskbar, TaskbarButton } from "@/components/ui/taskbar";
import { Menubar, MenubarItem, MenubarLogo, MenubarProfile, MenuItemData } from "@/components/ui/menubar";

// viewMenuItems is defined inside the component to access the refresh handler

const toolsMenuItems: MenuItemData[] = [
  {
    label: "Games",
    submenu: [
      { label: "Mine Sweeper" },
    ],
  },
  {
    label: "Security Cams",
    submenu: [
      { label: "Ant Hill- Cam 1" },
      { label: "Ant Hill- Cam 2" },
      { label: "Ant Hill- Cam 3" },
      { label: "Ant Hill- Cam 4" },
    ],
  },
  { label: "Plant Monitor" },
];

const helpMenuItems: MenuItemData[] = [
  { label: "Tutorial" },
  { label: "Contact HR" },
];

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

export default function Home() {
  const [isColonyReportsOpen, setIsColonyReportsOpen] = useState(false);
  const [isSecretsFolderOpen, setIsSecretsFolderOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showHiddenFiles, setShowHiddenFiles] = useState(false);
  const [currentWallpaper, setCurrentWallpaper] = useState<WallpaperType>(0);

  // Nested folder windows state - chain from "Nothing..." to pet monitor
  const [isNothingOpen, setIsNothingOpen] = useState(false);
  const [isSeriouslyNothingOpen, setIsSeriouslyNothingOpen] = useState(false);
  const [isPleaseStopOpen, setIsPleaseStopOpen] = useState(false);
  const [isGoNoFurtherOpen, setIsGoNoFurtherOpen] = useState(false);
  const [isAreYouSeriousOpen, setIsAreYouSeriousOpen] = useState(false);
  const [isUghFineOpen, setIsUghFineOpen] = useState(false);
  const [isPetMonitorOpen, setIsPetMonitorOpen] = useState(false);

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
      // Add handlers for other icons here when needed
    }
  };

  // Handle refresh desktop - reset all folder positions with flicker animation
  const handleRefreshDesktop = useCallback(() => {
    // Trigger flicker animation
    setIsRefreshing(true);

    // Reset all icon positions to their initial positions and hide hidden files
    setTimeout(() => {
      setIconPositions(
        DESKTOP_ICONS.reduce((acc, icon) => {
          acc[icon.id] = { ...icon.initialPosition };
          return acc;
        }, {} as Record<string, { x: number; y: number }>)
      );
      setShowHiddenFiles(false);
    }, 100);

    // End the flicker animation after a short delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 300);
  }, []);

  // Handle show hidden files toggle
  const handleShowHiddenFiles = useCallback(() => {
    setShowHiddenFiles(prev => !prev);
  }, []);

  // Handle wallpaper toggle - cycles through 3 options
  const handleToggleWallpaper = useCallback(() => {
    setCurrentWallpaper(prev => ((prev + 1) % 3) as WallpaperType);
  }, []);

  // Wallpaper names for menu display
  const wallpaperNames = ["Default", "NEC Formica Division", "New Eden Committee"];

  // View menu items - defined here to access the refresh handler
  const viewMenuItems: MenuItemData[] = [
    { label: "Refresh Desktop", onClick: handleRefreshDesktop },
    { label: showHiddenFiles ? "Hide Hidden Files" : "Show Hidden Files", onClick: handleShowHiddenFiles },
    { label: `Toggle Wallpaper (${wallpaperNames[currentWallpaper]})`, onClick: handleToggleWallpaper },
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
          <div className="wallpaper-formica absolute inset-0 -z-10">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* NEC FORMICA DIVISION styled like Microsoft Windows Premiere Edition */}
              <div className="text-center">
                <div className="text-[72px] font-bold tracking-[0.15em] text-[#d4c8a0] drop-shadow-[2px_2px_0px_#3d2914]" style={{ fontFamily: 'Arial Black, sans-serif' }}>
                  NEC F
                  <span className="relative inline-block">
                    <svg className="inline-block w-[60px] h-[60px] align-middle -mt-2" viewBox="0 0 60 60">
                      {/* Stylized O with earth-like stripes */}
                      <circle cx="30" cy="30" r="25" fill="none" stroke="#d4c8a0" strokeWidth="6" />
                      <ellipse cx="30" cy="30" rx="18" ry="8" fill="none" stroke="#d4c8a0" strokeWidth="2" transform="rotate(-20 30 30)" />
                      <ellipse cx="30" cy="30" rx="18" ry="8" fill="none" stroke="#d4c8a0" strokeWidth="2" transform="rotate(20 30 30)" />
                    </svg>
                  </span>
                  RMICA
                </div>
                <div className="text-[28px] tracking-[0.3em] text-[#d4c8a0] mt-4 drop-shadow-[1px_1px_0px_#3d2914]" style={{ fontFamily: 'Arial, sans-serif' }}>
                  DIVISION
                </div>
                <div className="mt-12 text-[12px] text-[#a09080] tracking-wide">
                  Copyright © NEC Corporation, 2089. All Rights Reserved.
                </div>
                <div className="text-[11px] text-[#a09080] tracking-wide">
                  NEC is a registered trademark of New Eden Committee Corp.
                </div>
              </div>
            </div>
          </div>
        )}
        {currentWallpaper === 2 && (
          <div className="wallpaper-eden absolute inset-0 -z-10">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* NED EDEN COMMITTEE with large earth logo */}
              <div className="text-center">
                {/* Large Smiling Earth */}
                <svg className="mx-auto mb-6" width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Earth circle */}
                  <circle cx="90" cy="90" r="80" fill="#4A90D9" stroke="#2E5A88" strokeWidth="4" />
                  {/* Continents/land masses */}
                  <ellipse cx="60" cy="60" rx="24" ry="32" fill="#5CB85C" />
                  <ellipse cx="115" cy="75" rx="32" ry="24" fill="#5CB85C" />
                  <ellipse cx="75" cy="125" rx="24" ry="16" fill="#5CB85C" />
                  {/* Smiley face */}
                  <circle cx="68" cy="75" r="10" fill="#333" /> {/* Left eye */}
                  <circle cx="112" cy="75" r="10" fill="#333" /> {/* Right eye */}
                  <path d="M60 105 Q90 140 120 105" stroke="#333" strokeWidth="8" fill="none" strokeLinecap="round" />
                </svg>
                <div className="text-[56px] font-bold tracking-[0.1em] text-[#39ff14] drop-shadow-[0_0_10px_#39ff14] drop-shadow-[2px_2px_0px_#1a4d0a]" style={{ fontFamily: 'Arial Black, sans-serif' }}>
                  NEW EDEN
                </div>
                <div className="text-[32px] tracking-[0.4em] text-[#39ff14] mt-2 drop-shadow-[0_0_8px_#39ff14] drop-shadow-[1px_1px_0px_#1a4d0a]" style={{ fontFamily: 'Arial, sans-serif' }}>
                  COMMITTEE
                </div>
                <div className="mt-10 text-[12px] text-[#7dff7d] tracking-wide opacity-80">
                  Cultivating Tomorrow, Today™
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CRT Screen Effect Overlay - applies to all wallpapers */}
        <div className="crt-overlay fixed inset-0 pointer-events-none z-[100]" />

        {/* Desktop Icons - each independently draggable */}
        {DESKTOP_ICONS.map((iconConfig) => (
          <div
            key={iconConfig.id}
            className={`absolute select-none ${draggingIcon === iconConfig.id ? 'cursor-grabbing z-50' : 'cursor-grab'}`}
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
            className="absolute select-none cursor-pointer"
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
        {isColonyReportsOpen && (
          <ColonyReports onClose={() => setIsColonyReportsOpen(false)} />
        )}
        {isSecretsFolderOpen && (
          <SecretsFolder
            onClose={() => setIsSecretsFolderOpen(false)}
            onOpenNothing={() => setIsNothingOpen(true)}
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
            onClose={() => setIsUghFineOpen(false)}
            onOpenChild={() => setIsPetMonitorOpen(true)}
            position={{ top: "30vh", left: "52vw" }}
          />
        )}

        {/* Secret Pet Monitor - final destination */}
        {isPetMonitorOpen && (
          <SecretPetMonitor onClose={() => {
            // Close pet monitor and all nested folders, but keep .secrets open
            setIsPetMonitorOpen(false);
            setIsUghFineOpen(false);
            setIsAreYouSeriousOpen(false);
            setIsGoNoFurtherOpen(false);
            setIsPleaseStopOpen(false);
            setIsSeriouslyNothingOpen(false);
            setIsNothingOpen(false);
          }} />
        )}
      </main>

      <Taskbar>
        {isColonyReportsOpen && (
          <TaskbarButton
            title="COLONY REPORTS"
            isActive={!isSecretsFolderOpen && !isPetMonitorOpen}
            onClick={() => setIsColonyReportsOpen(true)}
          />
        )}
        {isSecretsFolderOpen && (
          <TaskbarButton
            title=".secrets"
            isActive={!isPetMonitorOpen}
            onClick={() => setIsSecretsFolderOpen(true)}
          />
        )}
        {isPetMonitorOpen && (
          <TaskbarButton
            title="secret_pet_monitor"
            isActive={true}
            onClick={() => setIsPetMonitorOpen(true)}
          />
        )}
      </Taskbar>
    </>
  );
}
