import { useState, useCallback, useMemo } from "react";
import styles from "./styles.module.scss";

/**
 * Solve egg drop problem optimally using dynamic programming
 * @param {number} floors - Number of floors
 * @param {number} eggs - Number of eggs
 * @returns {Object} Solution with minimum drops and strategy
 */
export function solveEggDrop(floors, eggs) {
  // TODO: Implement the egg drop problem using dynamic programming
  // Return: { minDrops: number, strategy: number[] }
  // minDrops: minimum number of drops needed in worst case
  // strategy: array of floor numbers to try in optimal order

  /* SOLUTION (uncomment to see the answer):
  if (floors <= 0 || eggs <= 0) return { minDrops: 0, strategy: [] };
  if (eggs === 1) return {
    minDrops: floors,
    strategy: Array.from({ length: floors }, (_, i) => i + 1),
  };
  if (floors === 1) return { minDrops: 1, strategy: [1] };

  const dp = Array(floors + 1)
    .fill()
    .map(() => Array(eggs + 1).fill(0));

  for (let i = 1; i <= floors; i++) {
    dp[i][1] = i;
  }
  for (let j = 1; j <= eggs; j++) {
    dp[1][j] = 1;
  }

  for (let i = 2; i <= floors; i++) {
    for (let j = 2; j <= eggs; j++) {
      dp[i][j] = Infinity;
      for (let k = 1; k <= i; k++) {
        const worstCase = 1 + Math.max(dp[k - 1][j - 1], dp[i - k][j]);
        dp[i][j] = Math.min(dp[i][j], worstCase);
      }
    }
  }

  const strategy = [];
  let f = floors, e = eggs;
  while (f > 0 && e > 1) {
    for (let k = 1; k <= f; k++) {
      const worstCase = 1 + Math.max(dp[k - 1][e - 1], dp[f - k][e]);
      if (worstCase === dp[f][e]) {
        strategy.push(k);
        if (dp[k - 1][e - 1] > dp[f - k][e]) {
          f = k - 1;
          e = e - 1;
        } else {
          f = f - k;
        }
        break;
      }
    }
  }
  if (f > 0 && e === 1) {
    for (let i = 1; i <= f; i++) strategy.push(i);
  }

  return {
    minDrops: dp[floors][eggs],
    strategy: strategy.slice(0, dp[floors][eggs]),
  };
  */

  return { minDrops: 0, strategy: [] };
}

/**
 * Generate optimal floor sequence for 100 floors, 2 eggs
 * @returns {Array} Optimal sequence of floors to try
 */
export function getOptimal100FloorSequence() {
  // TODO: Generate the optimal sequence for 100 floors with 2 eggs
  // Hint: Think about mathematical optimization!

  /* SOLUTION (uncomment to see the answer):
  const sequence = [];
  let floor = 14;

  while (floor <= 100) {
    sequence.push(floor);
    floor += 15 - sequence.length;
  }

  return sequence;
  */

  return [];
}

/**
 * Challenge 5: Egg Drop Problem Component
 * Find optimal strategy for dropping eggs to find critical floor
 */
