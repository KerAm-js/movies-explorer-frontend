import React, { useEffect, useState } from 'react';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import LogIn from '../LogIn/LogIn';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import { Routes, Route } from 'react-router-dom';
import { getMoviesFromBF } from '../../utils/MoviesApi';
import Search from '../Search/Search';
import { IS_SHORT_FILM, IS_SHORT_FILM_SAVED, MOVIES, REQUEST_TEXT, REQUEST_TEXT_SAVED,  } from '../../utils/localStorageConstants';
import { errorMessage } from '../../utils/constants';
import { getUploadMoviesCount } from '../../utils/utils';

function App() {

  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem(MOVIES)) || []);
  const [searchText, setSearchText] = useState(localStorage.getItem(REQUEST_TEXT) || '');
  const [isShortFilm, setIsShortFilm] = useState(Boolean(localStorage.getItem(IS_SHORT_FILM)) || false);
  const [isSavedShortFilm, setIsSavedShortFilm] = useState(Boolean(localStorage.getItem(IS_SHORT_FILM_SAVED)) || false);
  const [serachSavedText, setSearchSavedText] = useState(localStorage.getItem(REQUEST_TEXT_SAVED) || '');
  const [isLoaderShown, setIsLoaderShown] = useState(false);
  const [uploadMoviesCount, setUploadMoviesCount] = useState(getUploadMoviesCount(window.innerWidth, {isInitial: false}));
  const [isMoviesRequested, setIsMoviesRequested] = useState(false);
  const [error, setError] = useState('');

  const onSearchTextChange = evt => setSearchText(evt.target.value);
  const onSearchSavedTextChange = evt => setSearchSavedText(evt.target.value);

  const setMoviesInitial = (data) => {
    setMovies(data.slice(0, getUploadMoviesCount(window.innerWidth, { isInitial: true })));
  }

  const toggleIsShortFilm = () => setIsShortFilm(!isShortFilm);
  const toggleIsSavedShortFilm = () => setIsSavedShortFilm(!isSavedShortFilm)

  const getSearchHandler = (isSavedSearch) => evt => {
    evt.preventDefault();
    setIsLoaderShown(true);
    if (!isMoviesRequested) {
      setIsMoviesRequested(true);
    }
    if (isSavedSearch) {
      localStorage.setItem(REQUEST_TEXT_SAVED, serachSavedText);
      localStorage.setItem(IS_SHORT_FILM_SAVED, isSavedShortFilm ? '1' : '');
    } else {
      localStorage.setItem(REQUEST_TEXT, searchText);
      localStorage.setItem(IS_SHORT_FILM, isShortFilm ? '1' : '');
    }
    if (!JSON.parse(localStorage.getItem(MOVIES))) {
      getMoviesFromBF()
        .then(data => {
          setError('');
          setMoviesInitial(data);
          localStorage.setItem(MOVIES, JSON.stringify(data));
        })
        .catch(err => {
          console.log(err)
          setError(errorMessage);
        })
        .finally(() => setIsLoaderShown(false));
    } else {
      setIsLoaderShown(false)
    }
  }

  const getSearchBlock = ({ isSavedSearch }) => {
    if (isSavedSearch) {
      return (<Search 
        onSubmit={getSearchHandler(isSavedSearch)}
        onChange={onSearchSavedTextChange}
        text={serachSavedText}
        isChecked={isSavedShortFilm}
        setChecked={toggleIsSavedShortFilm}
      />)
    } else {
      return (<Search 
        onSubmit={getSearchHandler(isSavedSearch)}
        onChange={onSearchTextChange}
        text={searchText}
        isChecked={isShortFilm}
        setChecked={toggleIsShortFilm}
      />)
    }
  }

  const onMoreHandler = () => {
    const data = JSON.parse(localStorage.getItem(MOVIES)).slice(movies.length, movies.length + uploadMoviesCount);
    setMovies(prev => [...prev, ...data]);
  }

  const onWidthChange = evt => {
    const count = getUploadMoviesCount(evt.target.innerWidth, {isInitial: false})
    setUploadMoviesCount(count);
  }

  useEffect(() => {
    window.addEventListener('resize', onWidthChange)
    return () => window.removeEventListener('resize', onWidthChange);
  })

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
              error={error}
              onMoreHandler={onMoreHandler}
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
              error={error}
            />
          } 
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<LogIn />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
