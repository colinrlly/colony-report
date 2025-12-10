"use client";

import { useState, useRef } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { ColonyReports } from "@/components/colony-reports";
import { DesktopIcon } from "@/components/ui/desktop-icon";
import { Taskbar, TaskbarButton } from "@/components/ui/taskbar";
import { Menubar, MenubarItem, MenubarLogo, MenubarProfile } from "@/components/ui/menubar";

type IconType = "folder" | "notebook" | "badge" | "camera" | "video-camera";

interface DesktopIconConfig {
  id: string;
  label: string;
  icon: IconType;
  initialPosition: { x: number; y: number };
}

// Define the desktop icons with their initial positions
const DESKTOP_ICONS: DesktopIconConfig[] = [
  { id: "colony-reports", label: "Colony Reports", icon: "folder", initialPosition: { x: 24, y: 53 } },
  { id: "field-notes", label: "Field Notes", icon: "notebook", initialPosition: { x: 24, y: 163 } },
  { id: "employee-files", label: "Employee Files", icon: "badge", initialPosition: { x: 24, y: 273 } },
  { id: "photo-library", label: "Photo Library", icon: "camera", initialPosition: { x: 24, y: 383 } },
  { id: "video-logs", label: "Video Logs", icon: "video-camera", initialPosition: { x: 24, y: 493 } },
];

export default function Home() {
  const [isColonyReportsOpen, setIsColonyReportsOpen] = useState(false);

  // Track positions for each icon - initialized to their starting positions
  const [iconPositions, setIconPositions] = useState<Record<string, { x: number; y: number }>>(
    () => DESKTOP_ICONS.reduce((acc, icon) => {
      acc[icon.id] = { ...icon.initialPosition };
      return acc;
    }, {} as Record<string, { x: number; y: number }>)
  );

  // Refs for each draggable icon (required by react-draggable)
  const iconRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleDrag = (iconId: string) => (_e: DraggableEvent, data: DraggableData) => {
    setIconPositions(prev => ({
      ...prev,
      [iconId]: { x: data.x, y: data.y }
    }));
  };

  const handleIconClick = (iconId: string) => {
    switch (iconId) {
      case "colony-reports":
        setIsColonyReportsOpen(true);
        break;
      // Add handlers for other icons here when needed
    }
  };

  return (
    <>
      <Menubar>
        <MenubarLogo />
        <MenubarItem label="View" />
        <MenubarItem label="Tools" />
        <MenubarItem label="History" />
        <MenubarItem label="Help" />
        <MenubarProfile />
      </Menubar>

      <main className="min-h-screen relative p-4 pt-[46px] pb-[50px]">
        {/* Desktop Icons - each independently draggable */}
        {DESKTOP_ICONS.map((iconConfig) => (
          <Draggable
            key={iconConfig.id}
            nodeRef={{ current: iconRefs.current[iconConfig.id] }}
            position={iconPositions[iconConfig.id]}
            onDrag={handleDrag(iconConfig.id)}
            bounds="parent"
          >
            <div
              ref={(el) => { iconRefs.current[iconConfig.id] = el; }}
              className="absolute cursor-grab active:cursor-grabbing"
              style={{ left: 0, top: 0 }}
            >
              <DesktopIcon
                label={iconConfig.label}
                icon={iconConfig.icon}
                onClick={() => handleIconClick(iconConfig.id)}
              />
            </div>
          </Draggable>
        ))}

        {/* Windows */}
        {isColonyReportsOpen && (
          <ColonyReports onClose={() => setIsColonyReportsOpen(false)} />
        )}
      </main>

      <Taskbar>
        {isColonyReportsOpen && (
          <TaskbarButton
            title="COLONY REPORTS"
            isActive={true}
            onClick={() => setIsColonyReportsOpen(true)}
          />
        )}
      </Taskbar>
    </>
  );
}
