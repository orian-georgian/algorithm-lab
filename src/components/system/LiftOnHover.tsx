"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function LiftOnHover({ children }: { children: ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}
