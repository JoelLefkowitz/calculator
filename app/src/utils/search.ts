import { hasOverlap } from "./sets";

export const findFirst = (searches: any[], arr: any[]) =>
  hasOverlap(searches, arr)
    ? Math.min(
        ...searches.map((search) => arr.indexOf(search)).filter((x) => x != -1)
      )
    : -1;

export const allIndicesOf = (arr: any[], x: any): number[] =>
  arr.map((e, i) => (e === x ? i : "")).filter(String) as number[];
