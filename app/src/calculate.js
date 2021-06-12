import { hasUnrepeatedKeyClash, isRepeatableKey, isSubArray } from "./utils";
import { output, screen } from "./main";

export const sendKeys = (key) => {
  output.innerHTML = "";

  if (key == "=") {
    const error = findErrors(screen.innerHTML);
    output.innerHTML = error ? error : parseSum(screen.innerHTML);
  }

  screen.innerHTML = ["=", "C"].includes(key)
    ? ""
    : screen.innerHTML.concat(key, " ");
};

export const findErrors = (input) => {
  const keys = input.split(" ").slice(0, -1);

  if (!isRepeatableKey(keys[0])) {
    return "Input starts with an operator.";
  }

  if (hasUnrepeatedKeyClash(keys)) {
    return "Input has operators in a row.";
  }

  if (!isRepeatableKey(keys[keys.length - 1])) {
    return "Input ends in an operator.";
  }

  if (isSubArray(keys, ["√", "-"])) {
    return "Input has a negative root.";
  }

  return null;
};

export const parseSum = (input) => {
  return input;
};
