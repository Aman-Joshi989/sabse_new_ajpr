"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, hsl(var(--primary)), #3b82f6, #8b5cf6)",
        boxShadow: "0 0 10px #3b82f6",
      }}
    />
  );
}
