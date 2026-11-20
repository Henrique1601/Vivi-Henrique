"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
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
      <Timeline />
      <MemoryMap />
      <Playlist autoplay={started} />
      <Quiz />
      <Gallery />
      <PhotoAlbum />
      <LoveJar />
      <LoveCoupons />
      <BucketList />
      <LiveCounter />
      <HiddenLetter />
    </main>
  );
}
