import styles from "../styles.module.scss";

/**
 * @param {Object} props - Component props
 * @param {Object} props.greedyApproach - Greedy algorithm result
 * @param {Object} props.solution - Optimal solution result
 * @returns {JSX.Element} Comparison section component
 */
export function ComparisonSection({ greedyApproach, solution }) {
  const greedyWeight = greedyApproach.selected.reduce(
    (sum, carrot) => sum + carrot.kg,
    0
  );

  const optimalWeight = solution ? solution.usedWeight || 0 : 0;

  return (
    <div className={styles.comparisonSection}>
      <h4>🔄 Algorithm Comparison:</h4>
      <div className={styles.algorithms}>
        <div className={styles.algorithm}>
          <h5>Quick & Simple Approach:</h5>
          <p className={styles.algorithmDesc}>
            Pick carrots by best price/kg ratio first
          </p>
          <div className={styles.algorithmResult}>
            <p>Price: ${greedyApproach.totalValue}</p>
            <p>Weight: {greedyWeight}kg</p>
          </div>
        </div>

        {solution && (
          <div className={styles.algorithm}>
            <h5>Smart Table Approach:</h5>
            <p className={styles.algorithmDesc}>
              Build a table to find the truly best combination
            </p>
            <div className={styles.algorithmResult}>
              <p>Price: ${solution.maxPrice}</p>
              <p>Weight: {optimalWeight}kg</p>
              <p className={styles.improvement}>
                {solution.maxPrice > greedyApproach.totalValue && (
                  <span className={styles.better}>
                    +${solution.maxPrice - greedyApproach.totalValue} better!
                  </span>
                )}
                {solution.maxPrice === greedyApproach.totalValue && (
                  <span className={styles.same}>Same result!</span>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
