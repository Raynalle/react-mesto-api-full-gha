import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onChangeAvatar, buttonText }) {
  const avatarLink = React.useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    onChangeAvatar(avatarLink.current.value);
  };

  return (
    <PopupWithForm
      name="form-editAvatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
    >
      <label className="popup__label-field" htmlFor="avatar">
        <input
          className="popup__field"
          type="url"
          name="avatar"
          id="avatar"
          placeholder="Ссылка на новый аватар"
          required
          ref={avatarLink}
        />
        <span className="popup__input-error avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
