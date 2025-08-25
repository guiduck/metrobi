import { useState, useCallback } from "react";
import styles from "./styles.module.scss";
import { InputSection, ExamplesSection, ResultsSection } from "./ui";

export const stringifyNestedObjects = (item) => {
  if (typeof item !== "object" || !item) return item;

  const entries = Object.entries(item);

  const stringified = entries.map(([key, value]) => {
    let stringifiedKey = key;
    if (typeof key === "object") {
      stringifiedKey = stringifyNestedObjects(key);
    }

    let stringifiedValue = value;
    if (typeof value === "object") {
      stringifiedValue = stringifyNestedObjects(value);
    }

    return `${stringifiedKey}: ${stringifiedValue}`;
  });

  return `{ ${stringified.join(", ")} }`;
};

/**
 * Find duplicate items in any given array
 * @param {Array} arr - Array to check for duplicates
 * @returns {Array} Array of duplicate items
 */
export function findDuplicates(arr) {
  const frequencies = {};

  for (let i = 0; i < arr.length; i++) {
    const item = stringifyNestedObjects(arr[i]);
    frequencies[item] = (frequencies[item] ?? 0) + 1;
  }

  const duplicates = Object.entries(frequencies)
    .filter(([_key, value]) => Boolean(value > 1))
    .map(([key, _]) => key);

  return duplicates;
}

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

  /**
   * @param {Array} example - Example array to set as input
   */
  const handleExampleClick = (example) => {
    setInputValue(JSON.stringify(example));
  };

  const examples = [
    ["a", "b", "c", "a", "d", "b"],
    [1, 2, 3, 4, 5],
    [1, 1, 1, 1],
    [],
    ["apple", "banana", "apple", "orange", "banana", "grape"],
    [
      "a",
      "b",
      "c",
      "a",
      "d",
      "b",
      { a: 1, b: 2 },
      { a: 1, b: 2, c: { d: 3, f: { g: 4 } } },
      { a: 1, b: 2, c: { d: 3, f: { g: 4 } } },
    ],
  ];

  return (
    <div className={styles.challenge}>
      <div className={styles.header}>
        <h3>🔍 Array Duplicates Finder</h3>
        <p>Find duplicate items in any given array</p>
      </div>

      <div className={styles.content}>
        <InputSection
          inputValue={inputValue}
          setInputValue={setInputValue}
          error={error}
          onParseInput={parseInput}
        />

        <ExamplesSection
          examples={examples}
          onExampleClick={handleExampleClick}
        />

        <ResultsSection array={array} duplicates={duplicates} />
      </div>
    </div>
  );
}
