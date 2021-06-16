import {
  all,
  allIndicesOf,
  any,
  fillToLength,
  filterAfter,
  findFirst,
  hasOverlap,
  isSubArray,
  pairs,
  range,
  replaceSection,
  steps,
  zip,
} from './arrays';

import { parametrize } from '../tests/runners';

describe('any', () =>
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

describe('all', () =>
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

describe('range', () =>
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

describe('pairs', () =>
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

describe('zip', () =>
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
    ],
    { deep: true }
  ));

describe('steps', () =>
  parametrize(
    steps,
    [
      {
        inputs: [[0, 1, 2, 3]],
        expected: [
          [0, 1],
          [1, 2],
          [2, 3],
        ],
      },
      { inputs: [[0, 1]], expected: [[0, 1]] },
      { inputs: [[]], expected: [] },
    ],
    { deep: true }
  ));

describe('isSubArray', () =>
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

describe('allIndicesOf', () =>
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

describe('hasOverlap', () =>
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

describe('filterAfter', () =>
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

describe('replaceSection', () =>
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

describe('fillToLength', () =>
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
    ],
    { deep: true }
  ));
  
describe('findFirst', () =>
  parametrize(
    findFirst,
    [
      {
        inputs: [[1, 2], [0, 2, 1]],
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
    ]
  ));
