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
  // TODO Add parametrized parsed inputs for evaluateOperators

  it("throws an error on division by zero ", () => {
    expect(() => evaluateOperators(["1", "÷", "0"])).to.throw(
      "Encountered division by zero in '1 ÷ 0'."
    );
  });

  it("throws an error on a negative root", () => {
    expect(() => evaluateOperators(["√", "-", "1"])).to.throw(
      "Encountered a negative root in '√ - 1'."
    );
  });

  it("throws an error on invalid periods", () => {
    expect(() => evaluateOperators(["1..0", "+", "1"])).to.throw(
      "Failed to parse '1..0 + 1'."
    );
  });

  it("throws an error on invalid characters", () => {
    expect(() => evaluateOperators(["A", "+", "1"])).to.throw(
      "Failed to parse 'A + 1'."
    );
  });
});
