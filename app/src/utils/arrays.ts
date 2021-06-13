export const any = (arr: any[], f: (x: any) => boolean = (x) => x): boolean =>
  arr.length == 0 || arr.reduce((acc, x) => acc || f(x), false);

export const all = (arr: any[], f: (x: any) => boolean = (x) => x): boolean =>
  arr.reduce((acc, x) => acc && f(x), true);

export const zip = (x: any[], y: any[]): [any, any][] =>
  new Array(Math.min(y.length, x.length)).fill(0).map((_, i) => [x[i], y[i]]);

export const isSubArray = (x: any[], y: any[]): boolean =>
  x.join(',').includes(y.join(','));

export const allIndicesOf = (arr: any[], x: any): number[] =>
  arr.map((e, i) => (e === x ? i : '')).filter(String) as number[];

export const hasOverlap = (x: any[], y: any[]): boolean =>
  any(x, (i) => y.includes(i));
