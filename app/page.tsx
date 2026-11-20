"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import QuickNav from "@/components/QuickNav";
import Timeline from "@/components/Timeline";
import MemoryMap from "@/components/MemoryMap";
import Playlist from "@/components/Playlist";
import Quiz from "@/components/Quiz";
import Gallery from "@/components/Gallery";
import PhotoAlbum from "@/components/PhotoAlbum";
import LoveJar from "@/components/LoveJar";
import LoveCoupons from "@/components/LoveCoupons";
import BucketList from "@/components/BucketList";
import LiveCounter from "@/components/LiveCounter";
import HiddenLetter from "@/components/HiddenLetter";
import EmberParticles from "@/components/EmberParticles";
import EntryGate from "@/components/EntryGate";

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <main className="relative">
      <div className="grain-overlay" />
      <EmberParticles />

      <AnimatePresence>
        {!started && <EntryGate key="gate" onEnter={() => setStarted(true)} />}
      </AnimatePresence>

      <Hero />
      <QuickNav />
      <div id="timeline"><Timeline /></div>
      <div id="mapa"><MemoryMap /></div>
      <div id="playlist"><Playlist autoplay={started} /></div>
      <div id="quiz"><Quiz /></div>
      <div id="galeria"><Gallery /></div>
      <div id="album"><PhotoAlbum /></div>
      <div id="pote"><LoveJar /></div>
      <div id="vales"><LoveCoupons /></div>
      <div id="planos"><BucketList /></div>
      <div id="tempo"><LiveCounter /></div>
      <HiddenLetter />
    </main>
  );
}
