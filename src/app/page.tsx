"use client";

import { useState } from "react";
import { ColonyReports } from "@/components/colony-reports";
import { DesktopIcon } from "@/components/ui/desktop-icon";
import { Taskbar, TaskbarButton } from "@/components/ui/taskbar";
import { Menubar, MenubarItem, MenubarLogo, MenubarProfile, MenuItemData } from "@/components/ui/menubar";

const viewMenuItems: MenuItemData[] = [
  { label: "Refresh Desktop" },
  { label: "Show Hidden Files" },
  { label: "Change Wallpaper" },
];

const toolsMenuItems: MenuItemData[] = [
  {
    label: "Games",
    submenu: [
      { label: "Mine Sweeper" },
    ],
  },
  { label: "Security Cams" },
  { label: "Plant Monitor" },
];

const helpMenuItems: MenuItemData[] = [
  { label: "Tutorial" },
  { label: "Contact HR" },
];

const historyMenuItems: MenuItemData[] = [
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

export default function Home() {
  const [isColonyReportsOpen, setIsColonyReportsOpen] = useState(false);

  return (
    <>
      <Menubar>
        <MenubarLogo />
        <MenubarItem label="View" menuItems={viewMenuItems} />
        <MenubarItem label="Tools" menuItems={toolsMenuItems} />
        <MenubarItem label="History" menuItems={historyMenuItems} />
        <MenubarItem label="Help" menuItems={helpMenuItems} />
        <MenubarProfile />
      </Menubar>

      <main className="min-h-screen relative p-4 pt-[46px] pb-[50px]">
        {/* Desktop Icons */}
        <div className="absolute top-[53px] left-6 flex flex-col gap-1">
          <DesktopIcon
            label="Colony Reports"
            icon="folder"
            onClick={() => setIsColonyReportsOpen(true)}
          />
          <DesktopIcon
            label="Field Notes"
            icon="notebook"
            onClick={() => {}}
          />
          <DesktopIcon
            label="Employee Files"
            icon="badge"
            onClick={() => {}}
          />
          <DesktopIcon
            label="Photo Library"
            icon="camera"
            onClick={() => {}}
          />
          <DesktopIcon
            label="Video Logs"
            icon="video-camera"
            onClick={() => {}}
          />
        </div>

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
