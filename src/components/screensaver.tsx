"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface Bug {
  id: number;
  x: number;
  y: number;
  angle: number; // Direction in radians
  speed: number;
  size: number;
  legPhase: number; // For leg animation
  type: 'ant' | 'ladybug';
}

interface ScreensaverProps {
  onExit: () => void;
}

// Pixel art ant component that can rotate
function CrawlingAnt({ x, y, angle, size, legPhase }: { x: number; y: number; angle: number; size: number; legPhase: number }) {
  // Calculate leg offset for walking animation
  const legOffset = Math.sin(legPhase) * 2;

  // Convert movement angle to visual rotation so ant always faces forward
  // Movement direction is (sin(angle), cos(angle)), but ant SVG faces "up"
  // So we rotate by (π - angle) to align the ant's head with movement direction
  const visualRotation = Math.PI - angle;

  return (
    <svg
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        transform: `rotate(${visualRotation}rad)`,
        transformOrigin: 'center center',
        imageRendering: 'pixelated',
      }}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ant head */}
      <rect x="8" y="2" width="4" height="3" fill="#1a1a1a" />
      {/* Antennae */}
      <rect x="6" y="1" width="1" height="2" fill="#1a1a1a" />
      <rect x="13" y="1" width="1" height="2" fill="#1a1a1a" />
      <rect x="5" y="0" width="1" height="1" fill="#1a1a1a" />
      <rect x="14" y="0" width="1" height="1" fill="#1a1a1a" />
      {/* Thorax (middle body) */}
      <rect x="7" y="5" width="6" height="4" fill="#1a1a1a" />
      {/* Abdomen (back body) */}
      <rect x="6" y="9" width="8" height="5" fill="#1a1a1a" />
      <rect x="7" y="14" width="6" height="3" fill="#1a1a1a" />
      <rect x="8" y="17" width="4" height="2" fill="#1a1a1a" />
      {/* Left legs - animated */}
      <g style={{ transform: `translateX(${-legOffset}px)` }}>
        <rect x="4" y="5" width="3" height="1" fill="#1a1a1a" />
        <rect x="3" y="6" width="1" height="2" fill="#1a1a1a" />
        <rect x="4" y="8" width="3" height="1" fill="#1a1a1a" />
        <rect x="2" y="9" width="2" height="1" fill="#1a1a1a" />
        <rect x="4" y="11" width="2" height="1" fill="#1a1a1a" />
        <rect x="2" y="12" width="2" height="1" fill="#1a1a1a" />
        <rect x="1" y="13" width="1" height="2" fill="#1a1a1a" />
      </g>
      {/* Right legs - animated (opposite phase) */}
      <g style={{ transform: `translateX(${legOffset}px)` }}>
        <rect x="13" y="5" width="3" height="1" fill="#1a1a1a" />
        <rect x="16" y="6" width="1" height="2" fill="#1a1a1a" />
        <rect x="13" y="8" width="3" height="1" fill="#1a1a1a" />
        <rect x="16" y="9" width="2" height="1" fill="#1a1a1a" />
        <rect x="14" y="11" width="2" height="1" fill="#1a1a1a" />
        <rect x="16" y="12" width="2" height="1" fill="#1a1a1a" />
        <rect x="18" y="13" width="1" height="2" fill="#1a1a1a" />
      </g>
      {/* Eyes - slightly lighter */}
      <rect x="8" y="3" width="1" height="1" fill="#3a3a3a" />
      <rect x="11" y="3" width="1" height="1" fill="#3a3a3a" />
    </svg>
  );
}

// Pixel art ladybug component
function CrawlingLadybug({ x, y, angle, size, legPhase }: { x: number; y: number; angle: number; size: number; legPhase: number }) {
  const legOffset = Math.sin(legPhase) * 1.5;
  const visualRotation = Math.PI - angle;

  return (
    <svg
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        transform: `rotate(${visualRotation}rad)`,
        transformOrigin: 'center center',
        imageRendering: 'pixelated',
      }}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head - black */}
      <rect x="8" y="2" width="4" height="3" fill="#1a1a1a" />
      {/* Antennae */}
      <rect x="7" y="1" width="1" height="2" fill="#1a1a1a" />
      <rect x="12" y="1" width="1" height="2" fill="#1a1a1a" />
      <rect x="6" y="0" width="1" height="1" fill="#1a1a1a" />
      <rect x="13" y="0" width="1" height="1" fill="#1a1a1a" />
      {/* Body - red shell */}
      <rect x="5" y="5" width="10" height="12" fill="#cc2222" />
      <rect x="6" y="4" width="8" height="1" fill="#cc2222" />
      <rect x="6" y="17" width="8" height="1" fill="#cc2222" />
      {/* Center line - black */}
      <rect x="9" y="5" width="2" height="13" fill="#1a1a1a" />
      {/* Spots - black */}
      <rect x="6" y="7" width="2" height="2" fill="#1a1a1a" />
      <rect x="12" y="7" width="2" height="2" fill="#1a1a1a" />
      <rect x="7" y="12" width="2" height="2" fill="#1a1a1a" />
      <rect x="11" y="12" width="2" height="2" fill="#1a1a1a" />
      <rect x="6" y="15" width="2" height="2" fill="#1a1a1a" />
      <rect x="12" y="15" width="2" height="2" fill="#1a1a1a" />
      {/* Left legs - animated */}
      <g style={{ transform: `translateX(${-legOffset}px)` }}>
        <rect x="3" y="6" width="2" height="1" fill="#1a1a1a" />
        <rect x="2" y="7" width="1" height="2" fill="#1a1a1a" />
        <rect x="3" y="10" width="2" height="1" fill="#1a1a1a" />
        <rect x="2" y="11" width="1" height="2" fill="#1a1a1a" />
        <rect x="3" y="14" width="2" height="1" fill="#1a1a1a" />
        <rect x="2" y="15" width="1" height="2" fill="#1a1a1a" />
      </g>
      {/* Right legs - animated */}
      <g style={{ transform: `translateX(${legOffset}px)` }}>
        <rect x="15" y="6" width="2" height="1" fill="#1a1a1a" />
        <rect x="17" y="7" width="1" height="2" fill="#1a1a1a" />
        <rect x="15" y="10" width="2" height="1" fill="#1a1a1a" />
        <rect x="17" y="11" width="1" height="2" fill="#1a1a1a" />
        <rect x="15" y="14" width="2" height="1" fill="#1a1a1a" />
        <rect x="17" y="15" width="1" height="2" fill="#1a1a1a" />
      </g>
      {/* Eyes */}
      <rect x="8" y="3" width="1" height="1" fill="#3a3a3a" />
      <rect x="11" y="3" width="1" height="1" fill="#3a3a3a" />
    </svg>
  );
}

