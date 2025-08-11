import { useContext } from "react";
import { DialogueContextProvider } from "./contexts/DialogueContext";
import { AppStateProvider } from "./contexts/AppStateContext";
import { AppStateContext } from "./contexts/AppStateContext";
import AppLayout from "./components/layout/AppLayout";
import WelcomeScreen from "./components/pages/WelcomeScreen";

import Challenge01_ArrayDuplicates from "./components/challenges/Challenge01_ArrayDuplicates";
import Challenge02_AsyncArray from "./components/challenges/Challenge02_AsyncArray";
import Challenge03_FlexboxLayout from "./components/challenges/Challenge03_FlexboxLayout";
import Challenge04_BracketValidator from "./components/challenges/Challenge04_BracketValidator";
import Challenge05_EggDropProblem from "./components/challenges/Challenge05_EggDropProblem";
import Challenge06_ZenosParadox from "./components/challenges/Challenge06_ZenosParadox";
import Challenge07_KnapsackProblem from "./components/challenges/Challenge07_KnapsackProblem";

import "./styles/global.scss";

function AppContent() {
  const { isWelcomeScreen, currentChallengeId } = useContext(AppStateContext);

  const renderChallenge = () => {
    switch (currentChallengeId) {
      case 1:
        return <Challenge01_ArrayDuplicates />;
      case 2:
        return <Challenge02_AsyncArray />;
      case 3:
        return <Challenge03_FlexboxLayout />;
      case 4:
        return <Challenge04_BracketValidator />;
      case 5:
        return <Challenge05_EggDropProblem />;
      case 6:
        return <Challenge06_ZenosParadox />;
      case 7:
        return <Challenge07_KnapsackProblem />;
      default:
        return (
          <div className="container">
            <div className="card">
              <h2>Challenge not found</h2>
              <p>Challenge {currentChallengeId} does not exist.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <AppLayout>
      {isWelcomeScreen ? (
        <WelcomeScreen />
      ) : (
        <div className="container">{renderChallenge()}</div>
      )}
    </AppLayout>
  );
}

function App() {
  return (
    <DialogueContextProvider>
      <AppStateProvider>
        <AppContent />
      </AppStateProvider>
    </DialogueContextProvider>
  );
}

export default App;
