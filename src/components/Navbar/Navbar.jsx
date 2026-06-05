import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import styles from "./Navbar.module.css";

const LINKS = ["about", "experience", "skills", "projects", "contact"];

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ombre/fond plus marqués une fois qu'on a scrollé
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={`container ${styles.nav}`}>
        <a href="#hero" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoMark}>{"</>"}</span>
          Camil<span className={styles.logoDot}>.</span>
        </a>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
          {LINKS.map((id) => (
            <li key={id}>
              <a href={`#${id}`} onClick={closeMenu}>
                {t(`nav.${id}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
}
