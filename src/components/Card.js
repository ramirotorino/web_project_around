export default class Card {
  constructor(
    cardName,
    cardLink,
    cardAlt,
    handleCardClick,
    cardId,
    likeCount,
    isLiked,
    apiInstance,
    popupWithConfirmation,
  ) {
    this._cardName = cardName;
    this._cardAlt = cardAlt;
    this._cardLink = cardLink;
    this.handleCardClick = handleCardClick;
    this._cardId = cardId;
    this._likeCount = likeCount;
    this._isLiked = isLiked;
    this._api = apiInstance;
    this._popupWithConfirmation = popupWithConfirmation;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector('#elements__card-template')
      .content.querySelector('.elements__picture')
      .cloneNode(true);

    if (!cardTemplate) {
      throw new Error('Error: No se encontró la plantilla de tarjeta.');
    }

    return cardTemplate;
  }

  _updateLikeCount(count) {
    this._likeCountElement.textContent = count;
  }

  _setEventListeners() {
    // Asegúrate de que los elementos estén definidos antes de usarlos
    if (!this._likeButton || !this._trashButton || !this._cardImgElement) {
      throw new Error(
        'Error: Los elementos necesarios no están definidos en _setEventListeners.',
      );
    }

    // Evento de "me gusta"
    this._likeButton.addEventListener('click', () => {
      const isLiked = this._likeButton.classList.contains(
        'elements__like-btn-active',
      );

      if (isLiked) {
        this._api
          .unlikeCard(this._cardId)
          .then((updatedCard) => {
            console.log(
              'Respuesta de la API al quitar "me gusta":',
              updatedCard,
            );

            // Actualizamos el estado del botón y el contador
            this._likeButton.classList.remove('elements__like-btn-active');
            this._isLiked = false; // Actualizamos el estado interno
            this._likeCount -= 1; // Disminuimos manualmente el contador
            this._updateLikeCount(this._likeCount); // Actualizamos visualmente
          })
          .catch((err) => console.error('Error al quitar el "me gusta":', err));
      } else {
        this._api
          .likeCard(this._cardId)
          .then((updatedCard) => {
            console.log('Respuesta de la API al dar "me gusta":', updatedCard);

            // Actualizamos el estado del botón y el contador
            this._likeButton.classList.add('elements__like-btn-active');
            this._isLiked = true; // Actualizamos el estado interno
            this._likeCount += 1; // Aumentamos manualmente el contador
            this._updateLikeCount(this._likeCount); // Actualizamos visualmente
          })
          .catch((err) => console.error('Error al dar "me gusta":', err));
      }
    });

    // Evento para eliminar tarjeta
    this._trashButton.addEventListener('click', () => {
      this._popupWithConfirmation.open(this._cardId, this._cardElement);
    });

    // Evento para abrir la imagen en popup
    this._cardImgElement.addEventListener('click', () => {
      this.handleCardClick(this._cardName, this._cardLink);
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();

    // Inicialización de los elementos
    this._cardTitleElement = this._cardElement.querySelector(
      '.elements__picture-name',
    );
    this._cardImgElement = this._cardElement.querySelector(
      '.elements__picture-size',
    );
    this._likeButton = this._cardElement.querySelector('.elements__like-btn');
    this._likeCountElement = this._cardElement.querySelector(
      '.elements__like-count',
    );
    this._trashButton = this._cardElement.querySelector(
      '.elements__picture-trash-btn',
    );

    if (
      !this._cardTitleElement ||
      !this._cardImgElement ||
      !this._likeButton ||
      !this._likeCountElement ||
      !this._trashButton
    ) {
      throw new Error('Error: Algunos elementos necesarios no se encontraron.');
    }

    this._cardTitleElement.textContent = this._cardName;
    this._cardImgElement.src = this._cardLink || 'default-image.jpg';
    this._cardImgElement.alt = this._cardAlt || this._cardName;
    this._likeCountElement.textContent = this._likeCount;

    if (this._isLiked) {
      this._likeButton.classList.add('elements__like-btn-active');
    }

    this._setEventListeners();

    return this._cardElement;
  }
}
