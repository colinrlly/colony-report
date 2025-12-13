"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
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

// Constants for menu bar and taskbar heights
const MENUBAR_HEIGHT = 36;
const TASKBAR_HEIGHT = 40;

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
    photoUrl: "/images/jasmine final.jpg",
  },
  {
    id: "emp-002",
    name: "Hank Mercer",
    division: "Field Security & Enforcement",
    role: "On-Site Tactical Officer",
    specialty: "Hostile Encounter Response",
    idNumber: "1179-T-SC-Z9",
    clearanceLevel: "2",
    assignedSector: "Burrow C - Security Zone 1",
    baseLocation: "The Ant Hill (Facility 4-A)",
    incidentReports: 3,
    supervisorNotes: [
      "Mercer maintains a combative demeanor and communicates in short, often hostile bursts. He shows no interest in team-building or cross-departmental efforts.",
      "He has a sharp instinct for threat assessment but tends to default to \"shoot first, ask later\". He's been reminded that not all movement in the underbrush is hostile.",
      "Still, despite his surliness, Mercer has singlehandedly prevented multiple fatal incidents. He won't say it, but it's clear the team's safety matters to him.",
    ],
    colleagueComments: [
      "If something tries to eat you, Hank's the reason you're still here to complain about it.",
      "He says he doesn't care about us. Then he carried Jas three miles through mud with a twisted ankle and says it was 'for operational efficiency'.",
      "He's like if a gun grew legs and got tired of your shit.",
    ],
    equipment: {
      name: "THREAT ASSESSMENT DRONES",
      model: "K-92 T/A Recon",
      description: "Compact aerial drones equipped with multispectral scanners, motion tracking, and short-range deterrent systems. Primarily used for early threat detection and perimeter sweeps.",
      nickname: "Owl and Wasp",
    },
    photoUrl: "/images/Hank final.jpg",
  },
  {
    id: "emp-003",
    name: "████████ \"The Professor\"",
    division: "Field Security & Enforcement",
    role: "Director of Xenobiology",
    specialty: "Advanced Xenobiological Systems",
    idNumber: "8252-F-XL-C3",
    clearanceLevel: "5",
    assignedSector: "Burrow A - Laboratory 1",
    baseLocation: "The Ant Hill (Facility 4-A)",
    incidentReports: 7,
    supervisorNotes: [
      "The Professor does not technically report to me. He submits his findings when it suits him. Rarely leaves the laboratory, preferring to direct operations from within his research bay.",
      "His adherence to his own procedures is absolute. Though rigid and precise in approach, his intellect and methods consistently yield results beyond expectation.",
      "Three months ago, a highly classified xenobiological trial accident resulted in the transmutation of his left arm. Cleared by psych and medical, he continues working, claiming the limb has improved his efficiency.",
    ],
    colleagueComments: [
      "I keep making accidental eye contact... with his arm.",
      "The Professor logs every variable, every outcome, every anomaly. He's probably cataloged what I had for lunch yesterday.",
      "It's unsettling how calm he was after the arm incident. Like he'd been waiting for it.",
    ],
    equipment: {
      name: "XENO-7 RESEARCH CHAMBER",
      model: "XR-07 Containment & Analysis Unit",
      description: "Sealed cylindrical tank for containing live specimens in suspended liquid. Allows reagent introduction and real-time observation of physiological and chemical responses.",
      nickname: "The Jar",
    },
    photoUrl: "/images/professor final.jpg",
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
function PixelFlaskIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" style={{ imageRendering: "pixelated" }}>
      {/* Flask neck */}
      <rect x="6" y="1" width="4" height="1" fill="#88aacc" />
      <rect x="6" y="2" width="4" height="1" fill="#99bbdd" />
      <rect x="7" y="3" width="2" height="1" fill="#99bbdd" />
      <rect x="7" y="4" width="2" height="1" fill="#88aacc" />
      {/* Flask body */}
      <rect x="5" y="5" width="6" height="1" fill="#88aacc" />
      <rect x="4" y="6" width="8" height="1" fill="#99bbdd" />
      <rect x="3" y="7" width="10" height="1" fill="#99bbdd" />
      <rect x="2" y="8" width="12" height="1" fill="#88aacc" />
      <rect x="2" y="9" width="12" height="1" fill="#88aacc" />
      {/* Liquid inside */}
      <rect x="3" y="10" width="10" height="1" fill="#66cc99" />
      <rect x="3" y="11" width="10" height="1" fill="#55bb88" />
      <rect x="4" y="12" width="8" height="1" fill="#44aa77" />
      <rect x="5" y="13" width="6" height="1" fill="#44aa77" />
      {/* Base */}
      <rect x="4" y="14" width="8" height="1" fill="#666688" />
      {/* Bubbles */}
      <rect x="5" y="10" width="1" height="1" fill="#88ddbb" />
      <rect x="9" y="11" width="1" height="1" fill="#88ddbb" />
      <rect x="7" y="12" width="1" height="1" fill="#88ddbb" />
    </svg>
  );
}

function PixelShieldIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" style={{ imageRendering: "pixelated" }}>
      {/* Shield shape */}
      <rect x="4" y="1" width="8" height="1" fill="#5a6a8a" />
      <rect x="3" y="2" width="10" height="1" fill="#5a6a8a" />
      <rect x="2" y="3" width="12" height="1" fill="#5a6a8a" />
      <rect x="2" y="4" width="12" height="1" fill="#6a7a9a" />
      <rect x="2" y="5" width="12" height="1" fill="#6a7a9a" />
      <rect x="2" y="6" width="12" height="1" fill="#6a7a9a" />
      <rect x="3" y="7" width="10" height="1" fill="#5a6a8a" />
      <rect x="3" y="8" width="10" height="1" fill="#5a6a8a" />
      <rect x="4" y="9" width="8" height="1" fill="#5a6a8a" />
      <rect x="4" y="10" width="8" height="1" fill="#4a5a7a" />
      <rect x="5" y="11" width="6" height="1" fill="#4a5a7a" />
      <rect x="6" y="12" width="4" height="1" fill="#4a5a7a" />
      <rect x="7" y="13" width="2" height="1" fill="#3a4a6a" />
      {/* Crosshair/target in center */}
      <rect x="7" y="4" width="2" height="1" fill="#cc4444" />
      <rect x="7" y="5" width="2" height="1" fill="#cc4444" />
      <rect x="5" y="6" width="2" height="1" fill="#cc4444" />
      <rect x="9" y="6" width="2" height="1" fill="#cc4444" />
      <rect x="7" y="7" width="2" height="1" fill="#cc4444" />
      <rect x="7" y="8" width="2" height="1" fill="#cc4444" />
    </svg>
  );
}

function PixelLeafIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" style={{ imageRendering: "pixelated" }}>
      {/* Leaf shape - no stem */}
      <rect x="7" y="2" width="2" height="1" fill="#4a9a4a" />
      <rect x="6" y="3" width="4" height="1" fill="#4a9a4a" />
      <rect x="5" y="4" width="6" height="1" fill="#4a9a4a" />
      <rect x="4" y="5" width="8" height="1" fill="#4a9a4a" />
      <rect x="3" y="6" width="10" height="1" fill="#4a9a4a" />
      <rect x="3" y="7" width="10" height="1" fill="#6b8a6b" />
      <rect x="3" y="8" width="10" height="1" fill="#6b8a6b" />
      <rect x="4" y="9" width="8" height="1" fill="#4a9a4a" />
      <rect x="5" y="10" width="6" height="1" fill="#4a9a4a" />
      <rect x="6" y="11" width="4" height="1" fill="#4a9a4a" />
      <rect x="7" y="12" width="2" height="1" fill="#4a9a4a" />
      {/* Leaf vein */}
      <rect x="7" y="5" width="2" height="1" fill="#3a7a3a" />
      <rect x="7" y="6" width="2" height="1" fill="#3a7a3a" />
      <rect x="7" y="7" width="2" height="1" fill="#3a7a3a" />
      <rect x="7" y="8" width="2" height="1" fill="#3a7a3a" />
      <rect x="7" y="9" width="2" height="1" fill="#3a7a3a" />
    </svg>
  );
}

