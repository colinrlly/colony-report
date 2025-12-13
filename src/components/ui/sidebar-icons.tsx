"use client";

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

export function BeeIcon() {
  return (
    <img
      src="/images/bee icon.png"
      alt="Bee"
      width="62"
      height="62"
      style={{ imageRendering: "pixelated", objectFit: "contain" }}
    />
  );
}

export function SnailIcon() {
  return (
    <img
      src="/images/snail icon.png"
      alt="Snail"
      width="58"
      height="58"
      style={{ imageRendering: "pixelated", objectFit: "contain" }}
    />
  );
}

export function LadybugIcon() {
  return (
    <img
      src="/images/ladybug icon.png"
      alt="Ladybug"
      width="68"
      height="68"
      style={{ imageRendering: "pixelated", objectFit: "contain" }}
    />
  );
}

export function HandIcon() {
  return (
    <img
      src="/images/hand icon.png"
      alt="Hand"
      width="54"
      height="54"
      style={{ imageRendering: "pixelated", objectFit: "contain" }}
    />
  );
}

export function ApricotIcon() {
  return (
    <img
      src="/images/fruit icon.png"
      alt="Apricot"
      width="76"
      height="76"
      style={{ imageRendering: "pixelated", objectFit: "contain" }}
    />
  );
}

export function CactusIcon() {
  return (
    <img
      src="/images/cactus icon.png"
      alt="Cactus"
      width="64"
      height="64"
      style={{ imageRendering: "pixelated", objectFit: "contain" }}
    />
  );
}

export function DandelionIcon() {
  return (
    <img
      src="/images/dandelion icon.png"
      alt="Dandelion"
      width="62"
      height="62"
      style={{ imageRendering: "pixelated", objectFit: "contain" }}
    />
  );
}

export function FrogIcon() {
  return (
    <img
      src="/images/frog icon.png"
      alt="Frog"
      width="70"
      height="70"
      style={{ imageRendering: "pixelated", objectFit: "contain" }}
    />
  );
}

export function SandwichIcon() {
  return (
    <img
      src="/images/sandwich icon.png"
      alt="Sandwich"
      width="62"
      height="62"
      style={{ imageRendering: "pixelated", objectFit: "contain" }}
    />
  );
}

export function SidebarIcon({ icon }: { icon: SidebarIconType }) {
  switch (icon) {
    case "bee":
      return <BeeIcon />;
    case "snail":
      return <SnailIcon />;
    case "ladybug":
      return <LadybugIcon />;
    case "hand":
      return <HandIcon />;
    case "apricot":
      return <ApricotIcon />;
    case "cactus":
      return <CactusIcon />;
    case "dandelion":
      return <DandelionIcon />;
    case "frog":
      return <FrogIcon />;
    case "sandwich":
      return <SandwichIcon />;
    default:
      return <BeeIcon />;
  }
}
