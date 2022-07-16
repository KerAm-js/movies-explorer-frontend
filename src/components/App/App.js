import React, { useEffect, useState } from "react";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import LogIn from "../LogIn/LogIn";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getMoviesFromBF } from "../../utils/MoviesApi";
import Search from "../Search/Search";
import {
  IS_SHORT_FILM,
  IS_SHORT_FILM_SAVED,
  MOVIES,
  REQUEST_TEXT,
  REQUEST_TEXT_SAVED,
  TOKEN,
} from "../../utils/localStorageConstants";
import {
  errorMessage,
  nameInvalidMessage,
  nameRegex,
  submitErrorMessage,
} from "../../utils/constants";
import { getUploadMoviesCount } from "../../utils/utils";
import { addMovie, removeMovie, signup, singin } from "../../utils/MainApi";
import { useInputValidator } from "../Validator/InputValidator";


function App() {
  //movies
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem(MOVIES)) || []);
  const [isLoaderShown, setIsLoaderShown] = useState(false);
  const [uploadMoviesCount, setUploadMoviesCount] = useState(getUploadMoviesCount(window.innerWidth, { isInitial: false }));
  const [isMoviesRequested, setIsMoviesRequested] = useState(false);

  //movies search form
  const [searchText, setSearchText] = useState(localStorage.getItem(REQUEST_TEXT) || "");
  const [isShortFilm, setIsShortFilm] = useState(Boolean(localStorage.getItem(IS_SHORT_FILM)) || false);

  //saved movies search form
  const [isSavedShortFilm, setIsSavedShortFilm] = useState(Boolean(localStorage.getItem(IS_SHORT_FILM_SAVED)) || false);
  const [serachSavedText, setSearchSavedText] = useState(localStorage.getItem(REQUEST_TEXT_SAVED) || "");

  //register form
  const [searchError, setSearchError] = useState("");
  const [name, nameError, isNameValid, onNameChange, setNameDefaults] = useInputValidator(nameRegex, nameInvalidMessage);
  const [email, emailError, isEmailValid, onEmailChange, setEmailDefaults] = useInputValidator();
  const [password, passwordError, isPasswordValid, onPasswordChange, setPasswordDefaults] =useInputValidator();
  const [isRegisterFormValid, setIsRegisterFormValid] = useState(false);
  const [registerFormError, setRegisterFormError] = useState("");

  const setRegisterDefaults = () => {
    setEmailDefaults();
    setPasswordDefaults();
    setNameDefaults();
    setIsRegisterFormValid(false);
    setRegisterFormError("");
  }

  //login form
  const [loginEmail, loginEmailError, isLoginEmailValid, onLoginEmailChange, setLoginEmailDefaults] = useInputValidator();
  const [loginPassword, loginPasswordError, isLoginPasswordValid, onLoginPasswordChange, setLoginPasswordDefaults] = useInputValidator();
  const [isLoginFormValid, setIsLoginFormValid] = useState(false);
  const [loginFormError, setLoginFormError] = useState('');

  const setLoginDefaults = () => {
    setLoginEmailDefaults();
    setPasswordDefaults();
    setIsLoginFormValid(false);
    setLoginFormError("");
  }

  // """ Для каждого из предыдуших блоков можно было бы сделать контекст """ 

  const navigate = useNavigate();
  
  const onSearchTextChange = (evt) => setSearchText(evt.target.value);
  const onSearchSavedTextChange = (evt) => setSearchSavedText(evt.target.value);
  const toggleIsShortFilm = () => setIsShortFilm(!isShortFilm);
  const toggleIsSavedShortFilm = () => setIsSavedShortFilm(!isSavedShortFilm);

  //для обновления состояния кнопки сабмита формы регистрации
  useEffect(() => {
    if (isNameValid && isEmailValid && isPasswordValid) {
      setIsRegisterFormValid(true);
      return;
    }
    setIsRegisterFormValid(false);
  }, [isNameValid, isEmailValid, isPasswordValid]);

  //для обновления состояния кнопки сабмита формы авториззации
  useEffect(() => {
    if (isLoginEmailValid && isLoginPasswordValid) {
      setIsLoginFormValid(true);
      return;
    }
    setIsLoginFormValid(false);
  }, [isLoginEmailValid, isLoginPasswordValid]);

  //для первой подгрузки фильмов
  const setMoviesInitial = (data) => {
    setMovies(
      data.slice(
        0,
        getUploadMoviesCount(window.innerWidth, { isInitial: true })
      )
    );
  };

  //чтобы не писать две разные функции для поиска фильмов
  const getSearchHandler = (isSavedSearch) => (evt) => {
    
    evt.preventDefault();

    const storedMovies = JSON.parse(localStorage.getItem(MOVIES));
    setIsLoaderShown(true);

    if (!isMoviesRequested) {
      setIsMoviesRequested(true);
    }

    if (isSavedSearch) {
      localStorage.setItem(REQUEST_TEXT_SAVED, serachSavedText);
      localStorage.setItem(IS_SHORT_FILM_SAVED, isSavedShortFilm ? "1" : "");
    } else {
      localStorage.setItem(REQUEST_TEXT, searchText);
      localStorage.setItem(IS_SHORT_FILM, isShortFilm ? "1" : "");
    }

    if (!storedMovies || storedMovies.length === 0) {
      getMoviesFromBF()
        .then((data) => {
          setSearchError("");
          setMoviesInitial(data);
          localStorage.setItem(MOVIES, JSON.stringify(data));
        })
        .catch((err) => {
          console.log(err);
          setSearchError(errorMessage);
        })
        .finally(() => setIsLoaderShown(false));
    } else {
      setMoviesInitial(storedMovies);
      setIsLoaderShown(false);
    }

  };

  const onLikeCardHandler = (movie) => {
    addMovie(movie)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const onDisLikeCardHanlder = (id, movieId) => {
    removeMovie(id, movieId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const onSignupHandler = evt => {
    if (evt) {
      evt.preventDefault();
    }
    signup({ email, name, password })
      .then(() => {
        if (registerFormError) {
          setRegisterFormError("");
        }
        return singin({ email, password })
      })
      .then((res) => {
        if (res.token) {
          localStorage.setItem(TOKEN, res.token);
        }
        setRegisterDefaults();
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
        setRegisterFormError(submitErrorMessage);
      });
  };

  const onSignInHandler = evt => {
    if (evt) {
      evt.preventDefault();
    }
    singin({ email: loginEmail, password: loginPassword })
      .then(res => {
        if (res.token) {
          localStorage.setItem(TOKEN, res.token);
        }
        setLoginDefaults();
        navigate('/movies');
      })
      .catch(err => {
        console.log(err);
        setLoginFormError(submitErrorMessage);
      })
  }

  //нажатие кнопки "ещё" 
  const onMoreHandler = () => {
    const data = JSON.parse(localStorage.getItem(MOVIES)).slice(
      movies.length,
      movies.length + uploadMoviesCount
    );
    setMovies((prev) => [...prev, ...data]);
  };

  const onWidthChange = (evt) => {
    const count = getUploadMoviesCount(evt.target.innerWidth, {
      isInitial: false,
    });
    setUploadMoviesCount(count);
  };

  useEffect(() => {
    window.addEventListener("resize", onWidthChange);
    return () => window.removeEventListener("resize", onWidthChange);
  });

  //метод удобной проброски пропсов в глубокий компонент, рекомендованный разработчиками React, так как пропсов тут много
  const getSearchBlock = ({ isSavedSearch }) => {
    if (isSavedSearch) {
      return (
        <Search
          onSubmit={getSearchHandler(isSavedSearch)}
          onChange={onSearchSavedTextChange}
          text={serachSavedText}
          isChecked={isSavedShortFilm}
          setChecked={toggleIsSavedShortFilm}
        />
      );
    } else {
      return (
        <Search
          onSubmit={getSearchHandler(isSavedSearch)}
          onChange={onSearchTextChange}
          text={searchText}
          isChecked={isShortFilm}
          setChecked={toggleIsShortFilm}
        />
      );
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Main />} />
        <Route
          path="/movies"
          element={
            <Movies
              movies={movies}
              searchBlock={getSearchBlock({ isSavedSearch: false })}
              isLoaderShown={isLoaderShown}
              isMoviesRequested={isMoviesRequested}
              error={searchError}
              onMoreHandler={onMoreHandler}
              onLikeCardHandler={onLikeCardHandler}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <SavedMovies
              movies={movies}
              searchBlock={getSearchBlock({ isSavedSearch: true })}
              isLoaderShown={isLoaderShown}
              isMoviesRequested={isMoviesRequested}
              error={searchError}
              onDisLikeCardHanlder={onDisLikeCardHanlder}
            />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route 
          path="/signin" 
          element={
            <LogIn 
              email={loginEmail}
              emailError={loginEmailError}
              isEmailValid={isLoginEmailValid}
              onEmailChange={onLoginEmailChange}
              password={loginPassword}
              passwordError={loginPasswordError}
              isPasswordValid={isLoginPasswordValid}
              onPasswordChange={onLoginPasswordChange}
              isFormValid={isLoginFormValid}
              onSigninHandler={onSignInHandler}
              formError={loginFormError}
            />
          } 
        />
        <Route
          path="/signup"
          element={
            <Register
              name={name}
              nameError={nameError}
              isNameValid={isNameValid}
              onNameChange={onNameChange}
              email={email}
              emailError={emailError}
              isEmailValid={isEmailValid}
              onEmailChange={onEmailChange}
              password={password}
              passwordError={passwordError}
              isPasswordValid={isPasswordValid}
              onPasswordChange={onPasswordChange}
              isFormValid={isRegisterFormValid}
              onSignupHandler={onSignupHandler}
              formError={registerFormError}
            />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
