import React from "react";

function InfoTooltip(props) {
    return (
        <div className = {`popup ${props.isOpen ? 'popup_open' : ''}`} onClick={props.onClose}>
            <div className="popup__info">
                <img className="popup__status" src = {props.image} alt = {props.title}/>
                <h2 className="popup__massange">{props.title}</h2>
                <button className="popup__button-close" type="button" title="Закрыть" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip;