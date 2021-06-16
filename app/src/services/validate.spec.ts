import {
  hasInvalidPeriods,
  hasOperatorClashes,
  validateCalculation,
} from './validate';

import { parametrize } from '../tests/runners';

describe('validateCalculation', () =>
  parametrize(validateCalculation, [
    { inputs: [['1']], expected: null },
    { inputs: [['1', '2']], expected: null },
    { inputs: [['1', '2', '3']], expected: null },
    { inputs: [['1', '+', '2', '+', '3']], expected: null },
    {
      inputs: [['x', '1', '2', '3']],
      expected: 'Starts with a binary operator.',
    },
    {
      inputs: [['pow', '1', '2', '3']],
      expected: 'Starts with a binary operator.',
    },
    {
      inputs: [['1', '.', '.', '1']],
      expected: 'Input has invalid periods.',
    },
    {
      inputs: [['1', 'x', '÷', '2']],
      expected: 'Input has clashing operators.',
    },
    {
      inputs: [['1', 'pow', 'mod', '2']],
      expected: 'Input has clashing operators.',
    },
    { inputs: [['√', '-', '1']], expected: 'Input has a negative root.' },
    {
      inputs: [['1', '2', '√', '-', '3', '+', '4']],
      expected: 'Input has a negative root.',
    },
    { inputs: [['1', '2', '3', 'x']], expected: 'Ends with an operator.' },
    {
      inputs: [['1', '2', '3', 'pow']],
      expected: 'Ends with an operator.',
    },
  ]));

describe('hasOperatorClashes', () =>
  parametrize(hasOperatorClashes, [
    { inputs: [['1', '1']], expected: false },
    { inputs: [['1', 'x']], expected: false },
    { inputs: [['x', '1']], expected: false },
    { inputs: [['x', 'x']], expected: true },
    { inputs: [['.', '.']], expected: true },
    { inputs: [['.', '+']], expected: true },
    { inputs: [['+', '.']], expected: false },
    { inputs: [['1', 'x', 'x', '1']], expected: true },
    { inputs: [['1', 'x', '1', 'x', '1']], expected: false },
    { inputs: [['1', 'x', '+', '1']], expected: false },
    { inputs: [['1', '+', 'x', '1']], expected: true },
  ]));

describe('hasInvalidPeriods', () =>
  parametrize(hasInvalidPeriods, [
    { inputs: [['1', '.']], expected: true },
    { inputs: [['.', '1']], expected: false },
    { inputs: [['1', '.', '1']], expected: false },
    { inputs: [['1', '.', '.', '1']], expected: true },
    { inputs: [['1', '.', '1', '.', '1']], expected: true },
    { inputs: [['1', '.', '1', '+', '1', '.', '1']], expected: false },
  ]));
