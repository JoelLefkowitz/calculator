import { expect } from "chai";
import itParam from "mocha-param";

export type Method = (...args: any[]) => any;

export type TestCase = {
  inputs: any[];
  expected: any;
};

export const parametrize = (
  method: Method,
  testCases: TestCase[],
  options: { deep: boolean } = { deep: false }
): void =>
  itParam(
    "should return '${value.expected}' when given '${value.inputs}'",
    testCases,
    (testCase: TestCase) =>
      options.deep
        ? expect(method(...testCase.inputs)).to.eql(testCase.expected)
        : expect(method(...testCase.inputs)).to.equal(testCase.expected)
  );
