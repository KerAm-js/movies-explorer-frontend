import React from "react";
import './SavedMovies.css';
import Cards from "../Cards/Cards";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";


function SavedMovies({ movies, searchBlock, isLoaderShown, isMoviesRequested, error }) {

  const data = movies.filter(movie => movie.isLiked);

  return (
    <div className="saved-movies">
      <Header />
      {
        searchBlock
      }
      {
        isLoaderShown
          ? <Preloader />
          : isMoviesRequested && <Cards onDisLikeCardHanlder={onDisLikeCardHanlder} error={error} cards={data} />
      }
      <div className="saved__devider" />
      <Footer />
    </div>
  )
}

export default SavedMovies;