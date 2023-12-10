import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, buttonText }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  const handleNewName = (evt) => {
    setName(evt.target.value);
  };

  const handleNewLink = (event) => {
    setLink(event.target.value);
  };

  const handleAddPlaceSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace({ name, link });
  };

  React.useEffect(() => {
    if (!isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-profile"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
      buttonText={buttonText}
    >
      <div className="popup__fields">
        <label className="popup__label-field">
          <input
            className="popup__field"
            type="text"
            name="name"
            id="name-photo"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
            value={name}
            onChange={handleNewName}
          />
          <span className="popup__input-error name-photo-error"></span>
        </label>
        <label className="popup__label-field">
          <input
            className="popup__field"
            type="url"
            name="link"
            id="link-photo"
            placeholder="Ссылка на картинку"
            required
            value={link}
            onChange={handleNewLink}
          />
          <span className="popup__input-error link-photo-error"></span>
        </label>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
