import { getRaceResult } from "./index";

describe("Challenge06: Zeno's Paradox", () => {
  test("Basic race simulation", () => {
    const result = getRaceResult(100, 10);
    expect(result.steps).toBeInstanceOf(Array);
    expect(result.steps.length).toBeGreaterThan(0);
    expect(result.totalTime).toBeGreaterThan(0);
    expect(result.winner).toBeTruthy();
  });

  test("Tortoise with head start", () => {
    const result = getRaceResult(50, 20);
    expect(result.steps[0].tortoise.percentage).toBeGreaterThan(0);
    expect(result.steps[0].achilles.percentage).toBe(0);
  });

  test("Race completion", () => {
    const result = getRaceResult(100, 5);
    const lastStep = result.steps[result.steps.length - 1];
    expect(lastStep.achilles.percentage).toBeGreaterThanOrEqual(100);
  });
});
