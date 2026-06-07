import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TbDownload } from "react-icons/tb";
import styles from "./CvPreview.module.css";

/**
 * Aperçu d'un CV avant téléchargement, en surimpression.
 * - `light` / `dark` : URLs des deux variantes PDF du CV
 * - `initialVariant` : variante affichée à l'ouverture (suit le thème du site)
 * Même mécanique d'accessibilité que la Lightbox (Échap, piège de focus,
 * scroll bloqué, focus restauré).
 */
export default function CvPreview({
  title,
  light,
  dark,
  lightPreview = [],
  darkPreview = [],
  initialVariant = "light",
  onClose,
}) {
  const { t } = useTranslation();
  const [variant, setVariant] = useState(initialVariant === "dark" ? "dark" : "light");
  const overlayRef = useRef(null);
  const file = variant === "dark" ? dark : light; // PDF téléchargé
  const pages = variant === "dark" ? darkPreview : lightPreview; // images d'aperçu

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    overlayRef.current?.querySelector("button, a")?.focus();

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
      aria-label={`${t("about.preview")} — ${title}`}
    >
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.bar}>
          <span className={styles.title}>{title}</span>

          <div className={styles.controls}>
            {/* toggle clair / sombre du fond du CV */}
            <div className={styles.toggle} role="group" aria-label={t("about.preview")}>
              <button
                type="button"
                className={`${styles.segBtn} ${variant === "light" ? styles.segActive : ""}`}
                aria-pressed={variant === "light"}
                onClick={() => setVariant("light")}
              >
                {t("about.light")}
              </button>
              <button
                type="button"
                className={`${styles.segBtn} ${variant === "dark" ? styles.segActive : ""}`}
                aria-pressed={variant === "dark"}
                onClick={() => setVariant("dark")}
              >
                {t("about.dark")}
              </button>
            </div>

            <a href={file} download className={styles.download}>
              <TbDownload aria-hidden="true" />
              {t("about.download")}
            </a>

            <button className={styles.close} onClick={onClose} aria-label={t("a11y.close")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
        </div>

        {/* aperçu image (pages du PDF rendues) : net, sans chrome de navigateur.
            data-variant -> le pourtour suit la variante du CV (pas le thème du
            site), pour que le CV sombre repose sur un fond sombre, sans bande claire. */}
        <div className={styles.viewer} data-variant={variant}>
          {pages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${title} — page ${i + 1}`}
              className={styles.page}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
