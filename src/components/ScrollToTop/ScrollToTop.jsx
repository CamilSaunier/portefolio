import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TbArrowUp } from "react-icons/tb";
import styles from "./ScrollToTop.module.css";

/**
 * Bouton flottant « retour en haut » : n'apparaît qu'une fois la page scrollée.
 */
export default function ScrollToTop() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`${styles.btn} ${visible ? styles.visible : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t("a11y.toTop")}
      title={t("a11y.toTop")}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <TbArrowUp aria-hidden="true" />
    </button>
  );
}
