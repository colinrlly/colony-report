"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ColonyReports } from "@/components/colony-reports";
import { SecretsFolder } from "@/components/secrets-folder";
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

export default function Home() {
  const [isColonyReportsOpen, setIsColonyReportsOpen] = useState(false);
  const [isSecretsFolderOpen, setIsSecretsFolderOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showHiddenFiles, setShowHiddenFiles] = useState(false);

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

  // View menu items - defined here to access the refresh handler
  const viewMenuItems: MenuItemData[] = [
    { label: "Refresh Desktop", onClick: handleRefreshDesktop },
    { label: showHiddenFiles ? "Hide Hidden Files" : "Show Hidden Files", onClick: handleShowHiddenFiles },
    { label: "Toggle Wallpaper" },
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
          <SecretsFolder onClose={() => setIsSecretsFolderOpen(false)} />
        )}
      </main>

      <Taskbar>
        {isColonyReportsOpen && (
          <TaskbarButton
            title="COLONY REPORTS"
            isActive={!isSecretsFolderOpen}
            onClick={() => setIsColonyReportsOpen(true)}
          />
        )}
        {isSecretsFolderOpen && (
          <TaskbarButton
            title=".secrets"
            isActive={true}
            onClick={() => setIsSecretsFolderOpen(true)}
          />
        )}
      </Taskbar>
    </>
  );
}
