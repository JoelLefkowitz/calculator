export function getElementById(id: string): Element {
  const element = document.body.querySelector('#'.concat(id));
  if (element == null) {
    throw `Element ${id} does not exist`;
  }
  return element;
}
