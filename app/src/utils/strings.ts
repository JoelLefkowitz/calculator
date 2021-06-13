export const digits = Array.from({ length: 10 }, (_, k) => k);

export const isDigitChar = (x: string): boolean =>
  typeof x === "string" && x.length === 1 && digits.includes(parseInt(x, 10));
