export default class FormValidator {
  constructor(formElement, settings) {
    this.formElement = formElement;
    this.settings = settings;
    this.submitButton = this.formElement.querySelector(
      settings.submitButtonSelector
    );
    this.inputList = Array.from(
      this.formElement.querySelectorAll(settings.inputSelector)
    );
  }

  showInputError(inputElement, errorMessage) {
    console.log(errorMessage);
    const errorElement = this.formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this.settings.inputErrorClass);
    console.log(errorElement);
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input-error_active");
  }

  hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.textContent = "";
    errorElement.classList.remove("form__input-error_active");
  }

  _checkInputValidity(inputElement) {
    console.log(inputElement.validity);
    if (!inputElement.validity.valid) {
      this.showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }

  toggleButtonState() {
    const hasInvalidInput = this.inputList.some(
      (inputElement) => !inputElement.validity.valid
    );
    if (hasInvalidInput) {
      this.submitButton.disabled = true;
    } else {
      this.submitButton.disabled = false;
    }
  }

  setEventListeners() {
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        console.log(inputElement);
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this.formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this.setEventListeners();
    this.toggleButtonState();
  }

  resetValidation() {
    const formList = Array.from(
      document.querySelectorAll(this.settings.formSelector)
    );
    formList.forEach((formElement) => {
      formElement.reset();
      const submitButton = formElement.querySelector(
        this.settings.submitButtonSelector
      );
      const inputList = Array.from(
        formElement.querySelectorAll(this.settings.inputSelector)
      );
      this.toggleButtonState(
        inputList,
        submitButton,
        this.settings.inactiveButtonClass
      );
      inputList.forEach((inputElement) => {
        this.hideInputError(inputElement);
      });
    });
  }
}
