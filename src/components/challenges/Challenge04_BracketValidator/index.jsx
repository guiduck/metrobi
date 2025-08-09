import { useState, useCallback, useMemo } from "react";
import styles from "./styles.module.scss";

/**
 * Validate if brackets are properly opened and closed
 * @param {string} input - String with brackets to validate
 * @returns {Object} Validation result with details
 */
export function validateBrackets(input) {
  // TODO: Implement your bracket validation solution here
  // Return an object with: { isValid: boolean, error: string|null, position: number }
  // Handle these brackets: (), [], {}
  // Brackets must be properly nested and closed in correct order

  /* SOLUTION (uncomment to see the answer):
  if (typeof input !== "string") {
    return { isValid: false, error: "Input must be a string", position: -1 };
  }

  const stack = [];
  const pairs = { "(": ")", "[": "]", "{": "}" };
  const openBrackets = Object.keys(pairs);
  const closeBrackets = Object.values(pairs);

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (openBrackets.includes(char)) {
      stack.push({ bracket: char, position: i });
    } else if (closeBrackets.includes(char)) {
      if (stack.length === 0) {
        return {
          isValid: false,
          error: `Unexpected closing bracket '${char}'`,
          position: i,
          expected: "opening bracket",
        };
      }

      const last = stack.pop();
      if (pairs[last.bracket] !== char) {
        return {
          isValid: false,
          error: `Mismatched bracket '${char}' - expected '${pairs[last.bracket]}'`,
          position: i,
          expected: pairs[last.bracket],
          openPosition: last.position,
        };
      }
    }
  }

  if (stack.length > 0) {
    const unclosed = stack[stack.length - 1];
    return {
      isValid: false,
      error: `Unclosed bracket '${unclosed.bracket}'`,
      position: unclosed.position,
      expected: pairs[unclosed.bracket],
    };
  }

  return { isValid: true, error: null, position: -1 };
  */

  return { isValid: true, error: null, position: -1 };
}

/**
 * Get bracket matching visualization data
 * @param {string} input - String to analyze
 * @returns {Array} Array of bracket positions and their matches
 */
export function getBracketMatches(input) {
  // TODO: Implement bracket matching visualization data
  // This function should return an array of objects for each bracket with:
  // { id, type: 'open'|'close', bracket, position, matched: boolean, pairId }
  // This is used for the visual highlighting in the UI

  /* SOLUTION (uncomment to see the answer):
  const stack = [];
  const matches = [];
  const pairs = { "(": ")", "[": "]", "{": "}" };
  const openBrackets = Object.keys(pairs);
  const closeBrackets = Object.values(pairs);

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (openBrackets.includes(char)) {
      stack.push({ bracket: char, position: i, id: matches.length });
      matches.push({
        id: matches.length,
        type: "open",
        bracket: char,
        position: i,
        matched: false,
        pairId: null,
      });
    } else if (closeBrackets.includes(char)) {
      if (stack.length > 0 && pairs[stack[stack.length - 1].bracket] === char) {
        const opening = stack.pop();
        const closingId = matches.length;

        matches[opening.id].matched = true;
        matches[opening.id].pairId = closingId;

        matches.push({
          id: closingId,
          type: "close",
          bracket: char,
          position: i,
          matched: true,
          pairId: opening.id,
        });
      } else {
        matches.push({
          id: matches.length,
          type: "close",
          bracket: char,
          position: i,
          matched: false,
          pairId: null,
        });
      }
    }
  }

  return matches;
  */

  const pairOfSymbols = {
    "(": ")",
    "[": "]",
    "{": "}",
    ")": "(",
    "]": "[",
    "}": "{",
  };

  const frequencyOfSymbols = {};

  for (let i = 0; i < input.length; i++) {
    const symbol = input[i];
    const hasPair =
      // if (!hasPair) {
      //   frequencyOfSymbols[symbol] = (frequencyOfSymbols[symbol] ?? 0) - 1;
      // }

      (frequencyOfSymbols[symbol] = (frequencyOfSymbols[symbol] ?? 0) + 1);
  }

  console.log(Object.keys(frequencyOfSymbols));

  console.log(
    Object.keys(frequencyOfSymbols).every((key) => {
      const matchingPairSymbol = pairOfSymbols[key];
      console.log(matchingPairSymbol, frequencyOfSymbols[key]);
      return frequencyOfSymbols[matchingPairSymbol] === frequencyOfSymbols[key];
    })
  );

  // TODO: check if there are crossed symbols
  // check if inbetweeen symbols are valid

  // top solution: checar se na substring entre o simbolo aberto eo simbolo correspondente que fecha, tem numero par de elementos e todos que abrem, fecham nessa string

  //  um for e cada vez que achar um sybol abrindo, => checar se o proximo fecha(é válido), => se nao fechar, {
  //    checar se a substring entre o simbolo aberto e o simbolo correspondente que fecha
  //    é valida com o memso método de checar se a abertura
  //    e fechamento tem frequencias iguais
  //    se sim, continuar, se não, retornar false
  //}

  return {
    frequencyOfSymbols: Object.entries(frequencyOfSymbols),
    isValid: Object.keys(frequencyOfSymbols).every((key) => {
      const matchingPair = pairOfSymbols[key];
      return frequencyOfSymbols[matchingPair] === frequencyOfSymbols[key];
    }),
  };
}

/**
 * Challenge 4: Bracket Validator Component
 * Validate and visualize bracket matching
 */
