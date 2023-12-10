import React from "react";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      <nav className="header__auth">
        <p className="header__text">{props.mail}</p>
        <Link className="header__link" to={props.route}  type="button" onClick={props.onClick}>{props.title}</Link>
      </nav>
    </header>
  );
}

export default Header;
