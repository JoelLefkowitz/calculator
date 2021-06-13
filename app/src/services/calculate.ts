import { hasUnrepeatedKeyClash, isRepeatableKey } from '../structural/keys';

import { isSubArray } from '../utils/arrays';

export function findErrors(keys: string[]): string | null {
  

  if (!isRepeatableKey(keys[0])) {
    return 'Input starts with an operator.';
  }

  if (hasUnrepeatedKeyClash(keys)) {
    return 'Input has operators in a row.';
  }

  if (!isRepeatableKey(keys[keys.length - 1])) {
    return 'Input ends in an operator.';
  }

  if (isSubArray(keys, ['√', '-'])) {
    return 'Input has a negative root.';
  }

  return null;
}

export function parseSum(keys: string[]): string {
  return keys.join("");
}
