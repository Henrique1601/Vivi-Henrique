import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import MemoryMap from "@/components/MemoryMap";
import Playlist from "@/components/Playlist";
import Quiz from "@/components/Quiz";
import Gallery from "@/components/Gallery";
import LiveCounter from "@/components/LiveCounter";
import HiddenLetter from "@/components/HiddenLetter";
import EmberParticles from "@/components/EmberParticles";

export default function Home() {
  return (
    <main className="relative">
      <div className="grain-overlay" />
      <EmberParticles />
      <Hero />
      <Timeline />
      <MemoryMap />
      <Playlist />
      <Quiz />
      <Gallery />
      <LiveCounter />
      <HiddenLetter />
    </main>
  );
}
