import {
  applyBinaryOperand,
  applyUnaryOperand,
  evaluateOperators,
} from "./calculate";

import { expect } from "chai";
import { parametrize } from "../tests/runners";

describe("applyUnaryOperand", () =>
  parametrize(
    applyUnaryOperand,
    [
      {
        inputs: [["√", 4], 0, (i: number) => Math.pow(i, 0.5)],
        expected: [2],
      },
    ],
    { deep: true }
  ));

describe("applyBinaryOperand", () =>
  parametrize(
    applyBinaryOperand,
    [
      {
        inputs: [[1, "+", 2], 1, (i: number, j: number) => i + j],
        expected: [3],
      },
    ],
    { deep: true }
  ));

describe("evaluateOperators", () => {
  parametrize(
    evaluateOperators,
    [
      { inputs: [[]], expected: 0 },
      { inputs: [[1]], expected: 1 },
      { inputs: [[0.5]], expected: 0.5 },
      { inputs: [[1, "+", 1]], expected: 2 },
      { inputs: [[1, "+", 2, "-", 3]], expected: 0 },
      { inputs: [[1, "+", 2, "x", 3]], expected: 7 },
      { inputs: [[1, "+", 2, "x", 3, "-", 4]], expected: 3 },
      { inputs: [["√", 4]], expected: 2 },
      { inputs: [[1, "+", "√", 4]], expected: 3 },
      { inputs: [[5, "x", "√", 4]], expected: 10 },
      { inputs: [[1, "pow", 2]], expected: 1 },
      { inputs: [[1, "pow", 0.5]], expected: 1 },
      { inputs: [[4, "pow", 0.5]], expected: 2 },
      { inputs: [[2, "pow", -1]], expected: 0.5 },
      { inputs: [[1, "mod", 2]], expected: 1 },
      { inputs: [[2, "mod", 2]], expected: 0 },
      { inputs: [[3, "mod", 2]], expected: 1 },
      { inputs: [[3, "mod", -2]], expected: 1 },
    ],
    { deep: true }
  );

  it("throws an error on division by zero ", () => {
    expect(() => evaluateOperators([1, "÷", 0])).to.throw(
      "Encountered division by zero."
    );
  });

  it("throws an error on a negative root", () => {
    expect(() => evaluateOperators(["√", -1])).to.throw(
      "Encountered a negative root."
    );
  });

  it("throws an error at more than 10 steps", () => {
    expect(() =>
      evaluateOperators(
        new Array(20)
          .fill([1, "+"])
          .reduce((acc, x) => acc.concat(x), [])
          .concat(1)
      )
    ).to.throw("Failed to evaluate in 10 steps or less.");
  });

  it("throws an error on invalid characters", () => {
    expect(() => evaluateOperators(["A", "+", 1])).to.throw(
      "Failed to parse invalid input."
    );
  });
});
