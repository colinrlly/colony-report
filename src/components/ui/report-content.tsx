"use client";

import Image from "next/image";

interface ReportContentProps {
  selectedId: string;
}

export function ReportContent({ selectedId }: ReportContentProps) {
  return (
    <div className="flex-1 bg-[#c8b9a9] p-2 flex items-center justify-center">
      <div className={`win98-border-sunken w-full h-full flex items-center justify-center overflow-hidden ${selectedId === "bee" || selectedId === "snail" || selectedId === "ladybug" || selectedId === "dandelion" || selectedId === "frog" || selectedId === "cactus" || selectedId === "hand" || selectedId === "apricot" ? "bg-[#baa895]" : "bg-[#a8a8a8]"}`}>
        {selectedId === "bee" ? (
          <div className="relative w-full h-full">
            <Image
              src="/images/bee-illustration.jpg"
              alt="Bee Colony Report - Hive Mother Illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : selectedId === "snail" ? (
          <div className="relative w-full h-full">
            <Image
              src="/images/Snail 4.jpg"
              alt="Snail Research - OW-FDA Control Unit"
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : selectedId === "ladybug" ? (
          <div className="relative w-full h-full">
            <Image
              src="/images/Ladybug3.jpg"
              alt="Ladybug Report"
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : selectedId === "dandelion" ? (
          <div className="relative w-full h-full">
            <Image
              src="/images/Dandelion.jpg"
              alt="Dandelion Report"
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : selectedId === "frog" ? (
          <div className="relative w-full h-full">
            <Image
              src="/images/Frog.jpg"
              alt="Frog Report"
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : selectedId === "cactus" ? (
          <div className="relative w-full h-full">
            <Image
              src="/images/Cactus.jpg"
              alt="Cactus Report"
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : selectedId === "hand" ? (
          <div className="relative w-full h-full">
            <Image
              src="/images/hand.jpg"
              alt="Hand Studies Report"
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : selectedId === "apricot" ? (
          <div className="relative w-full h-full">
            <Image
              src="/images/Fruit.jpg"
              alt="Apricot Data Report"
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
