import styles from "../styles.module.scss";

/**
 * @param {Object} props - Component props
 * @param {Object} props.result - Solution result
 * @param {number} props.searchRangeSize - Search range size used
 * @returns {JSX.Element|null} Result section component or null if no result
 */
export function ResultSection({ result, searchRangeSize }) {
  if (!result) return null;

  if (result.error) {
    return (
      <div className={styles.error}>
        <p>❌ Error: {result.error}</p>
      </div>
    );
  }

  return (
    <div className={styles.result}>
      <h3>🎯 Solution Found!</h3>

      <div className={styles.resultGrid}>
        <div className={styles.resultItem}>
          <span className={styles.label}>Breaking Floor:</span>
          <span className={styles.value}>{result.breakingFloor}</span>
        </div>

        <div className={styles.resultItem}>
          <span className={styles.label}>Total Drops:</span>
          <span className={styles.value}>{result.drops}</span>
        </div>

        <div className={styles.resultItem}>
          <span className={styles.label}>Worst Case Scenario:</span>
          <span className={styles.value}>{result.worstCase} drops</span>
        </div>

        <div className={styles.resultItem}>
          <span className={styles.label}>Search range size Used:</span>
          <span className={styles.value}>{searchRangeSize}</span>
        </div>
      </div>

      <div className={styles.breakdown}>
        <p>
          <strong>Breakdown:</strong>
        </p>
        <ul>
          <li>First egg drops: {result.firstEggDrops}</li>
          <li>Second egg drops: {result.secondEggDrops}</li>
        </ul>
      </div>
    </div>
  );
}
