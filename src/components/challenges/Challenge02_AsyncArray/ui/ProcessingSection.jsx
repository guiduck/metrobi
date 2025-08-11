import styles from "../styles.module.scss";

/**
 * @param {Object} props - Component props
 * @param {boolean} props.isProcessing - Whether processing is active
 * @param {Array} props.processedItems - Array of processed items
 * @param {number} props.timeRemaining - Time remaining for next item
 * @param {number} props.currentProgress - Current progress count
 * @param {Array} props.array - Original array
 * @param {Function} props.getNextDelay - Function to get delay for each item
 * @returns {JSX.Element|null} Processing section component or null if no processing
 */
export function ProcessingSection({
  isProcessing,
  processedItems,
  timeRemaining,
  currentProgress,
  array,
  getNextDelay,
}) {
  if (!isProcessing && processedItems.length === 0) return null;

  return (
    <div className={styles.processingSection}>
      <div className={styles.progressHeader}>
        <h4>Processing Progress</h4>
        {isProcessing && (
          <div className={styles.timer}>
            Next item in:{" "}
            <span className={styles.countdown}>{timeRemaining}s</span>
          </div>
        )}
      </div>

      <div className={styles.processedList}>
        {processedItems.map((processed, index) => (
          <div key={index} className={styles.processedItem}>
            <div className={styles.processedHeader}>
              <span className={styles.processedIndex}>
                #{processed.index + 1}
              </span>
              <span className={styles.processedTime}>
                {processed.timestamp}
              </span>
            </div>
            <div className={styles.processedContent}>
              <span className={styles.processedValue}>
                {JSON.stringify(processed.item)}
              </span>
              <span className={styles.processedDelay}>
                Delay: {processed.delay}s
              </span>
            </div>
          </div>
        ))}
      </div>

      {isProcessing && currentProgress < array.length && (
        <div className={styles.nextItem}>
          <span>Next: </span>
          <span className={styles.nextValue}>
            {JSON.stringify(array[currentProgress])}
          </span>
          <span className={styles.nextDelay}>
            (in {getNextDelay(currentProgress)}s)
          </span>
        </div>
      )}
    </div>
  );
}
