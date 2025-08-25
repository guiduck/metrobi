import styles from "../styles.module.scss";

/**
 * @param {Object} props - Component props
 * @param {Object} props.activeRaceResult - Active race simulation result
 * @param {number} props.currentStep - Current animation step
 * @returns {JSX.Element|null} Steps table component or null if no result
 */
export function StepsTable({ activeRaceResult, currentStep }) {
  if (!activeRaceResult) return null;

  return (
    <div className={styles.stepsTable}>
      <div className={styles.tableContainer}>
        <h4>📋 Race Steps:</h4>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Step</th>
              <th>Achilles Pos</th>
              <th>Tortoise Pos</th>
              <th>Checkpoint</th>
              <th>Time (ms)</th>
            </tr>
          </thead>
          <tbody>
            {activeRaceResult.steps.map((step, index) => (
              <tr
                key={index}
                className={index <= currentStep ? styles.reachedRow : ""}
              >
                <td>{index}</td>
                <td>{step.achilles.position.toFixed(2)}</td>
                <td>{step.tortoise.position.toFixed(2)}</td>
                <td>{step.checkpoint.toFixed(2)}</td>
                <td>{step.time.toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
