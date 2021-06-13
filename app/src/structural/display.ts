import { getElementById } from '../utils/dom';
import { parseCalculation } from '../services/calculate';
import { validateCalculation } from '../services/validate';

export function sendKey(key: string) {
  const screen = getElementById('screen');
  const output = getElementById('output');

  output.innerHTML = '';

  if (key == '=') {
    const keys = screen.innerHTML.trimEnd().split(' ');
    const error = validateCalculation(keys);
    output.innerHTML = error ? error : parseCalculation(keys).toString();
  }

  screen.innerHTML = ['=', 'C'].includes(key)
    ? ''
    : screen.innerHTML.concat(key, ' ');
}
