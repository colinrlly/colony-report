"use client";

import Image from "next/image";

interface ReportContentProps {
  selectedId: string;
}

export function ReportContent({ selectedId }: ReportContentProps) {
  return (
    <div className="flex-1 bg-[#c8b9a9] p-2 flex items-center justify-center">
      <div className={`win98-border-sunken w-full h-full flex items-center justify-center overflow-hidden ${selectedId === "bee" ? "bg-[#baa895]" : "bg-[#a8a8a8]"}`}>
        {selectedId === "bee" ? (
          <div className="relative w-full h-full">
            <Image
              src="/images/bee-illustration.png"
              alt="Bee Colony Report - Hive Mother Illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <span className="text-[#666]">{selectedId}</span>
        )}
      </div>
    </div>
  );
}
