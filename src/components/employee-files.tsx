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
  specialty: string;
  idNumber: string;
  clearanceLevel: string;
  assignedSector: string;
  baseLocation: string;
  incidentReports: number;
  supervisorNotes: string[];
  colleagueComments: string[];
  equipment: {
    name: string;
    model: string;
    description: string;
    nickname?: string;
  };
  photoUrl?: string;
}

// Employee profiles data
const employeeProfiles: EmployeeProfile[] = [
  {
    id: "emp-001",
    name: "Dr. Jasmine Thorne",
    division: "Xenobotany & Ecological Integration",
    role: "Primary Field Botanist",
    specialty: "Plantlife & Risk Organics",
    idNumber: "2387-F-BT-XV",
    clearanceLevel: "3",
    assignedSector: "Burrow D - Growth Zone 1",
    baseLocation: "The Ant Hill (Facility 4-A)",
    incidentReports: 17,
    supervisorNotes: [
      "Dr. Thorne exhibits strong initiative and an exceptional aptitude for identifying and classifying new flora. Her enthusiasm for exploration is unmatched. She has volunteered for fieldwork 73% more than her peers.",
      "However, her tendency to approach unidentified specimens without authorization, gloves, or backup has resulted in at least 11 minor incidents.",
      "Recommend continued observation and containment of enthusiasm within acceptable safety thresholds.",
    ],
    colleagueComments: [
      "She's got a once-in-a-generation mind. And absolutely no concept of personal safety.",
      "She keeps trying to get us to drink her experimental teas. We had to make a rule.",
      "I've never seen anyone look so happy while being mildly poisoned.",
    ],
    equipment: {
      name: "MOBILE CONTAINMENT UNIT",
      model: "VERA.3X | Versatile Environmental Retrieval Assistant",
      description: "Standard-issue modular containment unit developed by Formica Division for live botanical sample transport in the field. Despite field stress and mild damage, unit remains operational.",
      nickname: "Bug",
    },
    photoUrl: "/dr. jasmine thorne.jpg",
  },
];

type TabType = "profile" | "review" | "comments" | "equipment";

function BadgeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" shapeRendering="crispEdges">
      <rect x="4" y="4" width="16" height="16" fill="#D4C088" stroke="#a08850" strokeWidth="1" />
      <rect x="6" y="6" width="6" height="7" fill="#8B9C8B" />
      <rect x="8" y="7" width="2" height="2" fill="#5a5a5a" />
      <rect x="7" y="9" width="4" height="3" fill="#5a5a5a" />
      <rect x="14" y="7" width="4" height="1" fill="#1a1a1a" />
      <rect x="14" y="10" width="4" height="1" fill="#1a1a1a" />
      <rect x="6" y="15" width="12" height="3" fill="#1a1a1a" />
      <rect x="7" y="16" width="1" height="1" fill="#D4C088" />
      <rect x="9" y="16" width="2" height="1" fill="#D4C088" />
      <rect x="13" y="16" width="1" height="1" fill="#D4C088" />
      <rect x="15" y="16" width="2" height="1" fill="#D4C088" />
    </svg>
  );
}

// NEC Logo component
function NECLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" shapeRendering="crispEdges">
      {/* Hexagon shape */}
      <polygon points="16,2 28,9 28,23 16,30 4,23 4,9" fill="#D4C088" stroke="#8B7355" strokeWidth="2" />
      {/* Inner hexagon */}
      <polygon points="16,6 24,11 24,21 16,26 8,21 8,11" fill="#1a1a1a" />
      {/* N E C letters stylized */}
      <text x="16" y="20" textAnchor="middle" fill="#D4C088" fontSize="8" fontWeight="bold" fontFamily="monospace">NEC</text>
    </svg>
  );
}

