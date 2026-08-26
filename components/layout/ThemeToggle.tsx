"use client";

import { Sun, Moon } from "lucide-react";
import { Toggle } from "@/components/ui/Toggle";
import { useTheme } from "@/components/layout/ThemeProvider";

// Bouton clair/sombre affiché dans la Topbar. Le thème choisi est
// mémorisé (voir ThemeProvider) et appliqué à toute l'app.
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 text-text-3">
      <Sun size={16} strokeWidth={2} />
      <Toggle checked={theme === "dark"} onChange={toggleTheme} label="Basculer le thème clair/sombre" />
      <Moon size={16} strokeWidth={2} />
    </div>
  );
}
