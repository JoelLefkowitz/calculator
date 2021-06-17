const { expect } = require('chai');

const getKey = async (key) =>
  $$('.key')
    .filter(async (x) => (await x.getText()) == key)
    .first();

describe('Calculator component', () => {
  let screen;
  let output;
  let one;
  let plus;
  let period;
  let clear;
  let equals;

  beforeEach(async () => {
    browser.waitForAngularEnabled(false);
    await browser.get('http://localhost:3000');

    screen = await $('#screen');
    output = await $('#output');

    one = await getKey('1');
    plus = await getKey('+');
    period = await getKey('.');
    clear = await getKey('C');
    equals = await getKey('=');
  });

  after(() => {
    browser.close();
  });

  it('should send button clicks to the display screen', async () => {
    await one.click();
    expect(await screen.getText()).to.equal('1');
  });

  it("should clear the display screen when 'C' is pressed.", async () => {
    await one.click();
    await clear.click();
    expect(await screen.getText()).to.equal('');
  });

  it("should display the output of a calculation when '=' is pressed.", async () => {
    await one.click();
    await plus.click();
    await one.click();
    await equals.click();
    expect(await output.getText()).to.equal('2');
  });

  it('should display an error message if given an invalid input', async () => {
    await one.click();
    await period.click();
    await period.click();
    await equals.click();
    expect(await output.getText()).to.equal('Input has invalid periods.');
  });
});
