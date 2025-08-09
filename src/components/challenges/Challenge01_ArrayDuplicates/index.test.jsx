import { findDuplicates } from "./index";

describe("Challenge01: Array Duplicates", () => {
  test("Example 1", () => {
    const input = ["a", "b", "c", "a", "d", "b"];
    const expected = ["a", "b"];
    const result = findDuplicates(input);
    expect(result.sort()).toEqual(expected.sort());
  });

  test("Example 2", () => {
    const input = [1, 2, 3, 4, 5];
    const expected = [];
    expect(findDuplicates(input)).toEqual(expected);
  });

  test("Example 3", () => {
    const input = [1, 1, 1, 1];
    const expected = [1];
    expect(findDuplicates(input)).toEqual(expected);
  });

  test("Example 4", () => {
    const input = [];
    const expected = [];
    expect(findDuplicates(input)).toEqual(expected);
  });

  test("Example 5", () => {
    const input = [1, "1", 1, "1"];
    const expected = [1, "1"];
    const result = findDuplicates(input);
    expect(result.sort()).toEqual(expected.sort());
  });
});
