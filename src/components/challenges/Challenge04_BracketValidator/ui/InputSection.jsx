import styles from "../styles.module.scss";

/**
 * @param {Object} props - Component props
 * @param {string} props.input - Current input value
 * @param {Function} props.setInput - Function to update input value
 * @param {Function} props.setValidation - Function to set validation result
 * @param {Function} props.onValidate - Function to validate brackets
 * @returns {JSX.Element} Input section component
 */
export function InputSection({ input, setInput, setValidation, onValidate }) {
  return (
    <div className={styles.inputSection}>
      <label htmlFor="bracketInput" className={styles.label}>
        Enter string with brackets:
      </label>
      <input
        id="bracketInput"
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setValidation(null);
        }}
        className={styles.input}
        placeholder="Enter brackets like {[()]}"
      />

      <div className={styles.actions}>
        <button onClick={onValidate} className="btn primary">
          Validate Brackets
        </button>
      </div>
    </div>
  );
}
