import React from "react";
import './SavedMovies.css';
import Cards from "../Cards/Cards";
import { cards } from "../../utils/constants";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Search from "../Search/Search";


function SavedMovies() {
  const data = cards.filter(movie => movie.isLiked);
  return (
    <div className="saved-movies">
      <Header />
      <Search />
      <Cards cards={data} isSavedMoviesPage={true} />
      <div className="saved__devider" />
      <Footer />
    </div>
  )
}

export default SavedMovies;