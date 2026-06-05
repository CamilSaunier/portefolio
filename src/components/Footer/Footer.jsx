import { useTranslation } from "react-i18next";
import styles from "./Footer.module.css";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          © {year} Camil Saunier. {t("footer.rights")}
        </p>
        <p className={styles.built}>{t("footer.builtWith")}</p>
      </div>
    </footer>
  );
}
