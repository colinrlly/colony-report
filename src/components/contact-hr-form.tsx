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
  | "feedback"
  | "bug"
  | "feature"
  | "question"
  | "compliment"
  | "collaboration";

const subjectOptions: { value: SubjectType; label: string }[] = [
  { value: "", label: "-- Select a Topic --" },
  { value: "feedback", label: "General Feedback" },
  { value: "bug", label: "Bug Report" },
  { value: "feature", label: "Feature Request" },
  { value: "question", label: "Question About the Project" },
  { value: "compliment", label: "Pay HR a Compliment" },
  { value: "collaboration", label: "Collaboration / External Inquiry" },
];

type RatingType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const ratingLabels: Record<RatingType, string> = {
  0: "Not rated",
  1: "Terrible",
  2: "Bad",
  3: "Meh",
  4: "Good",
  5: "Great",
  6: "Amazing!",
};

// Pixel art smiley faces as SVG components
function SmileyPartyHat({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-10 h-12 flex items-center justify-center ${selected ? 'win98-border-pressed bg-white' : 'win98-border-raised bg-win98-surface hover:bg-win98-surface/80'}`}
      title="Amazing!"
    >
      <svg width="24" height="32" viewBox="0 0 24 32" fill="none" style={{ imageRendering: "pixelated" }}>
        {/* Party hat */}
        <rect x="10" y="0" width="4" height="2" fill="#ff6b6b" />
        <rect x="8" y="2" width="8" height="2" fill="#ff6b6b" />
        <rect x="6" y="4" width="12" height="2" fill="#4ecdc4" />
        <rect x="4" y="6" width="16" height="2" fill="#ffe66d" />
        {/* Face - bright yellow */}
        <rect x="4" y="8" width="16" height="16" fill="#ffdd00" />
        {/* Big grin eyes (happy squint) */}
        <rect x="6" y="12" width="4" height="2" fill="#222" />
        <rect x="14" y="12" width="4" height="2" fill="#222" />
        {/* Big open grin */}
        <rect x="6" y="18" width="12" height="4" fill="#222" />
        <rect x="8" y="18" width="8" height="2" fill="#ff6b6b" />
      </svg>
    </button>
  );
}

function SmileyBigGrin({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-10 h-12 flex items-center justify-center ${selected ? 'win98-border-pressed bg-white' : 'win98-border-raised bg-win98-surface hover:bg-win98-surface/80'}`}
      title="Great"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ imageRendering: "pixelated" }}>
        {/* Face - yellow */}
        <rect x="4" y="4" width="16" height="16" fill="#ffdd00" />
        {/* Happy eyes */}
        <rect x="6" y="8" width="4" height="4" fill="#222" />
        <rect x="14" y="8" width="4" height="4" fill="#222" />
        {/* Wide smile */}
        <rect x="6" y="14" width="12" height="2" fill="#222" />
        <rect x="8" y="16" width="8" height="2" fill="#222" />
      </svg>
    </button>
  );
}

function SmileyHappy({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-10 h-12 flex items-center justify-center ${selected ? 'win98-border-pressed bg-white' : 'win98-border-raised bg-win98-surface hover:bg-win98-surface/80'}`}
      title="Good"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ imageRendering: "pixelated" }}>
        {/* Face - yellow */}
        <rect x="4" y="4" width="16" height="16" fill="#ffdd00" />
        {/* Eyes */}
        <rect x="6" y="8" width="4" height="4" fill="#222" />
        <rect x="14" y="8" width="4" height="4" fill="#222" />
        {/* Smile */}
        <rect x="6" y="14" width="2" height="2" fill="#222" />
        <rect x="8" y="16" width="8" height="2" fill="#222" />
        <rect x="16" y="14" width="2" height="2" fill="#222" />
      </svg>
    </button>
  );
}

function SmileyNeutral({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-10 h-12 flex items-center justify-center ${selected ? 'win98-border-pressed bg-white' : 'win98-border-raised bg-win98-surface hover:bg-win98-surface/80'}`}
      title="Meh"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ imageRendering: "pixelated" }}>
        {/* Face - pale yellow */}
        <rect x="4" y="4" width="16" height="16" fill="#f0d000" />
        {/* Eyes */}
        <rect x="6" y="8" width="4" height="4" fill="#222" />
        <rect x="14" y="8" width="4" height="4" fill="#222" />
        {/* Straight line mouth */}
        <rect x="6" y="14" width="12" height="2" fill="#222" />
      </svg>
    </button>
  );
}

