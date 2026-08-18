"use client";

import dynamic from "next/dynamic";

// Leaflet depende de `window`, então carregamos só no client, sem SSR
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[460px] w-full items-center justify-center border border-cream/10 bg-night-2 font-body text-xs text-cream/40">
      carregando mapa...
    </div>
  ),
});

export default function MemoryMap() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-32">
      <div className="mb-16 text-center">
        <p className="font-script text-2xl text-rose">onde estivemos</p>
        <h2 className="mt-2 font-display text-3xl text-cream sm:text-4xl">
          Mapa de memórias
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-sm text-cream/60">
          Cada pin é um lugar que virou parte da nossa história. Toque em um
          ponto para ver a memória.
        </p>
      </div>

      <LeafletMap />
    </section>
  );
}
