import { useTranslation } from "react-i18next";
import styles from "./LanguageToggle.module.css";

const LANGS = ["fr", "en"];

export default function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const current = i18n.resolvedLanguage;

  const change = (lng) => i18n.changeLanguage(lng);

  return (
    <div className={styles.group} role="group" aria-label={t("language.switch")}>
      {/* goutte accent qui glisse sous la langue active.
          .thumb porte le déplacement, .drop (remontée à chaque clic via key)
          porte la déformation squash & stretch -> effet goutte d'eau. */}
      <span className={styles.thumb} data-lang={current} aria-hidden="true">
        <span key={current} className={styles.drop} />
      </span>
      {LANGS.map((lng) => (
        <button
          key={lng}
          type="button"
          className={`${styles.btn} ${current === lng ? styles.active : ""}`}
          aria-pressed={current === lng}
          onClick={() => change(lng)}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
