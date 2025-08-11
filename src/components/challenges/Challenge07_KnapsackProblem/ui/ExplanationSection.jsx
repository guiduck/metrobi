import styles from "../styles.module.scss";

/**
 * @returns {JSX.Element} Explanation section component
 */
export function ExplanationSection() {
  return (
    <div className={styles.explanationSection}>
      <h4>🧠 How We Find The Most Expensive Bag:</h4>
      <div className={styles.steps}>
        <div className={styles.step}>
          <h5>1. The Question:</h5>
          <p>
            "What's the most expensive bag of carrots I can make without going
            over the weight limit?"
          </p>
        </div>
        <div className={styles.step}>
          <h5>2. Build a Smart Table:</h5>
          <p>
            For each carrot type and weight limit, we ask: "What's the best
            price I can get?" We fill in a table step by step.
          </p>
        </div>
        <div className={styles.step}>
          <h5>3. Make Smart Choices:</h5>
          <p>
            For each carrot, we decide: "Should I include this carrot or not?"
            We pick whichever choice gives us more money.
          </p>
        </div>
        <div className={styles.step}>
          <h5>4. Find Which Carrots to Pick:</h5>
          <p>
            Once our table is complete, we trace back through it to see exactly
            which carrots gave us the best total price.
          </p>
        </div>
      </div>
    </div>
  );
}
