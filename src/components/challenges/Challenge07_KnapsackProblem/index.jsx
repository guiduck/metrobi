import { useState, useCallback, useMemo } from "react";
import styles from "./styles.module.scss";

/**
 * Solve knapsack problem using dynamic programming
 * @param {Array} items - Array of {kg, price} objects
 * @param {number} capacity - Maximum weight capacity
 * @returns {Object} Solution with maxValue and selectedItems
 */
export function solveKnapsack(items, capacity) {
  // TODO: Implement the 0/1 knapsack problem using dynamic programming
  // items: array of {kg: weight, price: value, ...}
  // capacity: maximum weight capacity
  // Return: { maxValue: number, selectedItems: array, dpTable: 2D array }

  /* SOLUTION (uncomment to see the answer):
  if (!items.length || capacity <= 0) {
    return { maxValue: 0, selectedItems: [], dpTable: [] };
  }

  const n = items.length;
  const dp = Array(n + 1)
    .fill()
    .map(() => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      const item = items[i - 1];

      if (item.kg <= w) {
        const withItem = dp[i - 1][w - item.kg] + item.price;
        const withoutItem = dp[i - 1][w];
        dp[i][w] = Math.max(withItem, withoutItem);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  const selectedItems = [];
  let w = capacity;
  for (let i = n; i > 0 && w > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selectedItems.push({ ...items[i - 1], index: i - 1 });
      w -= items[i - 1].kg;
    }
  }

  return {
    maxValue: dp[n][capacity],
    selectedItems: selectedItems.reverse(),
    dpTable: dp,
  };
  */

  return { maxValue: 0, selectedItems: [], dpTable: [] };
}

/**
 * Generate random carrot types for testing
 * @param {number} count - Number of carrot types to generate
 * @returns {Array} Array of carrot objects
 */
export function generateRandomCarrots(count) {
  const adjectives = [
    "Sweet",
    "Crunchy",
    "Organic",
    "Baby",
    "Purple",
    "Golden",
    "Wild",
    "Fresh",
  ];
  const types = ["Carrot", "Roots", "Sticks", "Chunks", "Slices"];

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `${adjectives[i % adjectives.length]} ${types[i % types.length]}`,
    kg: Math.floor(Math.random() * 15) + 1, // 1-15 kg
    price: Math.floor(Math.random() * 180) + 20, // 20-200 price
  }));
}

/**
 * Challenge 7: Knapsack Problem Component
 * Solve the carrot knapsack optimization problem
 */
