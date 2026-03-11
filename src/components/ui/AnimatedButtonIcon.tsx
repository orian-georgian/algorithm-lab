"use client";

import { motion, useReducedMotion } from "framer-motion";

export type AnimatedButtonIconVariant =
  | "arrowRight"
  | "spark"
  | "send"
  | "chevronLeft"
  | "chevronRight"
  | "close";

type AnimatedButtonIconProps = {
  variant: AnimatedButtonIconVariant;
  className?: string;
};

const transitionByVariant: Record<
  AnimatedButtonIconVariant,
  { duration: number; ease: "easeInOut"; repeat: number }
> = {
  arrowRight: {
    duration: 1.05,
    ease: "easeInOut",
    repeat: Number.POSITIVE_INFINITY,
  },
  spark: {
    duration: 1.4,
    ease: "easeInOut",
    repeat: Number.POSITIVE_INFINITY,
  },
  send: {
    duration: 1.2,
    ease: "easeInOut",
    repeat: Number.POSITIVE_INFINITY,
  },
  chevronLeft: {
    duration: 1,
    ease: "easeInOut",
    repeat: Number.POSITIVE_INFINITY,
  },
  chevronRight: {
    duration: 1,
    ease: "easeInOut",
    repeat: Number.POSITIVE_INFINITY,
  },
  close: {
    duration: 1.6,
    ease: "easeInOut",
    repeat: Number.POSITIVE_INFINITY,
  },
};

export function AnimatedButtonIcon({
  variant,
  className,
}: AnimatedButtonIconProps) {
  const prefersReducedMotion = useReducedMotion();
  const animate =
    prefersReducedMotion
      ? undefined
      : variant === "arrowRight"
        ? { x: [0, 3, 0] }
        : variant === "spark"
          ? { rotate: [0, 12, 0], scale: [1, 1.08, 1] }
          : variant === "send"
            ? { x: [0, 2, 0], rotate: [0, -8, 0] }
            : variant === "chevronLeft"
              ? { x: [0, -2, 0] }
              : variant === "chevronRight"
                ? { x: [0, 2, 0] }
                : { rotate: [0, 90, 0] };

  return (
    <motion.span
      aria-hidden
      className={["inline-flex items-center justify-center", className ?? ""].join(
        " ",
      )}
      animate={animate}
      transition={transitionByVariant[variant]}
    >
      {variant === "arrowRight" ? (
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
          <path
            d="M3 8h9M8.8 4.8L13 8l-4.2 3.2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
      {variant === "spark" ? (
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
          <path
            d="M8 2.2v2.1M8 11.7v2.1M2.2 8h2.1M11.7 8h2.1M4.1 4.1l1.5 1.5M10.4 10.4l1.5 1.5M11.9 4.1l-1.5 1.5M5.6 10.4l-1.5 1.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ) : null}
      {variant === "send" ? (
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
          <path
            d="M2.5 7.7 13.7 2.5l-3.9 11.2-2.3-3.1-3.1-2.3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
      {variant === "chevronLeft" ? (
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
          <path
            d="M9.8 3.2L5.2 8l4.6 4.8"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
      {variant === "chevronRight" ? (
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
          <path
            d="M6.2 3.2L10.8 8l-4.6 4.8"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
      {variant === "close" ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M6 6 18 18M18 6 6 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ) : null}
    </motion.span>
  );
}
