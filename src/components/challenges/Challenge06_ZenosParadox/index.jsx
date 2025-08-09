import { useState, useCallback, useRef, useEffect } from "react";
import styles from "./styles.module.scss";

/**
 * Calculate Zeno's paradox progression
 * @param {number} distance - Total distance
 * @param {number} steps - Number of steps to calculate
 * @returns {Array} Array of positions for each step
 */
export function calculateZenosProgression(distance, steps) {
  // TODO: Implement Zeno's paradox progression calculation
  // Each step covers half of the remaining distance
  // Return array of positions: [0, step1_position, step2_position, ...]

  /* SOLUTION (uncomment to see the answer):
  const positions = [0];
  let currentPosition = 0;

  for (let i = 0; i < steps; i++) {
    const remainingDistance = distance - currentPosition;
    const stepDistance = remainingDistance / 2;
    currentPosition += stepDistance;
    positions.push(currentPosition);
  }

  return positions;
  */

  return [0];
}

/**
 * Calculate position for continuous animation
 * @param {number} time - Time elapsed (0-1)
 * @param {number} distance - Total distance
 * @returns {number} Current position
 */
export function calculateContinuousPosition(time, distance) {
  // TODO: Implement continuous position calculation for smooth animation
  // time: progress from 0 to 1
  // Return position approaching but never reaching distance
  // Hint: Use exponential decay formula

  return 0;
}

/**
 * Challenge 6: Zeno's Paradox Component
 * Animate the famous paradox of Achilles and the Tortoise
 */
