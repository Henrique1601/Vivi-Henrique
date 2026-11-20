"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { galleryPhotos, couple } from "@/lib/data";

type AlbumSpread = {
  leftPhoto: string;
  rightPhoto: string | null;
  captionLeft: string;
  captionRight: string;
  pageNumber: number;
};

const captions = [
  "Cada momento ao seu lado vira meu lugar favorito.",
  "Sorrisos que não cabem em palavras.",
  "Nosso jeito leve de transformar rotina em memória.",
  "O tempo passa voando quando estou com você.",
  "Pequenos instantes que valem uma vida inteira.",
  "Sempre nós dois, do nosso jeito.",
  "Onde há você, há paz e alegria.",
  "Mais um capítulo da nossa história.",
  "Olhar pra você e ter certeza de tudo.",
  "O melhor ainda está por vir.",
  "Cada foto guarda um pedaço do que sentimos.",
  "8 meses de muitos que ainda vamos viver.",
  "Você faz meus olhos brilharem todos os dias.",
];

// Agrupa as fotos em páginas duplas (esquerda + direita)
const spreads: AlbumSpread[] = [];
for (let i = 0; i < galleryPhotos.length; i += 2) {
  spreads.push({
    leftPhoto: galleryPhotos[i],
    rightPhoto: galleryPhotos[i + 1] ?? null,
    captionLeft: captions[i % captions.length],
    captionRight: captions[(i + 1) % captions.length],
    pageNumber: Math.floor(i / 2) + 1,
  });
}

export default function PhotoAlbum() {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const totalSpreads = spreads.length;
  const spread = spreads[currentSpread];

  function goNext() {
    if (currentSpread < totalSpreads - 1) {
      setDirection(1);
      setCurrentSpread((s) => s + 1);
    }
  }

  function goPrev() {
    if (currentSpread > 0) {
      setDirection(-1);
      setCurrentSpread((s) => s - 1);
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-32">
      <div className="mb-14 text-center">
        <p className="font-script text-2xl text-rose">folheando memórias</p>
        <h2 className="mt-2 font-display text-3xl text-cream sm:text-4xl">
          Nosso Álbum
        </h2>
        <p className="mt-3 font-body text-xs uppercase tracking-widest text-cream/50">
          Clique nas setas ou nas bordas para virar a página
        </p>
      </div>

      {/* Palco 3D do Álbum */}
      <div
        className="relative mx-auto max-w-4xl"
        style={{ perspective: "1800px" }}
      >
        {/* Capa / Moldura do Livro */}
        <div className="relative rounded-sm border border-amber/30 bg-gradient-to-b from-[#2b1a15] to-[#1a100d] p-3 shadow-[0_25px_70px_rgba(0,0,0,0.75)] sm:p-5">
          {/* Lombada central decorativa */}
          <div className="pointer-events-none absolute inset-y-3 left-1/2 z-20 hidden w-6 -translate-x-1/2 bg-gradient-to-r from-black/50 via-amber/10 to-black/50 md:block" />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSpread}
              custom={direction}
              initial={{
                rotateY: direction === 1 ? 65 : -65,
                opacity: 0.25,
                scale: 0.97,
              }}
              animate={{
                rotateY: 0,
                opacity: 1,
                scale: 1,
              }}
              exit={{
                rotateY: direction === 1 ? -65 : 65,
                opacity: 0.25,
                scale: 0.97,
              }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="grid min-h-[420px] grid-cols-1 overflow-hidden bg-[#f6ecdd] text-night shadow-inner md:grid-cols-2"
            >
              {/* Página Esquerda */}
              <div
                onClick={goPrev}
                className={`relative flex flex-col justify-between border-b border-night/10 p-6 sm:p-8 md:border-b-0 md:border-r ${
                  currentSpread > 0 ? "cursor-pointer" : ""
                }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden border-4 border-white bg-night-2 shadow-md">
                  <Image
                    src={spread.leftPhoto}
                    alt={`${couple.him} e ${couple.her} - página ${spread.pageNumber}A`}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <p className="font-script text-xl leading-snug text-night/80">
                    {spread.captionLeft}
                  </p>
                  <span className="font-body text-[11px] text-night/40">
                    {spread.pageNumber * 2 - 1}
                  </span>
                </div>
              </div>

              {/* Página Direita */}
              <div
                onClick={goNext}
                className={`relative flex flex-col justify-between p-6 sm:p-8 ${
                  currentSpread < totalSpreads - 1 ? "cursor-pointer" : ""
                }`}
              >
                {spread.rightPhoto ? (
                  <>
                    <div className="relative aspect-[4/3] w-full overflow-hidden border-4 border-white bg-night-2 shadow-md">
                      <Image
                        src={spread.rightPhoto}
                        alt={`${couple.him} e ${couple.her} - página ${spread.pageNumber}B`}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-5 flex items-end justify-between gap-4">
                      <p className="font-script text-xl leading-snug text-night/80">
                        {spread.captionRight}
                      </p>
                      <span className="font-body text-[11px] text-night/40">
                        {spread.pageNumber * 2}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center border border-dashed border-night/20 p-8 text-center">
                    <p className="font-script text-3xl text-wine">
                      Continua...
                    </p>
                    <p className="mt-3 font-body text-sm text-night/60">
                      Muitas páginas ainda estão em branco esperando pelas
                      nossas próximas aventuras.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controles de Navegação */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={goPrev}
            disabled={currentSpread === 0}
            className="border border-cream/20 px-5 py-2 font-body text-xs uppercase tracking-widest text-cream transition hover:border-amber hover:text-amber disabled:cursor-not-allowed disabled:opacity-30"
          >
            ← Página anterior
          </button>

          <span className="font-body text-xs tracking-widest text-amber/80">
            {currentSpread + 1} / {totalSpreads}
          </span>

          <button
            type="button"
            onClick={goNext}
            disabled={currentSpread === totalSpreads - 1}
            className="border border-cream/20 px-5 py-2 font-body text-xs uppercase tracking-widest text-cream transition hover:border-amber hover:text-amber disabled:cursor-not-allowed disabled:opacity-30"
          >
            Próxima página →
          </button>
        </div>
      </div>
    </section>
  );
}
