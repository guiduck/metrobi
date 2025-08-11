import styles from "../styles.module.scss";

/**
 * @param {Object} props - Component props
 * @param {boolean} props.isRunning - Whether solution is running
 * @param {Object} props.result - Solution result
 * @param {Function} props.onSolve - Function to solve the problem
 * @param {Function} props.onReset - Function to reset the solution
 * @returns {JSX.Element} Controls section component
 */
export function ControlsSection({ isRunning, result, onSolve, onReset }) {
  return (
    <div className={styles.controls}>
      <button
        onClick={onSolve}
        disabled={isRunning}
        className="btn primary"
      >
        {isRunning ? "Solving..." : "Solve Egg Drop Problem"}
      </button>

      {result && (
        <button onClick={onReset} className="btn">
          Reset
        </button>
      )}
    </div>
  );
}
