"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type SectionSeparatorProps = {
  icon?: ReactNode;
  className?: string;
  speed?: number;
};

const defaultIcon = (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-6 w-6 text-clinic-teal-700"
    fill="currentColor"
  >
    <path d="M12 2.5l1.8 4.7 4.7 1.8-4.7 1.8L12 15.5l-1.8-4.7L5.5 9l4.7-1.8L12 2.5z" />
  </svg>
);

export function SectionSeparator({
  icon,
  className,
  speed = 2.6,
}: SectionSeparatorProps) {
  const duration = Math.max(0.6, speed);

  return (
    <div
      className={[
        "flex items-center justify-center py-6 text-clinic-teal-700",
        className ?? "",
      ].join(" ")}
    >
      <motion.div
        animate={{ y: [0, -6, 0], opacity: [0.7, 1, 0.7] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {icon ?? defaultIcon}
      </motion.div>
    </div>
  );
}
