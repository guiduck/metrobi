import { useState, useCallback, useMemo } from "react";
import styles from "./styles.module.scss";
import {
  ConfigurationSection,
  ControlsSection,
  LoadingSection,
  ResultSection,
  ExplanationSection,
} from "./ui";

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
      firstEggBrokeAt = floor;
      break;
    }
  }

  let searchStart = floors - searchRangeSize + 1,
    searchEnd = floors;

  if (!!firstEggBrokeAt) {
    searchStart = firstEggBrokeAt - searchRangeSize + 1;
    searchEnd = firstEggBrokeAt;
  }

  for (let floor = searchStart; floor <= searchEnd; floor++) {
    secondEggDrops++;

    if (floor >= breakingFloor) {
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

      <ConfigurationSection
        breakingFloor={breakingFloor}
        searchRangeSize={searchRangeSize}
        setSearchRangeSize={setSearchRangeSize}
        setResult={setResult}
        onRandomizeBreakingFloor={handleRandomizeBreakingFloor}
      />

      <ControlsSection
        isRunning={isRunning}
        result={result}
        onSolve={handleSolve}
        onReset={handleReset}
      />

      <LoadingSection isRunning={isRunning} />

      <ResultSection result={result} searchRangeSize={searchRangeSize} />

      <ExplanationSection searchRangeSize={searchRangeSize} />
    </div>
  );
}
