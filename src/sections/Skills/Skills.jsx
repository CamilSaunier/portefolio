import { useTranslation } from "react-i18next";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiGit,
  SiGithub,
  SiVite,
} from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import Reveal from "../../components/Reveal/Reveal";
import styles from "./Skills.module.css";

// Chaque techno = un nom + son composant icône (rendu en couleur du thème).
const GROUPS = [
  {
    category: "frontend",
    items: [
      { name: "React", Icon: SiReact },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "HTML5", Icon: SiHtml5 },
      { name: "CSS3", Icon: SiCss },
    ],
  },
  {
    category: "backend",
    items: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Express", Icon: SiExpress },
      { name: "Prisma", Icon: SiPrisma },
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "Redis", Icon: SiRedis },
      { name: "Docker", Icon: SiDocker },
    ],
  },
  {
    category: "tools",
    items: [
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
      { name: "Vite", Icon: SiVite },
      { name: "VS Code", Icon: TbBrandVscode },
    ],
  },
];

export default function Skills() {
  const { t } = useTranslation();

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          eyebrow="03"
          titleId="skills-title"
          title={t("skills.title")}
          subtitle={t("skills.subtitle")}
        />

        <div className={styles.grid}>
          {GROUPS.map((group, i) => (
            <Reveal key={group.category} className={styles.card} delay={i * 100}>
              <h3 className={styles.cardTitle}>{t(`skills.categories.${group.category}`)}</h3>
              <ul className={styles.items}>
                {group.items.map(({ name, Icon }) => (
                  <li key={name} className={styles.item}>
                    <Icon className={styles.icon} aria-hidden="true" />
                    <span className={styles.name}>{name}</span>
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