export default function Challenge05_EggDropProblem() {
  const [floors, setFloors] = useState(100);
  const [eggs, setEggs] = useState(2);
  const [solution, setSolution] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [simulationActive, setSimulationActive] = useState(false);

  const calculate = useCallback(async () => {
    if (floors > 20 && eggs > 3) {
      alert("For performance reasons, please use ≤20 floors with >3 eggs");
      return;
    }

    setIsCalculating(true);
    // Simulate calculation delay for larger problems
    await new Promise((resolve) =>
      setTimeout(resolve, floors > 10 ? 500 : 100)
    );

    const result = solveEggDrop(floors, eggs);
    setSolution(result);
    setIsCalculating(false);
  }, [floors, eggs]);

  const optimal100Solution = useMemo(() => {
    if (floors === 100 && eggs === 2) {
      return {
        minDrops: 14,
        strategy: getOptimal100FloorSequence(),
      };
    }
    return null;
  }, [floors, eggs]);

  const startSimulation = useCallback(() => {
    setSimulationActive(true);
    setSimulationStep(0);
  }, []);

  const stopSimulation = useCallback(() => {
    setSimulationActive(false);
    setSimulationStep(0);
  }, []);

  const handlePreset = (f, e) => {
    setFloors(f);
    setEggs(e);
    setSolution(null);
    setSimulationActive(false);
  };

  const renderBuilding = () => {
    const displayFloors = Math.min(floors, 20);
    const floorHeight = Math.max(20, 400 / displayFloors);

    return (
      <div
        className={styles.building}
        style={{ height: `${displayFloors * floorHeight}px` }}
      >
        {Array.from({ length: displayFloors }, (_, i) => {
          const floorNum = displayFloors - i;
          const isOptimal = solution?.strategy.includes(floorNum);
          const isCurrent =
            simulationActive &&
            simulationStep < solution?.strategy.length &&
            solution?.strategy[simulationStep] === floorNum;

          return (
            <div
              key={floorNum}
              className={`${styles.floor} ${
                isOptimal ? styles.optimalFloor : ""
              } ${isCurrent ? styles.currentFloor : ""}`}
              style={{ height: `${floorHeight}px` }}
            >
              <span className={styles.floorNumber}>{floorNum}</span>
              {isCurrent && <span className={styles.egg}>🥚</span>}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.challenge}>
      <div className={styles.header}>
        <h3>🥚 Egg Drop Problem</h3>
        <p>
          Find the highest floor from which an egg can be dropped without
          breaking
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.inputSection}>
          <div className={styles.inputGroup}>
            <label htmlFor="floors">Number of Floors:</label>
            <input
              id="floors"
              type="number"
              min="1"
              max="100"
              value={floors}
              onChange={(e) => setFloors(parseInt(e.target.value) || 1)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="eggs">Number of Eggs:</label>
            <input
              id="eggs"
              type="number"
              min="1"
              max="5"
              value={eggs}
              onChange={(e) => setEggs(parseInt(e.target.value) || 1)}
              className={styles.input}
            />
          </div>

          <button
            onClick={calculate}
            disabled={isCalculating}
            className="btn primary"
          >
            {isCalculating ? "Calculating..." : "Calculate Optimal Strategy"}
          </button>
        </div>

        <div className={styles.presets}>
          <h4>Quick Presets:</h4>
          <div className={styles.presetButtons}>
            <button onClick={() => handlePreset(10, 2)} className="btn">
              10 floors, 2 eggs
            </button>
            <button onClick={() => handlePreset(100, 2)} className="btn">
              100 floors, 2 eggs
            </button>
            <button onClick={() => handlePreset(5, 1)} className="btn">
              5 floors, 1 egg
            </button>
            <button onClick={() => handlePreset(15, 3)} className="btn">
              15 floors, 3 eggs
            </button>
          </div>
        </div>

        <div className={styles.visualSection}>
          <div className={styles.buildingContainer}>
            <h4>🏢 Building Visualization:</h4>
            {renderBuilding()}
            {floors > 20 && (
              <p className={styles.note}>Showing top 20 floors only</p>
            )}
          </div>

          {solution && (
            <div className={styles.solutionPanel}>
              <h4>📊 Optimal Solution:</h4>
              <div className={styles.solutionStats}>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Minimum Drops:</span>
                  <span className={styles.statValue}>{solution.minDrops}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Strategy Steps:</span>
                  <span className={styles.statValue}>
                    {solution.strategy.length}
                  </span>
                </div>
              </div>

              <div className={styles.strategy}>
                <h5>Drop Sequence:</h5>
                <div className={styles.strategySteps}>
                  {solution.strategy.slice(0, 10).map((floor, index) => (
                    <span
                      key={index}
                      className={`${styles.strategyStep} ${
                        simulationActive && index === simulationStep
                          ? styles.activeStep
                          : ""
                      }`}
                    >
                      Floor {floor}
                    </span>
                  ))}
                  {solution.strategy.length > 10 && (
                    <span className={styles.strategyStep}>
                      ... +{solution.strategy.length - 10} more
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.simulationControls}>
                {!simulationActive ? (
                  <button onClick={startSimulation} className="btn primary">
                    ▶️ Simulate Strategy
                  </button>
                ) : (
                  <button onClick={stopSimulation} className="btn">
                    ⏹️ Stop Simulation
                  </button>
                )}
              </div>

              {optimal100Solution && (
                <div className={styles.optimalInfo}>
                  <h5>💡 100-Floor Optimal Strategy:</h5>
                  <p>
                    Start at floor 14, then 27, 39, 50, 60, 69, 77, 84, 90, 95,
                    99, 100
                  </p>
                  <p>Worst case: 14 drops guaranteed</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.explanationSection}>
          <h4>🧠 How It Works:</h4>
          <div className={styles.explanation}>
            <div className={styles.explanationItem}>
              <h5>The Problem:</h5>
              <p>
                Find the highest floor from which an egg won't break, using
                minimum drops in worst case.
              </p>
            </div>
            <div className={styles.explanationItem}>
              <h5>Dynamic Programming:</h5>
              <p>
                For each (floors, eggs) pair, try all possible first drops and
                pick the one that minimizes worst-case drops.
              </p>
            </div>
            <div className={styles.explanationItem}>
              <h5>Optimal Strategy:</h5>
              <p>
                Balance between going too high (risk breaking) and too low (too
                many steps).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
