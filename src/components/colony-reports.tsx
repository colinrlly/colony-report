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
  { id: "bee", icon: "bee" as const, label: "Bee Studies", statusText: "Tracker Placed on Hive Mother // Coordinates relayed to base every 03:00 hours" },
  { id: "snail", icon: "snail" as const, label: "Snail Research", statusText: "OW-FDA Control Unit // Hallucinations Reported // notes: will need to test again.. for science" },
  { id: "ladybug", icon: "ladybug" as const, label: "Ladybug Analysis", statusText: "Still Awaiting Ethics Review // Not Approved for Public Release" },
  { id: "hand", icon: "hand" as const, label: "Hand Studies", statusText: "Awaiting HR Assessment // Unstable Limb Proliferation" },
  { id: "apricot", icon: "apricot" as const, label: "Apricot Data", statusText: "How-To Guide // Local Food Documentation // FDAA approval pending" },
  { id: "cactus", icon: "cactus" as const, label: "Cactus Observations", statusText: "Botanical Observation // Specimen Discovery // additional notes: Toby reported numbness at injection site for 7 days after" },
  { id: "dandelion", icon: "dandelion" as const, label: "Dandelion Records", statusText: "Botanical Observation // Specimen Response // additional notes: please watch your step, they are getting angry" },
  { id: "frog", icon: "frog" as const, label: "Frog Documentation", statusText: "Level 4 containment initiated // Intern recovered alive // notes: cancel human autopsy request" },
];

interface ColonyReportsProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

export function ColonyReports({ onClose, onMinimize }: ColonyReportsProps) {
  const [selectedId, setSelectedId] = useState("bee");

  const selectedItem = navItems.find((item) => item.id === selectedId);
  const statusText = selectedItem?.statusText ?? "";

  return (
    <Window resizable={false} className="aspect-[11/8.5] max-w-[100vw] w-auto h-[calc(100vh-76px)] absolute top-[36px] left-1/2 -translate-x-1/2 flex flex-col">
      <WindowTitleBar>
        <WindowTitle>COLONY REPORTS</WindowTitle>
        <WindowControls showMaximize={false} onMinimize={onMinimize} onClose={onClose} />
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
          File Notes
        </WindowStatusField>
        <WindowStatusField className="text-right">
          {statusText}
        </WindowStatusField>
      </WindowStatusBar>
    </Window>
  );
}
