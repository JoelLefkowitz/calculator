export type Sign = "+" | "-";

export const joinSigns = (x: Sign, y: Sign): Sign => (x != y ? "-" : "+");

export const applySign = (sign: Sign, value: number): number =>
  sign == "-" ? -value : value;

export const any = (arr: any[], f: (x: any) => boolean = (x) => x): boolean =>
  arr.length == 0 || arr.reduce((acc, x) => acc || f(x), false);

export const all = (arr: any[], f: (x: any) => boolean = (x) => x): boolean =>
  arr.reduce((acc, x) => acc && f(x), true);
