import { Sign, applySign, isDigitChar, isDigitsString, joinSigns } from '../utils/strings';
import {
  all,
  allIndicesOf,
  any,
  fillToLength,
  filterAfter,
  findFirst,
  hasOverlap,
  pairs,
  replaceSection,
} from '../utils/arrays';

import { operators } from '../structural/keys';

export const foldDigits = (keys: string[]): string[] => {
  // We want to join integers and periods.
  // [1, 2, 3, +] -> [0, 1, 2]
  const indices = allIndicesOf(
    keys.map((i: string) => isDigitChar(i) || i == '.'),
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

  // keys: [1, 2, 3, +], sections: [0, 2] -> keys: [123, '', '', +]
  // Leave blank spaces to be filtered out after, this keeps the indices aligned.
  for (let [lo, hi] of pairs(sections)) {
    const joined = keys.slice(lo, hi + 1).join('');
    const replacement = fillToLength(
      [joined[0] == '.' ? '0'.concat(joined) : joined],
      hi - lo + 1,
      ''
    );

    keys = replaceSection(keys, lo, hi + 1, replacement);
  }

  return keys.filter((x) => x != '');
};

export const replaceUnaryOperand = (
  arr: (number | string)[],
  i: number,
  operand: (i: number) => number
) => replaceSection(arr, i, i + 2, [operand(arr[i + 1] as number)]);

export const replaceBinaryOperand = (
  arr: (number | string)[],
  i: number,
  operand: (i: number, j: number) => number
) =>
  replaceSection(arr, i - 1, i + 2, [
    operand(arr[i - 1] as number, arr[i + 1] as number),
  ]);

export function evaluateOperators(keys: string[]): number {
  // 1 + + 2 -> 1 + 2
  // 1 + - 2 -> 1 - 2
  keys = keys.reduce(
    (acc, x, i) =>
      ['+', '-'].includes(x) && ['+', '-'].includes(keys[i + 1])
        ? acc.concat(joinSigns(x as Sign, keys.splice(i + 1, 1).pop() as Sign))
        : acc.concat(x),
    []
  );

  // '1' '+' '2' -> 1 '+' 2
  let numbered = keys.map((x) => (isDigitsString(x) ? parseInt(x, 10) : x));

  // 1 x + 2 -> 1 x 2
  // 1 x - 2 -> 1 x -2
  numbered = numbered.reduce(
    (acc, x, i) =>
      all([
        operators.includes(numbered[i - 1]),
        ['+', '-'].includes(x as Sign),
        typeof numbered[i + 1] == 'number'
      ])
        ? acc.concat(applySign(x as Sign, numbered.splice(i + 1, 1).pop() as number))
        : acc.concat(x),
    []
  );

  if (keys.length == 0) {
    return 0;
  }

  while (hasOverlap(operators, numbered)) {
    const operator = ['√', 'pow', 'mod', 'x', '÷', '+', '-'].filter((x) =>
      numbered.includes(x)
    )[0];
    const index = numbered.indexOf(operator);

    console.log(numbered);

    switch (operator) {
      case '√': {
        numbered = replaceUnaryOperand(numbered, index, (i: number) =>
          Math.pow(i, 0.5)
        );
        break;
      }
      case 'pow': {
        numbered = replaceBinaryOperand(
          numbered,
          index,
          (i: number, j: number) => Math.pow(i, j)
        );
        break;
      }
      case 'mod': {
        numbered = replaceBinaryOperand(
          numbered,
          index,
          (i: number, j: number) => i % j
        );
        break;
      }
      case 'x': {
        numbered = replaceBinaryOperand(
          numbered,
          index,
          (i: number, j: number) => i * j
        );
        break;
      }
      case '÷': {
        numbered = replaceBinaryOperand(
          numbered,
          index,
          (i: number, j: number) => i / j
        );
        break;
      }
      case '+': {
        numbered = replaceBinaryOperand(
          numbered,
          index,
          (i: number, j: number) => i + j
        );
        break;
      }
      case '-': {
        numbered = replaceBinaryOperand(
          numbered,
          index,
          (i: number, j: number) => i - j
        );
        break;
      }
    }
  }

  return numbered[0] as number;
}
