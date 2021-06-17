import { fillToLength, filterAfter, foldSteps, replaceSection } from "./arrays";

import { parametrize } from "../tests/runners";

describe("filterAfter", () =>
  parametrize(
    filterAfter,
    [
      {
        inputs: [[1, 2, 3], () => true],
        expected: [1, 2, 3],
      },
      {
        inputs: [[1, 2, 3], (x: number) => x == 1],
        expected: [1],
      },
      {
        inputs: [[1, 2, 3], (x: number, i: number) => x == 1 || i == 1],
        expected: [1, 2],
      },
      {
        inputs: [
          [1, 2, 3, 4],
          (x: number, i: number, arr: number[]) => arr[i + 1] - x == 1,
        ],
        expected: [1, 2, 3],
      },
    ],
    { deep: true }
  ));

describe("fillToLength", () =>
  parametrize(
    fillToLength,
    [
      {
        inputs: [[1, 2, 3], 5, 0],
        expected: [1, 2, 3, 0, 0],
      },
      {
        inputs: [[1, 2, 3], 3, 0],
        expected: [1, 2, 3],
      },
      {
        inputs: [[1, 2, 3], 5, 0, true],
        expected: [0, 0, 1, 2, 3],
      },
    ],
    { deep: true }
  ));

describe("replaceSection", () =>
  parametrize(
    replaceSection,
    [
      {
        inputs: [[1, 2, 3], 1, 2, [1, 2, 3]],
        expected: [1, 1, 2, 3, 3],
      },
    ],
    { deep: true }
  ));

describe("foldSteps", () =>
  parametrize(
    foldSteps,
    [
      {
        inputs: [
          [1, 2, 3, 4],
          2,
          (i: number, j: number) => i + j == 5,
          (i: number, j: number) => [0, 0, 0],
        ],
        expected: [1, 0, 0, 0, 3, 4],
      },
    ],
    { deep: true }
  ));
