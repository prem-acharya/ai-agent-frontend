"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Shape {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

export default function FloatingShapes() {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    const generateShapes = () => {
      const newShapes: Shape[] = [];
      const count = window.innerWidth < 768 ? 4 : 8;

      for (let i = 0; i < count; i++) {
        newShapes.push({
          id: i,
          size: Math.random() * 200 + 50,
          x: Math.random() * 100,
          y: Math.random() * 100,
          duration: Math.random() * 20 + 15,
          delay: Math.random() * 5,
        });
      }

      setShapes(newShapes);
    };

    generateShapes();
    window.addEventListener("resize", generateShapes);

    return () => {
      window.removeEventListener("resize", generateShapes);
    };
  }, []);

  return (
    <div className="floating-shapes">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="shape"
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            opacity: 0.3,
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -30, 20, -10, 0],
            rotate: [0, 10, -10, 5, 0],
            borderRadius: [
              "30% 70% 70% 30% / 30% 30% 70% 70%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 70% 70% 30% / 30% 30% 70% 70%",
              "50% 50% 50% 50% / 50% 50% 50% 50%",
              "30% 70% 70% 30% / 30% 30% 70% 70%",
            ],
          }}
          transition={{
            duration: shape.duration,
            ease: "easeInOut",
            repeat: Infinity,
            delay: shape.delay,
          }}
        />
      ))}
    </div>
  );
}
