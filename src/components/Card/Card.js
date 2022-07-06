import React, { useState } from "react";
import Button from "../Button/Button";
import likeImg from '../../images/like.svg';
import disLikeImg from '../../images/dislike.svg';
import removeImg from '../../images/remove.svg';
import './Card.css';

function Card({ title, image, duration, isLiked, isSavedMoviesPage }) {

  const [liked, setLiked] = useState(isLiked);

  return (
    <li className="card">
      <img src={image} className="card__img" alt="Заставка" />
      <div className="card__info">
        <p className="card__title">
          {
            title
          }
        </p>
        {
            !isSavedMoviesPage
              ? (<Button className="card__like-btn" onClick={() => setLiked(!liked)} >
                  <img className="card__like-img" src={liked ? likeImg : disLikeImg} alt="Нравится" />
                </Button>)
              : (<Button className="card__like-btn" onClick={() => setLiked(!liked)}>
                  <img className="card__like-img" src={removeImg} alt="Нравится" />
                </Button>)
          }
      </div>
      <p className="card__duration">
        {
          duration
        }
      </p>
    </li>
  )
}

export default Card;