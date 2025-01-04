import Popup from './Popup.js';

export default class PopupWithForms extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._formElement.querySelectorAll('.form__edit-field');
    this._submitButton = this._formElement.querySelector(
      '.form__edit-subm-btn',
    ); // Botón del formulario
    this._submitButtonText = this._submitButton.textContent; // Texto inicial del botón

    // Añadir validación al evento submit
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

      if (this._isValid()) {
        this._toggleLoadingState(true); // Mostrar "Guardando..."
        this._handleFormSubmit(this._getInputValues()).finally(() => {
          this._toggleLoadingState(false); // Restaurar texto del botón
        });
        this.close(); // Cierra el popup después del envío si es válido
      } else {
        console.log('El formulario contiene errores.');
        this._inputList.forEach((input) => {
          if (!input.validity.valid) {
            this._showInputError(input, input.validationMessage);
          } else {
            this._hideInputError(input);
          }
        });
      }
    });

    // Añadir evento input para validación dinámica
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        if (!input.validity.valid) {
          this._showInputError(input, input.validationMessage);
        } else {
          this._hideInputError(input);
        }
      });
    });
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  // Método para verificar si todos los campos son válidos
  _isValid() {
    return Array.from(this._inputList).every((input) => input.validity.valid);
  }

  // Método para mostrar mensajes de error
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`,
    );

    // Validación personalizada para inputs de tipo URL
    if (inputElement.type === 'url' && !inputElement.validity.valid) {
      errorMessage = 'Por favor, ingresa un enlace válido.';
    }

    console.log('Input element:', inputElement); // Verificar input
    console.log('Error element:', errorElement); // Verificar span

    if (errorElement) {
      inputElement.classList.add('form__input_type_error');
      errorElement.textContent = errorMessage;
      errorElement.classList.add('form__input-error_active');
      console.log(`Error mostrado: ${errorMessage}`);
    } else {
      console.error(
        `No se encontró el elemento de error para ${inputElement.id}`,
      );
    }
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`,
    );
    if (errorElement) {
      inputElement.classList.remove('form__input_type_error');
      errorElement.textContent = '';
      errorElement.classList.remove('form__input-error_active');
    }
  }

  // Método para cambiar el texto del botón durante la carga
  _toggleLoadingState(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Guardando...';
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
