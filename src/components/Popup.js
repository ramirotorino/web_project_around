export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    if (!this._popup) {
      throw new Error(
        `No se encontró ningún elemento con el selector ${popupSelector}`,
      );
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (
        evt.target.classList.contains('popup__close-button') ||
        evt.target === this._popup
      ) {
        this.close();
      }
    });
  }
}
