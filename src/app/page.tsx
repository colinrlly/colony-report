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
        <div className="absolute top-[40px] left-4 flex flex-col gap-2">
          <DesktopIcon
            label="Colony Reports"
            color="#8b7355"
            onClick={() => setIsColonyReportsOpen(true)}
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