export function Screensaver({ onExit }: ScreensaverProps) {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const isExitingRef = useRef(false);

  // Initialize bugs on mount
  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setDimensions({ width, height });

    // Create 8-15 ants plus 1 ladybug
    const antCount = Math.floor(Math.random() * 8) + 8;
    const newBugs: Bug[] = [];

    // Add the ants
    for (let i = 0; i < antCount; i++) {
      newBugs.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        angle: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
        size: 30 + Math.random() * 30,
        legPhase: Math.random() * Math.PI * 2,
        type: 'ant',
      });
    }

    // Add one ladybug
    newBugs.push({
      id: antCount,
      x: Math.random() * width,
      y: Math.random() * height,
      angle: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 1.0, // Slightly slower
      size: 35 + Math.random() * 25, // 35-60px
      legPhase: Math.random() * Math.PI * 2,
      type: 'ladybug',
    });

    setBugs(newBugs);
  }, []);

  // Animation loop
  useEffect(() => {
    if (dimensions.width === 0) return;

    const animate = (time: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = time;
      }

      const deltaTime = (time - lastTimeRef.current) / 16; // Normalize to ~60fps
      lastTimeRef.current = time;

      setBugs(prevBugs => prevBugs.map(bug => {
        // Move bug in its current direction
        let newX = bug.x + Math.sin(bug.angle) * bug.speed * deltaTime;
        let newY = bug.y + Math.cos(bug.angle) * bug.speed * deltaTime;
        let newAngle = bug.angle;

        // Add slight random wandering
        newAngle += (Math.random() - 0.5) * 0.1;

        // Bounce off edges with some randomness
        const margin = bug.size;
        if (newX < -margin) {
          newX = -margin;
          newAngle = Math.PI * 2 - newAngle + (Math.random() - 0.5) * 0.5;
        } else if (newX > dimensions.width + margin) {
          newX = dimensions.width + margin;
          newAngle = Math.PI * 2 - newAngle + (Math.random() - 0.5) * 0.5;
        }

        if (newY < -margin) {
          newY = -margin;
          newAngle = Math.PI - newAngle + (Math.random() - 0.5) * 0.5;
        } else if (newY > dimensions.height + margin) {
          newY = dimensions.height + margin;
          newAngle = Math.PI - newAngle + (Math.random() - 0.5) * 0.5;
        }

        // Wrap angle to 0-2π
        newAngle = ((newAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);

        // Update leg animation phase
        const newLegPhase = bug.legPhase + bug.speed * 0.3 * deltaTime;

        return {
          ...bug,
          x: newX,
          y: newY,
          angle: newAngle,
          legPhase: newLegPhase,
        };
      }));

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);

  // Exit handler - triggered by any mouse movement or key press
  const handleExit = useCallback(() => {
    if (isExitingRef.current) return;
    isExitingRef.current = true;
    onExit();
  }, [onExit]);

  // Set up exit event listeners
  useEffect(() => {
    // Small delay before allowing exit to prevent accidental immediate close
    const timeout = setTimeout(() => {
      window.addEventListener('mousemove', handleExit);
      window.addEventListener('mousedown', handleExit);
      window.addEventListener('keydown', handleExit);
      window.addEventListener('touchstart', handleExit);
    }, 500);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', handleExit);
      window.removeEventListener('mousedown', handleExit);
      window.removeEventListener('keydown', handleExit);
      window.removeEventListener('touchstart', handleExit);
    };
  }, [handleExit]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="screensaver-container"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#5c4a3a',
        cursor: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Subtle texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
          pointerEvents: 'none',
        }}
      />

      {/* Render all bugs */}
      {bugs.map(bug => (
        bug.type === 'ladybug' ? (
          <CrawlingLadybug
            key={bug.id}
            x={bug.x}
            y={bug.y}
            angle={bug.angle}
            size={bug.size}
            legPhase={bug.legPhase}
          />
        ) : (
          <CrawlingAnt
            key={bug.id}
            x={bug.x}
            y={bug.y}
            angle={bug.angle}
            size={bug.size}
            legPhase={bug.legPhase}
          />
        )
      ))}

      {/* Hint text - fades in after a moment */}
      <div
        className="screensaver-hint"
        style={{
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          textAlign: 'center',
          color: 'rgba(35, 25, 20, 0.7)',
          fontSize: '11px',
          fontFamily: '"MS Sans Serif", "Segoe UI", Tahoma, sans-serif',
          letterSpacing: '1px',
          animation: 'fadeInHint 2s ease-in forwards',
          opacity: 0,
        }}
      >
        Move mouse or press any key to wake
      </div>
    </div>
  );
}
