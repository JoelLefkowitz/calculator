import "./styles/styles.scss";

import { createButtons } from "./buttons";

export const screen = document.body.querySelector("#screen");
export const output = document.body.querySelector("#output");
export const keypad = document.body.querySelector("#keypad");

createButtons();
