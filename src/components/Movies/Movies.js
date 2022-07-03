import React from "react";
import { cards } from "../../utils/constants";
import Cards from "../Cards/Cards";
import Header from "../Header/Header";
import Search from "../Search/Search";
import Footer from "../Footer/Footer";
import './Movies.css';
import Preloader from "../Preloader/Preloader";

function Movies() {
  return (
    <div className="movies">
      <Header />
      <Search />
      <Cards cards={cards} />
      <Preloader />
      <Footer />
    </div>
  )
}

export default Movies;