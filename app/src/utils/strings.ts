import { all } from './arrays';

export type Sign = '+' | '-';

export const digits = Array.from({ length: 10 }, (_, k) => k);

export const isDigitChar = (x: string): boolean =>
  typeof x === 'string' && x.length === 1 && digits.includes(parseInt(x, 10));

export const isDigitsString = (x: string): boolean =>
  typeof x === 'string' &&
  all(x.split('').map((i) => digits.includes(parseInt(i, 10))));

export const joinSigns = (x: Sign, y: Sign): Sign => (x != y ? '-' : '+');

export const applySign = (sign: Sign, value: number): number =>
  sign == '-' ? -value : value;
