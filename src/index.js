import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForms from './components/PopupWithForms.js';
import UserInfo from './components/UserInfo.js';
import Card from './components/Card.js';
import api from './components/Apis.js';
import PopupWithConfirmation from './components/PopupWithConfirmation.js';

document.addEventListener('DOMContentLoaded', () => {
  let currentUserId = null;

  const popupWithImage = new PopupWithImage('.popup_open-image');
  popupWithImage.setEventListeners();

  const popupWithConfirmation = new PopupWithConfirmation(
    '.popup_delete-card',
    () => {
      const { cardId, cardElement } = popupWithConfirmation.getCardInfo();

      api
        .deleteCard(cardId)
        .then(() => {
          cardElement.remove();
          popupWithConfirmation.close();
        })
        .catch((err) => console.error('Error al eliminar la tarjeta:', err));
    },
  );

  popupWithConfirmation.setEventListeners();

  function cardRenderer(item) {
    if (!item._id || !item.name || !item.link) {
      console.error('Error: tarjeta con datos incompletos:', item);
      return;
    }

    const card = new Card(
      item.name,
      item.link,
      item.name,
      (name, link) => popupWithImage.open(name, link),
      item._id,
      item.likes?.length || 0,
      item.isLiked,
      api,
      popupWithConfirmation,
    );

    section.addItem(card.generateCard());
  }

  const section = new Section(
    {
      items: [],
      renderer: cardRenderer,
    },
    '.elements',
  );

  const profileName = document.querySelector('.profile__info-name');
  const profileAbout = document.querySelector('.profile__info-about');
  const profileAvatar = document.querySelector('.profile__photo');
  const avatarEditIcon = document.querySelector('.profile__avatar-edit');

  // Función para validar si una URL es válida
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  // Popup para cambiar la foto de perfil
  const profileAvatarPopup = new PopupWithForms('.popup_avatar', (formData) => {
    const avatarLink = formData['avatar-link'];
    console.log('Valor de avatar-link:', avatarLink); // Log para depurar el valor del input

    // Validar que la URL no esté vacía y sea válida
    if (!avatarLink || !isValidUrl(avatarLink)) {
      console.error('El enlace ingresado no es válido.');
      alert('Por favor, ingresa un enlace válido para el avatar.');
      return;
    }

    api
      .updateAvatar({ avatar: avatarLink })
      .then((updatedUser) => {
        profileAvatar.src = updatedUser.avatar;
        profileAvatarPopup.close();
      })
      .catch((err) => console.error('Error al actualizar el avatar:', err));
  });

  profileAvatarPopup.setEventListeners();

  avatarEditIcon.addEventListener('click', () => {
    profileAvatarPopup.open();
  });

  api
    .getUserInfo()
    .then((userData) => {
      profileName.textContent = userData.name;
      profileAbout.textContent = userData.about;
      profileAvatar.src = userData.avatar;

      currentUserId = userData._id;
      return api.getInitialCards();
    })
    .then((cards) => {
      section.renderItems(cards);
    })
    .catch((err) => {
      console.error('Error al cargar los datos iniciales:', err);
    });

  const addImgBtn = document.querySelector('.profile__add-img');
  const editProfileBtn = document.querySelector('.profile__info-edit');

  const userInfo = new UserInfo({
    nameNode: document.querySelector('.profile__info-name'),
    aboutNode: document.querySelector('.profile__info-about'),
  });

  const editProfilePopup = new PopupWithForms('.popup_profile', (formData) => {
    api
      .updateUserInfo({
        name: formData['name-input'],
        about: formData['about-input'],
      })
      .then((updatedUser) => {
        userInfo.setUserInfo(updatedUser.name, updatedUser.about);
        profileName.textContent = updatedUser.name;
        profileAbout.textContent = updatedUser.about;
        editProfilePopup.close();
      })
      .catch((err) => console.error(`Error al actualizar el perfil: ${err}`));
  });

  editProfileBtn.addEventListener('click', () => {
    const { name, about } = userInfo.getUserInfo();
    document.querySelector('.form__edit-field_profile_name').value = name;
    document.querySelector('.form__edit-field_about').value = about;
    editProfilePopup.open();
  });

  const addImagePopup = new PopupWithForms('.popup_add-image', (formData) => {
    const cardData = {
      name: formData['title-input'],
      link: formData['link-img-input'],
    };

    api
      .addCard(cardData)
      .then((newCard) => {
        const card = new Card(
          newCard.name,
          newCard.link,
          newCard.name,
          (name, link) => popupWithImage.open(name, link),
          newCard._id,
          newCard.likes?.length || 0,
          newCard.isLiked,
          api,
          popupWithConfirmation,
        );
        section.addItem(card.generateCard());
        addImagePopup.close();
      })
      .catch((err) => {
        console.error('Error al agregar la tarjeta:', err);
      });
  });

  addImgBtn.addEventListener('click', () => {
    addImagePopup.open();
  });

  popupWithImage.setEventListeners();
  editProfilePopup.setEventListeners();
  addImagePopup.setEventListeners();
});
