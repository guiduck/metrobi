import styles from "../styles.module.scss";

/**
 * @param {Object} props - Component props
 * @param {Object} props.stepInfo - Current step information
 * @param {Object} props.activeRaceResult - Active race simulation result
 * @returns {JSX.Element} Statistics panel component
 */
export function StatsPanel({ stepInfo, activeRaceResult }) {
  return (
    <div className={styles.statsSection}>
      <h4>📊 Current Status:</h4>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Current Step:</span>
          <span className={styles.statValue}>{stepInfo.step}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Achilles Position:</span>
          <span className={styles.statValue}>
            {stepInfo.achillesPosition.toFixed(2)}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Tortoise Position:</span>
          <span className={styles.statValue}>
            {stepInfo.tortoisePosition.toFixed(2)}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Current Checkpoint:</span>
          <span className={styles.statValue}>
            {stepInfo.checkpoint.toFixed(2)}
          </span>
        </div>
        {activeRaceResult && (
          <div className={styles.stat}>
            <span className={styles.statLabel}>Winner:</span>
            <span className={styles.statValue}>
              {activeRaceResult.winner === "achilles"
                ? "🏃‍♂️ Achilles"
                : "🐢 Tortoise"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
