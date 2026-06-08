import { useTranslation } from "react-i18next";
import { TbArrowLeft } from "react-icons/tb";
import styles from "./NotFound.module.css";

/**
 * Vue 404 « soft » : affichée par App quand l'URL ne correspond pas à la racine.
 * Rendue DANS la coquille du site (navbar + thème + i18n), donc cohérente.
 */
export default function NotFound() {
  const { t } = useTranslation();

  return (
    <section className={styles.wrap} aria-labelledby="nf-title">
      <div className={styles.card}>
        <p className={styles.code}>
          <span className={styles.brace} aria-hidden="true">{"{ "}</span>
          404
          <span className={styles.brace} aria-hidden="true">{" }"}</span>
        </p>
        <h1 id="nf-title" className={styles.title}>
          {t("notFound.title")}
        </h1>
        <p className={styles.lead}>{t("notFound.lead")}</p>
        <a className={styles.home} href="/">
          <TbArrowLeft aria-hidden="true" />
          {t("notFound.home")}
        </a>
      </div>
    </section>
  );
}
