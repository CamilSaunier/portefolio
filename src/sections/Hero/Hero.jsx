import { useTranslation } from "react-i18next";
import Socials from "../../components/Socials/Socials";
import { useTypewriter } from "../../hooks/useTypewriter";
import { useTypewriterLoop } from "../../hooks/useTypewriterLoop";
import styles from "./Hero.module.css";

export default function Hero() {
  const { t } = useTranslation();
  const role = t("hero.role");
  const { output: typedRole, done: roleDone } = useTypewriter(role, { speed: 45 });

  const taglinePrefix = t("hero.taglinePrefix");
  const taglineWords = t("hero.taglineWords", { returnObjects: true });
  const words = Array.isArray(taglineWords) ? taglineWords : [];
  // la boucle ne démarre qu'une fois le titre entièrement tapé
  const cycledWord = useTypewriterLoop(words, { start: roleDone });

  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-name">
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <span className={styles.badge}>
            <span className={styles.dot} />
            {t("hero.available")}
          </span>

          <p className={styles.greeting}>{t("hero.greeting")}</p>
          <h1 id="hero-name" className={styles.name}>{t("hero.name")}</h1>
          <h2 className={styles.role} aria-label={role}>
            <span aria-hidden="true">
              {typedRole}
              {!roleDone && <span className={styles.cursor}>_</span>}
            </span>
          </h2>
          <p className={styles.tagline}>
            <span aria-hidden="true">
              {taglinePrefix}
              <span className={styles.taglineWord}>
                {cycledWord}
                {roleDone && <span className={styles.cursor}>_</span>}
              </span>
            </span>
            {/* version stable et complète pour les lecteurs d'écran */}
            <span className="sr-only">
              {taglinePrefix}
              {words[0]}
            </span>
          </p>

          <div className={styles.cta}>
            <a href="#projects" className={styles.primary}>
              {t("hero.ctaProjects")}
            </a>
          </div>

          <Socials className={styles.socials} />
        </div>

        <div className={styles.portrait}>
          <div className={styles.frame}>
            <img
              src="/PHOTO_PROFIL-removebg-preview.png"
              alt={t("hero.name")}
              width="383"
              height="368"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>

      <a href="#about" className={styles.scroll} aria-label={t("hero.scroll")}>
        <span className={styles.mouse}>
          <span className={styles.wheel} />
        </span>
        {t("hero.scroll")}
      </a>
    </section>
  );
}
