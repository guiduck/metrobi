import { useContext, useEffect } from "react";
import { useShortcut } from "../../../hooks/useShortcut";
import { AppStateContext } from "../../../contexts/AppStateContext";
import { DialogueContext } from "../../../contexts/DialogueContext";
import DialogueBox from "../../ui/DialogueBox";
import InstructionsModal from "../../ui/InstructionsModal";
import styles from "./styles.module.scss";

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children - Main content
 */
export default function AppLayout({ children }) {
  const appState = useContext(AppStateContext);
  const dialogue = useContext(DialogueContext);

  const shortcuts = [
    {
      key: "h",
      handler: () => appState.toggleInstructions(),
    },
    {
      key: "H",
      handler: () => appState.toggleInstructions(),
    },
    {
      key: "n",
      handler: () => appState.nextChallenge(),
    },
    {
      key: "N",
      handler: () => appState.nextChallenge(),
    },
    {
      key: "p",
      handler: () => appState.previousChallenge(),
    },
    {
      key: "P",
      handler: () => appState.previousChallenge(),
    },
    {
      key: "r",
      handler: () => appState.resetChallenge(appState.currentChallengeId),
    },
    {
      key: "R",
      handler: () => appState.resetChallenge(appState.currentChallengeId),
    },
    {
      key: "c",
      handler: () => {
        if (
          appState.currentChallengeId > 0 &&
          appState.currentChallenge?.status !== "completed"
        ) {
          appState.markChallengeCompleted(appState.currentChallengeId);
        }
      },
    },
    {
      key: "C",
      handler: () => {
        if (
          appState.currentChallengeId > 0 &&
          appState.currentChallenge?.status !== "completed"
        ) {
          appState.markChallengeCompleted(appState.currentChallengeId);
        }
      },
    },
    {
      key: "Escape",
      handler: () => {
        if (appState.showInstructions) {
          appState.toggleInstructions();
          return;
        }

        if (dialogue.isVisible) {
          dialogue.forceClose();
        }
      },
    },
  ];

  useShortcut(shortcuts);

  useEffect(() => {
    if (appState.currentChallengeId <= 0) return;

    appState.markChallengeActive(appState.currentChallengeId);
  }, [appState.currentChallengeId, appState.markChallengeActive]);

  useEffect(() => {
    const text = appState.getChallengeDialogue(appState.currentChallengeId);
    if (!text) return;

    dialogue.showDialogue(text);
  }, [
    appState.currentChallengeId,
    appState.getChallengeDialogue,
    dialogue.showDialogue,
  ]);

  const progress = appState.getProgress();

  return (
    <div className={styles.appLayout}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>🚀 Metrobi Frontend Challenge</h1>

          <div className={styles.progress}>
            <span className={styles.progressText}>
              Progress: {progress.completed}/{progress.total}
            </span>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${(progress.completed / progress.total) * 100}%`,
                }}
              />
            </div>
          </div>

          <nav className={styles.nav}>
            <button
              className="btn"
              onClick={appState.previousChallenge}
              disabled={appState.currentChallengeId === 0}
            >
              ← Previous (P)
            </button>

            <span className={styles.currentChallenge}>
              {appState.isWelcomeScreen
                ? "Welcome Screen"
                : `Challenge ${appState.currentChallengeId}: ${appState.currentChallenge?.title}`}
            </span>

            <button
              className="btn"
              onClick={appState.nextChallenge}
              disabled={
                appState.currentChallengeId === appState.challenges.length
              }
            >
              Next (N) →
            </button>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.shortcuts}>
            <button
              className="btn primary"
              onClick={appState.toggleInstructions}
            >
              ❓ Help (H)
            </button>

            <div className={styles.quickShortcuts}>
              <span>
                <kbd>H</kbd> Help
              </span>
              <span>
                <kbd>N</kbd> Next
              </span>
              <span>
                <kbd>P</kbd> Previous
              </span>
              <span>
                <kbd>C</kbd> Complete
              </span>
              <span>
                <kbd>R</kbd> Reset
              </span>
            </div>
          </div>
        </div>
      </footer>

      <DialogueBox dialogue={dialogue} />

      <InstructionsModal
        isOpen={appState.showInstructions}
        onClose={appState.toggleInstructions}
      />
    </div>
  );
}
