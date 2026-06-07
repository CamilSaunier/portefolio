import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./ProjectDetail.module.css";

/**
 * Surimpression de détail d'un projet (features, intro).
 * Même mécanique d'accessibilité que le Lightbox :
 * backdrop cliquable, fermeture Échap, piège de focus, scroll du body bloqué,
 * restitution du focus à l'élément d'origine à la fermeture.
 * - `title` : titre du projet
 * - `intro` : paragraphe d'introduction (optionnel)
 * - `features` : liste des fonctionnalités produites
 */
export default function ProjectDetail({ title, intro, features = [], onClose }) {
  const { t } = useTranslation();
  const overlayRef = useRef(null);

  useEffect(() => {
    // mémorise l'élément focalisé (le bouton + de la carte) pour le restaurer
    const previouslyFocused = document.activeElement;
    // place le focus dans la modale dès l'ouverture (bouton fermer)
    overlayRef.current?.querySelector("button")?.focus();

    const focusables = () =>
      Array.from(
        overlayRef.current?.querySelectorAll(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        ) || []
      );

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "Tab") {
        // piège le focus : Tab tourne en boucle à l'intérieur de la modale
        const items = focusables();
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
    >
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label={t("a11y.close")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <h3 id="project-detail-title" className={styles.title}>
          <span className={styles.brace} aria-hidden="true">{"{ "}</span>
          {title}
          <span className={styles.brace} aria-hidden="true">{" }"}</span>
        </h3>

        {intro && <p className={styles.intro}>{intro}</p>}

        {features.length > 0 && (
          <ul className={styles.list}>
            {features.map((f, idx) => (
              <li key={idx}>{f}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
