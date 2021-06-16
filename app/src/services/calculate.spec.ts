import {
  evaluateOperators,
  foldDigits,
  replaceBinaryOperand,
  replaceUnaryOperand,
} from './calculate';

// import { expect } from 'chai';
import { parametrize } from '../tests/runners';

describe('foldDigits', () =>
  parametrize(
    foldDigits,
    [
      { inputs: [['1']], expected: ['1'] },
      { inputs: [['1', '2']], expected: ['12'] },
      { inputs: [['1', '2', '+', '1', '2']], expected: ['12', '+', '12'] },
      {
        inputs: [['1', '2', '3', '+', '1', '2', '3', '+', '1', '2', '3']],
        expected: ['123', '+', '123', '+', '123'],
      },
      { inputs: [['1', '2', '.', '1', '2']], expected: ['12.12'] },
      { inputs: [['.', '1']], expected: ['0.1'] },
      { inputs: [['.', '1', '+', '.', '1']], expected: ['0.1', '+', '0.1'] },
    ],
    { deep: true }
  ));

describe('replaceUnaryOperand', () =>
  parametrize(
    replaceUnaryOperand,
    [
      {
        inputs: [['√', 4], 0, (i: number) => Math.pow(i, 0.5)],
        expected: [2],
      },
    ],
    { deep: true }
  ));

describe('replaceBinaryOperand', () =>
  parametrize(
    replaceBinaryOperand,
    [
      {
        inputs: [[1, '+', 2], 1, (i: number, j: number) => i + j],
        expected: [3],
      },
    ],
    { deep: true }
  ));

describe('evaluateOperators', () => {
  parametrize(evaluateOperators, [
    { inputs: [[]], expected: 0 },
    { inputs: [['1']], expected: 1 },
    { inputs: [['1', '+', '2']], expected: 3 },
    { inputs: [['1', '-', '2']], expected: -1 },
    { inputs: [['1', '+', '2', '+', '3']], expected: 6 },
    { inputs: [['1', '+', '-', '2']], expected: -1 },
    { inputs: [['1', 'x', '2']], expected: 2 },
    { inputs: [['1', 'x', '-', '2']], expected: -2 },
    { inputs: [['1', 'x', '2', '+', '3', 'x', '4']], expected: 14 },
    { inputs: [['1', 'x', '2', '-', '3', 'x', '4']], expected: -10 },
    { inputs: [['1', 'x', '+', '2']], expected: 2 },
    { inputs: [['√', '4']], expected: 2 },
    { inputs: [['1', '+', '√', '4']], expected: 3 },
    { inputs: [['1', 'x', '√', '4']], expected: 2 },
    { inputs: [['1', 'pow', '2']], expected: 1 },
    { inputs: [['1', 'pow', '0.5']], expected: 1 },
    { inputs: [['4', 'pow', '0.5']], expected: 2 },
    { inputs: [['2', 'pow', '-', '1']], expected: 0.5 },
    { inputs: [['1', 'mod', '2']], expected: 1 },
    { inputs: [['2', 'mod', '2']], expected: 0 },
    { inputs: [['3', 'mod', '2']], expected: 1 },
  ]);

  // it('throws an error on division by zero ', () => {
  //   expect(() => evaluateOperators(['1', '÷', '0'])).to.throw(
  //     "Encountered division by zero in '1 ÷ 0'."
  //   );
  // });

  // it('throws an error on a negative root', () => {
  //   expect(() => evaluateOperators(['√', '-', '1'])).to.throw(
  //     "Encountered a negative root in '√ - 1'."
  //   );
  // });

  // it('throws an error on invalid periods', () => {
  //   expect(() => evaluateOperators(['1..0', '+', '1'])).to.throw(
  //     "Failed to evaluate '1..0 + 1'."
  //   );
  // });

  // it('throws an error on invalid characters', () => {
  //   expect(() => evaluateOperators(['A', '+', '1'])).to.throw(
  //     "Failed to evaluate 'A + 1'."
  //   );
  // });
});
