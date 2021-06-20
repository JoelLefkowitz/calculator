import { joinDigits } from "./numbers";
import { parametrize } from "../tests/runners";

describe("joinDigits", () =>
  parametrize(joinDigits, [
    { inputs: [1, 2], expected: 12 },
    { inputs: [0, 1], expected: 1 },
  ]));
