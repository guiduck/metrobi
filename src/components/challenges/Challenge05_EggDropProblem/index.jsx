import { useState, useCallback, useMemo } from "react";
import styles from "./styles.module.scss";

/**
 * Solves the egg dropping problem using range division strategy
 * Always uses 2 eggs and 100 floors
 * @returns {Object} Result with drops, breaking floor, and worst case
 */
export function solveEggDrop(breakingFloor, searchRangeSize = 10) {
  const floors = 100;

  let firstEggDrops = 0;
  let secondEggDrops = 0;
  let foundBreakingFloor = null;

  let firstEggBrokeAt = null;
  for (
    let floor = searchRangeSize;
    floor <= floors - searchRangeSize;
    floor += searchRangeSize
  ) {
    firstEggDrops++;

    if (floor >= breakingFloor) {
      console.log("first egg broke at", floor);
      firstEggBrokeAt = floor;
      break;
    }
  }

  let searchStart = floors - searchRangeSize + 1,
    searchEnd = floors;

  if (!!firstEggBrokeAt) {
    searchStart = firstEggBrokeAt - searchRangeSize + 1;
    searchEnd = firstEggBrokeAt;

    console.log("first egg is broken");

    console.log("search start", searchStart);
    console.log("search end", searchEnd);
  }

  for (let floor = searchStart; floor <= searchEnd; floor++) {
    secondEggDrops++;

    if (floor >= breakingFloor) {
      console.log("second egg broke at:", floor);
      foundBreakingFloor = breakingFloor;
      break;
    }
  }

  const worstCaseDrops =
    Math.ceil(floors / searchRangeSize) - 1 + searchRangeSize;

  return {
    drops: firstEggDrops + secondEggDrops,
    worstCase: worstCaseDrops,
    firstEggDrops,
    secondEggDrops,
    breakingFloor: foundBreakingFloor,
  };
}

/**
 * Generates the optimal sequence for 100 floors with 2 eggs
 * Using range division strategy (10 ranges)
 */
export function getOptimal100FloorSequence() {
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
  const [breakingFloor, setBreakingFloor] = useState(
    Math.floor(Math.random() * 100) + 1
  );
  const [searchRangeSize, setSearchRangeSize] = useState(10);

  const handleSolve = useCallback(() => {
    setIsRunning(true);

    setTimeout(() => {
      const solution = solveEggDrop(breakingFloor, searchRangeSize);
      setResult(solution);
      setIsRunning(false);
    }, 1000);
  }, [breakingFloor, searchRangeSize]);

  const handleRandomizeBreakingFloor = useCallback(() => {
    const newBreakingFloor = Math.floor(Math.random() * 100) + 1;
    setBreakingFloor(newBreakingFloor);
    setResult(null);
  }, []);

  const handleReset = useCallback(() => {
    setResult(null);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>🥚 Egg Dropping Problem</h2>
        <p>
          A building has 100 floors. Find the highest floor an egg can be
          dropped from without breaking, using only 2 eggs and minimizing the
          worst-case number of drops.
        </p>
      </div>

      <div className={styles.configuration}>
        <div className={styles.breakingFloorDisplay}>
          <h3>
            🎯 Current Breaking Floor:{" "}
            <span className={styles.breakingFloorValue}>{breakingFloor}</span>
          </h3>
        </div>

        <div className={styles.configControls}>
          <div className={styles.inputGroup}>
            <label htmlFor="searchRangeSize" className={styles.label}>
              Search Range Size:
            </label>
            <input
              id="searchRangeSize"
              type="number"
              min="1"
              max="50"
              value={searchRangeSize}
              onChange={(e) => {
                setSearchRangeSize(Number(e.target.value));
                setResult(null);
              }}
              className={styles.input}
            />
          </div>

          <button onClick={handleRandomizeBreakingFloor} className="btn">
            🎲 Randomize Breaking Floor
          </button>
        </div>
      </div>

      <div className={styles.controls}>
        <button
          onClick={handleSolve}
          disabled={isRunning}
          className="btn primary"
        >
          {isRunning ? "Solving..." : "Solve Egg Drop Problem"}
        </button>

        {result && (
          <button onClick={handleReset} className="btn">
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
              <span className={styles.label}>Search range size Used:</span>
              <span className={styles.value}>{searchRangeSize}</span>
            </div>
          </div>

          <div className={styles.breakdown}>
            <p>
              <strong>Breakdown:</strong>
            </p>
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
          <strong>Range Division Strategy:</strong> Divide 100 floors into
          ranges of size {searchRangeSize}. Drop the first egg from each range
          boundary until it breaks. Then use the second egg to find the exact
          floor within that range using linear search.
        </p>
        <p>
          <strong>Worst Case:</strong>{" "}
          {Math.ceil(100 / searchRangeSize) - 1 + searchRangeSize} drops (
          {Math.ceil(100 / searchRangeSize) - 1} first egg drops +{" "}
          {searchRangeSize} second egg drops in the worst case scenario)
        </p>
      </div>
    </div>
  );
}
