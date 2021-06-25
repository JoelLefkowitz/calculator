import { getElementById } from "../utils/dom";
import { keys } from "./keys";
import { sendKey } from "./output";

export function createButtons() {
  const keypad = getElementById("keypad");

  for (let key of keys) {
    let button = document.createElement("button");
    button.innerHTML = key;
    button.className = "key";
    button.addEventListener("click", () => sendKey(key));
    keypad.appendChild(button);
  }
}
