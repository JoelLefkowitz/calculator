import { evaluateOperators } from "../services/calculate";
import { expect } from "chai";
import { getElementById } from "../utils/dom";
import { loadMockDom } from "../tests/mocks";
import { sendKey } from "./display";

describe("sendKey", () => {
  beforeEach(loadMockDom);

  it("", () => {
    sendKey("1");
    expect(getElementById("screen").innerHTML).to.equal("1 ");
    expect(getElementById("output").innerHTML).to.equal("");
  });

  it("", () => {
    sendKey("1");
    sendKey("+");
    sendKey("1");
    expect(getElementById("screen").innerHTML).to.equal("1 + 1 ");
    expect(getElementById("output").innerHTML).to.equal("");
  });

  it("", () => {
    sendKey("1");
    sendKey("C");
    expect(getElementById("screen").innerHTML).to.equal("");
    expect(getElementById("output").innerHTML).to.equal("");
  });

  it("", () => {
    // TODO mock evaluateOperators

    sendKey("1");
    sendKey("=");
    expect(getElementById("screen").innerHTML).to.equal("");
    expect(getElementById("output").innerHTML).to.equal("1");
  });
});
