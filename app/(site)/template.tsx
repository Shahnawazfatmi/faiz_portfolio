"use client";

import { motion, useReducedMotion } from "motion/react";

// Re-mounts on every navigation, giving each page a soft entrance.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      // Opacity/translate only: a filter here would break descendants' backdrop-filter glass.
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
