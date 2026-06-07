import { useEffect, useState } from "react";
import styles from "./ScrollProgress.module.css";

/**
 * Fin trait accent en haut de page qui se remplit selon la position de scroll.
 * Animé par scaleX (GPU) -> fluide ; décoratif donc aria-hidden.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? el.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={styles.bar} style={{ transform: `scaleY(${progress})` }} aria-hidden="true" />
  );
}