// Get the pixel icon for an employee
function getEmployeeIcon(employeeId: string) {
  switch (employeeId) {
    case "emp-001":
      return <PixelLeafIcon />;
    case "emp-002":
      return <PixelShieldIcon />;
    case "emp-003":
      return <PixelFlaskIcon />;
    default:
      return null;
  }
}

// Employee tab color configuration
const EMPLOYEE_TAB_COLORS: Record<string, { bg: string; bgSelected: string; border: string }> = {
  "emp-001": { bg: "#833d15", bgSelected: "#934519", border: "#6a3110" }, // Orange for Jasmine
  "emp-002": { bg: "#343721", bgSelected: "#3e4128", border: "#262a18" }, // Green for Hank
  "emp-003": { bg: "#4f241e", bgSelected: "#5f2c24", border: "#3f1c16" }, // Red for Professor
};

function getEmployeeTabColor(employeeId: string, isSelected: boolean) {
  const color = EMPLOYEE_TAB_COLORS[employeeId] || EMPLOYEE_TAB_COLORS["emp-001"];
  return isSelected ? color.bgSelected : color.bg;
}

function getEmployeeTabBorderColor(employeeId: string) {
  const color = EMPLOYEE_TAB_COLORS[employeeId] || EMPLOYEE_TAB_COLORS["emp-001"];
  return color.border;
}

// Get display name for tab (Professor's name is unredacted on tab)
function getEmployeeTabName(employee: EmployeeProfile) {
  if (employee.id === "emp-003") {
    return "The Professor";
  }
  return employee.name;
}

// Equipment highlight regions for each employee (percentages of image dimensions)
// Each region defines: top, left, width, height as percentages
// Supports multiple regions per employee (e.g., Hank has two drones)
const EQUIPMENT_HIGHLIGHT_REGIONS: Record<string, { top: string; left: string; width: string; height: string }[]> = {
  "emp-001": [{ top: "53%", left: "53%", width: "37%", height: "38%" }], // Bug (mobile containment unit)
  "emp-002": [
    { top: "6%", left: "58%", width: "35%", height: "18%" },  // Owl (upper drone)
    { top: "45%", left: "45%", width: "35%", height: "28%" }, // Wasp (lower drone)
  ],
  "emp-003": [{ top: "50%", left: "58%", width: "36%", height: "48%" }], // The Jar (research chamber)
};

