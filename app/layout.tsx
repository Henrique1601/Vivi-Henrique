import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Henrique & Vivian — 8 meses",
  description: "Do churrasco até aqui: a nossa história.",
  openGraph: {
    title: "Henrique & Vivian — 8 meses",
    description: "Do churrasco até aqui: a nossa história.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/photos/aliancas.jpg", width: 1200, height: 630, alt: "Henrique & Vivian" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Henrique & Vivian — 8 meses",
    description: "Do churrasco até aqui: a nossa história.",
    images: ["/photos/aliancas.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Fraunces:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Sora:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={
          {
            "--font-fraunces": "'Fraunces', serif",
            "--font-sora": "'Sora', sans-serif",
            "--font-caveat": "'Caveat', cursive",
          } as React.CSSProperties
        }
        className="font-body bg-night text-cream antialiased"
      >
        {children}
      </body>
    </html>
  );
}
