import { isDigitChar, isNumberString } from "./strings";

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

describe("isNumberString", () =>
  parametrize(isNumberString, [
    { inputs: ["1"], expected: true },
    { inputs: ["12"], expected: true },
    { inputs: ["x"], expected: false },
    { inputs: [123], expected: false },
    { inputs: ["-123"], expected: false },
    { inputs: ["+123"], expected: false },
    { inputs: ["0.5"], expected: true },
    { inputs: ["1.5"], expected: true },
  ]));
