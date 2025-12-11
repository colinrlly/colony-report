"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Window,
  WindowTitleBar,
  WindowTitle,
  WindowControls,
  WindowStatusBar,
  WindowStatusField,
} from "@/components/ui/window";

// Baby animal gallery items - images will be uploaded later
const galleryItems = [
  { id: "bunny", label: "Baby Bunny", image: "/images/stress-relief/bunny.jpg", message: "Take a deep breath and relax..." },
  { id: "kitten", label: "Baby Kitten", image: "/images/stress-relief/kitten.jpg", message: "Hang in there!" },
  { id: "puppy", label: "Baby Puppy", image: "/images/stress-relief/puppy.jpg", message: "Everyone makes mistakes..." },
  { id: "duckling", label: "Baby Duckling", image: "/images/stress-relief/duckling.jpg", message: "One step at a time..." },
  { id: "piglet", label: "Baby Piglet", image: "/images/stress-relief/piglet.jpg", message: "You're doing great!" },
  { id: "lamb", label: "Baby Lamb", image: "/images/stress-relief/lamb.jpg", message: "Tomorrow is a new day..." },
];

interface StressReliefGalleryProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

// Navigation arrow icons
function LeftArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" shapeRendering="crispEdges">
      <rect x="12" y="4" width="2" height="2" fill="currentColor" />
      <rect x="10" y="6" width="2" height="2" fill="currentColor" />
      <rect x="8" y="8" width="2" height="2" fill="currentColor" />
      <rect x="6" y="10" width="2" height="4" fill="currentColor" />
      <rect x="8" y="14" width="2" height="2" fill="currentColor" />
      <rect x="10" y="16" width="2" height="2" fill="currentColor" />
      <rect x="12" y="18" width="2" height="2" fill="currentColor" />
      {/* Horizontal bar */}
      <rect x="8" y="11" width="10" height="2" fill="currentColor" />
    </svg>
  );
}

function RightArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" shapeRendering="crispEdges">
      <rect x="10" y="4" width="2" height="2" fill="currentColor" />
      <rect x="12" y="6" width="2" height="2" fill="currentColor" />
      <rect x="14" y="8" width="2" height="2" fill="currentColor" />
      <rect x="16" y="10" width="2" height="4" fill="currentColor" />
      <rect x="14" y="14" width="2" height="2" fill="currentColor" />
      <rect x="12" y="16" width="2" height="2" fill="currentColor" />
      <rect x="10" y="18" width="2" height="2" fill="currentColor" />
      {/* Horizontal bar */}
      <rect x="6" y="11" width="10" height="2" fill="currentColor" />
    </svg>
  );
}

export function StressReliefGallery({ onClose, onMinimize }: StressReliefGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItem = galleryItems[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <Window className="w-[500px] h-[500px] absolute top-[15vh] left-1/2 -translate-x-1/2 flex flex-col" resizable={false}>
      <WindowTitleBar>
        <WindowTitle>Stress Relief - Baby Animals</WindowTitle>
        <WindowControls showMaximize={false} onMinimize={onMinimize} onClose={onClose} />
      </WindowTitleBar>

      {/* Main content area */}
      <div className="flex-1 bg-[#c8b9a9] p-3 flex flex-col">
        {/* Image display area */}
        <div className="flex-1 win98-border-sunken bg-[#f5f0eb] flex items-center justify-center overflow-hidden relative">
          <div className="relative w-full h-full">
            <Image
              src={currentItem.image}
              alt={currentItem.label}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Navigation controls */}
        <div className="flex items-center justify-center gap-4 mt-3">
          <button
            onClick={handlePrevious}
            className="win98-border-raised bg-[#c8b9a9] hover:bg-[#d8c9b9] active:win98-border-sunken px-3 py-1 flex items-center justify-center text-[#5a4d42]"
            aria-label="Previous image"
          >
            <LeftArrowIcon />
          </button>

          {/* Page indicator dots */}
          <div className="flex items-center gap-2">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-[#8b7355]"
                    : "bg-[#d4c4b4] hover:bg-[#c4b4a4]"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="win98-border-raised bg-[#c8b9a9] hover:bg-[#d8c9b9] active:win98-border-sunken px-3 py-1 flex items-center justify-center text-[#5a4d42]"
            aria-label="Next image"
          >
            <RightArrowIcon />
          </button>
        </div>
      </div>

      <WindowStatusBar>
        <WindowStatusField className="flex-none w-[100px]">
          {currentIndex + 1} of {galleryItems.length}
        </WindowStatusField>
        <WindowStatusField className="text-right">
          {currentItem.label} - {currentItem.message}
        </WindowStatusField>
      </WindowStatusBar>
    </Window>
  );
}
