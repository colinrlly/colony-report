"use client";

import { useState } from "react";
import { ColonyReports } from "@/components/colony-reports";
import { DesktopIcon } from "@/components/ui/desktop-icon";

export default function Home() {
  const [isColonyReportsOpen, setIsColonyReportsOpen] = useState(false);

  return (
    <main className="min-h-screen relative p-4">
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <DesktopIcon
          label="Colony Reports"
          color="#8b7355"
          onClick={() => setIsColonyReportsOpen(true)}
        />
      </div>

      {/* Windows */}
      {isColonyReportsOpen && (
        <ColonyReports onClose={() => setIsColonyReportsOpen(false)} />
      )}
    </main>
  );
}
