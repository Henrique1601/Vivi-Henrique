"use client";

import { useEffect, useState } from "react";

const UNLOCK_DATE = new Date("2026-12-20T00:00:00-03:00");

export default function TimeCapsule() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const unlocked = now !== null && now >= UNLOCK_DATE.getTime();
  const diff = now !== null ? Math.max(0, UNLOCK_DATE.getTime() - now) : 0;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return (
    <section className="mx-auto max-w-2xl px-6 py-28 text-center">
      <p className="font-script text-2xl text-rose">para abrir no futuro</p>
      <h2 className="mt-2 font-display text-3xl text-cream sm:text-4xl">
        Cápsula do Tempo
      </h2>

      <div className="mt-10 border border-amber/25 bg-night-2 p-8 shadow-xl">
        {unlocked ? (
          <div>
            <p className="font-script text-3xl text-amber">
              Feliz 1 ano, meu amor! ❤️
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-cream/85">
              Se você está lendo isso, chegamos ao nosso primeiro ano juntos.
              Obrigado por cada risada, cada abraço e por continuar escolhendo
              caminhar comigo todos os dias.
            </p>
          </div>
        ) : (
          <div>
            <p className="text-3xl">🔒</p>
            <p className="mt-4 font-body text-sm text-cream/75">
              Esta carta está lacrada até o dia{" "}
              <strong className="text-amber">20 de dezembro de 2026</strong>.
            </p>
            {now !== null && (
              <p className="mt-4 font-body text-xs uppercase tracking-widest text-amber/80">
                Faltam {days}d {hours}h {minutes}m para desbloquear
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
