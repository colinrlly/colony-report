"use client";

interface ReportContentProps {
  selectedId: string;
}

export function ReportContent({ selectedId }: ReportContentProps) {
  return (
    <div className="flex-1 bg-[#c8b9a9] p-4 flex items-center justify-center">
      <div className="win98-border-sunken bg-[#a8a8a8] w-full h-full flex items-center justify-center text-[#666]">
        {selectedId}
      </div>
    </div>
  );
}
