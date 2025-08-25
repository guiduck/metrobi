import { useState, useCallback } from "react";
import styles from "./styles.module.scss";
import { InputSection, ExamplesSection, ResultSection } from "./ui";

/**
 * Get bracket matching visualization data
 * @param {string} input - String to analyze
 * @returns {Array} Array of bracket positions and their matches
 */

//   const pairOfSymbols = {
//     "(": ")",
//     "[": "]",
//     "{": "}",
//   };

//   const openBrackets = Object.keys(pairOfSymbols);
//   const closeBrackets = Object.values(pairOfSymbols);

//   const checkIfValid = (input) => {
//     if (input.length === 0) {
//       return true;
//     }

//     const hasNoOpenBrackets = ![...input].some(symbol => openBrackets.includes(symbol));
//     if (hasNoOpenBrackets) {
//       return false;
//     }

//     const hasOddNumberOfSymbols = (substring) => substring.length % 2 !== 0;

//     for (let i = 0; i < input.length; i++) {
//       const symbol = input[i];
//       const isOpenSymbol = openBrackets.includes(symbol);
//       const isCloseSymbol = closeBrackets.includes(symbol);
//       // const hasPair =

//       if (isCloseSymbol) {
//         const matchingOpeningSymbol = pairOfSymbols[symbol];
//         const matchingOpeningSymbolPosition = input.indexOf(matchingOpeningSymbol);

//         if (matchingOpeningSymbolPosition === -1 || matchingOpeningSymbolPosition > i) {
//           return false;
//         }
//       }

//       if (isOpenSymbol) {
//         const matchingClosingSymbol = pairOfSymbols[symbol];
//         const matchingClosingSymbolPosition = input.indexOf(matchingClosingSymbol);

//         if (matchingClosingSymbolPosition === -1) {
//           return false;
//         }

//         const substring = input.substring(i + 1, matchingClosingSymbolPosition);

//         console.log("substring", substring);

//         const isValid = !hasOddNumberOfSymbols(substring);

//         if (!isValid) {
//           return false;
//         }

//         const finishedString = substring.length < 1;

//         if (finishedString) {
//           return true;
//         }

//         if (!finishedString) {
//           const substringIsValid = checkIfValid(substring);

//           if (!substringIsValid) {
//             return false;
//           }

//           const stringAfterClosingSymbol = input.substring(matchingClosingSymbolPosition + 1);

//           return checkIfValid(stringAfterClosingSymbol);
//         }

//         return false;
//       }

//       return true;
//     }

//     // TODO: check if there are crossed symbols
//     // check if inbetweeen symbols are valid

//     // top solution: checar se na substring entre o simbolo aberto eo simbolo correspondente que fecha, tem numero par de elementos e todos que abrem, fecham nessa string

//     //  um for e cada vez que achar um sybol abrindo, => checar se o proximo fecha(é válido), => se nao fechar, {
//     //    checar se a substring entre o simbolo aberto e o simbolo correspondente que fecha
//     //    é valida com o memso método de checar se a abertura
//     //    e fechamento tem frequencias iguais
//     //    se sim, continuar, se não, retornar false
//     //}
//   }

//   const frequencyOfSymbols = {};

//   for (let i = 0; i < userInput.length; i++) {
//     const symbol = userInput[i];
//     frequencyOfSymbols[symbol] = (frequencyOfSymbols[symbol] ?? 0) + 1;
//   }

//   return {
//     isValid: checkIfValid(userInput),
//     frequencyOfSymbols: Object.entries(frequencyOfSymbols),
//   }
// }

/**
 * Get bracket matching visualization data
 * @param {string} userInput - String to analyze
 * @returns {Object} Object with isValid
 */
export const getBracketMatches = (userInput) => {
  const pairOfSymbols = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  const openSymbols = Object.keys(pairOfSymbols);
  const closeSymbols = Object.values(pairOfSymbols);

  const openningSymbols = [];

  for (let i = 0; i < userInput.length; i++) {
    const symbol = userInput[i];

    // const isASymbol = openSymbols.includes(symbol) || closeSymbols.includes(symbol);

    // if (!isASymbol) {
    //   return {
    //     isValid: false,
    //   }
    // }

    if (openSymbols.includes(symbol)) {
      openningSymbols.push(symbol);
    }

    if (closeSymbols.includes(symbol)) {
      if (openningSymbols.length === 0) {
        return false;
      }

      const lastOpenningSymbol = openningSymbols.pop();

      const expectedClosingSymbol = pairOfSymbols[lastOpenningSymbol];

      if (symbol !== expectedClosingSymbol) {
        return false;
      }
    }
  }

  return Boolean(openningSymbols.length === 0);
};

export default function Challenge04_BracketValidator() {
  const [input, setInput] = useState("{[()]}");
  const [validation, setValidation] = useState(null);

  const handleValidate = useCallback(() => {
    const isValid = getBracketMatches(input);
    setValidation({ isValid });
  }, [input]);

  /**
   * @param {string} example - Example string to set as input
   */
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

  return (
    <div className={styles.challenge}>
      <div className={styles.header}>
        <h3>🔗 Bracket Validator</h3>
        <p>
          Validate if brackets {`{}, (), []`} are properly opened and closed
        </p>
      </div>

      <div className={styles.content}>
        <InputSection
          input={input}
          setInput={setInput}
          setValidation={setValidation}
          onValidate={handleValidate}
        />

        <ExamplesSection
          examples={examples}
          onExampleClick={handleExampleClick}
        />

        <ResultSection validation={validation} />
      </div>
    </div>
  );
}
