import {
  calculateZenosProgression,
  calculateContinuousPosition,
} from "./index";

describe("Challenge06: Zeno's Paradox", () => {
  test("Example 1: Basic progression", () => {
    const positions = calculateZenosProgression(100, 3);
    expect(positions).toHaveLength(4); // includes starting position 0
    expect(positions[0]).toBe(0);
  });

  test("Example 2: Zero distance", () => {
    const positions = calculateZenosProgression(0, 5);
    expect(positions.every((pos) => pos === 0)).toBe(true);
  });

  test("Example 3: Single step", () => {
    const positions = calculateZenosProgression(100, 1);
    expect(positions).toHaveLength(2);
    expect(positions[1]).toBe(50); // half of 100
  });

  test("Example 4: Continuous position at start", () => {
    const position = calculateContinuousPosition(0, 100);
    expect(position).toBe(0);
  });

  test("Example 5: Continuous position at midpoint", () => {
    const position = calculateContinuousPosition(0.5, 100);
    expect(position).toBeGreaterThan(0);
    expect(position).toBeLessThan(100);
  });

  test("Example 6: Progression is increasing", () => {
    const positions = calculateZenosProgression(100, 5);
    for (let i = 1; i < positions.length; i++) {
      expect(positions[i]).toBeGreaterThan(positions[i - 1]);
    }
  });
});
