import styles from "../styles.module.scss";

/**
 * @param {Object} props - Component props
 * @param {number} props.distance - Total race distance
 * @param {number} props.currentStep - Current animation step
 * @param {Object} props.activeRaceResult - Active race simulation result
 * @param {React.RefObject} props.achillesRef - Ref for Achilles element
 * @param {React.RefObject} props.tortoiseRef - Ref for Tortoise element
 * @param {boolean} props.isAnimating - Whether animation is running
 * @param {Object} props.stepInfo - Current step information
 * @returns {JSX.Element} Race track component
 */
export function RaceTrack({
  distance,
  currentStep,
  activeRaceResult,
  achillesRef,
  tortoiseRef,
  isAnimating,
  stepInfo,
}) {
  return (
    <div className={styles.animationSection}>
      <div className={styles.raceTrack}>
        <div className={styles.trackLine}></div>

        {/* Checkpoint markers - only show after reaching each step */}
        {activeRaceResult &&
          activeRaceResult.steps.map((step, index) => {
            const shouldShowCheckpoint = index <= currentStep;

            if (!shouldShowCheckpoint) return null;

            return (
              <div
                key={index}
                className={`${styles.checkpoint} ${
                  index <= currentStep ? styles.reached : ""
                }`}
                style={{ left: `${(step.checkpoint / distance) * 100}%` }}
                title={`Checkpoint ${index}: ${step.checkpoint.toFixed(
                  2
                )} units`}
              >
                📍
              </div>
            );
          })}

        {/* Finish line */}
        <div className={styles.finishLine} style={{ left: "100%" }}>
          🏁
        </div>

        {/* Tortoise */}
        <div
          ref={tortoiseRef}
          className={`${styles.tortoise} ${isAnimating ? styles.moving : ""}`}
          style={{ left: `${stepInfo.tortoisePercentage}%` }}
        >
          🐢
        </div>

        {/* Achilles */}
        <div
          ref={achillesRef}
          className={`${styles.achilles} ${isAnimating ? styles.running : ""}`}
          style={{ left: `${stepInfo.achillesPercentage}%` }}
        >
          🏃‍♂️
        </div>
      </div>

      <div className={styles.trackLabels}>
        <span className={styles.startLabel}>Start (0)</span>
        <span className={styles.endLabel}>Finish ({distance})</span>
      </div>
    </div>
  );
}
