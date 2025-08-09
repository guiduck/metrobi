import { useContext } from "react";
import { AppStateContext } from "../../../contexts/AppStateContext";
import styles from "./styles.module.scss";

export default function WelcomeScreen() {
  const appState = useContext(AppStateContext);

  const handleGetStarted = () => {
    appState.nextChallenge();
  };

  return (
    <div className={styles.welcomeScreen}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          Welcome to Metrobi's coding Challenge! 🎯
        </h1>

        <p className={styles.description}>
          This is an interactive presentation of 7 frontend engineering
          challenges. Use the navigation controls above or keyboard shortcuts to
          move between challenges.
        </p>

        <div className={styles.actions}>
          <button className="btn primary" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>

        <p className={styles.helpText}>Press H for help and instructions!</p>
      </div>
    </div>
  );
}
