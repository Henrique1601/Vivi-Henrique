"use client";

const links = [
  { href: "#timeline", label: "História" },
  { href: "#mapa", label: "Mapa" },
  { href: "#playlist", label: "Músicas" },
  { href: "#quiz", label: "Quiz" },
  { href: "#galeria", label: "Galeria" },
  { href: "#album", label: "Álbum" },
  { href: "#pote", label: "Motivos" },
  { href: "#vales", label: "Vales" },
  { href: "#planos", label: "Planos" },
  { href: "#tempo", label: "Tempo" },
];

export default function QuickNav() {
  return (
    <nav
      aria-label="Navegação rápida"
      className="sticky top-0 z-40 border-b border-cream/10 bg-night/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-5xl items-center gap-5 overflow-x-auto px-4 py-3 text-xs uppercase tracking-widest text-cream/65 no-scrollbar sm:justify-center">
        {links.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="shrink-0 transition-colors hover:text-amber"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
