import { useState, useCallback, useRef, useEffect } from "react";
import styles from "./styles.module.scss";

/**
 * Process array items with exponential delays (1, 2, 4, 8... seconds)
 * @param {Array} arr - Array to process
 * @param {Function} onItem - Callback for each processed item
 * @param {Function} onProgress - Callback for progress updates
 * @returns {Promise} Promise that resolves when all items are processed
 */
export async function processArrayWithExponentialDelays(
  arr,
  onItem,
  onProgress
) {
  // TODO: Implement your async solution here
  // Process array items with exponential delays (1s, 2s, 4s, 8s...)
  // Call onItem(item, index, delayInSeconds) for each processed item
  // Call onProgress(completedCount, totalCount) to update progress
  // Return a promise that resolves with array of processed items
  // The promise should have a .cancel() method to stop processing

  /* SOLUTION (uncomment to see the answer):
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array");
  }

  const results = [];
  let cancelled = false;

  const promise = new Promise((resolve, reject) => {
    const processNext = async (index) => {
      if (cancelled || index >= arr.length) {
        resolve(results);
        return;
      }

      const delay = Math.pow(2, index) * 1000; // 1s, 2s, 4s, 8s...
      const item = arr[index];

      await new Promise((delayResolve) => {
        setTimeout(() => {
          if (!cancelled) {
            delayResolve();
          }
        }, delay);
      });

      if (!cancelled) {
        results.push({ item, index, delay: delay / 1000 });
        onItem?.(item, index, delay / 1000);
        onProgress?.(index + 1, arr.length);
        processNext(index + 1);
      }
    };

    processNext(0);
  });

  promise.cancel = () => {
    cancelled = true;
  };

  return promise;
  */

  return Promise.resolve([]);
}

/**
 * Challenge 2: Async Array Processing Component
 * Process arrays with exponential delays and visual feedback
 */
export default function Challenge02_AsyncArray() {
  const [inputValue, setInputValue] = useState('["a", "b", "c", "d"]');
  const [array, setArray] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedItems, setProcessedItems] = useState([]);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [error, setError] = useState("");

  const processingRef = useRef(null);
  const timerRef = useRef(null);

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

  const startProcessing = useCallback(async () => {
    if (array.length === 0) {
      setError("Please enter a valid array first");
      return;
    }

    setIsProcessing(true);
    setProcessedItems([]);
    setCurrentProgress(0);
    setError("");

    try {
      processingRef.current = processArray(array, onNextItem);

      await processingRef.current;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
      setTimeRemaining(0);
    }
  }, [array]);

  const cancelProcessing = useCallback(() => {
    if (processingRef.current?.cancel) {
      processingRef.current.cancel();
    }
    setIsProcessing(false);
    setTimeRemaining(0);
  }, []);

  // Timer for next item countdown
  useEffect(() => {
    if (!isProcessing) return;

    const updateTimer = () => {
      if (currentProgress < array.length) {
        const nextDelay = Math.pow(2, currentProgress) * 1000;
        const startTime = Date.now();

        const updateCountdown = () => {
          const elapsed = Date.now() - startTime;
          const remaining = Math.max(0, nextDelay - elapsed);
          setTimeRemaining(Math.ceil(remaining / 1000));

          if (remaining > 0) {
            timerRef.current = setTimeout(updateCountdown, 100);
          }
        };

        updateCountdown();
      }
    };

    updateTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isProcessing, currentProgress, array.length]);

  const handleExampleClick = (example) => {
    setInputValue(JSON.stringify(example));
  };

  const onNextItem = (item, index, delay) => {
    console.log("onNextItem", item, index, delay);
    setProcessedItems((prev) => [
      ...prev,
      {
        item,
        index,
        delay,
      },
    ]);
  };

  const processArray = async (arr, onNextItem) => {
    await new Promise.all(
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

  const getNextDelay = (index) => Math.pow(2, index);

  return (
    <div className={styles.challenge}>
      <div className={styles.header}>
        <h3>⏱️ Async Array Processor</h3>
        <p>
          Process array items with exponential delays (1, 2, 4, 8... seconds)
        </p>
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
            placeholder='["a", "b", "c", "d"]'
            rows="3"
            disabled={isProcessing}
          />

          <div className={styles.actions}>
            <button
              onClick={parseInput}
              className="btn"
              disabled={isProcessing}
            >
              Parse Array
            </button>
            {array.length > 0 && !isProcessing && (
              <button onClick={startProcessing} className="btn primary">
                Start Processing
              </button>
            )}
            {isProcessing && (
              <button
                onClick={cancelProcessing}
                className="btn"
                style={{ backgroundColor: "var(--error)" }}
              >
                Cancel
              </button>
            )}
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
                disabled={isProcessing}
                title={JSON.stringify(example)}
              >
                Example {index + 1}
              </button>
            ))}
          </div>
        </div>

        {array.length > 0 && (
          <div className={styles.arrayPreview}>
            <h4>Array to Process:</h4>
            <div className={styles.previewItems}>
              {array.map((item, index) => (
                <div key={index} className={styles.previewItem}>
                  <span className={styles.itemValue}>
                    {JSON.stringify(item)}
                  </span>
                  <span className={styles.itemDelay}>
                    {getNextDelay(index)}s
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {(isProcessing || processedItems.length > 0) && (
          <div className={styles.processingSection}>
            <div className={styles.progressHeader}>
              <h4>Processing Progress</h4>
              {isProcessing && (
                <div className={styles.timer}>
                  Next item in:{" "}
                  <span className={styles.countdown}>{timeRemaining}s</span>
                </div>
              )}
            </div>

            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${(currentProgress / array.length) * 100}%` }}
              />
              <span className={styles.progressText}>
                {currentProgress} / {array.length}
              </span>
            </div>

            <div className={styles.processedList}>
              {processedItems.map((processed, index) => (
                <div key={index} className={styles.processedItem}>
                  <div className={styles.processedHeader}>
                    <span className={styles.processedIndex}>
                      #{processed.index + 1}
                    </span>
                    <span className={styles.processedTime}>
                      {processed.timestamp}
                    </span>
                  </div>
                  <div className={styles.processedContent}>
                    <span className={styles.processedValue}>
                      {JSON.stringify(processed.item)}
                    </span>
                    <span className={styles.processedDelay}>
                      Delay: {processed.delay}s
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {isProcessing && currentProgress < array.length && (
              <div className={styles.nextItem}>
                <span>Next: </span>
                <span className={styles.nextValue}>
                  {JSON.stringify(array[currentProgress])}
                </span>
                <span className={styles.nextDelay}>
                  (in {getNextDelay(currentProgress)}s)
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
