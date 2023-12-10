import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
    >
      <div className="popup__fields">
        <label className="popup__label-field">
          <input
            className="popup__field"
            type="text"
            name="name"
            id="name"
            placeholder="Ваше имя"
            required
            minLength="2"
            maxLength="40"
            value={name}
            onChange={handleNameChange}
          />
          <span className="popup__input-error name-error"></span>
        </label>
        <label className="popup__label-field">
          <input
            className="popup__field"
            type="text"
            name="description"
            id="description"
            placeholder="Описание"
            required
            minLength="2"
            maxLength="200"
            value={description}
            onChange={handleDescriptionChange}
          />
          <span className="popup__input-error description-error"></span>
        </label>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
