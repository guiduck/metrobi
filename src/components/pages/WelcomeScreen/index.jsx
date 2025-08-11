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
        <h1 className={styles.title}>Welcome to My Metrobi Challenge! 🎯</h1>

        <p className={styles.description}>
          Dear Metrobi Team, thank you for this amazing opportunity! I've
          crafted this interactive showcase of 7 frontend engineering challenges
          to demonstrate my passion for creating exceptional user experiences.
          Each challenge reflects my commitment to quality, innovation, and the
          technical excellence that Metrobi represents.
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
