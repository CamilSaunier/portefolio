import styles from "./BrowserFrame.module.css";

/**
 * Coque de navigateur desktop en CSS (barre + pastilles + champ d'URL).
 * - `screenshot` : chemin de la capture (prioritaire).
 * - `logo` : placeholder affiché si pas de capture.
 * - `emptyLabel` : texte centré si ni capture ni logo (ex. « Captures à venir »).
 * - `label` : texte affiché dans la barre d'URL (avec un cadenas https).
 */
export default function BrowserFrame({ screenshot, logo, emptyLabel, alt = "", label = "" }) {
  return (
    <div className={styles.frame}>
      <div className={styles.bar}>
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        {label && (
          <span className={styles.url}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            {label}
          </span>
        )}
      </div>

      <div className={styles.screen}>
        {screenshot ? (
          <img className={styles.shot} src={screenshot} alt={alt} loading="lazy" />
        ) : logo ? (
          <img className={styles.placeholder} src={logo} alt={alt} loading="lazy" />
        ) : (
          emptyLabel && <span className={styles.empty}>{emptyLabel}</span>
        )}
      </div>
    </div>
  );
}
