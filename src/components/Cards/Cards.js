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
                        key={isSavedMoviesPage ? card._id : card.id} 
                        onLikeCardHandler={onLikeCardHandler ? () => onLikeCardHandler({ movie: card }) : null} 
                        onDisLikeCardHanlder={
                          isSavedMoviesPage
                            ? () => onDisLikeCardHanlder({_id: card._id, movieId: card.movieId})
                            : () => onDisLikeCardHanlder({id: card.savedId, movieId: card.id})
                        } 
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