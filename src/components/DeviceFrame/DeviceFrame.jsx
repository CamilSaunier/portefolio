import styles from "./DeviceFrame.module.css";

/**
 * Coque d'appareil (mobile ou tablette) en CSS.
 * - `type` : "phone" | "tablet" (change le ratio et la finesse du contour).
 * - `screenshot` : capture réelle (sinon `emptyLabel` centré).
 */
export default function DeviceFrame({ type = "phone", screenshot, emptyLabel, alt = "" }) {
  return (
    <div className={`${styles.device} ${styles[type]}`}>
      <div className={styles.screen}>
        {screenshot ? (
          <img className={styles.shot} src={screenshot} alt={alt} loading="lazy" />
        ) : (
          emptyLabel && <span className={styles.empty}>{emptyLabel}</span>
        )}
      </div>
    </div>
  );
}
