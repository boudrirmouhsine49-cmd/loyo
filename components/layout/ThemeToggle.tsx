"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <div className="flex rounded-[10px] bg-subtle p-1 text-[12px] font-medium">
      <button
        onClick={() => theme !== "light" && toggle()}
        aria-pressed={theme === "light"}
        className={`flex flex-1 items-center justify-center gap-1.5 rounded-[8px] py-1.5 transition-colors ${
          theme === "light" ? "bg-card text-text" : "text-text-3"
        }`}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
        Clair
      </button>
      <button
        onClick={() => theme !== "dark" && toggle()}
        aria-pressed={theme === "dark"}
        className={`flex flex-1 items-center justify-center gap-1.5 rounded-[8px] py-1.5 transition-colors ${
          theme === "dark" ? "bg-card text-text" : "text-text-3"
        }`}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
        Sombre
      </button>
    </div>
  );
}
