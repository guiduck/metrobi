import { solveEggDrop, getOptimal100FloorSequence } from "./index";

describe("Challenge05: Egg Drop Problem", () => {
  test("Example 1: Basic case - 2 floors, 1 egg", () => {
    const result = solveEggDrop(2, 1);
    expect(result.minDrops).toBe(2);
    expect(result.strategy).toHaveLength(2);
  });

  test("Example 2: Simple case - 10 floors, 2 eggs", () => {
    const result = solveEggDrop(10, 2);
    expect(result.minDrops).toBeGreaterThan(0);
    expect(Array.isArray(result.strategy)).toBe(true);
  });

  test("Example 3: Edge case - 0 floors", () => {
    const result = solveEggDrop(0, 2);
    expect(result.minDrops).toBe(0);
    expect(result.strategy).toEqual([]);
  });

  test("Example 4: Edge case - 0 eggs", () => {
    const result = solveEggDrop(5, 0);
    expect(result.minDrops).toBe(0);
    expect(result.strategy).toEqual([]);
  });

  test("Example 5: Single floor", () => {
    const result = solveEggDrop(1, 2);
    expect(result.minDrops).toBe(1);
  });

  test("Example 6: 100-floor sequence", () => {
    const sequence = getOptimal100FloorSequence();
    expect(Array.isArray(sequence)).toBe(true);
  });
});
