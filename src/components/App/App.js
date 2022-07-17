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
import { getMovies } from "../../utils/MoviesApi";
import { UserContext } from "../../contexts/UserContext";
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
  BEATFILM_BASE_URL,
  errorMessage,
  nameInvalidMessage,
  nameRegex,
  submitErrorMessage,
} from "../../utils/constants";
import { getUploadMoviesCount } from "../../utils/utils";
import { addMovie, getSavedMovies, getUserInfo, removeMovie, signup, singin } from "../../utils/MainApi";
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
  const [savedMovies, setSavedMovies] = useState([]);
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
    setLoginPasswordDefaults();
    setIsLoginFormValid(false);
    setLoginFormError("");
  }

  // """ Для каждого из предыдуших блоков можно было бы сделать контекст, 
  //     а для каждого контекста сделать отдельный файл с компонентом 
  //     высшего порядка и стейт переменной """ 

  // current user
  const [user, setUser] = useState({
    email: "",
    name: ""
  });

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

  //лайки фильмам ставятся по следующему принципу:
  //  все фильмы на странице movies имеют свойства isLiked и savedId 
  //  isLiked - показывает, поставлен лайк или нет
  //  savedId - это id фильма на нашем бэкенде, он пригодится для удаления лайка на странице movies
  //  эти свойства будут добавлены объектам фильмов в следующих случаях:
  //  1) при загрузке фильмов из стороннего API, с помощью сверки со списком сохранённых фильмов на нашем API,
  //     так как мы можем только читать данные из стороннего API, полномочий вносить свои изменения для лайков у нас нет,
  //     особенно это будет необходимо, если мы возьмём другое API, на котором список фильмов будет меняться
  //     и нам потребуется подгружать фильмы только из сети, а не из локального хранилища
  //  2) при нажатии на кнопку лайка: необходимо показать пользователю, что он лайнкул карточку, при помощи свойства isLiked
  //     а также необходимо сохранить id фильма из нашего API в свойстве savedId, 
  //     чтобы пользователь при желании могу сразу же убрать лайк прямо на странице movies

  //сверка с сохранёнными фильмами
  const setLikes = (movies, savedMovies) => {
    movies.forEach(movie => {
      const savedVariant = savedMovies.find(item => item.movieId === movie.id)
      movie.isLiked = false;
      movie.savedId = null;
      if (savedVariant) {
        movie.savedId = savedVariant._id;
        movie.isLiked = true;
        return;
      }
    })
    return movies;
  }

  //расстановка лайков для всех фильмов
  const setLikesToSearchedMovies = movies => {
    const token = localStorage.getItem(TOKEN);
    return getSavedMovies({ token }).then(svdMovies => {
      setLikes(movies, svdMovies);
      return movies;
    })

  }

  // для поиска фильмов на странице movies
  const searchAllMovies = evt => {
    if (evt) {
      evt.preventDefault();
    }
    
    const storedMovies = JSON.parse(localStorage.getItem(MOVIES));
    setIsLoaderShown(!storedMovies);
    
    if (!isMoviesRequested) {
      setIsMoviesRequested(true);
    }

    localStorage.setItem(REQUEST_TEXT, searchText);
    localStorage.setItem(IS_SHORT_FILM, isShortFilm ? "1" : "");

    if (!storedMovies || storedMovies.length === 0) {
      getMovies()
        .then((data) => {
          return setLikesToSearchedMovies(data); //раставляем лайки для подгруженных фильмов 
          ///будет необходимо, если я позже воспользуюсь другим API, который будет обновлятся со временем
        })
        .then(data => {
          setMoviesInitial(data);
          localStorage.setItem(MOVIES, JSON.stringify(data));
          setSearchError("");
        })
        .catch((err) => {
          console.log(err);
          setSearchError(errorMessage);
        })
        .finally(() => setIsLoaderShown(false));
        return;
    } 
    setMoviesInitial(storedMovies);
    setSearchError('');
    setIsLoaderShown(false);

  }

  // для поиска фильмов на странице saved movies
  const searchSavedMovies = evt => {
    if (evt) {
      evt.preventDefault();
    }

    setIsLoaderShown(true);

    if (!isMoviesRequested) {
      setIsMoviesRequested(true);
    }

    localStorage.setItem(REQUEST_TEXT_SAVED, serachSavedText);
    localStorage.setItem(IS_SHORT_FILM_SAVED, isSavedShortFilm ? "1" : "");
    const token = localStorage.getItem(TOKEN);

    getSavedMovies({ token })
      .then(res => {
        setSearchError('');
        setSavedMovies(res);
      })
      .catch(err => {
        console.log(err);
        setSearchError(submitErrorMessage);
      })
      .finally(() => setIsLoaderShown(false));
  }

  const onLikeCardHandler = ({ movie }) => {
    const token = localStorage.getItem(TOKEN);
    const { id, image, created_at, updated_at, isLiked, savedId, ...movieData } = movie;
    const savedMovie = { 
      movieId: id, 
      image: `${BEATFILM_BASE_URL}${image.url}`,
      thumbnail: `${BEATFILM_BASE_URL}${image.formats.thumbnail.url}`,
      ...movieData  
    }
    //возвращаем промис запроса для дальнейшей обработки в компоненте карточки
    return addMovie({ movie: savedMovie, token }).then(svdMovie => {
      const storedMovies = JSON.parse(localStorage.getItem(MOVIES));
      const likedMovie = storedMovies.find(movie => svdMovie.movieId === movie.id);
      
      likedMovie.isLiked = true;
      likedMovie.savedId = svdMovie._id;

      localStorage.setItem(MOVIES, JSON.stringify(storedMovies));
      setMoviesInitial(storedMovies);
    }) 
  };

  const onDisLikeCardHanlder = ({ id, movieId }) => {
    const token = localStorage.getItem(TOKEN);
    //возвращаем результат запроса для дальнейшей обработки в компоненте карточки
    return removeMovie({id, token}).then(() => {
      const storedMovies = JSON.parse(localStorage.getItem(MOVIES));
      const likedMovie = storedMovies.find(movie => movieId === movie.id);

      likedMovie.isLiked = false;
      likedMovie.savedId = null;

      localStorage.setItem(MOVIES, JSON.stringify(storedMovies));
      setMoviesInitial(storedMovies);
    })
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
        setUser({ email, name });
        return singin({ email, password })
      })
      .then((res) => {
        if (res.token) {
          localStorage.setItem(TOKEN, res.token);
        }
        setRegisterDefaults();
        return getUserInfo({ token: res.token })
      })
      .then(res => {
        const { email, name } = res
        setUser({ email, name });
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
        return getUserInfo({ token: res.token })
      })
      .then(res => {
        const { email, name } = res
        setUser({ email, name });
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
          onSubmit={searchSavedMovies}
          onChange={onSearchSavedTextChange}
          text={serachSavedText}
          isChecked={isSavedShortFilm}
          setChecked={toggleIsSavedShortFilm}
        />
      );
    } else {
      return (
        <Search
          onSubmit={searchAllMovies}
          onChange={onSearchTextChange}
          text={searchText}
          isChecked={isShortFilm}
          setChecked={toggleIsShortFilm}
        />
      );
    }
  };

  return (
    <UserContext.Provider value={user}>
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
                onDisLikeCardHanlder={onDisLikeCardHanlder}
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
          <Route 
            path="/profile" 
            element={
              <Profile />
            } 
          />
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
    </UserContext.Provider>
    
  );
}

export default App;
