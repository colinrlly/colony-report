"use client";

import { useState } from "react";
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

// Employee profile data structure
interface EmployeeProfile {
  id: string;
  name: string;
  division: string;
  role: string;
  speciality: string;
  idNumber: string;
  clearanceLevel: string;
  assignedSector: string;
  baseLocation: string;
  employeeReview: string;
  colleagueComments: string[];
  equipmentIssued: string[];
  photoUrl?: string;
}

// Employee profiles data
const employeeProfiles: EmployeeProfile[] = [
  {
    id: "emp-001",
    name: "Dr. Elena Martinez",
    division: "Formica Division",
    role: "Lead Researcher",
    speciality: "Myrmecology & Colony Behavior Analysis",
    idNumber: "NEC-FD-0847",
    clearanceLevel: "LEVEL 4 - RESTRICTED",
    assignedSector: "Sector 7-G",
    baseLocation: "New Eden Research Station Alpha",
    employeeReview: "Dr. Martinez has consistently exceeded expectations in her role as Lead Researcher. Her groundbreaking work on colony communication patterns has advanced our understanding significantly. Demonstrates exceptional leadership qualities and maintains strict adherence to safety protocols. Recommended for continued Level 4 access. Note: Recent stress indicators observed - suggest mandatory wellness check.",
    colleagueComments: [
      "Always willing to help with complex analysis. Great mentor. - Chen, W.",
      "Her attention to detail is unmatched. A pleasure to collaborate with. - Okonkwo, A.",
      "Stays late most nights. Dedicated but maybe too much so. - Anonymous",
    ],
    equipmentIssued: [
      "Standard Research Kit (SRK-7)",
      "Biometric Scanner v2.3",
      "Secure Tablet Terminal",
      "Level 4 Access Keycard",
      "Emergency Beacon (Personal)",
    ],
  },
  {
    id: "emp-002",
    name: "Wei Chen",
    division: "Formica Division",
    role: "Field Technician",
    speciality: "Equipment Maintenance & Field Operations",
    idNumber: "NEC-FD-1203",
    clearanceLevel: "LEVEL 2 - STANDARD",
    assignedSector: "Sectors 3-A through 5-F",
    baseLocation: "New Eden Research Station Alpha",
    employeeReview: "Chen has proven to be a reliable and skilled technician. Excellent problem-solving abilities in field conditions. Has shown interest in advancement - recommend consideration for Level 3 training program. Minor incident report: Unauthorized access attempt to Sector 7 (resolved - badge malfunction confirmed).",
    colleagueComments: [
      "Chen fixed my scanner in 10 minutes. Saved the whole day's work. - Field Team Delta",
      "Very professional. Good under pressure. - Rodriguez, M.",
    ],
    equipmentIssued: [
      "Field Technician Toolkit (FTK-12)",
      "Multi-Band Radio",
      "Level 2 Access Keycard",
      "Protective Gear Set",
      "Mobile Repair Station",
    ],
  },
  {
    id: "emp-003",
    name: "Ada Okonkwo",
    division: "Formica Division",
    role: "Data Analyst",
    speciality: "Pattern Recognition & Statistical Modeling",
    idNumber: "NEC-FD-0956",
    clearanceLevel: "LEVEL 3 - ELEVATED",
    assignedSector: "Data Center / Sector 2-B",
    baseLocation: "New Eden Research Station Alpha",
    employeeReview: "Okonkwo's analytical capabilities are exceptional. Has identified several previously unnoticed patterns in colony data that have proven significant. Highly recommended for the upcoming Phase 3 data integration project. Note: Has requested additional access to historical records - pending review.",
    colleagueComments: [
      "Ada's models predicted the sector 5 anomaly two weeks before it happened. Impressive. - Dr. Martinez",
      "Always explains complex data in ways I can understand. - Hank",
      "Brilliant but keeps to herself. Hard to read sometimes. - Anonymous",
    ],
    equipmentIssued: [
      "High-Performance Workstation Access",
      "Secure Data Terminal",
      "Level 3 Access Keycard",
      "Archive Access Badge (Temporary)",
      "Standard Issue Tablet",
    ],
  },
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

// Photo placeholder component
function PhotoPlaceholder() {
  return (
    <div className="w-[100px] h-[120px] bg-[#8B9C8B] border-2 border-[#5a5a5a] flex items-center justify-center">
      <svg width="60" height="70" viewBox="0 0 60 70" fill="none">
        {/* Head */}
        <circle cx="30" cy="22" r="14" fill="#5a5a5a" />
        {/* Body */}
        <ellipse cx="30" cy="58" rx="22" ry="16" fill="#5a5a5a" />
      </svg>
    </div>
  );
}

interface EmployeeFilesProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

export function EmployeeFiles({ onClose, onMinimize }: EmployeeFilesProps) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>(employeeProfiles[0].id);

  const selectedEmployee = employeeProfiles.find(emp => emp.id === selectedEmployeeId) || employeeProfiles[0];

  return (
    <Window
      resizable={false}
      leftSnapBoundary={ICON_COLUMN_RIGHT_EDGE}
      className="z-20 w-[750px] h-[600px] absolute top-[5vh] left-[calc(50%+48px)] -translate-x-1/2 flex flex-col"
    >
      <WindowTitleBar className="h-[36px]">
        <div className="flex items-center gap-2">
          <BadgeIcon />
          <WindowTitle className="font-bold text-[13px] tracking-wide">
            EMPLOYEE FILES - PERSONNEL RECORDS
          </WindowTitle>
        </div>
        <WindowControls showMaximize={false} onMinimize={onMinimize} onClose={onClose} />
      </WindowTitleBar>

      <div className="h-[6px] bg-[#2a2a2a]">
        <div className="h-full w-full bg-[#5a9c5a]" />
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Employee Selection Sidebar */}
        <div className="w-[140px] bg-[#d4c8b8] border-r-2 border-[#8B7355] flex flex-col">
          <div className="p-2 bg-[#8B7355] text-white text-[10px] font-bold text-center">
            PERSONNEL
          </div>
          <div className="flex-1 overflow-y-auto">
            {employeeProfiles.map((employee) => (
              <button
                key={employee.id}
                onClick={() => setSelectedEmployeeId(employee.id)}
                className={`w-full p-2 text-left border-b border-[#a89888] transition-colors ${
                  selectedEmployeeId === employee.id
                    ? "bg-[#8B7355] text-white"
                    : "bg-[#d4c8b8] text-[#1a1a1a] hover:bg-[#c4b8a8]"
                }`}
              >
                <div className="text-[11px] font-medium truncate">{employee.name}</div>
                <div className={`text-[9px] ${selectedEmployeeId === employee.id ? "text-[#d4c8b8]" : "text-[#666]"}`}>
                  {employee.role}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Profile Area */}
        <div className="flex-1 bg-[#F5F0E1] overflow-y-auto">
          {/* Header */}
          <div className="bg-[#2a2a2a] text-[#D4C088] p-3 text-center border-b-2 border-[#D4C088]">
            <div className="text-[14px] font-bold tracking-widest">NEW EDEN COMMITTEE - FORMICA DIVISION</div>
            <div className="text-[11px] tracking-wider mt-1">EMPLOYEE PROFILE // INTERNAL RECORD</div>
          </div>

          <div className="p-4">
            {/* Top Section: Photo + Basic Info */}
            <div className="flex gap-4 mb-4">
              {/* Photo */}
              <div className="flex-shrink-0">
                <PhotoPlaceholder />
                <div className="text-[8px] text-center text-[#666] mt-1">OFFICIAL PHOTO</div>
              </div>

              {/* Basic Info Grid */}
              <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                <div className="flex">
                  <span className="font-bold text-[#5a5a5a] w-[90px]">NAME:</span>
                  <span className="text-[#1a1a1a]">{selectedEmployee.name}</span>
                </div>
                <div className="flex">
                  <span className="font-bold text-[#5a5a5a] w-[90px]">ID NUMBER:</span>
                  <span className="text-[#1a1a1a] font-mono">{selectedEmployee.idNumber}</span>
                </div>
                <div className="flex">
                  <span className="font-bold text-[#5a5a5a] w-[90px]">DIVISION:</span>
                  <span className="text-[#1a1a1a]">{selectedEmployee.division}</span>
                </div>
                <div className="flex">
                  <span className="font-bold text-[#5a5a5a] w-[90px]">CLEARANCE:</span>
                  <span className="text-[#8B4513] font-bold">{selectedEmployee.clearanceLevel}</span>
                </div>
                <div className="flex">
                  <span className="font-bold text-[#5a5a5a] w-[90px]">ROLE:</span>
                  <span className="text-[#1a1a1a]">{selectedEmployee.role}</span>
                </div>
                <div className="flex">
                  <span className="font-bold text-[#5a5a5a] w-[90px]">SECTOR:</span>
                  <span className="text-[#1a1a1a]">{selectedEmployee.assignedSector}</span>
                </div>
                <div className="flex col-span-2">
                  <span className="font-bold text-[#5a5a5a] w-[90px]">SPECIALITY:</span>
                  <span className="text-[#1a1a1a]">{selectedEmployee.speciality}</span>
                </div>
                <div className="flex col-span-2">
                  <span className="font-bold text-[#5a5a5a] w-[90px]">BASE:</span>
                  <span className="text-[#1a1a1a]">{selectedEmployee.baseLocation}</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-[#8B7355] my-3" />

            {/* Employee Review Section */}
            <div className="mb-4">
              <div className="bg-[#8B7355] text-white text-[10px] font-bold px-2 py-1 mb-2">
                EMPLOYEE REVIEW
              </div>
              <div className="bg-[#e8e0d0] border border-[#a89888] p-2 text-[11px] text-[#1a1a1a] leading-relaxed">
                {selectedEmployee.employeeReview}
              </div>
            </div>

            {/* Colleague Comments Section */}
            <div className="mb-4">
              <div className="bg-[#8B7355] text-white text-[10px] font-bold px-2 py-1 mb-2">
                COLLEAGUE COMMENTS
              </div>
              <div className="bg-[#e8e0d0] border border-[#a89888] p-2">
                {selectedEmployee.colleagueComments.map((comment, index) => (
                  <div key={index} className="text-[10px] text-[#1a1a1a] py-1 border-b border-[#d4c8b8] last:border-b-0 italic">
                    &ldquo;{comment}&rdquo;
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment Issued Section */}
            <div className="mb-2">
              <div className="bg-[#8B7355] text-white text-[10px] font-bold px-2 py-1 mb-2">
                EQUIPMENT ISSUED
              </div>
              <div className="bg-[#e8e0d0] border border-[#a89888] p-2">
                <ul className="list-none">
                  {selectedEmployee.equipmentIssued.map((item, index) => (
                    <li key={index} className="text-[10px] text-[#1a1a1a] py-0.5 flex items-center">
                      <span className="text-[#8B7355] mr-2">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WindowStatusBar>
        <WindowStatusField className="flex-none w-[120px]">
          {employeeProfiles.length} personnel
        </WindowStatusField>
        <WindowStatusField className="flex-1 text-right pr-2">
          CLASSIFIED - Authorized access only
        </WindowStatusField>
      </WindowStatusBar>
    </Window>
  );
}
