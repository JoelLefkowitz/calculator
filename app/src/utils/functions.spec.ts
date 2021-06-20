import { compose } from "./functions";
import { expect } from "chai";

describe("compose", () =>
  it("should multiply inputs by 6 when given double and triple functions to compose", () =>
    expect(compose([(x) => 2 * x, (x) => 3 * x])(1)).to.equal(6)));