export default function Challenge07_KnapsackProblem() {
  const [carrots, setCarrots] = useState([
    { id: 0, name: "Sweet Carrots", kg: 5, price: 100 },
    { id: 1, name: "Crunchy Carrots", kg: 7, price: 150 },
    { id: 2, name: "Organic Carrots", kg: 3, price: 70 },
    { id: 3, name: "Baby Carrots", kg: 4, price: 80 },
    { id: 4, name: "Purple Carrots", kg: 6, price: 120 },
  ]);
  const [solution, setSolution] = useState(null);
  const [capacity, setCapacity] = useState(36);
  const [showDP, setShowDP] = useState(false);

  const addCarrot = useCallback(() => {
    const newCarrot = {
      id: Math.max(...carrots.map((c) => c.id)) + 1,
      name: `Carrot ${carrots.length + 1}`,
      kg: 1,
      price: 50,
    };
    setCarrots((prev) => [...prev, newCarrot]);
  }, [carrots.length]);

  const updateCarrot = useCallback((id, field, value) => {
    setCarrots((prev) =>
      prev.map((carrot) =>
        carrot.id === id ? { ...carrot, [field]: value } : carrot
      )
    );
  }, []);

  const removeCarrot = useCallback((id) => {
    setCarrots((prev) => prev.filter((carrot) => carrot.id !== id));
  }, []);

  const handleSolve = useCallback(() => {
    const result = solveKnapsack(carrots, capacity);
    setSolution(result);
  }, [carrots, capacity]);

  const handleRandomCarrots = useCallback(() => {
    setCarrots(generateRandomCarrots(8));
    setSolution(null);
  }, []);

  const handleResetExample = useCallback(() => {
    setCarrots([
      { id: 0, name: "Sweet Carrots", kg: 5, price: 100 },
      { id: 1, name: "Crunchy Carrots", kg: 7, price: 150 },
      { id: 2, name: "Organic Carrots", kg: 3, price: 70 },
    ]);
    setCapacity(36);
    setSolution(null);
  }, []);

  const greedyApproach = useMemo(() => {
    const sorted = [...carrots]
      .map((c) => ({ ...c, efficiency: c.price / c.kg }))
      .sort((a, b) => b.efficiency - a.efficiency);

    let totalWeight = 0;
    let totalValue = 0;
    const selected = [];

    for (const item of sorted) {
      if (totalWeight + item.kg <= capacity) {
        selected.push(item);
        totalWeight += item.kg;
        totalValue += item.price;
      }
    }

    return { totalValue, totalWeight, selected };
  }, [carrots, capacity]);

  const efficiency = useMemo(() => {
    return carrots
      .map((carrot) => ({
        ...carrot,
        efficiency: carrot.price / carrot.kg,
      }))
      .sort((a, b) => b.efficiency - a.efficiency);
  }, [carrots]);

  return (
    <div className={styles.challenge}>
      <div className={styles.header}>
        <h3>🎒 Knapsack Problem - Carrot Edition</h3>
        <p>
          Maximize carrot value within weight capacity using dynamic programming
        </p>
      </div>

      <div className={styles.content}>
        {/* Input Section */}
        <div className={styles.inputSection}>
          <div className={styles.capacityInput}>
            <label htmlFor="capacity">
              <strong>🎒 Bag Capacity (kg):</strong>
            </label>
            <input
              id="capacity"
              type="number"
              min="1"
              max="100"
              value={capacity}
              onChange={(e) => setCapacity(parseInt(e.target.value) || 1)}
              className={styles.capacityField}
            />
          </div>

          <div className={styles.actions}>
            <button onClick={handleSolve} className="btn primary">
              🧮 Solve Knapsack
            </button>
            <button onClick={handleRandomCarrots} className="btn">
              🎲 Random Carrots
            </button>
            <button onClick={handleResetExample} className="btn">
              🔄 Reset Example
            </button>
          </div>

          {/* Available Carrots */}
          <div className={styles.carrotsSection}>
            <div className={styles.sectionHeader}>
              <h4>🥕 Available Carrots:</h4>
              <button onClick={addCarrot} className="btn">
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
                      updateCarrot(carrot.id, "name", e.target.value)
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
                          updateCarrot(
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
                          updateCarrot(
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
                      onClick={() => removeCarrot(carrot.id)}
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
        </div>

        {/* Results Section */}
        {solution && (
          <div className={styles.resultsSection}>
            <h4>📊 Optimal Solution:</h4>
            <div className={styles.summary}>
              <div className={styles.summaryCards}>
                <div className={styles.summaryCard}>
                  <span className={styles.summaryLabel}>Maximum Value:</span>
                  <span className={styles.summaryValue}>
                    ${solution.maxValue}
                  </span>
                </div>
                <div className={styles.summaryCard}>
                  <span className={styles.summaryLabel}>Total Weight:</span>
                  <span className={styles.summaryValue}>
                    {solution.selectedItems.reduce(
                      (sum, item) => sum + item.kg,
                      0
                    )}{" "}
                    kg
                  </span>
                </div>
                <div className={styles.summaryCard}>
                  <span className={styles.summaryLabel}>Items Selected:</span>
                  <span className={styles.summaryValue}>
                    {solution.selectedItems.length}
                  </span>
                </div>
                <div className={styles.summaryCard}>
                  <span className={styles.summaryLabel}>Efficiency:</span>
                  <span className={styles.summaryValue}>
                    {(
                      solution.maxValue /
                        solution.selectedItems.reduce(
                          (sum, item) => sum + item.kg,
                          0
                        ) || 0
                    ).toFixed(1)}{" "}
                    $/kg
                  </span>
                </div>
              </div>

              <div className={styles.selectedItems}>
                <h5>Selected Carrots:</h5>
                {solution.selectedItems.map((item, index) => (
                  <div key={index} className={styles.selectedItem}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemDetails}>
                      {item.kg}kg - ${item.price} (
                      {(item.price / item.kg).toFixed(1)} $/kg)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Algorithm Comparison */}
        <div className={styles.comparisonSection}>
          <h4>🔄 Algorithm Comparison:</h4>
          <div className={styles.algorithms}>
            <div className={styles.algorithm}>
              <h5>Greedy Approach (by efficiency):</h5>
              <div className={styles.algorithmResult}>
                <p>Value: ${greedyApproach.totalValue}</p>
                <p>
                  Weight:{" "}
                  {greedyApproach.selected.reduce(
                    (sum, item) => sum + item.kg,
                    0
                  )}
                  kg
                </p>
              </div>
            </div>

            {solution && (
              <div className={styles.algorithm}>
                <h5>Dynamic Programming (optimal):</h5>
                <div className={styles.algorithmResult}>
                  <p>Value: ${solution.maxValue}</p>
                  <p>
                    Weight:{" "}
                    {solution.selectedItems.reduce(
                      (sum, item) => sum + item.kg,
                      0
                    )}
                    kg
                  </p>
                  <p className={styles.improvement}>
                    {solution.maxValue > greedyApproach.totalValue && (
                      <span className={styles.better}>
                        +${solution.maxValue - greedyApproach.totalValue}{" "}
                        better!
                      </span>
                    )}
                    {solution.maxValue === greedyApproach.totalValue && (
                      <span className={styles.same}>Same as greedy!</span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DP Table */}
        {solution && solution.dpTable.length > 0 && (
          <div className={styles.dpSection}>
            <div className={styles.dpHeader}>
              <h4>📊 Dynamic Programming Table:</h4>
              <button onClick={() => setShowDP(!showDP)} className="btn">
                {showDP ? "Hide" : "Show"} DP Table
              </button>
            </div>

            {showDP && (
              <div className={styles.dpTable}>
                <div className={styles.tableContainer}>
                  <table>
                    <thead>
                      <tr>
                        <th>Item / Weight</th>
                        {Array.from(
                          { length: Math.min(capacity + 1, 21) },
                          (_, i) => (
                            <th key={i}>{i}</th>
                          )
                        )}
                        {capacity > 20 && <th>...</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {solution.dpTable
                        .slice(0, Math.min(solution.dpTable.length, 11))
                        .map((row, i) => (
                          <tr key={i}>
                            <td className={styles.rowHeader}>
                              {i === 0
                                ? "∅"
                                : carrots[i - 1]?.name || `Item ${i}`}
                            </td>
                            {row
                              .slice(0, Math.min(row.length, 21))
                              .map((value, j) => (
                                <td
                                  key={j}
                                  className={value > 0 ? styles.hasValue : ""}
                                >
                                  {value}
                                </td>
                              ))}
                            {capacity > 20 && <td>...</td>}
                          </tr>
                        ))}
                      {solution.dpTable.length > 11 && (
                        <tr>
                          <td colSpan={Math.min(capacity + 2, 22)}>...</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Efficiency Rankings */}
        <div className={styles.efficiencySection}>
          <h4>⚡ Efficiency Rankings:</h4>
          <div className={styles.efficiencyList}>
            {efficiency.slice(0, 5).map((carrot, index) => (
              <div key={carrot.id} className={styles.efficiencyItem}>
                <span className={styles.rank}>#{index + 1}</span>
                <span className={styles.carrotName}>{carrot.name}</span>
                <span className={styles.efficiencyValue}>
                  ${carrot.efficiency.toFixed(2)}/kg
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Explanation */}
        <div className={styles.explanationSection}>
          <h4>🧠 How It Works:</h4>
          <div className={styles.steps}>
            <div className={styles.step}>
              <h5>1. Define the Problem:</h5>
              <p>
                Given carrots with weight and price, find the combination that
                maximizes value within capacity.
              </p>
            </div>
            <div className={styles.step}>
              <h5>2. Dynamic Programming:</h5>
              <p>
                Build a table where dp[i][w] = maximum value using first i items
                with weight limit w.
              </p>
            </div>
            <div className={styles.step}>
              <h5>3. Fill the Table:</h5>
              <p>
                For each item and weight, choose max(include item, exclude
                item).
              </p>
            </div>
            <div className={styles.step}>
              <h5>4. Backtrack:</h5>
              <p>
                Trace back through the table to find which items were selected
                for the optimal solution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