export default function Challenge04_BracketValidator() {
  const [input, setInput] = useState("{[()]}");
  const [validation, setValidation] = useState(null);

  const bracketMatches = useMemo(() => getBracketMatches(input), [input]);

  console.log(bracketMatches);

  const handleValidate = useCallback(() => {
    const result = validateBrackets(input);
    const { isValid } = getBracketMatches(input);
    setValidation({ ...result, isValid });
  }, [input]);

  const handleExampleClick = (example) => {
    setInput(example);
    setValidation(null);
  };

  const examples = [
    { text: "{[]}", label: "Valid: Nested" },
    { text: "{()}", label: "Invalid: Mixed" },
    { text: "((()))", label: "Valid: Balanced" },
    { text: "([)]", label: "Invalid: Crossed" },
    { text: "{[()()]}", label: "Valid: Complex" },
    { text: "(()", label: "Invalid: Unclosed" },
    { text: "())", label: "Invalid: Extra close" },
    { text: "", label: "Valid: Empty" },
  ];

  const renderBracketVisualization = () => {
    return input.split("").map((char, index) => {
      const match = bracketMatches.find((m) => m.position === index);
      const isError =
        validation && !validation.isValid && validation.position === index;

      let className = styles.char;
      if (match) {
        className += ` ${styles.bracket}`;
        if (match.matched) {
          className += ` ${styles.matched}`;
        } else {
          className += ` ${styles.unmatched}`;
        }
        if (match.type === "open") {
          className += ` ${styles.opening}`;
        } else {
          className += ` ${styles.closing}`;
        }
      }
      if (isError) {
        className += ` ${styles.error}`;
      }

      return (
        <span
          key={index}
          className={className}
          data-pair-id={match?.pairId}
          title={
            match
              ? `${match.type} bracket ${
                  match.matched ? "(matched)" : "(unmatched)"
                }`
              : ""
          }
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div className={styles.challenge}>
      <div className={styles.header}>
        <h3>🔗 Bracket Validator</h3>
        <p>
          Validate if brackets {`{}, (), []`} are properly opened and closed
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.inputSection}>
          <label htmlFor="bracketInput" className={styles.label}>
            Enter string with brackets:
          </label>
          <input
            id="bracketInput"
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setValidation(null);
            }}
            className={styles.input}
            placeholder="Enter brackets like {[()]}"
          />

          <div className={styles.actions}>
            <button onClick={handleValidate} className="btn primary">
              Validate Brackets
            </button>
          </div>
        </div>

        <div className={styles.examples}>
          <h4>Quick Examples:</h4>
          <div className={styles.exampleGrid}>
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example.text)}
                className={`btn ${styles.exampleBtn}`}
                title={example.label}
              >
                <span className={styles.exampleText}>
                  {example.text || "(empty)"}
                </span>
                <span className={styles.exampleLabel}>{example.label}</span>
              </button>
            ))}
          </div>
        </div>

        {input && (
          <div className={styles.visualizationSection}>
            <h4>🎨 Bracket Visualization:</h4>
            <div className={styles.visualization}>
              {/* {renderBracketVisualization()} */}
            </div>

            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span
                  className={`${styles.bracket} ${styles.matched} ${styles.opening}`}
                >
                  ( [
                </span>
                <span>Matched Opening</span>
              </div>
              <div className={styles.legendItem}>
                <span
                  className={`${styles.bracket} ${styles.matched} ${styles.closing}`}
                >
                  ] )
                </span>
                <span>Matched Closing</span>
              </div>
              <div className={styles.legendItem}>
                <span className={`${styles.bracket} ${styles.unmatched}`}>
                  {}
                </span>
                <span>Unmatched</span>
              </div>
              <div className={styles.legendItem}>
                <span className={`${styles.bracket} ${styles.error}`}>!</span>
                <span>Error Position</span>
              </div>
            </div>
          </div>
        )}

        {validation && (
          <div className={styles.resultSection}>
            <div
              className={`${styles.result} ${
                validation.isValid ? styles.valid : styles.invalid
              }`}
            >
              <div className={styles.resultHeader}>
                <span className={styles.resultIcon}>
                  {validation.isValid ? "✅" : "❌"}
                </span>
                <span className={styles.resultText}>
                  {validation.isValid ? "Valid Brackets!" : "Invalid Brackets"}
                </span>
              </div>

              {!validation.isValid && (
                <div className={styles.errorDetails}>
                  <p className={styles.errorMessage}>{validation.error}</p>
                  {validation.position >= 0 && (
                    <p className={styles.errorPosition}>
                      Error at position: {validation.position + 1}
                    </p>
                  )}
                  {validation.expected && (
                    <p className={styles.expectedBracket}>
                      Expected: <code>{validation.expected}</code>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <div className={styles.statsSection}>
          <h4>📊 Statistics:</h4>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Total Characters:</span>
              <span className={styles.statValue}>{input.length}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Brackets:</span>
              <span className={styles.statValue}>
                {bracketMatches.frequencyOfSymbols.length}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Matched Pairs:</span>
              <span className={styles.statValue}>
                {Math.floor(
                  bracketMatches.frequencyOfSymbols.filter((m) => m.matched)
                    .length / 2
                )}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Unmatched:</span>
              <span className={styles.statValue}>
                {
                  bracketMatches.frequencyOfSymbols.filter((m) => !m.matched)
                    .length
                }
              </span>
            </div>
          </div>
        </div>

        <div className={styles.rulesSection}>
          <h4>📋 Validation Rules:</h4>
          <ul className={styles.rulesList}>
            <li>Every opening bracket must have a matching closing bracket</li>
            <li>
              Brackets must be closed in the correct order (LIFO - Last In,
              First Out)
            </li>
            <li>
              Supported brackets: <code>()</code>, <code>[]</code>,{" "}
              <code>{`{}`}</code>
            </li>
            <li>Mixed bracket types must be properly nested</li>
            <li>Empty string is considered valid</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
