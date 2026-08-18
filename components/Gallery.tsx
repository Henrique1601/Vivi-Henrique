"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { galleryPhotos } from "@/lib/data";

// leve variação de rotação por índice, pra parecer um mural real
const rotations = [-6, 4, -3, 7, -8, 2, 5, -4, 3, -5, 6, -2, 4, -7];

export default function Gallery() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-32">
      <div className="mb-16 text-center">
        <p className="font-script text-2xl text-rose">nosso mural</p>
        <h2 className="mt-2 font-display text-3xl text-cream sm:text-4xl">
          Galeria
        </h2>
      </div>

      <div className="flex flex-wrap items-start justify-center gap-x-6 gap-y-10">
        {galleryPhotos.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: rotations[i % rotations.length] }}
            whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.08 }}
            className="w-48 bg-cream p-3 pb-6 shadow-xl"
          >
            <div className="relative h-52 w-full overflow-hidden bg-night-2">
              <Image
                src={src}
                alt="Henrique e Vivian"
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
