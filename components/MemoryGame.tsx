"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { galleryPhotos } from "@/lib/data";

type Card = {
  id: number;
  src: string;
  matched: boolean;
};

function createDeck(): Card[] {
  const chosen = galleryPhotos.slice(0, 6);
  const doubled = [...chosen, ...chosen];
  for (let i = doubled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }
  return doubled.map((src, id) => ({ id, src, matched: false }));
}

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setCards(createDeck());
  }, []);

  function resetGame() {
    setCards(createDeck());
    setFlipped([]);
    setMoves(0);
    setLocked(false);
  }

  function handleFlip(index: number) {
    if (locked || flipped.includes(index) || cards[index]?.matched) return;

    const nextFlipped = [...flipped, index];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = nextFlipped;
      if (cards[a].src === cards[b].src) {
        setCards((prev) =>
          prev.map((c, idx) =>
            idx === a || idx === b ? { ...c, matched: true } : c
          )
        );
        setFlipped([]);
      } else {
        setLocked(true);
        setTimeout(() => {
          setFlipped([]);
          setLocked(false);
        }, 750);
      }
    }
  }

  const allMatched = cards.length > 0 && cards.every((c) => c.matched);

  return (
    <section className="mx-auto max-w-3xl px-6 py-28 text-center">
      <p className="font-script text-2xl text-rose">para se divertir</p>
      <h2 className="mt-2 font-display text-3xl text-cream sm:text-4xl">
        Jogo da Memória
      </h2>
      <p className="mt-3 font-body text-xs uppercase tracking-widest text-cream/60">
        Jogadas: {moves}
      </p>

      <div className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
        {cards.map((card, i) => {
          const isOpen = flipped.includes(i) || card.matched;
          return (
            <motion.button
              key={card.id}
              type="button"
              onClick={() => handleFlip(i)}
              whileTap={{ scale: 0.96 }}
              className={`relative aspect-square overflow-hidden border transition-colors ${
                card.matched
                  ? "border-amber/60 opacity-90"
                  : "border-cream/15 bg-night-2 hover:border-amber/50"
              }`}
            >
              {isOpen ? (
                <Image
                  src={card.src}
                  alt="Carta de memória"
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center font-script text-2xl text-amber/70">
                  ♥
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {allMatched && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 border border-amber/30 bg-night-2 p-6"
        >
          <p className="font-script text-2xl text-amber">
            Você completou em {moves} jogadas! ❤️
          </p>
          <p className="mt-2 font-body text-sm text-cream/75">
            Mas a melhor memória de todas continua sendo a que estamos
            construindo juntos.
          </p>
          <button
            type="button"
            onClick={resetGame}
            className="mt-4 border border-amber/40 px-5 py-2 font-body text-xs uppercase tracking-widest text-amber hover:bg-amber/10"
          >
            Jogar de novo
          </button>
        </motion.div>
      )}
    </section>
  );
}
