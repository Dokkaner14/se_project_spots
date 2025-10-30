const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const profileEditBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileSaveBtn = editProfileModal.querySelector(".modal__submit-btn");

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostSaveBtn = newPostModal.querySelector(".modal__submit-btn");

const profileFormElement = editProfileModal.querySelector(".modal__form");
const profileNameInput = profileFormElement.querySelector(
  "#profile-name-input"
);
const profileJobInput = profileFormElement.querySelector(
  "#profile-description-input"
);

const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");

const addCardFormElement = newPostModal.querySelector(".modal__form");
const cardNameInput = addCardFormElement.querySelector("#image-caption-input");
const cardLinkInput = addCardFormElement.querySelector("#image-link-input");

const cardTemplate = document
  .querySelector("#card-template")
  .content.cloneNode(true);

const cardContainer = document.querySelector(".cards__list");

const modalPreviewElement = document.querySelector("#preview-modal");
const modalPreviewCloseBtn =
  modalPreviewElement.querySelector(".modal__close-btn");
const modalPreviewImage = modalPreviewElement.querySelector(".modal__image");
const modalPreviewCaption =
  modalPreviewElement.querySelector(".modal__caption");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}
profileEditBtn.addEventListener("click", function () {
  profileNameInput.value = profileNameElement.textContent;
  profileJobInput.value = profileJobElement.textContent;
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileJobElement.textContent = profileJobInput.value;
  closeModal(editProfileModal);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  const cardElement = getCardElement(inputValues);
  cardContainer.prepend(cardElement);
  closeModal(newPostModal);
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach(function (card) {
  const cardEl = getCardElement(card);
  cardContainer.append(cardEl);
});

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImageElement = cardElement.querySelector(".card__image");
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  const cardTitleElement = cardElement.querySelector(".card__title");
  cardTitleElement.textContent = data.name;

  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  cardLikeBtn.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-btn_active");
  });

  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtn.addEventListener("click", () => {
    cardDeleteBtn.closest(".card").remove();
  });

  cardImageElement.addEventListener("click", () => {
    modalPreviewImage.src = data.link;
    modalPreviewImage.alt = data.name;
    modalPreviewCaption.textContent = data.name;
    openModal(modalPreviewElement);
  });

  return cardElement;
}

modalPreviewCloseBtn.addEventListener("click", () => {
  closeModal(modalPreviewElement);
});
