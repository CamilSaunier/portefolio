import { useTranslation } from "react-i18next";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import Reveal from "../../components/Reveal/Reveal";
import styles from "./Experience.module.css";

// Ordre chronologique inverse (le plus récent en haut)
const ITEMS = ["semantik", "mostache", "dwwm", "telecom"];

export default function Experience() {
  const { t } = useTranslation();

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading
          eyebrow="02"
          titleId="experience-title"
          title={t("experience.title")}
          subtitle={t("experience.subtitle")}
        />

        <ol className={styles.timeline}>
          {ITEMS.map((id, i) => (
            <Reveal as="li" key={id} className={styles.item} delay={i * 100}>
              <div className={styles.marker} aria-hidden="true" />
              <div className={styles.card}>
                <div className={styles.head}>
                  <h3 className={styles.role}>{t(`experience.items.${id}.role`)}</h3>
                  <span className={styles.period}>{t(`experience.items.${id}.period`)}</span>
                </div>
                <p className={styles.company}>{t(`experience.items.${id}.company`)}</p>
                <p className={styles.desc}>{t(`experience.items.${id}.description`)}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