// Pixel art icons for each employee
function PixelLeafIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" style={{ imageRendering: "pixelated" }}>
      {/* Leaf shape */}
      <rect x="7" y="1" width="2" height="1" fill="#5a9c5a" />
      <rect x="6" y="2" width="4" height="1" fill="#5a9c5a" />
      <rect x="5" y="3" width="6" height="1" fill="#5a9c5a" />
      <rect x="4" y="4" width="7" height="1" fill="#5a9c5a" />
      <rect x="3" y="5" width="8" height="1" fill="#5a9c5a" />
      <rect x="3" y="6" width="8" height="1" fill="#6ab06a" />
      <rect x="4" y="7" width="7" height="1" fill="#6ab06a" />
      <rect x="5" y="8" width="6" height="1" fill="#6ab06a" />
      <rect x="6" y="9" width="4" height="1" fill="#5a9c5a" />
      <rect x="7" y="10" width="2" height="1" fill="#5a9c5a" />
      {/* Stem */}
      <rect x="7" y="11" width="2" height="1" fill="#8B7355" />
      <rect x="7" y="12" width="2" height="1" fill="#8B7355" />
      <rect x="8" y="13" width="2" height="1" fill="#8B7355" />
      <rect x="8" y="14" width="2" height="1" fill="#6b5344" />
      {/* Leaf vein */}
      <rect x="7" y="4" width="1" height="1" fill="#4a8a4a" />
      <rect x="7" y="5" width="1" height="1" fill="#4a8a4a" />
      <rect x="7" y="6" width="1" height="1" fill="#4a8a4a" />
      <rect x="7" y="7" width="1" height="1" fill="#4a8a4a" />
    </svg>
  );
}

// Get the pixel icon for an employee
function getEmployeeIcon(employeeId: string) {
  switch (employeeId) {
    case "emp-001":
      return <PixelLeafIcon />;
    default:
      return null;
  }
}

