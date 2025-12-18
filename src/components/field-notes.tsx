"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  Window,
  WindowTitleBar,
  WindowTitle,
  WindowControls,
  WindowStatusBar,
  WindowStatusField,
} from "@/components/ui/window";

// Layout constants
const ICON_COLUMN_RIGHT_EDGE = 132;
const BACKGROUND_COLOR = "#1b1d19";

// Magnifier configuration
const MAGNIFIER_SIZE = 300;
const ZOOM_LEVEL = 2.5;

const FIELD_NOTES_IMAGES = [
  "/images/Field Notes 1.png",
  "/images/Field Notes 2.png",
];

interface MagnifierPosition {
  x: number;
  y: number;
  imgX: number;
  imgY: number;
  imgWidth: number;
  imgHeight: number;
  visible: boolean;
}

interface FieldNotesProps {
  onClose?: () => void;
  onMinimize?: () => void;
  zIndex?: number;
  onFocus?: () => void;
}

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

function MagnifyingGlassIcon({ active }: { active?: boolean }) {
  const color = active ? "#5a9c5a" : "#1a1a1a";
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" shapeRendering="crispEdges">
      <rect x="6" y="2" width="6" height="2" fill={color} />
      <rect x="4" y="4" width="2" height="2" fill={color} />
      <rect x="12" y="4" width="2" height="2" fill={color} />
      <rect x="2" y="6" width="2" height="6" fill={color} />
      <rect x="14" y="6" width="2" height="6" fill={color} />
      <rect x="4" y="12" width="2" height="2" fill={color} />
      <rect x="12" y="12" width="2" height="2" fill={color} />
      <rect x="6" y="14" width="6" height="2" fill={color} />
      <rect x="12" y="14" width="2" height="2" fill={color} />
      <rect x="14" y="16" width="2" height="2" fill={color} />
      <rect x="16" y="18" width="2" height="2" fill={color} />
    </svg>
  );
}

function NavigationArrow({ direction }: { direction: "left" | "right" }) {
  const isLeft = direction === "left";

  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" shapeRendering="crispEdges">
      {isLeft ? (
        <>
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
          <rect x="28" y="8" width="4" height="4" fill="#5a9c5a" />
          <rect x="24" y="12" width="8" height="4" fill="#5a9c5a" />
          <rect x="20" y="16" width="12" height="4" fill="#5a9c5a" />
          <rect x="16" y="20" width="16" height="8" fill="#5a9c5a" />
          <rect x="20" y="28" width="12" height="4" fill="#5a9c5a" />
          <rect x="24" y="32" width="8" height="4" fill="#5a9c5a" />
          <rect x="28" y="36" width="4" height="4" fill="#5a9c5a" />
        </>
      ) : (
        <>
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
          <rect x="16" y="8" width="4" height="4" fill="#5a9c5a" />
          <rect x="16" y="12" width="8" height="4" fill="#5a9c5a" />
          <rect x="16" y="16" width="12" height="4" fill="#5a9c5a" />
          <rect x="16" y="20" width="16" height="8" fill="#5a9c5a" />
          <rect x="16" y="28" width="12" height="4" fill="#5a9c5a" />
          <rect x="16" y="32" width="8" height="4" fill="#5a9c5a" />
          <rect x="16" y="36" width="4" height="4" fill="#5a9c5a" />
        </>
      )}
    </svg>
  );
}

/**
 * Calculates the actual rendered dimensions and position of an image
 * displayed with object-fit: contain
 */
function getRenderedImageBounds(img: HTMLImageElement) {
  const { naturalWidth, naturalHeight, clientWidth, clientHeight } = img;
  const scale = Math.min(clientWidth / naturalWidth, clientHeight / naturalHeight);
  const renderedWidth = naturalWidth * scale;
  const renderedHeight = naturalHeight * scale;
  const offsetX = (clientWidth - renderedWidth) / 2;
  const offsetY = (clientHeight - renderedHeight) / 2;

  return { renderedWidth, renderedHeight, offsetX, offsetY };
}

