import React from "react";
import Card from "../Card/Card";
import './Cards.css';

function Cards({ cards, isSavedMoviesPage, error, onLikeCardHandler, onDisLikeCardHanlder }) {
  
  return (
    <section className="cards">
      {
        error
          ? <p className="cards__message">{error}</p>
          : cards.length === 0
            ? <p className="cards__message">Ничего не найдено</p>
            : (
                <ul className="cards__list">
                  {
                    cards.map((card) => (
                      <Card 
                        key={card.id} 
                        onLikeCardHandler={onLikeCardHandler ? () => onLikeCardHandler(card) : null} 
                        onDisLikeCardHanlder={onDisLikeCardHanlder ? () => onDisLikeCardHanlder(card.id, card.movieId) : null} 
                        isSavedMoviesPage={isSavedMoviesPage} 
                        {...card} 
                      />))
                  }
                </ul>
              )
      }
    </section>
  )
}

export default Cards;