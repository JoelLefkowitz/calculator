import { pairs, range, steps, zip } from "./iterators";

import { parametrize } from "../tests/runners";

describe("range", () =>
  parametrize(
    range,
    [
      { inputs: [0, 0], expected: [] },
      { inputs: [1, 1], expected: [] },
      { inputs: [0, 1], expected: [0] },
      { inputs: [0, 2], expected: [0, 1] },
      { inputs: [1, 2], expected: [1] },
      { inputs: [1, 3], expected: [1, 2] },
      { inputs: [1, 4], expected: [1, 2, 3] },
    ],
    { deep: true }
  ));

describe("pairs", () =>
  parametrize(
    pairs,
    [
      {
        inputs: [[0, 1, 2, 3]],
        expected: [
          [0, 1],
          [2, 3],
        ],
      },
      { inputs: [[0, 1, 2]], expected: [[0, 1]] },
      { inputs: [[]], expected: [] },
    ],
    { deep: true }
  ));

describe("zip", () =>
  parametrize(
    zip,
    [
      {
        inputs: [
          [1, 2, 3],
          [1, 2, 3],
        ],
        expected: [
          [1, 1],
          [2, 2],
          [3, 3],
        ],
      },
      {
        inputs: [
          [1, 2, 3],
          [1, 2],
        ],
        expected: [
          [1, 1],
          [2, 2],
        ],
      },
      {
        inputs: [
          [1, 2, 3],
          [1, 2, 3],
          [1, 2, 3],
        ],
        expected: [
          [1, 1, 1],
          [2, 2, 2],
          [3, 3, 3],
        ],
      },
    ],
    { deep: true }
  ));

describe("steps", () =>
  parametrize(
    steps,
    [
      { inputs: [[], 2], expected: [] },
      { inputs: [[0, 1], 2], expected: [[0, 1]] },
      ,
      {
        inputs: [[0, 1, 2], 2],
        expected: [
          [0, 1],
          [1, 2],
        ],
      },
      {
        inputs: [[0, 1, 2, 3], 2],
        expected: [
          [0, 1],
          [1, 2],
          [2, 3],
        ],
      },
      { inputs: [[], 3], expected: [] },
      { inputs: [[0, 1], 3], expected: [] },
      { inputs: [[0, 1, 2], 3], expected: [[0, 1, 2]] },
      {
        inputs: [[0, 1, 2, 3, 4, 5], 3],
        expected: [
          [0, 1, 2],
          [1, 2, 3],
          [2, 3, 4],
          [3, 4, 5],
        ],
      },
      {
        inputs: [[0, 1, 2, 3], 3, true],
        expected: [
          [0, 1, 2],
          [1, 2, 3],
          [2, 3, undefined],
          [3, undefined, undefined],
        ],
      },
    ],
    { deep: true }
  ));
