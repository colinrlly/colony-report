"use client";

import { CSSProperties } from "react";

export type SidebarIconType =
  | "bee"
  | "snail"
  | "ladybug"
  | "hand"
  | "apricot"
  | "cactus"
  | "dandelion"
  | "frog"
  | "sandwich";

const ICON_STYLE: CSSProperties = {
  imageRendering: "pixelated",
  objectFit: "contain",
};

interface IconConfig {
  src: string;
  alt: string;
  size: number;
  width?: number;
}

const ICON_CONFIG: Record<SidebarIconType, IconConfig> = {
  bee: { src: "/images/bee icon.png", alt: "Bee", size: 62 },
  snail: { src: "/images/snail icon.png", alt: "Snail", size: 58 },
  ladybug: { src: "/images/ladybug icon.png", alt: "Ladybug", size: 68 },
  hand: { src: "/images/hand icon.png", alt: "Hand", size: 54 },
  apricot: { src: "/images/fruit icon.png", alt: "Apricot", size: 76 },
  cactus: { src: "/images/cactus icon.png", alt: "Cactus", size: 64, width: 70 },
  dandelion: { src: "/images/dandelion icon.png", alt: "Dandelion", size: 62 },
  frog: { src: "/images/frog icon.png", alt: "Frog", size: 70 },
  sandwich: { src: "/images/sandwich icon.png", alt: "Sandwich", size: 62 },
};

function PixelIcon({ type }: { type: SidebarIconType }) {
  const config = ICON_CONFIG[type];
  return (
    <img
      src={config.src}
      alt={config.alt}
      width={config.width ?? config.size}
      height={config.size}
      style={ICON_STYLE}
    />
  );
}

export function BeeIcon() {
  return <PixelIcon type="bee" />;
}

export function SnailIcon() {
  return <PixelIcon type="snail" />;
}

export function LadybugIcon() {
  return <PixelIcon type="ladybug" />;
}

export function HandIcon() {
  return <PixelIcon type="hand" />;
}

export function ApricotIcon() {
  return <PixelIcon type="apricot" />;
}

export function CactusIcon() {
  return <PixelIcon type="cactus" />;
}

export function DandelionIcon() {
  return <PixelIcon type="dandelion" />;
}

export function FrogIcon() {
  return <PixelIcon type="frog" />;
}

export function SandwichIcon() {
  return <PixelIcon type="sandwich" />;
}

export function SidebarIcon({ icon }: { icon: SidebarIconType }) {
  return <PixelIcon type={icon} />;
}
