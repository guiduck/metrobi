import styles from "../styles.module.scss";

/**
 * @returns {JSX.Element} Explanation panel component
 */
export function ExplanationPanel() {
  return (
    <div className={styles.explanationSection}>
      <h4>🧠 The Paradox Explained:</h4>
      <div className={styles.explanation}>
        <div className={styles.explanationItem}>
          <h5>The Setup:</h5>
          <p>
            Achilles (🏃‍♂️) is faster than the tortoise (🐢), but the tortoise
            gets a head start. This creates the famous paradox scenario.
          </p>
        </div>
        <div className={styles.explanationItem}>
          <h5>The Paradox:</h5>
          <p>
            Zeno argued: "Every time Achilles reaches where the tortoise was,
            the tortoise has moved further. Therefore, Achilles can never catch
            up!"
          </p>
        </div>
        <div className={styles.explanationItem}>
          <h5>Reality vs Theory:</h5>
          <p>
            In reality, Achilles SHOULD overtake the tortoise because he's
            faster. The paradox is just a mathematical thought experiment about
            infinite steps.
          </p>
        </div>
        <div className={styles.explanationItem}>
          <h5>This Simulation:</h5>
          <p>
            Adjust the "Speed Decay" to see different outcomes:
            <br />• 1.0 = Achilles wins (reality)
            <br />• &lt;1.0 = Achilles gets tired (demonstrates the paradox)
          </p>
        </div>
      </div>
    </div>
  );
}
