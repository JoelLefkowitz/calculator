import { all, any, applySign, joinSigns } from "./boolean";

import { parametrize } from "../tests/runners";

describe("joinSigns", () =>
  parametrize(joinSigns, [
    { inputs: ["+", "+"], expected: "+" },
    { inputs: ["+", "-"], expected: "-" },
    { inputs: ["-", "+"], expected: "-" },
    { inputs: ["-", "-"], expected: "+" },
  ]));

describe("applySign", () =>
  parametrize(applySign, [
    { inputs: ["+", 1], expected: 1 },
    { inputs: ["-", 1], expected: -1 },
  ]));

describe("any", () =>
  parametrize(any, [
    {
      inputs: [[]],
      expected: true,
    },
    {
      inputs: [[true]],
      expected: true,
    },
    {
      inputs: [[false]],
      expected: false,
    },
    {
      inputs: [[true, false]],
      expected: true,
    },
    {
      inputs: [[1, 2], (x: any) => x == 1],
      expected: true,
    },
  ]));

describe("all", () =>
  parametrize(all, [
    {
      inputs: [[]],
      expected: true,
    },
    {
      inputs: [[true]],
      expected: true,
    },
    {
      inputs: [[false]],
      expected: false,
    },
    {
      inputs: [[true, false]],
      expected: false,
    },
    {
      inputs: [[1, 2], (x: any) => x == 1],
      expected: false,
    },
  ]));
