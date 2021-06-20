import { expect } from "chai";
import itParam from "mocha-param";

export type TestCase = {
  inputs: any[];
  expected: any;
};

export const parametrize = (
  callable: (...args: any[]) => any,
  testCases: TestCase[],
  options: { deep: boolean } = { deep: false }
): void =>
  itParam(
    "should return '${value.expected}' when given '${value.inputs}'",
    testCases,
    (testCase: TestCase) =>
      options.deep
        ? expect(callable(...testCase.inputs)).to.eql(testCase.expected)
        : expect(callable(...testCase.inputs)).to.equal(testCase.expected)
  );
