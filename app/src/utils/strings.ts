import { all } from "./boolean";
import { allIndicesOf } from "./search";

export const digits = Array.from({ length: 10 }, (_, k) => k);

export const isDigitChar = (x: string): boolean =>
  typeof x === "string" && x.length === 1 && digits.includes(parseInt(x, 10));

export const isNumberString = (x: string): boolean =>
  typeof x === "string" &&
  all([
    all(x.split("").map((i) => i == "." || digits.includes(parseInt(i, 10)))),
    allIndicesOf(x.split(""), ".").length <= 1,
  ]);
