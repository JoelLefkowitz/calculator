import { keypad } from "./main";
import { sendKeys } from "./calculate";

const special = ["+", "-", ".", "√", "pow", "mod", "x", "÷", "C", "="];
const keys = Array.from({ length: 10 }, (_, k) => k).concat(special);

export const createButtons = () => {
  for (let key of keys) {
    let button = document.createElement("button");
    button.innerHTML = key;
    button.classList = ["key"];
    button.addEventListener("click", () => sendKeys(key));
    keypad.appendChild(button);
  }
};
