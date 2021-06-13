import { isDigitChar } from '../utils/strings';
import { zip } from '../utils/arrays';

export const digits = Array.from({ length: 10 }, (_, k) => k);
export const stereo = ['.', 'pow', 'mod', 'x', '÷', 'C', '='];
export const mono = ['+', '-', '√'];
export const keys = [].concat(digits, stereo, mono);

export const isRepeatableKey = (key: string): boolean =>
  isDigitChar(key) || ['+', '-', '√'].includes(key);

export const hasUnrepeatedKeyClash = (keys: string[]): boolean =>
  zip(keys.slice(1), keys.slice(0, -1)).reduce(
    (arr, i) => arr || (!isRepeatableKey(i[0]) && !isRepeatableKey(i[1])),
    false
  );
