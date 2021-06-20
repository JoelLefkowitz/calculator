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
    expect(keypad.children[0]).to.be.an("HTMLButtonElement");
    expect((keypad.children[0] as HTMLButtonElement).click).to.be.a("function");
    expect(() =>
      (keypad.children[0] as HTMLButtonElement).click()
    ).to.not.throw();
  });
});
