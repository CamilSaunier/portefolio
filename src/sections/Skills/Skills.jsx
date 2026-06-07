import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiSequelize,
  SiPrisma,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiGit,
  SiGithub,
  SiVite,
} from "react-icons/si";
import {
  TbBrandVscode,
  TbBulb,
  TbCompass,
  TbShieldCheck,
  TbMessageDots,
  TbUsers,
  TbArrowsShuffle,
} from "react-icons/tb";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import Reveal from "../../components/Reveal/Reveal";
import styles from "./Skills.module.css";

// Hard skills : logos groupés par catégorie
const HARD = [
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
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "Sequelize", Icon: SiSequelize },
      { name: "Prisma", Icon: SiPrisma },
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

// Soft skills : icônes + libellés i18n
const SOFT = [
  { key: "problemSolving", Icon: TbBulb },
  { key: "autonomy", Icon: TbCompass },
  { key: "rigor", Icon: TbShieldCheck },
  { key: "communication", Icon: TbMessageDots },
  { key: "teamwork", Icon: TbUsers },
  { key: "adaptability", Icon: TbArrowsShuffle },
];

export default function Skills() {
  const { t } = useTranslation();
  const [mode, setMode] = useState("hard");

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          eyebrow="03"
          titleId="skills-title"
          title={t("skills.title")}
          subtitle={t("skills.subtitle")}
        />

        {/* Toggle Hard / Soft */}
        <Reveal>
          <div className={styles.toggle} role="tablist" aria-label={t("skills.title")}>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "hard"}
              className={`${styles.toggleBtn} ${mode === "hard" ? styles.toggleActive : ""}`}
              onClick={() => setMode("hard")}
            >
              {t("skills.hard")}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "soft"}
              className={`${styles.toggleBtn} ${mode === "soft" ? styles.toggleActive : ""}`}
              onClick={() => setMode("soft")}
            >
              {t("skills.soft")}
            </button>
            <span className={styles.toggleThumb} data-mode={mode} aria-hidden="true" />
          </div>
        </Reveal>

        {/* Contenu : key={mode} -> remonte et rejoue l'animation de balayage */}
        <div className={styles.stage}>
          <div key={mode} className={`${styles.panel} ${styles[mode]}`} role="tabpanel">
            {mode === "hard" ? (
              <div className={styles.grid}>
                {HARD.map((group) => (
                  <div key={group.category} className={styles.card}>
                    <h3 className={styles.cardTitle}>{t(`skills.categories.${group.category}`)}</h3>
                    <ul className={styles.items}>
                      {group.items.map(({ name, Icon }) => (
                        <li key={name} className={styles.item}>
                          <Icon className={styles.icon} aria-hidden="true" />
                          <span className={styles.name}>{name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul className={styles.softGrid}>
                {SOFT.map(({ key, Icon }) => (
                  <li key={key} className={styles.softItem}>
                    <Icon className={styles.softIcon} aria-hidden="true" />
                    <span className={styles.softLabel}>{t(`skills.softItems.${key}`)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
