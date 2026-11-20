"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const STORAGE_KEY = "vivi-henrique-coupons";

const coupons = [
  { id: "don-sushi", title: "Vale Don Sushi", desc: "Um jantar japonês especial por minha conta" },
  { id: "acai", title: "Vale Açaí da Barra", desc: "Aquele açaí completo no Gonzaga" },
  { id: "massagem", title: "Vale Massagem", desc: "30 minutos de massagem sem reclamar" },
  { id: "filme", title: "Vale Noite de Filme", desc: "Você escolhe o filme e eu faço a pipoca" },
  { id: "quiosque", title: "Vale D'Boa Quiosque", desc: "Um fim de tarde à beira-mar juntos" },
  { id: "cafe", title: "Vale Café na Cama", desc: "Manhã preguiçosa com tudo que você gosta" },
];

export default function LoveCoupons() {
  const [redeemed, setRedeemed] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setRedeemed(parsed);
      }
    } catch {
      // ignora erro de leitura
    }
  }, []);

  function toggleCoupon(id: string) {
    const next = redeemed.includes(id)
      ? redeemed.filter((item) => item !== id)
      : [...redeemed, id];
    setRedeemed(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignora erro de escrita
    }
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-28">
      <div className="mb-12 text-center">
        <p className="font-script text-2xl text-rose">use quando quiser</p>
        <h2 className="mt-2 font-display text-3xl text-cream sm:text-4xl">
          Vales Românticos
        </h2>
        <p className="mt-3 font-body text-sm text-cream/60">
          Clique em um vale para resgatar
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {coupons.map((c) => {
          const isUsed = redeemed.includes(c.id);
          return (
            <motion.button
              key={c.id}
              type="button"
              onClick={() => toggleCoupon(c.id)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className={`relative border border-dashed p-6 text-left transition-colors ${
                isUsed
                  ? "border-cream/15 bg-night-2/40 opacity-60"
                  : "border-amber/40 bg-night-2 hover:border-amber"
              }`}
            >
              <span className="font-body text-[10px] uppercase tracking-widest text-amber/80">
                {isUsed ? "✓ Resgatado" : "🎟️ Disponível"}
              </span>
              <h3
                className={`mt-2 font-display text-lg text-cream ${
                  isUsed ? "line-through" : ""
                }`}
              >
                {c.title}
              </h3>
              <p className="mt-2 font-body text-xs leading-relaxed text-cream/65">
                {c.desc}
              </p>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
