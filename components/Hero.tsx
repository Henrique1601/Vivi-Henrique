"use client";

import { motion } from "framer-motion";
import { couple, relationshipStart } from "@/lib/data";

export default function Hero() {
  const startLabel = relationshipStart.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* brasa única — o sinal da chama que vai crescer ao longo do site */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="mb-8 h-3 w-3 rounded-full bg-ember shadow-[0_0_20px_8px_rgba(198,84,29,0.55)] animate-flicker"
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="font-script text-2xl text-rose"
      >
        uma história que começou numa brasa
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.9 }}
        className="mt-3 font-display text-5xl font-medium leading-tight text-cream sm:text-6xl md:text-7xl"
      >
        {couple.him} <span className="text-amber">&</span> {couple.her}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-6 max-w-md font-body text-sm uppercase tracking-[0.25em] text-cream/60"
      >
        juntos desde {startLabel}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-cream/50"
      >
        <span className="font-body text-xs uppercase tracking-widest">
          role para ver nossa história
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="text-lg"
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
