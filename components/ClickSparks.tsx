"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Spark = {
  id: number;
  x: number;
  y: number;
  symbol: string;
};

const symbols = ["♥", "✨", "🕯️"];

export default function ClickSparks() {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    let counter = 0;
    const onPointerDown = (e: PointerEvent) => {
      const id = ++counter;
      const symbol = symbols[id % symbols.length];
      setSparks((prev) => [
        ...prev.slice(-12),
        { id, x: e.clientX, y: e.clientY, symbol },
      ]);
      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id !== id));
      }, 900);
    };

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      <AnimatePresence>
        {sparks.map((s) => (
          <motion.span
            key={s.id}
            initial={{ opacity: 0.9, scale: 0.6, x: s.x - 8, y: s.y - 8 }}
            animate={{ opacity: 0, scale: 1.25, y: s.y - 56 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="absolute text-sm text-amber"
          >
            {s.symbol}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
