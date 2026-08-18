"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { letterText } from "@/lib/data";

export default function HiddenLetter() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* brasa fixa — o mesmo sinal do herói e da timeline, aqui como easter egg */}
      <motion.button
        onClick={() => setOpen(true)}
        aria-label="Abrir carta escondida"
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-ember shadow-[0_0_18px_6px_rgba(198,84,29,0.5)] animate-flicker"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-xl">🕯️</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-night/90 px-6 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md border border-amber/30 bg-night-2 p-8 shadow-2xl"
            >
              <p className="mb-4 font-script text-2xl text-rose">
                uma carta escondida pra você
              </p>
              <p className="whitespace-pre-line font-body text-sm leading-relaxed text-cream/85">
                {letterText}
              </p>
              <button
                onClick={() => setOpen(false)}
                className="mt-6 font-body text-xs uppercase tracking-widest text-cream/50 hover:text-amber"
              >
                fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
