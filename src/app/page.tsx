"use client";

import { useState } from "react";
import { ColonyReports } from "@/components/colony-reports";
import { DesktopIcon } from "@/components/ui/desktop-icon";
import { Taskbar, TaskbarButton } from "@/components/ui/taskbar";
import { Menubar, MenubarItem, MenubarLogo } from "@/components/ui/menubar";

export default function Home() {
  const [isColonyReportsOpen, setIsColonyReportsOpen] = useState(false);

  return (
    <>
      <Menubar>
        <MenubarLogo />
        <MenubarItem label="View" />
        <MenubarItem label="Tools" />
        <MenubarItem label="History" />
        <MenubarItem label="Help" />
      </Menubar>

      <main className="min-h-screen relative p-4 pt-[38px] pb-[50px]">
        {/* Desktop Icons */}
        <div className="absolute top-[45px] left-6 flex flex-col gap-1">
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
