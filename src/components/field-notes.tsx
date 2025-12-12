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

// Sample field notes data with placeholder earth tone colors
const fieldNoteItems = [
  { id: "note-1", label: "note.1", color: "#8B7355" },   // Coffee brown
  { id: "note-2", label: "note.2", color: "#A67B5B" },   // Camel
  { id: "note-3", label: "note.3", color: "#6B8E6B" },   // Sage green
  { id: "note-4", label: "note.4", color: "#C4A77D" },   // Tan
  { id: "note-5", label: "note.5", color: "#8B4513" },   // Saddle brown
  { id: "note-6", label: "note.6", color: "#9C8B7D" },   // Warm grey
  { id: "note-7", label: "note.7", color: "#704214" },   // Sepia
  { id: "note-8", label: "note.8", color: "#B8A088" },   // Khaki
  { id: "note-9", label: "note.9", color: "#5C4033" },   // Dark brown
  { id: "note-10", label: "note.10", color: "#7B9971" }, // Moss green
];

// Notebook icon for title bar - lighter yellow tones
function NotebookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" shapeRendering="crispEdges">
      {/* Notebook cover - lighter yellow/tan */}
      <rect x="4" y="2" width="16" height="20" fill="#D4C088" stroke="#a08850" strokeWidth="1" />
      {/* Spiral binding */}
      <rect x="6" y="4" width="2" height="2" fill="#1a1a1a" />
      <rect x="6" y="8" width="2" height="2" fill="#1a1a1a" />
      <rect x="6" y="12" width="2" height="2" fill="#1a1a1a" />
      <rect x="6" y="16" width="2" height="2" fill="#1a1a1a" />
      {/* Page lines */}
      <rect x="10" y="6" width="8" height="1" fill="#8B7355" />
      <rect x="10" y="10" width="8" height="1" fill="#8B7355" />
      <rect x="10" y="14" width="8" height="1" fill="#8B7355" />
      <rect x="10" y="18" width="6" height="1" fill="#8B7355" />
    </svg>
  );
}

// Large pixel art arrow icons for navigation
function LeftArrowIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" shapeRendering="crispEdges">
      {/* Black outline - left/point side */}
      <rect x="28" y="4" width="4" height="4" fill="#1a1a1a" />
      <rect x="24" y="8" width="4" height="4" fill="#1a1a1a" />
      <rect x="20" y="12" width="4" height="4" fill="#1a1a1a" />
      <rect x="16" y="16" width="4" height="4" fill="#1a1a1a" />
      <rect x="12" y="20" width="4" height="8" fill="#1a1a1a" />
      <rect x="16" y="28" width="4" height="4" fill="#1a1a1a" />
      <rect x="20" y="32" width="4" height="4" fill="#1a1a1a" />
      <rect x="24" y="36" width="4" height="4" fill="#1a1a1a" />
      <rect x="28" y="40" width="4" height="4" fill="#1a1a1a" />
      {/* Black outline - right/back side (thin) */}
      <rect x="32" y="8" width="2" height="32" fill="#1a1a1a" />
      {/* Black outline - top and bottom edges */}
      <rect x="28" y="6" width="4" height="2" fill="#1a1a1a" />
      <rect x="28" y="40" width="4" height="2" fill="#1a1a1a" />
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
      {/* Black outline - right/point side */}
      <rect x="16" y="4" width="4" height="4" fill="#1a1a1a" />
      <rect x="20" y="8" width="4" height="4" fill="#1a1a1a" />
      <rect x="24" y="12" width="4" height="4" fill="#1a1a1a" />
      <rect x="28" y="16" width="4" height="4" fill="#1a1a1a" />
      <rect x="32" y="20" width="4" height="8" fill="#1a1a1a" />
      <rect x="28" y="28" width="4" height="4" fill="#1a1a1a" />
      <rect x="24" y="32" width="4" height="4" fill="#1a1a1a" />
      <rect x="20" y="36" width="4" height="4" fill="#1a1a1a" />
      <rect x="16" y="40" width="4" height="4" fill="#1a1a1a" />
      {/* Black outline - left/back side (thin) */}
      <rect x="14" y="8" width="2" height="32" fill="#1a1a1a" />
      {/* Black outline - top and bottom edges */}
      <rect x="16" y="6" width="4" height="2" fill="#1a1a1a" />
      <rect x="16" y="40" width="4" height="2" fill="#1a1a1a" />
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
      className="z-20 w-[1150px] h-[750px] absolute top-[6vh] left-[calc(50%+48px)] -translate-x-1/2 flex flex-col"
    >
      <WindowTitleBar className="h-[36px]">
        <div className="flex items-center gap-2">
          <NotebookIcon />
          <WindowTitle className="font-bold text-[13px] tracking-wide">SCANNED IN FIELD NOTES - FORMICA DIVISION</WindowTitle>
        </div>
        <WindowControls showMaximize={false} onMinimize={onMinimize} onClose={onClose} />
      </WindowTitleBar>

      {/* Green progress bar under title bar */}
      <div className="h-[6px] bg-[#2a2a2a]">
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
        <WindowStatusField className="flex-1 text-right pr-2">
          Field notes to be processed into colony reports at a later time
        </WindowStatusField>
      </WindowStatusBar>
    </Window>
  );
}
