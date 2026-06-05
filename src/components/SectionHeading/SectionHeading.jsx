import Reveal from "../Reveal/Reveal";
import styles from "./SectionHeading.module.css";

export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <Reveal className={styles.wrap}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </Reveal>
  );
}
