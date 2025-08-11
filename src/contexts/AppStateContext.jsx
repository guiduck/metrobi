import { createContext, useState, useCallback, useMemo } from "react";

const CHALLENGES = [
  {
    id: 1,
    title: "Array Duplicates",
    description: "Find duplicate items in any given array",
    status: "pending",
  },
  {
    id: 2,
    title: "Async Array Processing",
    description: "Process arrays with exponential delay",
    status: "pending",
  },
  {
    id: 3,
    title: "Flexbox Layout",
    description: "Recreate layouts using Flexbox",
    status: "pending",
  },
  {
    id: 4,
    title: "Bracket Validator",
    description: "Validate proper opening/closing of brackets",
    status: "pending",
  },
  {
    id: 5,
    title: "Egg Drop Problem",
    description: "Optimize egg dropping from 100-floor building",
    status: "pending",
  },
  {
    id: 6,
    title: "Zeno's Paradox",
    description: "Animate the Achilles and Tortoise paradox",
    status: "pending",
  },
  {
    id: 7,
    title: "Knapsack Problem",
    description: "Optimize carrot knapsack selection",
    status: "pending",
  },
];

const DIALOGUE_TEXTS = {
  welcome:
    "Welcome to Metrobi's Frontend Engineering Challenge! Use 'H' for help, arrow keys to navigate. Let's start! 🚀",
  1: "Challenge 1: Let's find those duplicate array items! This tests your algorithm skills. 🔍",
  2: "Challenge 2: Time for async programming with exponential delays. Ready for some promises? ⏱️",
  3: "Challenge 3: Show off your CSS skills with Flexbox layouts! Let's make it responsive. 📐",
  4: "Challenge 4: Brackets need validation! Stack up your logic skills. [ { ( ) } ]",
  5: "Challenge 5: The classic egg drop problem! How efficiently can you solve this? 🥚",
  6: "Challenge 6: Time for some animation! Let's bring Zeno's Paradox to life. 🏃‍♂️",
  7: "Challenge 7: Final challenge! Optimize that knapsack algorithm. Show what you've got! 🎒",
  completed:
    "Awesome work! You've completed all challenges. Ready to impress the team! 🎉",
};

export const AppStateContext = createContext();

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function AppStateProvider({ children }) {
  const [challenges, setChallenges] = useState(CHALLENGES);
  const [currentChallengeId, setCurrentChallengeId] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);

  const currentChallenge = challenges.find((c) => c.id === currentChallengeId);

  const nextChallenge = useCallback(() => {
    if (currentChallengeId >= challenges.length) return;

    setCurrentChallengeId(currentChallengeId + 1);
  }, [currentChallengeId, challenges.length]);

  const previousChallenge = useCallback(() => {
    if (currentChallengeId < 1) return;

    setCurrentChallengeId(currentChallengeId - 1);
  }, [currentChallengeId]);

  /**
   * @param {number} challengeId
   */
  const resetChallenge = useCallback((challengeId) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === challengeId
          ? { ...challenge, status: "pending" }
          : challenge
      )
    );
  }, []);

  const toggleInstructions = useCallback(() => {
    setShowInstructions((prev) => !prev);
  }, []);

  const getChallengeDialogue = useCallback(
    (challengeId) => DIALOGUE_TEXTS[challengeId] || DIALOGUE_TEXTS.completed,
    []
  );

  const isWelcomeScreen = useMemo(
    () => currentChallengeId === 0,
    [currentChallengeId]
  );

  const contextValue = useMemo(
    () => ({
      challenges,
      currentChallenge,
      currentChallengeId,
      showInstructions,
      nextChallenge,
      previousChallenge,

      resetChallenge,
      toggleInstructions,

      getChallengeDialogue,
      isWelcomeScreen,
    }),
    [
      challenges,
      currentChallenge,
      currentChallengeId,
      showInstructions,
      nextChallenge,
      previousChallenge,

      resetChallenge,
      toggleInstructions,

      getChallengeDialogue,
      isWelcomeScreen,
    ]
  );

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
}
