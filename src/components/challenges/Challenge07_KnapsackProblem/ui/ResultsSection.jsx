import styles from "../styles.module.scss";

/**
 * @param {Object} props - Component props
 * @param {Object} props.solution - Solution object from knapsack algorithm
 * @returns {JSX.Element|null} Results section component or null if no solution
 */
export function ResultsSection({ solution }) {
  if (!solution) return null;

  const totalWeight = solution.usedWeight || 0;
  const totalCarrots = solution.selectedCarrots.reduce(
    (sum, carrot) => sum + carrot.count,
    0
  );

  return (
    <div className={styles.resultsSection}>
      <h4>📊 Most Expensive Bag Found:</h4>
      <div className={styles.summary}>
        <div className={styles.summaryCards}>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Maximum Price:</span>
            <span className={styles.summaryValue}>${solution.maxPrice}</span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Total Weight:</span>
            <span className={styles.summaryValue}>{totalWeight} kg</span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Total Carrots:</span>
            <span className={styles.summaryValue}>{totalCarrots}</span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Price per kg:</span>
            <span className={styles.summaryValue}>
              {totalWeight > 0
                ? (solution.maxPrice / totalWeight).toFixed(1)
                : 0}{" "}
              $/kg
            </span>
          </div>
        </div>

        <div className={styles.selectedItems}>
          <h5>Carrots in Your Bag:</h5>
          {solution.selectedCarrots.map((carrot, index) => (
            <div key={index} className={styles.selectedItem}>
              <span className={styles.itemName}>
                {carrot.count}x {carrot.name}
              </span>
              <span className={styles.itemDetails}>
                {carrot.totalWeight}kg total - ${carrot.totalPrice} total (
                {(carrot.price / carrot.kg).toFixed(1)} $/kg each)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
