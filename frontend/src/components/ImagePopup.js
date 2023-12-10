import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_image ${card ? "popup_open" : ""}`}>
      <div className="popup__container popup__container_image">
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <h3 className="popup__subtitle">{card?.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
