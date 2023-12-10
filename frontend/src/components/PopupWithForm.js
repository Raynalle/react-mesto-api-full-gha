import React from "react";

function PopupWithForm({
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  buttonText,
  children,
}) {
  return (
    <div
      className={
        isOpen ? `popup popup_${name} popup_open` : `popup popup_${name}`
      }
    >
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        ></button>
        <form
          className="popup__form-profile"
          name={name}
          action="#"
          method="post"
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__button-submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
