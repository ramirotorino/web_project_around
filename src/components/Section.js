export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Renderizar elementos iniciales
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Modificación: permite agregar al principio o al final
  addItem(element, toBeginning = false) {
    if (toBeginning) {
      this._container.prepend(element); // Inserta al principio
    } else {
      this._container.append(element); // Inserta al final
    }
  }
}
