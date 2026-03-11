"use client";

import type { CSSProperties } from "react";

type BitePosition = "topRight" | "rightCenter" | "leftCenter";

type ToothConfig = {
  x: number;
  y: number;
  size: number;
  rounded?: boolean;
  className?: string;
  style?: CSSProperties;
};

type HeroBiteMarksProps = {
  position?: BitePosition;
  teeth?: ToothConfig[];
  className?: string;
  style?: CSSProperties;
  toothClassName?: string;
  toothSize?: string;
  offsetX?: string;
  offsetY?: string;
  zIndex?: number;
};

const PRESETS: Record<
  BitePosition,
  {
    className: string;
    style: CSSProperties;
    teeth: ToothConfig[];
  }
> = {
  topRight: {
    className: "pointer-events-none absolute z-[99]",
    style: {
      "--tooth-size": "clamp(26px, 6.4vw, 54px)",
      top: "calc(var(--tooth-size) * -0.42)",
      right: "calc(var(--tooth-size) * 1)",
      width: "calc(var(--tooth-size) * 4.4)",
      height: "calc(var(--tooth-size) * 3.3)",
    } as CSSProperties,
    teeth: [
      { x: 0, y: -0.333, size: 1 },
      { x: 0.667, y: 0, size: 1 },
      { x: 1.333, y: 0, size: 1 },
      { x: 2, y: -0.333, size: 1 },
      { x: 0.667, y: -1, size: 1.667, rounded: false },
    ],
  },
  rightCenter: {
    className: "pointer-events-none absolute z-[99]",
    style: {
      "--tooth-size": "clamp(24px, 5.8vw, 52px)",
      top: "30%",
      right: "calc(var(--tooth-size) * -2.2)",
      width: "calc(var(--tooth-size) * 3.2)",
      height: "calc(var(--tooth-size) * 4.2)",
      transform: "translateY(-40%)",
    } as CSSProperties,
    teeth: [
      { x: 0.667, y: -0.417, size: 1 },
      { x: 0.417, y: 0.167, size: 1 },
      { x: 0.417, y: 0.833, size: 1 },
      { x: 0.667, y: 1.417, size: 1 },
      { x: 1, y: 0.167, size: 1.667, rounded: false },
    ],
  },
  leftCenter: {
    className: "pointer-events-none absolute z-[99]",
    style: {
      "--tooth-size": "clamp(24px, 5.8vw, 52px)",
      top: "15%",
      left: "calc(var(--tooth-size) * -1.45)",
      width: "calc(var(--tooth-size) * 3.2)",
      height: "calc(var(--tooth-size) * 4.2)",
      transform: "translateY(-40%)",
    } as CSSProperties,
    teeth: [
      { x: 0, y: 0.583, size: 1.667, rounded: false },
      { x: 0.833, y: 0, size: 1 },
      { x: 1.167, y: 0.667, size: 1 },
      { x: 1.167, y: 1.333, size: 1 },
      { x: 0.833, y: 2, size: 1 },
    ],
  },
};

export function HeroBiteMarks({
  position = "topRight",
  teeth,
  className,
  style,
  toothClassName = "bg-clinic-white",
  toothSize,
  offsetX,
  offsetY,
  zIndex,
}: HeroBiteMarksProps) {
  const preset = PRESETS[position];
  const wrapperClassName = `${preset.className} ${className ?? ""}`.trim();
  const baseTransform = preset.style.transform
    ? String(preset.style.transform)
    : "";
  const translateTransform =
    offsetX || offsetY
      ? ` translate(${offsetX ?? "0px"}, ${offsetY ?? "0px"})`
      : "";

  const wrapperStyle = {
    ...preset.style,
    ...(toothSize ? ({ "--tooth-size": toothSize } as CSSProperties) : {}),
    ...(zIndex !== undefined ? ({ zIndex } as CSSProperties) : {}),
    ...(baseTransform || translateTransform
      ? ({
          transform: `${baseTransform}${translateTransform}`.trim(),
        } as CSSProperties)
      : {}),
    ...style,
  };
  const finalTeeth = teeth ?? preset.teeth;

  return (
    <div aria-hidden className={wrapperClassName} style={wrapperStyle}>
      {finalTeeth.map((tooth, index) => (
        <div
          key={`${position}-${index}`}
          className={`absolute ${tooth.rounded === false ? "" : "rounded-full"} ${toothClassName} ${tooth.className ?? ""}`.trim()}
          style={{
            left: `calc(var(--tooth-size) * ${tooth.x})`,
            top: `calc(var(--tooth-size) * ${tooth.y})`,
            width: `calc(var(--tooth-size) * ${tooth.size})`,
            height: `calc(var(--tooth-size) * ${tooth.size})`,
            ...tooth.style,
          }}
        />
      ))}
    </div>
  );
}
