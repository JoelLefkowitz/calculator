import { expect } from "chai";
import { getElementById } from "../utils/dom";
import { loadMockDom } from "../tests/mocks";
import { sendKey } from "./output";

describe("sendKey", () => {
  beforeEach(loadMockDom);

  it("should set the screen's innerHTML when sent a key", () => {
    sendKey("1");
    expect(getElementById("screen").innerHTML).to.equal("1");
    expect(getElementById("output").innerHTML).to.equal("");
  });

  it("should set the screen's innerHTML to a space separated sequence of sent keys", () => {
    sendKey("1");
    sendKey("+");
    sendKey("1");
    expect(getElementById("screen").innerHTML).to.equal("1 + 1");
    expect(getElementById("output").innerHTML).to.equal("");
  });

  it("should set the screen's innerHTML to nothing when sent the 'C' key", () => {
    sendKey("1");
    sendKey("C");
    expect(getElementById("screen").innerHTML).to.equal("");
    expect(getElementById("output").innerHTML).to.equal("");
  });

  it("should set the output's innerHTML to an input key when given the '=' key", () => {
    sendKey("1");
    sendKey("=");
    expect(getElementById("screen").innerHTML).to.equal("");
    expect(getElementById("output").innerHTML).to.equal("1");
  });

  it("should set the output's innerHTML to an error message when given an invalid input", () => {
    sendKey("1");
    sendKey(".");
    sendKey(".");
    sendKey("0");
    sendKey("=");
    expect(getElementById("screen").innerHTML).to.equal("");
    expect(getElementById("output").innerHTML).to.equal(
      "Input has invalid periods."
    );
  });
});
