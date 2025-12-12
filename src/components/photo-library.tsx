"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Window,
  WindowTitleBar,
  WindowTitle,
  WindowControls,
} from "@/components/ui/window";

// Sample photo library data - placeholder images for now
const photoItems = [
  { id: "img-34", label: "img.34", image: "/images/photo-library/img-34.jpg", coordinates: "47.6062° N, 122.3321° W", location: "Sector 7-Alpha", date: "2157.03.14", time: "14:23:07" },
  { id: "img-35", label: "img.35", image: "/images/photo-library/img-35.jpg", coordinates: "47.6088° N, 122.3359° W", location: "Sector 7-Alpha", date: "2157.03.14", time: "14:25:31" },
  { id: "img-36", label: "img.36", image: "/images/photo-library/img-36.jpg", coordinates: "47.6101° N, 122.3412° W", location: "Sector 7-Beta", date: "2157.03.14", time: "14:28:45" },
  { id: "img-37", label: "img.37", image: "/images/photo-library/img-37.jpg", coordinates: "47.6134° N, 122.3478° W", location: "Sector 7-Beta", date: "2157.03.14", time: "14:32:19" },
  { id: "img-38", label: "img.38", image: "/images/photo-library/img-38.jpg", coordinates: "47.6156° N, 122.3521° W", location: "Sector 7-Gamma", date: "2157.03.14", time: "14:35:52" },
  { id: "img-39", label: "img.39", image: "/images/photo-library/img-39.jpg", coordinates: "47.6178° N, 122.3567° W", location: "Sector 7-Gamma", date: "2157.03.14", time: "14:39:08" },
  { id: "img-40", label: "img.40", image: "/images/photo-library/img-40.jpg", coordinates: "47.6192° N, 122.3601° W", location: "Sector 7-Delta", date: "2157.03.15", time: "08:12:33" },
  { id: "img-41", label: "img.41", image: "/images/photo-library/img-41.jpg", coordinates: "47.6215° N, 122.3645° W", location: "Sector 7-Delta", date: "2157.03.15", time: "08:15:47" },
];

// Camera icon for title bar
function CameraIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" shapeRendering="crispEdges">
      {/* Camera body */}
      <rect x="2" y="6" width="20" height="14" fill="#5a8fc7" stroke="#2a4a6a" strokeWidth="1" />
      {/* Lens */}
      <rect x="8" y="9" width="8" height="8" fill="#1a1a1a" />
      <rect x="10" y="11" width="4" height="4" fill="#3a3a3a" />
      <rect x="11" y="12" width="2" height="2" fill="#5a5a5a" />
      {/* Flash */}
      <rect x="16" y="8" width="4" height="3" fill="#ffdd44" stroke="#aa8800" strokeWidth="0.5" />
      {/* Viewfinder */}
      <rect x="8" y="3" width="8" height="4" fill="#4a7ab0" stroke="#2a4a6a" strokeWidth="1" />
      <rect x="10" y="4" width="4" height="2" fill="#1a1a1a" />
    </svg>
  );
}

// Navigation arrow icons
function LeftArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges">
      <rect x="8" y="2" width="2" height="2" fill="currentColor" />
      <rect x="6" y="4" width="2" height="2" fill="currentColor" />
      <rect x="4" y="6" width="2" height="4" fill="currentColor" />
      <rect x="6" y="10" width="2" height="2" fill="currentColor" />
      <rect x="8" y="12" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

function RightArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges">
      <rect x="6" y="2" width="2" height="2" fill="currentColor" />
      <rect x="8" y="4" width="2" height="2" fill="currentColor" />
      <rect x="10" y="6" width="2" height="4" fill="currentColor" />
      <rect x="8" y="10" width="2" height="2" fill="currentColor" />
      <rect x="6" y="12" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

interface PhotoLibraryProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

