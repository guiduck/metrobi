import { validateBrackets, getBracketMatches } from "./index";

describe("Challenge04: Bracket Validator", () => {
  test("Example 1: Valid nested brackets", () => {
    const result = validateBrackets("{[()]}");
    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });

  test("Example 2: Invalid mismatched brackets", () => {
    const result = validateBrackets("([)]");
    expect(result.isValid).toBe(false);
    expect(result.error).toBeTruthy();
  });

  test("Example 3: Valid simple brackets", () => {
    const result = validateBrackets("()");
    expect(result.isValid).toBe(true);
  });

  test("Example 4: Invalid extra closing bracket", () => {
    const result = validateBrackets("())");
    expect(result.isValid).toBe(false);
    expect(result.position).toBeGreaterThanOrEqual(0);
  });

  test("Example 5: Empty string is valid", () => {
    const result = validateBrackets("");
    expect(result.isValid).toBe(true);
  });

  test("Example 6: Get bracket matches", () => {
    const matches = getBracketMatches("()");
    expect(Array.isArray(matches)).toBe(true);
  });

  test("Example 7: Unclosed bracket", () => {
    const result = validateBrackets("((");
    expect(result.isValid).toBe(false);
  });
});
