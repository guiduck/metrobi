import styles from "../styles.module.scss";

/**
 * @param {Object} props - Component props
 * @param {number} props.capacity - Current bag capacity
 * @param {Function} props.setCapacity - Function to update capacity
 * @param {Function} props.onSolve - Function to solve knapsack
 * @param {Function} props.onRandomCarrots - Function to generate random carrots
 * @param {Function} props.onResetExample - Function to reset to example
 * @returns {JSX.Element} Configuration section component
 */
export function ConfigurationSection({
  capacity,
  setCapacity,
  onSolve,
  onRandomCarrots,
  onResetExample,
}) {
  return (
    <div className={styles.inputSection}>
      <div className={styles.capacityInput}>
        <label htmlFor="capacity">
          <strong>🎒 Bag Capacity (kg):</strong>
        </label>
        <input
          id="capacity"
          type="number"
          min="1"
          max="100"
          value={capacity}
          onChange={(e) => setCapacity(parseInt(e.target.value) || 1)}
          className={styles.capacityField}
        />
      </div>

      <div className={styles.actions}>
        <button onClick={onSolve} className="btn primary">
          🧮 Solve Knapsack
        </button>
        <button onClick={onRandomCarrots} className="btn">
          🎲 Random Carrots
        </button>
        <button onClick={onResetExample} className="btn">
          🔄 Reset Example
        </button>
      </div>
    </div>
  );
}
