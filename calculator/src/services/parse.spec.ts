import {
  applyLeadingSigns,
  combineSigns,
  insertImplicitProducts,
  joinSequentialDigits,
  parseCalculation,
  parseNumbers,
  removeSuperfluousSigns,
} from "./parse";

import { parametrize } from "../tests/runners";

describe("joinSequentialDigits", () =>
  parametrize(
    joinSequentialDigits,
    [
      { inputs: [[]], expected: [] },
      { inputs: [["1"]], expected: ["1"] },
      { inputs: [["1", "2"]], expected: ["12"] },
      { inputs: [["1", "2", "+", "1", "2"]], expected: ["12", "+", "12"] },
      {
        inputs: [["1", "2", "3", "+", "1", "2", "3", "+", "1", "2", "3"]],
        expected: ["123", "+", "123", "+", "123"],
      },
      { inputs: [["1", "2", ".", "1", "2"]], expected: ["12.12"] },
      { inputs: [[".", "1"]], expected: ["0.1"] },
      { inputs: [[".", "1", "+", ".", "1"]], expected: ["0.1", "+", "0.1"] },
    ],
    {
      deep: true,
    }
  ));

describe("parseNumbers", () =>
  parametrize(
    parseNumbers,
    [
      { inputs: [["1"]], expected: [1] },
      { inputs: [["1", "+", "2"]], expected: [1, "+", 2] },
      { inputs: [["1", "+", "2", "-", "3"]], expected: [1, "+", 2, "-", 3] },
    ],
    { deep: true }
  ));

describe("combineSigns", () =>
  parametrize(
    combineSigns,
    [
      { inputs: [[1, "+", 2]], expected: [1, "+", 2] },
      { inputs: [[1, "+", "+", 2]], expected: [1, "+", 2] },
      { inputs: [[1, "+", "-", 2]], expected: [1, "-", 2] },
      { inputs: [[1, "+", "-", "+", 2]], expected: [1, "-", 2] },
    ],
    { deep: true }
  ));

describe("applyLeadingSigns", () =>
  parametrize(
    applyLeadingSigns,
    [
      { inputs: [[1]], expected: [1] },
      { inputs: [["+", 1]], expected: [1] },
      { inputs: [["-", 1]], expected: [-1] },
    ],
    { deep: true }
  ));

describe("removeSuperfluousSigns", () =>
  parametrize(
    removeSuperfluousSigns,
    [
      { inputs: [[1, "x", 2]], expected: [1, "x", 2] },
      { inputs: [[1, "x", "+", 2]], expected: [1, "x", 2] },
      { inputs: [[1, "x", "-", 2]], expected: [1, "x", -2] },
      { inputs: [[1, "pow", "-", 2]], expected: [1, "pow", -2] },
      { inputs: [[1, "mod", "-", 2]], expected: [1, "mod", -2] },
    ],
    { deep: true }
  ));

describe("insertImplicitProducts", () =>
  parametrize(
    insertImplicitProducts,
    [
      { inputs: [[2, "x", "√", 4]], expected: [2, "x", "√", 4] },
      { inputs: [[2, "√", 4]], expected: [2, "x", "√", 4] },
    ],
    { deep: true }
  ));

describe("parseCalculation", () =>
  parametrize(
    parseCalculation,
    [
      { inputs: [[]], expected: [] },
      { inputs: [["1"]], expected: [1] },
      { inputs: [["1", "+", "2"]], expected: [1, "+", 2] },
      {
        inputs: [["1", "+", "2", "+", "3"]],
        expected: [1, "+", 2, "+", 3],
      },
      { inputs: [["1", "+", "-", "2"]], expected: [1, "-", 2] },
      { inputs: [["1", "x", "-", "2"]], expected: [1, "x", -2] },
      { inputs: [["+", "1"]], expected: [1] },
      { inputs: [["-", "1"]], expected: [-1] },
      { inputs: [[".", "1"]], expected: [0.1] },
      { inputs: [["5", "+", "√", "4"]], expected: [5, "+", "√", 4] },
      { inputs: [["5", "x", "√", "4"]], expected: [5, "x", "√", 4] },
      { inputs: [["5", "√", "4"]], expected: [5, "x", "√", 4] },
      { inputs: [["1", "pow", "2"]], expected: [1, "pow", 2] },
      { inputs: [["2", "pow", "-", "1"]], expected: [2, "pow", -1] },
      { inputs: [["2", "mod", "1"]], expected: [2, "mod", 1] },
      { inputs: [["2", "mod", "-", "1"]], expected: [2, "mod", -1] },
    ],
    { deep: true }
  ));
