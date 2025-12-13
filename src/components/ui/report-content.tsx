"use client";

import Image from "next/image";

// Image data for all reports - keeps images mounted for instant switching
const reportImages = [
  { id: "bee", src: "/images/bee-illustration.jpg", alt: "Bee Colony Report - Hive Mother Illustration" },
  { id: "snail", src: "/images/Snail 4.jpg", alt: "Snail Research - OW-FDA Control Unit" },
  { id: "ladybug", src: "/images/Ladybug3.jpg", alt: "Ladybug Report" },
  { id: "dandelion", src: "/images/Dandelion.jpg", alt: "Dandelion Report" },
  { id: "frog", src: "/images/Frog.jpg", alt: "Frog Report" },
  { id: "cactus", src: "/images/Cactus.jpg", alt: "Cactus Report" },
  { id: "hand", src: "/images/hand.jpg", alt: "Hand Studies Report" },
  { id: "apricot", src: "/images/Fruit.jpg", alt: "Apricot Data Report" },
  { id: "sandwich", src: "/images/sandwich.jpg", alt: "Sandwich Files Report" },
];

const validIds = new Set(reportImages.map(img => img.id));

interface ReportContentProps {
  selectedId: string;
}

export function ReportContent({ selectedId }: ReportContentProps) {
  const hasValidImage = validIds.has(selectedId);

  return (
    <div className="flex-1 bg-[#c8b9a9] p-2 flex items-center justify-center">
      <div className={`win98-border-sunken w-full h-full flex items-center justify-center overflow-hidden relative ${hasValidImage ? "bg-[#baa895]" : "bg-[#a8a8a8]"}`}>
        {/* Render all images but only show the selected one - enables instant switching */}
        {reportImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 ${selectedId === image.id ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            style={{ transition: "opacity 0.05s ease-out" }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
              loading={index === 0 ? undefined : "eager"}
            />
          </div>
        ))}
        {/* Fallback for invalid IDs */}
        {!hasValidImage && (
          <span className="text-[#666] z-20">{selectedId}</span>
        )}
      </div>
    </div>
  );
}
