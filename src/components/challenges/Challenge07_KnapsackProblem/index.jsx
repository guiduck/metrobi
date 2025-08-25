import { useState, useCallback } from "react";
import styles from "./styles.module.scss";
import {
  ConfigurationSection,
  CarrotsSection,
  ResultsSection,
  ExplanationSection,
} from "./ui";

/**
 * Find the most expensive carrot bag we can make
 * @param {Array} carrots - Array of {kg, price} carrot objects
 * @param {number} bagCapacity - Maximum weight our bag can hold
 * @returns {Object} Solution with maxPrice and selectedCarrots
 */
export function findMostExpensiveBag(carrotTypes, bagCapacity) {
  if (!carrotTypes.length || bagCapacity <= 0) {
    return { maxPrice: 0, selectedCarrots: [], solutionTable: [] };
  }

  const pricePerWeight = {};
  const carrotBag = {};

  let remainingWeight = bagCapacity;

  for (let weight = 0; weight <= bagCapacity; weight++) {
    carrotTypes.forEach((carrot) => {
      const currentBag = carrotBag[weight - carrot.kg] ?? {};
      const newPriceWithNewCarrot =
        (pricePerWeight[weight - carrot.kg] ?? 0) + carrot.price;
      let currentCarrotCount = currentBag[carrot.id] ?? 0;

      const fitsBag = weight >= carrot.kg;
      const isHigherValue =
        newPriceWithNewCarrot > (pricePerWeight[weight] ?? 0);

      if (isHigherValue && fitsBag) {
        pricePerWeight[weight] = newPriceWithNewCarrot ?? 0;
        remainingWeight =
          (currentBag.remainingWeight ?? bagCapacity) - carrot.kg;
        currentCarrotCount++;

        carrotBag[weight] = {
          ...currentBag,
          remainingWeight,
          price: pricePerWeight[weight] ?? 0,
          [carrot.id]: currentCarrotCount,
        };
      }
    });
  }

  const finalBag = carrotBag[bagCapacity];

  const selectedCarrots = carrotTypes.map((carrot, index) => {
    const count = finalBag[carrot.id] ?? 0;
    const totalWeight = count * carrot.kg;
    const totalPrice = count * carrot.price;

    return {
      ...carrot,
      index,
      count,
      totalWeight,
      totalPrice,
    };
  });

  return {
    maxPrice: finalBag.price,
    selectedCarrots,
    solutionTable: [pricePerWeight],
    usedWeight: bagCapacity - remainingWeight,
  };
}
/**
 * Find the most expensive carrot bag we can make
 * @param {Array} carrots - Array of {kg, price} carrot objects
 * @param {number} bagCapacity - Maximum weight our bag can hold
 * @returns {Object} Solution with maxPrice and selectedCarrots
 */
// export function findMostExpensiveBag(carrotTypes, bagCapacity) {
//   if (!carrotTypes.length || bagCapacity <= 0) {
//     return { maxPrice: 0, selectedCarrots: [], solutionTable: [] };
//   }

//   const bestPrice = Array(bagCapacity + 1).fill(0);
//   const chosenCarrot = Array(bagCapacity + 1).fill(-1);

//   for (let weight = 1; weight <= bagCapacity; weight++) {
//     for (let carrotIndex = 0; carrotIndex < carrotTypes.length; carrotIndex++) {
//       const carrotType = carrotTypes[carrotIndex];

//       if (carrotType.kg <= weight) {
//         const priceWithNewCarrotType =
//           bestPrice[weight - carrotType.kg] + carrotType.price;

//         if (priceWithNewCarrotType > bestPrice[weight]) {
//           bestPrice[weight] = priceWithNewCarrotType;
//           chosenCarrot[weight] = carrotIndex;
//         }
//       }
//     }
//   }

//   const carrotCounts = Array(carrotTypes.length).fill(0);
//   let remainingWeight = bagCapacity;

//   while (remainingWeight > 0 && chosenCarrot[remainingWeight] !== -1) {
//     const carrotIndex = chosenCarrot[remainingWeight];
//     carrotCounts[carrotIndex]++;
//     remainingWeight -= carrotTypes[carrotIndex].kg;
//   }

