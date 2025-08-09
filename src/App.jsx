import { useContext } from "react";
import { DialogueContextProvider } from "./contexts/DialogueContext";
import { AppStateProvider } from "./contexts/AppStateContext";
import { AppStateContext } from "./contexts/AppStateContext";
import AppLayout from "./components/layout/AppLayout";
import WelcomeScreen from "./components/pages/WelcomeScreen";

// Import all challenge components
import Challenge01_ArrayDuplicates from "./components/challenges/Challenge01_ArrayDuplicates";
import Challenge02_AsyncArray from "./components/challenges/Challenge02_AsyncArray";
import Challenge03_FlexboxLayout from "./components/challenges/Challenge03_FlexboxLayout";
import Challenge04_BracketValidator from "./components/challenges/Challenge04_BracketValidator";
import Challenge05_EggDropProblem from "./components/challenges/Challenge05_EggDropProblem";
import Challenge06_ZenosParadox from "./components/challenges/Challenge06_ZenosParadox";
import Challenge07_KnapsackProblem from "./components/challenges/Challenge07_KnapsackProblem";

import "./styles/global.scss";

function AppContent() {
  const {
    isWelcomeScreen,
    currentChallengeId,
    currentChallenge,
    markChallengeCompleted,
  } = useContext(AppStateContext);

  // Render the appropriate challenge component
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
        <div className="container">
          {/* Challenge Status Header */}
          <div className="card" style={{ marginBottom: "var(--spacing-lg)" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "var(--spacing-sm)",
              }}
            >
              <h2>
                Challenge {currentChallengeId}: {currentChallenge?.title}
              </h2>
              <span className={`status-badge ${currentChallenge?.status}`}>
                {currentChallenge?.status === "completed"
                  ? "✅ Completed"
                  : currentChallenge?.status === "active"
                  ? "🔄 Active"
                  : "⏳ Pending"}
              </span>
            </div>
            <p style={{ margin: 0, color: "var(--text-secondary)" }}>
              {currentChallenge?.description}
            </p>

            {/* Challenge Completion Controls */}
            {currentChallenge?.status !== "completed" && (
              <button
                className="btn primary"
                onClick={() => markChallengeCompleted(currentChallengeId)}
                style={{ marginTop: "var(--spacing-md)" }}
              >
                ✅ Mark Challenge Complete (C)
              </button>
            )}

            {currentChallenge?.status === "completed" && (
              <div
                style={{
                  marginTop: "var(--spacing-md)",
                  padding: "var(--spacing-md)",
                  backgroundColor: "var(--success)",
                  color: "white",
                  borderRadius: "var(--radius-md)",
                  textAlign: "center",
                }}
              >
                🎉 Challenge Completed! Great job!
              </div>
            )}
          </div>

          {/* Render the actual challenge component */}
          {renderChallenge()}
        </div>
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
