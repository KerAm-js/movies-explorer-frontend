import React from "react";
import { cards } from "../../utils/constants";
import Cards from "../Cards/Cards";
import Header from "../Header/Header";
import Search from "../Search/Search";
import Footer from "../Footer/Footer";
import More from "../More/More";
import Preloader from "../Preloader/Preloader";
import './Movies.css';

function Movies() {
  return (
    <div className="movies">
      <Header />
      <Search />
      {
        !cards.length === 0
          ? <Cards cards={cards} />
          : <Preloader />
      }
      <More />
      <Footer />
    </div>
  )
}

export default Movies;