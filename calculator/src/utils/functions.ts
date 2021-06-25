export type lambda = (x: any) => any;

export const compose =
  (arr: lambda[]): lambda =>
  (x) =>
    arr.reduce((acc, f) => f(acc), x);
