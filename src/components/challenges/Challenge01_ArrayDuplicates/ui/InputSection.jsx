import styles from "../styles.module.scss";

/**
 * @param {Object} props - Component props
 * @param {string} props.inputValue - Current input value
 * @param {Function} props.setInputValue - Function to update input value
 * @param {boolean} props.error - Error message if any
 * @param {Function} props.onParseInput - Function to parse input
 * @returns {JSX.Element} Input section component
 */
export function InputSection({
  inputValue,
  setInputValue,
  error,
  onParseInput,
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
        placeholder='["a", "b", "c", "a", "d", "b"]'
        rows="3"
      />

      <div className={styles.actions}>
        <button onClick={onParseInput} className="btn primary">
          Find Duplicates
        </button>
      </div>

      {error && <div className={styles.error}>❌ {error}</div>}
    </div>
  );
}
