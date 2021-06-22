import { Selector } from "testcafe";

fixture`Calculator`.page`http://localhost:3000`;

const screen = Selector("#screen");
const output = Selector("#output");
const key = (text: string) => Selector(".key").withText(text);

test("should send button clicks to the display screen", async (t: TestController) =>
  await t.click(key("1")).expect(screen.innerText).eql("1"));

test("should clear the display screen when 'C' is pressed.", async (t: TestController) =>
  await t.click(key("1")).click(key("C")).expect(screen.innerText).eql(""));

test("should display the output of a calculation when '=' is pressed.", async (t: TestController) =>
  await t
    .click(key("1"))
    .click(key("+"))
    .click(key("1"))
    .click(key("="))
    .expect(screen.innerText)
    .eql("")
    .expect(output.innerText)
    .eql("2"));

test("should display an error message if given an invalid input", async (t: TestController) =>
  await t
    .click(key("1"))
    .click(key("."))
    .click(key("."))
    .click(key("="))
    .expect(output.innerText)
    .eql("Input has invalid periods."));
