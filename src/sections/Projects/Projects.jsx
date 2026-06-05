import { useTranslation } from "react-i18next";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import Reveal from "../../components/Reveal/Reveal";
import styles from "./Projects.module.css";

// `image` pointe vers public/projects/. Remplace par tes vraies captures.
// `private` -> badge « Dépôt privé » ; `url` -> badge « Site en ligne » + lien.
const PROJECTS = [
  { id: "one", image: "/projects/project-1.png", private: true },
  { id: "two", image: "/projects/project-2.png", private: true },
  { id: "three", image: "/projects/project-3.png", url: "https://ms-climatisations.com" },
];

export default function Projects() {
  const { t } = useTranslation();

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="04"
          title={t("projects.title")}
          subtitle={t("projects.subtitle")}
        />

        <div className={styles.grid}>
          {PROJECTS.map((project, i) => {
            // returnObjects: récupère le tableau de tags depuis le JSON i18n
            const tags = t(`projects.items.${project.id}.tags`, { returnObjects: true });

            return (
              <Reveal key={project.id} className={styles.card} delay={i * 100}>
                <div className={styles.thumb}>
                  <img
                    src={project.image}
                    alt={t(`projects.items.${project.id}.title`)}
                    loading="lazy"
                    onError={(e) => {
                      // si la capture n'existe pas encore, on masque l'image
                      // et on laisse le fond dégradé du conteneur visible
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  {project.private && (
                    <span className={styles.badge}>{t("projects.privateRepo")}</span>
                  )}
                  {project.url && (
                    <span className={`${styles.badge} ${styles.badgeLive}`}>
                      <span className={styles.liveDot} />
                      {t("projects.live")}
                    </span>
                  )}
                </div>

                <div className={styles.body}>
                  <h3 className={styles.title}>{t(`projects.items.${project.id}.title`)}</h3>
                  <p className={styles.desc}>{t(`projects.items.${project.id}.description`)}</p>
                  <ul className={styles.tags}>
                    {Array.isArray(tags) &&
                      tags.map((tag) => (
                        <li key={tag} className={styles.tag}>
                          {tag}
                        </li>
                      ))}
                  </ul>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.visit}
                    >
                      {t("projects.visit")}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M7 17 17 7M7 7h10v10" />
                      </svg>
                    </a>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
