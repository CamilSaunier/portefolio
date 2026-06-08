import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TbHome, TbUser, TbBriefcase, TbCode, TbLayoutGrid, TbMail } from "react-icons/tb";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import styles from "./Navbar.module.css";

// chaque entrée du dock : id de section, icône, clé de libellé i18n
const ITEMS = [
  { id: "hero", key: "home", Icon: TbHome },
  { id: "about", key: "about", Icon: TbUser },
  { id: "experience", key: "experience", Icon: TbBriefcase },
  { id: "skills", key: "skills", Icon: TbCode },
  { id: "projects", key: "projects", Icon: TbLayoutGrid },
  { id: "contact", key: "contact", Icon: TbMail },
];

export default function Navbar() {
  const { t } = useTranslation();
  const [active, setActive] = useState("hero");
  const dockRef = useRef(null);
  const dropRef = useRef(null);
  const dropInnerRef = useRef(null);
  const firstRun = useRef(true);

  // scroll-spy : met en surbrillance l'icône de la section visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // déclenche le changement quand la section franchit le centre du viewport
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // place la goutte sous l'item actif (mesuré en JS -> responsive et robuste).
  // `squash` rejoue la déformation ; on l'évite au 1er rendu et au resize.
  const positionDrop = useCallback((squash) => {
    const dock = dockRef.current;
    const drop = dropRef.current;
    if (!dock || !drop) return;
    const el = dock.querySelector('[aria-current="true"]');
    if (!el) return;
    drop.style.width = `${el.offsetWidth}px`;
    drop.style.height = `${el.offsetHeight}px`;
    drop.style.transform = `translate(${el.offsetLeft}px, ${el.offsetTop}px)`;
    const inner = dropInnerRef.current;
    if (squash && inner) {
      inner.classList.remove(styles.squash);
      void inner.offsetWidth; // reflow -> relance l'animation
      inner.classList.add(styles.squash);
    }
  }, []);

  useEffect(() => {
    positionDrop(!firstRun.current);
    firstRun.current = false;
  }, [active, positionDrop]);

  // repositionne (sans déformation) si la fenêtre change de taille
  useEffect(() => {
    const onResize = () => positionDrop(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [positionDrop]);

  return (
    <>
      {/* logo flottant en haut à gauche (lien absolu -> marche aussi depuis la 404) */}
      <a href="/#hero" className={styles.logo} aria-label="Camil Saunier">
        <span className={styles.logoMark}>{"{"}</span>
        <span className={styles.logoName}>CS</span>
        <span className={styles.logoMark}>{"}"}</span>
      </a>

      {/* dock de navigation flottant (liquid glass) */}
      <nav ref={dockRef} className={styles.dock} aria-label={t("a11y.mainNav")}>
        {/* reflet de lumière périodique et discret (clin d'œil "liquid glass") */}
        <span className={styles.shine} aria-hidden="true" />
        {/* goutte qui glisse sous l'item actif (translate) + se déforme (squash) */}
        <span ref={dropRef} className={styles.drop} aria-hidden="true">
          <span ref={dropInnerRef} className={styles.dropInner} />
        </span>
        {ITEMS.map(({ id, key, Icon }) => {
          const label = t(`nav.${key}`);
          return (
            <a
              key={id}
              href={`/#${id}`}
              className={`${styles.item} ${active === id ? styles.active : ""}`}
              aria-label={label}
              title={label}
              aria-current={active === id ? "true" : undefined}
            >
              <Icon className={styles.icon} aria-hidden="true" />
              <span className={styles.tooltip}>{label}</span>
            </a>
          );
        })}
      </nav>

      {/* réglages flottants en haut à droite */}
      <div className={styles.utils}>
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </>
  );
}
