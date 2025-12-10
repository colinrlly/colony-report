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
  { id: "specimen", color: "#c44", label: "Specimen" },
  { id: "hand", color: "#db9", label: "Hand Studies" },
  { id: "flask", color: "#8bd", label: "Chemical Analysis" },
  { id: "food", color: "#da6", label: "Dietary Observations" },
];

interface ColonyReportsProps {
  onClose?: () => void;
}

export function ColonyReports({ onClose }: ColonyReportsProps) {
  const [selectedId, setSelectedId] = useState("specimen");

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
