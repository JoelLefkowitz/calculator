import { parametrize } from '../tests/runners';
import { parseCalculation } from './calculate';

xdescribe('parseCalculation', () =>
  parametrize(parseCalculation, [
    { inputs: [['1', '+', '2']], expected: 3 },
    { inputs: [['1', '+', '2']], expected: 3 },
    { inputs: [['1', '-', '2']], expected: -1 },
    { inputs: [['1', '+', '2', '+', '3']], expected: 6 },
    { inputs: [['1', '+', '-', '2']], expected: -1 },
    { inputs: [['1', '+', '.', '5']], expected: 1.5 },
    { inputs: [['.', '5', '+', '1']], expected: 1.5 },
    { inputs: [['1', 'x', '2']], expected: 2 },
    { inputs: [['1', 'x', '2', '+', '3']], expected: 5 },
    { inputs: [['1', 'x', '-', '2']], expected: -2 },
    { inputs: [['1', 'x', '+', '2']], expected: 2 },
    { inputs: [['1', 'x', '.', '5']], expected: 0.5 },
    { inputs: [['1', '+', '√', '4']], expected: 3 },
    { inputs: [['1', 'x', '√', '4']], expected: 2 },
    { inputs: [['1', 'pow', '2']], expected: 1 },
    { inputs: [['1', 'pow', '0', '.', '5']], expected: 1 },
    { inputs: [['4', 'pow', '0', '.', '5']], expected: 2 },
    { inputs: [['2', 'pow', '-', '1']], expected: 0.5 },
    { inputs: [['1', 'mod', '2']], expected: 1 },
    { inputs: [['2', 'mod', '2']], expected: 0 },
    { inputs: [['3', 'mod', '2']], expected: 1 },
  ]));
