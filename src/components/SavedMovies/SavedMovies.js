import React, { useState } from "react";
import './SavedMovies.css';
import Cards from "../Cards/Cards";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import Search from "../Search/Search";
import { IS_SHORT_FILM_SAVED, REQUEST_TEXT_SAVED, TOKEN } from "../../utils/localStorageConstants";
import { getSavedMovies, removeMovie } from "../../utils/MainApi";
import { serverError, submitErrorMessage } from "../../utils/constants";


function SavedMovies() {

  const [savedMovies, setSavedMovies] = useState([]);
  const [isSavedShortFilm, setIsSavedShortFilm] = useState(Boolean(localStorage.getItem(IS_SHORT_FILM_SAVED)) || false);
  const [serachSavedText, setSearchSavedText] = useState(localStorage.getItem(REQUEST_TEXT_SAVED) || "");
  const [isLoaderShown, setIsLoaderShown] = useState(false);
  const [isMoviesRequested, setIsMoviesRequested] = useState(false);
  const [searchError, setSearchError] = useState("");

  const onSearchSavedTextChange = (evt) => setSearchSavedText(evt.target.value);
  const toggleIsSavedShortFilm = () => setIsSavedShortFilm(!isSavedShortFilm);

  const token = localStorage.getItem(TOKEN);

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

    getSavedMovies({ token })
      .then(res => {
        setSavedMovies(res);
      })
      .catch(err => {
        console.log(err);
        if (err.status === 500) {
          setSearchError(serverError);
        }
        setSearchError(submitErrorMessage);
      })
      .finally(() => setIsLoaderShown(false));
  }

  const onDisLikeCardHanlder = ({ id }) => {
    return removeMovie({ id, token })
  }

  return (
    <div className="saved-movies">
      <Header />
      <Search
        onSubmit={searchSavedMovies}
        onChange={onSearchSavedTextChange}
        text={serachSavedText}
        isChecked={isSavedShortFilm}
        setChecked={toggleIsSavedShortFilm}
      />
      {
        isLoaderShown
          ? <Preloader />
          : isMoviesRequested && <Cards onDisLikeCardHanlder={onDisLikeCardHanlder} error={searchError} cards={savedMovies} />
      }
      <div className="saved__devider" />
      <Footer />
    </div>
  )
}

export default SavedMovies;