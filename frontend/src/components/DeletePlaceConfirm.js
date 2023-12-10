import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePlaceConfirm({
  isOpen,
  onClose,
  card,
  onCardDelete,
  buttonText,
}) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onCardDelete(card);
  };

  return (
    <PopupWithForm
      name="form-confirm"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
    />
  );
}

export default DeletePlaceConfirm;
