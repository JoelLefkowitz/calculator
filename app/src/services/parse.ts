// TODO Break up parsing functions

import { all, any, applySign, joinSigns } from '../utils/boolean';
import {
  fillToLength,
  filterAfter,
  foldSteps,
  replaceSection,
} from '../utils/arrays';
import { isDigitChar, isNumberString } from '../utils/strings';

import { allIndicesOf } from '../utils/search';
import { compose } from '../utils/functions';
import { operators } from '../structural/keys';
import { pairs } from '../utils/iterators';

// '1', '2', '3' -> '123'
// '1', '.', '2' -> '1.2'
export const joinDigits = (arr: (number | string)[]): (number | string)[] => {
  const indices = allIndicesOf(
    arr.map((i: string) => isDigitChar(i) || i == '.'),
    true
  );

  // Picking off the ends the indices ranges lets us fill the section between them.
  // [0, 1, 2] -> [0, 2]
  const sections = filterAfter(
    indices,
    (x, i) =>
      !any([
        x == indices[i - 1] + 1 && x == indices[i + 1] - 1,
        x != indices[i - 1] + 1 && x != indices[i + 1] - 1,
      ])
  );

  // arr: [1, 2, 3, +], sections: [0, 2] -> keys: [123, '', '', +]
  // Leave blank spaces to be filtered out after, this keeps the indices aligned.
  for (let [lo, hi] of pairs(sections)) {
    const joined = arr.slice(lo, hi + 1).join('');
    const replacement = fillToLength(
      [joined[0] == '.' ? '0'.concat(joined) : joined],
      hi - lo + 1,
      ''
    );
    arr = replaceSection(arr, lo, hi + 1, replacement);
  }
  return arr.filter((x) => x != '') as (number | string)[];
};

// '1', '+', '2' -> 1, '+', 2
export const parseNumbers = (arr: (number | string)[]): (number | string)[] =>
  arr.map((x) => (isNumberString(x as string) ? parseInt(x as string, 10) : x));

// 1, '+', '-', 2 -> 1, '-', 2
export const combineSigns = (arr: (number | string)[]): (number | string)[] =>
  foldSteps(
    arr,
    2,
    (i, j) => ['+', '-'].includes(i) && ['+', '-'].includes(j),
    (i, j) => [joinSigns(i, j)]
  );

// '-', 2 ... -> -2 ...
export const applyLeadingSigns = (
  arr: (number | string)[]
): (number | string)[] =>
  ['+', '-'].includes(arr[0] as string) && typeof arr[1] == 'number'
    ? [arr[0] == '-' ? -arr[1] : (arr[1] as number | string)].concat(
        arr.slice(2)
      )
    : arr;

// 1, 'x', '+', 2 -> 1, 'x', 2
export const removeSuperfluousSigns = (
  arr: (number | string)[]
): (number | string)[] =>
  foldSteps(
    arr,
    3,
    (i, j, k) =>
      all([
        operators.includes(i),
        ['+', '-'].includes(j),
        typeof k == 'number',
      ]),
    (i, j, k) => [i, applySign(j, k)]
  );

// 2, '√', 5 -> 2, 'x', '√', 5
export const insertImplicitProducts = (
  arr: (number | string)[]
): (number | string)[] =>
  foldSteps(
    arr,
    3,
    (i, j, k) => all([typeof i == 'number', j == '√', typeof k == 'number']),
    (i, j, k) => [i, 'x', j, k]
  );

export const parseCalculation = compose([
  joinDigits,
  parseNumbers,
  combineSigns,
  applyLeadingSigns,
  removeSuperfluousSigns,
  insertImplicitProducts,
]);
