import styles from "../styles.module.scss";

/**
 * @param {Object} props - Component props
 * @param {Array} props.examples - Array of example arrays
 * @param {Function} props.onExampleClick - Function called when example is clicked
 * @returns {JSX.Element} Examples section component
 */
export function ExamplesSection({ examples, onExampleClick }) {
  return (
    <div className={styles.examples}>
      <h4>Quick Examples:</h4>
      <div className={styles.exampleButtons}>
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => onExampleClick(example)}
            className={`btn ${styles.exampleBtn}`}
            title={JSON.stringify(example)}
          >
            Example {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
