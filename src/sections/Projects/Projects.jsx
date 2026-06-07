import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TbPlus } from "react-icons/tb";
import {
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiPostgresql,
  SiRedis,
  SiReactquery,
  SiReactrouter,
  SiMui,
  SiCss,
  SiSwagger,
  SiPhp,
  SiLaravel,
} from "react-icons/si";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import Reveal from "../../components/Reveal/Reveal";
import Lightbox from "../../components/Lightbox/Lightbox";
import ProjectDetail from "../../components/ProjectDetail/ProjectDetail";
import styles from "./Projects.module.css";

// Stack technique par projet (icône optionnelle : certaines technos n'ont pas
// de logo officiel -> affichées en puce texte). Affichée dans la modale détail.
// Stack du PROJET (techno utilisée par l'appli), pas seulement ce que Camil a
// codé : le back-end est consommé via Swagger côté front.
const STACKS = {
  one: {
    backend: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "Prisma", Icon: SiPrisma },
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "BullMQ" },
      { name: "Redis", Icon: SiRedis },
      { name: "Express", Icon: SiExpress },
      { name: "TSOA" },
    ],
    frontend: [
      { name: "React", Icon: SiReact },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "TanStack Query", Icon: SiReactquery },
      { name: "Zustand" },
      { name: "MUI Material", Icon: SiMui },
      { name: "React Router", Icon: SiReactrouter },
      { name: "CSS", Icon: SiCss },
    ],
    api: [{ name: "Swagger", Icon: SiSwagger }],
  },
  two: {
    backend: [
      { name: "PHP", Icon: SiPhp },
      { name: "Laravel", Icon: SiLaravel },
    ],
    frontend: [
      { name: "React", Icon: SiReact },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "MUI Material", Icon: SiMui },
      { name: "MUI X Charts", Icon: SiMui },
    ],
    api: [{ name: "Swagger", Icon: SiSwagger }],
  },
  three: {
    frontend: [{ name: "React", Icon: SiReact }, { name: "CSS", Icon: SiCss }, { name: "SEO local" }],
  },
};

// `shots` = [{ src, device, area? }]. `src` null = capture pas encore fournie.
const PROJECTS = [
  {
    id: "one",
    logo: "/Semantikmatch_logo.png",
    mono: true,
    private: true,
    shots: [
      { src: "/projects/Semantikmatch/Apply1.png", device: "desktop", area: "candidate" },
      { src: "/projects/Semantikmatch/Apply2.png", device: "desktop", area: "candidate" },
      { src: "/projects/Semantikmatch/Apply4.png", device: "desktop", area: "candidate" },
      { src: "/projects/Semantikmatch/Apply3.png", device: "phone", area: "candidate" },
      { src: "/projects/Semantikmatch/Apply5.png", device: "phone", area: "candidate" },
      { src: "/projects/Semantikmatch/Back-office1.png", device: "desktop", area: "recruiter" },
      { src: "/projects/Semantikmatch/Back-office2.png", device: "desktop", area: "recruiter" },
      { src: "/projects/Semantikmatch/Back-office3.png", device: "desktop", area: "recruiter" },
      { src: "/projects/Semantikmatch/Back-office4.png", device: "desktop", area: "recruiter" },
    ],
  },
  {
    id: "two",
    logo: "/Moustache_Logo.png",
    mono: true,
    private: true,
    shots: [{ src: null, device: "desktop" }],
  },
  {
    id: "three",
    logo: "/MS_climatisation_logo.png",
    mono: true,
    url: "https://ms-climatisations.com",
    shots: [],
  },
];

export default function Projects() {
  const { t } = useTranslation();
  // galerie active : { shots: [{src, caption}], title } | null
  const [gallery, setGallery] = useState(null);
  // détail projet affiché en surimpression : { title, intro, features } | null
  const [detail, setDetail] = useState(null);

  const openDetail = (project, details) => {
    setDetail({
      title: t(`projects.items.${project.id}.title`),
      logo: project.logo,
      mono: project.mono,
      intro: details.intro,
      features: details.features,
      stack: STACKS[project.id],
    });
  };

  const openGallery = (project) => {
    const title = t(`projects.items.${project.id}.title`);
    const shots = project.shots
      .filter((s) => s.src)
      .map((s) => {
        const area = s.area ? t(`projects.areas.${s.area}`) : "";
        const device = t(`projects.devices.${s.device}`);
        return {
          src: s.src,
          group: area, // sert à regrouper les miniatures par section
          caption: [area, device].filter(Boolean).join(" · "),
        };
      });
    setGallery({ shots, title });
  };

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading eyebrow="04" titleId="projects-title" title={t("projects.title")} subtitle={t("projects.subtitle")} />

        <div className={styles.grid}>
          {PROJECTS.map((project, i) => {
            const tags = t(`projects.items.${project.id}.tags`, { returnObjects: true });
            const details = t(`projects.items.${project.id}.details`, { returnObjects: true });
            const realShots = project.shots.filter((s) => s.src);
            const canPreview = realShots.length > 0;

            return (
              <Reveal key={project.id} className={styles.card} delay={i * 100}>
                <div className={styles.thumb}>
                  <img
                    src={project.logo}
                    alt={t(`projects.items.${project.id}.title`)}
                    loading="lazy"
                    className={`${styles.logo} ${project.mono ? styles.logoMono : ""}`}
                  />
                  {project.private && <span className={styles.badge}>{t("projects.privateRepo")}</span>}
                  {project.url && (
                    <span className={`${styles.badge} ${styles.badgeLive}`}>
                      <span className={styles.liveDot} />
                      {t("projects.live")}
                    </span>
                  )}
                  {details && details.features && (
                    <button
                      type="button"
                      className={styles.expand}
                      onClick={() => openDetail(project, details)}
                      aria-haspopup="dialog"
                      aria-label={t("projects.details")}
                      title={t("projects.details")}
                    >
                      <TbPlus aria-hidden="true" />
                    </button>
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

                  <div className={styles.actions}>
                    {canPreview && (
                      <button type="button" className={styles.preview} onClick={() => openGallery(project)}>
                        {t("projects.previews")}
                        <span className={styles.count}>{realShots.length}</span>
                      </button>
                    )}
                    {!canPreview && project.private && <span className={styles.soon}>{t("projects.comingSoon")}</span>}
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noreferrer" className={styles.visit}>
                        {t("projects.visit")}
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M7 17 17 7M7 7h10v10" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {gallery && <Lightbox shots={gallery.shots} title={gallery.title} onClose={() => setGallery(null)} />}

      {detail && (
        <ProjectDetail
          title={detail.title}
          logo={detail.logo}
          mono={detail.mono}
          intro={detail.intro}
          features={detail.features}
          stack={detail.stack}
          onClose={() => setDetail(null)}
        />
      )}
    </section>
  );
}
