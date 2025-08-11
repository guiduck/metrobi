import styles from "../styles.module.scss";

/**
 * @param {Object} props - Component props
 * @param {number} props.searchRangeSize - Current search range size
 * @returns {JSX.Element} Explanation section component
 */
export function ExplanationSection({ searchRangeSize }) {
  return (
    <div className={styles.explanation}>
      <h4>💡 How It Works:</h4>
      <p>
        <strong>Range Division Strategy:</strong> Divide 100 floors into
        ranges of size {searchRangeSize}. Drop the first egg from each range
        boundary until it breaks. Then use the second egg to find the exact
        floor within that range using linear search.
      </p>
      <p>
        <strong>Worst Case:</strong>{" "}
        {Math.ceil(100 / searchRangeSize) - 1 + searchRangeSize} drops (
        {Math.ceil(100 / searchRangeSize) - 1} first egg drops +{" "}
        {searchRangeSize} second egg drops in the worst case scenario)
      </p>
    </div>
  );
}
