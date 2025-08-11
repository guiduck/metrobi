import styles from "../styles.module.scss";

/**
 * @param {Object} props - Component props
 * @param {Object} props.validation - Validation result object
 * @returns {JSX.Element|null} Result section component or null if no validation
 */
export function ResultSection({ validation }) {
  if (!validation) return null;

  return (
    <div className={styles.resultSection}>
      <div
        className={`${styles.result} ${
          validation.isValid ? styles.valid : styles.invalid
        }`}
      >
        <div className={styles.resultHeader}>
          <span className={styles.resultIcon}>
            {validation.isValid ? "✅" : "❌"}
          </span>
          <span className={styles.resultText}>
            {validation.isValid ? "Valid Brackets!" : "Invalid Brackets"}
          </span>
        </div>

        {!validation.isValid && (
          <div className={styles.errorDetails}>
            <p className={styles.errorMessage}>{validation.error}</p>
            {validation.position >= 0 && (
              <p className={styles.errorPosition}>
                Error at position: {validation.position + 1}
              </p>
            )}
            {validation.expected && (
              <p className={styles.expectedBracket}>
                Expected: <code>{validation.expected}</code>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
