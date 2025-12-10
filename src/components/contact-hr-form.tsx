"use client";

import { useState, FormEvent } from "react";
import {
  Window,
  WindowTitleBar,
  WindowTitle,
  WindowControls,
  WindowStatusBar,
  WindowStatusField,
} from "@/components/ui/window";

interface ContactHRFormProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

type SubjectType =
  | ""
  | "general"
  | "benefits"
  | "payroll"
  | "leave"
  | "workplace"
  | "training"
  | "other";

const subjectOptions: { value: SubjectType; label: string }[] = [
  { value: "", label: "-- Select a Topic --" },
  { value: "general", label: "General Inquiry" },
  { value: "benefits", label: "Benefits & Insurance" },
  { value: "payroll", label: "Payroll & Compensation" },
  { value: "leave", label: "Leave Request / Time Off" },
  { value: "workplace", label: "Workplace Concern" },
  { value: "training", label: "Training & Development" },
  { value: "other", label: "Other" },
];

export function ContactHRForm({ onClose, onMinimize }: ContactHRFormProps) {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState<SubjectType>("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("Ready");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!employeeName || !subject || !message) {
      setStatusMessage("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("Sending message...");

    try {
      const subjectLabel = subjectOptions.find(s => s.value === subject)?.label || subject;

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "f99ee498-61b9-4613-8bcd-10cb61da0a27",
          subject: `[HR Contact Form] ${subjectLabel}`,
          from_name: "N.E.C. HR Portal",
          name: employeeName,
          employee_id: employeeId || "Not provided",
          department: department || "Not specified",
          topic: subjectLabel,
          message: message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus("success");
        setStatusMessage("Message sent successfully!");
        // Reset form
        setEmployeeName("");
        setEmployeeId("");
        setDepartment("");
        setSubject("");
        setMessage("");
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch {
      setSubmitStatus("error");
      setStatusMessage("Failed to send. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Window className="w-[500px] absolute top-[15vh] left-[calc(50vw-250px)] flex flex-col">
      <WindowTitleBar>
        <WindowTitle>Contact Human Resources</WindowTitle>
        <WindowControls onMinimize={onMinimize} onClose={onClose} />
      </WindowTitleBar>

      <div className="p-4 bg-win98-surface">
        {/* Header */}
        <div className="win98-border-sunken bg-white p-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 win98-border-raised bg-win98-surface flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* HR Icon - stylized people */}
                <rect x="6" y="6" width="8" height="8" rx="4" fill="#8b7355" />
                <rect x="4" y="16" width="12" height="10" rx="2" fill="#8b7355" />
                <rect x="18" y="6" width="8" height="8" rx="4" fill="#a09080" />
                <rect x="16" y="16" width="12" height="10" rx="2" fill="#a09080" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-bold text-win98-text">N.E.C. Human Resources</h2>
              <p className="text-xs text-win98-text/70">Confidential Employee Communications Portal</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {submitStatus === "success" && (
          <div className="win98-border-sunken bg-green-100 p-3 mb-4 text-center">
            <p className="text-sm text-green-800 font-bold">✓ Your message has been submitted</p>
            <p className="text-xs text-green-700 mt-1">HR will respond within 2-3 business days.</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Employee Name */}
          <div>
            <label className="block text-xs font-bold text-win98-text mb-1">
              Employee Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              className="w-full win98-border-sunken bg-white px-2 py-1 text-sm text-win98-text focus:outline-none"
              placeholder="Enter your full name"
              disabled={isSubmitting}
            />
          </div>

          {/* Employee ID and Department Row */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs font-bold text-win98-text mb-1">
                Employee ID
              </label>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="w-full win98-border-sunken bg-white px-2 py-1 text-sm text-win98-text focus:outline-none"
                placeholder="e.g., NEC-12345"
                disabled={isSubmitting}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-win98-text mb-1">
                Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full win98-border-sunken bg-white px-2 py-1 text-sm text-win98-text focus:outline-none"
                placeholder="e.g., Research"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-bold text-win98-text mb-1">
              Subject <span className="text-red-600">*</span>
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value as SubjectType)}
              className="w-full win98-border-sunken bg-white px-2 py-1 text-sm text-win98-text focus:outline-none cursor-pointer"
              disabled={isSubmitting}
            >
              {subjectOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-bold text-win98-text mb-1">
              Message <span className="text-red-600">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full win98-border-sunken bg-white px-2 py-1 text-sm text-win98-text focus:outline-none resize-none"
              placeholder="Please describe your inquiry or concern in detail..."
              disabled={isSubmitting}
            />
          </div>

          {/* Confidentiality Notice */}
          <div className="win98-border-sunken bg-[#ffffcc] p-2">
            <p className="text-[10px] text-win98-text/80">
              <strong>Confidentiality Notice:</strong> All communications submitted through this portal
              are handled in accordance with N.E.C. privacy guidelines. Your information will only be
              shared with authorized HR personnel.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1 win98-border-raised bg-win98-surface text-sm text-win98-text hover:bg-win98-surface/80 active:win98-border-pressed"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1 win98-border-raised bg-win98-surface text-sm text-win98-text hover:bg-win98-surface/80 active:win98-border-pressed disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      <WindowStatusBar>
        <WindowStatusField className="flex-1">
          {statusMessage}
        </WindowStatusField>
      </WindowStatusBar>
    </Window>
  );
}
