import { useState, useCallback } from "react";
import styles from "./styles.module.scss";

/**
 * Find duplicate items in any given array
 * @param {Array} arr - Array to check for duplicates
 * @returns {Array} Array of duplicate items
 */
export function findDuplicates(arr) {
  // TODO: Implement your solution here
  // Return an array of duplicate items

  /* SOLUTION (uncomment to see the answer):
  if (!Array.isArray(arr)) return [];
  
  const seen = new Set();
  const duplicates = new Set();
  
  for (const item of arr) {
    if (seen.has(item)) {
      duplicates.add(item);
    } else {
      seen.add(item);
    }
  }
  
  return Array.from(duplicates);
  */

  const frequencies = {};

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    frequencies[item] = (frequencies[item] ?? 0) + 1;
  }

  console.log(frequencies);
  return Object.entries(frequencies).filter(([_key, value]) =>
    Boolean(value > 1)
  );
}

/**
 * Challenge 1: Array Duplicates Component
 * Interactive component to find duplicate items in arrays
 */
export default function Challenge01_ArrayDuplicates() {
  const [inputValue, setInputValue] = useState(
    '["a", "b", "c", "a", "d", "b"]'
  );
  const [array, setArray] = useState([]);
  const [duplicates, setDuplicates] = useState([]);
  const [error, setError] = useState("");

  const parseInput = useCallback(() => {
    console.log("parseInput");
    try {
      const parsed = JSON.parse(inputValue);
      console.log(parsed);
      if (!Array.isArray(parsed)) {
        setError("Input must be a valid JSON array");
        return;
      }
      setArray(parsed);
      console.log(parsed);
      const foundDuplicates = findDuplicates(parsed);
      setDuplicates(foundDuplicates);
      setError("");
    } catch (err) {
      setError("Invalid JSON format");
    }
  }, [inputValue]);

  const handleExampleClick = (example) => {
    setInputValue(JSON.stringify(example));
  };

  const examples = [
    ["a", "b", "c", "a", "d", "b"],
    [1, 2, 3, 4, 5],
    [1, 1, 1, 1],
    [],
    ["apple", "banana", "apple", "orange", "banana", "grape"],
  ];

  return (
    <div className={styles.challenge}>
      <div className={styles.header}>
        <h3>🔍 Array Duplicates Finder</h3>
        <p>Find duplicate items in any given array</p>
      </div>

      <div className={styles.content}>
        <div className={styles.inputSection}>
          <label htmlFor="arrayInput" className={styles.label}>
            Enter Array (JSON format):
          </label>
          <textarea
            id="arrayInput"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={styles.input}
            placeholder='["a", "b", "c", "a", "d", "b"]'
            rows="3"
          />

          <div className={styles.actions}>
            <button onClick={parseInput} className="btn primary">
              Find Duplicatessssss
            </button>
          </div>

          {error && <div className={styles.error}>❌ {error}</div>}
        </div>

        <div className={styles.examples}>
          <h4>Quick Examples:</h4>
          <div className={styles.exampleButtons}>
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className={`btn ${styles.exampleBtn}`}
                title={JSON.stringify(example)}
              >
                Example {index + 1}
              </button>
            ))}
          </div>
        </div>

        {array.length > 0 && (
          <div className={styles.results}>
            <div className={styles.arrayDisplay}>
              <h4>Input Array:</h4>
              <div className={styles.arrayItems}>
                {array.map((item, index) => (
                  <span
                    key={index}
                    className={`${styles.arrayItem} ${
                      duplicates.includes(item) ? styles.duplicate : ""
                    }`}
                  >
                    {JSON.stringify(item)}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.duplicatesDisplay}>
              <h4>Duplicates Found:</h4>
              {duplicates.length > 0 ? (
                <div className={styles.duplicateItems}>
                  {duplicates.map((item, index) => (
                    <span key={index} className={styles.duplicateItem}>
                      {JSON.stringify(item)}
                    </span>
                  ))}
                </div>
              ) : (
                <p className={styles.noDuplicates}>✅ No duplicates found!</p>
              )}
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Total Items:</span>
                <span className={styles.statValue}>{array.length}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Unique Items:</span>
                <span className={styles.statValue}>{new Set(array).size}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Duplicate Types:</span>
                <span className={styles.statValue}>{duplicates.length}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
