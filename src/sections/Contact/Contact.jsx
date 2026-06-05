import { useTranslation } from "react-i18next";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import Reveal from "../../components/Reveal/Reveal";
import Socials from "../../components/Socials/Socials";
import styles from "./Contact.module.css";

const EMAIL = "camilsaunier@gmail.com";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <div className={styles.card}>
          <SectionHeading
            titleId="contact-title"
            title={t("contact.title")}
            subtitle={t("contact.subtitle")}
          />

          <Reveal className={styles.actions} delay={120}>
            <a href={`mailto:${EMAIL}`} className={styles.cta}>
              {t("contact.cta")}
            </a>
            <a href={`mailto:${EMAIL}`} className={styles.email}>
              {EMAIL}
            </a>
          </Reveal>

          <Reveal className={styles.socials} delay={200}>
            <span className={styles.socialsLabel}>{t("contact.socials")}</span>
            <Socials />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
