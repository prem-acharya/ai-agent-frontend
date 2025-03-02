"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function GlowEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="glow-effect"
      animate={{
        x: mousePosition.x - 75,
        y: mousePosition.y - 75,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    />
  );
}
