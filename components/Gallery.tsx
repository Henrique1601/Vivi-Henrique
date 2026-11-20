"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { galleryPhotos } from "@/lib/data";

// leve variação de rotação por índice, pra parecer um mural real
const rotations = [-6, 4, -3, 7, -8, 2, 5, -4, 3, -5, 6, -2, 4, -7];
const STORAGE_KEY = "vivi-henrique-gallery-extra";

function compressImageToDataUrl(file: File, maxSize = 900): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Erro ao ler imagem"));
    reader.onload = () => {
      const img = new window.Image();
      img.onerror = () => reject(new Error("Arquivo inválido"));
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas indisponível"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export default function Gallery() {
  const [extraPhotos, setExtraPhotos] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setExtraPhotos(
            parsed.filter(
              (x): x is string =>
                typeof x === "string" && x.startsWith("data:image/")
            )
          );
        }
      }
    } catch {
      // ignora erro de leitura do localStorage
    }
  }, []);

  function saveExtra(next: string[]) {
    setExtraPhotos(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // caso o localStorage esteja cheio, mantém apenas em memória na sessão
    }
  }

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const allowedTypes = new Set([
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ]);
    const maxBytes = 10 * 1024 * 1024;
    const imageFiles = Array.from(files)
      .filter((f) => allowedTypes.has(f.type) && f.size <= maxBytes)
      .slice(0, 12);
    if (imageFiles.length === 0) return;

    setIsProcessing(true);
    try {
      const compressed = await Promise.all(
        imageFiles.map((f) => compressImageToDataUrl(f))
      );
      saveExtra([...extraPhotos, ...compressed]);
    } finally {
      setIsProcessing(false);
    }
  }

  function removeExtra(index: number) {
    const next = extraPhotos.filter((_, idx) => idx !== index);
    saveExtra(next);
  }

  const allPhotos = [
    ...galleryPhotos.map((src) => ({ src, isExtra: false, extraIdx: -1 })),
    ...extraPhotos.map((src, idx) => ({ src, isExtra: true, extraIdx: idx })),
  ];

  return (
    <section className="mx-auto max-w-5xl px-6 py-32">
      <div className="mb-12 text-center">
        <p className="font-script text-2xl text-rose">nosso mural</p>
        <h2 className="mt-2 font-display text-3xl text-cream sm:text-4xl">
          Galeria
        </h2>
      </div>

      {/* Área de Drag & Drop para adicionar novas fotos */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          void handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Adicionar fotos à galeria"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        className={`mx-auto mb-16 max-w-xl cursor-pointer border border-dashed px-6 py-8 text-center transition-all ${
          isDragging
            ? "scale-[1.02] border-amber bg-amber/10"
            : "border-cream/25 bg-night-2/60 hover:border-amber/60 hover:bg-night-2"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            void handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <p className="font-script text-2xl text-amber">
          {isProcessing
            ? "Revelando fotos..."
            : isDragging
            ? "Solte aqui para colar no mural"
            : "+ Adicionar mais memórias"}
        </p>
        <p className="mt-2 font-body text-xs text-cream/60">
          Arraste e solte fotos aqui, ou clique para escolher do seu dispositivo
        </p>
      </div>

      <div className="flex flex-wrap items-start justify-center gap-x-6 gap-y-10">
        <AnimatePresence>
          {allPhotos.map((item, i) => (
            <motion.div
              key={`${item.isExtra ? "extra" : "base"}-${i}`}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: rotations[i % rotations.length],
              }}
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: (i % 6) * 0.06 }}
              className="group relative w-48 bg-cream p-3 pb-6 shadow-xl"
            >
              {item.isExtra && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeExtra(item.extraIdx);
                  }}
                  aria-label="Remover foto adicionada"
                  className="absolute -right-2 -top-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-wine text-xs text-cream opacity-100 shadow transition-opacity focus:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                >
                  ×
                </button>
              )}
              <div className="relative h-52 w-full overflow-hidden bg-night-2">
                {item.isExtra ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt="Nova memória de Henrique e Vivian"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt="Henrique e Vivian"
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
