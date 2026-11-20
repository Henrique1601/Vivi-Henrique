"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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

function PageContent({
  photo,
  caption,
  pageNum,
  side,
}: {
  photo: string | null;
  caption: string;
  pageNum: number;
  side: "left" | "right";
}) {
  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between bg-[#f6ecdd] p-6 text-night sm:p-8 ${
        side === "left"
          ? "shadow-[inset_-12px_0_24px_rgba(0,0,0,0.08)]"
          : "shadow-[inset_12px_0_24px_rgba(0,0,0,0.08)]"
      }`}
    >
      {photo ? (
        <>
          <div className="relative aspect-[4/3] w-full overflow-hidden border-4 border-white bg-night-2 shadow-md">
            <Image
              src={photo}
              alt={`${couple.him} e ${couple.her} - página ${pageNum}`}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          </div>
          <div className="mt-5 flex items-end justify-between gap-4">
            <p className="font-script text-xl leading-snug text-night/85">
              {caption}
            </p>
            <span className="font-body text-[11px] text-night/40">
              {pageNum}
            </span>
          </div>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center border border-dashed border-night/20 p-8 text-center">
          <p className="font-script text-3xl text-wine">Continua...</p>
          <p className="mt-3 font-body text-sm text-night/60">
            Muitas páginas ainda estão em branco esperando pelas nossas próximas
            aventuras.
          </p>
        </div>
      )}
    </div>
  );
}

export default function PhotoAlbum() {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [flipping, setFlipping] = useState<{
    from: number;
    to: number;
    dir: 1 | -1;
  } | null>(null);

  const totalSpreads = spreads.length;

  function goNext() {
    if (flipping || currentSpread >= totalSpreads - 1) return;
    setFlipping({ from: currentSpread, to: currentSpread + 1, dir: 1 });
  }

  function goPrev() {
    if (flipping || currentSpread <= 0) return;
    setFlipping({ from: currentSpread, to: currentSpread - 1, dir: -1 });
  }

  const activeIndex = flipping ? flipping.from : currentSpread;
  const targetIndex = flipping ? flipping.to : currentSpread;

  const leftBase =
    flipping?.dir === -1 ? spreads[targetIndex] : spreads[activeIndex];
  const rightBase =
    flipping?.dir === 1 ? spreads[targetIndex] : spreads[activeIndex];

  return (
    <section className="mx-auto max-w-5xl px-6 py-32">
      <div className="mb-14 text-center">
        <p className="font-script text-2xl text-rose">folheando memórias</p>
        <h2 className="mt-2 font-display text-3xl text-cream sm:text-4xl">
          Nosso Álbum
        </h2>
        <p className="mt-3 font-body text-xs uppercase tracking-widest text-cream/50">
          Clique nas páginas ou nos botões para folhear
        </p>
      </div>

      {/* Palco 3D do Álbum */}
      <div
        className="relative mx-auto max-w-4xl"
        style={{ perspective: "2200px" }}
      >
        <div className="relative rounded-sm border border-amber/30 bg-gradient-to-b from-[#2b1a15] to-[#1a100d] p-3 shadow-[0_25px_70px_rgba(0,0,0,0.75)] sm:p-5">
          {/* Lombada central */}
          <div className="pointer-events-none absolute inset-y-3 left-1/2 z-30 hidden w-7 -translate-x-1/2 bg-gradient-to-r from-black/45 via-amber/10 to-black/45 md:block" />

          {/* Versão Desktop: Livro Aberto com Folha Girando na Lombada */}
          <div
            className="relative hidden min-h-[430px] grid-cols-2 md:grid"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Base Esquerda */}
            <div
              onClick={goPrev}
              className={currentSpread > 0 ? "cursor-pointer" : ""}
            >
              <PageContent
                photo={leftBase.leftPhoto}
                caption={leftBase.captionLeft}
                pageNum={leftBase.pageNumber * 2 - 1}
                side="left"
              />
            </div>

            {/* Base Direita */}
            <div
              onClick={goNext}
              className={
                currentSpread < totalSpreads - 1 ? "cursor-pointer" : ""
              }
            >
              <PageContent
                photo={rightBase.rightPhoto}
                caption={rightBase.captionRight}
                pageNum={rightBase.pageNumber * 2}
                side="right"
              />
            </div>

            {/* Folha 3D que vira */}
            {flipping && (
              <motion.div
                key={`${flipping.from}-${flipping.to}`}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: flipping.dir === 1 ? -180 : 180 }}
                transition={{
                  duration: 0.72,
                  ease: [0.645, 0.045, 0.355, 1],
                }}
                onAnimationComplete={() => {
                  setCurrentSpread(flipping.to);
                  setFlipping(null);
                }}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin:
                    flipping.dir === 1 ? "left center" : "right center",
                }}
                className={`pointer-events-none absolute inset-y-0 z-20 w-1/2 ${
                  flipping.dir === 1 ? "left-1/2" : "left-0"
                }`}
              >
                {/* Frente da folha */}
                <div
                  className="absolute inset-0"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {flipping.dir === 1 ? (
                    <PageContent
                      photo={spreads[flipping.from].rightPhoto}
                      caption={spreads[flipping.from].captionRight}
                      pageNum={spreads[flipping.from].pageNumber * 2}
                      side="right"
                    />
                  ) : (
                    <PageContent
                      photo={spreads[flipping.from].leftPhoto}
                      caption={spreads[flipping.from].captionLeft}
                      pageNum={spreads[flipping.from].pageNumber * 2 - 1}
                      side="left"
                    />
                  )}
                </div>

                {/* Verso da folha */}
                <div
                  className="absolute inset-0"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {flipping.dir === 1 ? (
                    <PageContent
                      photo={spreads[flipping.to].leftPhoto}
                      caption={spreads[flipping.to].captionLeft}
                      pageNum={spreads[flipping.to].pageNumber * 2 - 1}
                      side="left"
                    />
                  ) : (
                    <PageContent
                      photo={spreads[flipping.to].rightPhoto}
                      caption={spreads[flipping.to].captionRight}
                      pageNum={spreads[flipping.to].pageNumber * 2}
                      side="right"
                    />
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Versão Mobile: página única empilhada */}
          <div className="grid grid-cols-1 md:hidden">
            <PageContent
              photo={spreads[currentSpread].leftPhoto}
              caption={spreads[currentSpread].captionLeft}
              pageNum={spreads[currentSpread].pageNumber * 2 - 1}
              side="left"
            />
          </div>
        </div>

        {/* Controles de Navegação */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={goPrev}
            disabled={currentSpread === 0 || Boolean(flipping)}
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
            disabled={currentSpread === totalSpreads - 1 || Boolean(flipping)}
            className="border border-cream/20 px-5 py-2 font-body text-xs uppercase tracking-widest text-cream transition hover:border-amber hover:text-amber disabled:cursor-not-allowed disabled:opacity-30"
          >
            Próxima página →
          </button>
        </div>
      </div>
    </section>
  );
}
