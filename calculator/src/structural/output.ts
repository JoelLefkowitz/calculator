import { compose } from "../utils/functions";
import { evaluateOperators } from "../services/calculate";
import { getElementById } from "../utils/dom";
import { parseCalculation } from "../services/parse";
import { validateCalculation } from "../services/validate";

export function sendKey(key: string) {
  const screen = getElementById("screen");
  const output = getElementById("output");

  const calculate = compose([
    parseCalculation,
    evaluateOperators,
    (x) => x.toString(),
  ]);

  if (key == "=") {
    const keys = screen.innerHTML.split(" ");
    const error = validateCalculation(keys);
    screen.innerHTML = "";
    output.innerHTML = error ? error : calculate(keys);
  } else {
    const joined = screen.innerHTML.concat(screen.innerHTML ? " " : "", key);
    screen.innerHTML = key == "C" ? "" : joined;
    output.innerHTML = "";
  }
}
