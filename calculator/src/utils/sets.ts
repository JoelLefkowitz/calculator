import { any } from "./boolean";

export const isSubArray = (x: any[], y: any[]): boolean =>
  x.join(",").includes(y.join(","));

export const hasOverlap = (x: any[], y: any[]): boolean =>
  x.length > 0 && any(x, (i) => y.includes(i));
