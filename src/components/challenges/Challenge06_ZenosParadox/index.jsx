import { useState, useMemo } from "react";
import styles from "./styles.module.scss";
import { useRaceAnimation } from "../../../hooks/useRaceAnimation";
import {
  ControlsPanel,
  RaceTrack,
  StatsPanel,
  StepsTable,
  ExplanationPanel,
} from "./ui";

const TOTAL_ANIMATION_TIME = 10000; // 10s
const DEFAULT_SPEED_DECAY = 1;

/**
 * @param {number} distance - Total race distance
 * @param {number} tortoiseHeadStart - Tortoise initial head start
 * @returns {Object} Race result with steps, totalTime, and winner
 */
export const getRaceResult = (
  distance = 100,
  tortoiseHeadStart = 10,
  achillesSpeedDecay = DEFAULT_SPEED_DECAY
) => {
  const tortoiseSpeed = 1;
  const tortoiseStepsToFinish = distance / tortoiseSpeed;
  const tortoiseTime = TOTAL_ANIMATION_TIME / tortoiseStepsToFinish;

  const achillesSpeed = 2;
  const achillesStepsToFinish = distance / achillesSpeed;
  const achillesTime =
    (achillesStepsToFinish / tortoiseStepsToFinish) * tortoiseTime;

  let tortoise = {
    position: tortoiseHeadStart,
    speed: tortoiseSpeed,
    time: tortoiseTime,
    percentage: (tortoiseHeadStart / distance) * 100,
  };

  let achilles = {
    position: 0,
    speed: achillesSpeed,
    time: achillesTime,
    percentage: 0,
  };

  let checkpoint = tortoiseHeadStart;
  let steps = [];
  let currentTime = 0;

  steps.push({
    checkpoint,
    tortoise: { ...tortoise },
    achilles: { ...achilles },
    time: currentTime,
  });

  let lastCheckpoint = checkpoint;

  while (tortoise.position < distance) {
    if (achilles.position >= distance) {
      achilles.speed = 0;
    }

    if (
      achilles.position >= checkpoint &&
      tortoise.position > achilles.position
    ) {
      lastCheckpoint = checkpoint;
      checkpoint = tortoise.position;
    }

    tortoise.position += tortoise.speed;

    if (tortoise.position - checkpoint > (checkpoint - lastCheckpoint) / 2) {
      achilles.position += achilles.speed;
    }

    achilles.speed *= achillesSpeedDecay;

    tortoise.percentage = Math.min((tortoise.position / distance) * 100, 100);
    achilles.percentage = Math.min((achilles.position / distance) * 100, 100);

    currentTime += Math.min(tortoise.time, achilles.time);

    steps.push({
      checkpoint,
      tortoise: { ...tortoise },
      achilles: { ...achilles },
      time: currentTime,
    });
  }

  return {
    steps,
    totalTime: currentTime,
    winner: achilles.position >= distance ? "achilles" : "tortoise",
  };
};

export default function Challenge06_ZenosParadox() {
  const [distance, setDistance] = useState(100);
  const [tortoiseHeadStart, setTortoiseHeadStart] = useState(10);
  const [achillesSpeedDecay, setAchillesSpeedDecay] =
    useState(DEFAULT_SPEED_DECAY);

  const raceResult = useMemo(
    () => getRaceResult(distance, tortoiseHeadStart, achillesSpeedDecay),
    [distance, tortoiseHeadStart, achillesSpeedDecay]
  );

  const {
    isAnimating,
    currentStep,
    activeRaceResult,
    achillesRef,
    tortoiseRef,
    startAnimation,
    resetAnimation,
  } = useRaceAnimation(raceResult, tortoiseHeadStart, distance);

  /**
   * @returns {Object} step information for display
   */
  const getCurrentStepInfo = () => {
    if (!activeRaceResult || !activeRaceResult.steps[currentStep]) {
      return {
        step: 0,
        achillesPosition: 0,
        tortoisePosition: tortoiseHeadStart,
        achillesPercentage: 0,
        tortoisePercentage: (tortoiseHeadStart / distance) * 100,
        checkpoint: tortoiseHeadStart,
      };
    }

    const stepData = activeRaceResult.steps[currentStep];

    return {
      step: currentStep,
      achillesPosition: stepData.achilles.position,
      tortoisePosition: stepData.tortoise.position,
      achillesPercentage: stepData.achilles.percentage,
      tortoisePercentage: stepData.tortoise.percentage,
      checkpoint: stepData.checkpoint,
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
        <ControlsPanel
          distance={distance}
          setDistance={setDistance}
          tortoiseHeadStart={tortoiseHeadStart}
          setTortoiseHeadStart={setTortoiseHeadStart}
          achillesSpeedDecay={achillesSpeedDecay}
          setAchillesSpeedDecay={setAchillesSpeedDecay}
          isAnimating={isAnimating}
          onStartAnimation={startAnimation}
          onResetAnimation={resetAnimation}
        />

        <RaceTrack
          distance={distance}
          currentStep={currentStep}
          activeRaceResult={activeRaceResult}
          achillesRef={achillesRef}
          tortoiseRef={tortoiseRef}
          isAnimating={isAnimating}
          stepInfo={stepInfo}
        />

        <StatsPanel stepInfo={stepInfo} activeRaceResult={activeRaceResult} />

        <StepsTable
          activeRaceResult={activeRaceResult}
          currentStep={currentStep}
        />

        <ExplanationPanel />
      </div>
    </div>
  );
}
