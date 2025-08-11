import { useState, useCallback, useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import { InputSection, ExamplesSection, ProcessingSection } from "./ui";

/**
 * Process array items with exponential delays (1, 2, 4, 8... seconds)
 * @param {Array} arr - Array to process
 * @returns {Promise<Array>} Promise that resolves to processed items
 */
export async function processArrayWithExponentialDelays(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array");
  }

  if (arr.length === 0) return [];

  const results = [];

  await Promise.all(
    arr.map(async (item, index) => {
      const delay = Math.pow(2, index) * 1000;
      return new Promise((resolve) => {
        setTimeout(() => {
          results[index] = { item, index, delay };
          resolve();
        }, delay);
      });
    })
  );

  return results;
}

export default function Challenge02_AsyncArray() {
  const [inputValue, setInputValue] = useState('["a", "b", "c", "d"]');
  const [array, setArray] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedItems, setProcessedItems] = useState([]);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [error, setError] = useState("");

  const intervalRef = useRef(null);

  const parseInput = useCallback(() => {
    try {
      const parsed = JSON.parse(inputValue);
      if (!Array.isArray(parsed)) {
        setError("Input must be a valid JSON array");
        return;
      }
      setArray(parsed);
      setError("");
    } catch (err) {
      setError("Invalid JSON format");
    }
  }, [inputValue]);

  /**
   * @param {string} item - The processed item
   * @param {number} index - Index of the item
   * @param {number} delay - Delay used for this item in milliseconds
   */
  const onNextItem = useCallback((item, index, delay) => {
    setProcessedItems((prev) => [
      ...prev,
      {
        item,
        index,
        delay: delay / 1000,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    setCurrentProgress(index + 1);
  }, []);

  const startProcessing = useCallback(async () => {
    if (array.length === 0) return;

    setIsProcessing(true);
    setProcessedItems([]);
    setCurrentProgress(0);

    try {
      await processArrayWithDelay(array, onNextItem);
    } catch (error) {
      console.error("Processing error:", error);
      setError("Processing failed");
    }

    setIsProcessing(false);
    setTimeRemaining(0);
  }, [array, onNextItem]);

  const cancelProcessing = useCallback(() => {
    setIsProcessing(false);
    setCurrentProgress(0);
    setTimeRemaining(0);
    setProcessedItems([]);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  useEffect(() => {
    if (!isProcessing || currentProgress >= array.length) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    const nextDelay = Math.pow(2, currentProgress);
    setTimeRemaining(nextDelay);

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isProcessing, currentProgress, array.length]);

  useEffect(() => {
    parseInput();
  }, [parseInput]);

  /**
   * @param {Array} arr - Array to process
   * @param {Function} onNextItem - Callback for each processed item
   * @returns {Promise} Promise that resolves when processing is complete
   */
  const processArrayWithDelay = async (arr, onNextItem) => {
    await Promise.all(
      arr.map(async (item, index) => {
        const delay = Math.pow(2, index) * 1000;
        await new Promise((resolve) =>
          setTimeout(() => {
            onNextItem(item, index, delay);
            resolve();
          }, delay)
        );
      })
    );
  };

  const examples = [
    ["a", "b", "c", "d"],
    [1, 2, 3],
    ["🍎", "🍌", "🍊", "🍇", "🍓"],
    ["Hello", "World"],
  ];

  /**
   * @param {number} index - Index to calculate delay for
   * @returns {number} Delay in seconds
   */
  const getNextDelay = useCallback((index) => {
    return Math.pow(2, index);
  }, []);

  /**
   * @param {Array} example - Example array to set as input
   */
  const handleExampleClick = useCallback((example) => {
    setInputValue(JSON.stringify(example));
    setProcessedItems([]);
    setCurrentProgress(0);
    setError("");
  }, []);

  return (
    <div className={styles.challenge}>
      <div className={styles.header}>
        <h3>⏱️ Async Array Processor</h3>
        <p>
          Process array items with exponential delays (1, 2, 4, 8... seconds)
        </p>
      </div>

      <div className={styles.content}>
        <InputSection
          inputValue={inputValue}
          setInputValue={setInputValue}
          error={error}
          isProcessing={isProcessing}
          onParseInput={parseInput}
          array={array}
          onStartProcessing={startProcessing}
          onCancelProcessing={cancelProcessing}
        />

        <ExamplesSection
          examples={examples}
          isProcessing={isProcessing}
          onExampleClick={handleExampleClick}
        />

        <ProcessingSection
          isProcessing={isProcessing}
          processedItems={processedItems}
          timeRemaining={timeRemaining}
          currentProgress={currentProgress}
          array={array}
          getNextDelay={getNextDelay}
        />
      </div>
    </div>
  );
}
