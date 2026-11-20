"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "vivi-henrique-bucketlist";

const dreams = [
  { id: "viagem", label: "Fazer nossa primeira viagem longa juntos" },
  { id: "nascer-sol", label: "Ver o nascer do sol na praia" },
  { id: "jantar", label: "Cozinhar um jantar especial do zero" },
  { id: "album-1ano", label: "Imprimir nosso álbum físico de 1 ano" },
  { id: "casa", label: "Montar o nosso cantinho do nosso jeito" },
  { id: "familia", label: "Construir nossa família juntos" },
];

export default function BucketList() {
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setDone(parsed);
      }
    } catch {
      // ignora erro de leitura
    }
  }, []);

  function toggle(id: string) {
    const next = done.includes(id)
      ? done.filter((item) => item !== id)
      : [...done, id];
    setDone(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignora erro de escrita
    }
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-28">
      <div className="mb-12 text-center">
        <p className="font-script text-2xl text-rose">o que ainda vamos viver</p>
        <h2 className="mt-2 font-display text-3xl text-cream sm:text-4xl">
          Nossos Próximos Capítulos
        </h2>
      </div>

      <div className="divide-y divide-cream/10 border border-cream/10 bg-night-2">
        {dreams.map((d) => {
          const checked = done.includes(d.id);
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => toggle(d.id)}
              className="flex w-full items-center gap-4 px-6 py-4 text-left transition hover:bg-cream/5"
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center border text-xs transition ${
                  checked
                    ? "border-amber bg-amber text-night"
                    : "border-cream/30 text-transparent"
                }`}
              >
                ✓
              </span>
              <span
                className={`font-body text-sm ${
                  checked ? "text-cream/45 line-through" : "text-cream/85"
                }`}
              >
                {d.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
