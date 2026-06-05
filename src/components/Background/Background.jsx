import styles from "./Background.module.css";

/**
 * Fond animé "lava lamp" : quelques taches floues qui dérivent lentement.
 * 100% CSS (aucun JS d'animation), placé en z-index -1 derrière tout le contenu.
 * Décoratif uniquement → aria-hidden.
 */
export default function Background() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <span className={`${styles.blob} ${styles.blob1}`} />
      <span className={`${styles.blob} ${styles.blob2}`} />
      <span className={`${styles.blob} ${styles.blob3}`} />
    </div>
  );
}
