export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Permite renderizar elementos dinámicos si se pasan como parámetro
  renderItems(items = []) {
    if (!Array.isArray(items)) {
      console.error('renderItems esperaba un array, pero recibió:', items);
      return;
    }

    items.forEach((item) => {
      this._renderer(item); // Delega la validación a cardRenderer
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}
