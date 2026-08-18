"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { milestones } from "@/lib/data";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.4"],
  });
  const flameHeight = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
  });

  return (
    <section
      ref={containerRef}
      className="relative mx-auto max-w-3xl px-6 py-32"
    >
      <div className="mb-20 text-center">
        <p className="font-script text-2xl text-rose">nossa linha do tempo</p>
        <h2 className="mt-2 font-display text-3xl text-cream sm:text-4xl">
          Do primeiro encontro até aqui
        </h2>
      </div>

      <div className="relative pl-10 sm:pl-14">
        {/* trilho base */}
        <div className="absolute left-[7px] top-0 h-full w-[2px] bg-cream/10 sm:left-[11px]" />
        {/* a chama que cresce conforme você rola — a mesma brasa do herói, agora se espalhando */}
        <motion.div
          style={{ scaleY: flameHeight }}
          className="absolute left-[7px] top-0 h-full w-[2px] origin-top bg-gradient-to-b from-amber via-ember to-wine sm:left-[11px]"
        />

        <ul className="space-y-24">
          {milestones.map((m, i) => (
            <motion.li
              key={m.isoDate}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              <span className="absolute -left-10 top-1 h-4 w-4 rounded-full border-2 border-amber bg-night shadow-[0_0_12px_2px_rgba(227,168,87,0.5)] sm:-left-14" />
              <p className="font-body text-xs uppercase tracking-[0.2em] text-amber/80">
                {m.date}
              </p>
              <h3 className="mt-2 font-display text-2xl text-cream sm:text-3xl">
                {m.title}
              </h3>
              <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-cream/70">
                {m.description}
              </p>
              <div className="relative mt-5 h-52 w-64 overflow-hidden border border-cream/10 shadow-lg sm:h-60 sm:w-72">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={m.title}
                    fill
                    sizes="(max-width: 640px) 90vw, 320px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-night-2 px-4 text-center">
                    <span className="text-2xl">🔥</span>
                    <p className="font-body text-xs text-cream/40">
                      ainda sem foto desse dia
                    </p>
                  </div>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
