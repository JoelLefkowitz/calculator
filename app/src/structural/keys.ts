import { digits } from '../utils/strings';

export const unaryOperators = ['+', '-', '√'];
export const binaryOperators = ['pow', 'mod', 'x', '÷'];
export const specialOperators = ['.']
export const actions = ['C', '='];

export const operators = [].concat(unaryOperators, binaryOperators, specialOperators);
export const keys = [].concat(digits, operators, actions);
