import { processArrayWithExponentialDelays } from "./index";

describe("Challenge02: Async Array Processing", () => {
  test("Basic array with delays", async () => {
    const result = await processArrayWithExponentialDelays(["a", "b"]);
    expect(result).toHaveLength(2);
    expect(result[0].item).toBe("a");
    expect(result[1].item).toBe("b");
  });

  test("Empty array", async () => {
    const result = await processArrayWithExponentialDelays([]);
    expect(result).toEqual([]);
  });

  test("Invalid input throws error", async () => {
    await expect(
      processArrayWithExponentialDelays("not array")
    ).rejects.toThrow();
  });
});
