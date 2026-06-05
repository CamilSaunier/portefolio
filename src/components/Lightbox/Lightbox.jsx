import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Lightbox.module.css";

/**
 * Lightbox plein écran : grande image nette + barre de miniatures
 * regroupées par section (ex. Espace candidat / Espace recruteur).
 * - `shots` : [{ src, caption, group }]
 * - navigation : miniatures, flèches latérales, clavier (← → Échap)
 */
export default function Lightbox({ shots, title = "", onClose }) {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const count = shots.length;
  const overlayRef = useRef(null);

  const go = useCallback(
    (dir) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  useEffect(() => {
    // mémorise l'élément qui avait le focus (le bouton « Voir les aperçus »)
    const previouslyFocused = document.activeElement;
    // place le focus dans la modale dès l'ouverture
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
      } else if (e.key === "ArrowRight") {
        go(1);
      } else if (e.key === "ArrowLeft") {
        go(-1);
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
      // rend le focus à l'élément d'origine à la fermeture
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [go, onClose]);

  // regroupe les miniatures par section consécutive (le `group`), en gardant l'index global
  const groups = useMemo(() => {
    const out = [];
    shots.forEach((s, i) => {
      const label = s.group || "";
      const last = out[out.length - 1];
      if (last && last.label === label) last.items.push({ s, i });
      else out.push({ label, items: [{ s, i }] });
    });
    return out;
  }, [shots]);

  const current = shots[index];

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${t("a11y.gallery")}${title ? " — " + title : ""}`}
    >
      <button className={styles.close} onClick={onClose} aria-label={t("a11y.close")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>

      {count > 1 && (
        <button
          className={`${styles.nav} ${styles.prev}`}
          onClick={(e) => { e.stopPropagation(); go(-1); }}
          aria-label={t("a11y.prev")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      )}

      <figure className={styles.viewer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.imageBox}>
          {/* key={index} => relance l'animation de fondu à chaque changement */}
          <img key={index} src={current.src} alt={current.caption || title} className={styles.image} />
        </div>
        <figcaption className={styles.caption} aria-live="polite" aria-atomic="true">
          {current.caption && <span>{current.caption}</span>}
          <span className={styles.counter} aria-hidden="true">
            {index + 1} / {count}
          </span>
          {/* version lisible par lecteur d'écran : « Image 3 sur 9 » */}
          <span className="sr-only">
            {t("a11y.imageOf", { current: index + 1, total: count })}
          </span>
        </figcaption>
      </figure>

      {count > 1 && (
        <button
          className={`${styles.nav} ${styles.next}`}
          onClick={(e) => { e.stopPropagation(); go(1); }}
          aria-label={t("a11y.next")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      )}

      <div className={styles.rail} onClick={(e) => e.stopPropagation()}>
        {groups.map((group, gi) => (
          <div className={styles.group} key={gi}>
            {group.label && <span className={styles.groupLabel}>{group.label}</span>}
            <div className={styles.thumbs}>
              {group.items.map(({ s, i }) => (
                <button
                  key={i}
                  className={`${styles.thumb} ${i === index ? styles.thumbActive : ""}`}
                  onClick={() => setIndex(i)}
                  aria-label={s.caption}
                  aria-current={i === index}
                >
                  <img src={s.src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
