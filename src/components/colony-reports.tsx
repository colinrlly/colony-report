"use client";

import { useState } from "react";
import {
  Window,
  WindowTitleBar,
  WindowTitle,
  WindowControls,
  WindowStatusBar,
  WindowStatusField,
} from "@/components/ui/window";
import { SidebarNav } from "@/components/ui/sidebar-nav";
import { ReportContent } from "@/components/ui/report-content";

const navItems = [
  { id: "bee", icon: "bee" as const, label: "Bee Studies" },
  { id: "snail", icon: "snail" as const, label: "Snail Research" },
  { id: "ladybug", icon: "ladybug" as const, label: "Ladybug Analysis" },
  { id: "hand", icon: "hand" as const, label: "Hand Studies" },
  { id: "apricot", icon: "apricot" as const, label: "Apricot Data" },
  { id: "cactus", icon: "cactus" as const, label: "Cactus Observations" },
  { id: "dandelion", icon: "dandelion" as const, label: "Dandelion Records" },
  { id: "frog", icon: "frog" as const, label: "Frog Documentation" },
];

interface ColonyReportsProps {
  onClose?: () => void;
}

export function ColonyReports({ onClose }: ColonyReportsProps) {
  const [selectedId, setSelectedId] = useState("bee");

  return (
    <Window className="w-[80vw] h-[80vh] absolute top-[10vh] left-[10vw] flex flex-col">
      <WindowTitleBar>
        <WindowTitle>COLONY REPORTS</WindowTitle>
        <WindowControls showMinimize={false} onClose={onClose} />
      </WindowTitleBar>

      <div className="flex flex-1 min-h-0">
        <SidebarNav
          items={navItems}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        <ReportContent selectedId={selectedId} />
      </div>

      <WindowStatusBar>
        <WindowStatusField className="flex-none w-[120px]">
          Colony Report
        </WindowStatusField>
        <WindowStatusField>
          Still Awaiting Ethics Review // Not Approved for Public Release
        </WindowStatusField>
      </WindowStatusBar>
    </Window>
  );
}