// Employee illustration component
function EmployeeIllustration({ photoUrl }: { photoUrl?: string }) {
  if (photoUrl) {
    return (
      <div className="w-full h-full border-2 border-[#8B7355] overflow-hidden">
        <img
          src={photoUrl}
          alt="Employee illustration"
          className="w-full h-full object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#c8b9a9] flex items-center justify-center relative border-2 border-[#8B7355]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#d4c8b8] to-[#a89888] opacity-30" />
      <div className="relative flex flex-col items-center text-[#5a5a5a]">
        <svg width="140" height="200" viewBox="0 0 140 200" fill="none">
          <circle cx="70" cy="50" r="35" fill="#8B9C8B" stroke="#5a5a5a" strokeWidth="2" />
          <ellipse cx="70" cy="150" rx="50" ry="55" fill="#8B9C8B" stroke="#5a5a5a" strokeWidth="2" />
        </svg>
        <span className="text-[12px] mt-3 font-bold tracking-wider">[EMPLOYEE ILLUSTRATION]</span>
      </div>
    </div>
  );
}

interface EmployeeFilesProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

export function EmployeeFiles({ onClose, onMinimize }: EmployeeFilesProps) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>(employeeProfiles[0].id);
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  const selectedEmployee = employeeProfiles.find(emp => emp.id === selectedEmployeeId) || employeeProfiles[0];

  const tabs: { id: TabType; label: string }[] = [
    { id: "profile", label: "PROFILE" },
    { id: "review", label: "REVIEW" },
    { id: "comments", label: "COMMENTS" },
    { id: "equipment", label: "EQUIPMENT" },
  ];

  return (
    <Window
      resizable={false}
      leftSnapBoundary={ICON_COLUMN_RIGHT_EDGE}
      className="z-20 w-[1000px] h-[calc(100vh-92px)] absolute top-[44px] left-1/2 -translate-x-1/2 flex flex-col"
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

      {/* Main Header - Compact with logo */}
      <div className="bg-[#1a1a1a] text-[#D4C088] px-4 py-1.5 border-b-2 border-[#D4C088] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <NECLogo />
          <div>
            <div className="text-[14px] font-black tracking-widest">NEW EDEN COMMITTEE — FORMICA DIVISION</div>
            <div className="text-[10px] tracking-wider opacity-80">EMPLOYEE PROFILE // INTERNAL RECORD</div>
          </div>
        </div>
        <div className="text-[8px] tracking-wider opacity-60 text-right">
          <div>CLASSIFIED DOCUMENT</div>
          <div>AUTHORIZED ACCESS ONLY</div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden bg-[#F5F0E1]">
        {/* Employee Selection Sidebar */}
        <div className="w-[120px] bg-[#d4c8b8] border-r-2 border-[#8B7355] flex flex-col">
          <div className="p-2 bg-[#8B7355] text-white text-[11px] font-bold text-center tracking-wider">
            PERSONNEL
          </div>
          <div className="flex-1 overflow-y-auto">
            {employeeProfiles.map((employee) => (
              <button
                key={employee.id}
                onClick={() => {
                  setSelectedEmployeeId(employee.id);
                  setActiveTab("profile");
                }}
                className={`w-full p-2 text-left border-b border-[#a89888] transition-colors ${
                  selectedEmployeeId === employee.id
                    ? "bg-[#8B7355] text-white"
                    : "bg-[#d4c8b8] text-[#1a1a1a] hover:bg-[#c4b8a8]"
                }`}
              >
                <div className="text-[11px] font-bold truncate">{employee.name}</div>
                <div className={`text-[10px] truncate ${selectedEmployeeId === employee.id ? "text-[#d4c8b8]" : "text-[#666]"}`}>
                  {employee.role}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content - Illustration + Info Side by Side */}
        <div className="flex-1 flex p-3 gap-3">
          {/* Left: Large Portrait Illustration */}
          <div className="w-[480px] flex flex-col">
            <div className="flex-1 min-h-0">
              <EmployeeIllustration photoUrl={selectedEmployee.photoUrl} />
            </div>
            {/* Name plate under illustration */}
            <div className="bg-[#1a1a1a] text-[#D4C088] px-3 py-1.5 mt-2 border-2 border-[#8B7355] flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getEmployeeIcon(selectedEmployee.id)}
                <div>
                  <div className="text-[14px] font-black">{selectedEmployee.name}</div>
                  <div className="text-[10px] text-[#a89888]">{selectedEmployee.role}</div>
                </div>
              </div>
              <div className="text-[9px] text-[#a89888] font-mono">
                {selectedEmployee.idNumber}
              </div>
            </div>
          </div>

          {/* Right: Info Panel */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Tab Buttons */}
            <div className="flex border-b-2 border-[#8B7355] mb-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-[11px] font-bold tracking-wide transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#8B7355] text-white"
                      : "bg-[#d4c8b8] text-[#5a5a5a] hover:bg-[#c4b8a8]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto bg-[#e8e0d0] border-2 border-[#8B7355] p-4">
              {activeTab === "profile" && (
                <div className="space-y-3 text-[12px]">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex border-b border-[#c4b8a8] pb-1">
                      <span className="font-bold text-[#5a5a5a] w-[100px]">Name:</span>
                      <span className="text-[#1a1a1a] font-medium">{selectedEmployee.name}</span>
                    </div>
                    <div className="flex border-b border-[#c4b8a8] pb-1">
                      <span className="font-bold text-[#5a5a5a] w-[100px]">Division:</span>
                      <span className="text-[#1a1a1a]">{selectedEmployee.division}</span>
                    </div>
                    <div className="flex border-b border-[#c4b8a8] pb-1">
                      <span className="font-bold text-[#5a5a5a] w-[100px]">Role:</span>
                      <span className="text-[#1a1a1a]">{selectedEmployee.role}</span>
                    </div>
                    <div className="flex border-b border-[#c4b8a8] pb-1">
                      <span className="font-bold text-[#5a5a5a] w-[100px]">Specialty:</span>
                      <span className="text-[#1a1a1a]">{selectedEmployee.specialty}</span>
                    </div>
                    <div className="flex border-b border-[#c4b8a8] pb-1">
                      <span className="font-bold text-[#5a5a5a] w-[100px]">ID Number:</span>
                      <span className="text-[#1a1a1a] font-mono">{selectedEmployee.idNumber}</span>
                    </div>
                    <div className="flex border-b border-[#c4b8a8] pb-1">
                      <span className="font-bold text-[#5a5a5a] w-[100px]">Clearance:</span>
                      <span className="text-[#8B4513] font-bold">Level {selectedEmployee.clearanceLevel}</span>
                    </div>
                    <div className="flex border-b border-[#c4b8a8] pb-1">
                      <span className="font-bold text-[#5a5a5a] w-[100px]">Sector:</span>
                      <span className="text-[#1a1a1a]">{selectedEmployee.assignedSector}</span>
                    </div>
                    <div className="flex border-b border-[#c4b8a8] pb-1">
                      <span className="font-bold text-[#5a5a5a] w-[100px]">Base:</span>
                      <span className="text-[#1a1a1a]">{selectedEmployee.baseLocation}</span>
                    </div>
                    <div className="flex">
                      <span className="font-bold text-[#5a5a5a] w-[100px]">Incidents:</span>
                      <span className="text-[#8B4513] font-bold">{selectedEmployee.incidentReports}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "review" && (
                <div className="space-y-3 text-[12px]">
                  <div className="font-bold text-[#8B7355] text-[14px] border-b-2 border-[#8B7355] pb-1 mb-3">
                    SUPERVISOR NOTES
                  </div>
                  {selectedEmployee.supervisorNotes.map((note, index) => (
                    <div key={index} className="bg-[#F5F0E1] p-3 border-l-4 border-[#8B7355] text-[#1a1a1a] italic leading-relaxed">
                      &ldquo;{note}&rdquo;
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "comments" && (
                <div className="space-y-3 text-[12px]">
                  <div className="font-bold text-[#8B7355] text-[14px] border-b-2 border-[#8B7355] pb-1 mb-3">
                    COLLEAGUE COMMENTS
                  </div>
                  {selectedEmployee.colleagueComments.map((comment, index) => (
                    <div key={index} className="bg-[#F5F0E1] p-3 border-l-4 border-[#5a9c5a] text-[#1a1a1a] italic leading-relaxed">
                      &ldquo;{comment}&rdquo;
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "equipment" && (
                <div className="space-y-3 text-[12px]">
                  <div className="font-bold text-[#8B7355] text-[14px] border-b-2 border-[#8B7355] pb-1 mb-3">
                    EQUIPMENT ISSUED
                  </div>
                  <div className="font-black text-[#1a1a1a] text-[16px]">{selectedEmployee.equipment.name}</div>
                  <div className="flex mt-2">
                    <span className="font-bold text-[#5a5a5a] w-[60px]">Model:</span>
                    <span className="text-[#1a1a1a]">{selectedEmployee.equipment.model}</span>
                  </div>
                  <div className="bg-[#F5F0E1] p-3 border border-[#a89888] text-[#1a1a1a] mt-3 leading-relaxed">
                    <span className="font-bold">Description: </span>
                    {selectedEmployee.equipment.description}
                  </div>
                  {selectedEmployee.equipment.nickname && (
                    <div className="text-[11px] text-[#666] italic mt-2">
                      Has affectionately been nicknamed &ldquo;{selectedEmployee.equipment.nickname}&rdquo;.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <WindowStatusBar>
        <WindowStatusField className="flex-none w-[120px] text-[11px]">
          {employeeProfiles.length} personnel
        </WindowStatusField>
        <WindowStatusField className="flex-none px-3 text-[11px]">
          N.E.C — New Eden IV
        </WindowStatusField>
        <WindowStatusField className="flex-1 text-right pr-3 text-[11px]">
          Employee File
        </WindowStatusField>
      </WindowStatusBar>
    </Window>
  );
}
