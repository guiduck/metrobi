import styles from "../styles.module.scss";

/**
 * @param {Object} props - Component props
 * @param {boolean} props.isRunning - Whether solution is running
 * @returns {JSX.Element|null} Loading section component or null if not running
 */
export function LoadingSection({ isRunning }) {
  if (!isRunning) return null;

  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
      <p>Dropping eggs and calculating optimal strategy...</p>
    </div>
  );
}
