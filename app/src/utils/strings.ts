export const isDigitChar = (x: string): boolean =>
  typeof x === 'string' && 0 < parseInt(x, 10) && parseInt(x, 10) < 10;
