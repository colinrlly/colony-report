"use client";

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

// Employee file item type
interface EmployeeFileItem {
  id: string;
  name: string;
  role: string;
  status: string;
}

// Employee files data
const employeeFiles: EmployeeFileItem[] = [
  { id: "emp-001", name: "Dr. Martinez", role: "Lead Researcher", status: "Active" },
  { id: "emp-002", name: "Chen, Wei", role: "Field Technician", status: "Active" },
  { id: "emp-003", name: "Okonkwo, Ada", role: "Data Analyst", status: "Active" },
  { id: "emp-004", name: "Hank", role: "Lab Assistant", status: "Active" },
  { id: "emp-005", name: "Toby", role: "Junior Researcher", status: "Training" },
  { id: "emp-006", name: "Rodriguez, M.", role: "Security", status: "Active" },
  { id: "emp-007", name: "[REDACTED]", role: "Specimen Handler", status: "On Leave" },
  { id: "emp-008", name: "Park, Jin-Soo", role: "Equipment Tech", status: "Active" },
];

function BadgeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" shapeRendering="crispEdges">
      {/* Badge body */}
      <rect x="4" y="4" width="16" height="16" fill="#D4C088" stroke="#a08850" strokeWidth="1" />
      {/* Photo area */}
      <rect x="6" y="6" width="6" height="7" fill="#8B9C8B" />
      {/* Head silhouette */}
      <rect x="8" y="7" width="2" height="2" fill="#5a5a5a" />
      <rect x="7" y="9" width="4" height="3" fill="#5a5a5a" />
      {/* Text lines */}
      <rect x="14" y="7" width="4" height="1" fill="#1a1a1a" />
      <rect x="14" y="10" width="4" height="1" fill="#1a1a1a" />
      {/* Barcode area */}
      <rect x="6" y="15" width="12" height="3" fill="#1a1a1a" />
      <rect x="7" y="16" width="1" height="1" fill="#D4C088" />
      <rect x="9" y="16" width="2" height="1" fill="#D4C088" />
      <rect x="13" y="16" width="1" height="1" fill="#D4C088" />
      <rect x="15" y="16" width="2" height="1" fill="#D4C088" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" shapeRendering="crispEdges">
      {/* File body */}
      <rect x="6" y="4" width="16" height="24" fill="#F5F0E1" stroke="#8B7355" strokeWidth="1" />
      {/* Folded corner */}
      <path d="M18 4 L22 4 L22 8 L18 8 Z" fill="#D4C088" stroke="#8B7355" strokeWidth="1" />
      <path d="M18 4 L18 8 L22 8" fill="none" stroke="#8B7355" strokeWidth="1" />
      {/* Text lines */}
      <rect x="8" y="10" width="12" height="1" fill="#8B7355" />
      <rect x="8" y="13" width="10" height="1" fill="#8B7355" />
      <rect x="8" y="16" width="12" height="1" fill="#8B7355" />
      <rect x="8" y="19" width="8" height="1" fill="#8B7355" />
      <rect x="8" y="22" width="11" height="1" fill="#8B7355" />
    </svg>
  );
}

interface EmployeeFilesProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

export function EmployeeFiles({ onClose, onMinimize }: EmployeeFilesProps) {
  return (
    <Window
      resizable={false}
      leftSnapBoundary={ICON_COLUMN_RIGHT_EDGE}
      className="z-20 w-[600px] h-[500px] absolute top-[10vh] left-[calc(50%+48px)] -translate-x-1/2 flex flex-col"
    >
      <WindowTitleBar className="h-[36px]">
        <div className="flex items-center gap-2">
          <BadgeIcon />
          <WindowTitle className="font-bold text-[13px] tracking-wide">
            EMPLOYEE FILES - FORMICA DIVISION
          </WindowTitle>
        </div>
        <WindowControls showMaximize={false} onMinimize={onMinimize} onClose={onClose} />
      </WindowTitleBar>

      <div className="h-[6px] bg-[#2a2a2a]">
        <div className="h-full w-full bg-[#5a9c5a]" />
      </div>

      <div className="flex-1 bg-[#F5F0E1] p-4 overflow-auto">
        <div className="grid grid-cols-4 gap-4">
          {employeeFiles.map((employee) => (
            <div
              key={employee.id}
              className="flex flex-col items-center p-2 hover:bg-[#c8b9a9] rounded cursor-pointer"
            >
              <FileIcon />
              <span className="text-[11px] text-center mt-1 text-[#1a1a1a] font-medium">
                {employee.name}
              </span>
              <span className="text-[9px] text-center text-[#666]">
                {employee.role}
              </span>
              <span className={`text-[8px] mt-1 px-1 rounded ${
                employee.status === "Active" ? "bg-[#5a9c5a] text-white" :
                employee.status === "Training" ? "bg-[#c4a000] text-white" :
                "bg-[#8B7355] text-white"
              }`}>
                {employee.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <WindowStatusBar>
        <WindowStatusField className="flex-none w-[100px]">
          {employeeFiles.length} items
        </WindowStatusField>
        <WindowStatusField className="flex-1 text-right pr-2">
          Personnel records - Authorized access only
        </WindowStatusField>
      </WindowStatusBar>
    </Window>
  );
}
