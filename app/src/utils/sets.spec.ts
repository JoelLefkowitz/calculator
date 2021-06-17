import { hasOverlap, isSubArray } from "./sets";

import { parametrize } from "../tests/runners";

describe("isSubArray", () =>
  parametrize(isSubArray, [
    {
      inputs: [
        [1, 2, 3],
        [1, 2],
      ],
      expected: true,
    },
    {
      inputs: [
        [1, 2, 3],
        [1, 2, 3],
      ],
      expected: true,
    },
    {
      inputs: [[1, 2, 3], []],
      expected: true,
    },
    {
      inputs: [[], []],
      expected: true,
    },
    {
      inputs: [
        [1, 2, 3],
        [2, 3, 4],
      ],
      expected: false,
    },
  ]));

describe("hasOverlap", () =>
  parametrize(hasOverlap, [
    {
      inputs: [
        [1, 2],
        [2, 3],
      ],
      expected: true,
    },
    {
      inputs: [
        [1, 2],
        [3, 4],
      ],
      expected: false,
    },
    {
      inputs: [[1, 2], []],
      expected: false,
    },
    {
      inputs: [[], [1, 2]],
      expected: false,
    },
  ]));
