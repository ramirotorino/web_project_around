import { initialCards } from './components/constants.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForms from './components/PopupWithForms.js';
import UserInfo from './components/UserInfo.js'; // Asegúrate de tener este archivo
import Card from './components/Card.js';

// Selección de botones y popups
const addImgBtn = document.querySelector('.profile__add-img'); // Botón para agregar imagen
const editProfileBtn = document.querySelector('.profile__info-edit'); // Botón para editar perfil

// Instancia de UserInfo para manejar datos del usuario

const userInfo = new UserInfo({
  nameNode: document.querySelector('.profile__info-name'),
  aboutNode: document.querySelector('.profile__info-about'),
});

// Instancia del popup de imágenes (al hacer clic en una imagen)
const popupWithImage = new PopupWithImage('.popup_open-image');

// Renderizador de tarjetas
const cardRenderer = (item) => {
  const card = new Card(
    item.name,
    item.link,
    item.name,
    (name, link) => popupWithImage.open(name, link), // Abre la imagen en popup
  );
  section.addItem(card.generateCard());
};

// Instancia de la sección donde se renderizan las tarjetas
const section = new Section(
  {
    items: initialCards, // Tarjetas iniciales importadas desde constants.js
    renderer: cardRenderer,
  },
  '.elements',
);

// Instancia del popup para editar perfil
const editProfilePopup = new PopupWithForms('.popup_profile', (formData) => {
  userInfo.setUserInfo(formData['name-input'], formData['about-input']);

  editProfilePopup.close();
});

// Evento para abrir el popup de editar perfil
editProfileBtn.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo();
  document.querySelector('.form__edit-field_profile_name').value = name;
  document.querySelector('.form__edit-field_about').value = about;
  editProfilePopup.open();
});

// Instancia del popup para agregar una imagen
const addImagePopup = new PopupWithForms('.popup_add-image', (formData) => {
  const newCard = new Card(
    formData['title-input'],
    formData['link-img-input'],
    formData['title-input'],
    (name, link) => popupWithImage.open(name, link),
  );
  section.addItem(newCard.generateCard());
  addImagePopup.close();
});

// Evento para abrir el popup de agregar imagen
addImgBtn.addEventListener('click', () => {
  addImagePopup.open();
});

// Configurar los event listeners de los popups
popupWithImage.setEventListeners();
editProfilePopup.setEventListeners();
addImagePopup.setEventListeners();

// Renderizar las tarjetas iniciales
section.renderItems();