//   const selectedCarrots = carrotCounts.reduce((result, count, index) => {
//     if (count > 0) {
//       const carrotType = carrotTypes[index];
//       result.push({
//         ...carrotType,
//         index,
//         count,
//         totalWeight: carrotType.kg * count,
//         totalPrice: carrotType.price * count,
//       });
//     }
//     return result;
//   }, []);

//   return {
//     maxPrice: bestPrice[bagCapacity],
//     selectedCarrots,
//     solutionTable: [bestPrice],
//     usedWeight: bagCapacity - remainingWeight,
//   };
// }

/**
 * @param {number} count - Number of carrot types to generate
 * @returns {Array} Array of carrot objects
 */
export function generateRandomCarrots(count) {
  const adjectives = [
    "Sweet",
    "Crunchy",
    "Organic",
    "Baby",
    "Purple",
    "Golden",
    "Wild",
    "Fresh",
  ];
  const types = ["Carrot", "Roots", "Sticks", "Chunks", "Slices"];

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `${adjectives[i % adjectives.length]} ${types[i % types.length]}`,
    kg: Math.floor(Math.random() * 15) + 1, // 1-15
    price: Math.floor(Math.random() * 180) + 20, // 20-200
  }));
}

/**
 * @returns {JSX.Element} Challenge07 component
 */
export default function Challenge07_KnapsackProblem() {
  const [carrots, setCarrots] = useState([
    { id: 0, name: "Sweet Carrots", kg: 5, price: 100 },
    { id: 1, name: "Crunchy Carrots", kg: 7, price: 150 },
    { id: 2, name: "Organic Carrots", kg: 3, price: 70 },
  ]);
  const [solution, setSolution] = useState(null);
  const [capacity, setCapacity] = useState(36);

  const addCarrot = useCallback(() => {
    const newCarrot = {
      id: Math.max(...carrots.map((c) => c.id)) + 1,
      name: `Carrot ${carrots.length + 1}`,
      kg: 1,
      price: 50,
    };
    setCarrots((prev) => [...prev, newCarrot]);
  }, [carrots]);

  /**
   * @param {number} id - Carrot ID to update
   * @param {string} field - Field to update (name, kg, price)
   * @param {*} value - New value
   */
  const updateCarrot = useCallback((id, field, value) => {
    setCarrots((prev) =>
      prev.map((carrot) =>
        carrot.id === id ? { ...carrot, [field]: value } : carrot
      )
    );
  }, []);

  /**
   * @param {number} id - Carrot ID to remove
   */
  const removeCarrot = useCallback((id) => {
    setCarrots((prev) => prev.filter((carrot) => carrot.id !== id));
  }, []);

  const handleSolve = useCallback(() => {
    const result = findMostExpensiveBag(carrots, capacity);
    setSolution(result);
  }, [carrots, capacity]);

  const handleRandomCarrots = useCallback(() => {
    setCarrots(generateRandomCarrots(8));
    setSolution(null);
  }, []);

  const handleResetExample = useCallback(() => {
    setCarrots([
      { id: 0, name: "Sweet Carrots", kg: 5, price: 100 },
      { id: 1, name: "Crunchy Carrots", kg: 7, price: 150 },
      { id: 2, name: "Organic Carrots", kg: 3, price: 70 },
    ]);
    setCapacity(36);
    setSolution(null);
  }, []);

  return (
    <div className={styles.challenge}>
      <div className={styles.header}>
        <h3>🥕 Carrot Bag Problem</h3>
        <p>
          Find the most expensive bag of carrots you can make within the weight
          limit!
        </p>
      </div>

      <div className={styles.content}>
        <ConfigurationSection
          capacity={capacity}
          setCapacity={setCapacity}
          onSolve={handleSolve}
          onRandomCarrots={handleRandomCarrots}
          onResetExample={handleResetExample}
        />

        <CarrotsSection
          carrots={carrots}
          onAddCarrot={addCarrot}
          onUpdateCarrot={updateCarrot}
          onRemoveCarrot={removeCarrot}
        />

        <ResultsSection solution={solution} />

        <ExplanationSection />
      </div>
    </div>
  );
}
