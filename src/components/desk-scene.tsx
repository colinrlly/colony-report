"use client";

import { useState } from "react";

interface DeskSceneProps {
  onEnter: () => void;
}

export function DeskScene({ onEnter }: DeskSceneProps) {
  const [isZooming, setIsZooming] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const handleScreenClick = () => {
    setIsZooming(true);
    setShowHint(false);
    // Wait for zoom animation to complete before transitioning
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  return (
    <div
      className={`desk-scene-container ${isZooming ? "zooming" : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#1a1a2e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999999,
        overflow: "hidden",
      }}
    >
      {/* Background gradient - can be replaced with room illustration */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, #2d2d44 0%, #1a1a2e 50%, #0f0f1a 100%)",
        }}
      />

      {/* Desk Scene Container - Replace this entire div with your illustration */}
      <div
        className="desk-illustration"
        style={{
          position: "relative",
          width: "min(90vw, 900px)",
          height: "min(80vh, 700px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        {/* ============================================
            PLACEHOLDER ILLUSTRATION
            Replace everything below with your artwork
            Keep the "screen-clickable-area" div positioned
            over where the monitor screen is in your illustration
            ============================================ */}

        {/* Monitor */}
        <div
          style={{
            position: "relative",
            width: "400px",
            height: "320px",
            marginBottom: "-20px",
            zIndex: 2,
          }}
        >
          {/* Monitor outer frame */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#c9c2b0",
              borderRadius: "12px",
              border: "3px solid #a39d8b",
              boxShadow: "inset 2px 2px 0 #e8e4d9, inset -2px -2px 0 #8b8579",
            }}
          />

          {/* Monitor bezel */}
          <div
            style={{
              position: "absolute",
              top: "15px",
              left: "15px",
              right: "15px",
              bottom: "50px",
              backgroundColor: "#1a1a1a",
              borderRadius: "4px",
              border: "2px solid #333",
            }}
          />

          {/* THE SCREEN - This is the clickable area */}
          <div
            className="screen-clickable-area"
            onClick={handleScreenClick}
            style={{
              position: "absolute",
              top: "25px",
              left: "25px",
              right: "25px",
              bottom: "60px",
              backgroundColor: "#008080",
              borderRadius: "2px",
              cursor: "pointer",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (!isZooming) {
                e.currentTarget.style.boxShadow = "0 0 30px rgba(0, 255, 255, 0.5)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Screen content preview */}
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(180deg, #008080 0%, #006666 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              {/* Mini preview of desktop */}
              <div
                style={{
                  width: "80%",
                  height: "70%",
                  backgroundColor: "rgba(0,0,0,0.2)",
                  borderRadius: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    color: "#ffffff",
                    fontSize: "14px",
                    fontFamily: "monospace",
                    textAlign: "center",
                    opacity: 0.8,
                  }}
                >
                  Colony Report
                </span>
              </div>

              {/* Scanlines effect */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
                  pointerEvents: "none",
                }}
              />

              {/* Screen glow */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  boxShadow: "inset 0 0 50px rgba(0, 255, 255, 0.1)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* Monitor buttons */}
          <div
            style={{
              position: "absolute",
              bottom: "15px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#4a4",
                boxShadow: "0 0 4px #4a4",
              }}
            />
            <div
              style={{
                width: "20px",
                height: "8px",
                borderRadius: "2px",
                backgroundColor: "#666",
              }}
            />
          </div>

          {/* Monitor stand neck */}
          <div
            style={{
              position: "absolute",
              bottom: "-40px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "60px",
              height: "40px",
              backgroundColor: "#b8b2a0",
              border: "2px solid #a39d8b",
            }}
          />
        </div>

        {/* Monitor stand base */}
        <div
          style={{
            width: "150px",
            height: "20px",
            backgroundColor: "#c9c2b0",
            borderRadius: "4px",
            border: "2px solid #a39d8b",
            marginBottom: "10px",
            zIndex: 1,
          }}
        />

        {/* Keyboard */}
        <div
          style={{
            width: "300px",
            height: "80px",
            backgroundColor: "#d4cfc0",
            borderRadius: "4px",
            border: "2px solid #a39d8b",
            boxShadow: "inset 2px 2px 0 #e8e4d9, inset -2px -2px 0 #8b8579",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          {/* Key rows */}
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: "flex",
                  gap: "3px",
                  paddingLeft: i * 5 + "px",
                }}
              >
                {[...Array(12 - i)].map((_, j) => (
                  <div
                    key={j}
                    style={{
                      flex: i === 3 && j === 5 ? 4 : 1,
                      backgroundColor: "#f5f0e6",
                      borderRadius: "2px",
                      border: "1px solid #bbb",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Desk surface */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "-20%",
            right: "-20%",
            height: "120px",
            backgroundColor: "#8b5a2b",
            borderTop: "4px solid #6b4423",
            boxShadow: "0 -2px 10px rgba(0,0,0,0.3)",
          }}
        >
          {/* Wood grain texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.3,
              background: "repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 22px)",
            }}
          />
        </div>

        {/* ============================================
            END PLACEHOLDER ILLUSTRATION
            ============================================ */}
      </div>

      {/* Click hint */}
      {showHint && !isZooming && (
        <div
          className="click-hint"
          style={{
            position: "absolute",
            bottom: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#ffffff",
            fontSize: "16px",
            fontFamily: "monospace",
            opacity: 0,
            animation: "fadeInHint 2s ease-in forwards",
            animationDelay: "1s",
            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          Click the screen to enter
        </div>
      )}

      {/* Zoom overlay - expands from screen position */}
      {isZooming && (
        <div
          className="zoom-overlay"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#008080",
            animation: "zoomIntoScreen 1.2s ease-in-out forwards",
            zIndex: 1000000,
          }}
        >
          {/* Scanlines during zoom */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
              pointerEvents: "none",
            }}
          />
        </div>
      )}
    </div>
  );
}
