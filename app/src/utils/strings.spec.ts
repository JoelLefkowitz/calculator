import {applySign, isDigitChar, isDigitsString, joinSigns} from "./strings";

import { parametrize } from "../tests/runners";

describe("isDigitChar", () =>
  parametrize(isDigitChar, [
    { inputs: ["1"], expected: true },
    { inputs: ["12"], expected: false },
    { inputs: ["x"], expected: false },
    { inputs: [1], expected: false },
    { inputs: ["-1"], expected: false },
    { inputs: ["+1"], expected: false },
  ]));

describe("isDigitsString", () =>
  parametrize(isDigitsString, [
    { inputs: ["1"], expected: true },
    { inputs: ["12"], expected: true },
    { inputs: ["x"], expected: false },
    { inputs: [123], expected: false },
    { inputs: ["-123"], expected: false },
    { inputs: ["+123"], expected: false },
  ]));

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
  