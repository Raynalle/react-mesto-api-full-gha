import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleEmailInput(evt) {
        setEmail(evt.target.value);
    }

    function handlePasswordInput(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onRegister(email, password);
    }

    return (
        <section className="login">
            <h2 className="login__title">Регистрация</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <input className="login__input" type="email" placeholder="Email" onChange={handleEmailInput} required/>
                <input className="login__input" type="password" placeholder="Пароль" autoComplete="on" onChange={handlePasswordInput} required/>
                <button className="login__button" type="submit">Зарегистрироваться</button>
            </form>
            <p className="login__text">Уже зарегистрированы? <Link to = "/sign-in" className="login__link">Войти</Link></p>
        </section>
    )
}

export default Register;