import { findDuplicates } from "./index";

describe("Challenge01: Array Duplicates", () => {
  test("Basic duplicates", () => {
    const result = findDuplicates([
      "a",
      "b",
      "c",
      "a",
      "d",
      "b",
      { a: 1, b: 2 },
      { a: 1, b: 2, c: { d: 3, f: { g: 4 } } },
      { a: 1, b: 2, c: { d: 3, f: { g: 4 } } },
    ]);
    expect(result).toEqual([
      "a",
      "b",
      "{ a: 1, b: 2, c: { d: 3, f: { g: 4 } } }",
    ]);
  });

  test("No duplicates", () => {
    expect(findDuplicates([1, 2, 3, 4, 5])).toEqual([]);
  });

  test("Empty array", () => {
    expect(findDuplicates([])).toEqual([]);
  });
});
