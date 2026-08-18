"use client";

// partículas sutis de brasa subindo — ambiente, não confete genérico,
// para reforçar o motivo do fogo/churrasco ao longo do site
const particles = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 7.3) % 100}%`,
  delay: `${(i % 7) * 1.1}s`,
  duration: `${7 + (i % 5)}s`,
  size: i % 3 === 0 ? 3 : 2,
}));

export default function EmberParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-amber/70 animate-floatUp"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
