import { all, allIndicesOf, any, hasOverlap, isSubArray, zip } from './arrays';

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
  ]));
