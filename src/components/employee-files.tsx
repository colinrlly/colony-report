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

// Large illustration placeholder
function IllustrationPlaceholder() {
  return (
    <div className="w-full h-full bg-[#c8b9a9] flex items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#d4c8b8] to-[#a89888] opacity-50" />
      <div className="relative flex flex-col items-center text-[#5a5a5a]">
        <svg width="120" height="150" viewBox="0 0 120 150" fill="none">
          <circle cx="60" cy="40" r="30" fill="#8B9C8B" stroke="#5a5a5a" strokeWidth="2" />
          <ellipse cx="60" cy="120" rx="45" ry="35" fill="#8B9C8B" stroke="#5a5a5a" strokeWidth="2" />
        </svg>
        <span className="text-[10px] mt-2 font-bold tracking-wider">[EMPLOYEE ILLUSTRATION]</span>
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
      className="z-20 w-[800px] h-[650px] absolute top-[3vh] left-[calc(50%+48px)] -translate-x-1/2 flex flex-col"
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

      {/* Header Bar */}
      <div className="bg-[#2a2a2a] text-[#D4C088] px-4 py-2 border-b-2 border-[#D4C088]">
        <div className="text-[13px] font-bold tracking-widest">NEW EDEN COMMITTEE — FORMICA DIVISION</div>
        <div className="text-[10px] tracking-wider">EMPLOYEE PROFILE // INTERNAL RECORD</div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Employee Selection Sidebar */}
        <div className="w-[100px] bg-[#d4c8b8] border-r-2 border-[#8B7355] flex flex-col">
          <div className="p-1.5 bg-[#8B7355] text-white text-[9px] font-bold text-center">
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
                className={`w-full p-1.5 text-left border-b border-[#a89888] transition-colors ${
                  selectedEmployeeId === employee.id
                    ? "bg-[#8B7355] text-white"
                    : "bg-[#d4c8b8] text-[#1a1a1a] hover:bg-[#c4b8a8]"
                }`}
              >
                <div className="text-[9px] font-medium truncate">{employee.name}</div>
                <div className={`text-[8px] truncate ${selectedEmployeeId === employee.id ? "text-[#d4c8b8]" : "text-[#666]"}`}>
                  {employee.role}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-[#c8b9a9]">
          {/* Illustration Area - Takes up most of the space */}
          <div className="flex-1 relative min-h-0">
            <IllustrationPlaceholder />

            {/* Employee name overlay on illustration */}
            <div className="absolute top-3 left-3 right-3">
              <div className="bg-[#2a2a2a]/90 text-[#D4C088] px-3 py-1.5 inline-block">
                <div className="text-[12px] font-bold">{selectedEmployee.name}</div>
                <div className="text-[9px] text-[#a89888]">{selectedEmployee.role}</div>
              </div>
            </div>
          </div>

          {/* Tabbed Info Panel - Compact at bottom */}
          <div className="h-[180px] bg-[#F5F0E1] border-t-2 border-[#8B7355] flex flex-col">
            {/* Tab Buttons */}
            <div className="flex border-b border-[#a89888]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 text-[9px] font-bold transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#F5F0E1] text-[#1a1a1a] border-b-2 border-[#8B7355] -mb-[1px]"
                      : "bg-[#d4c8b8] text-[#5a5a5a] hover:bg-[#e8e0d0]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-2 text-[10px]">
              {activeTab === "profile" && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <div className="flex">
                    <span className="font-bold text-[#5a5a5a] w-[80px]">Name:</span>
                    <span className="text-[#1a1a1a]">{selectedEmployee.name}</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-[#5a5a5a] w-[80px]">ID Number:</span>
                    <span className="text-[#1a1a1a] font-mono">{selectedEmployee.idNumber}</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-[#5a5a5a] w-[80px]">Division:</span>
                    <span className="text-[#1a1a1a]">{selectedEmployee.division}</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-[#5a5a5a] w-[80px]">Clearance:</span>
                    <span className="text-[#8B4513] font-bold">Level {selectedEmployee.clearanceLevel}</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-[#5a5a5a] w-[80px]">Role:</span>
                    <span className="text-[#1a1a1a]">{selectedEmployee.role}</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-[#5a5a5a] w-[80px]">Sector:</span>
                    <span className="text-[#1a1a1a]">{selectedEmployee.assignedSector}</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-[#5a5a5a] w-[80px]">Specialty:</span>
                    <span className="text-[#1a1a1a]">{selectedEmployee.specialty}</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-[#5a5a5a] w-[80px]">Base:</span>
                    <span className="text-[#1a1a1a]">{selectedEmployee.baseLocation}</span>
                  </div>
                  <div className="flex col-span-2">
                    <span className="font-bold text-[#5a5a5a] w-[80px]">Incidents:</span>
                    <span className="text-[#8B4513] font-bold">{selectedEmployee.incidentReports}</span>
                  </div>
                </div>
              )}

              {activeTab === "review" && (
                <div className="space-y-2">
                  <div className="font-bold text-[#5a5a5a] mb-1">Supervisor Notes:</div>
                  {selectedEmployee.supervisorNotes.map((note, index) => (
                    <div key={index} className="bg-[#e8e0d0] p-2 border-l-2 border-[#8B7355] text-[#1a1a1a] italic">
                      &ldquo;{note}&rdquo;
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "comments" && (
                <div className="space-y-2">
                  <div className="font-bold text-[#5a5a5a] mb-1">Colleague Comments:</div>
                  {selectedEmployee.colleagueComments.map((comment, index) => (
                    <div key={index} className="bg-[#e8e0d0] p-2 border-l-2 border-[#5a9c5a] text-[#1a1a1a] italic">
                      &ldquo;{comment}&rdquo;
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "equipment" && (
                <div className="space-y-1">
                  <div className="font-bold text-[#8B7355] text-[11px]">{selectedEmployee.equipment.name}</div>
                  <div className="flex">
                    <span className="font-bold text-[#5a5a5a] w-[50px]">Model:</span>
                    <span className="text-[#1a1a1a]">{selectedEmployee.equipment.model}</span>
                  </div>
                  <div className="bg-[#e8e0d0] p-2 border border-[#a89888] text-[#1a1a1a] mt-1">
                    {selectedEmployee.equipment.description}
                  </div>
                  {selectedEmployee.equipment.nickname && (
                    <div className="text-[9px] text-[#666] italic mt-1">
                      Colloquially referred to as &ldquo;{selectedEmployee.equipment.nickname}&rdquo;
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <WindowStatusBar>
        <WindowStatusField className="flex-none w-[100px]">
          {employeeProfiles.length} personnel
        </WindowStatusField>
        <WindowStatusField className="flex-none px-2">
          N.E.C — New Eden IV
        </WindowStatusField>
        <WindowStatusField className="flex-1 text-right pr-2">
          Employee File
        </WindowStatusField>
      </WindowStatusBar>
    </Window>
  );
}
