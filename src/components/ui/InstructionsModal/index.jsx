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
              Explore 7 coding challenges that demonstrate different frontend
              engineering skills. Each challenge showcases solutions to common
              programming problems and interactive implementations.
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
            </div>
          </section>

          <section className={styles.section}>
            <h3>📋 Challenge Overview</h3>
            <ul className={styles.challengeList}>
              <li>
                <strong>Array Duplicates</strong> - Find duplicate items in
                arrays
              </li>
              <li>
                <strong>Async Array</strong> - Process arrays with exponential
                delays
              </li>
              <li>
                <strong>Flexbox Layout</strong> - Recreate layouts using CSS
                Flexbox
              </li>
              <li>
                <strong>Bracket Validator</strong> - Validate bracket sequences
              </li>
              <li>
                <strong>Egg Drop Problem</strong> - Optimization algorithm
                implementation
              </li>
              <li>
                <strong>Zeno's Paradox</strong> - Animated race simulation
              </li>
              <li>
                <strong>Carrot bags Problem</strong> - Dynamic programming
                solution
              </li>
            </ul>
          </section>
        </div>

        <div className={styles.footer}>
          <button className="btn primary" onClick={onClose}>
            Got it! 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
