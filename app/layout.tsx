import type { Metadata } from "next";
import { Fraunces, Sora, Caveat } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "600"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Henrique & Vivian — 8 meses",
  description: "Do churrasco até aqui: a nossa história.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${fraunces.variable} ${sora.variable} ${caveat.variable} font-body bg-night text-cream antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
