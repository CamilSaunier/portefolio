import { useTranslation } from "react-i18next";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import Reveal from "../../components/Reveal/Reveal";
import styles from "./Skills.module.css";

// Les noms de technologies ne sont pas traduits : seule la clé de catégorie l'est.
const GROUPS = [
  {
    category: "frontend",
    items: ["React", "TypeScript", "JavaScript", "HTML5 & CSS3", "Responsive Design", "Data Visualisation"],
  },
  {
    category: "backend",
    items: ["Node.js", "Express", "tsoa", "Prisma", "PostgreSQL", "Redis & BullMQ", "Docker", "API REST"],
  },
  {
    category: "tools",
    items: ["Git & GitHub", "Agile / Scrum", "Vite", "VS Code"],
  },
];

export default function Skills() {
  const { t } = useTranslation();

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeading eyebrow="03" title={t("skills.title")} subtitle={t("skills.subtitle")} />

        <div className={styles.grid}>
          {GROUPS.map((group, i) => (
            <Reveal key={group.category} className={styles.card} delay={i * 100}>
              <h3 className={styles.cardTitle}>{t(`skills.categories.${group.category}`)}</h3>
              <ul className={styles.tags}>
                {group.items.map((item) => (
                  <li key={item} className={styles.tag}>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
