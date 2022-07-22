import React, { useEffect, useState } from "react";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import LogIn from "../LogIn/LogIn";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { TOKEN, MOVIES, REQUEST_TEXT, IS_SHORT_FILM, SAVED_MOVIES, REQUEST_TEXT_SAVED, IS_SHORT_FILM_SAVED } from "../../utils/localStorageConstants";
import { getUserInfo, addMovie, removeMovie, getSavedMovies } from "../../utils/MainApi";
import { filterMovies, getUploadMoviesCount, prepareMovieForSaving, setLikesToSearchedMovies } from "../../utils/utils";
import { getMovies } from "../../utils/MoviesApi";

import { errorMessage } from "../../utils/constants";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {

  const [user, setUser] = useState({
    email: "",
    name: ""
  });

  // movies
  const [movies, setMovies] = useState([]);
  const [isLoaderShown, setIsLoaderShown] = useState(false);
  const [uploadMoviesCount, setUploadMoviesCount] = useState(getUploadMoviesCount(window.innerWidth, { isInitial: false }));
  const [uploadedMoviesCount, setUploadedMoviesCount] = useState(0);
  const [isMoviesRequested, setIsMoviesRequested] = useState(false);
  const [searchText, setSearchText] = useState(localStorage.getItem(REQUEST_TEXT) || "");
  const [isShortFilm, setIsShortFilm] = useState(Boolean(localStorage.getItem(IS_SHORT_FILM)) || false);
  const [searchError, setSearchError] = useState("");
  const [moreButtonShown, setMoreButtonShown] = useState(true);

  //saved movies
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSavedShortFilm, setIsSavedShortFilm] = useState(Boolean(localStorage.getItem(IS_SHORT_FILM_SAVED)) || false);
  const [serachSavedText, setSearchSavedText] = useState(localStorage.getItem(REQUEST_TEXT_SAVED) || "");
  const [isSavedMoviesRequested, setIsSavedMoviesRequested] = useState(false);
  const [searchErrorSaved, setSearchErrorSaved] = useState("");

  const onSearchTextChange = (evt) => setSearchText(evt.target.value);
  const onSearchSavedTextChange = (evt) => setSearchSavedText(evt.target.value);

  const toggleIsShortFilm = () => {
    const storedMovies = JSON.parse(localStorage.getItem(MOVIES));
    const filtered = filterMovies({ movies: storedMovies, keyword: searchText, isShortFilm: !isShortFilm });
    renderCurrentMovies(filtered);
    setIsShortFilm(!isShortFilm);
  };

  const toggleIsSavedShortFilm = () => {
    const storedMovies = JSON.parse(localStorage.getItem(SAVED_MOVIES));
    const filtered = filterMovies({ movies: storedMovies, keyword: searchText, isShortFilm: !isSavedShortFilm });
    renderCurrentMovies(filtered);
    setIsSavedShortFilm(!isSavedShortFilm);
  };

  const setGlobalDefaults = () => {
    setMovies([]);
    setIsLoaderShown(false);
    setUploadMoviesCount(getUploadMoviesCount(window.innerWidth, { isInitial: false }));
    setIsMoviesRequested(false);
    setSearchText("");
    setIsShortFilm(false);
    setSearchError("");
    setSavedMovies([]);
    setIsSavedShortFilm(false);
    setSearchSavedText("");
    setIsSavedMoviesRequested(false);
    setSearchErrorSaved("");
  }

  //для первой подгрузки фильмов
  const setMoviesInitial = ({ data, setter, uploadedCountSetter }) => {
    const count = getUploadMoviesCount(window.innerWidth, { isInitial: true })
    setter(data.slice(0, count));

    if (uploadedCountSetter) {
      uploadedCountSetter(count);
    }

    if (data.length <= count) {
      setMoreButtonShown(false);
      return;
    }
    setMoreButtonShown(true);
  };

  //нажатие кнопки "ещё"
  const onMoreHandler = () => {
    const data = JSON.parse(localStorage.getItem(MOVIES))
    const filtered = filterMovies({ movies: data, keyword: searchText, isShortFilm }).slice(
      0,
      movies.length + uploadMoviesCount
    );

    setMovies(filtered);
    setUploadedMoviesCount(uploadedMoviesCount + uploadMoviesCount);

    if (filtered.length <= uploadedMoviesCount) {
      setMoreButtonShown(false);
      return;
    }
    setMoreButtonShown(true);
  };

  const renderCurrentMovies = data => {
    setMovies(data.slice(0, uploadedMoviesCount));
    if (data.length <= uploadedMoviesCount) {
      setMoreButtonShown(false);
      return;
    }
    setMoreButtonShown(true);
  }

  const searchAllMovies = evt => {
    
    evt.preventDefault();

    const storedMovies = JSON.parse(localStorage.getItem(MOVIES));
    setIsLoaderShown(!storedMovies || storedMovies.length === 0);

    if (!isMoviesRequested) {
      setIsMoviesRequested(true);
    }

    localStorage.setItem(REQUEST_TEXT, searchText);
    localStorage.setItem(IS_SHORT_FILM, isShortFilm ? "1" : "");

    if (!storedMovies || storedMovies.length === 0) {
      getMovies()
        .then((data) => {
          const updatedMovies = setLikesToSearchedMovies(data);
          const filtered = filterMovies({ movies: updatedMovies, keyword: searchText, isShortFilm })
          setMoviesInitial({data: filtered, setter: setMovies, uploadedCountSetter: setUploadedMoviesCount});
          localStorage.setItem(MOVIES, JSON.stringify(updatedMovies));
          setSearchError("");
        })
        .catch((err) => {
          console.log(err);
          setSearchError(errorMessage);
        })
        .finally(() => setIsLoaderShown(false));
      return;
    } 
    const updatedMovies = setLikesToSearchedMovies(storedMovies);
    const filtered = filterMovies({ movies: updatedMovies, keyword: searchText, isShortFilm })
    setMoviesInitial({data: filtered, setter: setMovies,  uploadedCountSetter: setUploadedMoviesCount});
    setSearchError('');
  }

  const onLikeCardHandler = ({ movie }) => {
    const token = localStorage.getItem(TOKEN);
    const savedMovie = prepareMovieForSaving(movie)

    const storedMovies = JSON.parse(localStorage.getItem(MOVIES));
    const storedSavedMovies = JSON.parse(localStorage.getItem(SAVED_MOVIES)) || [];

    //возвращаем промис для дальнейшей обработки в компоненте карточки
    return addMovie({ movie: savedMovie, token })
      .then(svdMovie => {
        const likedMovie = storedMovies.find(movie => svdMovie.movieId === movie.id);
        likedMovie.isLiked = true;
        likedMovie.savedId = svdMovie._id;

        localStorage.setItem(MOVIES, JSON.stringify(storedMovies));
        localStorage.setItem(SAVED_MOVIES, JSON.stringify([ ...storedSavedMovies, svdMovie ]));

        const filtered = filterMovies({ movies: storedMovies, keyword: searchText, isShortFilm })
        renderCurrentMovies(filtered);
      })
      // цепочка промисов завершается в компоненте картчоки, там она и завершается блоком catch
  };

  const onDisLikeCardHanlder = ({ id, movieId }) => {
    const token = localStorage.getItem(TOKEN);

    const storedMovies = JSON.parse(localStorage.getItem(MOVIES));
    const storedSavedMovies = JSON.parse(localStorage.getItem(SAVED_MOVIES));
    const likedMovie = storedMovies.find(movie => movieId === movie.id);

    //возвращаем промис для дальнейшей обработки в компоненте карточки
    return removeMovie({id, token})
      .then(() => {
        likedMovie.isLiked = false;
        likedMovie.savedId = null;

        localStorage.setItem(MOVIES, JSON.stringify(storedMovies));
        localStorage.setItem(SAVED_MOVIES, JSON.stringify(storedSavedMovies.filter(movie => movie._id !== id)));

        const filtered = filterMovies({ movies: storedMovies, keyword: searchText, isShortFilm })
        renderCurrentMovies(filtered);
      })
      // цепочка промисов завершается в компоненте картчоки, там она и завершается блоком catch
  };

  const searchSavedMovies = evt => {
    evt.preventDefault();

    if (!isSavedMoviesRequested) {
      setIsSavedMoviesRequested(true);
    }

    localStorage.setItem(REQUEST_TEXT_SAVED, serachSavedText);
    localStorage.setItem(IS_SHORT_FILM_SAVED, isSavedShortFilm ? "1" : "");

    const storedSavedMovies = JSON.parse(localStorage.getItem(SAVED_MOVIES)) || []

    const filtered = filterMovies({ movies: storedSavedMovies, keyword: serachSavedText, isShortFilm: isSavedShortFilm });
    setSavedMovies(filtered);
  }

  const onDisLikeSavedCardHanlder = ({ _id, movieId }) => {
    const token = localStorage.getItem(TOKEN);

    const storedSavedMovies = JSON.parse(localStorage.getItem(SAVED_MOVIES));
    const storedMovies = JSON.parse(localStorage.getItem(MOVIES));

    const newSavedMovies = storedSavedMovies.filter(movie => movie._id !== _id);
    const newMovies = storedMovies.map(movie => {
      if (movie.id === movieId) {
        movie.isLiked = false;
        movie.savedId = null;
        return movie;
      }
      return movie;
    });

    //обновляем стейт, чтобы пользователь увидел результат действия
    setMovies(newMovies);
    setSavedMovies(newSavedMovies);

    return removeMovie({ id: _id, token })
      .then(() => {
        //если на сервере всё прошло успешно, обновляем и локальное хранилище
        localStorage.setItem(SAVED_MOVIES, JSON.stringify(newSavedMovies));
        localStorage.setItem(MOVIES, JSON.stringify(newMovies))
      })
      .catch(err => {
        //если произошла ошибка, возвращаем прежнее состояние
        console.log(err);
        setSavedMovies(storedSavedMovies);

        const filtered = filterMovies({ movies: storedMovies, keyword: searchText, isShortFilm })
        setMovies(filtered);
      })
  }

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

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      if (!user || (!user.email && !user.name)) {
        getUserInfo({ token })
          .then(res => {
            const { email, name } = res;
            setUser({ email, name });
          })
          .catch(err => {
            console.log(err);
          })
      }
      getSavedMovies({ token })
        .then(res => {
          localStorage.setItem(SAVED_MOVIES, JSON.stringify(res));
        })
        .catch(err => {
          console.log(err);
          localStorage.setItem(SAVED_MOVIES, JSON.stringify([]));
        })
    }
  // eslint-disable-next-line
  }, [user])

  return (
    <UserContext.Provider value={{user, setUser}}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route 
            path="/movies"
            element={
              <ProtectedRoute 
                component={Movies}
                setLikesToSearchedMovies={setLikesToSearchedMovies}
                renderCurrentMovies={renderCurrentMovies}
                searchAllMovies={searchAllMovies}
                onSearchTextChange={onSearchTextChange}
                searchText={searchText}
                isShortFilm={isShortFilm}
                toggleIsShortFilm={toggleIsShortFilm}
                isMoviesRequested={isMoviesRequested}
                isLoaderShown={isLoaderShown}
                searchError={searchError}
                onLikeCardHandler={onLikeCardHandler}
                onDisLikeCardHanlder={onDisLikeCardHanlder}
                onMoreHandler={onMoreHandler}
                moreButtonShown={moreButtonShown}
                movies={movies}
              />
            }
          />
          <Route 
            path="/saved-movies"
            element={
              <ProtectedRoute 
                component={SavedMovies}
                savedMovies={savedMovies}
                searchError={searchErrorSaved}
                onDisLikeCardHanlder={onDisLikeSavedCardHanlder}
                isMoviesRequested={isSavedMoviesRequested}
                setSearchError={setSearchErrorSaved}
                onSearchSavedTextChange={onSearchSavedTextChange}
                searchSavedText={serachSavedText}
                toggleIsSavedShortFilm={toggleIsSavedShortFilm}
                searchSavedMovies={searchSavedMovies}
                setSavedMovies={setSavedMovies}
                setMoviesInitial={setMoviesInitial}
              />
            } 
          />
          <Route 
            path="/profile"
            element={
              <ProtectedRoute 
                component={Profile}
                setGlobalDefaults={setGlobalDefaults}
              />
            }
          />
          <Route 
            path="/signin" 
            element={
              <LogIn />
            } 
          />
          <Route
            path="/signup"
            element={
              <Register />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </UserContext.Provider>
    
  );
}

export default App;
