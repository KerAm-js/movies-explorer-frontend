import React from "react";
import Cards from "../Cards/Cards";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import More from "../More/More";
import Preloader from "../Preloader/Preloader";
import './Movies.css';

function Movies({ movies, searchBlock, isLoaderShown, isMoviesRequested, error, onMoreHandler, onLikeCardHandler }) {

  return (
    <div className="movies">
      <Header />
      {
        searchBlock
      }
      {
        !isMoviesRequested 
          ? null
          : movies.length > 0 && isLoaderShown
            ? <Preloader />
            : <Cards error={error} cards={movies} onLikeCardHandler={onLikeCardHandler} />
      }
      {
        (movies.length > 0 && isMoviesRequested && !error) ? <More onMoreHandler={onMoreHandler} /> : null
      }
      <Footer />
    </div>
  )
}

export default Movies;