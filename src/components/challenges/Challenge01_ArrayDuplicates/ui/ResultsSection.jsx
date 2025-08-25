import { stringifyNestedObjects } from "..";
import styles from "../styles.module.scss";

/**
 * @param {Object} props - Component props
 * @param {Array} props.array - Input array
 * @param {Array} props.duplicates - Found duplicates
 * @returns {JSX.Element} Results section component
 */
export function ResultsSection({ array, duplicates }) {
  if (array.length === 0) return null;

  return (
    <div className={styles.results}>
      <div className={styles.arrayDisplay}>
        <h4>Input Array:</h4>
        <div className={styles.arrayItems}>
          {array.map((item, index) => {
            const itemStringified = stringifyNestedObjects(item);
            const isDuplicate = duplicates.includes(itemStringified);

            return (
              <span
                key={index}
                className={`${styles.arrayItem} ${
                  isDuplicate ? styles.duplicate : ""
                }`}
              >
                {itemStringified}
              </span>
            );
          })}
        </div>
      </div>

      <div className={styles.duplicatesDisplay}>
        <h4>Duplicates Found:</h4>
        {duplicates.length > 0 ? (
          <div className={styles.duplicateItems}>
            {duplicates.map((item, index) => (
              <span key={index} className={styles.duplicateItem}>
                {item}
              </span>
            ))}
          </div>
        ) : (
          <p className={styles.noDuplicates}>✅ No duplicates found!</p>
        )}
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Total Items:</span>
          <span className={styles.statValue}>{array.length}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Unique Items:</span>
          <span className={styles.statValue}>{new Set(array).size}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Duplicate Types:</span>
          <span className={styles.statValue}>{duplicates.length}</span>
        </div>
      </div>
    </div>
  );
}
