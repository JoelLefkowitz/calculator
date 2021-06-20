import { hasOverlap } from "../utils/sets";
import { operators } from "../structural/keys";
import { replaceSection } from "../utils/arrays";

export const applyUnaryOperand = (
  arr: (number | string)[],
  i: number,
  operand: (i: number) => number
) => replaceSection(arr, i, i + 2, [operand(arr[i + 1] as number)]);

export const applyBinaryOperand = (
  arr: (number | string)[],
  i: number,
  operand: (i: number, j: number) => number
) =>
  replaceSection(arr, i - 1, i + 2, [
    operand(arr[i - 1] as number, arr[i + 1] as number),
  ]);

export function evaluateOperators(arr: (string | number)[]): number {
  let computations = 0;
  const precedence = ["√", "pow", "mod", "÷", "x", "-", "+"];

  while (hasOverlap(operators, arr)) {
    const operator = precedence.filter((x) => arr.includes(x))[0];
    const index = arr.indexOf(operator);

    switch (operator) {
      case "√": {
        arr = applyUnaryOperand(arr, index, (i: number) => Math.pow(i, 0.5));
        break;
      }
      case "pow": {
        arr = applyBinaryOperand(arr, index, Math.pow);
        break;
      }
      case "mod": {
        arr = applyBinaryOperand(arr, index, (i: number, j: number) => i % j);
        break;
      }
      case "x": {
        arr = applyBinaryOperand(arr, index, (i: number, j: number) => i * j);
        break;
      }
      case "÷": {
        arr = applyBinaryOperand(arr, index, (i: number, j: number) => i / j);
        break;
      }
      case "+": {
        arr = applyBinaryOperand(arr, index, (i: number, j: number) => i + j);
        break;
      }
      case "-": {
        arr = applyBinaryOperand(arr, index, (i: number, j: number) => i - j);
        break;
      }
    }

    computations += 1;

    if (computations > 10) {
      throw "Failed to evaluate in 10 steps or less.";
    }

    if (arr.includes(Infinity)) {
      throw "Encountered division by zero.";
    }

    if (arr.includes(NaN)) {
      throw "Encountered a negative root.";
    }
  }

  if (arr.length == 0) {
    return 0;
  }

  if (typeof arr[0] != "number") {
    throw "Failed to parse invalid input.";
  }

  return arr[0] as number;
}
