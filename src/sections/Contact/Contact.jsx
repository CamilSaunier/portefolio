import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TbMapPin, TbLanguage, TbCopy, TbCheck } from "react-icons/tb";
import Reveal from "../../components/Reveal/Reveal";
import Socials, { EMAIL } from "../../components/Socials/Socials";
import styles from "./Contact.module.css";

/**
 * Section Contact en « carte de visite » centrée sur le fond lava :
 * statut, accroche, bouton e-mail accentué, réseaux, puces localisation + langues.
 * Concentre tout au même endroit -> dense, pas de vide.
 */
export default function Contact() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* presse-papiers indisponible : on ignore silencieusement */
    }
  };

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <Reveal className={styles.card}>
          <span className={styles.status}>
            <span className={styles.dot} aria-hidden="true" />
            {t("contact.status")}
          </span>

          <h2 id="contact-title" className={styles.title}>
            <span className={styles.brace} aria-hidden="true">{"{ "}</span>
            {t("contact.title")}
            <span className={styles.brace} aria-hidden="true">{" }"}</span>
          </h2>

          <p className={styles.lead}>{t("contact.subtitle")}</p>

          <a className={styles.cta} href={`mailto:${EMAIL}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            {t("contact.cta")}
          </a>

          <button
            type="button"
            className={`${styles.emailText} ${copied ? styles.emailCopied : ""}`}
            onClick={copyEmail}
            title={t("contact.copy")}
            aria-label={t("contact.copy")}
          >
            {copied ? <TbCheck aria-hidden="true" /> : <TbCopy aria-hidden="true" />}
            <span aria-live="polite">{copied ? t("contact.copied") : EMAIL}</span>
          </button>

          <div className={styles.socialsWrap}>
            <span className={styles.socialsLabel}>{t("contact.socials")}</span>
            <Socials className={styles.socials} />
          </div>

          <ul className={styles.meta}>
            <li>
              <TbMapPin aria-hidden="true" />
              {t("contact.location")}
            </li>
            <li>
              <TbLanguage aria-hidden="true" />
              {t("contact.languages")}
            </li>
          </ul>

          {/* petit remerciement pour qui a tout lu jusqu'ici */}
          <p className={styles.thanks}>{t("contact.thanks")}</p>
        </Reveal>
      </div>
    </section>
  );
}
