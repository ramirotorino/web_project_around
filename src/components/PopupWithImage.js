import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector('.popup__big-img');
    this._titleElement = this._popup.querySelector('.popup__big-img-name');
  }

  open(name, link) {
    if (!link) {
      console.error('Error: El enlace de la imagen no es válido', {
        name,
        link,
      });
      return;
    }
    this._titleElement.textContent = name; // Habilitar el título
    this._imageElement.src = link;
    this._imageElement.alt = name;
    super.open();
  }
}
