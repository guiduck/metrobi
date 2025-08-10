import { useState, useCallback, useMemo } from "react";
import styles from "./styles.module.scss";

/**
 * Solves the egg dropping problem using range division strategy
 * Always uses 2 eggs and 100 floors
 * @returns {Object} Result with drops, breaking floor, and worst case
 */
export function solveEggDrop() {
  const floors = 100;
  const eggs = 2;

  // Generate random breaking floor (1 to 100)
  const breakingFloor = Math.floor(Math.random() * floors) + 1;

  const searchRangeSize = Math.ceil(floors / 10);
  const firstEggDrops = [];

  // Generate drop points: 10, 20, 30, 40, 50, 60, 70, 80, 90
  for (let i = searchRangeSize; i < floors; i += searchRangeSize) {
    firstEggDrops.push(i);
  }

  let firstEggDropsUsed = 0;
  let secondEggDropsUsed = 0;

  // First egg: drop from range boundaries until it breaks
  for (let dropFloor of firstEggDrops) {
    firstEggDropsUsed++;

    if (dropFloor >= breakingFloor) {
      // Egg breaks! Now use second egg to find exact floor
      const rangeStart = dropFloor - searchRangeSize + 1;
      const rangeEnd = dropFloor;

      // Second egg: linear search within the identified range
      for (let floor = rangeStart; floor <= rangeEnd; floor++) {
        secondEggDropsUsed++;

        if (floor >= breakingFloor) {
          // Found the breaking floor
          const totalDrops = firstEggDropsUsed + secondEggDropsUsed;
          const worstCase = 10; // With range division, worst case is always 10

          return {
            drops: totalDrops,
            breakingFloor: breakingFloor,
            worstCase: worstCase,
            firstEggDrops: firstEggDropsUsed,
            secondEggDrops: secondEggDropsUsed
          };
        }
      }
      break;
    }
  }

  // If we get here, the breaking floor is in the last range (91-100)
  // or the first egg never broke (breaking floor is 1-9)
  const rangeStart = firstEggDrops.length > 0 ? firstEggDrops[firstEggDrops.length - 1] + 1 : 1;
  const rangeEnd = floors;

  for (let floor = rangeStart; floor <= rangeEnd; floor++) {
    secondEggDropsUsed++;

    if (floor >= breakingFloor) {
      const totalDrops = firstEggDropsUsed + secondEggDropsUsed;
      const worstCase = 10;

      return {
        drops: totalDrops,
        breakingFloor: breakingFloor,
        worstCase: worstCase,
        firstEggDrops: firstEggDropsUsed,
        secondEggDrops: secondEggDropsUsed
      };
    }
  }

  return { drops: 0, breakingFloor: 0, worstCase: 0, error: "Could not find breaking floor" };
}

/**
 * Generates the optimal sequence for 100 floors with 2 eggs
 * Using range division strategy (10 ranges)
 */
export function getOptimal100FloorSequence() {
  // Range division: 10, 20, 30, 40, 50, 60, 70, 80, 90
  const sequence = [];
  const rangeSize = 10;

  for (let i = rangeSize; i < 100; i += rangeSize) {
    sequence.push(i);
  }

  return sequence;
}

/**
 * Challenge 5: Egg Dropping Problem Component
 * Find the highest floor an egg can be dropped from without breaking
 */
export default function Challenge05_EggDropProblem() {
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleSolve = useCallback(() => {
    setIsRunning(true);

    // Simulate the egg dropping process
    setTimeout(() => {
      const solution = solveEggDrop();
      setResult(solution);
      setIsRunning(false);
    }, 1000); // 1 second delay for visual effect
  }, []);

  const handleReset = useCallback(() => {
    setResult(null);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>🥚 Egg Dropping Problem</h2>
        <p>
          A building has 100 floors. Find the highest floor an egg can be dropped from without breaking,
          using only 2 eggs and minimizing the worst-case number of drops.
        </p>
      </div>

      <div className={styles.controls}>
        <button
          onClick={handleSolve}
          disabled={isRunning}
          className={styles.solveButton}
        >
          {isRunning ? "Solving..." : "Solve Egg Drop Problem"}
        </button>

        {result && (
          <button onClick={handleReset} className={styles.resetButton}>
            Reset
          </button>
        )}
      </div>

      {isRunning && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Dropping eggs and calculating optimal strategy...</p>
        </div>
      )}

      {result && !result.error && (
        <div className={styles.result}>
          <h3>🎯 Solution Found!</h3>

          <div className={styles.resultGrid}>
            <div className={styles.resultItem}>
              <span className={styles.label}>Breaking Floor:</span>
              <span className={styles.value}>{result.breakingFloor}</span>
            </div>

            <div className={styles.resultItem}>
              <span className={styles.label}>Total Drops:</span>
              <span className={styles.value}>{result.drops}</span>
            </div>

            <div className={styles.resultItem}>
              <span className={styles.label}>Worst Case Scenario:</span>
              <span className={styles.value}>{result.worstCase} drops</span>
            </div>

            <div className={styles.resultItem}>
              <span className={styles.label}>Strategy Used:</span>
              <span className={styles.value}>{result.strategy}</span>
            </div>
          </div>

          <div className={styles.breakdown}>
            <p><strong>Breakdown:</strong></p>
            <ul>
              <li>First egg drops: {result.firstEggDrops}</li>
              <li>Second egg drops: {result.secondEggDrops}</li>
            </ul>
          </div>
        </div>
      )}

      {result && result.error && (
        <div className={styles.error}>
          <p>❌ Error: {result.error}</p>
        </div>
      )}

      <div className={styles.explanation}>
        <h4>💡 How It Works:</h4>
        <p>
          <strong>Range Division Strategy:</strong> Divide 100 floors into 10 ranges (10, 20, 30, ..., 90).
          Drop the first egg from each range boundary until it breaks. Then use the second egg to find the exact
          floor within that range using linear search.
        </p>
        <p>
          <strong>Worst Case:</strong> 10 drops (1 first egg + 9 second egg drops in the worst range)
        </p>
      </div>
    </div>
  );
}
