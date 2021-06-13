import { isDigitChar } from "./strings";
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
