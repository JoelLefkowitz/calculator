import { expect } from "chai";
import { findErrors } from "../src/calculate";

describe(
  "findErrors",

  it("should return null if the input is parsable", () => {
    expect(findErrors("1 2 3 4 5")).to.equal(null);
  }),

  it("should return an error string if the input is not parsable", () => {
    expect(findErrors("pow 1 2 3")).to.equal("Input starts with an operator.");
    expect(findErrors("1 pow mod 2")).to.equal("Input has operators in a row.");
    expect(findErrors("1 2 3 pow")).to.equal("Input ends in an operator.");
    expect(findErrors("1 2 √ - 3")).to.equal("Input has a negative root.");
  })
);
