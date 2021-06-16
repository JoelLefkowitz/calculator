export const any = (arr: any[], f: (x: any) => boolean = (x) => x): boolean =>
  arr.length == 0 || arr.reduce((acc, x) => acc || f(x), false);

export const all = (arr: any[], f: (x: any) => boolean = (x) => x): boolean =>
  arr.reduce((acc, x) => acc && f(x), true);

export const range = (lo: number, hi: number): number[] =>
  new Array(hi - lo).fill(0).map((_, i) => lo + i);

export const pairs = (x: any[]): [any, any][] =>
  range(0, Math.floor(x.length / 2)).map((i) => [x[2 * i], x[2 * i + 1]]);

export const zip = (x: any[], y: any[]): [any, any][] =>
  range(0, Math.min(y.length, x.length)).map((i) => [x[i], y[i]]);

export const steps = (x: any[]): [any, any][] =>
  zip(x.slice(0, -1), x.slice(1));

export const isSubArray = (x: any[], y: any[]): boolean =>
  x.join(',').includes(y.join(','));

export const allIndicesOf = (arr: any[], x: any): number[] =>
  arr.map((e, i) => (e === x ? i : '')).filter(String) as number[];

export const hasOverlap = (x: any[], y: any[]): boolean =>
  x.length > 0 && any(x, (i) => y.includes(i));

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

export const fillToLength = (x: any[], n: number, y: any): any[] =>
  x.concat(new Array(Math.max(0, n - x.length)).fill(y));

export const findFirst = (searches: any[], arr: any[]) =>
  hasOverlap(searches, arr)
    ? Math.min(
        ...searches.map((search) => arr.indexOf(search)).filter((x) => x != -1)
      )
    : -1;
