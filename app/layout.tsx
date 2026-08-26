import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "./globals.css";

// Police de texte principale
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Police pour les labels et les chiffres (voir CLAUDE.md, design system)
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Loyo — Carte de fidélité digitale",
  description: "Loyo est un SaaS de carte de fidélité digitale pour les petits commerces.",
};

// Script exécuté avant le premier rendu : applique le thème mémorisé
// (localStorage) ou la préférence système, pour éviter un flash de
// couleur au chargement de la page.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('loyo-theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full bg-app text-text">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
