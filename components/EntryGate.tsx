"use client";

import { motion } from "framer-motion";
import { couple } from "@/lib/data";

// os navegadores bloqueiam áudio automático sem um clique do usuário —
// essa "porta de entrada" serve exatamente pra isso: o toque aqui já
// conta como interação e libera a playlist pra tocar assim que entra
export default function EntryGate({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-6 bg-night px-6 text-center"
    >
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="h-3 w-3 rounded-full bg-ember shadow-[0_0_20px_8px_rgba(198,84,29,0.55)] animate-flicker"
      />
      <p className="font-script text-2xl text-rose">
        {couple.him} & {couple.her}
      </p>
      <motion.button
        onClick={onEnter}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="border border-amber/50 bg-amber/5 px-7 py-3.5 font-body text-xs uppercase tracking-widest text-amber shadow-[0_0_24px_rgba(198,84,29,0.15)] transition-colors hover:border-amber hover:bg-amber/15"
      >
        toque para começar
      </motion.button>
      <p className="font-body text-[11px] tracking-wide text-cream/60">
        com música ❤️
      </p>
    </motion.div>
  );
}