// Employee illustration component
function EmployeeIllustration({ photoUrl, priority = false, highlightEquipment = false, employeeId }: { photoUrl?: string; priority?: boolean; highlightEquipment?: boolean; employeeId?: string }) {
  const highlightRegions = employeeId ? EQUIPMENT_HIGHLIGHT_REGIONS[employeeId] : null;

  if (photoUrl) {
    return (
      <div className="w-full h-full border-2 border-[#8B7355] overflow-hidden relative">
        <Image
          src={photoUrl}
          alt="Employee illustration"
          fill
          sizes="520px"
          className="object-cover object-top"
          priority={priority}
        />
        {/* Equipment-specific highlight overlay */}
        {highlightEquipment && highlightRegions && highlightRegions.map((region, index) => (
          <div
            key={index}
            className="absolute pointer-events-none transition-all duration-300"
            style={{
              top: region.top,
              left: region.left,
              width: region.width,
              height: region.height,
            }}
          >
            <div className="absolute inset-0 border-2 border-[#FFD700] rounded-lg shadow-[0_0_20px_rgba(255,215,0,0.6),inset_0_0_20px_rgba(255,215,0,0.2)]" />
          </div>
        ))}
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

// Hidden preloader component to load all employee images in background
function EmployeeImagePreloader({ employees, currentId }: { employees: EmployeeProfile[]; currentId: string }) {
  return (
    <div className="hidden">
      {employees
        .filter(emp => emp.photoUrl && emp.id !== currentId)
        .map(emp => (
          <Image
            key={emp.id}
            src={emp.photoUrl!}
            alt=""
            width={520}
            height={520}
            priority
          />
        ))}
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
  const nodeRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bounds, setBounds] = useState<{ left: number; top: number; right: number; bottom: number } | undefined>(undefined);

  const selectedEmployee = employeeProfiles.find(emp => emp.id === selectedEmployeeId) || employeeProfiles[0];

  const tabs: { id: TabType; label: string }[] = [
    { id: "profile", label: "PROFILE" },
    { id: "review", label: "REVIEW" },
    { id: "comments", label: "COMMENTS" },
    { id: "equipment", label: "EQUIPMENT" },
  ];

  const calculateBounds = useCallback(() => {
    if (!nodeRef.current) return;

    const windowRect = nodeRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate the initial position of the window (before any dragging)
    const initialLeft = windowRect.left - position.x;
    const initialTop = windowRect.top - position.y;

    // Bounds are relative to the initial position
    const leftBound = -initialLeft;
    const rightBound = viewportWidth - initialLeft - windowRect.width;
    const topBound = MENUBAR_HEIGHT - initialTop;
    const bottomBound = viewportHeight - TASKBAR_HEIGHT - initialTop - windowRect.height;

    setBounds({
      left: leftBound,
      top: topBound,
      right: rightBound,
      bottom: bottomBound,
    });
  }, [position]);

  useEffect(() => {
    calculateBounds();

    const handleResize = () => calculateBounds();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [calculateBounds]);

  const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleDragStop = (_e: DraggableEvent, data: DraggableData) => {
    if (!nodeRef.current) return;

    const windowRect = nodeRef.current.getBoundingClientRect();

    // If the window's left edge is within the snap zone, push it to the right
    if (windowRect.left < ICON_COLUMN_RIGHT_EDGE) {
      const adjustment = ICON_COLUMN_RIGHT_EDGE - windowRect.left;
      setPosition({ x: data.x + adjustment, y: data.y });
    }
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-drag-handle"
      position={position}
      onDrag={handleDrag}
      onStop={handleDragStop}
      bounds={bounds}
    >
      <div ref={nodeRef} className="z-20 absolute top-[44px] left-1/2 -translate-x-1/2 flex">
      {/* Manila Folder Tabs - Outside window, on the left */}
      <div className="flex flex-col justify-start pt-[100px] relative z-10 mr-[-4px]">
        {employeeProfiles.map((employee) => {
          const isSelected = selectedEmployeeId === employee.id;
          const tabColor = getEmployeeTabColor(employee.id, isSelected);
          const borderColor = getEmployeeTabBorderColor(employee.id);

          return (
            <button
              key={employee.id}
              onClick={() => {
                setSelectedEmployeeId(employee.id);
                setActiveTab("profile");
              }}
              className={`relative text-left ${
                isSelected ? "z-20" : "z-10 hover:brightness-110"
              }`}
              style={{
                marginLeft: isSelected ? "0px" : "20px",
              }}
            >
              {/* Tab shape - manila folder style */}
              <div className="relative flex items-stretch">
                {/* Main tab body */}
                <div
                  className="px-2 py-3 text-white relative"
                  style={{
                    backgroundColor: tabColor,
                    borderTop: `2px solid ${borderColor}`,
                    borderLeft: `2px solid ${borderColor}`,
                    borderBottom: `2px solid ${borderColor}`,
                    borderRight: "none",
                    borderTopLeftRadius: "4px",
                    borderBottomLeftRadius: "4px",
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    transform: "rotate(180deg)",
                    minHeight: "120px",
                    width: isSelected ? "50px" : "44px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    boxShadow: isSelected
                      ? "inset 0 0 0 1px rgba(255,255,255,0.2)"
                      : "inset 0 0 0 1px rgba(255,255,255,0.1)",
                  }}
                >
                  <span className="text-[11px] font-bold whitespace-nowrap tracking-wide drop-shadow-sm">
                    {getEmployeeTabName(employee)}
                  </span>
                </div>
                {/* Connector to window edge */}
                <div
                  style={{
                    backgroundColor: tabColor,
                    width: isSelected ? "26px" : "6px",
                    borderTop: `2px solid ${borderColor}`,
                    borderBottom: `2px solid ${borderColor}`,
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Window */}
      <Window
        resizable={false}
        draggable={false}
        className="w-[1050px] h-[730px] flex flex-col"
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
          {/* Main Content - Illustration + Info Side by Side */}
          <div className="flex-1 flex p-3 gap-3">
            {/* Left: Square Portrait Illustration */}
            <div className="flex flex-col">
              <div className="w-[520px] aspect-square">
                <EmployeeIllustration photoUrl={selectedEmployee.photoUrl} priority highlightEquipment={activeTab === "equipment"} employeeId={selectedEmployee.id} />
              </div>
              {/* Preload other employee images for smooth tab switching */}
              <EmployeeImagePreloader employees={employeeProfiles} currentId={selectedEmployeeId} />
              {/* Name plate under illustration */}
              <div className="bg-[#1a1a1a] text-[#D4C088] px-3 py-2.5 mt-2 border-2 border-[#8B7355] flex items-center justify-between">
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
                    className={`px-4 py-2 text-[12px] font-bold tracking-wide transition-colors ${
                      activeTab === tab.id
                        ? "text-white"
                        : "bg-[#d4c8b8] text-[#5a5a5a] hover:bg-[#c4b8a8]"
                    }`}
                    style={activeTab === tab.id ? { backgroundColor: getEmployeeTabColor(selectedEmployeeId, true) } : undefined}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto bg-[#e8e0d0] border-2 border-[#8B7355] p-4">
                {activeTab === "profile" && (
                  <div className="space-y-3 text-[13px]">
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
                  <div className="space-y-3 text-[13px]">
                    <div className="font-bold text-[#8B7355] text-[15px] border-b-2 border-[#8B7355] pb-1 mb-3">
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
                  <div className="space-y-3 text-[13px]">
                    <div className="font-bold text-[#8B7355] text-[15px] border-b-2 border-[#8B7355] pb-1 mb-3">
                      COLLEAGUE COMMENTS
                    </div>
                    {selectedEmployee.colleagueComments.map((comment, index) => (
                      <div
                        key={index}
                        className="bg-[#F5F0E1] p-3 border-l-4 text-[#1a1a1a] italic leading-relaxed"
                        style={{ borderLeftColor: getEmployeeTabColor(selectedEmployeeId, true) }}
                      >
                        &ldquo;{comment}&rdquo;
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "equipment" && (
                  <div className="space-y-3 text-[13px]">
                    <div className="font-bold text-[#8B7355] text-[15px] border-b-2 border-[#8B7355] pb-1 mb-3">
                      EQUIPMENT ISSUED
                    </div>
                    <div className="font-black text-[#1a1a1a] text-[17px]">
                      {selectedEmployee.equipment.name}
                      {selectedEmployee.equipment.nickname && (
                        <span className="text-[20px] text-[#4a3728] ml-2">
                          &ldquo;{selectedEmployee.equipment.nickname}&rdquo;
                        </span>
                      )}
                    </div>
                    <div className="flex mt-2">
                      <span className="font-bold text-[#5a5a5a] w-[60px]">Model:</span>
                      <span className="text-[#1a1a1a]">{selectedEmployee.equipment.model}</span>
                    </div>
                    <div className="bg-[#F5F0E1] p-3 border border-[#a89888] text-[#1a1a1a] mt-3 leading-relaxed">
                      <span className="font-bold">Description: </span>
                      {selectedEmployee.equipment.description}
                    </div>
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
      </div>
    </Draggable>
  );
}
