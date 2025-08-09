import { processArrayWithExponentialDelays } from "./index";

describe("Challenge02: Async Array Processing", () => {
  test("Example 1: Basic array processing", async () => {
    const input = ["a", "b"];
    const result = await processArrayWithExponentialDelays(input);
    expect(result).toHaveLength(2);
  });

  test("Example 2: Empty array", async () => {
    const input = [];
    const result = await processArrayWithExponentialDelays(input);
    expect(result).toEqual([]);
  });

  test("Example 3: Single item", async () => {
    const input = ["solo"];
    const result = await processArrayWithExponentialDelays(input);
    expect(result).toHaveLength(1);
  });

  test("Example 4: Multiple items", async () => {
    const input = [1, 2, 3];
    const result = await processArrayWithExponentialDelays(input);
    expect(result).toHaveLength(3);
  });

  test("Example 5: Non-array input should throw", async () => {
    await expect(
      processArrayWithExponentialDelays("not an array")
    ).rejects.toThrow();
  });
});
