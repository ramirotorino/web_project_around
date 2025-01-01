import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm; // Función a ejecutar al confirmar
    this._confirmButton = this._popup.querySelector('.popup__confirm-button'); // Botón "Sí"
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      console.log('Botón de confirmación clickeado');
      this._handleConfirm();
    });
  }

  open(cardId, cardElement) {
    console.log('Abrir popup con:', cardId, cardElement);
    this._cardId = cardId;
    this._cardElement = cardElement;
    super.open();
  }

  getCardInfo() {
    return {
      cardId: this._cardId,
      cardElement: this._cardElement,
    };
  }
}
