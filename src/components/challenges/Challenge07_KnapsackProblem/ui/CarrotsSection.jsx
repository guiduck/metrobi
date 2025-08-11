import styles from "../styles.module.scss";

/**
 * @param {Object} props - Component props
 * @param {Array} props.carrots - Array of carrot objects
 * @param {Function} props.onAddCarrot - Function to add new carrot
 * @param {Function} props.onUpdateCarrot - Function to update carrot
 * @param {Function} props.onRemoveCarrot - Function to remove carrot
 * @returns {JSX.Element} Carrots section component
 */
export function CarrotsSection({
  carrots,
  onAddCarrot,
  onUpdateCarrot,
  onRemoveCarrot,
}) {
  return (
    <div className={styles.carrotsSection}>
      <div className={styles.sectionHeader}>
        <h4>🥕 Available Carrots:</h4>
        <button onClick={onAddCarrot} className="btn">
          ➕ Add Carrot
        </button>
      </div>

      <div className={styles.carrotsList}>
        {carrots.map((carrot) => (
          <div key={carrot.id} className={styles.carrotItem}>
            <input
              type="text"
              value={carrot.name}
              onChange={(e) =>
                onUpdateCarrot(carrot.id, "name", e.target.value)
              }
              className={styles.carrotName}
            />
            <div className={styles.carrotProps}>
              <div className={styles.propGroup}>
                <label>Weight:</label>
                <input
                  type="number"
                  min="1"
                  value={carrot.kg}
                  onChange={(e) =>
                    onUpdateCarrot(
                      carrot.id,
                      "kg",
                      parseInt(e.target.value) || 1
                    )
                  }
                  className={styles.propInput}
                />
                <span>kg</span>
              </div>
              <div className={styles.propGroup}>
                <label>Price:</label>
                <input
                  type="number"
                  min="1"
                  value={carrot.price}
                  onChange={(e) =>
                    onUpdateCarrot(
                      carrot.id,
                      "price",
                      parseInt(e.target.value) || 1
                    )
                  }
                  className={styles.propInput}
                />
                <span>$</span>
              </div>
              <div className={styles.efficiency}>
                ${(carrot.price / carrot.kg).toFixed(1)}/kg
              </div>
              <button
                onClick={() => onRemoveCarrot(carrot.id)}
                className={styles.removeButton}
                title="Remove carrot"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