export function PhotoLibrary({ onClose, onMinimize }: PhotoLibraryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const selectedPhoto = photoItems[selectedIndex];
  const thumbnailWidth = 140; // Width of each thumbnail including gap
  const visibleThumbnails = 6;
  const maxScroll = Math.max(0, photoItems.length - visibleThumbnails);

  // Calculate scrollbar thumb position and width
  const scrollbarTrackWidth = 280;
  const scrollbarThumbWidth = Math.max(40, scrollbarTrackWidth * (visibleThumbnails / photoItems.length));
  const scrollbarThumbPosition = maxScroll > 0 ? (scrollPosition / maxScroll) * (scrollbarTrackWidth - scrollbarThumbWidth) : 0;

  const handleScrollLeft = () => {
    setScrollPosition((prev) => Math.max(0, prev - 1));
  };

  const handleScrollRight = () => {
    setScrollPosition((prev) => Math.min(maxScroll, prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  // Desktop icons are at x=24 with ~100px width, so snap boundary is at 132px
  const ICON_COLUMN_RIGHT_EDGE = 132;

  return (
    <Window
      resizable={false}
      leftSnapBoundary={ICON_COLUMN_RIGHT_EDGE}
      className="z-20 w-[700px] h-[650px] absolute top-[8vh] left-1/2 -translate-x-1/2 flex flex-col"
    >
      <WindowTitleBar>
        <div className="flex items-center gap-2">
          <CameraIcon />
          <WindowTitle>IMAGE CAPTURE INFO</WindowTitle>
        </div>
        <WindowControls showMaximize={false} onMinimize={onMinimize} onClose={onClose} />
      </WindowTitleBar>

      {/* Main content area - darker brown background like mockup */}
      <div className="flex-1 bg-[#6b5d52] p-3 flex flex-col gap-2">
        {/* Main image display area */}
        <div className="flex-1 win98-border-sunken bg-[#c8b9a9] flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Placeholder text - will be replaced with actual image */}
            <div className="text-[#5a4d42] text-xl font-bold text-center">
              <div>image to go here</div>
              <div>placeholder</div>
            </div>
            {/* Uncomment when images are available:
            <Image
              src={selectedPhoto.image}
              alt={selectedPhoto.label}
              fill
              className="object-contain"
              priority
            />
            */}
          </div>
        </div>

        {/* Info bar - coordinates on left, location/date/time on right */}
        <div className="flex justify-between items-center px-2 py-1 text-[#c8b9a9] text-[11px]">
          <div>{selectedPhoto.coordinates}</div>
          <div>{selectedPhoto.location} {selectedPhoto.date} {selectedPhoto.time}</div>
        </div>

        {/* Scrollbar */}
        <div className="flex items-center gap-1 px-1">
          {/* Left scroll button */}
          <button
            onClick={handleScrollLeft}
            disabled={scrollPosition === 0}
            className="win98-border-raised bg-[#c8b9a9] hover:bg-[#d8c9b9] active:win98-border-sunken disabled:opacity-50 w-6 h-5 flex items-center justify-center text-[#5a4d42]"
            aria-label="Scroll left"
          >
            <LeftArrowIcon />
          </button>

          {/* Scrollbar track */}
          <div className="flex-1 h-5 win98-border-sunken bg-[#a09080] relative">
            {/* Scrollbar thumb */}
            <div
              className="absolute top-0 h-full win98-border-raised bg-[#c8b9a9]"
              style={{
                left: scrollbarThumbPosition,
                width: scrollbarThumbWidth,
              }}
            />
          </div>

          {/* Right scroll button */}
          <button
            onClick={handleScrollRight}
            disabled={scrollPosition >= maxScroll}
            className="win98-border-raised bg-[#c8b9a9] hover:bg-[#d8c9b9] active:win98-border-sunken disabled:opacity-50 w-6 h-5 flex items-center justify-center text-[#5a4d42]"
            aria-label="Scroll right"
          >
            <RightArrowIcon />
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="bg-[#8b7d72] win98-border-sunken p-2">
          <div className="flex gap-2 overflow-hidden" ref={thumbnailContainerRef}>
            {photoItems.slice(scrollPosition, scrollPosition + visibleThumbnails).map((photo, displayIndex) => {
              const actualIndex = scrollPosition + displayIndex;
              const isSelected = actualIndex === selectedIndex;

              return (
                <div
                  key={photo.id}
                  className="flex flex-col items-center cursor-pointer flex-shrink-0"
                  onClick={() => handleThumbnailClick(actualIndex)}
                >
                  {/* Thumbnail label */}
                  <div className={`text-[10px] mb-1 ${isSelected ? 'text-[#ffdd44]' : 'text-[#c8b9a9]'}`}>
                    {photo.label}
                  </div>

                  {/* Thumbnail image */}
                  <div
                    className={`w-[90px] h-[70px] win98-border-sunken flex items-center justify-center ${
                      isSelected ? 'ring-2 ring-[#ffdd44]' : ''
                    }`}
                    style={{ backgroundColor: '#c8b9a9' }}
                  >
                    {/* Placeholder */}
                    <div className="text-[#5a4d42] text-[9px] text-center">
                      <div>img.</div>
                      <div>placeholder</div>
                    </div>
                    {/* Uncomment when images are available:
                    <Image
                      src={photo.image}
                      alt={photo.label}
                      width={90}
                      height={70}
                      className="object-cover"
                    />
                    */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Window>
  );
}
