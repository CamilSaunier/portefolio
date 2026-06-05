import { createContext, useContext, useEffect, useState, useCallback } from "react";

const ThemeContext = createContext(null);

/**
 * Source de vérité unique pour le thème jour/nuit.
 * - Lit l'état initial depuis l'attribut data-theme déjà posé par le script
 *   inline du index.html (donc cohérent avec ce qui est affiché, pas de flash).
 * - Persiste le choix dans localStorage et met à jour <html data-theme>.
 */
function getInitialTheme() {
  if (typeof document !== "undefined") {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "light" || current === "dark") return current;
  }
  return "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme doit être utilisé dans un <ThemeProvider>");
  return ctx;
}
