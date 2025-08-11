import styles from "../styles.module.scss";

/**
 * @param {Object} props - Component props
 * @param {Array} props.examples - Array of example objects with text and label
 * @param {Function} props.onExampleClick - Function called when example is clicked
 * @returns {JSX.Element} Examples section component
 */
export function ExamplesSection({ examples, onExampleClick }) {
  return (
    <div className={styles.examples}>
      <h4>Quick Examples:</h4>
      <div className={styles.exampleGrid}>
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => onExampleClick(example.text)}
            className={`btn ${styles.exampleBtn}`}
            title={example.label}
          >
            <span className={styles.exampleText}>
              {example.text || "(empty)"}
            </span>
            <span className={styles.exampleLabel}>{example.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
