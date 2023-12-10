import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlaceConfirm from "./DeletePlaceConfirm";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip"
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";
import resolve from "../images/resolve.svg";
import reject from "../images/reject.svg";

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setEditProfilePopupState] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] =
    React.useState(false);

  const [buttonTextAddPlace, setButtonTextAddPlace] = React.useState("Создать");
  const [buttonTextEditProfile, setButtonTextEditProfile] =
    React.useState("Сохранить");
  const [buttonTextEditAvatar, setButtonTextEditAvatar] =
    React.useState("Сохранить");
  const [buttonTextDeletePlace, setButtonTextDeletePlace] =
    React.useState("Да");

  const [deletePlaceConfirm, setDeletePlaceConfirm] = React.useState({
    isOpen: false,
    card: {},
  });

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
    cohort: "",
  });

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [emailLogin, setEmailLogin] = React.useState(null);
  const [infoTooltip, setInfoTooltip] = React.useState(false);
  const [popupImage, setPopupImage] = React.useState("");
  const [popupTitle, setPopupTitle] = React.useState("");

  function onRegister(email, password) {
    auth.registerUser(email, password).then(() =>{
      setPopupImage(resolve);
      setPopupTitle("Вы успешно зарегистрировались!");
      navigate("/sign-in");
    })
    .catch(() => {
      setPopupImage(reject);
      setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
    })
    .finally(handleInfoTooltip);
  }

  function onLogin(email, password) {
    auth.loginUser(email, password).then((response) => {
      localStorage.setItem("jwt", response.token);
      setIsLoggedIn(true);
      setEmailLogin(email);
      navigate("/");
    })
    .catch(() => {
      setPopupImage(reject);
      setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
      handleInfoTooltip();
    });
  }

  function onSignOut() {
    setIsLoggedIn(false);
    setEmailLogin(null);
    navigate("/sign-in");
    localStorage.removeItem("jwt");
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if(jwt) {
      auth.getToken(jwt).then((response) => {
        if(response) {
          setIsLoggedIn(true);
          setEmailLogin(response.data.email);
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }, []);

  React.useEffect(() => {
    if(isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  React.useEffect(() => {
    if(isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
      .then(([user, initCards]) => {
        setCurrentUser(user);
        setCards(initCards);
      })

      .catch((error) => {
        console.log(error);
      });
    }
  }, [isLoggedIn]);

  const handleEditAvatarClick = () => {
    setEditAvatarPopupState(true);
  };

  const handleProfileClick = () => {
    setEditProfilePopupState(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupState(true);
  };

  const handleCardPopupClick = (card) => {
    setSelectedCard(card);
  };

  const handleDeleteClick = (card) => {
    setDeletePlaceConfirm({ isOpen: true, card: card });
  };

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  const handleUpdateUser = (info) => {
    setButtonTextEditProfile("Сохранение...");
    api
      .setUserInfo(info)
      .then((updateUser) => {
        setCurrentUser(updateUser);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setButtonTextEditProfile("Сохранить");
      });
  };

  const handleChangeAvatar = (avatarUrl) => {
    setButtonTextEditAvatar("Загрузка...");
    api
      .updateAvatar(avatarUrl)
      .then((updateUser) => {
        setCurrentUser(updateUser);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setButtonTextEditAvatar("Сохранить");
      });
  };

  const handleAddPlace = ({ name, link }) => {
    setButtonTextAddPlace("Создание...");
    api
      .createCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setButtonTextAddPlace("Создать");
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCardDelete = (card) => {
    setButtonTextDeletePlace("Удаление...");
    api
      .removeCard(card._id)
      .then((response) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .finally(() => {
        setButtonTextDeletePlace("Да");
      });
  };

  const closeAllPopups = () => {
    setEditAvatarPopupState(false);
    setAddPlacePopupState(false);
    setEditProfilePopupState(false);
    setDeletePlaceConfirm({ isOpen: false, card: {} });
    setSelectedCard(null);
    setInfoTooltip(false);
  };

  const isOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    deletePlaceConfirm ||
    infoTooltip;
    
  React.useEffect(() => {
    if (!isOpen) return; // если все попапы закрыты — ничего не делаем

    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__wrapper">
          <Routes>
            <Route path="/sign-in" element = {
              <>
                <Header title = "Регистрация" route = "/sign-up"/>
                <Login onLogin = {onLogin}/>
              </>
            }/>

            <Route path="sign-up" element = {
              <>
                <Header title = "Войти" route = "/sign-in"/>
                <Register onRegister = {onRegister}/>
              </>
            }/>

            <Route exact path="/" element = {
              <>
                <Header title = "Выйти" mail = {emailLogin} onClick = {onSignOut} route = "/sign-in"/>
                <ProtectedRoute component={Main}
                isLogged = {isLoggedIn}
                onEditProfile={handleProfileClick}
                onEditProfileAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardPopupClick}
                cards={cards}
                onCardLike={handleCardLike}
                onDeleteClick={handleDeleteClick}/>
                
                <Footer />
              </>
            }/>

            <Route path="*" element = {<Navigate to={isLoggedIn ? "/" : "/sign-in"}/>}/>
          </Routes>

          

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            buttonText={buttonTextEditProfile}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onChangeAvatar={handleChangeAvatar}
            buttonText={buttonTextEditAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
            buttonText={buttonTextAddPlace}
          />

          <DeletePlaceConfirm
            isOpen={deletePlaceConfirm.isOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            buttonText={buttonTextDeletePlace}
            card={deletePlaceConfirm.card}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip 
            image = {popupImage}
            title = {popupTitle}
            isOpen = {infoTooltip}
            onClose = {closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
