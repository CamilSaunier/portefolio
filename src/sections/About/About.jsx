import { useTranslation } from "react-i18next";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import Reveal from "../../components/Reveal/Reveal";
import styles from "./About.module.css";

export default function About() {
  const { t } = useTranslation();

  const facts = [
    { key: "diploma" },
    { key: "experience" },
    { key: "location" },
    { key: "status" },
  ];

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          eyebrow="01"
          titleId="about-title"
          title={t("about.title")}
          subtitle={t("about.lead")}
        />

        <div className={styles.grid}>
          <Reveal className={styles.text}>
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </Reveal>

          <Reveal className={styles.facts} delay={120}>
            {facts.map(({ key }) => (
              <div key={key} className={styles.fact}>
                <span className={styles.factLabel}>{t(`about.facts.${key}`)}</span>
                <span className={styles.factValue}>{t(`about.facts.${key}Value`)}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
