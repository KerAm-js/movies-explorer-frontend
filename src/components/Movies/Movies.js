import React, { useEffect } from "react";
import Cards from "../Cards/Cards";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import More from "../More/More";
import Search from "../Search/Search";
import Preloader from "../Preloader/Preloader";
import { MOVIES } from "../../utils/localStorageConstants";
import './Movies.css';
import { filterMovies } from "../../utils/utils";

function Movies({
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
  renderCurrentMovies,
  moreButtonShown
}) {

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem(MOVIES));
    if (storedMovies && storedMovies.length > 0) {
      const filtered = filterMovies({ movies: storedMovies, keyword: searchText, isShortFilm });
      renderCurrentMovies(filtered);
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
        (movies.length > 0 && isMoviesRequested && !searchError && moreButtonShown) ? <More onMoreHandler={onMoreHandler} /> : null
      }
      <Footer />
    </div>
  )
}

export default Movies;