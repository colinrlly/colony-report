"use client";

import { useState, useEffect, useCallback } from "react";

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" shapeRendering="crispEdges">
      {/* Circle */}
      <rect x="4" y="0" width="6" height="1" fill="currentColor" />
      <rect x="2" y="1" width="2" height="1" fill="currentColor" />
      <rect x="10" y="1" width="2" height="1" fill="currentColor" />
      <rect x="1" y="2" width="1" height="2" fill="currentColor" />
      <rect x="12" y="2" width="1" height="2" fill="currentColor" />
      <rect x="0" y="4" width="1" height="6" fill="currentColor" />
      <rect x="13" y="4" width="1" height="6" fill="currentColor" />
      <rect x="1" y="10" width="1" height="2" fill="currentColor" />
      <rect x="12" y="10" width="1" height="2" fill="currentColor" />
      <rect x="2" y="12" width="2" height="1" fill="currentColor" />
      <rect x="10" y="12" width="2" height="1" fill="currentColor" />
      <rect x="4" y="13" width="6" height="1" fill="currentColor" />
      {/* Dot */}
      <rect x="6" y="3" width="2" height="2" fill="currentColor" />
      {/* Stem */}
      <rect x="6" y="6" width="2" height="5" fill="currentColor" />
    </svg>
  );
}
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
  { id: "snail", icon: "snail" as const, label: "Snail Research", statusText: "OW-FDA Control Unit // Hallucinations Reported • Notes: will need to test again.. for science" },
  { id: "ladybug", icon: "ladybug" as const, label: "Ladybug Analysis", statusText: "Still Awaiting Ethics Review // Not Approved for Public Release" },
  { id: "hand", icon: "hand" as const, label: "Hand Studies", statusText: "Awaiting HR Assessment // Unstable Limb Proliferation" },
  { id: "apricot", icon: "apricot" as const, label: "Apricot Data", statusText: "How-To Guide // Local Food Documentation // FDAA approval pending" },
  { id: "cactus", icon: "cactus" as const, label: "Cactus Observations", statusText: "Botanical Observation // Specimen Discovery • Notes: Toby reported numbness at injection site for 7 days after" },
  { id: "dandelion", icon: "dandelion" as const, label: "Dandelion Records", statusText: "Botanical Observation // Specimen Response • Notes: please watch your step, they are getting angry" },
  { id: "frog", icon: "frog" as const, label: "Frog Documentation", statusText: "Level 4 containment initiated // Intern recovered alive • Notes: cancel human autopsy request" },
  { id: "sandwich", icon: "sandwich" as const, label: "Sandwich Files", statusText: "Local Food Documentation // Edible Secretion Study // Success- Classified as Condiment • Notes: Still researching shelf life" },
];

interface ColonyReportsProps {
  onClose?: () => void;
  onMinimize?: () => void;
  zIndex?: number;
  onFocus?: () => void;
}

export function ColonyReports({ onClose, onMinimize, zIndex, onFocus }: ColonyReportsProps) {
  const [selectedId, setSelectedId] = useState("bee");
  const [showInfo, setShowInfo] = useState(false);

  const selectedItem = navItems.find((item) => item.id === selectedId);
  const statusText = selectedItem?.statusText ?? "";

  // Navigation handlers
  const handlePreviousItem = useCallback(() => {
    const currentIndex = navItems.findIndex((item) => item.id === selectedId);
    const newIndex = currentIndex === 0 ? navItems.length - 1 : currentIndex - 1;
    setSelectedId(navItems[newIndex].id);
  }, [selectedId]);

  const handleNextItem = useCallback(() => {
    const currentIndex = navItems.findIndex((item) => item.id === selectedId);
    const newIndex = currentIndex === navItems.length - 1 ? 0 : currentIndex + 1;
    setSelectedId(navItems[newIndex].id);
  }, [selectedId]);

  // Keyboard navigation with arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }

      switch (e.key) {
        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          handlePreviousItem();
          break;
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          handleNextItem();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePreviousItem, handleNextItem]);

  // Desktop icons are at x=24 with ~100px width, so snap boundary is at 132px (124 + 8px margin)
  const ICON_COLUMN_RIGHT_EDGE = 132;

  return (
    <Window resizable={false} leftSnapBoundary={ICON_COLUMN_RIGHT_EDGE} className="aspect-[11/8.5] max-w-[calc(100vw-16px)] w-auto h-[calc(100vh-92px)] absolute top-[44px] left-1/2 -translate-x-1/2 flex flex-col" zIndex={zIndex} onFocus={onFocus}>
      <WindowTitleBar>
        <div className="flex items-center gap-2">
          <WindowTitle>COLONY REPORTS</WindowTitle>
          <div className="relative">
            <button
              onClick={() => setShowInfo(!showInfo)}
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
              className="w-5 h-5 flex items-center justify-center rounded-sm text-[#c8b9a9] hover:text-[#ffdd44] transition-colors"
              aria-label="Colony reports info"
            >
              <InfoIcon />
            </button>
            {showInfo && (
              <div
                className="absolute top-full left-0 mt-1 z-50 win98-border-raised bg-[#c8b9a9] px-3 py-2 text-[11px] text-[#2a2a2a] whitespace-nowrap shadow-md"
                onMouseEnter={() => setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)}
              >
                Reports ready to be sent to corporate
              </div>
            )}
          </div>
        </div>
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
