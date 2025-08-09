import { generateLayoutCSS, validateLayoutCSS } from "./index";

describe("Challenge03: Flexbox Layout", () => {
  test("Example 1: Generate layout CSS", () => {
    const css = generateLayoutCSS();
    expect(typeof css).toBe("string");
  });

  test("Example 2: Validate complete flexbox CSS", () => {
    const goodCSS = `
      .container { display: flex; flex-direction: column; }
      .header { flex: 0 0 auto; }
      .main-content { flex: 1; display: flex; }
      .sidebar { flex: 0 0 200px; }
    `;
    const result = validateLayoutCSS(goodCSS);
    expect(result.score).toBeGreaterThan(0);
    expect(result.isValid).toBeDefined();
  });

  test("Example 3: Validate empty CSS", () => {
    const result = validateLayoutCSS("");
    expect(result.score).toBe(0);
    expect(result.isValid).toBe(false);
  });

  test("Example 4: Validate partial CSS", () => {
    const partialCSS = ".container { display: flex; }";
    const result = validateLayoutCSS(partialCSS);
    expect(result.score).toBeGreaterThan(0);
    expect(result.passedChecks).toBeDefined();
    expect(result.failedChecks).toBeDefined();
  });

  test("Example 5: Check validation structure", () => {
    const result = validateLayoutCSS("test");
    expect(result).toHaveProperty("score");
    expect(result).toHaveProperty("maxScore");
    expect(result).toHaveProperty("percentage");
    expect(result).toHaveProperty("isValid");
  });
});
