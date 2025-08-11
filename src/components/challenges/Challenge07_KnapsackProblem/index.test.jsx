import { findMostExpensiveBag } from "./index";

describe("Challenge07: Knapsack Problem", () => {
  test("Basic carrot bag solution", () => {
    const carrots = [
      { kg: 5, price: 100, name: "Sweet" },
      { kg: 7, price: 150, name: "Crunchy" },
      { kg: 3, price: 70, name: "Organic" },
    ];
    const result = findMostExpensiveBag(carrots, 36);

    expect(result.maxPrice).toBeGreaterThan(0);
    expect(result.selectedCarrots).toBeInstanceOf(Array);
    expect(result.usedWeight).toBeGreaterThan(0);
  });

  test("Empty carrots array", () => {
    const result = findMostExpensiveBag([], 36);
    expect(result.maxPrice).toBe(0);
    expect(result.selectedCarrots).toEqual([]);
  });

  test("Single carrot type", () => {
    const carrots = [{ kg: 5, price: 100, name: "Only" }];
    const result = findMostExpensiveBag(carrots, 15);

    expect(result.maxPrice).toBe(300); // 3 * 100 each
    expect(result.selectedCarrots[0].count).toBe(3);
  });
});
