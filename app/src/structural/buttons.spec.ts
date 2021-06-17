import { createButtons } from "./buttons";
import { expect } from "chai";
import { getElementById } from "../utils/dom";
import { keys } from "./keys";
import { loadMockDom } from "../tests/mocks";

describe("createButtons", () => {
  beforeEach(loadMockDom);

  it("populates the keypad element with buttons", () => {
    createButtons();
    const keypad = getElementById("keypad");
    expect(keypad.children.length).to.equal(keys.length);

    // TODO mock click event and count calls to sendKey
  });
});
