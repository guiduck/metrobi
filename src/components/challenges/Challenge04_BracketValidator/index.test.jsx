import { getBracketMatches } from ".";

describe("Challenge04: Bracket Validator", () => {
  test("Valid brackets", () => {
    const result = getBracketMatches("{[()]}");
    expect(result.isValid).toBe(true);
  });

  test("Invalid brackets", () => {
    const result = getBracketMatches("([)]");
    expect(result.isValid).toBe(false);
  });

  test("Empty string", () => {
    const result = getBracketMatches("");
    expect(result.isValid).toBe(true);
  });
});