export function FieldNotes({ onClose, onMinimize, zIndex, onFocus }: FieldNotesProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [magnifierEnabled, setMagnifierEnabled] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState<MagnifierPosition>({
    x: 0,
    y: 0,
    imgX: 0,
    imgY: 0,
    imgWidth: 0,
    imgHeight: 0,
    visible: false,
  });

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handlePreviousNote = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? FIELD_NOTES_IMAGES.length - 1 : prev - 1));
  }, []);

  const handleNextNote = useCallback(() => {
    setSelectedIndex((prev) => (prev === FIELD_NOTES_IMAGES.length - 1 ? 0 : prev + 1));
  }, []);

  // Keyboard navigation with arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          handlePreviousNote();
          break;
        case "ArrowRight":
          handleNextNote();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePreviousNote, handleNextNote]);

  const toggleMagnifier = useCallback(() => {
    setMagnifierEnabled((prev) => !prev);
  }, []);

  // Hide cursor globally when magnifier is active and visible
  useEffect(() => {
    if (magnifierEnabled && magnifierPos.visible) {
      // Create a style element to force cursor: none on all elements
      const style = document.createElement("style");
      style.id = "magnifier-cursor-hide";
      style.textContent = "* { cursor: none !important; }";
      document.head.appendChild(style);
      return () => {
        style.remove();
      };
    }
  }, [magnifierEnabled, magnifierPos.visible]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!magnifierEnabled || !imageRef.current || !imageContainerRef.current) return;

      const img = imageRef.current;
      const containerRect = imageContainerRef.current.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();

      // Position relative to container (for magnifier placement)
      const x = e.clientX - containerRect.left;
      const y = e.clientY - containerRect.top;

      // Calculate actual rendered image bounds (accounting for object-contain)
      const { renderedWidth, renderedHeight, offsetX, offsetY } = getRenderedImageBounds(img);

      // Image element position relative to container
      const imgElementX = imgRect.left - containerRect.left;
      const imgElementY = imgRect.top - containerRect.top;

      // Position relative to actual rendered image
      const imgX = x - imgElementX - offsetX;
      const imgY = y - imgElementY - offsetY;

      // Check if mouse is over the actual rendered image
      const visible = imgX >= 0 && imgX <= renderedWidth && imgY >= 0 && imgY <= renderedHeight;

      setMagnifierPos({
        x,
        y,
        imgX,
        imgY,
        imgWidth: renderedWidth,
        imgHeight: renderedHeight,
        visible,
      });
    },
    [magnifierEnabled]
  );

  const handleMouseLeave = useCallback(() => {
    setMagnifierPos((prev) => ({ ...prev, visible: false }));
  }, []);

  const currentImage = FIELD_NOTES_IMAGES[selectedIndex];

  return (
    <Window
      resizable={false}
      leftSnapBoundary={ICON_COLUMN_RIGHT_EDGE}
      className="w-[1150px] h-[750px] max-h-[calc(100vh-6vh-50px)] absolute top-[6vh] left-[calc(50%+48px)] -translate-x-1/2 flex flex-col"
      zIndex={zIndex}
      onFocus={onFocus}
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

      <div
        className="flex-1 flex items-center justify-between"
        style={{ backgroundColor: BACKGROUND_COLOR }}
      >
        <button
          onClick={handlePreviousNote}
          className="flex-shrink-0 hover:scale-110 transition-transform cursor-pointer px-1"
          aria-label="Previous note"
        >
          <NavigationArrow direction="left" />
        </button>

        <div
          ref={imageContainerRef}
          className="flex-1 h-full flex items-center justify-center overflow-hidden relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: magnifierEnabled ? "none" : "default" }}
        >
          <img
            ref={imageRef}
            src={currentImage}
            alt={`Field Notes ${selectedIndex + 1}`}
            className="w-full h-full object-contain"
            style={{ cursor: magnifierEnabled ? "none" : "default" }}
          />

          {magnifierEnabled && magnifierPos.visible && (
            <div
              className="absolute pointer-events-none border-4 border-[#1a1a1a] shadow-lg rounded-full overflow-hidden"
              style={{
                width: MAGNIFIER_SIZE,
                height: MAGNIFIER_SIZE,
                left: magnifierPos.x - MAGNIFIER_SIZE / 2,
                top: magnifierPos.y - MAGNIFIER_SIZE / 2,
                backgroundColor: BACKGROUND_COLOR,
                cursor: "none",
              }}
            >
              <img
                src={currentImage}
                alt=""
                style={{
                  position: "absolute",
                  width: magnifierPos.imgWidth * ZOOM_LEVEL,
                  height: magnifierPos.imgHeight * ZOOM_LEVEL,
                  maxWidth: "none",
                  left: MAGNIFIER_SIZE / 2 - magnifierPos.imgX * ZOOM_LEVEL,
                  top: MAGNIFIER_SIZE / 2 - magnifierPos.imgY * ZOOM_LEVEL,
                  cursor: "none",
                }}
              />
            </div>
          )}
        </div>

        <button
          onClick={handleNextNote}
          className="flex-shrink-0 hover:scale-110 transition-transform cursor-pointer px-1"
          aria-label="Next note"
        >
          <NavigationArrow direction="right" />
        </button>
      </div>

      <WindowStatusBar>
        <button
          onClick={toggleMagnifier}
          className={`flex items-center gap-1 px-2 py-0.5 mr-2 border-2 cursor-pointer transition-colors ${
            magnifierEnabled
              ? "border-t-[#808080] border-l-[#808080] border-b-white border-r-white bg-[#d4d0c8]"
              : "border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#c8b9a9] hover:bg-[#d4c4b4]"
          }`}
          title={magnifierEnabled ? "Disable magnifier" : "Enable magnifier"}
        >
          <MagnifyingGlassIcon active={magnifierEnabled} />
          <span className="text-[11px] font-bold">{magnifierEnabled ? "ZOOM ON" : "ZOOM"}</span>
        </button>
        <WindowStatusField className="flex-1 text-right pr-2">
          {magnifierEnabled
            ? "Hover over image to magnify"
            : "Field notes to be processed into colony reports at a later time"}
        </WindowStatusField>
      </WindowStatusBar>
    </Window>
  );
}
