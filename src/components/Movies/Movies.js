import React from "react";
import Header from "../Header/Header";
import Search from "../Search/Search";
import './Movies.css';

function Movies() {
  return (
    <div className="movies">
      <Header />
      <Search />
    </div>
  )
}

export default Movies;