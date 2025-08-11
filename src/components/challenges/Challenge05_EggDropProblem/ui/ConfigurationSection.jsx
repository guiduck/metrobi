import styles from "../styles.module.scss";

/**
 * @param {Object} props - Component props
 * @param {number} props.breakingFloor - Current breaking floor value
 * @param {number} props.searchRangeSize - Current search range size
 * @param {Function} props.setSearchRangeSize - Function to update search range size
 * @param {Function} props.setResult - Function to set result
 * @param {Function} props.onRandomizeBreakingFloor - Function to randomize breaking floor
 * @returns {JSX.Element} Configuration section component
 */
export function ConfigurationSection({
  breakingFloor,
  searchRangeSize,
  setSearchRangeSize,
  setResult,
  onRandomizeBreakingFloor,
}) {
  return (
    <div className={styles.configuration}>
      <div className={styles.breakingFloorDisplay}>
        <h3>
          🎯 Current Breaking Floor:{" "}
          <span className={styles.breakingFloorValue}>{breakingFloor}</span>
        </h3>
      </div>

      <div className={styles.configControls}>
        <div className={styles.inputGroup}>
          <label htmlFor="searchRangeSize" className={styles.label}>
            Search Range Size:
          </label>
          <input
            id="searchRangeSize"
            type="number"
            min="1"
            max="50"
            value={searchRangeSize}
            onChange={(e) => {
              setSearchRangeSize(Number(e.target.value));
              setResult(null);
            }}
            className={styles.input}
          />
        </div>

        <button onClick={onRandomizeBreakingFloor} className="btn">
          🎲 Randomize Breaking Floor
        </button>
      </div>
    </div>
  );
}