export default function Challenge06_ZenosParadox() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [showSteps, setShowSteps] = useState(true);
  const [distance, setDistance] = useState(100);
  const [maxSteps, setMaxSteps] = useState(10);

  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const achillesRef = useRef(null);

  const positions = calculateZenosProgression(distance, maxSteps);

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
    setCurrentStep(0);
    startTimeRef.current = performance.now();

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const elapsed = (timestamp - startTimeRef.current) * animationSpeed;
      const stepDuration = 1000; // 1 second per step
      const currentStepFloat = Math.min(elapsed / stepDuration, maxSteps);

      setCurrentStep(currentStepFloat);

      // Update Achilles position
      if (achillesRef.current) {
        const position = calculateContinuousPosition(
          currentStepFloat / maxSteps,
          distance
        );
        const percentage = (position / distance) * 100;
        achillesRef.current.style.left = `${percentage}%`;
      }

      if (currentStepFloat < maxSteps && isAnimating) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [animationSpeed, maxSteps, distance, isAnimating]);

  const stopAnimation = useCallback(() => {
    setIsAnimating(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  const resetAnimation = useCallback(() => {
    stopAnimation();
    setCurrentStep(0);
    if (achillesRef.current) {
      achillesRef.current.style.left = "0%";
    }
  }, [stopAnimation]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const getCurrentStepInfo = () => {
    const stepIndex = Math.floor(currentStep);
    if (stepIndex >= positions.length - 1) {
      return {
        step: maxSteps,
        position: positions[positions.length - 1],
        remaining: distance - positions[positions.length - 1],
        percentage: (positions[positions.length - 1] / distance) * 100,
      };
    }

    const position =
      positions[stepIndex] +
      (positions[stepIndex + 1] - positions[stepIndex]) *
        (currentStep - stepIndex);
    return {
      step: currentStep,
      position,
      remaining: distance - position,
      percentage: (position / distance) * 100,
    };
  };

  const stepInfo = getCurrentStepInfo();

  return (
    <div className={styles.challenge}>
      <div className={styles.header}>
        <h3>🏃‍♂️ Zeno's Paradox Animation</h3>
        <p>
          Watch Achilles chase the tortoise in the famous mathematical paradox
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.controlsSection}>
          <div className={styles.controlGroup}>
            <label htmlFor="distance">Distance (units):</label>
            <input
              id="distance"
              type="range"
              min="50"
              max="200"
              value={distance}
              onChange={(e) => setDistance(parseInt(e.target.value))}
              className={styles.slider}
              disabled={isAnimating}
            />
            <span className={styles.value}>{distance}</span>
          </div>

          <div className={styles.controlGroup}>
            <label htmlFor="speed">Speed:</label>
            <input
              id="speed"
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
              className={styles.slider}
            />
            <span className={styles.value}>{animationSpeed}x</span>
          </div>

          <div className={styles.controlGroup}>
            <label htmlFor="steps">Max Steps:</label>
            <input
              id="steps"
              type="range"
              min="5"
              max="20"
              value={maxSteps}
              onChange={(e) => setMaxSteps(parseInt(e.target.value))}
              className={styles.slider}
              disabled={isAnimating}
            />
            <span className={styles.value}>{maxSteps}</span>
          </div>

          <div className={styles.actionButtons}>
            {!isAnimating ? (
              <button onClick={startAnimation} className="btn primary">
                ▶️ Start Animation
              </button>
            ) : (
              <button onClick={stopAnimation} className="btn">
                ⏸️ Pause
              </button>
            )}
            <button onClick={resetAnimation} className="btn">
              🔄 Reset
            </button>
          </div>

          <div className={styles.toggles}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={showSteps}
                onChange={(e) => setShowSteps(e.target.checked)}
              />
              Show step markers
            </label>
          </div>
        </div>

        <div className={styles.animationSection}>
          <div className={styles.raceTrack}>
            <div className={styles.trackLine}></div>

            {/* Step markers */}
            {showSteps &&
              positions.map((pos, index) => (
                <div
                  key={index}
                  className={`${styles.stepMarker} ${
                    index <= currentStep ? styles.reached : ""
                  }`}
                  style={{ left: `${(pos / distance) * 100}%` }}
                  title={`Step ${index}: ${pos.toFixed(2)} units`}
                >
                  {index}
                </div>
              ))}

            {/* Tortoise (at the finish line) */}
            <div className={styles.tortoise} style={{ left: "100%" }}>
              🐢
            </div>

            {/* Achilles */}
            <div
              ref={achillesRef}
              className={`${styles.achilles} ${
                isAnimating ? styles.running : ""
              }`}
            >
              🏃‍♂️
            </div>

            {/* Progress line */}
            <div
              className={styles.progressLine}
              style={{ width: `${stepInfo.percentage}%` }}
            ></div>
          </div>

          <div className={styles.trackLabels}>
            <span className={styles.startLabel}>Start (0)</span>
            <span className={styles.endLabel}>Finish ({distance})</span>
          </div>
        </div>

        <div className={styles.statsSection}>
          <h4>📊 Current Status:</h4>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Current Step:</span>
              <span className={styles.statValue}>
                {stepInfo.step.toFixed(2)}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Position:</span>
              <span className={styles.statValue}>
                {stepInfo.position.toFixed(2)}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Remaining:</span>
              <span className={styles.statValue}>
                {stepInfo.remaining.toFixed(2)}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Progress:</span>
              <span className={styles.statValue}>
                {stepInfo.percentage.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <div className={styles.stepsTable}>
          <h4>📋 Step Breakdown:</h4>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Step</th>
                  <th>Position</th>
                  <th>Distance Moved</th>
                  <th>Remaining</th>
                </tr>
              </thead>
              <tbody>
                {positions
                  .slice(0, Math.min(positions.length, 12))
                  .map((pos, index) => (
                    <tr
                      key={index}
                      className={index <= currentStep ? styles.reachedRow : ""}
                    >
                      <td>{index}</td>
                      <td>{pos.toFixed(3)}</td>
                      <td>
                        {index === 0
                          ? "0"
                          : (pos - positions[index - 1]).toFixed(3)}
                      </td>
                      <td>{(distance - pos).toFixed(3)}</td>
                    </tr>
                  ))}
                {positions.length > 12 && (
                  <tr>
                    <td colSpan="4" className={styles.moreRows}>
                      ... {positions.length - 12} more steps
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.explanationSection}>
          <h4>🧠 The Paradox Explained:</h4>
          <div className={styles.explanation}>
            <div className={styles.explanationItem}>
              <h5>The Setup:</h5>
              <p>
                Achilles gives the tortoise a head start. Each time Achilles
                reaches where the tortoise was, the tortoise has moved a bit
                further.
              </p>
            </div>
            <div className={styles.explanationItem}>
              <h5>The Paradox:</h5>
              <p>
                Zeno argued that Achilles can never catch the tortoise because
                he must always first reach where the tortoise was.
              </p>
            </div>
            <div className={styles.explanationItem}>
              <h5>The Resolution:</h5>
              <p>
                While there are infinite steps, they form a convergent series.
                The sum approaches a finite limit, so Achilles does catch up!
              </p>
            </div>
            <div className={styles.explanationItem}>
              <h5>Mathematical Insight:</h5>
              <p>
                Position = Distance × (1 - ½ⁿ) where n is the number of steps.
                As n → ∞, position → Distance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