function SmileySad({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-10 h-12 flex items-center justify-center ${selected ? 'win98-border-pressed bg-white' : 'win98-border-raised bg-win98-surface hover:bg-win98-surface/80'}`}
      title="Bad"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ imageRendering: "pixelated" }}>
        {/* Face - orange-yellow */}
        <rect x="4" y="4" width="16" height="16" fill="#ffaa00" />
        {/* Sad eyes */}
        <rect x="6" y="8" width="4" height="4" fill="#222" />
        <rect x="14" y="8" width="4" height="4" fill="#222" />
        {/* Frown */}
        <rect x="8" y="14" width="8" height="2" fill="#222" />
        <rect x="6" y="16" width="2" height="2" fill="#222" />
        <rect x="16" y="16" width="2" height="2" fill="#222" />
      </svg>
    </button>
  );
}

function SmileyCrying({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-10 h-12 flex items-center justify-center ${selected ? 'win98-border-pressed bg-white' : 'win98-border-raised bg-win98-surface hover:bg-win98-surface/80'}`}
      title="Terrible"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ imageRendering: "pixelated" }}>
        {/* Face - red */}
        <rect x="4" y="4" width="16" height="16" fill="#ff4444" />
        {/* Crying eyes */}
        <rect x="6" y="8" width="4" height="4" fill="#222" />
        <rect x="14" y="8" width="4" height="4" fill="#222" />
        {/* Tears */}
        <rect x="8" y="12" width="2" height="4" fill="#66ccff" />
        <rect x="14" y="12" width="2" height="4" fill="#66ccff" />
        {/* Open frown/wail */}
        <rect x="8" y="16" width="8" height="4" fill="#222" />
      </svg>
    </button>
  );
}

export function ContactHRForm({ onClose, onMinimize }: ContactHRFormProps) {
  const [employeeName, setEmployeeName] = useState("");
  const [replyEmail, setReplyEmail] = useState("");
  const [rating, setRating] = useState<RatingType>(0);
  const [subject, setSubject] = useState<SubjectType>("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("Ready");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!subject || !message) {
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
          access_key: "9e611e62-87a4-4e0a-bae9-80394d012683",
          subject: `[HR Contact Form] ${subjectLabel}`,
          from_name: "N.E.C. HR Portal",
          name: employeeName || "Anonymous",
          reply_to: replyEmail || "No email provided",
          experience_rating: ratingLabels[rating],
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
        setReplyEmail("");
        setRating(0);
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
    <Window className="w-[500px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col">
      <WindowTitleBar>
        <WindowTitle>Contact Human Resources</WindowTitle>
        <WindowControls onMinimize={onMinimize} onClose={onClose} showMaximize={false} />
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
          {/* Employee Name - Optional */}
          <div>
            <label className="block text-xs font-bold text-win98-text mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              className="w-full win98-border-sunken bg-white px-2 py-1 text-sm text-win98-text focus:outline-none"
              placeholder="You may remain anonymous - HR understands."
              disabled={isSubmitting}
            />
          </div>

          {/* Reply Email - Optional */}
          <div>
            <label className="block text-xs font-bold text-win98-text mb-1">
              Want a reply? Leave your email
            </label>
            <input
              type="email"
              value={replyEmail}
              onChange={(e) => setReplyEmail(e.target.value)}
              className="w-full win98-border-sunken bg-white px-2 py-1 text-sm text-win98-text focus:outline-none"
              placeholder="your.email@example.com (optional)"
              disabled={isSubmitting}
            />
          </div>

          {/* Experience Rating */}
          <div>
            <label className="block text-xs font-bold text-win98-text mb-1">
              Rate Your Experience
            </label>
            <div className="flex gap-1 items-end">
              <SmileyCrying selected={rating === 1} onClick={() => setRating(1)} />
              <SmileySad selected={rating === 2} onClick={() => setRating(2)} />
              <SmileyNeutral selected={rating === 3} onClick={() => setRating(3)} />
              <SmileyHappy selected={rating === 4} onClick={() => setRating(4)} />
              <SmileyBigGrin selected={rating === 5} onClick={() => setRating(5)} />
              <SmileyPartyHat selected={rating === 6} onClick={() => setRating(6)} />
              {rating > 0 && (
                <span className="ml-2 text-xs text-win98-text/70 self-center">{ratingLabels[rating]}</span>
              )}
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
