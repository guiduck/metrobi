import { solveKnapsack, generateRandomCarrots } from "./index";

describe("Challenge07: Knapsack Problem", () => {
  test("Example 1: Basic knapsack", () => {
    const items = [
      { kg: 2, price: 10 },
      { kg: 3, price: 15 },
      { kg: 5, price: 20 },
    ];
    const result = solveKnapsack(items, 5);
    expect(result.maxValue).toBeGreaterThan(0);
    expect(Array.isArray(result.selectedItems)).toBe(true);
  });

  test("Example 2: Empty items", () => {
    const result = solveKnapsack([], 10);
    expect(result.maxValue).toBe(0);
    expect(result.selectedItems).toEqual([]);
  });

  test("Example 3: Zero capacity", () => {
    const items = [{ kg: 1, price: 10 }];
    const result = solveKnapsack(items, 0);
    expect(result.maxValue).toBe(0);
  });

  test("Example 4: Single item that fits", () => {
    const items = [{ kg: 3, price: 15 }];
    const result = solveKnapsack(items, 5);
    expect(result.maxValue).toBe(15);
    expect(result.selectedItems).toHaveLength(1);
  });

  test("Example 5: Single item that doesn't fit", () => {
    const items = [{ kg: 10, price: 15 }];
    const result = solveKnapsack(items, 5);
    expect(result.maxValue).toBe(0);
    expect(result.selectedItems).toHaveLength(0);
  });

  test("Example 6: Generate random carrots", () => {
    const carrots = generateRandomCarrots(5);
    expect(carrots).toHaveLength(5);
    expect(carrots[0]).toHaveProperty("kg");
    expect(carrots[0]).toHaveProperty("price");
  });
});
