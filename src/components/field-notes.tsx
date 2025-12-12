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

// Sample field notes data with placeholder colors
const fieldNoteItems = [
  { id: "note-1", label: "note.1", color: "#6B5B4F" },
  { id: "note-2", label: "note.2", color: "#7A6A5E" },
  { id: "note-3", label: "note.3", color: "#5D4D41" },
  { id: "note-4", label: "note.4", color: "#8B7B6F" },
  { id: "note-5", label: "note.5", color: "#6B5B4F" },
];

// Notebook icon for title bar
function NotebookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" shapeRendering="crispEdges">
      {/* Notebook cover */}
      <rect x="4" y="2" width="16" height="20" fill="#8B7355" stroke="#5a4a3a" strokeWidth="1" />
      {/* Spiral binding */}
      <rect x="6" y="4" width="2" height="2" fill="#1a1a1a" />
      <rect x="6" y="8" width="2" height="2" fill="#1a1a1a" />
      <rect x="6" y="12" width="2" height="2" fill="#1a1a1a" />
      <rect x="6" y="16" width="2" height="2" fill="#1a1a1a" />
      {/* Page lines */}
      <rect x="10" y="6" width="8" height="1" fill="#d4c8a0" />
      <rect x="10" y="10" width="8" height="1" fill="#d4c8a0" />
      <rect x="10" y="14" width="8" height="1" fill="#d4c8a0" />
      <rect x="10" y="18" width="6" height="1" fill="#d4c8a0" />
    </svg>
  );
}

// Large pixel art arrow icons for navigation
function LeftArrowIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" shapeRendering="crispEdges">
      {/* Black outline */}
      <rect x="28" y="4" width="4" height="4" fill="#1a1a1a" />
      <rect x="24" y="8" width="4" height="4" fill="#1a1a1a" />
      <rect x="20" y="12" width="4" height="4" fill="#1a1a1a" />
      <rect x="16" y="16" width="4" height="4" fill="#1a1a1a" />
      <rect x="12" y="20" width="4" height="8" fill="#1a1a1a" />
      <rect x="16" y="28" width="4" height="4" fill="#1a1a1a" />
      <rect x="20" y="32" width="4" height="4" fill="#1a1a1a" />
      <rect x="24" y="36" width="4" height="4" fill="#1a1a1a" />
      <rect x="28" y="40" width="4" height="4" fill="#1a1a1a" />
      {/* Green fill */}
      <rect x="28" y="8" width="4" height="4" fill="#5a9c5a" />
      <rect x="24" y="12" width="8" height="4" fill="#5a9c5a" />
      <rect x="20" y="16" width="12" height="4" fill="#5a9c5a" />
      <rect x="16" y="20" width="16" height="8" fill="#5a9c5a" />
      <rect x="20" y="28" width="12" height="4" fill="#5a9c5a" />
      <rect x="24" y="32" width="8" height="4" fill="#5a9c5a" />
      <rect x="28" y="36" width="4" height="4" fill="#5a9c5a" />
    </svg>
  );
}

function RightArrowIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" shapeRendering="crispEdges">
      {/* Black outline */}
      <rect x="16" y="4" width="4" height="4" fill="#1a1a1a" />
      <rect x="20" y="8" width="4" height="4" fill="#1a1a1a" />
      <rect x="24" y="12" width="4" height="4" fill="#1a1a1a" />
      <rect x="28" y="16" width="4" height="4" fill="#1a1a1a" />
      <rect x="32" y="20" width="4" height="8" fill="#1a1a1a" />
      <rect x="28" y="28" width="4" height="4" fill="#1a1a1a" />
      <rect x="24" y="32" width="4" height="4" fill="#1a1a1a" />
      <rect x="20" y="36" width="4" height="4" fill="#1a1a1a" />
      <rect x="16" y="40" width="4" height="4" fill="#1a1a1a" />
      {/* Green fill */}
      <rect x="16" y="8" width="4" height="4" fill="#5a9c5a" />
      <rect x="16" y="12" width="8" height="4" fill="#5a9c5a" />
      <rect x="16" y="16" width="12" height="4" fill="#5a9c5a" />
      <rect x="16" y="20" width="16" height="8" fill="#5a9c5a" />
      <rect x="16" y="28" width="12" height="4" fill="#5a9c5a" />
      <rect x="16" y="32" width="8" height="4" fill="#5a9c5a" />
      <rect x="16" y="36" width="4" height="4" fill="#5a9c5a" />
    </svg>
  );
}

interface FieldNotesProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

export function FieldNotes({ onClose, onMinimize }: FieldNotesProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedNote = fieldNoteItems[selectedIndex];

  // Navigate to previous note
  const handlePreviousNote = () => {
    setSelectedIndex(selectedIndex === 0 ? fieldNoteItems.length - 1 : selectedIndex - 1);
  };

  // Navigate to next note
  const handleNextNote = () => {
    setSelectedIndex(selectedIndex === fieldNoteItems.length - 1 ? 0 : selectedIndex + 1);
  };

  // Desktop icons are at x=24 with ~100px width, so snap boundary is at 132px
  const ICON_COLUMN_RIGHT_EDGE = 132;

  return (
    <Window
      resizable={false}
      leftSnapBoundary={ICON_COLUMN_RIGHT_EDGE}
      className="z-20 w-[800px] h-[650px] absolute top-[6vh] left-1/2 -translate-x-1/2 flex flex-col"
    >
      <WindowTitleBar>
        <div className="flex items-center gap-2">
          <NotebookIcon />
          <WindowTitle>Scanned in field notes - Formica Division</WindowTitle>
        </div>
        <WindowControls showMaximize={false} onMinimize={onMinimize} onClose={onClose} />
      </WindowTitleBar>

      {/* Green progress bar under title bar */}
      <div className="h-[6px] bg-[#2a2a2a] mx-[2px]">
        <div className="h-full w-full bg-[#5a9c5a]" />
      </div>

      {/* Main content area with tan background */}
      <div className="flex-1 bg-[#c8b9a9] flex items-center justify-between px-4">
        {/* Left arrow button */}
        <button
          onClick={handlePreviousNote}
          className="flex-shrink-0 hover:scale-110 transition-transform cursor-pointer"
          aria-label="Previous note"
        >
          <LeftArrowIcon />
        </button>

        {/* Main image display area */}
        <div
          className="flex-1 mx-4 h-[calc(100%-40px)] win98-border-sunken flex items-center justify-center"
          style={{ backgroundColor: selectedNote.color }}
        >
          <div className="text-[#e8dcc0] text-2xl font-bold text-center">
            image goes here
          </div>
        </div>

        {/* Right arrow button */}
        <button
          onClick={handleNextNote}
          className="flex-shrink-0 hover:scale-110 transition-transform cursor-pointer"
          aria-label="Next note"
        >
          <RightArrowIcon />
        </button>
      </div>

      {/* Status bar at bottom */}
      <WindowStatusBar>
        <WindowStatusField className="flex-1 text-center">
          <span className="font-bold text-[#8b7355]">notes</span>
          <span className="ml-2">to be processed for Colony Reports at a later time</span>
        </WindowStatusField>
      </WindowStatusBar>
    </Window>
  );
}
