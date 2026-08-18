"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { songs } from "@/lib/data";

export default function Playlist() {
  const [selected, setSelected] = useState(0);

  return (
    <section className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="font-script text-2xl text-rose">a trilha sonora de vocês</p>
      <h2 className="mt-2 font-display text-3xl text-cream sm:text-4xl">
        Nossa playlist
      </h2>

      <div className="mt-12 border border-cream/10 bg-night-2 p-4 sm:p-6">
        {/* player oficial do Spotify — embed, sem precisar hospedar áudio */}
        <div className="overflow-hidden rounded-xl">
          <iframe
            key={songs[selected].spotifyId}
            style={{ borderRadius: 12 }}
            src={`https://open.spotify.com/embed/track/${songs[selected].spotifyId}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title={songs[selected].title}
          />
        </div>

        <ul className="mt-6 divide-y divide-cream/10 text-left">
          {songs.map((s, i) => (
            <motion.li
              key={s.spotifyId}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <button
                onClick={() => setSelected(i)}
                className={`flex w-full items-center justify-between py-3 text-left font-body text-sm transition-colors ${
                  selected === i ? "text-amber" : "text-cream/80 hover:text-cream"
                }`}
              >
                <span>{s.title}</span>
                <span className="text-xs text-cream/40">{s.artist}</span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
