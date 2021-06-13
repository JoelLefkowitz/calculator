export const loadMockDom = (): void =>
  document.body.insertAdjacentHTML(
    'afterbegin',
    `  
    <div id="calculator">
      <div id="screen"></div>
      <div id="output"></div>
      <div id="keypad"></div>
    </div>
    `
  );
