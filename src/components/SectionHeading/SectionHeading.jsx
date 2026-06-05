import Reveal from "../Reveal/Reveal";
import styles from "./SectionHeading.module.css";

export default function SectionHeading({ eyebrow, title, subtitle, titleId }) {
  return (
    <Reveal className={styles.wrap}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </Reveal>
  );
}
