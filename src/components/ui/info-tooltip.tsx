"use client";

import { useState } from "react";

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" shapeRendering="crispEdges">
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
      <rect x="6" y="3" width="2" height="2" fill="currentColor" />
      <rect x="6" y="6" width="2" height="5" fill="currentColor" />
    </svg>
  );
}

interface InfoTooltipProps {
  label: string;
  children: React.ReactNode;
}

export function InfoTooltip({ label, children }: InfoTooltipProps) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="relative">
      <button
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
        className="w-5 h-5 flex items-center justify-center rounded-sm text-[#c8b9a9] hover:text-[#ffdd44] transition-colors"
        aria-label={label}
      >
        <InfoIcon />
      </button>
      {showInfo && (
        <div
          className="absolute top-full left-0 mt-1 z-50 win98-border-raised bg-[#c8b9a9] px-3 py-2 text-[11px] text-[#2a2a2a] whitespace-nowrap shadow-md"
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}
