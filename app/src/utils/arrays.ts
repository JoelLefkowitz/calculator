import { steps } from "./iterators";

export const filterAfter = (
  arr: any[],
  f: (x: any, i?: number, arr?: any[]) => boolean
): any[] => {
  return arr.filter((_: any, i: number) => arr.map(f)[i]);
};

export const replaceSection = (
  x: any[],
  lo: number,
  hi: number,
  y: any[]
): any[] => x.slice(0, lo).concat(y, x.slice(hi));

export function fillToLength(
  x: any[],
  n: number,
  y: any,
  padStart: boolean = false
): any[] {
  const padding = new Array(Math.max(0, n - x.length)).fill(y);
  return padStart ? padding.concat(x) : x.concat(padding);
}

export const foldSteps = (
  arr: any[],
  n: number,
  condition: (...x: any) => boolean,
  replacement: (...x: any) => any
) =>
  steps(arr, n)
    .reduce(
      (acc, x: any[], i) =>
        condition(...x) ? acc.concat(replacement(...x)) : acc.concat(arr[i]),
      []
    )
    .concat(arr.slice(arr.length - n + 1));
