import React, { useEffect } from "react";
import './SavedMovies.css';
import Cards from "../Cards/Cards";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Search from "../Search/Search";
import { SAVED_MOVIES, TOKEN } from "../../utils/localStorageConstants";
import { getSavedMovies } from "../../utils/MainApi";
import { serverError, submitErrorMessage } from "../../utils/constants";


function SavedMovies({
  setSearchError,
  searchSavedMovies,
  onSearchSavedTextChange,
  searchSavedText,
  isSavedShortFilm,
  toggleIsSavedShortFilm,
  isMoviesRequested,
  onDisLikeCardHanlder,
  searchError,
  savedMovies,
  setSavedMovies,
  setMoviesInitial,
}) {

  const token = localStorage.getItem(TOKEN);

  useEffect(() => {
    getSavedMovies({ token })
      .then(res => {
        localStorage.setItem(SAVED_MOVIES, JSON.stringify(res));
        setMoviesInitial({ data: res, setter: setSavedMovies });
      })
      .catch(err => {
        console.log(err);
        if (err.status === 500) {
          setSearchError(serverError);
        }
        setSearchError(submitErrorMessage);
      })
  // eslint-disable-next-line
  }, [])

  return (
    <div className="saved-movies">
      <Header />
      <Search
        onSubmit={searchSavedMovies}
        onChange={onSearchSavedTextChange}
        text={searchSavedText}
        isChecked={isSavedShortFilm}
        setChecked={toggleIsSavedShortFilm}
      />
      {
        isMoviesRequested && <Cards isSavedMoviesPage={true} onDisLikeCardHanlder={onDisLikeCardHanlder} error={searchError} cards={savedMovies} />
      }
      <div className="saved__devider" />
      <Footer />
    </div>
  )
}

export default SavedMovies;