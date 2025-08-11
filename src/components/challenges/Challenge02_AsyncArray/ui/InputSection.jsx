import styles from "../styles.module.scss";

/**
 * @param {Object} props - Component props
 * @param {string} props.inputValue - Current input value
 * @param {Function} props.setInputValue - Function to update input value
 * @param {string} props.error - Error message if any
 * @param {boolean} props.isProcessing - Whether processing is active
 * @param {Function} props.onParseInput - Function to parse input
 * @param {Array} props.array - Parsed array
 * @param {Function} props.onStartProcessing - Function to start processing
 * @param {Function} props.onCancelProcessing - Function to cancel processing
 * @returns {JSX.Element} Input section component
 */
export function InputSection({
  inputValue,
  setInputValue,
  error,
  isProcessing,
  onParseInput,
  array,
  onStartProcessing,
}) {
  return (
    <div className={styles.inputSection}>
      <label htmlFor="arrayInput" className={styles.label}>
        Enter Array (JSON format):
      </label>
      <textarea
        id="arrayInput"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={styles.input}
        placeholder='["a", "b", "c", "d"]'
        rows="3"
        disabled={isProcessing}
      />

      <div className={styles.actions}>
        <button onClick={onParseInput} className="btn" disabled={isProcessing}>
          Parse Array
        </button>
        {array.length > 0 && (
          <button
            onClick={onStartProcessing}
            className="btn primary"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Start Processing"}
          </button>
        )}
      </div>

      {error && <div className={styles.error}>❌ {error}</div>}
    </div>
  );
}
