import { useState, useCallback, useRef, useEffect } from "react";

const TOTAL_ANIMATION_TIME = 10000; // 10s

/**
 * Custom hook for handling race animation
 * @param {Object} raceResult - Result from getRaceResult function
 * @param {number} tortoiseHeadStart - Tortoise head start distance
 * @param {number} distance - Total race distance
 * @returns {Object} Animation state and controls
 */
export const useRaceAnimation = (raceResult, tortoiseHeadStart, distance) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeRaceResult, setActiveRaceResult] = useState(null);

  const timeoutRef = useRef(null);
  const achillesRef = useRef(null);
  const tortoiseRef = useRef(null);

  const setInitialPositions = useCallback(() => {
    if (achillesRef.current) {
      achillesRef.current.style.transition = "none";
      achillesRef.current.style.left = "0%";
    }
    if (tortoiseRef.current) {
      tortoiseRef.current.style.transition = "none";
      tortoiseRef.current.style.left = `${
        (tortoiseHeadStart / distance) * 100
      }%`;
    }
  }, [tortoiseHeadStart, distance]);

  /**
   * @param {Object} step - Animation step data
   * @param {number} stepDuration - Duration for this step in milliseconds
   */
  const animateToStep = useCallback((step, stepDuration) => {
    if (achillesRef.current) {
      achillesRef.current.style.transition = `left ${stepDuration}ms ease-out`;
      achillesRef.current.style.left = `${step.achilles.percentage}%`;
    }
    if (tortoiseRef.current) {
      tortoiseRef.current.style.transition = `left ${stepDuration}ms ease-out`;
      tortoiseRef.current.style.left = `${step.tortoise.percentage}%`;
    }
  }, []);

  /**
   * @param {number} stepIndex - Index of the current step
   * @param {Array} steps - Array of all animation steps
   * @param {Object} currentRaceResult - The race result to use for calculations
   */
  const getStepDuration = useCallback((stepIndex, steps, currentRaceResult) => {
    if (stepIndex === 0) return 100;

    const currentStep = steps[stepIndex];
    const previousStep = steps[stepIndex - 1];
    const stepTime = currentStep.time - previousStep.time;

    return (stepTime / currentRaceResult.totalTime) * TOTAL_ANIMATION_TIME;
  }, []);

  /**
   * @param {number} stepIndex - Index of the step to execute
   * @param {Object} currentRaceResult - The race result to use for animation
   */
  const executeAnimationStep = useCallback(
    (stepIndex, currentRaceResult) => {
      if (!currentRaceResult || stepIndex >= currentRaceResult.steps.length) {
        setIsAnimating(false);
        return;
      }

      const step = currentRaceResult.steps[stepIndex];
      const stepDuration = getStepDuration(
        stepIndex,
        currentRaceResult.steps,
        currentRaceResult
      );

      console.log(`Step ${stepIndex}:`, {
        stepDuration,
        achillesPos: step.achilles.position,
        tortoisePos: step.tortoise.position,
        achillesPercentage: step.achilles.percentage,
        tortoisePercentage: step.tortoise.percentage,
        stepTime: step.time,
      });

      animateToStep(step, stepDuration);
      setCurrentStep(stepIndex);

      if (stepIndex + 1 >= currentRaceResult.steps.length) {
        setIsAnimating(false);
        return;
      }

      timeoutRef.current = setTimeout(() => {
        executeAnimationStep(stepIndex + 1, currentRaceResult);
      }, stepDuration);
    },
    [getStepDuration, animateToStep]
  );

  const startAnimation = useCallback(() => {
    if (!raceResult || isAnimating) return;

    console.log("Starting animation with race result:", raceResult);

    setActiveRaceResult(raceResult);
    setIsAnimating(true);
    setCurrentStep(0);
    setInitialPositions();

    setTimeout(() => executeAnimationStep(0, raceResult), 50);
  }, [raceResult, isAnimating, setInitialPositions, executeAnimationStep]);

  const resetAnimation = useCallback(() => {
    if (!timeoutRef.current) return;

    setIsAnimating(false);
    clearTimeout(timeoutRef.current);
    setCurrentStep(0);
    setActiveRaceResult(null);
    setInitialPositions();
  }, [setInitialPositions]);

  useEffect(() => {
    return () => {
      if (!timeoutRef.current) return;

      clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    isAnimating,
    currentStep,
    activeRaceResult,

    achillesRef,
    tortoiseRef,

    startAnimation,
    resetAnimation,
  };
};
