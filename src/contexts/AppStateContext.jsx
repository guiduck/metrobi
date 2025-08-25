import { createContext, useState, useCallback, useMemo } from "react";

const CHALLENGES = [
  {
    id: 1,
    title: "Array Duplicates",
    description: "Find duplicate items in any given array",
  },
  {
    id: 2,
    title: "Async Array Processing",
    description: "Process arrays with exponential delay",
  },
  {
    id: 3,
    title: "Flexbox Layout",
    description: "Recreate layouts using Flexbox",
  },
  {
    id: 4,
    title: "Bracket Validator",
    description: "Validate proper opening/closing of brackets",
  },
  {
    id: 5,
    title: "Egg Drop Problem",
    description: "Optimize egg dropping from 100-floor building",
  },
  {
    id: 6,
    title: "Zeno's Paradox",
    description: "Animate the Achilles and Tortoise paradox",
  },
  {
    id: 7,
    title: "Carrot bag Problem",
    description:
      "Optimize this with the most valueable carrot bag you can think of",
  },
];

const DIALOGUE_TEXTS = {
  0: "Welcome to Metrobi's Frontend Engineering Challenge! Use 'H' for help, arrow keys to navigate. Let's start! 🚀",
  1: "Challenge 1: Let's find those duplicate array items! This is a simple test of algorithm skills. 🔍",
  2: "Challenge 2: Time for async programming with exponential delays. Ready for some promises? ⏱️",
  3: "Challenge 3: Flexbox layouts are great for showing off some CSS skills! 📐",
  4: "Challenge 4: Brackets need validation! Try inputing some brackets and see if they are valid. [ { ( ) } ]",
  5: "Challenge 5: Can the egg survive the fall? Press the button and find out! 🥚",
  6: "Challenge 6: Time for some animation! Let's bring Zeno's Paradox to life. 🏃‍♂️",
  7: "Challenge 7: For the final task, we'll try to fill the most greedy bag we possibly can! 🎒",
  completed:
    "Thanks for staying until here! I hope you enjoyed the presentation! 🎉",
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
        challenge.id === challengeId ? { ...challenge } : challenge
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
