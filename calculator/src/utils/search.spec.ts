import { allIndicesOf, findFirst } from "./search";

import { parametrize } from "../tests/runners";

describe("allIndicesOf", () =>
  parametrize(
    allIndicesOf,
    [
      {
        inputs: [[1, 2, 1, 2], 1],
        expected: [0, 2],
      },
      {
        inputs: [[1, 2, 1, 2], 3],
        expected: [],
      },
    ],
    { deep: true }
  ));

describe("findFirst", () =>
  parametrize(findFirst, [
    {
      inputs: [
        [1, 2],
        [0, 2, 1],
      ],
      expected: 1,
    },
    {
      inputs: [[1, 2], []],
      expected: -1,
    },
    {
      inputs: [[], [1, 2]],
      expected: -1,
    },
  ]));
