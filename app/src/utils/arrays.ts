export const zip = (x: any[], y: any[]): [any, any][] =>
  Array.from(Array(Math.max(y.length, x.length)), (_, i) => [x[i], y[i]]);

export const isSubArray = (x: any[], y: any[]): boolean =>
  x.join(',').includes(y.join(','));
