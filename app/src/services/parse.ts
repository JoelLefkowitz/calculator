// TODO Break up parsing functions

import { all, any, applySign, joinSigns } from "../utils/boolean";
import {
  fillToLength,
  filterAfter,
  foldSteps,
  replaceSection,
} from "../utils/arrays";
import { isDigitChar, isNumberString } from "../utils/strings";

import { allIndicesOf } from "../utils/search";
import { operators } from "../structural/keys";
import { pairs } from "../utils/iterators";

export function parseCalculation(keys: string[]): (number | string)[] {
  // We want to join integers and periods.
  // [1, 2, 3, +] -> [0, 1, 2]
  const indices = allIndicesOf(
    keys.map((i: string) => isDigitChar(i) || i == "."),
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
    const joined = keys.slice(lo, hi + 1).join("");
    const replacement = fillToLength(
      [joined[0] == "." ? "0".concat(joined) : joined],
      hi - lo + 1,
      ""
    );

    keys = replaceSection(keys, lo, hi + 1, replacement);
  }

  let arr = keys.filter((x) => x != "") as (number | string)[];

  arr = foldSteps(
    arr,
    2,
    (i, j) => ["+", "-"].includes(i) && ["+", "-"].includes(j),
    (i, j) => [joinSigns(i, j)]
  );

  // '1' '+' '2' -> 1 '+' 2
  arr = arr.map((x) =>
    isNumberString(x as string) ? parseInt(x as string, 10) : x
  );

  // ['+' 2 ...] -> [2 ...]
  // ['-' 2 ...] -> [-2 ...]
  if (["+", "-"].includes(arr[0] as string) && typeof arr[1] == "number") {
    const shiftedSign = arr.shift();

    if (shiftedSign == "-") {
      (arr[0] as number) *= -1;
    }
  }

  // 1 x + 2 -> 1 x 2
  // 1 x - 2 -> 1 x -2
  arr = foldSteps(
    arr,
    3,
    (i, j, k) =>
      all([
        operators.includes(i),
        ["+", "-"].includes(j),
        typeof k == "number",
      ]),
    (i, j, k) => [i, applySign(j, k)]
  );

  // 2 √ 5 -> 2 x √ 5
  return foldSteps(
    arr,
    3,
    (i, j, k) => all([typeof i == "number", j == "√", typeof k == "number"]),
    (i, j, k) => [i, "x", j, k]
  );
}
