export const createButtons = () => {
  for (let i = 0; i < 10; i++) {
    let btn = document.createElement("button");
    btn.innerHTML = i;
    btn.classList = ["keypad"];
    document.body.querySelector("#numpad").appendChild(btn);
  }
};
