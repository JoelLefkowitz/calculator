import { all, applySign, joinSigns } from "../utils/boolean";
import { isDigitChar, isNumberString } from "../utils/strings";

import { compose } from "../utils/functions";
import { foldSteps } from "../utils/folds";
import { last } from "../utils/arrays";
import { operators } from "../structural/keys";

// '1', '2', '3' -> '123'
// '1', '.', '2' -> '1.2'
export const joinSequentialDigits = (
  arr: (number | string)[]
): (number | string)[] =>
  foldSteps(
    arr,
    1,
    ({ accumulated: acc, newSteps: [i] }) =>
      isNumberString(last(acc)) && (isDigitChar(i) || i == "."),
    ({ accumulated: acc, newSteps: [i] }) => {
      const popped = acc.pop();
      return popped == "." ? "0.".concat(i) : popped.concat(i);
    }
  );

// '1', '+', '2' -> 1, '+', 2
export const parseNumbers = (arr: (number | string)[]): (number | string)[] =>
  arr.map((x) => (isNumberString(x as string) ? parseFloat(x as string) : x));

// 1, '+', '-', 2 -> 1, '-', 2
export const combineSigns = (arr: (number | string)[]): (number | string)[] =>
  foldSteps(
    arr,
    1,
    ({ accumulated: acc, newSteps: [i] }) =>
      ["+", "-"].includes(last(acc)) && ["+", "-"].includes(i),
    ({ accumulated: acc, newSteps: [i] }) => joinSigns(acc.pop(), i)
  );

// '-', 2 ... -> -2 ...
export const applyLeadingSigns = (
  arr: (number | string)[]
): (number | string)[] =>
  ["+", "-"].includes(arr[0] as string) && typeof arr[1] == "number"
    ? [arr[0] == "-" ? -arr[1] : (arr[1] as number | string)].concat(
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
    ({ accumulated: _, newSteps: [i, j, k] }) =>
      all([
        operators.includes(i),
        ["+", "-"].includes(j),
        typeof k == "number",
      ]),
    ({ accumulated: _, newSteps: [i, j, k] }) => [i, applySign(j, k)],
    () => 2
  );

// 2, '√', 5 -> 2, 'x', '√', 5
export const insertImplicitProducts = (
  arr: (number | string)[]
): (number | string)[] =>
  foldSteps(
    arr,
    3,
    ({ accumulated: _, newSteps: [i, j, k] }) =>
      all([typeof i == "number", j == "√", typeof k == "number"]),
    ({ accumulated: _, newSteps: [i, j, k] }) => [i, "x", j, k],
    () => 2
  );

export const parseCalculation = compose([
  joinSequentialDigits,
  parseNumbers,
  combineSigns,
  applyLeadingSigns,
  removeSuperfluousSigns,
  insertImplicitProducts,
]);
