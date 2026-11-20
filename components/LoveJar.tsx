"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reasons = [
  "Pelo seu sorriso que ilumina qualquer lugar.",
  "Porque até ir ao Assaí com você vira um programa especial.",
  "Pelos seus conselhos que sempre me colocam no caminho certo.",
  "Pelo jeito que você me olha quando estamos juntos.",
  "Porque você faz meus olhos brilharem todos os dias.",
  "Pela sua força e pelo carinho que você tem comigo.",
  "Porque cada momento ao seu lado passa rápido demais.",
  "Pelas nossas conversas sem hora para acabar.",
  "Porque com você eu posso ser exatamente quem eu sou.",
  "Pelo seu abraço, que é o meu lugar favorito no mundo.",
  "Porque até nossas brigas nos ensinam a crescer juntos.",
  "Pela paz que eu sinto quando estou do seu lado.",
  "Porque você transforma dias comuns em memórias inesquecíveis.",
  "Pelo seu jeito único de cuidar de quem você ama.",
  "Porque 8 meses com você parecem só o começo de uma vida inteira.",
];

export default function LoveJar() {
  const [index, setIndex] = useState<number | null>(null);

  function drawReason() {
    let next = Math.floor(Math.random() * reasons.length);
    if (next === index && reasons.length > 1) {
      next = (next + 1) % reasons.length;
    }
    setIndex(next);
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-28 text-center">
      <p className="font-script text-2xl text-rose">um bilhetinho por vez</p>
      <h2 className="mt-2 font-display text-3xl text-cream sm:text-4xl">
        Pote de Motivos
      </h2>
      <p className="mt-3 font-body text-sm text-cream/60">
        Clique no pote para sortear um motivo pelo qual eu te amo
      </p>

      <div className="mt-10 flex flex-col items-center gap-8">
        <motion.button
          type="button"
          onClick={drawReason}
          whileHover={{ scale: 1.05, rotate: [-1, 1, 0] }}
          whileTap={{ scale: 0.95 }}
          className="border border-amber/40 bg-night-2 px-8 py-4 font-body text-xs uppercase tracking-widest text-amber shadow-[0_0_25px_rgba(198,84,29,0.18)] transition hover:border-amber hover:bg-amber/10"
        >
          ✨ Puxar um motivo
        </motion.button>

        <div className="min-h-[120px] w-full max-w-lg">
          <AnimatePresence mode="wait">
            {index !== null && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="border border-amber/25 bg-[#f6ecdd] px-8 py-7 text-night shadow-xl"
              >
                <p className="font-script text-2xl leading-relaxed text-night/90">
                  “{reasons[index]}”
                </p>
                <p className="mt-3 font-body text-[11px] uppercase tracking-widest text-wine/70">
                  motivo #{index + 1}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
