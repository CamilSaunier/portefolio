import { flushSync } from "react-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === "dark";

  // bascule avec une révélation circulaire (View Transitions) depuis le bouton ;
  // repli silencieux si l'API n'existe pas ou si "mouvement réduit" est activé.
  const handleToggle = (e) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) {
      toggleTheme();
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    const root = document.documentElement;
    root.style.setProperty("--vt-x", `${r.left + r.width / 2}px`);
    root.style.setProperty("--vt-y", `${r.top + r.height / 2}px`);
    document.startViewTransition(() => flushSync(() => toggleTheme()));
  };

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={handleToggle}
      aria-label={isDark ? t("theme.toLight") : t("theme.toDark")}
      title={isDark ? t("theme.toLight") : t("theme.toDark")}
    >
      <span className={`${styles.icons} ${isDark ? styles.dark : ""}`}>
        {/* Soleil */}
        <svg className={styles.sun} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
        {/* Lune */}
        <svg className={styles.moon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </button>
  );
}
