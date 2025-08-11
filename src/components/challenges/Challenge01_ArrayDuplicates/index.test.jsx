import { findDuplicates } from "./index";

describe("Challenge01: Array Duplicates", () => {
  test("Basic duplicates", () => {
    const result = findDuplicates(["a", "b", "c", "a", "d", "b"]);
    expect(result).toEqual([
      ["a", 2],
      ["b", 2],
    ]);
  });

  test("No duplicates", () => {
    expect(findDuplicates([1, 2, 3, 4, 5])).toEqual([]);
  });

  test("Empty array", () => {
    expect(findDuplicates([])).toEqual([]);
  });
});
