import React, { useState, useEffect } from "react";
import Cards from "../Cards/Cards";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import More from "../More/More";
import Search from "../Search/Search";
import Preloader from "../Preloader/Preloader";
import { MOVIES } from "../../utils/localStorageConstants";
import './Movies.css';

function Movies({
  setLikesToSearchedMovies,
  setMoviesInitial, 
  searchAllMovies,
  onSearchTextChange,
  searchText,
  isShortFilm,
  toggleIsShortFilm,
  isMoviesRequested,
  isLoaderShown,
  searchError,
  movies,
  onLikeCardHandler,
  onDisLikeCardHanlder,
  onMoreHandler,
  setMovies
}) {

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem(MOVIES));
    if (storedMovies && storedMovies.length > 0) {
      console.log(storedMovies);
      setMoviesInitial({data: storedMovies, setter: setMovies});
    }
  // eslint-disable-next-line
  }, [])


  return (
    <div className="movies">
      <Header />
      <Search
        onSubmit={searchAllMovies}
        onChange={onSearchTextChange}
        text={searchText}
        isChecked={isShortFilm}
        setChecked={toggleIsShortFilm}
      />
      {
        !isMoviesRequested 
          ? null
          : isLoaderShown
            ? <Preloader />
            : <Cards 
                error={searchError}
                cards={movies} 
                onLikeCardHandler={onLikeCardHandler} 
                onDisLikeCardHanlder={onDisLikeCardHanlder} 
              />
      }
      {
        (movies.length > 0 && isMoviesRequested && !searchError) ? <More onMoreHandler={onMoreHandler} /> : null
      }
      <Footer />
    </div>
  )
}

export default Movies;