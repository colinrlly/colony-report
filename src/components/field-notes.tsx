"use client";

import { useState, useCallback } from "react";
import {
  Window,
  WindowTitleBar,
  WindowTitle,
  WindowControls,
  WindowStatusBar,
  WindowStatusField,
} from "@/components/ui/window";

// Desktop icons boundary for window snap
const ICON_COLUMN_RIGHT_EDGE = 132;

// Field note item type - ready for future image support
interface FieldNoteItem {
  id: string;
  label: string;
  image?: string;
  color: string; // Placeholder color until images are added
}

// Field notes data - replace color with actual images when available
const fieldNoteItems: FieldNoteItem[] = [
  { id: "note-1", label: "note.1", color: "#8B7355" },
  { id: "note-2", label: "note.2", color: "#A67B5B" },
  { id: "note-3", label: "note.3", color: "#6B8E6B" },
  { id: "note-4", label: "note.4", color: "#C4A77D" },
  { id: "note-5", label: "note.5", color: "#8B4513" },
  { id: "note-6", label: "note.6", color: "#9C8B7D" },
  { id: "note-7", label: "note.7", color: "#704214" },
  { id: "note-8", label: "note.8", color: "#B8A088" },
  { id: "note-9", label: "note.9", color: "#5C4033" },
  { id: "note-10", label: "note.10", color: "#7B9971" },
];

function NotebookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" shapeRendering="crispEdges">
      <rect x="4" y="2" width="16" height="20" fill="#D4C088" stroke="#a08850" strokeWidth="1" />
      <rect x="6" y="4" width="2" height="2" fill="#1a1a1a" />
      <rect x="6" y="8" width="2" height="2" fill="#1a1a1a" />
      <rect x="6" y="12" width="2" height="2" fill="#1a1a1a" />
      <rect x="6" y="16" width="2" height="2" fill="#1a1a1a" />
      <rect x="10" y="6" width="8" height="1" fill="#8B7355" />
      <rect x="10" y="10" width="8" height="1" fill="#8B7355" />
      <rect x="10" y="14" width="8" height="1" fill="#8B7355" />
      <rect x="10" y="18" width="6" height="1" fill="#8B7355" />
    </svg>
  );
}

function LeftArrowIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" shapeRendering="crispEdges">
      {/* Outline */}
      <rect x="28" y="4" width="4" height="4" fill="#1a1a1a" />
      <rect x="24" y="8" width="4" height="4" fill="#1a1a1a" />
      <rect x="20" y="12" width="4" height="4" fill="#1a1a1a" />
      <rect x="16" y="16" width="4" height="4" fill="#1a1a1a" />
      <rect x="12" y="20" width="4" height="8" fill="#1a1a1a" />
      <rect x="16" y="28" width="4" height="4" fill="#1a1a1a" />
      <rect x="20" y="32" width="4" height="4" fill="#1a1a1a" />
      <rect x="24" y="36" width="4" height="4" fill="#1a1a1a" />
      <rect x="28" y="40" width="4" height="4" fill="#1a1a1a" />
      <rect x="32" y="8" width="3" height="32" fill="#1a1a1a" />
      <rect x="28" y="6" width="4" height="2" fill="#1a1a1a" />
      <rect x="28" y="40" width="4" height="2" fill="#1a1a1a" />
      {/* Fill */}
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
      {/* Outline */}
      <rect x="16" y="4" width="4" height="4" fill="#1a1a1a" />
      <rect x="20" y="8" width="4" height="4" fill="#1a1a1a" />
      <rect x="24" y="12" width="4" height="4" fill="#1a1a1a" />
      <rect x="28" y="16" width="4" height="4" fill="#1a1a1a" />
      <rect x="32" y="20" width="4" height="8" fill="#1a1a1a" />
      <rect x="28" y="28" width="4" height="4" fill="#1a1a1a" />
      <rect x="24" y="32" width="4" height="4" fill="#1a1a1a" />
      <rect x="20" y="36" width="4" height="4" fill="#1a1a1a" />
      <rect x="16" y="40" width="4" height="4" fill="#1a1a1a" />
      <rect x="13" y="8" width="3" height="32" fill="#1a1a1a" />
      <rect x="16" y="6" width="4" height="2" fill="#1a1a1a" />
      <rect x="16" y="40" width="4" height="2" fill="#1a1a1a" />
      {/* Fill */}
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

  const handlePreviousNote = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? fieldNoteItems.length - 1 : prev - 1));
  }, []);

  const handleNextNote = useCallback(() => {
    setSelectedIndex((prev) => (prev === fieldNoteItems.length - 1 ? 0 : prev + 1));
  }, []);

  return (
    <Window
      resizable={false}
      leftSnapBoundary={ICON_COLUMN_RIGHT_EDGE}
      className="z-20 w-[1150px] h-[750px] absolute top-[6vh] left-[calc(50%+48px)] -translate-x-1/2 flex flex-col"
    >
      <WindowTitleBar className="h-[36px]">
        <div className="flex items-center gap-2">
          <NotebookIcon />
          <WindowTitle className="font-bold text-[13px] tracking-wide">
            SCANNED IN FIELD NOTES - FORMICA DIVISION
          </WindowTitle>
        </div>
        <WindowControls showMaximize={false} onMinimize={onMinimize} onClose={onClose} />
      </WindowTitleBar>

      <div className="h-[6px] bg-[#2a2a2a]">
        <div className="h-full w-full bg-[#5a9c5a]" />
      </div>

      <div className="flex-1 bg-[#c8b9a9] flex items-center justify-between px-4">
        <button
          onClick={handlePreviousNote}
          className="flex-shrink-0 hover:scale-110 transition-transform cursor-pointer"
          aria-label="Previous note"
        >
          <LeftArrowIcon />
        </button>

        <div
          className="flex-1 mx-4 h-[calc(100%-40px)] win98-border-sunken flex items-center justify-center"
          style={{ backgroundColor: selectedNote.color }}
        >
          {/* TODO: Replace with Image component when images are added */}
          <div className="text-[#e8dcc0] text-2xl font-bold text-center">
            image goes here
          </div>
        </div>

        <button
          onClick={handleNextNote}
          className="flex-shrink-0 hover:scale-110 transition-transform cursor-pointer"
          aria-label="Next note"
        >
          <RightArrowIcon />
        </button>
      </div>

      <WindowStatusBar>
        <WindowStatusField className="flex-1 text-right pr-2">
          Field notes to be processed into colony reports at a later time
        </WindowStatusField>
      </WindowStatusBar>
    </Window>
  );
}
