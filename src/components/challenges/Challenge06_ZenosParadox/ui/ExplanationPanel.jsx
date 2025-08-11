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
            Achilles gives the tortoise a head start. Each time Achilles reaches
            where the tortoise was, the tortoise has moved a bit further.
          </p>
        </div>
        <div className={styles.explanationItem}>
          <h5>The Paradox:</h5>
          <p>
            Zeno argued that Achilles can never catch the tortoise because he
            must always first reach where the tortoise was.
          </p>
        </div>
        <div className={styles.explanationItem}>
          <h5>The Resolution:</h5>
          <p>
            While there are infinite steps, they form a convergent series. The
            sum approaches a finite limit, so Achilles does catch up!
          </p>
        </div>
        <div className={styles.explanationItem}>
          <h5>Mathematical Insight:</h5>
          <p>
            Position = Distance × (1 - ½ⁿ) where n is the number of steps. As n
            → ∞, position → Distance.
          </p>
        </div>
      </div>
    </div>
  );
}
