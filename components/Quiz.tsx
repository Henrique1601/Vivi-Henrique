"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// placeholder — troque pelas perguntas reais sobre vocês
type Question = {
  q: string;
  options: string[];
  correct: number;
};

const questions: Question[] = [
  {
    q: "Onde foi o nosso primeiro encontro?",
    options: ["No cinema", "No churrasco", "Na praia", "No shopping"],
    correct: 1,
  },
  {
    q: "Em que mês dissemos 'eu te amo' pela primeira vez?",
    options: ["Outubro", "Novembro", "Dezembro", "Janeiro"],
    correct: 2,
  },
  {
    q: "Pergunta 3 (edite aqui)",
    options: ["Opção A", "Opção B", "Opção C", "Opção D"],
    correct: 0,
  },
];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const finished = step >= questions.length;

  function answer(index: number) {
    if (selected !== null) return;
    setSelected(index);
    if (index === questions[step].correct) setScore((s) => s + 1);
    setTimeout(() => {
      setSelected(null);
      setStep((s) => s + 1);
    }, 900);
  }

  function restart() {
    setStep(0);
    setScore(0);
    setSelected(null);
  }

  return (
    <section className="mx-auto max-w-xl px-6 py-32 text-center">
      <p className="font-script text-2xl text-rose">será que ela sabe?</p>
      <h2 className="mt-2 font-display text-3xl text-cream sm:text-4xl">
        O quanto você me conhece
      </h2>

      <div className="mt-12 min-h-[260px] border border-cream/10 bg-night-2 p-8">
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <p className="mb-6 font-body text-xs uppercase tracking-widest text-amber/70">
                pergunta {step + 1} de {questions.length}
              </p>
              <p className="mb-8 font-display text-xl text-cream">
                {questions[step].q}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {questions[step].options.map((opt, i) => {
                  const isCorrect = selected !== null && i === questions[step].correct;
                  const isWrong = selected === i && i !== questions[step].correct;
                  return (
                    <button
                      key={opt}
                      onClick={() => answer(i)}
                      className={`border px-4 py-3 font-body text-sm transition-colors ${
                        isCorrect
                          ? "border-amber bg-amber/10 text-amber"
                          : isWrong
                          ? "border-wine bg-wine/20 text-rose"
                          : "border-cream/15 text-cream/80 hover:border-cream/40"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex h-full flex-col items-center justify-center gap-4"
            >
              <p className="font-display text-2xl text-cream">
                Você acertou {score} de {questions.length}!
              </p>
              <p className="font-body text-sm text-cream/60">
                {score === questions.length
                  ? "Prestou atenção em cada detalhe 💛"
                  : "Ainda temos muita história pra construir juntos."}
              </p>
              <button
                onClick={restart}
                className="mt-2 border border-cream/20 px-5 py-2 font-body text-xs uppercase tracking-widest text-cream/70 hover:border-amber hover:text-amber"
              >
                jogar de novo
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
