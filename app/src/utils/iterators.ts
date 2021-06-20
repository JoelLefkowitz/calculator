import { fillToLength } from "./arrays";

export const range = (lo: number, hi: number): number[] =>
  new Array(hi - lo).fill(0).map((_, i) => lo + i);

export const pairs = (x: any[]): [any, any][] =>
  range(0, Math.floor(x.length / 2)).map((i) => [x[2 * i], x[2 * i + 1]]);

export const zip = (...args: any[][]): any[][] =>
  range(0, Math.min(...args.map((arr) => arr.length))).map((i) =>
    args.map((arr) => arr[i])
  );

export const steps = (
  x: any[],
  n: number,
  overflow: boolean = false
): any[][] =>
  zip(
    ...[x].concat(
      range(1, n).map((i) =>
        overflow ? fillToLength(x.slice(i), x.length, undefined) : x.slice(i)
      )
    )
  );
