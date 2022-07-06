import React from "react";
import Card from "../Card/Card";
import './Cards.css';

function Cards({ cards, isSavedMoviesPage }) {
  return (
    <section className="cards">
      <ul className="cards__list">
        {
          cards.map((card, index) => <Card key={index} isSavedMoviesPage={isSavedMoviesPage} {...card} />)
        }
      </ul>
    </section>
  )
}

export default Cards;