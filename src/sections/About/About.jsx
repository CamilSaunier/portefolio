import { useTranslation } from "react-i18next";
import { TbDownload } from "react-icons/tb";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import Reveal from "../../components/Reveal/Reveal";
import styles from "./About.module.css";

// `available: false` -> bouton désactivé « bientôt » (dépose le PDF puis passe à true)
const CVS = [
  { key: "cvFr", lang: "fr", file: "/cv/Camil_Saunier_CV_Francais.pdf", available: true },
  { key: "cvEn", lang: "en", file: "/cv/Camil_Saunier_CV_English.pdf", available: true },
];

export default function About() {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage;

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          eyebrow="01"
          titleId="about-title"
          title={t("about.title")}
          subtitle={t("about.lead")}
        />

        <Reveal className={styles.text}>
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
        </Reveal>

        <Reveal className={styles.cv} delay={120}>
          {CVS.map((cv) => {
            const label = t(`about.${cv.key}`);
            // le CV dans la langue active est mis en avant (bouton plein)
            const isPrimary = cv.lang === lang;

            if (!cv.available) {
              return (
                <span
                  key={cv.key}
                  className={`${styles.cvBtn} ${styles.cvDisabled}`}
                  aria-disabled="true"
                >
                  <TbDownload aria-hidden="true" />
                  {label}
                  <span className={styles.cvSoon}>{t("about.cvSoon")}</span>
                </span>
              );
            }

            return (
              <a
                key={cv.key}
                href={cv.file}
                download
                className={`${styles.cvBtn} ${isPrimary ? styles.cvPrimary : styles.cvSecondary}`}
              >
                <TbDownload aria-hidden="true" />
                {label}
              </a>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
