"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { relationshipStart } from "@/lib/data";

function getElapsed() {
  const now = new Date().getTime();
  const start = relationshipStart.getTime();
  const diff = Math.max(0, now - start);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export default function LiveCounter() {
  const [time, setTime] = useState<ReturnType<typeof getElapsed> | null>(null);

  useEffect(() => {
    // calcula só no navegador, depois do primeiro render — evita
    // divergência entre o horário do servidor e o do cliente (hydration mismatch)
    setTime(getElapsed());
    const interval = setInterval(() => setTime(getElapsed()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "dias", value: time?.days ?? 0 },
    { label: "horas", value: time?.hours ?? 0 },
    { label: "min", value: time?.minutes ?? 0 },
    { label: "seg", value: time?.seconds ?? 0 },
  ];

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 py-32 text-center">
      {/* a chama, agora em seu ponto máximo — o fogo que virou o site inteiro */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,rgba(198,84,29,0.22),transparent)]" />

      <p className="font-script text-2xl text-rose">e continua contando...</p>
      <h2 className="mt-2 font-display text-3xl text-cream sm:text-4xl">
        Estamos juntos há
      </h2>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
        {units.map((u) => (
          <motion.div
            key={u.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="font-display text-5xl text-amber sm:text-6xl">
              {String(u.value).padStart(2, "0")}
            </span>
            <span className="mt-1 font-body text-xs uppercase tracking-widest text-cream/50">
              {u.label}
            </span>
          </motion.div>
        ))}
      </div>

      <p className="mt-12 max-w-sm font-body text-sm text-cream/60">
        E o contador nunca para — assim como a gente também não pretende parar.
      </p>

      {time && (
        <p className="mt-4 font-body text-xs uppercase tracking-widest text-amber/80">
          {Math.max(
            0,
            Math.ceil(
              (new Date("2026-12-20T00:00:00-03:00").getTime() - Date.now()) /
                (1000 * 60 * 60 * 24)
            )
          )}{" "}
          dias para o nosso 1 ano
        </p>
      )}

      <a
        href="https://wa.me/?text=Oi%20amor%2C%20acabei%20de%20ver%20nosso%20site%20%E2%9D%A4%EF%B8%8F"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 border border-amber/40 bg-amber/10 px-6 py-3 font-body text-xs uppercase tracking-widest text-amber transition hover:border-amber hover:bg-amber/20"
      >
        💬 Tô com saudade
      </a>
    </section>
  );
}
