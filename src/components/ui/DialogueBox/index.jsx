import styles from "./styles.module.scss";

/**
 * @param {Object} props.dialogue - Dialogue state object
 */
export default function DialogueBox({ dialogue }) {
  if (!dialogue.isVisible) return null;

  return (
    <div className={styles.dialogueBox}>
      <div className={styles.content}>
        <p className={styles.text}>{dialogue.currentText}</p>
      </div>
    </div>
  );
}
