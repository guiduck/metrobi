import styles from "../styles.module.scss";

/**
 * @param {Object} props - Component props
 * @param {number} props.distance - Current distance value
 * @param {Function} props.setDistance - Function to update distance
 * @param {number} props.tortoiseHeadStart - Current tortoise head start value
 * @param {Function} props.setTortoiseHeadStart - Function to update tortoise head start
 * @param {boolean} props.isAnimating - Whether animation is running
 * @param {Function} props.onStartAnimation - Function to start animation
 * @param {Function} props.onResetAnimation - Function to reset animation
 * @returns {JSX.Element} Controls panel component
 */
export function ControlsPanel({
  distance,
  setDistance,
  tortoiseHeadStart,
  setTortoiseHeadStart,
  achillesSpeedDecay,
  setAchillesSpeedDecay,
  isAnimating,
  onStartAnimation,
  onResetAnimation,
}) {
  return (
    <div className={styles.controlsSection}>
      <div className={styles.controlGroup}>
        <label htmlFor="distance">Distance (units):</label>
        <input
          id="distance"
          type="range"
          min="50"
          max="200"
          value={distance}
          onChange={(e) => setDistance(parseInt(e.target.value))}
          className={styles.slider}
          disabled={isAnimating}
        />
        <span className={styles.value}>{distance}</span>
      </div>

      <div className={styles.controlGroup}>
        <label htmlFor="headStart">Tortoise Head Start:</label>
        <input
          id="headStart"
          type="range"
          min="5"
          max="50"
          value={tortoiseHeadStart}
          onChange={(e) => setTortoiseHeadStart(parseInt(e.target.value))}
          className={styles.slider}
          disabled={isAnimating}
        />
        <span className={styles.value}>{tortoiseHeadStart}</span>
      </div>

      <div className={styles.controlGroup}>
        <label htmlFor="speedDecay">Achilles Speed Decay:</label>
        <input
          id="speedDecay"
          type="range"
          min="0.95"
          max="1"
          step="0.001"
          value={achillesSpeedDecay}
          onChange={(e) => setAchillesSpeedDecay(parseFloat(e.target.value))}
          className={styles.slider}
          disabled={isAnimating}
        />
        <span className={styles.value}>{achillesSpeedDecay}</span>
      </div>

      <div className={styles.actionButtons}>
        <button
          onClick={onStartAnimation}
          className="btn primary"
          disabled={isAnimating}
        >
          {isAnimating ? "🏃‍♂️ Running..." : "▶️ Start Animation"}
        </button>
        <button onClick={onResetAnimation} className="btn">
          🔄 Reset
        </button>
      </div>
    </div>
  );
}
