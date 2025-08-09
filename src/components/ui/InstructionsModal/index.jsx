import { useEffect } from "react";
import styles from "./styles.module.scss";

/**
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 */
export default function InstructionsModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>📋 Challenge Instructions</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close instructions"
          >
            ✕
          </button>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h3>🎯 Objective</h3>
            <p>
              Complete 7 coding challenges to showcase your frontend engineering
              skills. Each challenge tests different aspects of programming and
              problem-solving.
            </p>
          </section>

          <section className={styles.section}>
            <h3>🎮 Navigation</h3>
            <div className={styles.controlsGrid}>
              <div className={styles.controlItem}>
                <kbd>H</kbd>
                <span>Show/Hide instructions</span>
              </div>
              <div className={styles.controlItem}>
                <kbd>N</kbd>
                <span>Next challenge</span>
              </div>
              <div className={styles.controlItem}>
                <kbd>P</kbd>
                <span>Previous challenge</span>
              </div>
              <div className={styles.controlItem}>
                <kbd>R</kbd>
                <span>Reset current challenge</span>
              </div>
              <div className={styles.controlItem}>
                <kbd>Esc</kbd>
                <span>Close modal/dialogue</span>
              </div>
              <div className={styles.controlItem}>
                <kbd>Enter</kbd>
                <span>Confirm action</span>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h3>📋 Challenge List</h3>
            <ul className={styles.challengeList}>
              <li>Array Duplicates - Find duplicates in arrays</li>
              <li>Async Array - Handle exponential delays</li>
              <li>Flexbox Layout - CSS layout mastery</li>
              <li>Bracket Validator - Validate bracket sequences</li>
              <li>Egg Drop Problem - Optimization algorithms</li>
              <li>Zeno's Paradox - Animation and math</li>
              <li>Knapsack Problem - Dynamic programming</li>
            </ul>
          </section>
        </div>

        <div className={styles.footer}>
          <button className="btn primary" onClick={onClose}>
            Got it! Let's code! 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
