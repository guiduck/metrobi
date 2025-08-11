import { solveEggDrop } from "./index";

describe("Challenge05: Egg Drop Problem", () => {
  test("Basic egg drop solution", () => {
    const result = solveEggDrop(50, 10);
    expect(result.drops).toBeGreaterThan(0);
    expect(result.worstCase).toBeGreaterThan(0);
    expect(result.breakingFloor).toBe(50);
  });

  test("Edge case - floor 1", () => {
    const result = solveEggDrop(1, 10);
    expect(result.breakingFloor).toBe(1);
    expect(result.drops).toBeGreaterThan(0);
  });

  test("Edge case - floor 100", () => {
    const result = solveEggDrop(100, 10);
    expect(result.breakingFloor).toBe(100);
    expect(result.drops).toBeGreaterThan(0);
  });
});
