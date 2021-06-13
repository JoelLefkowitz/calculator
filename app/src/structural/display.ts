import { findErrors, parseSum } from '../services/calculate';

import { getElementById } from '../utils/dom';

export function sendKey(key: string) {
  const screen = getElementById('screen');
  const output = getElementById('output');

  output.innerHTML = '';

  if (key == '=') {
    const keys = screen.innerHTML.trimEnd().split(' ');
    const error = findErrors(keys);
    output.innerHTML = error ? error : parseSum(keys);
  }

  screen.innerHTML = ['=', 'C'].includes(key)
    ? ''
    : screen.innerHTML.concat(key, ' ');
}
