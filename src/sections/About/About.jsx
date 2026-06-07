import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TbEye } from "react-icons/tb";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import Reveal from "../../components/Reveal/Reveal";
import CvPreview from "../../components/CvPreview/CvPreview";
import { useTheme } from "../../context/ThemeContext";
import styles from "./About.module.css";

// Version anti-cache : à incrémenter après chaque `bash scripts/generate-cv.sh`
// (les fichiers gardent le même nom -> le ?v=N force le navigateur à recharger).
const V = "?v=9";

// chaque CV a deux variantes PDF : claire et sombre
const CVS = [
  {
    key: "cvFr",
    lang: "fr",
    light: `/cv/Camil_Saunier_CV_Francais.pdf${V}`,
    dark: `/cv/Camil_Saunier_CV_Francais_Sombre.pdf${V}`,
    lightPreview: [
      `/cv/Camil_Saunier_CV_Francais-1.png${V}`,
      `/cv/Camil_Saunier_CV_Francais-2.png${V}`,
    ],
    darkPreview: [
      `/cv/Camil_Saunier_CV_Francais_Sombre-1.png${V}`,
      `/cv/Camil_Saunier_CV_Francais_Sombre-2.png${V}`,
    ],
    available: true,
  },
  {
    key: "cvEn",
    lang: "en",
    light: `/cv/Camil_Saunier_CV_English.pdf${V}`,
    dark: `/cv/Camil_Saunier_CV_English_Sombre.pdf${V}`,
    lightPreview: [
      `/cv/Camil_Saunier_CV_English-1.png${V}`,
      `/cv/Camil_Saunier_CV_English-2.png${V}`,
    ],
    darkPreview: [
      `/cv/Camil_Saunier_CV_English_Sombre-1.png${V}`,
      `/cv/Camil_Saunier_CV_English_Sombre-2.png${V}`,
    ],
    available: true,
  },
];

// rend un texte avec des mots-clés marqués **ainsi** en accent (<strong>)
function highlight(text) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className={styles.hl}>
        {part}
      </strong>
    ) : (
      part
    )
  );
}

export default function About() {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const lang = i18n.resolvedLanguage;
  // CV affiché dans la modale d'aperçu : { title, light, dark } | null
  const [preview, setPreview] = useState(null);

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
          {["p1", "p2", "p3"].map((k) => (
            <p key={k}>{highlight(t(`about.${k}`))}</p>
          ))}
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
                  <TbEye aria-hidden="true" />
                  {label}
                  <span className={styles.cvSoon}>{t("about.cvSoon")}</span>
                </span>
              );
            }

            return (
              <button
                key={cv.key}
                type="button"
                className={`${styles.cvBtn} ${isPrimary ? styles.cvPrimary : styles.cvSecondary}`}
                onClick={() =>
                  setPreview({
                    title: label,
                    light: cv.light,
                    dark: cv.dark,
                    lightPreview: cv.lightPreview,
                    darkPreview: cv.darkPreview,
                  })
                }
                aria-haspopup="dialog"
              >
                <TbEye aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </Reveal>
      </div>

      {preview && (
        <CvPreview
          title={preview.title}
          light={preview.light}
          dark={preview.dark}
          lightPreview={preview.lightPreview}
          darkPreview={preview.darkPreview}
          initialVariant={theme}
          onClose={() => setPreview(null)}
        />
      )}
    </section>
  );
}
