import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onDeleteClick }) {
  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onDeleteClick(card);
  };

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  return (
    <div className="element">
      {isOwn && (
        <button
          className="element__trash"
          type="button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="element__body">
        <img
          className="element__image"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
        <div className="element__flex">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__shell">
            <button
              className={
                isLiked ? "element__like element__like_active" : "element__like"
              }
              type="button"
              onClick={handleLikeClick}
            ></button>
            <span className="element__like-counter">{card.likes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
