import { expect } from "chai";
import { getElementById } from "./dom";

describe("getElementById", () => {
  beforeEach(() => {
    document.body.insertAdjacentHTML("afterbegin", `<div id="example"></div>`);
  });
  it("returns an element with the matching id", () => {
    expect(getElementById("example")).to.exist;
  });
  it("throws an error if no element matches the id", () => {
    expect(() => getElementById("missing")).to.throw(
      "Element 'missing' does not exist"
    );
  });
});
