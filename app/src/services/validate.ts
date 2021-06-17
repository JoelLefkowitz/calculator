import { all, any } from "../utils/boolean";
import { binaryOperators, operators } from "../structural/keys";
import { hasOverlap, isSubArray } from "../utils/sets";
import { steps, zip } from "../utils/iterators";

import { allIndicesOf } from "../utils/search";

export function validateCalculation(keys: string[]): string | null {
  if (binaryOperators.includes(keys[0])) {
    return "Starts with a binary operator.";
  }

  if (hasInvalidPeriods(keys)) {
    return "Input has invalid periods.";
  }

  if (hasOperatorClashes(keys)) {
    return "Input has clashing operators.";
  }

  if (isSubArray(keys, ["√", "-"])) {
    return "Input has a negative root.";
  }

  if (operators.includes(keys[keys.length - 1])) {
    return "Ends with an operator.";
  }

  return null;
}

export const hasOperatorClashes = (keys: string[]): boolean =>
  keys.length > 1 &&
  any(
    steps(keys, 2),
    ([i, next]) =>
      (operators.includes(i) && binaryOperators.includes(next)) ||
      (i == "." && operators.includes(next))
  );

export function hasInvalidPeriods(keys: string[]): boolean {
  const periods = allIndicesOf(keys, ".");
  const periodRanges = zip(periods.slice(0, -1), periods.slice(1));
  return any([
    keys[keys.length - 1] == ".",
    periodRanges.length > 0 && any(periodRanges, ([x, y]) => y == x + 1),
    !all(
      periodRanges.map(([x, y]) => hasOverlap(keys.slice(x + 1, y), operators))
    ),
  ]);
}
